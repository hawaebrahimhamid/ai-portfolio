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
  // Generative AI
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

  // Full-Stack Development
  React: <SiReact className="h-6 w-6 text-[#61DAFB]" />,
  "Next.js": <SiNextdotjs className="h-6 w-6 text-black dark:text-white" />,
  JavaScript: <SiJavascript className="h-6 w-6 text-[#F7DF1E]" />,
  TypeScript: <SiTypescript className="h-6 w-6 text-[#3178C6]" />,
  Python: <SiPython className="h-6 w-6 text-[#3776AB]" />,
  Flask: <SiFlask className="h-6 w-6 text-black dark:text-white" />,
  FastAPI: <SiFastapi className="h-6 w-6 text-[#009688]" />,
  "REST APIs": (
    <TbApi className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
  ),

  // Data & Machine Learning
  SQL: <TbDatabase className="h-6 w-6 text-blue-600 dark:text-blue-400" />,
  PostgreSQL: <SiPostgresql className="h-6 w-6 text-[#4169E1]" />,
  Pandas: <SiPandas className="h-6 w-6 text-indigo-700 dark:text-indigo-300" />,
  NumPy: <SiNumpy className="h-6 w-6 text-[#013243] dark:text-cyan-400" />,
  YOLOv8: <TbEye className="h-6 w-6 text-amber-500" />,
  PyMC: (
    <TbChartLine className="h-6 w-6 text-violet-600 dark:text-violet-400" />
  ),
  ETL: <TbDatabaseExport className="h-6 w-6 text-blue-500" />,

  // Engineering & Deployment
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
    title: "Generative AI & RAG",
    description:
      "Building language-model applications with semantic retrieval, embeddings, and evidence-grounded responses.",
    skills: [
      "RAG",
      "LLMs",
      "Text Embeddings",
      "Sentence Transformers",
      "FAISS",
      "Prompt Engineering",
    ],
  },
  {
    title: "Full-Stack Development",
    description:
      "Developing web applications and backend services with modern frontend frameworks, Python, and REST APIs.",
    skills: [
      "React",
      "Next.js",
      "JavaScript",
      "TypeScript",
      "Python",
      "Flask",
      "FastAPI",
      "REST APIs",
    ],
  },
  {
    title: "Data & Machine Learning",
    description:
      "Working with relational databases, data processing, machine learning workflows, and analytical applications.",
    skills: ["SQL", "PostgreSQL", "Pandas", "NumPy", "YOLOv8", "PyMC", "ETL"],
  },
  {
    title: "Engineering & Deployment",
    description:
      "Applying version control, automated testing, containerization, and deployment tools to build and maintain applications.",
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
            My technical skills span Generative AI, full-stack development, data
            processing, machine learning, and software deployment, supported by
            hands-on project experience.
          </p>
        </div>

        {/* Skill categories */}
        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:gap-8">
          {skillGroups.map((group) => (
            <article
              key={group.title}
              className="min-w-0 rounded-2xl border border-gray-200 bg-slate-50/70 p-6 shadow-sm transition-colors duration-200 hover:border-blue-300 dark:border-slate-800 dark:bg-slate-900/60 dark:hover:border-blue-800 sm:p-8"
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
