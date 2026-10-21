
from sentence_transformers import SentenceTransformer
from sqlalchemy import select

from database import SessionLocal
from models import PortfolioKnowledge


MODEL_NAME = "sentence-transformers/all-MiniLM-L6-v2"


def main():
    question = "What AI and full-stack projects has Hawa built?"

    print(f"Question: {question}")
    print("Generating question embedding...")

    model = SentenceTransformer(MODEL_NAME)
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
            .limit(3)
        )

        results = session.execute(statement).all()

    print("\nTop 3 matching knowledge chunks:")

    for rank, (chunk, score) in enumerate(results, start=1):
        print(f"\n{rank}. Chunk ID: {chunk.chunk_id}")
        print(f"   Source: {chunk.source}")
        print(f"   Cosine distance: {score:.4f}")
        print(f"   Text: {chunk.text[:500]}")


if __name__ == "__main__":
    main()
