const experiences = [
  {
    role: "AI & Machine Learning Engineer — Project-Based",
    period: "May 2026 – Present",
    location: "Addis Ababa / Remote",
    description:
      "Completed the Kifiya AI Mastery Program in 2026 and continue developing project-based AI, machine learning, and software applications.",
    highlights: [
      "Build AI and machine learning applications using Python, SQL, RAG, LLMs, data engineering, and REST APIs.",
      "Develop applications involving embeddings, vector retrieval, backend APIs, and machine learning workflows.",
      "Apply testing, version control, CI/CD, Docker, and cloud deployment practices across projects.",
    ],
  },
  {
    role: "Full-Stack Developer — Independent Software Projects",
    period: "2024 – Present",
    location: "Addis Ababa / Remote",
    description:
      "Build and deploy full-stack applications that combine modern frontend development, backend services, APIs, databases, and AI-powered workflows.",
    highlights: [
      "Develop responsive web applications using React, Next.js, JavaScript, Python, Flask, REST APIs, and databases.",
      "Build backend services, authentication flows, API integrations, and database-backed features.",
      "Integrate AI and data-processing workflows into web applications using Git, GitHub, testing, and cloud deployment platforms.",
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
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.15em] text-blue-600 dark:text-blue-400">
            Experience
          </p>

          <h2 className="mt-3 text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
            Building software through{" "}
            <span className="text-blue-600 dark:text-blue-400">
              AI and full-stack engineering.
            </span>
          </h2>

          <p className="mt-5 text-base leading-7 text-gray-600 dark:text-gray-300 sm:text-lg">
            My experience combines structured AI and machine learning training
            with hands-on software projects, building and deploying practical
            applications across the stack.
          </p>
        </div>

        <div className="relative mt-12">
          <div className="absolute left-[7px] top-2 hidden h-[calc(100%-8px)] w-px bg-gray-200 dark:bg-slate-800 sm:block" />

          <div className="space-y-12">
            {experiences.map((experience) => (
              <article
                key={experience.role}
                className="relative sm:pl-12"
              >
                <div className="absolute left-0 top-2 hidden h-4 w-4 rounded-full border-4 border-white bg-blue-600 dark:border-slate-950 dark:bg-blue-400 sm:block" />

                <div className="rounded-2xl border border-gray-200 bg-white p-6 transition-all duration-300 hover:-translate-y-0.5 hover:border-blue-200 hover:shadow-md dark:border-slate-800 dark:bg-slate-900 dark:hover:border-blue-900 sm:p-8">
                  <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between sm:gap-6">
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                        {experience.role}
                      </h3>

                      <p className="mt-2 text-sm font-medium text-blue-600 dark:text-blue-400">
                        {experience.period}
                      </p>
                    </div>

                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {experience.location}
                    </p>
                  </div>

                  <p className="mt-5 max-w-3xl leading-7 text-gray-600 dark:text-gray-300">
                    {experience.description}
                  </p>

                  <ul className="mt-6 space-y-3">
                    {experience.highlights.map((highlight) => (
                      <li
                        key={highlight}
                        className="flex gap-3 leading-7 text-gray-600 dark:text-gray-300"
                      >
                        <span
                          className="mt-3 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-600 dark:bg-blue-400"
                          aria-hidden="true"
                        />
                        <span>{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
