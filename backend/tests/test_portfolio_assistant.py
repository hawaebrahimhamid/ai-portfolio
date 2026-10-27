
import importlib
import sys
from types import SimpleNamespace
from unittest.mock import Mock

import pytest


@pytest.fixture
def assistant(monkeypatch):
    """Import the assistant without loading a real AI model or API client."""

    monkeypatch.setenv("GEMINI_API_KEY", "test-key")

    import google.genai as genai
    import sentence_transformers

    monkeypatch.setattr(
        genai,
        "Client",
        lambda **kwargs: Mock(),
    )
    monkeypatch.setattr(
        sentence_transformers,
        "SentenceTransformer",
        lambda *args, **kwargs: Mock(),
    )

    sys.modules.pop("portfolio_assistant", None)
    module = importlib.import_module("portfolio_assistant")

    yield module

    sys.modules.pop("portfolio_assistant", None)


def test_career_question_uses_documented_background(assistant, monkeypatch):
    """Avoid inventing years of professional employment."""

    generator = Mock(
        side_effect=AssertionError("Gemini should not be called")
    )
    monkeypatch.setattr(assistant, "generate_with_retry", generator)

    answer = assistant.answer_question(
        "How many years of professional experience does Hawa have?"
    )

    assert "independent projects" in answer
    assert "technical training" in answer
    assert "does not establish several years" in answer
    generator.assert_not_called()



def test_no_retrieved_evidence_does_not_call_gemini(assistant, monkeypatch):
    """Return the safe fallback when retrieval finds no evidence."""

    monkeypatch.setattr(
        assistant,
        "retrieve_knowledge",
        lambda question: [],
    )
    generator = Mock(
        side_effect=AssertionError("Gemini should not be called")
    )
    monkeypatch.setattr(assistant, "generate_with_retry", generator)

    answer = assistant.answer_question(
        "What is Hawa's favorite football team?"
    )

    assert answer == (
        "I couldn't find relevant information in the "
        "portfolio knowledge base."
    )
    generator.assert_not_called()


def test_project_question_uses_retrieved_evidence(assistant, monkeypatch):
    """Pass retrieved portfolio evidence to the answer generator."""

    evidence = "CrediTrust is a RAG-based complaint assistant."
    monkeypatch.setattr(
        assistant,
        "retrieve_knowledge",
        lambda question: [evidence],
    )

    generator = Mock(
        return_value=SimpleNamespace(
            candidates=[],
            text="CrediTrust is a RAG-based complaint assistant.",
        )
    )
    monkeypatch.setattr(assistant, "generate_with_retry", generator)

    answer = assistant.answer_question(
        "What does the CrediTrust project do?"
    )

    assert answer == "CrediTrust is a RAG-based complaint assistant."
    generator.assert_called_once()

    prompt = generator.call_args.args[0]
    assert evidence in prompt
    assert "Do not invent employment history" in prompt
