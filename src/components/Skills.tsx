import type { ReactNode } from "react";

import {
  SiReact,
  SiNextdotjs,
  SiJavascript,
  SiTypescript,
  SiPython,
  SiFlask,
  SiFastapi,
  SiPostgresql,
  SiPandas,
  SiNumpy,
  SiGit,
  SiGithub,
  SiDocker,
  SiGithubactions,
  SiPytest,
  SiVercel,
  SiRender,
  SiStreamlit,
  SiTailwindcss,
} from "react-icons/si";

import {
  TbBrain,
  TbCpu,
  TbVector,
  TbArrowsRightLeft,
  TbSearch,
  TbPrompt,
  TbApi,
  TbEye,
  TbChartLine,
  TbDatabase,
  TbDatabaseExport,
} from "react-icons/tb";

const skillIconMap: Record<string, ReactNode> = {
  // Programming Languages
  Python: <SiPython className="h-6 w-6 text-[#3776AB]" />,
  JavaScript: <SiJavascript className="h-6 w-6 text-[#F7DF1E]" />,
  TypeScript: <SiTypescript className="h-6 w-6 text-[#3178C6]" />,

  // Frontend Development
  React: <SiReact className="h-6 w-6 text-[#61DAFB]" />,
  "Next.js": <SiNextdotjs className="h-6 w-6 text-black dark:text-white" />,
  "Tailwind CSS": <SiTailwindcss className="h-6 w-6 text-[#06B6D4]" />,

  // Backend Development
  Flask: <SiFlask className="h-6 w-6 text-black dark:text-white" />,
  FastAPI: <SiFastapi className="h-6 w-6 text-[#009688]" />,
  "REST APIs": (
    <TbApi className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
  ),
  SQLAlchemy: <TbDatabase className="h-6 w-6 text-red-600 dark:text-red-400" />,

  // AI & Machine Learning
  RAG: <TbBrain className="h-6 w-6 text-purple-600 dark:text-purple-400" />,
  LLMs: <TbCpu className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />,
  "Text Embeddings": (
    <TbVector className="h-6 w-6 text-blue-600 dark:text-blue-400" />
  ),
  "Sentence Transformers": (
    <TbArrowsRightLeft className="h-6 w-6 text-teal-600 dark:text-teal-400" />
  ),
  FAISS: <TbSearch className="h-6 w-6 text-amber-600 dark:text-amber-400" />,
  "Prompt Engineering": (
    <TbPrompt className="h-6 w-6 text-rose-600 dark:text-rose-400" />
  ),
  "Gemini API": (
    <TbBrain className="h-6 w-6 text-blue-600 dark:text-blue-400" />
  ),
  YOLOv8: <TbEye className="h-6 w-6 text-amber-500" />,
  PyMC: (
    <TbChartLine className="h-6 w-6 text-violet-600 dark:text-violet-400" />
  ),

  // Data Engineering
  Pandas: <SiPandas className="h-6 w-6 text-indigo-700 dark:text-indigo-300" />,
  NumPy: <SiNumpy className="h-6 w-6 text-[#013243] dark:text-cyan-400" />,
  ETL: <TbDatabaseExport className="h-6 w-6 text-blue-500" />,

  // Databases
  SQL: <TbDatabase className="h-6 w-6 text-blue-600 dark:text-blue-400" />,
  PostgreSQL: <SiPostgresql className="h-6 w-6 text-[#4169E1]" />,
  Neon: <SiPostgresql className="h-6 w-6 text-[#00E599]" />,
  pgvector: (
    <TbVector className="h-6 w-6 text-purple-600 dark:text-purple-400" />
  ),

  // Tools & Deployment
  Git: <SiGit className="h-6 w-6 text-[#F05032]" />,
  GitHub: <SiGithub className="h-6 w-6 text-black dark:text-white" />,
  Docker: <SiDocker className="h-6 w-6 text-[#2496ED]" />,
  "GitHub Actions": <SiGithubactions className="h-6 w-6 text-[#2088FF]" />,
  pytest: <SiPytest className="h-6 w-6 text-[#0A9EDC]" />,
  Vercel: <SiVercel className="h-6 w-6 text-black dark:text-white" />,
  Render: <SiRender className="h-6 w-6 text-black dark:text-white" />,
  Streamlit: <SiStreamlit className="h-6 w-6 text-[#FF4B4B]" />,
};

