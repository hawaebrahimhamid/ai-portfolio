
import json
from pathlib import Path

from sqlalchemy import select

from database import SessionLocal
from models import PortfolioKnowledge


EMBEDDINGS_PATH = (
    Path(__file__).parent
    / "knowledge"
    / "portfolio_embeddings.json"
)


def main():
    if not EMBEDDINGS_PATH.exists():
        raise FileNotFoundError(
            f"Embeddings file not found: {EMBEDDINGS_PATH}"
        )

    with EMBEDDINGS_PATH.open("r", encoding="utf-8") as file:
        chunks = json.load(file)

    if not isinstance(chunks, list):
        raise ValueError("Expected the embeddings JSON to contain a list.")

    added = 0
    skipped = 0

    with SessionLocal() as session:
        existing_ids = set(
            session.scalars(
                select(PortfolioKnowledge.chunk_id)
            ).all()
        )

        for chunk in chunks:
            embedding = chunk["embedding"]

            if len(embedding) != 384:
                raise ValueError(
                    f"Chunk {chunk['chunk_id']} has "
                    f"{len(embedding)} dimensions, not 384."
                )

            chunk_id = chunk["chunk_id"]

            if chunk_id in existing_ids:
                skipped += 1
                continue

            record = PortfolioKnowledge(
                chunk_id=chunk_id,
                source=chunk["source"],
                text=chunk["text"],
                embedding=embedding,
            )

            session.add(record)
            existing_ids.add(chunk_id)
            added += 1

        session.commit()

    print(f"Embeddings in file: {len(chunks)}")
    print(f"New chunks imported: {added}")
    print(f"Existing chunks skipped: {skipped}")


if __name__ == "__main__":
    main()
