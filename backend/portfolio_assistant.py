
import os

from dotenv import load_dotenv
from google import genai
from sentence_transformers import SentenceTransformer
from sqlalchemy import select

from database import SessionLocal
from models import PortfolioKnowledge


load_dotenv()

GEMINI_MODEL = "gemini-3.8-flash"
EMBEDDING_MODEL = "sentence-transformers/all-MiniLM-L6-v2"
TOP_K = 5
MAX_CONTEXT_CHUNKS = 8

api_key = os.getenv("GEMINI_API_KEY")

if not api_key:
    raise RuntimeError(
        "GEMINI_API_KEY is missing. Check your backend/.env file."
    )

client = genai.Client(api_key=api_key)
embedding_model = SentenceTransformer(EMBEDDING_MODEL)


def retrieve_knowledge(question: str) -> list[str]:
    """Retrieve relevant knowledge, including every project overview
    when the visitor asks a broad project-related question.
    """
    question = question.strip()

    if not question:
        return []

    query_embedding = embedding_model.encode(
        question,
        normalize_embeddings=True,
    ).tolist()

    question_lower = question.lower()

    project_keywords = (
        "project",
        "projects",
        "built",
        "build",
        "developed",
        "development",
        "portfolio",
    )

    is_project_question = any(
        keyword in question_lower
        for keyword in project_keywords
    )

    with SessionLocal() as session:
        distance = PortfolioKnowledge.embedding.cosine_distance(
            query_embedding
        )

        # Retrieve the most relevant chunks for the question.
        statement = (
            select(PortfolioKnowledge, distance.label("distance"))
            .order_by(distance)
            .limit(TOP_K)
        )

        # For project questions, prioritize project information
        # instead of unrelated profile or skills chunks.
        if is_project_question:
            statement = statement.where(
                PortfolioKnowledge.source == "project"
            )

        results = session.execute(statement).all()
        retrieved_chunks = [chunk for chunk, _ in results]

        # For broad project questions, include all project overviews
        # so no major project is omitted from the assistant's context.
        if is_project_question:
            overview_statement = (
                select(PortfolioKnowledge)
                .where(
                    PortfolioKnowledge.source == "project",
                    PortfolioKnowledge.chunk_id.like("%-overview"),
                )
                .order_by(PortfolioKnowledge.chunk_id)
            )

            overview_chunks = session.scalars(
                overview_statement
            ).all()

            retrieved_chunks = overview_chunks + retrieved_chunks

    # Remove duplicate chunks while preserving their order.
    unique_chunks = []
    seen_chunk_ids = set()

    for chunk in retrieved_chunks:
        if chunk.chunk_id not in seen_chunk_ids:
            seen_chunk_ids.add(chunk.chunk_id)
            unique_chunks.append(chunk.text)

    return unique_chunks[:MAX_CONTEXT_CHUNKS]


def answer_question(question: str) -> str:
    """Generate a grounded answer using retrieved portfolio knowledge."""
    question = question.strip()

    if not question:
        return "Please enter a question."

    try:
        knowledge_chunks = retrieve_knowledge(question)

        if not knowledge_chunks:
            return (
                "I couldn't find relevant information in the "
                "portfolio knowledge base."
            )

        context = "\n\n".join(knowledge_chunks)

        
        prompt = f"""
You are the AI assistant on Hawa Ebrahim Hamid's professional portfolio.

Answer the visitor using only the portfolio context below.

Rules:
- Mention each relevant project when asked about multiple projects.
- For each project, clearly separate its name, description, and technologies.
- Use complete sentences and clean Markdown formatting.
- Do not join unrelated facts or repeat fragments of text.
- Do not invent projects, skills, qualifications, dates, or experience.
- If information is missing, say so honestly.
- Be concise and professional.

PORTFOLIO CONTEXT:
{context}

VISITOR QUESTION:
{question}

Write the final answer now.
"""


        response = client.models.generate_content(
            model=GEMINI_MODEL,
            contents=prompt,
        )

        if not response.text:
            return "Sorry, I couldn't generate an answer just now."

        return response.text.strip()

    
    except Exception as exc:
        print(f"Portfolio assistant error: {type(exc).__name__}: {exc}")
        return (
            "Sorry, the portfolio assistant is temporarily unavailable. "
            "Please try again shortly."
        )


if __name__ == "__main__":
    question = "What AI and full-stack projects has Hawa built?"

    print(f"Question: {question}")
    print("\nSearching portfolio knowledge and asking Gemini...\n")

    answer = answer_question(question)

    print("Assistant answer:")
    print(answer)
