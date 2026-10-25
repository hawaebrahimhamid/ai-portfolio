
import logging
from datetime import datetime

import models
from database import SessionLocal
from portfolio_assistant import answer_question
from fastapi import Depends, FastAPI, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from pydantic import (
    BaseModel,
    ConfigDict,
    EmailStr,
    Field,
    field_validator,
)
from sqlalchemy.exc import SQLAlchemyError
from sqlalchemy.orm import Session


# Configure logging for backend errors and diagnostics.
logger = logging.getLogger(__name__)


app = FastAPI(
    title="Hawa's Portfolio API",
    description=(
        "Backend API for Hawa Ebrahim Hamid's "
        "AI Engineer and Full-Stack Developer portfolio."
    ),
    version="1.1.0",
)


# Allow requests from the local Next.js development website.
# Add the exact production website origin when deployment is ready.
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "http://127.0.0.1:3000",
    ],
    allow_credentials=False,
    allow_methods=["GET", "POST"],
    allow_headers=["Content-Type"],
)


def get_db():
    """Provide a database session for each request."""
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


# -------------------------
# Contact form models
# -------------------------

class ContactMessageCreate(BaseModel):
    """Validate contact form submissions."""

    name: str = Field(min_length=2, max_length=100)
    email: EmailStr
    message: str = Field(min_length=10, max_length=5000)

    @field_validator("name", "message", mode="before")
    @classmethod
    def strip_text_fields(cls, value):
        """Remove leading and trailing whitespace."""
        if isinstance(value, str):
            return value.strip()
        return value


class ContactMessageResponse(BaseModel):
    """Define the public response for a saved message."""

    model_config = ConfigDict(from_attributes=True)

    id: int
    name: str
    email: EmailStr
    message: str
    created_at: datetime


# -------------------------
# AI chat request/response models
# -------------------------

class ChatRequest(BaseModel):
    """Validate a visitor's question for the AI assistant."""

    question: str = Field(min_length=3, max_length=1000)

    @field_validator("question", mode="before")
    @classmethod
    def strip_question(cls, value):
        """Remove surrounding whitespace."""
        if isinstance(value, str):
            return value.strip()
        return value


class ChatResponse(BaseModel):
    """Define the response returned by the AI assistant."""

    answer: str


# -------------------------
# Health endpoint
# -------------------------

@app.get("/health", tags=["Health"])
def health_check():
    """Check whether the API is responding."""
    return {
        "status": "healthy",
        "message": "Portfolio API is running successfully.",
    }


# -------------------------
# Portfolio information endpoint
# -------------------------

@app.get("/api/about", tags=["Portfolio"])
def get_about():
    """Return basic portfolio information."""
    return {
        "name": "Hawa Ebrahim Hamid",
        "role": "AI Engineer & Full-Stack Developer",
        "portfolio_focus": [
            "Generative AI and RAG",
            "Full-Stack Web Development",
            "Python and FastAPI",
            "REST APIs and Databases",
        ],
        "message": "Welcome to my portfolio API.",
    }


# -------------------------
# Contact form endpoint
# -------------------------

@app.post(
    "/api/contact",
    response_model=ContactMessageResponse,
    status_code=status.HTTP_201_CREATED,
    tags=["Contact"],
)
def create_contact_message(
    contact: ContactMessageCreate,
    db: Session = Depends(get_db),
):
    """Validate and save a contact message to PostgreSQL."""

    new_message = models.ContactMessage(
        name=contact.name,
        email=str(contact.email),
        message=contact.message,
    )

    try:
        db.add(new_message)
        db.commit()
        db.refresh(new_message)

        logger.info(
            "Portfolio contact message saved. Message ID: %s",
            new_message.id,
        )

        return new_message

    except SQLAlchemyError:
        db.rollback()

        logger.exception(
            "Database error while saving a portfolio contact message."
        )

        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=(
                "Unable to save your message right now. "
                "Please try again."
            ),
        ) from None


# -------------------------
# AI portfolio chat endpoint
# -------------------------

@app.post(
    "/api/chat",
    response_model=ChatResponse,
    tags=["AI Assistant"],
)
def chat_with_portfolio(request: ChatRequest):
    """Answer a visitor's question using the portfolio RAG assistant."""

    question = request.question.strip()

    if not question:
        raise HTTPException(
            status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
            detail="Please enter a question.",
        )

    try:
        answer = answer_question(question)

        if not answer or not answer.strip():
            raise HTTPException(
                status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
                detail="The assistant could not generate an answer. Please try again.",
            )

        return ChatResponse(answer=answer.strip())

    except HTTPException:
        raise

    except Exception:
        logger.exception("Unexpected error in the portfolio chat endpoint.")

        raise HTTPException(
            status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
            detail=(
                "The portfolio assistant is temporarily unavailable. "
                "Please try again shortly."
            ),
        ) from None
