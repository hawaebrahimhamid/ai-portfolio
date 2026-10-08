const skillGroups = [
  {
    title: "Generative AI",
    description:
      "Building retrieval-augmented and language-model applications with practical grounding and retrieval workflows.",
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
      "Developing responsive web applications, backend services, APIs, and database-backed features.",
    skills: [
      "React",
      "Next.js",
      "JavaScript",
      "Python",
      "Flask",
      "FastAPI",
      "REST APIs",
    ],
  },
  {
    title: "Data & Machine Learning",
    description:
      "Working with data pipelines, machine learning workflows, computer vision, and analytical applications.",
    skills: [
      "PostgreSQL",
      "Pandas",
      "NumPy",
      "YOLOv8",
      "PyMC",
      "ETL",
    ],
  },
  {
    title: "Engineering & Deployment",
    description:
      "Using modern development practices to test, version, containerize, and deploy applications.",
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
      className="border-t border-gray-200 py-20 dark:border-slate-800 sm:py-24"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Section heading */}
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.15em] text-blue-600 dark:text-blue-400">
            Technical Skills
          </p>

          <h2 className="mt-3 text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
            Tools I use to build{" "}
            <span className="text-blue-600 dark:text-blue-400">
              AI-powered applications.
            </span>
          </h2>

          <p className="mt-5 text-base leading-7 text-gray-600 dark:text-gray-300 sm:text-lg">
            I work across the AI and web application stack, from retrieval
            and language models to frontend interfaces, backend APIs, data
            systems, testing, and deployment.
          </p>
        </div>

        {/* Skill groups */}
        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {skillGroups.map((group) => (
            <article
              key={group.title}
              className="rounded-2xl border border-gray-200 bg-white p-6 transition-all duration-300 hover:-translate-y-0.5 hover:border-blue-200 hover:shadow-md dark:border-slate-800 dark:bg-slate-900 dark:hover:border-blue-900"
            >
              <h3 className="text-xl font-semibold text-blue-600 dark:text-blue-400">
                {group.title}
              </h3>

              <p className="mt-3 text-sm leading-6 text-gray-600 dark:text-gray-300">
                {group.description}
              </p>

              <div className="mt-6 flex flex-wrap gap-2">
                {group.skills.map((skill) => (
                  <span
                    key={skill}
                    className="rounded-full border border-gray-200 bg-gray-50 px-3 py-1.5 text-sm text-gray-700 transition-colors duration-200 hover:border-blue-300 hover:text-blue-600 dark:border-slate-700 dark:bg-slate-800/60 dark:text-gray-300 dark:hover:border-blue-700 dark:hover:text-blue-400"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
