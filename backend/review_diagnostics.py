from evaluate_retrieval import (
    EVALUATION_CASES,
    SentenceTransformer,
    EMBEDDING_MODEL,
    retrieve_chunks,
    evaluate_case,
)

diagnostic_cases = [
    case for case in EVALUATION_CASES
    if case.get("diagnostic_only", False)
]

model = SentenceTransformer(EMBEDDING_MODEL)

print("\nDIAGNOSTIC RETRIEVAL REVIEW")
print("=" * 65)

for case in diagnostic_cases:
    retrieved = retrieve_chunks(model, case)
    result = evaluate_case(case, retrieved)

    print(f"\nQuestion: {case['question']}")
    print(f"Best distance: {result['best_distance']}")

    for rank, (chunk, distance, result_type) in enumerate(
        retrieved[:5], start=1
    ):
        distance_text = (
            f"{distance:.4f}" if distance is not None else "N/A"
        )
        print(
            f"  {rank}. {chunk.chunk_id} | "
            f"{distance_text} | type: {result_type}"
        )
