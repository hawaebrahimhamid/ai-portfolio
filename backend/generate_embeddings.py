
import json
import math
import os
from pathlib import Path

from dotenv import load_dotenv
from google import genai
from google.genai import types

from chunk_knowledge import chunk_knowledge


MODEL_NAME = "gemini-embedding-001"
OUTPUT_DIMENSIONALITY = 768

BACKEND_DIR = Path(__file__).parent
OUTPUT_FILE = (
    BACKEND_DIR
    / "knowledge"
    / "portfolio_embeddings.json"
)

load_dotenv(BACKEND_DIR / ".env")


def normalize_embedding(values):
    """Normalize an embedding vector to unit length."""
    norm = math.sqrt(sum(value * value for value in values))

    if norm == 0:
        raise ValueError("Received an embedding with zero magnitude.")

    return [value / norm for value in values]


def generate_embedding(client, text):
    """Generate one normalized Gemini document embedding."""
    response = client.models.embed_content(
        model=MODEL_NAME,
        contents=text,
        config=types.EmbedContentConfig(
            task_type="RETRIEVAL_DOCUMENT",
            output_dimensionality=OUTPUT_DIMENSIONALITY,
        ),
    )

    if not response.embeddings:
        raise ValueError("Gemini returned no embedding.")

    values = response.embeddings[0].values

    if values is None or len(values) != OUTPUT_DIMENSIONALITY:
        raise ValueError(
            f"Expected {OUTPUT_DIMENSIONALITY} dimensions, "
            f"received {len(values) if values else 0}."
        )

    return normalize_embedding(values)


def generate_embeddings():
    """Generate and save embeddings for all portfolio knowledge chunks."""
    api_key = os.getenv("GEMINI_API_KEY")

    if not api_key:
        raise ValueError(
            "GEMINI_API_KEY was not found. "
            "Check your backend/.env file."
        )

    chunks = chunk_knowledge()

    if not chunks:
        raise ValueError("No knowledge chunks were found.")

    client = genai.Client(api_key=api_key)

    results = []

    print(f"Embedding model: {MODEL_NAME}")
    print(f"Output dimensions: {OUTPUT_DIMENSIONALITY}")
    print(f"Knowledge chunks: {len(chunks)}")
    print("\nGenerating embeddings...\n")

    for index, chunk in enumerate(chunks, start=1):
        print(
            f"[{index}/{len(chunks)}] "
            f"Generating embedding for: {chunk['chunk_id']}"
        )

        vector = generate_embedding(client, chunk["text"])

        results.append({
            **chunk,
            "embedding": vector,
        })

    if len(results) != len(chunks):
        raise ValueError("Not all knowledge chunks were processed.")

    OUTPUT_FILE.parent.mkdir(parents=True, exist_ok=True)

    OUTPUT_FILE.write_text(
        json.dumps(results, ensure_ascii=False, indent=2),
        encoding="utf-8",
    )

    print("\nEmbedding generation successful.")
    print(f"Chunks processed: {len(results)}")
    print(f"Vector dimensions: {len(results[0]['embedding'])}")
    print(f"Output file: {OUTPUT_FILE}")


if __name__ == "__main__":
    generate_embeddings()
