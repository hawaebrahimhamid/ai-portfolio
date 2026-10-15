
from fastapi import FastAPI

app = FastAPI(
    title="Hawa's Portfolio API",
    description="Backend API for my AI Engineer and Full-Stack Developer portfolio.",
    version="1.0.0",
)


@app.get("/health")
def health_check():
    return {
        "status": "healthy",
        "message": "Portfolio API is running successfully.",
    }



@app.get("/api/about")
def get_about():
    return {
        "name": "Hawa Ebrahim Hamid",
        "role": "AI Engineer & Full-Stack Developer",
        "portfolio_focus": [
            "Generative AI and RAG",
            "Full-Stack Web Development",
            "Python and FastAPI",
            "REST APIs and Databases"
        ],
        "message": "Welcome to my portfolio API."
    }
