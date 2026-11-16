export default function About() {
  return (
    <section
      id="about"
      className="border-t border-gray-200 py-20 dark:border-slate-800 sm:py-24"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Section heading */}
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.15em] text-blue-600 dark:text-blue-400">
            About
          </p>

          <h2 className="mt-3 text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
            Building practical solutions with{" "}
            <span className="text-blue-600 dark:text-blue-400">
              AI and modern web technologies.
            </span>
          </h2>

          <p className="mt-5 text-base leading-7 text-gray-600 dark:text-gray-300 sm:text-lg">
            I am an AI Engineer and Full-Stack Developer building AI-powered
            applications that combine Generative AI, machine learning, and
            modern web technologies.
          </p>
        </div>

        {/* Main content */}
        <div className="mt-12 grid items-start gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Who I am */}
          <div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
              Who I am
            </h3>

            <p className="mt-4 leading-7 text-gray-600 dark:text-gray-300">
              I develop practical software through independent projects and
              specialized AI training. My work spans RAG applications, machine
              learning workflows, data pipelines, backend APIs, and full-stack
              web development.
            </p>

            <p className="mt-4 leading-7 text-gray-600 dark:text-gray-300">
              I also designed and deployed this AI-powered portfolio platform,
              featuring a RAG assistant that retrieves information about my
              projects, skills, and experience to provide relevant,
              context-grounded answers.
            </p>

            {/* Key focus */}
            <div className="mt-8 grid grid-cols-2 gap-4 rounded-xl border border-gray-200/80 bg-slate-50/50 p-4 dark:border-slate-800 dark:bg-slate-900/50">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                  Primary Focus
                </p>
                <p className="mt-1 text-sm font-medium text-gray-900 dark:text-white">
                  AI Engineering & Full-Stack
                </p>
              </div>

              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                  Approach
                </p>
                <p className="mt-1 text-sm font-medium text-gray-900 dark:text-white">
                  Build, Test & Deploy
                </p>
              </div>
            </div>
          </div>

          {/* What I build */}
          <div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
              What I build
            </h3>

            <div className="mt-6 space-y-4">
              {/* Generative AI */}
              <div className="rounded-xl border border-gray-200/80 bg-white p-5 shadow-sm transition-all hover:border-blue-300 dark:border-slate-800 dark:bg-slate-900/80 dark:hover:border-blue-900">
                <h4 className="font-semibold text-gray-900 dark:text-white">
                  Generative AI & RAG
                </h4>

                <p className="mt-2 text-sm leading-6 text-gray-600 dark:text-gray-300">
                  Building AI assistants using LLMs, text embeddings, vector
                  search, and context-grounded responses.
                </p>
              </div>

              {/* Full-Stack Development */}
              <div className="rounded-xl border border-gray-200/80 bg-white p-5 shadow-sm transition-all hover:border-blue-300 dark:border-slate-800 dark:bg-slate-900/80 dark:hover:border-blue-900">
                <h4 className="font-semibold text-gray-900 dark:text-white">
                  Full-Stack Development
                </h4>

                <p className="mt-2 text-sm leading-6 text-gray-600 dark:text-gray-300">
                  Developing responsive applications with React, Next.js,
                  Python, REST APIs, databases, and authentication.
                </p>
              </div>

              {/* Machine Learning and Data Engineering */}
              <div className="rounded-xl border border-gray-200/80 bg-white p-5 shadow-sm transition-all hover:border-blue-300 dark:border-slate-800 dark:bg-slate-900/80 dark:hover:border-blue-900">
                <h4 className="font-semibold text-gray-900 dark:text-white">
                  Machine Learning & Data Engineering
                </h4>

                <p className="mt-2 text-sm leading-6 text-gray-600 dark:text-gray-300">
                  Developing machine learning workflows, data pipelines, and
                  analytics applications using Python and SQL.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
