
from sqlalchemy import select

from database import SessionLocal
from models import PortfolioKnowledge
from portfolio_assistant import create_query_embedding


QUESTION = (
    "What training programs or certificates has Hawa completed, "
    "and what distinction did she receive?"
)
TOP_K = 10


def main():
    print(f"Question: {QUESTION}")
    print("Generating Gemini query embedding...")

    query_embedding = create_query_embedding(QUESTION)

    print(f"Embedding dimensions: {len(query_embedding)}")

    with SessionLocal() as session:
        distance = PortfolioKnowledge.embedding.cosine_distance(
            query_embedding
        )

        statement = (
            select(PortfolioKnowledge, distance.label("distance"))
            .order_by(distance)
            .limit(TOP_K)
        )

        results = session.execute(statement).all()

    print(f"\nKnowledge chunks retrieved: {len(results)}")

    for rank, (chunk, score) in enumerate(results, start=1):
        print(f"\n{rank}. {chunk.chunk_id}")
        print(f"   Distance: {score:.4f}")
        print(f"   Text: {chunk.text[:700]}")


if __name__ == "__main__":
    main()
