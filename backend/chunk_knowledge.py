
import json
from pathlib import Path

KNOWLEDGE_FILE = Path(__file__).parent / "knowledge" / "portfolio.json"


def load_knowledge():
    """Load structured portfolio information from JSON."""
    with KNOWLEDGE_FILE.open("r", encoding="utf-8") as file:
        return json.load(file)


def chunk_knowledge():
    """Convert portfolio facts into searchable text chunks."""
    data = load_knowledge()
    chunks = []

    owner = data["portfolio_owner"]

    chunks.append({
        "chunk_id": "owner-profile",
        "source": "portfolio_owner",
        "text": (
            f"{owner['name']} is a {owner['role']} based in "
            f"{owner['location']}. Professional focus areas: "
            + ", ".join(owner["professional_focus"])
            + "."
        ),
    })

    for index, skill_group in enumerate(data["skills"]):
        chunks.append({
            "chunk_id": f"skills-{index + 1}",
            "source": "skills",
            "category": skill_group["category"],
            "text": (
                f"Skill category: {skill_group['category']}. "
                "Technologies: "
                + ", ".join(skill_group["technologies"])
                + "."
            ),
        })

    for project in data["projects"]:
        project_text = (
            f"Project: {project['name']}. "
            f"Description: {project['description']} "
            "Technologies: "
            + ", ".join(project["technologies"])
            + "."
        )

        chunks.append({
            "chunk_id": f"{project['id']}-overview",
            "source": "project",
            "project_id": project["id"],
            "text": project_text,
        })

        for index, detail in enumerate(
            project.get("implementation_details", [])
        ):
            chunks.append({
                "chunk_id": f"{project['id']}-detail-{index + 1}",
                "source": "project",
                "project_id": project["id"],
                "text": f"Project: {project['name']}. {detail}",
            })

    portfolio_project = data["current_portfolio_project"]

    chunks.append({
        "chunk_id": "current-portfolio-project",
        "source": "current_portfolio_project",
        "text": (
            f"Project: {portfolio_project['name']}. "
            f"{portfolio_project['description']} "
            "Completed backend features: "
            + ", ".join(portfolio_project["completed_backend_features"])
            + ". Planned AI features: "
            + ", ".join(portfolio_project["planned_ai_features"])
            + "."
        ),
    })

    return chunks


if __name__ == "__main__":
    chunks = chunk_knowledge()

    print(f"Knowledge base loaded: {KNOWLEDGE_FILE}")
    print(f"Total chunks created: {len(chunks)}")

    for chunk in chunks:
        print(f"\n[{chunk['chunk_id']}]")
        print(chunk["text"])