const skillGroups = [
  {
    title: "Programming Languages",
    description:
      "Writing application logic and developing software with Python and modern JavaScript and TypeScript.",
    skills: ["Python", "JavaScript", "TypeScript"],
  },
  {
    title: "Frontend Development",
    description:
      "Building responsive and interactive web interfaces with modern frontend frameworks and styling tools.",
    skills: ["React", "Next.js", "Tailwind CSS"],
  },
  {
    title: "Backend Development",
    description:
      "Developing backend services, database operations, application logic, and REST APIs.",
    skills: ["Flask", "FastAPI", "REST APIs", "SQLAlchemy"],
  },
  {
    title: "AI & Machine Learning",
    description:
      "Building retrieval-augmented applications and integrating language models and machine learning techniques.",
    skills: [
      "RAG",
      "LLMs",
      "Gemini API",
      "Text Embeddings",
      "Sentence Transformers",
      "FAISS",
      "Prompt Engineering",
      "YOLOv8",
      "PyMC",
    ],
  },
  {
    title: "Data Engineering",
    description:
      "Processing, transforming, and preparing data for analytical and machine learning workflows.",
    skills: ["Pandas", "NumPy", "ETL"],
  },
  {
    title: "Databases",
    description:
      "Working with relational databases, SQL, and vector storage for application data and semantic search.",
    skills: ["SQL", "PostgreSQL", "Neon", "pgvector"],
  },
  {
    title: "Tools & Deployment",
    description:
      "Using version control, automated testing, containerization, and cloud platforms to develop and deploy applications.",
    skills: [
      "Git",
      "GitHub",
      "Docker",
      "GitHub Actions",
      "pytest",
      "Vercel",
      "Render",
      "Streamlit",
    ],
  },
];

export default function Skills() {
  return (
    <section
      id="skills"
      aria-labelledby="skills-heading"
      className="border-t border-gray-200 py-20 dark:border-slate-800 sm:py-24"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Section heading */}
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.15em] text-blue-600 dark:text-blue-400">
            Technical Skills
          </p>

          <h2
            id="skills-heading"
            className="mt-3 text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl"
          >
            Technologies I use to build{" "}
            <span className="text-blue-600 dark:text-blue-400">
              AI-powered applications.
            </span>
          </h2>

          <p className="mt-5 text-base leading-7 text-gray-600 dark:text-gray-300 sm:text-lg">
            My technical skills span programming, full-stack development,
            artificial intelligence, data engineering, and software deployment,
            supported by hands-on project experience.
          </p>
        </div>

        {/* Skill categories */}
        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-7">
          {skillGroups.map((group) => (
            <article
              key={group.title}
              className="min-w-0 rounded-2xl border border-gray-200 bg-slate-50/70 p-6 shadow-sm transition-colors duration-200 hover:border-blue-300 dark:border-slate-800 dark:bg-slate-900/60 dark:hover:border-blue-800"
            >
              <h3 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
                {group.title}
              </h3>

              <p className="mt-3 text-sm leading-6 text-gray-600 dark:text-gray-300">
                {group.description}
              </p>

              {/* Individual skill cards */}
              <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3">
                {group.skills.map((skill) => (
                  <div
                    key={skill}
                    className="flex min-h-24 flex-col items-center justify-center rounded-xl border border-gray-200/80 bg-white px-2 py-3 text-center transition-colors duration-200 hover:border-blue-300 dark:border-slate-800 dark:bg-slate-950/60 dark:hover:border-blue-800"
                  >
                    <div
                      aria-hidden="true"
                      className="flex h-9 w-9 items-center justify-center"
                    >
                      {skillIconMap[skill] || (
                        <TbCpu className="h-6 w-6 text-gray-500" />
                      )}
                    </div>

                    <span className="mt-2 text-xs font-medium leading-5 text-gray-800 dark:text-gray-200 sm:text-sm">
                      {skill}
                    </span>
                  </div>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
