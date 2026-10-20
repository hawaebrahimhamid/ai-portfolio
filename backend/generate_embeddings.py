
import json
from pathlib import Path

from sentence_transformers import SentenceTransformer

from chunk_knowledge import chunk_knowledge


MODEL_NAME = "sentence-transformers/all-MiniLM-L6-v2"

OUTPUT_FILE = (
    Path(__file__).parent
    / "knowledge"
    / "portfolio_embeddings.json"
)


def generate_embeddings():
    """Generate one 384-dimensional embedding for each knowledge chunk."""
    chunks = chunk_knowledge()

    if not chunks:
        raise ValueError("No knowledge chunks were found.")

    print(f"Loading embedding model: {MODEL_NAME}")
    model = SentenceTransformer(MODEL_NAME)

    texts = [chunk["text"] for chunk in chunks]

    print(f"Generating embeddings for {len(texts)} chunks...")
    vectors = model.encode(
        texts,
        normalize_embeddings=True,
        show_progress_bar=True,
    )

    results = []

    for chunk, vector in zip(chunks, vectors):
        results.append({
            **chunk,
            "embedding": vector.tolist(),
        })

    OUTPUT_FILE.write_text(
        json.dumps(results, ensure_ascii=False, indent=2),
        encoding="utf-8",
    )

    print("\nEmbedding generation complete.")
    print(f"Chunks processed: {len(results)}")
    print(f"Vector dimensions: {len(results[0]['embedding'])}")
    print(f"Output file: {OUTPUT_FILE}")


if __name__ == "__main__":
    generate_embeddings()
