
"""Evaluate portfolio retrieval quality using ranked results and expected facts.

Run from the backend directory:
    python evaluate_retrieval.py

This diagnostic measures retrieval behavior; it does not evaluate
the final Gemini-generated answer.
"""

from sentence_transformers import SentenceTransformer
from sqlalchemy import select

from database import SessionLocal
from models import PortfolioKnowledge
from portfolio_assistant import (
    EMBEDDING_MODEL,
    TOP_K,
    find_project_id,
    is_experience_background_question,
    PROJECT_KEYWORDS,
)


EVALUATION_CASES = [
    {
        "name": "CrediTrust project",
        "question": "What is the CrediTrust Complaint Assistant?",
        "expected_terms": ["creditrust", "complaint"],
        "expected_chunk_terms": ["creditrust"],
    },
    {
        "name": "Brent Oil dashboard",
        "question": "Explain the Brent Oil Change Point Dashboard.",
        "expected_terms": ["brent oil", "change point"],
        "expected_chunk_terms": ["brent-oil"],
    },
    {
        "name": "Medical Telegram project",
        "question": "What is the Medical Telegram Warehouse project?",
        "expected_terms": ["medical telegram"],
        "expected_chunk_terms": ["medical-telegram"],
    },
    {
    "name": "AI training certificate",
    "question": "What AI training certificate did Hawa receive?",
    "expected_terms": ["kifiya", "distinction"],
    "expected_chunk_terms": ["owner-profile"],
},
    {
        "name": "CrediTrust RAG technologies",
        "question": "Which technologies are used in the CrediTrust RAG assistant?",
        "expected_terms": ["faiss"],
        "expected_chunk_terms": ["creditrust"],
    },
]


def main():
    print("Loading embedding model...")
    model = SentenceTransformer(EMBEDDING_MODEL)

    passed = 0
    failed = 0

    print("\nPortfolio Retrieval Evaluation")
    print("=" * 55)

    for case in EVALUATION_CASES:
        question = case["question"]
        question_lower = question.lower()

        selected_project_id = find_project_id(question)
        is_background = is_experience_background_question(question)

        is_project_question = (
            not is_background
            and (
                selected_project_id is not None
                or any(
                    keyword in question_lower
                    for keyword in PROJECT_KEYWORDS
                )
            )
        )

        try:
            query_embedding = model.encode(
                question,
                normalize_embeddings=True,
            ).tolist()

            with SessionLocal() as session:
                distance = PortfolioKnowledge.embedding.cosine_distance(
                    query_embedding
                )

                statement = (
                    select(PortfolioKnowledge, distance.label("distance"))
                    .order_by(distance)
                )

                if is_project_question:
                    statement = statement.where(
                        PortfolioKnowledge.source == "project"
                    )

                results = session.execute(
                    statement.limit(TOP_K)
                ).all()

                # Match the production behavior for general project questions:
                # overview chunks are added before the ranked results.
                if is_project_question and not selected_project_id:
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
                else:
                    overview_chunks = []

            retrieved = []
            seen_ids = set()

            for chunk in overview_chunks:
                if chunk.chunk_id not in seen_ids:
                    retrieved.append((chunk, None, "overview"))
                    seen_ids.add(chunk.chunk_id)

            for chunk, score in results:
                if chunk.chunk_id not in seen_ids:
                    retrieved.append((chunk, float(score), "ranked"))
                    seen_ids.add(chunk.chunk_id)

            retrieved = retrieved[:8]

            retrieved_text = "\n".join(
                chunk.text for chunk, _, _ in retrieved
            ).lower()

            missing_terms = [
                term
                for term in case["expected_terms"]
                if term.lower() not in retrieved_text
            ]

            matching_ranks = [
                rank
                for rank, (chunk, _, _) in enumerate(retrieved, start=1)
                if any(
                    term.lower() in chunk.chunk_id.lower()
                    for term in case["expected_chunk_terms"]
                )
            ]

            passed_case = not missing_terms and bool(matching_ranks)

            if passed_case:
                passed += 1
                status = "PASS"
            else:
                failed += 1
                status = "FAIL"

            print(f"\n[{status}] {case['name']}")
            print(f"Question: {question}")
            print(f"Expected chunk ID terms: {case['expected_chunk_terms']}")
            print(f"Matching chunk ranks: {matching_ranks or 'None'}")

            if missing_terms:
                print(f"Missing expected content terms: {missing_terms}")

            print("Retrieved chunks:")

            for rank, (chunk, score, result_type) in enumerate(
                retrieved, start=1
            ):
                distance_text = (
                    f"{score:.4f}"
                    if score is not None
                    else "not calculated (overview)"
                )

                print(
                    f"  {rank}. {chunk.chunk_id} | "
                    f"cosine distance: {distance_text} | "
                    f"type: {result_type}"
                )

        except Exception as exc:
            failed += 1
            print(f"\n[ERROR] {case['name']}")
            print(f"Error type: {type(exc).__name__}: {exc}")

    total = passed + failed

    print("\n" + "=" * 55)
    print(f"Passed: {passed}/{total}")
    print(f"Failed or errored: {failed}/{total}")
    print(
        "This evaluation checks retrieved content and chunk IDs, "
        "not the final generated answer."
    )


if __name__ == "__main__":
    main()
