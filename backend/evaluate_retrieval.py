
"""Evaluate portfolio retrieval quality using ranked results and expected facts.

Run from the backend directory:
    python evaluate_retrieval.py

This diagnostic evaluates retrieval results only. It does not evaluate
the final Gemini-generated answer or establish a production threshold.
"""

from sentence_transformers import SentenceTransformer
from sqlalchemy import select

from database import SessionLocal
from models import PortfolioKnowledge
from portfolio_assistant import (
    EMBEDDING_MODEL,
    TOP_K,
    find_project_id,
    is_experience_background_question,
    PROJECT_KEYWORDS,
)


EVALUATION_CASES = [
    {
        "name": "CrediTrust project",
        "question": "What is the CrediTrust Complaint Assistant?",
        "expected_terms": ["creditrust", "complaint"],
        "expected_chunk_terms": ["creditrust"],
    },
    {
        "name": "Brent Oil dashboard",
        "question": "Explain the Brent Oil Change Point Dashboard.",
        "expected_terms": ["brent oil", "change point"],
        "expected_chunk_terms": ["brent-oil"],
    },
    {
        "name": "Medical Telegram project",
        "question": "What is the Medical Telegram Warehouse project?",
        "expected_terms": ["medical telegram"],
        "expected_chunk_terms": ["medical-telegram"],
    },
    {
        "name": "AI training certificate",
        "question": "What AI training certificate did Hawa receive?",
        "expected_terms": ["kifiya", "distinction"],
        "expected_chunk_terms": ["owner-profile"],
    },
    {
        "name": "CrediTrust RAG technologies",
        "question": "Which technologies are used in the CrediTrust RAG assistant?",
        "expected_terms": ["faiss"],
        "expected_chunk_terms": ["creditrust"],
    },
    {
        "name": "Unrelated weather question",
        "question": "What is the weather forecast in Addis Ababa?",
        "expected_terms": [],
        "expected_chunk_terms": [],
        "diagnostic_only": True,
    },
    {
        "name": "Unsupported personal information",
        "question": "What is Hawa's bank account balance?",
        "expected_terms": [],
        "expected_chunk_terms": [],
        "diagnostic_only": True,
    },

    {
        "name": "CrediTrust embedding model",
        "question": "Which embedding model does the CrediTrust Complaint Assistant use?",
        "expected_terms": ["minilm"],
        "expected_chunk_terms": ["creditrust"],
    },
    {
        "name": "Medical Telegram pipeline",
        "question": "How does the Medical Telegram Warehouse process images?",
        "expected_terms": ["yolov8"],
        "expected_chunk_terms": ["medical-telegram"],
    },
    {
        "name": "Brent Oil analysis methods",
        "question": "Which tools and methods are used in the Brent Oil change point analysis?",
        "expected_terms": ["pymc"],
        "expected_chunk_terms": ["brent-oil"],
    },
    {
    "name": "Portfolio professional focus",
    "question": "What are Hawa's professional focus areas?",
    "expected_terms": [
        "generative ai",
        "full-stack web development",
    ],
    "expected_chunk_terms": ["owner-profile"],
},
    {
        "name": "Unsupported medical diagnosis",
        "question": "What medical diagnosis does Hawa have?",
        "expected_terms": [],
        "expected_chunk_terms": [],
        "diagnostic_only": True,
    },
    {
        "name": "Specific project demo",
        "question": "Where can I try the CrediTrust Complaint Assistant?",
        "expected_terms": [],
        "expected_chunk_terms": [],
        "diagnostic_only": True,
    },
    {
        "name": "Project database technology",
        "question": "Which database does the Medical Telegram Warehouse use?",
        "expected_terms": [],
        "expected_chunk_terms": [],
        "diagnostic_only": True,
    },
    {
        "name": "Unsupported salary question",
        "question": "What salary does Hawa currently earn?",
        "expected_terms": [],
        "expected_chunk_terms": [],
        "diagnostic_only": True,
    },
    {
        "name": "Unrelated sports question",
        "question": "Who won the latest football match?",
        "expected_terms": [],
        "expected_chunk_terms": [],
        "diagnostic_only": True,
    },
    {
        "name": "Unsupported employment history",
        "question": "Which companies have employed Hawa as a software engineer?",
        "expected_terms": [],
        "expected_chunk_terms": [],
        "diagnostic_only": True,
    },

]


