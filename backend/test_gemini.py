
import os
from pathlib import Path

from dotenv import load_dotenv
from google import genai

# Load the API key directly from backend/.env
env_path = Path(__file__).resolve().parent / ".env"
load_dotenv(dotenv_path=env_path, override=True)

api_key = os.getenv("GEMINI_API_KEY")

if not api_key or api_key == "your_gemini_api_key_here":
    raise RuntimeError(
        "GEMINI_API_KEY is missing. Check your backend/.env file."
    )

# Use the same model as the actual portfolio assistant
GEMINI_MODEL = "gemini-3.5-flash-lite"

client = genai.Client(api_key=api_key)

response = client.models.generate_content(
    model=GEMINI_MODEL,
    contents="In one short sentence, introduce Hawa as an AI Engineer and Full-Stack Developer."
)

print("Gemini API test successful!")
print("Model:", GEMINI_MODEL)
print("Gemini response:")
print(response.text)
