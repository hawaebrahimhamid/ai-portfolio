import type { Project } from "@/types/project";

export const projects: Project[] = [
  {
    title: "CrediTrust Complaint Assistant",
    description:
      "Built a RAG-powered complaint analysis assistant that retrieves relevant consumer financial complaints and generates evidence-informed answers. Implemented semantic search using Sentence Transformers and FAISS, FLAN-T5 answer generation, relevance checks, source display, and evidence-grounded fallback handling.",
    technologies: [
      "Python",
      "RAG",
      "Sentence Transformers",
      "FAISS",
      "FLAN-T5",
      "Streamlit",
      "Pytest",
    ],
    githubUrl: "https://github.com/hawaebrahimhamid/rag-complaint-chatbot",
    liveUrl: "https://creditrust-complaint-chatbot.streamlit.app/",
    image: "/projects/creditrust.PNG",
    featured: true,
    caseStudy: {
      problem:
        "Consumer financial complaints can be difficult to search and interpret. The goal was to help users find relevant complaints and receive answers grounded in supporting evidence.",
      approach:
        "Developed a retrieval-augmented generation (RAG) pipeline using Sentence Transformers for semantic search, FAISS for similarity retrieval, and FLAN-T5 for answer generation.",
      implementation:
        "Implemented relevance checks, complaint-source references, answer validation, and evidence-grounded fallback handling to improve answer reliability and reduce unsupported responses.",
    },
  },

  {
    title: "AI-Powered Developer Portfolio Platform",
    description:
      "Designed, developed, and deployed a full-stack AI-powered developer portfolio with an integrated conversational AI assistant. Built with Next.js, TypeScript, FastAPI, and PostgreSQL with pgvector, it uses Google's Gemini API and semantic search to provide information about my technical skills, projects, training, and experience.",
    technologies: [
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "FastAPI",
      "Python",
      "PostgreSQL",
      "pgvector",
      "Google Gemini API",
      "Docker",
    ],
    githubUrl: "https://github.com/hawaebrahimhamid/ai-portfolio",
    liveUrl: "https://hawaebrahim.vercel.app",
    image: "/projects/ai-portfolio.png",
    featured: true,
    caseStudy: {
      problem:
        "A traditional portfolio presents projects and skills as static information. The objective was to build a professional, interactive platform where recruiters and visitors could explore my work and ask questions about my technical background.",
      approach:
        "Built a Next.js frontend connected to a FastAPI backend. PostgreSQL with pgvector stores portfolio knowledge and vector embeddings, while Google Gemini APIs support embedding generation and AI-powered responses through a retrieval-based assistant.",
      implementation:
        "Developed responsive portfolio sections, project case studies, downloadable CV and certificate resources, and an AI assistant. Implemented portfolio knowledge chunking, 768-dimensional embeddings using gemini-embedding-001, vector retrieval with pgvector, and backend API endpoints.",
      engineeringDecisions:
        "Selected PostgreSQL with pgvector to keep relational data and vector search within one database. Used Gemini's embedding API instead of relying on locally hosted embedding models to reduce backend memory and dependency requirements. Used Docker Compose to support local development.",
      challenges:
        "Managing the resource requirements of local embedding models and configuring communication between the frontend, backend, and database across development and deployment environments. Addressed these challenges by using API-based embeddings and configuring separate deployment environments and service connections.",

      deployment:
        "Deployed the Next.js frontend on Vercel, the FastAPI backend on Render, and the PostgreSQL database on Neon. Added health and readiness endpoints and used automated backend tests to validate application behavior.",

      outcomes:
        "Delivered a publicly accessible portfolio platform that combines project presentation, professional resources, and an AI-powered assistant. The project demonstrates practical experience integrating frontend development, backend APIs, database engineering, semantic retrieval, and cloud deployment.",
    },
  },

  {
    title: "Medical Telegram Warehouse & AI Pipeline",
    description:
      "An end-to-end data and computer-vision pipeline that processes Telegram messages and product images, stores enriched data in PostgreSQL, and exposes analytical insights through APIs.",
    technologies: [
      "Python",
      "YOLOv8",
      "PostgreSQL",
      "dbt",
      "FastAPI",
      "Dagster",
    ],
    githubUrl: "https://github.com/hawaebrahimhamid/medical-telegram-warehouse",
    image: "/projects/medical-telegram.png",
    featured: true,
  },

  {
    title: "Brent Oil Change Point Analysis Dashboard",
    description:
      "A full-stack analytics application for exploring historical Brent crude oil prices and identifying structural changes using Bayesian change-point analysis.",
    technologies: ["React", "Flask", "Python", "PyMC", "REST APIs", "Vercel"],
    githubUrl:
      "https://github.com/hawaebrahimhamid/brent-oil-change-point-analysis",
    liveUrl: "https://brent-oil-dashboard.vercel.app/",
    image: "/projects/brent-oil.png",
    featured: true,
  },
];
