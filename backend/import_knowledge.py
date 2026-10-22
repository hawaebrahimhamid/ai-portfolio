
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

EXPECTED_DIMENSIONS = 384


def main():
    """Insert new knowledge chunks and refresh existing chunks."""
    if not EMBEDDINGS_PATH.exists():
        raise FileNotFoundError(
            f"Embeddings file not found: {EMBEDDINGS_PATH}"
        )

    with EMBEDDINGS_PATH.open("r", encoding="utf-8") as file:
        chunks = json.load(file)

    if not isinstance(chunks, list):
        raise ValueError(
            "Expected the embeddings JSON to contain a list."
        )

    added = 0
    updated = 0

    with SessionLocal() as session:
        try:
            for chunk in chunks:
                chunk_id = chunk["chunk_id"]
                source = chunk["source"]
                text = chunk["text"]
                embedding = chunk["embedding"]

                if len(embedding) != EXPECTED_DIMENSIONS:
                    raise ValueError(
                        f"Chunk {chunk_id} has {len(embedding)} "
                        f"dimensions; expected {EXPECTED_DIMENSIONS}."
                    )

                record = session.scalar(
                    select(PortfolioKnowledge).where(
                        PortfolioKnowledge.chunk_id == chunk_id
                    )
                )

                if record is not None:
                    record.source = source
                    record.text = text
                    record.embedding = embedding
                    updated += 1
                else:
                    session.add(
                        PortfolioKnowledge(
                            chunk_id=chunk_id,
                            source=source,
                            text=text,
                            embedding=embedding,
                        )
                    )
                    added += 1

            session.commit()

        except Exception:
            session.rollback()
            raise

    print("Knowledge import completed successfully.")
    print(f"Embeddings in file: {len(chunks)}")
    print(f"New chunks imported: {added}")
    print(f"Existing chunks updated: {updated}")


if __name__ == "__main__":
    main()
