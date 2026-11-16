import { FiExternalLink } from "react-icons/fi";

interface ExperienceItem {
  role: string;
  period: string;
  location: string;
  description: string;
  certificateUrl?: string;
  highlights: string[];
}

const experiences: ExperienceItem[] = [
  {
    role: "AI & Machine Learning Engineer — Project-Based Experience",
    period: "May 2026 – Present",
    location: "Addis Ababa, Ethiopia / Remote",
    description:
      "Designing and developing applied AI and full-stack solutions, focusing on retrieval-augmented generation (RAG), vector search, and data pipelines.",
    highlights: [
      "Built an AI-powered portfolio platform featuring an integrated RAG assistant using Next.js, FastAPI, PostgreSQL (pgvector), and Google Gemini API.",
      "Developed a financial complaint RAG assistant utilizing Sentence Transformers, FAISS vector search, and FLAN-T5 for context-grounded answers.",
      "Engineered a medical Telegram data pipeline with YOLOv8 image categorization, PostgreSQL warehousing, dbt transformations, and Dagster orchestration.",
      "Created a Brent Oil analytics dashboard combining React, Flask, Python, and PyMC for Bayesian change-point results presentation.",
    ],
  },
  {
    role: "Full-Stack Developer — Independent Software Projects",
    period: "2024 – Present",
    location: "Addis Ababa, Ethiopia / Remote",
    description:
      "Building robust web applications and RESTful APIs, combining responsive frontend interfaces with secure backend services and database integrations.",
    highlights: [
      "Developed responsive user interfaces using React, Next.js, TypeScript, and Tailwind CSS.",
      "Engineered scalable backend services and REST APIs with Python, Flask, and FastAPI.",
      "Implemented database architectures and data workflows across PostgreSQL, Firebase, and Supabase.",
      "Applied modern engineering practices including Git version control, Docker containerization, and automated testing.",
    ],
  },
  {
    role: "Kifiya AI Mastery Training Program — Graduated with Distinction",
    period: "August 2026",
    location: "10 Academy & Kifiya Financial Technology (Mastercard Foundation Partnership)",
    description:
      "Completed an intensive 3-month (12-week) project-based fellowship with distinction, focused on Machine Learning Engineering, Data Engineering, Generative AI, and Financial Analysis for the fintech sector.",
    certificateUrl: "/certificates/kifiya-ai-mastery.pdf",
    highlights: [
      "Built and evaluated Generative AI and Retrieval-Augmented Generation (RAG) applications, including chatbot deployment, prompt/context engineering, and LLM fine-tuning.",
      "Engineered scalable ETL/ELT pipelines, dbt transformations, and data warehouses using advanced Python and SQL.",
      "Applied machine learning, predictive modeling, time-series analysis, and MLOps workflows (Docker, CI/CD, unit testing, DVC, MLFlow) across fintech projects.",
    ],
  },
];

export default function Experience() {
  return (
    <section
      id="experience"
      className="border-t border-gray-200 py-20 dark:border-slate-800 sm:py-24"
    >
      {/* Container width matched with other standard sections (max-w-7xl) and left-aligned header */}
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.15em] text-blue-600 dark:text-blue-400">
            My Background
          </p>

          <h2 className="mt-3 text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
            Experience & Training
          </h2>

          <p className="mt-5 text-base leading-7 text-gray-600 dark:text-gray-300 sm:text-lg">
            Practical experience in AI engineering and full-stack development,
            demonstrated through independent projects and specialized training.
          </p>
        </div>

        {/* Timeline Layout aligned cleanly across the section */}
        <div className="mt-12 relative border-l border-gray-200 dark:border-slate-800 ml-4 sm:ml-6 space-y-10">
          {experiences.map((experience) => (
            <div key={experience.role} className="relative pl-6 sm:pl-8">
              {/* Timeline Bullet Node */}
              <div className="absolute -left-[9px] top-1.5 h-4 w-4 rounded-full border-4 border-white bg-blue-600 dark:border-slate-950 dark:bg-blue-500" />

              <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:p-8">
                <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl">
                      {experience.role}
                    </h3>

                    <p className="mt-1 text-sm font-medium text-blue-600 dark:text-blue-400">
                      {experience.location}
                    </p>
                  </div>

                  <span className="inline-flex w-fit shrink-0 rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700 dark:bg-blue-950/50 dark:text-blue-300">
                    {experience.period}
                  </span>
                </div>

                <p className="mt-4 text-sm leading-7 text-gray-600 dark:text-gray-300 sm:text-base">
                  {experience.description}
                </p>

                <ul className="mt-5 space-y-2.5">
                  {experience.highlights.map((highlight) => (
                    <li
                      key={highlight}
                      className="flex items-start gap-3 text-sm leading-6 text-gray-600 dark:text-gray-300"
                    >
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-600 dark:bg-blue-400" />
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>

                {experience.certificateUrl && (
                  <div className="mt-6 border-t border-gray-100 pt-4 dark:border-slate-800">
                    <a
                      href={experience.certificateUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-sm font-semibold text-blue-600 transition-colors hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
                    >
                      View Certificate
                      <FiExternalLink className="h-4 w-4" />
                    </a>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
