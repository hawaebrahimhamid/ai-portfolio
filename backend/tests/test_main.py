
from sqlalchemy.exc import SQLAlchemyError
from datetime import datetime, timezone

import pytest
from fastapi.testclient import TestClient

import main

get_db = main.get_db


class FakeContactMessage:
    """Represent a saved message without using PostgreSQL."""

    next_id = 1

    def __init__(self, name, email, message):
        self.id = FakeContactMessage.next_id
        FakeContactMessage.next_id += 1
        self.name = name
        self.email = email
        self.message = message
        self.created_at = datetime.now(timezone.utc)


class FakeDatabaseSession:
    """Provide the small session interface used by the API."""

    def __init__(self):
        self.added_message = None
        self.committed = False
        self.rolled_back = False

    def add(self, message):
        self.added_message = message

    def commit(self):
        self.committed = True
        self.added_message.id = FakeContactMessage.next_id
        FakeContactMessage.next_id += 1
        self.added_message.created_at = datetime.now(timezone.utc)

    def refresh(self, message):
        # Simulate the database returning its generated fields.
        return None

    def rollback(self):
        self.rolled_back = True

    def close(self):
        return None


@pytest.fixture
def client():
    """Create a test client with a fake database session."""
    fake_db = FakeDatabaseSession()

    def override_get_db():
        yield fake_db

    main.app.dependency_overrides[get_db] = override_get_db

    with TestClient(main.app) as test_client:
        yield test_client

    main.app.dependency_overrides.clear()


def test_health_endpoint(client):
    response = client.get("/health")

    assert response.status_code == 200
    assert response.json()["status"] == "healthy"


def test_readiness_endpoint_when_database_is_available(client, monkeypatch):
    """Report ready when the database query succeeds."""

    class FakeConnection:
        def __enter__(self):
            return self

        def __exit__(self, exc_type, exc_value, traceback):
            return False

        def execute(self, query):
            assert str(query) == "SELECT 1"
            return None

    monkeypatch.setattr(
        main.engine,
        "connect",
        lambda: FakeConnection(),
    )

    response = client.get("/ready")

    assert response.status_code == 200
    assert response.json() == {"status": "ready"}


def test_readiness_endpoint_when_database_fails(client, monkeypatch):
    """Return 503 when the database cannot be reached."""

    def fail_to_connect():
        raise SQLAlchemyError("Simulated database failure")

    monkeypatch.setattr(
        main.engine,
        "connect",
        fail_to_connect,
    )

    response = client.get("/ready")

    assert response.status_code == 503
    assert response.json()["detail"] == (
        "The database is temporarily unavailable."
    )



def test_about_endpoint(client):
    response = client.get("/api/about")

    assert response.status_code == 200
    data = response.json()
    assert data["name"] == "Hawa Ebrahim Hamid"
    assert data["role"] == "AI Engineer & Full-Stack Developer"


def test_valid_contact_message(client):
    response = client.post(
        "/api/contact",
        json={
            "name": "Test Visitor",
            "email": "visitor@example.com",
            "message": "I am testing the portfolio contact API.",
        },
    )

    assert response.status_code == 201
    data = response.json()
    assert data["name"] == "Test Visitor"
    assert data["email"] == "visitor@example.com"
    assert data["message"] == "I am testing the portfolio contact API."
    assert "id" in data
    assert "created_at" in data


def test_whitespace_only_name_is_rejected(client):
    response = client.post(
        "/api/contact",
        json={
            "name": "   ",
            "email": "visitor@example.com",
            "message": "This is a valid-length message.",
        },
    )

    assert response.status_code == 422


def test_short_message_is_rejected(client):
    response = client.post(
        "/api/contact",
        json={
            "name": "Test Visitor",
            "email": "visitor@example.com",
            "message": "Hi.",
        },
    )

    assert response.status_code == 422


def test_invalid_email_is_rejected(client):
    response = client.post(
        "/api/contact",
        json={
            "name": "Test Visitor",
            "email": "not-an-email",
            "message": "This is a valid-length message.",
        },
    )

    assert response.status_code == 422


def test_missing_name_is_rejected(client):
    response = client.post(
        "/api/contact",
        json={
            "email": "visitor@example.com",
            "message": "This is a valid-length message.",
        },
    )

    assert response.status_code == 422


def test_overlong_message_is_rejected(client):
    response = client.post(
        "/api/contact",
        json={
            "name": "Test Visitor",
            "email": "visitor@example.com",
            "message": "a" * 5001,
        },
    )

    assert response.status_code == 422

