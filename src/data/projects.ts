import type { Project } from "@/types/project";

export const projects: Project[] = [
  {
    title: "CrediTrust Complaint Assistant",
    description:
      "A financial RAG application that retrieves relevant customer complaint information and generates evidence-grounded responses using semantic search and language models.",
    technologies: [
      "Python",
      "RAG",
      "Sentence Transformers",
      "FAISS",
      "LLMs",
      "Streamlit",
    ],
    githubUrl: "https://github.com/hawaebrahimhamid/rag-complaint-chatbot",
    liveUrl: "https://creditrust-complaint-chatbot.streamlit.app/",
    videoUrl: "/projects/creditrust-demo.mp4",
    featured: true,
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
