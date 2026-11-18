
import json
from pathlib import Path

KNOWLEDGE_FILE = (
    Path(__file__).parent
    / "knowledge"
    / "portfolio.json"
)


def load_knowledge():
    """Load structured portfolio information from JSON."""
    with KNOWLEDGE_FILE.open("r", encoding="utf-8") as file:
        return json.load(file)


def create_chunk(chunk_id, source, text, **metadata):
    """Create a consistently structured knowledge chunk."""
    return {
        "chunk_id": chunk_id,
        "source": source,
        "text": text.strip(),
        **metadata,
    }


def chunk_knowledge():
    """Convert portfolio information into searchable text chunks."""
    data = load_knowledge()
    chunks = []

    # --------------------------------------------------
    # 1. Portfolio owner and professional background
    # --------------------------------------------------

    owner = data["portfolio_owner"]

    certification_details = []

    for cert in owner.get("certifications", []):
        details = (
            f"{cert['name']}. "
            f"Provider: {cert['provider']}. "
            f"Achievement: {cert['achievement']}. "
            f"Issued: {cert['issued']}. "
            f"Type: {cert['type']}."
        )

        topics = cert.get("topics", [])

        if topics:
            details += " Topics covered: " + ", ".join(topics) + "."

        certificate_path = cert.get("certificate_path")

        if certificate_path:
            details += f" Certificate file: {certificate_path}."

        certification_details.append(details)

    owner_text = (
        f"{owner['name']} is a {owner['role']} based in "
        f"{owner['location']}. "
        f"Professional focus areas: "
        f"{', '.join(owner['professional_focus'])}. "
        f"{owner['experience_summary']}"
    )

    if certification_details:
        owner_text += (
            " Training programs and certificates: "
            + " ".join(certification_details)
        )

    chunks.append(
        create_chunk(
            "owner-profile",
            "portfolio_owner",
            owner_text,
        )
    )

    # --------------------------------------------------
    # 2. Skills
    # --------------------------------------------------

    for index, skill_group in enumerate(data["skills"], start=1):
        category = skill_group["category"]

        chunks.append(
            create_chunk(
                f"skills-{index}",
                "skills",
                (
                    f"Skill category: {category}. "
                    "Technologies: "
                    + ", ".join(skill_group["technologies"])
                    + "."
                ),
                category=category,
            )
        )

    # --------------------------------------------------
    # 3. Main portfolio projects
    # --------------------------------------------------

    for project in data["projects"]:
        project_id = project["id"]
        project_name = project["name"]

        overview_text = (
            f"Project: {project_name}. "
            f"Description: {project['description']} "
            "Technologies: "
            + ", ".join(project["technologies"])
            + "."
        )

        chunks.append(
            create_chunk(
                f"{project_id}-overview",
                "project",
                overview_text,
                project_id=project_id,
            )
        )

        for index, detail in enumerate(
            project.get("implementation_details", []),
            start=1,
        ):
            chunks.append(
                create_chunk(
                    f"{project_id}-detail-{index}",
                    "project",
                    f"Project: {project_name}. {detail}",
                    project_id=project_id,
                )
            )

    # --------------------------------------------------
    # 4. Current AI Portfolio Platform
    # --------------------------------------------------

    portfolio = data["current_portfolio_project"]

    portfolio_id = "ai-portfolio-platform"
    portfolio_name = portfolio["name"]

    portfolio_overview = (
        f"Project: {portfolio_name}. "
        f"{portfolio['description']} "
        "Frontend technologies: "
        + ", ".join(portfolio.get("frontend", []))
        + ". Backend technologies: "
        + ", ".join(portfolio.get("backend", []))
        + "."
    )

    chunks.append(
        create_chunk(
            "current-portfolio-project",
            "current_portfolio_project",
            portfolio_overview,
            project_id=portfolio_id,
        )
    )

    # Each section gets its own searchable chunk.
    portfolio_sections = [
        (
            "database",
            "Database architecture",
            "Database technologies",
        ),
        (
            "ai_technologies",
            "AI technologies",
            "AI technologies",
        ),
        (
            "completed_backend_features",
            "Implemented backend features",
            "Completed backend features",
        ),
        (
            "completed_ai_features",
            "Implemented AI assistant features",
            "Completed AI features",
        ),
        (
            "architecture",
            "System architecture",
            "Architecture details",
        ),
        (
            "deployment",
            "Deployment architecture",
            "Deployment details",
        ),
        (
            "engineering_decisions",
            "Engineering decisions",
            "Engineering decisions",
        ),
        (
            "testing",
            "Testing and verification",
            "Testing details",
        ),
        (
            "limitations",
            "Known limitations",
            "Limitations",
        ),
    ]

    for field, heading, description in portfolio_sections:
        details = portfolio.get(field, [])

        if not details:
            continue

        chunks.append(
            create_chunk(
                f"ai-portfolio-{field.replace('_', '-')}",
                "current_portfolio_project",
                (
                    f"Project: {portfolio_name}. "
                    f"{heading}: "
                    + ". ".join(item.strip().rstrip(".") for item in details)
                ),
                project_id=portfolio_id,
                category=field,
            )
        )

    # --------------------------------------------------
    # 5. Portfolio contributions
    # --------------------------------------------------

    contribution = portfolio.get("contribution")

    if contribution:
        chunks.append(
            create_chunk(
                "ai-portfolio-contributions",
                "current_portfolio_project",
                (
                    f"Project: {portfolio_name}. "
                    "Developer contributions: "
                    f"{contribution}"
                ),
                project_id=portfolio_id,
            )
        )

    # --------------------------------------------------
    # 6. Validate generated chunks
    # --------------------------------------------------

    chunk_ids = [
        chunk["chunk_id"]
        for chunk in chunks
    ]

    if len(chunk_ids) != len(set(chunk_ids)):
        raise ValueError("Duplicate knowledge chunk IDs detected.")

    for chunk in chunks:
        if not chunk["text"]:
            raise ValueError(
                f"Empty knowledge chunk detected: {chunk['chunk_id']}"
            )

        if len(chunk["chunk_id"]) > 150:
            raise ValueError(
                f"Chunk ID exceeds database limit: {chunk['chunk_id']}"
            )

    return chunks


if __name__ == "__main__":
    chunks = chunk_knowledge()

    print(f"Knowledge source: {KNOWLEDGE_FILE}")
    print(f"Total chunks created: {len(chunks)}")

    for chunk in chunks:
        print(f"\n[{chunk['chunk_id']}]")
        print(f"Source: {chunk['source']}")
        print(chunk["text"])
