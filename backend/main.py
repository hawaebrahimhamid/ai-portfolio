
import logging
import time
import uuid
from datetime import datetime

import models
from slowapi import Limiter, _rate_limit_exceeded_handler
from slowapi.errors import RateLimitExceeded
from slowapi.util import get_remote_address
from database import SessionLocal, engine
from starlette.middleware.body_limit import RequestBodyLimitMiddleware
from fastapi import Depends, FastAPI, HTTPException, Request, status
from fastapi.middleware.cors import CORSMiddleware
from portfolio_assistant import answer_question
from pydantic import (
    BaseModel,
    ConfigDict,
    EmailStr,
    Field,
    field_validator,
)
from sqlalchemy import text
from sqlalchemy.exc import SQLAlchemyError
from sqlalchemy.orm import Session

# Configure backend logging.
logger = logging.getLogger(__name__)

app = FastAPI(
    title="Hawa's Portfolio API",
    description=(
        "Backend API for Hawa Ebrahim Hamid's "
        "AI Engineer and Full-Stack Developer portfolio."
    ),
    version="1.1.0",
)

# Configure API rate limiting.
limiter = Limiter(key_func=get_remote_address)
app.state.limiter = limiter
app.add_exception_handler(
    RateLimitExceeded,
    _rate_limit_exceeded_handler,
)


# Limit incoming HTTP request bodies to 16 KiB.
app.add_middleware(
    RequestBodyLimitMiddleware,
    max_body_size=16 * 1024,
)

# Allow requests from the local Next.js development website.
# Add your exact production website origin when deployment is ready.
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "http://127.0.0.1:3000",
    ],
    allow_credentials=False,
    allow_methods=["GET", "POST"],
    allow_headers=["Content-Type"],
    expose_headers=["X-Request-ID"],
)


# -------------------------
# Request observability
# -------------------------

@app.middleware("http")
async def observe_requests(request: Request, call_next):
    """Track request IDs, processing time, and HTTP outcomes."""
    request_id = str(uuid.uuid4())
    start_time = time.perf_counter()

    try:
        response = await call_next(request)
        duration_ms = round(
            (time.perf_counter() - start_time) * 1000, 2
        )

        response.headers["X-Request-ID"] = request_id

        logger.info(
            "request_completed request_id=%s method=%s path=%s "
            "status_code=%s duration_ms=%s",
            request_id,
            request.method,
            request.url.path,
            response.status_code,
            duration_ms,
        )

        return response

    except Exception as exc:
        duration_ms = round(
            (time.perf_counter() - start_time) * 1000, 2
        )

        # Log the exception type, not its message or request contents.
        logger.error(
            "request_failed request_id=%s method=%s path=%s "
            "error_type=%s duration_ms=%s",
            request_id,
            request.method,
            request.url.path,
            type(exc).__name__,
            duration_ms,
        )

        raise


# -------------------------
# Database dependency
# -------------------------

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
# Health and readiness endpoints
# -------------------------

@app.get("/health", tags=["Health"])
def health_check():
    """Check whether the API process is responding."""
    return {
        "status": "healthy",
        "message": "Portfolio API is running successfully.",
    }


@app.get("/ready", tags=["Health"])
def readiness_check():
    """Check whether the API can reach its database."""
    try:
        with engine.connect() as connection:
            connection.execute(text("SELECT 1"))

        return {"status": "ready"}

    except SQLAlchemyError:
        logger.warning("database_readiness_check_failed")

        raise HTTPException(
            status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
            detail="The database is temporarily unavailable.",
        ) from None


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
@limiter.limit("5/minute")
def create_contact_message(
    request: Request,
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

        # Do not log the contact's name, email, or message.
        logger.info(
            "contact_message_saved message_id=%s",
            new_message.id,
        )

        return new_message

    except SQLAlchemyError as exc:
        db.rollback()

        # Avoid logging database exception details that might
        # contain SQL statements or submitted data.
        logger.error(
            "contact_message_save_failed error_type=%s",
            type(exc).__name__,
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
@limiter.limit("10/minute")
def chat_with_portfolio(
    request: Request,
    chat_request: ChatRequest,
):
    """Answer a visitor's question using the portfolio RAG assistant."""

    question = chat_request.question.strip()


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
                detail=(
                    "The assistant could not generate an answer. "
                    "Please try again."
                ),
            )

        return ChatResponse(answer=answer.strip())

    except HTTPException:
        raise

    except Exception as exc:
        # Do not log the question, answer, or exception message.
        logger.error(
            "portfolio_chat_failed error_type=%s",
            type(exc).__name__,
        )

        raise HTTPException(
            status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
            detail=(
                "The portfolio assistant is temporarily unavailable. "
                "Please try again shortly."
            ),
        ) from None
