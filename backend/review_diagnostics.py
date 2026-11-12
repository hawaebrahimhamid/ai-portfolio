
"""Review diagnostic-only portfolio retrieval cases.

Run from the backend directory:
    python review_diagnostics.py

This script displays retrieved chunks for diagnostic questions.
It does not establish a production relevance threshold.
"""

from evaluate_retrieval import (
    EMBEDDING_MODEL,
    EVALUATION_CASES,
    evaluate_case,
    retrieve_chunks,
)


def main():
    diagnostic_cases = [
        case
        for case in EVALUATION_CASES
        if case.get("diagnostic_only", False)
    ]

    print("\nDIAGNOSTIC RETRIEVAL REVIEW")
    print("=" * 65)
    print(f"Embedding model: {EMBEDDING_MODEL}")
    print("Embedding dimensions: 768")
    print(f"Diagnostic cases: {len(diagnostic_cases)}")

    completed = 0
    errors = 0

    for case in diagnostic_cases:
        try:
            retrieved = retrieve_chunks(case)
            result = evaluate_case(case, retrieved)

            completed += 1

            print(f"\nQuestion: {case['question']}")
            print(f"Best distance: {result['best_distance']}")

            if not retrieved:
                print("No chunks retrieved.")

            for rank, (chunk, distance, result_type) in enumerate(
                retrieved[:5],
                start=1,
            ):
                distance_text = (
                    f"{distance:.4f}"
                    if distance is not None
                    else "N/A"
                )

                print(
                    f"  {rank}. {chunk.chunk_id} | "
                    f"{distance_text} | type: {result_type}"
                )

        except Exception as exc:
            errors += 1
            print(f"\n[ERROR] {case['name']}")
            print(
                f"Error type: {type(exc).__name__}: {exc}"
            )

    print("\n" + "=" * 65)
    print("DIAGNOSTIC REVIEW SUMMARY")
    print("-" * 65)
    print(f"Completed: {completed}")
    print(f"Errors: {errors}")
    print(f"Total diagnostic cases: {len(diagnostic_cases)}")


if __name__ == "__main__":
    main()
