
import logging
from datetime import datetime

from fastapi import Depends, FastAPI, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, ConfigDict, EmailStr, Field, field_validator
from sqlalchemy.exc import SQLAlchemyError
from sqlalchemy.orm import Session

from database import SessionLocal
import models


# Log unexpected errors in the backend terminal.
logger = logging.getLogger(__name__)


app = FastAPI(
    title="Hawa's Portfolio API",
    description=(
        "Backend API for my AI Engineer "
        "and Full-Stack Developer portfolio."
    ),
    version="1.0.0",
)


# Allow requests from the local development frontend.
# Add your exact production website origin when deployed.
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


@app.get("/health")
def health_check():
    """Check whether the API is responding."""
    return {
        "status": "healthy",
        "message": "Portfolio API is running successfully.",
    }


@app.get("/api/about")
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


@app.post(
    "/api/contact",
    response_model=ContactMessageResponse,
    status_code=status.HTTP_201_CREATED,
)
def create_contact_message(
    contact: ContactMessageCreate,
    db: Session = Depends(get_db),
):
    """Validate and save a contact message to PostgreSQL."""

    # Pydantic has already validated the field lengths, email,
    # and trimmed the text fields.
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
            "Portfolio contact message saved successfully. Message ID: %s",
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
