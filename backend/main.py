
import logging
import time
import uuid
from datetime import datetime

import models
from database import SessionLocal, engine
from email_service import send_contact_notification
from fastapi import (
    BackgroundTasks,
    Depends,
    FastAPI,
    HTTPException,
    Request,
    status,
)
from fastapi.middleware.cors import CORSMiddleware
from portfolio_assistant import answer_question
from slowapi import Limiter, _rate_limit_exceeded_handler
from slowapi.errors import RateLimitExceeded
from slowapi.util import get_remote_address
from sqlalchemy import text
from sqlalchemy.exc import SQLAlchemyError
from sqlalchemy.orm import Session
from starlette.middleware.body_limit import RequestBodyLimitMiddleware
from pydantic import (
    BaseModel,
    ConfigDict,
    EmailStr,
    Field,
    field_validator,
)


# -------------------------
# Logging configuration
# -------------------------

logger = logging.getLogger(__name__)
logger.setLevel(logging.INFO)

if not logger.handlers:
    handler = logging.StreamHandler()
    handler.setFormatter(
        logging.Formatter(
            "%(asctime)s %(levelname)s %(name)s: %(message)s"
        )
    )
    logger.addHandler(handler)

logger.propagate = False


# -------------------------
# FastAPI application
# -------------------------

app = FastAPI(
    title="Hawa's Portfolio API",
    description=(
        "Backend API for Hawa Ebrahim Hamid's "
        "AI Engineer and Full-Stack Developer portfolio."
    ),
    version="1.1.0",
)


# -------------------------
# API rate limiting
# -------------------------

limiter = Limiter(key_func=get_remote_address)

app.state.limiter = limiter

app.add_exception_handler(
    RateLimitExceeded,
    _rate_limit_exceeded_handler,
)


# -------------------------
# Request body size limit
# -------------------------

app.add_middleware(
    RequestBodyLimitMiddleware,
    max_body_size=16 * 1024,
)


# -------------------------
# CORS configuration
# -------------------------

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "http://127.0.0.1:3000",
        "https://ai-portfolio-virid-three.vercel.app",
        "https://hawaebrahim.vercel.app",
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
            (time.perf_counter() - start_time) * 1000,
            2,
        )

        response.headers["X-Request-ID"] = request_id

        logger.info(
            "request_completed request_id=%s method=%s path=%s "
            "status_code=%s duration_ms=%.2f",
            request_id,
            request.method,
            request.url.path,
            response.status_code,
            duration_ms,
        )

        return response

    except Exception as exc:
        duration_ms = round(
            (time.perf_counter() - start_time) * 1000,
            2,
        )

        logger.error(
            "request_failed request_id=%s method=%s path=%s "
            "error_type=%s duration_ms=%.2f",
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
# Background email notification
# -------------------------

def send_contact_notification_background(
    name: str,
    email: str,
    message: str,
):
    """Send the contact notification after the API response."""

    email_start = time.perf_counter()

    try:
        email_sent = send_contact_notification(
            name=name,
            email=email,
            message=message,
        )

        duration_ms = (
            time.perf_counter() - email_start
        ) * 1000

        if email_sent:
            logger.info(
                "contact_email_notification_completed duration_ms=%.2f",
                duration_ms,
            )
        else:
            logger.warning(
                "contact_email_notification_not_sent duration_ms=%.2f",
                duration_ms,
            )

    except Exception as exc:
        logger.error(
            "contact_email_background_failed error_type=%s",
            type(exc).__name__,
        )


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
    background_tasks: BackgroundTasks,
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

        # Measure database commit time.
        db_start = time.perf_counter()

        db.commit()

        logger.info(
            "contact_database_commit_completed duration_ms=%.2f",
            (time.perf_counter() - db_start) * 1000,
        )

        # Refresh the saved record to obtain generated values.
        refresh_start = time.perf_counter()

        db.refresh(new_message)

        logger.info(
            "contact_database_refresh_completed duration_ms=%.2f",
            (time.perf_counter() - refresh_start) * 1000,
        )

        logger.info(
            "contact_message_saved message_id=%s",
            new_message.id,
        )

        # Schedule email notification after the response.
        background_tasks.add_task(
            send_contact_notification_background,
            name=new_message.name,
            email=new_message.email,
            message=new_message.message,
        )

        logger.info(
            "contact_email_notification_scheduled message_id=%s",
            new_message.id,
        )

        return new_message

    except SQLAlchemyError as exc:
        db.rollback()

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

    start_time = time.perf_counter()

    try:
        answer = answer_question(question)

        duration_ms = (
            time.perf_counter() - start_time
        ) * 1000

        logger.info(
            "portfolio_chat_completed duration_ms=%.2f",
            duration_ms,
        )

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
