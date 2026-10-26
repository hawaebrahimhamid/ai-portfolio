
from sentence_transformers import SentenceTransformer
from sqlalchemy import select

from database import SessionLocal
from models import PortfolioKnowledge

MODEL_NAME = "sentence-transformers/all-MiniLM-L6-v2"
QUESTION = "What AI and full-stack projects has Hawa built?"
TOP_K = 10


def main():
    model = SentenceTransformer(MODEL_NAME)

    query_embedding = model.encode(
        QUESTION,
        normalize_embeddings=True,
    ).tolist()

    with SessionLocal() as session:
        distance = PortfolioKnowledge.embedding.cosine_distance(
            query_embedding
        )

        statement = (
            select(PortfolioKnowledge, distance.label("distance"))
            .where(PortfolioKnowledge.source == "project")
            .order_by(distance)
            .limit(TOP_K)
        )

        results = session.execute(statement).all()

    print(f"Question: {QUESTION}")
    print(f"Project chunks retrieved: {len(results)}")

    for rank, (chunk, score) in enumerate(results, start=1):
        print(f"\n{rank}. {chunk.chunk_id}")
        print(f"   Distance: {score:.4f}")
        print(f"   Text: {chunk.text[:700]}")


if __name__ == "__main__":
    main()
