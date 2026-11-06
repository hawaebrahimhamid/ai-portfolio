# AI Engineer & Full-Stack Developer Portfolio

A professional portfolio showcasing my hands-on projects in **AI engineering, machine learning, data engineering, and full-stack web development**. It includes an AI-powered portfolio assistant that uses semantic search and a large language model to answer questions about my background, technical skills, and projects.

**Live Portfolio:** Coming soon — public deployment pending.

**GitHub Repository:** [ai-portfolio](https://github.com/hawaebrahimhamid/ai-portfolio)

---

## About

I am an AI Engineer and Full-Stack Developer focused on building practical AI-powered applications and web solutions.

My experience is demonstrated through independent software projects and technical training, where I have worked with Python, JavaScript, TypeScript, React, Next.js, FastAPI, Flask, PostgreSQL, and AI technologies.

This portfolio brings together selected projects, technical skills, and an AI-powered assistant designed to help visitors explore my work.

## Technical Skills

### Programming Languages
- Python
- JavaScript
- TypeScript
- SQL

### Frontend Development
- React.js
- Next.js
- HTML5
- CSS3
- Tailwind CSS

### Backend Development
- Node.js
- Express.js
- FastAPI
- Flask
- REST APIs

### Databases
- PostgreSQL
- MySQL
- Firebase Firestore
- pgvector

### AI & Machine Learning
- Large Language Models (LLMs)
- Retrieval-Augmented Generation (RAG)
- Sentence Transformers
- FAISS
- Prompt Engineering
- Pandas
- PyMC
- YOLOv8

### Tools & Technologies
- Git and GitHub
- Docker and Docker Compose
- pytest
- GitHub Actions
- Vercel
- Netlify
- Render
- Streamlit

---

## Featured Projects

### 1. CrediTrust Complaint Assistant

An AI-powered complaint analysis application that helps users explore and understand customer complaints through natural-language questions.

**Key Features**
- Processes and searches a dataset of more than 80,000 consumer complaints.
- Uses Sentence Transformers to generate text embeddings.
- Uses FAISS for semantic similarity search.
- Retrieves relevant complaint information to support generated answers.
- Uses FLAN-T5-small for response generation.
- Includes relevance filtering and out-of-domain question handling.

**Technologies**
- Python
- Streamlit
- Sentence Transformers
- FAISS
- FLAN-T5-small

**Links**
- [Live Demo](https://creditrust-complaint-chatbot.streamlit.app/)
- [GitHub Repository](https://github.com/hawaebrahimhamid/rag-complaint-chatbot)

### 2. Medical Telegram Data Warehouse

A data engineering project that collects, processes, classifies, and organizes data from Telegram channels into a structured data warehouse.

**Key Features**
- Collects Telegram data using Telethon.
- Uses YOLOv8 to classify images into categories such as promotional, product display, lifestyle, and other.
- Stores structured data in PostgreSQL.
- Uses dbt for data transformation.
- Uses FastAPI to expose data through REST endpoints.
- Uses Dagster for data pipeline orchestration.
- Supports containerized development with Docker.

**Technologies**
- Python
- Telethon
- YOLOv8
- PostgreSQL
- dbt
- FastAPI
- Dagster
- Docker

**GitHub Repository:** [Medical Telegram Data Warehouse](https://github.com/hawaebrahimhamid/medical-telegram-warehouse)

### 3. Brent Oil Change Point Analysis Dashboard

An interactive dashboard for exploring Brent crude oil prices and identifying potential structural changes in price behavior.

**Key Features**
- Displays historical Brent oil price data.
- Provides key price indicators and statistics.
- Uses Bayesian change point analysis to identify potential structural changes.
- Presents detected change points and related events.
- Connects a React frontend to a Flask backend through REST APIs.

**Technologies**
- React
- Vite
- Python
- Flask
- Pandas
- PyMC
- REST APIs

**Links**
- [Live Dashboard](https://brent-oil-dashboard.vercel.app/)
- [Backend API](https://brent-oil-dashboard-api.onrender.com)
- [GitHub Repository](https://github.com/hawaebrahimhamid/brent-oil-change-point-analysis)

---

## Portfolio Website & AI Assistant

This repository contains the source code for my personal portfolio website and its integrated AI assistant.

### Portfolio Website

The frontend is built with Next.js, TypeScript, and Tailwind CSS.

**Features**
- Responsive portfolio layout.
- Dark and light theme support, with dark mode as the default.
- Sections for About, Skills, Experience, Projects, and Contact.
- Downloadable CVs and certificate.
- Integrated AI assistant interface.

### AI-Powered Portfolio Assistant

The portfolio assistant allows visitors to ask questions about my skills, projects, technical background, and training.

**Architecture and Implementation**
- Uses a structured portfolio knowledge base stored in `portfolio.json`.
- Splits knowledge into smaller chunks for retrieval.
- Generates 384-dimensional embeddings using Sentence Transformers.
- Stores and searches embeddings using PostgreSQL with pgvector.
- Retrieves relevant knowledge through semantic similarity search.
- Uses FastAPI to provide backend API endpoints.
- Integrates the Gemini API to generate natural-language responses.
- Uses SDK-managed retry handling for temporary API errors.
- Configures request timeouts and retry behavior.
- Includes handling for unsupported or unrelated questions.

**Technologies**
- Next.js
- TypeScript
- Tailwind CSS
- FastAPI
- Python
- PostgreSQL
- pgvector
- Sentence Transformers
- Google Gemini API
- Docker Compose

---

## Running the Project Locally with Docker

Docker Compose is used to run the frontend, backend, and PostgreSQL database together.

### Prerequisites

- Git
- Docker Desktop
- Docker Compose

### 1. Clone the Repository

```bash
git clone https://github.com/hawaebrahimhamid/ai-portfolio.git
cd ai-portfolio
```

### 2. Configure Environment Variables

Create the required backend environment file:

```text
backend/.env
```

Add the required configuration:

```env
GEMINI_API_KEY=your_gemini_api_key
```

Use your own API key. Do not commit `.env` files or expose secret values in the repository.

### 3. Build and Start the Services

```bash
docker compose up --build -d
```

### 4. Check the Running Containers

```bash
docker compose ps
```

### 5. Access the Application

| Service | Local URL |
|---|---|
| Portfolio Frontend | http://localhost:3000 |
| FastAPI Backend | http://localhost:8000 |
| Backend Health Check | http://localhost:8000/health |
| FastAPI Documentation | http://localhost:8000/docs |

### 6. View Logs

```bash
docker compose logs -f
```

To view logs for an individual service:

```bash
docker compose logs -f backend
docker compose logs -f frontend
docker compose logs -f db
```

### 7. Stop the Services

```bash
docker compose down
```

This stops and removes the containers and network without intentionally deleting the database volume.

---

## Running Without Docker

### Frontend

Install dependencies:

```bash
npm ci
```

Start the development server:

```bash
npm run dev
```

Build the frontend:

```bash
npm run build
```

### Backend

Create and activate a Python virtual environment:

```bash
cd backend
python -m venv .venv
```

On Windows PowerShell:

```powershell
.venv\Scripts\Activate.ps1
```

Install dependencies:

```bash
pip install -r requirements.txt
```

Configure the required environment variables in `backend/.env`.

Initialize the database:

```bash
python init_db.py
```

Start the backend:

```bash
uvicorn main:app --reload
```

Run backend tests:

```bash
pytest -q
```

---

## Testing and Verification

The project has been checked through frontend builds, backend automated tests, and local Docker-based integration testing.

| Test / Verification | Result |
|---|---|
| Next.js production build | Passed |
| Docker Compose configuration validation | Passed |
| Docker frontend image build | Passed |
| Docker backend image build | Passed |
| PostgreSQL container health check | Passed |
| FastAPI backend health check | Passed |
| FastAPI documentation access | Passed |
| Frontend local access | Passed |
| Frontend-to-backend AI assistant integration | Passed |
| Gemini response generation | Passed |
| AI assistant relevant-question handling | Passed |
| AI assistant backend-unavailable error handling | Passed |
| Backend recovery after restart | Passed |
| Simulated Gemini HTTP 503 retry test | Passed |
| Backend automated test suite | 34 passed |

**Latest recorded backend test result:** 34 passed, with 1 dependency deprecation warning.

The local integration checks also confirmed that the application can recover after the backend is restarted and that the assistant can answer project-related questions.

---

## Development Roadmap

The portfolio has been developed in stages:

1. **Portfolio foundation:** Website structure, navigation, responsive layout, and theme support.
2. **Professional content:** About, Skills, Experience, Projects, CVs, and contact information.
3. **Backend development:** FastAPI endpoints and PostgreSQL integration.
4. **AI knowledge base:** Knowledge preparation, chunking, embedding generation, and pgvector storage.
5. **AI assistant integration:** Semantic retrieval, Gemini response generation, error handling, and testing.
6. **Local deployment and verification:** Docker Compose setup and frontend/backend/database integration testing.

### Next Milestone

**Public production deployment**

The next milestone is to deploy the frontend, backend, and database using suitable production hosting services, configure production environment variables, and verify the live application.

Local Docker verification is complete; public deployment is still pending.

---

## Project Structure

```text
ai-portfolio/
│
├── backend/
│   ├── tests/
│   ├── portfolio_assistant.py
│   ├── main.py
│   ├── init_db.py
│   ├── chunk_knowledge.py
│   ├── generate_embeddings.py
│   ├── evaluate_retrieval.py
│   ├── requirements.txt
│   └── Dockerfile
│
├── public/
│   ├── certificates/
│   └── projects/
│
├── src/
│   ├── app/
│   ├── components/
│   └── ...
│
├── portfolio.json
├── docker-compose.yml
├── Dockerfile
├── package.json
└── README.md
```

---

## Contact

I welcome opportunities to contribute to AI engineering, machine learning, and full-stack software development projects.

- **GitHub:** [github.com/hawaebrahimhamid](https://github.com/hawaebrahimhamid)
- **LinkedIn:** [linkedin.com/in/hawa-ebrahim-hamid](https://linkedin.com/in/hawa-ebrahim-hamid)
- **Email:** [hawaebrahimhamid@gmail.com](mailto:hawaebrahimhamid@gmail.com)

---

*Thank you for visiting my portfolio repository.*
