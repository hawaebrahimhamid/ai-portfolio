import os
from dotenv import load_dotenv
from google import genai

# Load settings from the backend/.env file
load_dotenv()

api_key = os.getenv("GEMINI_API_KEY")

if not api_key:
    raise RuntimeError(
        "GEMINI_API_KEY is missing. Check your backend/.env file."
    )

# Connect to Gemini without displaying your API key
client = genai.Client(api_key=api_key)

# Send a simple test question to Gemini
response = client.models.generate_content(
    model="gemini-3.8-flash",
    contents="In one short sentence, introduce Hawa as an AI Engineer and Full-Stack Developer."
)

print("Gemini response:")
print(response.text)
