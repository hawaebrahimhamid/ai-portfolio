
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
      "Developing AI applications through hands-on projects, focusing on RAG systems, language models, semantic search, and data engineering.",
    highlights: [
      "Built an AI-powered portfolio platform with a RAG assistant using Next.js, FastAPI, PostgreSQL, pgvector, and Google Gemini.",
      "Developed a financial complaint assistant using Python, Sentence Transformers, FAISS, and FLAN-T5.",
      "Built a medical data pipeline using Telethon, YOLOv8, PostgreSQL, dbt, and Dagster.",
      "Created a Brent Oil analytics dashboard using React, Flask, Python, and PyMC for Bayesian change-point analysis.",
    ],
  },
  {
    role: "Full-Stack Developer — Independent Software Projects",
    period: "2024 – Present",
    location: "Addis Ababa, Ethiopia / Remote",
    description:
      "Building full-stack web applications by combining responsive frontend development, backend APIs, authentication, and database integration.",
    highlights: [
      "Developed responsive web interfaces using React, Next.js, TypeScript, and Tailwind CSS.",
      "Built backend services and REST APIs using Python, Flask, and FastAPI.",
      "Implemented authentication, database integration, external API connections, and Stripe payment workflows in independent projects.",
      "Applied Git, Docker, and automated testing during application development.",
    ],
  },
  {
    role: "Kifiya AI Mastery Training Program — Completed with Distinction",
    period: "August 2026",
    location: "10 Academy & Kifiya Financial Technology",
    description:
      "Completed AI and machine learning training with distinction, covering machine learning, data engineering, generative AI, and financial analysis.",
    certificateUrl: "/certificates/kifiya-ai-mastery.pdf",
    highlights: [
      "Studied machine learning, predictive modeling, and practical AI development.",
      "Worked with Python, SQL, data engineering workflows, and data warehousing concepts.",
      "Explored RAG systems, generative AI, and financial analysis applications.",
    ],
  },
];

export default function Experience() {
  return (
    <section
      id="experience"
      className="border-t border-gray-200 py-20 dark:border-slate-800 sm:py-24"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Section heading */}
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

        {/* Experience timeline */}
        <div className="relative ml-4 mt-12 space-y-10 border-l border-gray-200 dark:border-slate-800 sm:ml-6">
          {experiences.map((experience) => (
            <div key={experience.role} className="relative pl-6 sm:pl-8">
              {/* Timeline marker */}
              <div className="absolute -left-[9px] top-1.5 h-4 w-4 rounded-full border-4 border-white bg-blue-600 dark:border-slate-950 dark:bg-blue-500" />

              <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:p-8">
                {/* Role and period */}
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

                {/* Description */}
                <p className="mt-4 text-sm leading-7 text-gray-600 dark:text-gray-300 sm:text-base">
                  {experience.description}
                </p>

                {/* Key contributions */}
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

                {/* Certificate */}
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
