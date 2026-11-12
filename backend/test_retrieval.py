
from sqlalchemy import select

from database import SessionLocal
from models import PortfolioKnowledge
from portfolio_assistant import create_query_embedding


QUESTION = "What AI and full-stack projects has Hawa built?"


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
            .limit(5)
        )

        results = session.execute(statement).all()

    print("\nTop 5 matching knowledge chunks:")

    for rank, (chunk, score) in enumerate(results, start=1):
        print(f"\n{rank}. Chunk ID: {chunk.chunk_id}")
        print(f"   Source: {chunk.source}")
        print(f"   Cosine distance: {score:.4f}")
        print(f"   Text: {chunk.text[:500]}")


if __name__ == "__main__":
    main()
