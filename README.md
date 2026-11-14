# AI Engineer & Full-Stack Developer Portfolio

A professional portfolio showcasing my hands-on projects in **AI engineering, machine learning, data engineering, and full-stack web development**.

The portfolio includes an AI-powered assistant that uses semantic search, PostgreSQL with pgvector, and Google's Gemini API to answer questions about my background, technical skills, training, and projects.

## Live Portfolio

**Website:** https://hawaebrahim.vercel.app

**Backend API:** https://ai-portfolio-txy2.onrender.com

**GitHub Repository:** https://github.com/hawaebrahimhamid/ai-portfolio

---

## About

I am an AI Engineer and Full-Stack Developer focused on building practical AI-powered applications and web solutions.

My technical experience is demonstrated through independent software projects and technical training. I have worked with Python, JavaScript, TypeScript, React, Next.js, FastAPI, Flask, PostgreSQL, and AI technologies.

This portfolio brings together selected projects, technical skills, and an integrated AI assistant designed to help visitors explore my work.

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
- Semantic Search
- Sentence Transformers
- FAISS
- Google Gemini API
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

An AI-powered complaint analysis application that helps users explore and understand consumer complaints through natural-language questions.

**Key Features**
- Processes more than 80,000 consumer complaints.
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
- Uses YOLOv8 to classify images into categories.
- Stores structured data in PostgreSQL.
- Uses dbt for data transformation.
- Uses FastAPI to expose data through REST endpoints.
- Uses Dagster for workflow orchestration.
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
- Contact form with backend integration.

### AI-Powered Portfolio Assistant

The assistant allows visitors to ask questions about my skills, projects, technical background, and training.

**Architecture and Implementation**
- Uses a structured portfolio knowledge base stored in `portfolio.json`.
- Splits knowledge into smaller chunks for retrieval.
- Generates 768-dimensional embeddings using Google's `gemini-embedding-001` embedding model.
- Uses retrieval-specific embedding task types for document and query embeddings.
- Stores and searches embeddings using PostgreSQL with pgvector.
- Retrieves relevant knowledge through semantic similarity search.
- Uses FastAPI to provide backend API endpoints.
- Integrates the Gemini API for natural-language response generation.
- Implements SDK-managed retry handling for temporary API errors.
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
- Google Gemini Embedding API
- Google Gemini API
- Docker Compose

### Backend Memory Optimization

The portfolio assistant's retrieval architecture was migrated from a locally loaded Sentence Transformers model to Google's Gemini embedding API.

This change:
- Removed the need to load the Sentence Transformers model and PyTorch in the portfolio backend runtime.
- Reduced heavyweight local model dependencies.
- Uses pre-generated 768-dimensional embeddings.
- Stores embeddings in PostgreSQL using pgvector.
- Generates query embeddings through the Gemini API.

The migration was implemented to reduce backend memory usage and improve compatibility with the available hosting resources.

**Note:** The CrediTrust Complaint Assistant remains a separate project and continues to use Sentence Transformers, 384-dimensional embeddings, FAISS, and FLAN-T5-small.

---

## Production Deployment Architecture

The portfolio is publicly deployed using separate hosting services.

| Component | Technology | Hosting |
|---|---|---|
| Frontend | Next.js | Vercel |
| Backend API | FastAPI | Render |
| Database | PostgreSQL with pgvector | Neon |
| AI response generation | Gemini API | Google AI |
| Text embeddings | Gemini Embedding API | Google AI |
| Source code | Git and GitHub | GitHub |

### Production URLs

- **Portfolio:** https://hawaebrahim.vercel.app
- **Backend API:** https://ai-portfolio-txy2.onrender.com
- **Backend health:** https://ai-portfolio-txy2.onrender.com/health
- **Backend readiness:** https://ai-portfolio-txy2.onrender.com/ready

The frontend communicates with the backend through the configured production API URL.

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

Configure the required environment variables using your own credentials and the database configuration expected by the project.

```env
GEMINI_API_KEY=your_gemini_api_key
DATABASE_URL=your_database_connection_string
```

Use your own API key and database connection string. Never commit `.env` files or expose secret values in the repository.

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

Initialize the database according to the project's database setup:

```bash
python init_db.py
```

Start the backend:

```bash
uvicorn main:app --reload
```

Run backend tests from the repository root:

```bash
python -m pytest backend/tests -v
```

---

## Testing and Verification

The project has been checked through frontend builds, backend automated tests, and deployment verification.

| Test / Verification | Result |
|---|---|
| Next.js production build | Passed |
| Backend automated test suite | 36 passed |
| Gemini query embedding integration tests | Passed |
| Embedding normalization tests | Passed |
| Retrieval and grounding tests | Passed |
| Gemini temporary HTTP 503 retry test | Passed |
| Backend error handling tests | Passed |
| Backend health endpoint | Passed |
| Backend readiness endpoint | Passed |
| Production database embedding verification | Passed |
| Production frontend deployment | Live |
| Production backend deployment | Live |
| Frontend-to-backend AI assistant integration | Verified |
| Contact form submission | Verified |
| CV downloads and project links | Verified |
| Responsive desktop and mobile layouts | Verified |

**Latest recorded backend test result:** 36 passed, with 1 Starlette deprecation warning.

The AI assistant has also been tested through the public portfolio website and successfully answers questions about the portfolio projects.

---

## Development Roadmap

The portfolio was developed in the following stages:

1. **Portfolio foundation:** Website structure, navigation, responsive layout, and theme support.
2. **Professional content:** About, Skills, Experience, Projects, CVs, and contact information.
3. **Backend development:** FastAPI endpoints and PostgreSQL integration.
4. **AI knowledge base:** Knowledge preparation, chunking, embedding generation, and pgvector storage.
5. **AI assistant integration:** Semantic retrieval, Gemini response generation, error handling, and testing.
6. **Memory optimization:** Migration to Gemini embeddings to reduce local model dependencies in the backend.
7. **Production deployment:** Frontend deployment on Vercel, backend deployment on Render, and database hosting on Neon.
8. **Production verification:** Testing the live AI assistant, contact form, downloadable CVs, project links, and responsive layouts.

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

I welcome opportunities to contribute to AI engineering, machine learning, data engineering, and full-stack software development projects.

- **Portfolio:** https://hawaebrahim.vercel.app
- **GitHub:** https://github.com/hawaebrahimhamid
- **LinkedIn:** https://linkedin.com/in/hawa-ebrahim-hamid
- **Email:** hawaebrahimhamid@gmail.com

---

*Thank you for visiting my portfolio repository.*