def test_database_error_returns_500_and_rolls_back():
    fake_db = FakeDatabaseSession()

    def override_get_db():
        yield fake_db

    def fail_commit():
        raise SQLAlchemyError("Simulated database failure")

    fake_db.commit = fail_commit
    main.app.dependency_overrides[get_db] = override_get_db

    try:
        with TestClient(main.app) as test_client:
            response = test_client.post(
                "/api/contact",
                json={
                    "name": "Test Visitor",
                    "email": "visitor@example.com",
                    "message": "Testing database failure handling.",
                },
            )

        assert response.status_code == 500
        assert response.json()["detail"] == (
            "Unable to save your message right now. "
            "Please try again."
        )
        assert fake_db.rolled_back is True

    finally:
        main.app.dependency_overrides.clear()

# -------------------------
# AI chat endpoint tests
# -------------------------

def test_chat_endpoint_returns_answer(client, monkeypatch):
    """Return an answer when the assistant succeeds."""

    def fake_answer_question(question):
        assert question == "What is the CrediTrust project?"
        return "CrediTrust is a RAG-based complaint assistant."

    monkeypatch.setattr(
        main,
        "answer_question",
        fake_answer_question,
    )

    response = client.post(
        "/api/chat",
        json={"question": "What is the CrediTrust project?"},
    )

    assert response.status_code == 200
    assert response.json()["answer"] == (
        "CrediTrust is a RAG-based complaint assistant."
    )


def test_chat_endpoint_rejects_whitespace_question(client):
    """Reject a question containing only whitespace."""

    response = client.post(
        "/api/chat",
        json={"question": "   "},
    )

    assert response.status_code == 422


def test_chat_endpoint_rejects_overlong_question(client):
    """Reject questions longer than the configured limit."""

    response = client.post(
        "/api/chat",
        json={"question": "a" * 1001},
    )

    assert response.status_code == 422


def test_chat_endpoint_returns_503_on_unexpected_error(
    client,
    monkeypatch,
):
    """Return a safe error response if the assistant raises."""

    def fake_answer_question(question):
        raise RuntimeError("Simulated assistant failure")

    monkeypatch.setattr(
        main,
        "answer_question",
        fake_answer_question,
    )

    response = client.post(
        "/api/chat",
        json={"question": "What is the CrediTrust project?"},
    )

    assert response.status_code == 503
    assert response.json()["detail"] == (
        "The portfolio assistant is temporarily unavailable. "
        "Please try again shortly."
    )


def test_chat_endpoint_rejects_empty_assistant_answer(
    client,
    monkeypatch,
):
    """Return a service error if the assistant returns no answer."""

    monkeypatch.setattr(
        main,
        "answer_question",
        lambda question: "",
    )

    response = client.post(
        "/api/chat",
        json={"question": "What is the CrediTrust project?"},
    )

    assert response.status_code == 503

# -------------------------
# Request observability tests
# -------------------------

def test_request_includes_request_id(client):
    """Every response should include a request ID."""
    response = client.get("/health")

    assert response.status_code == 200
    assert response.headers.get("X-Request-ID")


def test_each_request_gets_a_unique_request_id(client):
    """Different requests should receive different request IDs."""
    first_response = client.get("/health")
    second_response = client.get("/health")

    first_request_id = first_response.headers.get("X-Request-ID")
    second_request_id = second_response.headers.get("X-Request-ID")

    assert first_request_id
    assert second_request_id
    assert first_request_id != second_request_id

def test_request_body_limit_rejects_oversized_request(client):
    """Reject request bodies larger than 16 KiB with HTTP 413."""

    oversized_body = b"x" * (16 * 1024 + 1)

    response = client.post(
        "/api/chat",
        content=oversized_body,
        headers={"Content-Type": "application/json"},
    )

    assert response.status_code == 413


def test_contact_rate_limit_returns_429(client):
    """Reject contact submissions after five requests per minute."""

    main.limiter._storage.reset()

    payload = {
        "name": "Test Visitor",
        "email": "visitor@example.com",
        "message": "Testing the contact endpoint rate limit.",
    }

    responses = [
        client.post("/api/contact", json=payload)
        for _ in range(6)
    ]

    assert all(
        response.status_code == 201
        for response in responses[:5]
    )
    assert responses[5].status_code == 429


def test_chat_rate_limit_returns_429(client, monkeypatch):
    """Reject chat requests after ten requests per minute."""

    main.limiter._storage.reset()

    # Mock the AI assistant so the test doesn't call a real AI service.
    monkeypatch.setattr(
        main,
        "answer_question",
        lambda question: "This is a test answer.",
    )

    payload = {
        "question": "What projects have I built?"
    }

    responses = [
        client.post("/api/chat", json=payload)
        for _ in range(11)
    ]

    assert all(
        response.status_code == 200
        for response in responses[:10]
    )
    assert responses[10].status_code == 429