def retrieve_chunks(model, case):
    """Retrieve ranked chunks using the current portfolio retrieval rules."""
    question = case["question"]
    question_lower = question.lower()

    selected_project_id = find_project_id(question)
    is_background = is_experience_background_question(question)

    is_project_question = (
        not is_background
        and (
            selected_project_id is not None
            or any(
                keyword in question_lower
                for keyword in PROJECT_KEYWORDS
            )
        )
    )

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
        )

        if is_project_question:
            statement = statement.where(
                PortfolioKnowledge.source == "project"
            )

        results = session.execute(
            statement.limit(TOP_K)
        ).all()

        # Preserve the current behavior for general project questions:
        # add overview chunks before the ranked results.
        if is_project_question and not selected_project_id:
            overview_statement = (
                select(PortfolioKnowledge)
                .where(
                    PortfolioKnowledge.source == "project",
                    PortfolioKnowledge.chunk_id.like("%-overview"),
                )
                .order_by(PortfolioKnowledge.chunk_id)
            )

            overview_chunks = session.scalars(
                overview_statement
            ).all()
        else:
            overview_chunks = []

    retrieved = []
    seen_ids = set()

    for chunk in overview_chunks:
        if chunk.chunk_id not in seen_ids:
            retrieved.append((chunk, None, "overview"))
            seen_ids.add(chunk.chunk_id)

    for chunk, score in results:
        if chunk.chunk_id not in seen_ids:
            retrieved.append((chunk, float(score), "ranked"))
            seen_ids.add(chunk.chunk_id)

    return retrieved[:8]


def evaluate_case(case, retrieved):
    """Check expected evidence and return retrieval evaluation details."""
    retrieved_text = "\n".join(
        chunk.text for chunk, _, _ in retrieved
    ).lower()

    missing_terms = [
        term
        for term in case["expected_terms"]
        if term.lower() not in retrieved_text
    ]

    matching_ranks = [
        rank
        for rank, (chunk, _, _) in enumerate(retrieved, start=1)
        if any(
            term.lower() in chunk.chunk_id.lower()
            for term in case["expected_chunk_terms"]
        )
    ]

    ranked_distances = [
        score
        for _, score, result_type in retrieved
        if result_type == "ranked" and score is not None
    ]

    best_distance = (
        min(ranked_distances)
        if ranked_distances
        else None
    )

    diagnostic_only = case.get("diagnostic_only", False)

    if diagnostic_only:
        status = "DIAGNOSTIC"
    elif not missing_terms and matching_ranks:
        status = "PASS"
    else:
        status = "FAIL"

    return {
        "status": status,
        "missing_terms": missing_terms,
        "matching_ranks": matching_ranks,
        "best_distance": best_distance,
    }


def main():
    print("Loading embedding model...")

    model = SentenceTransformer(EMBEDDING_MODEL)

    passed = 0
    failed = 0
    errored = 0
    diagnostic_count = 0

    print("\nPortfolio Retrieval Evaluation")
    print("=" * 65)
    print(f"Embedding model: {EMBEDDING_MODEL}")
    print(f"Configured TOP_K: {TOP_K}")
    print(f"Evaluation cases: {len(EVALUATION_CASES)}")

    for case in EVALUATION_CASES:
        question = case["question"]

        try:
            retrieved = retrieve_chunks(model, case)
            result = evaluate_case(case, retrieved)

            status = result["status"]

            if status == "PASS":
                passed += 1
            elif status == "FAIL":
                failed += 1
            else:
                diagnostic_count += 1

            print(f"\n[{status}] {case['name']}")
            print(f"Question: {question}")
            print(
                "Expected chunk ID terms: "
                f"{case['expected_chunk_terms']}"
            )
            print(
                "Matching chunk ranks: "
                f"{result['matching_ranks'] or 'None'}"
            )

            if result["missing_terms"]:
                print(
                    "Missing expected content terms: "
                    f"{result['missing_terms']}"
                )

            best_distance = result["best_distance"]

            if best_distance is not None:
                print(f"Best cosine distance: {best_distance:.4f}")
            else:
                print("Best cosine distance: unavailable")

            print("Retrieved chunks:")

            if not retrieved:
                print("  No chunks retrieved.")

            for rank, (chunk, score, result_type) in enumerate(
                retrieved,
                start=1,
            ):
                distance_text = (
                    f"{score:.4f}"
                    if score is not None
                    else "not calculated (overview)"
                )

                print(
                    f"  {rank}. {chunk.chunk_id} | "
                    f"cosine distance: {distance_text} | "
                    f"type: {result_type}"
                )

        except Exception as exc:
            errored += 1
            print(f"\n[ERROR] {case['name']}")
            print(f"Question: {question}")
            print(f"Error type: {type(exc).__name__}: {exc}")

    evaluated = passed + failed

    print("\n" + "=" * 65)
    print("EVALUATION SUMMARY")
    print("-" * 65)
    print(f"Passed: {passed}/{evaluated}")
    print(f"Failed: {failed}/{evaluated}")
    print(f"Errors: {errored}")
    print(f"Diagnostic cases completed: {diagnostic_count}")
    print(f"Total configured cases: {len(EVALUATION_CASES)}")

    print(
        "\nPASS/FAIL cases check expected content terms and expected "
        "chunk IDs. Diagnostic cases are excluded from those totals."
    )
    print(
        "This script evaluates retrieval, not Gemini answer quality. "
        "No production relevance threshold has been established."
    )


if __name__ == "__main__":
    main()
