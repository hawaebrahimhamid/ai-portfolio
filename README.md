# AI Engineer & Full-Stack Developer Portfolio

**Live Portfolio:** Add deployed website URL here after deployment.

Building practical AI-powered applications and full-stack software through hands-on projects, technical training, and continuous engineering practice.

This portfolio showcases my work in applied AI, retrieval-augmented generation (RAG), data engineering, backend development, and modern web applications.

**Explore:** [GitHub](https://github.com/hawaebrahimhamid) · [LinkedIn](https://linkedin.com/in/hawa-ebrahim-hamid) · [Email](mailto:hawaebrahimhamid@gmail.com)

## About Me

I'm Hawa Ebrahim Hamid, an aspiring AI Engineer and Full-Stack Developer based in Addis Ababa, Ethiopia.

My academic background is in Geology, and I have since focused my learning on software engineering and applied AI. Through the Kifiya AI Mastery Training Program, which I completed with distinction, independent projects, and continuous technical practice, I've developed hands-on experience with Python, machine learning, RAG systems, REST APIs, databases, and full-stack web development.

I learn by building: translating technical concepts into working applications, testing functionality, investigating problems, and improving reliability. My projects include an evidence-based financial complaint assistant, a data engineering and computer vision pipeline, and an interactive oil-price analysis dashboard.

I'm looking for opportunities where I can contribute through practical project work, learn from experienced engineers, and continue developing my skills in AI engineering and full-stack development.

## Technical Skills

- **Programming:** Python, JavaScript, SQL
- **Frontend:** React, Next.js, TypeScript, HTML, CSS, Tailwind CSS
- **Backend:** FastAPI, Flask, Node.js, Express, REST APIs
- **AI and Machine Learning:** RAG, LLMs, embeddings, Sentence Transformers, FAISS, prompt engineering, YOLOv8
- **Data Engineering and Analysis:** PostgreSQL, Pandas, NumPy, PyMC, ETL, data pipelines
- **Engineering Practices:** Git, GitHub, Docker, pytest, automated testing, CI/CD fundamentals

## Featured Projects

### 1. CrediTrust Complaint Assistant — RAG Application

An AI-powered application that retrieves relevant consumer financial complaint information to help answer questions with supporting evidence.

**Key contributions**

- Processed and prepared complaint text for retrieval.
- Generated embeddings using Sentence Transformers and implemented FAISS vector search.
- Built a retrieval and answer-generation pipeline using FLAN-T5.
- Added source attribution, response validation, and handling of unsupported questions.
- Developed automated tests and improved application reliability.

**Links:** [Live Demo](https://creditrust-complaint-chatbot.streamlit.app/) · [GitHub Repository](https://github.com/hawaebrahimhamid/rag-complaint-chatbot)

### 2. Medical Telegram Data Warehouse — Data Engineering and Computer Vision

A data pipeline that ingests Telegram data, categorizes product images, and stores structured information for downstream analysis.

**Key contributions**

- Implemented Telegram data ingestion using Telethon.
- Applied YOLOv8 for image categorization.
- Used PostgreSQL for data storage and dbt for transformations.
- Developed analytical API endpoints with FastAPI.
- Worked with Dagster orchestration and Docker-based development.

**Link:** [GitHub Repository](https://github.com/hawaebrahimhamid/medical-telegram-warehouse)

### 3. Brent Oil Change-Point Analysis — Full-Stack Data Application

An interactive dashboard for exploring historical Brent crude oil prices, potential structural changes, and related events.

**Key contributions**

- Prepared and analyzed time-series data using Python and Pandas.
- Applied Bayesian change-point analysis with PyMC.
- Developed a Flask REST API.
- Integrated analytical results into a React and Vite frontend.
- Presented price trends and analytical findings through interactive visualizations.

**Links:** [Live Dashboard](https://brent-oil-dashboard.vercel.app/) · [GitHub Repository](https://github.com/hawaebrahimhamid/brent-oil-change-point-analysis)

## About This Portfolio Project

This repository contains my portfolio website and an associated backend development project. It serves both as a professional showcase and as a practical way to strengthen my full-stack engineering skills.

**Technology stack**

- Next.js, React, TypeScript, and Tailwind CSS
- Python and FastAPI
- PostgreSQL and SQLAlchemy
- REST API design and request validation
- Backend automated testing
- AI assistant and portfolio knowledge-base development

Implementation and deployment status may vary by feature. See the code and tests for the functionality currently available.

## Development Roadmap

The project follows six development phases:

1. **Frontend foundation:** Responsive navigation, portfolio sections, and reusable components.
2. **Recruiter experience:** Resume access, SEO, accessibility, responsive layouts, and project case studies.
3. **Backend engineering:** FastAPI endpoints, database integration, contact functionality, validation, health checks, and tests.
4. **RAG and AI assistant:** Knowledge preparation, embeddings, retrieval, LLM integration, and evidence-grounded responses.
5. **AI engineering quality:** Evaluation, error handling, guardrails, and observability.
6. **Production engineering:** Secure configuration, continuous integration, deployment, monitoring, and final quality checks.

These phases describe the development plan, not a claim that every feature is complete. Features should be considered finished only after implementation and appropriate verification.

## Getting Started

### Prerequisites

- Git
- Node.js and npm
- Python
- PostgreSQL
- A Google Gemini API key for features that require it

### 1. Clone the repository

```bash
git clone https://github.com/hawaebrahimhamid/ai-portfolio.git
cd ai-portfolio
```

### 2. Run the frontend

```bash
npm ci
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

To check the frontend:

```bash
npm run lint
npm run build
```

To run the optimized production build locally, after building, run:

```bash
npm run start
```

### 3. Configure and run the backend

In Windows PowerShell, from the repository root, create a local environment file:

```powershell
Copy-Item backend/.env.example backend/.env
```

Edit `backend/.env` and configure your own PostgreSQL connection and Gemini API key:

```dotenv
DATABASE_URL=postgresql+psycopg://USER:PASSWORD@HOST:5432/DATABASE
GEMINI_API_KEY=your_gemini_api_key_here
```

Replace the placeholders with your actual local configuration. Create the PostgreSQL database before initializing the tables.

Enable the pgvector extension in that database before initializing the tables. For a local PostgreSQL installation, replace `DATABASE` with your database name and run:

```bash
psql -U postgres -d DATABASE -c "CREATE EXTENSION IF NOT EXISTS vector;"
```

Your PostgreSQL server must have the pgvector extension installed and available.

Create a Python virtual environment and install the backend dependencies:

```powershell
python -m venv backend/.venv
.\backend\.venv\Scripts\Activate.ps1
python -m pip install -r backend/requirements.txt
```

Start the backend:

```powershell
Set-Location backend
python init_db.py
python -m uvicorn main:app --reload
```

The API runs locally at [http://127.0.0.1:8000](http://127.0.0.1:8000).

- Health endpoint: [http://127.0.0.1:8000/health](http://127.0.0.1:8000/health)
- Database readiness: [http://127.0.0.1:8000/ready](http://127.0.0.1:8000/ready)
- Interactive API documentation: [http://127.0.0.1:8000/docs](http://127.0.0.1:8000/docs)

Run the frontend and backend in separate terminal windows.

### 4. Run backend tests

With the backend Python environment activated, run this from the repository root:

```bash
python -m pytest -q
```

The backend test suite most recently passed **35 tests** during development. Test results may change as the code evolves.

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
├── public/
├── src/
├── package.json
├── package-lock.json
└── README.md
```

## Contact

**Hawa Ebrahim Hamid**

AI Engineer & Full-Stack Developer | Project-Based Experience

Addis Ababa, Ethiopia

- **Email:** [hawaebrahimhamid@gmail.com](mailto:hawaebrahimhamid@gmail.com)
- **GitHub:** [hawaebrahimhamid](https://github.com/hawaebrahimhamid)
- **LinkedIn:** [hawa-ebrahim-hamid](https://linkedin.com/in/hawa-ebrahim-hamid)

I'm interested in opportunities in applied AI, backend engineering, and full-stack development where I can contribute through practical project work and continue growing as an engineer.
