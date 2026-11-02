# AI Engineer & Full-Stack Developer Portfolio

**Live Portfolio:** Coming soon — deployment pending.

A professional portfolio showcasing my hands-on work in applied AI, full-stack web development, data engineering, and software engineering.

I build practical applications that combine AI capabilities, backend systems, databases, and modern web technologies. My work is based on independent projects, technical training, and continuous engineering practice.

**Explore:** [GitHub](https://github.com/hawaebrahimhamid) · [LinkedIn](https://linkedin.com/in/hawa-ebrahim-hamid) · [Email](mailto:hawaebrahimhamid@gmail.com)

---

## About Me

I'm Hawa Ebrahim Hamid, an aspiring AI Engineer and Full-Stack Developer based in Addis Ababa, Ethiopia.

I have an academic background in Geology and have focused my technical development on software engineering, machine learning, and applied AI.

I completed the **Kifiya AI Mastery Training Program with distinction**, where I developed knowledge and practical skills in machine learning engineering, data engineering, RAG systems, data warehousing, and financial analysis.

Through independent projects and technical training, I have gained hands-on experience building:

- AI-powered applications and retrieval-augmented generation (RAG) systems.
- REST APIs and backend services.
- Full-stack web applications.
- Database-backed systems and data pipelines.
- Machine learning and computer vision applications.

I approach engineering through practical implementation: building, testing, debugging, evaluating, and improving working software.

I'm interested in opportunities in AI engineering, backend development, and full-stack software development where I can contribute through project-based experience and continue growing as an engineer.

## Technical Skills

| Area                           | Technologies and Tools                                                                   |
| ------------------------------ | ---------------------------------------------------------------------------------------- |
| Programming                    | Python, JavaScript, TypeScript, SQL                                                      |
| Frontend                       | React, Next.js, HTML, CSS, Tailwind CSS                                                  |
| Backend                        | FastAPI, Flask, Node.js, Express, REST APIs                                              |
| AI and Machine Learning        | RAG, LLMs, embeddings, Sentence Transformers, FAISS, FLAN-T5, prompt engineering, YOLOv8 |
| Databases and Data Engineering | PostgreSQL, MySQL, Firestore, pgvector, Pandas, NumPy, dbt, ETL                          |
| Data Analysis                  | PyMC, time-series analysis, Bayesian change-point analysis                               |
| Development and Testing        | Git, GitHub, Docker, pytest, automated testing, GitHub Actions, CI/CD fundamentals       |

## Featured Projects

### 1. CrediTrust Complaint Assistant — Retrieval-Augmented Generation (RAG)

**Live Demo:** [Open Application](https://creditrust-complaint-chatbot.streamlit.app/) · **GitHub:** [View Repository](https://github.com/hawaebrahimhamid/rag-complaint-chatbot)
An AI-powered complaint assistant that retrieves relevant consumer financial complaint information and generates evidence-based answers.

**Key contributions:**

- Processed and prepared more than 80,000 consumer complaint records for retrieval.
- Generated 384-dimensional embeddings using Sentence Transformers.
- Implemented semantic similarity search using FAISS.
- Integrated FLAN-T5-small for answer generation.
- Retrieved relevant supporting complaint information for responses.
- Implemented out-of-domain question handling and response validation.
- Added automated tests to evaluate application behavior.

**Technologies:** Python, Streamlit, Sentence Transformers, FAISS, FLAN-T5, Pandas, pytest.

### 2. Medical Telegram Data Warehouse — Data Engineering and Computer Vision

**GitHub:** [View Repository](https://github.com/hawaebrahimhamid/medical-telegram-warehouse)

An end-to-end data engineering project that collects Telegram channel information, processes visual content, and organizes structured data for analysis.

**Key contributions:**

- Implemented Telegram data ingestion using Telethon.
- Applied YOLOv8 to categorize images into content categories.
- Stored structured information in PostgreSQL.
- Used dbt for data transformations.
- Developed analytical API endpoints using FastAPI.
- Implemented workflow orchestration with Dagster.
- Used Docker for containerized development.

**Technologies:** Python, Telethon, YOLOv8, PostgreSQL, dbt, FastAPI, Dagster, Docker.

### 3. Brent Oil Change-Point Analysis — Full-Stack Data Application

**Live Dashboard:** [Open Dashboard](https://brent-oil-dashboard.vercel.app/) · **API:** [Open API](https://brent-oil-dashboard-api.onrender.com) · **GitHub:** [View Repository](https://github.com/hawaebrahimhamid/brent-oil-change-point-analysis)
An interactive data application for exploring historical Brent crude oil prices, identifying potential structural changes, and examining related events.

**Key contributions:**

- Prepared and analyzed time-series data using Python and Pandas.
- Applied Bayesian change-point analysis using PyMC.
- Developed a Flask REST API.
- Built an interactive dashboard using React and Vite.
- Integrated analytical results and API endpoints into the frontend.

**Technologies:** Python, Pandas, PyMC, Flask, React, Vite, REST APIs.

## Portfolio Website and AI Assistant

This repository contains my personal portfolio website and its associated backend and AI assistant.

The project demonstrates my practical experience integrating frontend development, backend engineering, databases, AI retrieval, and containerization.

### Technology Stack

**Frontend**

- Next.js
- React
- TypeScript
- Tailwind CSS

**Backend**

- Python
- FastAPI
- SQLAlchemy
- REST APIs

**Database and AI**

- PostgreSQL
- pgvector
- Sentence Transformers
- Vector embeddings and semantic retrieval
- Portfolio knowledge-base ingestion

**Development and Infrastructure**

- Docker and Docker Compose
- CPU-only PyTorch backend image
- pytest
- Git and GitHub

### AI Assistant

The portfolio includes an AI assistant designed to answer questions about my background, skills, training, and projects using information from a prepared portfolio knowledge base.

The implementation includes:

- Knowledge preparation and text chunking.
- Embedding generation using Sentence Transformers.
- Vector storage and similarity retrieval with PostgreSQL and pgvector.
- Backend API integration through FastAPI.
- Retrieval evaluation and testing.
- Handling of unsupported or unrelated questions.

The assistant is intended to provide visitors and recruiters with a convenient way to explore my technical background and project experience.

## Docker and Local Development

The project includes a Docker-based setup for running the frontend, backend, and PostgreSQL database together.

### Prerequisites

- Git
- Docker Desktop with Docker Compose
- A Google Gemini API key for backend features that require it

### 1. Clone the repository

```bash
git clone https://github.com/hawaebrahimhamid/ai-portfolio.git
cd ai-portfolio
```

### 2. Configure backend environment variables

In Windows PowerShell:

```powershell
Copy-Item backend/.env.example backend/.env
```

Open `backend/.env` and configure the required environment variables, including your Gemini API key.

Do not commit `.env` files or expose API keys publicly.

The Docker Compose configuration supplies the internal PostgreSQL connection to the backend. For local development outside Docker, use the appropriate local database connection settings.

### 3. Build and start the application

From the repository root:

```bash
docker compose up --build -d
```

This builds and starts the three application services:

| Service  | Purpose                   | Local address         |
| -------- | ------------------------- | --------------------- |
| Frontend | Next.js portfolio website | http://localhost:3000 |
| Backend  | FastAPI application       | http://localhost:8000 |
| Database | PostgreSQL with pgvector  | localhost:5433        |

The database is available on port `5433` from the host machine. Inside Docker Compose, the backend connects to the database using the internal service address.

The backend startup process initializes the database and imports the portfolio knowledge base as configured.

### 4. Verify running services

Check the service status:

```bash
docker compose ps
```

Check application logs:

```bash
docker compose logs --tail=80 backend frontend db
```

Check backend health:

```bash
curl http://localhost:8000/health
```

- Health endpoint: [http://127.0.0.1:8000/health](http://127.0.0.1:8000/health)
- Database readiness: [http://127.0.0.1:8000/ready](http://127.0.0.1:8000/ready)
- Interactive API documentation: [http://127.0.0.1:8000/docs](http://127.0.0.1:8000/docs)
### 5. Stop the application

```bash
docker compose down
```

This stops and removes the Compose containers and network while preserving named volumes by default.

Do not use `docker compose down -v` unless you intentionally want to delete the persistent database and model-cache volumes.

## Running Without Docker

For frontend development, install dependencies and start Next.js:

```bash
npm ci
npm run dev
```

Run the frontend production checks:

```bash
npm run lint
npm run build
```

For backend development, create and activate a Python virtual environment from the repository root:

```powershell
python -m venv backend/.venv
.\backend\.venv\Scripts\Activate.ps1
python -m pip install -r backend/requirements.txt
```

Configure `backend/.env` with your local database connection and required API keys. Ensure PostgreSQL and pgvector are installed and running.

Then initialize the database and start the backend:

```powershell
Set-Location backend
python init_db.py
python -m uvicorn main:app --reload
```

The backend runs at:

http://127.0.0.1:8000

Run backend tests from the repository root:

```powershell
python -m pytest backend/tests -q
```

## Testing and Verification

The application has undergone local development and integration testing.

**Latest recorded verification results:**

| Verification                                 | Result    |
| -------------------------------------------- | --------- |
| Frontend Docker production build             | Passed    |
| Frontend HTTP response                       | HTTP 200  |
| Backend health and readiness                 | Passed    |
| AI assistant relevant questions              | Passed    |
| AI assistant unrelated-question handling     | Passed    |
| Desktop and mobile navigation checks         | Passed    |
| Contact form validation                      | Passed    |
| Contact form frontend-to-backend integration | Passed    |
| PostgreSQL contact-message persistence       | Passed    |
| Backend automated test suite                 | 35 passed |

The backend test run completed with 35 passing tests and one dependency deprecation warning.

These results describe the local verification performed during development. They are not a claim of production deployment or production monitoring.

## Development Roadmap

The portfolio has been developed through six main phases:

1. **Frontend foundation:** Responsive navigation, reusable components, and portfolio sections.
2. **Recruiter experience:** Resume access, SEO, accessibility, responsive layouts, and project case studies.
3. **Backend engineering:** FastAPI endpoints, PostgreSQL integration, contact functionality, validation, health checks, and tests.
4. **RAG and AI assistant:** Knowledge preparation, embeddings, vector retrieval, and evidence-grounded responses.
5. **AI engineering quality:** Retrieval evaluation, error handling, guardrails, and testing.
6. **Production engineering:** Docker configuration, CPU-only backend setup, frontend production image, and application verification.

The current repository includes the Docker-based local application setup. Public deployment of this portfolio website remains a separate next milestone.

## Repository Structure

```text
ai-portfolio/
├── backend/
│   ├── tests/
│   ├── knowledge/
│   ├── main.py
│   ├── database.py
│   ├── models.py
│   ├── init_db.py
│   ├── portfolio_assistant.py
│   ├── requirements.txt
│   └── .env.example
├── docker/
│   └── postgres/
│       └── init.sql
├── public/
├── src/
├── Dockerfile
├── docker-compose.yml
├── .dockerignore
├── next.config.ts
├── package.json
├── package-lock.json
└── README.md
```

## Contact

**Hawa Ebrahim Hamid**
AI Engineer & Full-Stack Developer | Project-Based Experience
Addis Ababa, Ethiopia

- **Email:** [hawaebrahimhamid@gmail.com](mailto:hawaebrahimhamid@gmail.com)
- **GitHub:** [github.com/hawaebrahimhamid](https://github.com/hawaebrahimhamid)
- **LinkedIn:** [linkedin.com/in/hawa-ebrahim-hamid](https://linkedin.com/in/hawa-ebrahim-hamid)
  I'm interested in opportunities in applied AI, AI engineering, backend development, and full-stack software development.
