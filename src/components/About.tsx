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
            Building practical software with AI and modern web technologies.
          </h2>

          <p className="mt-5 text-base leading-7 text-gray-600 dark:text-gray-300 sm:text-lg">
            I am an AI Engineer and Full-Stack Developer focused on building
AI-powered applications that combine Generative AI, machine
learning, backend systems, and modern web development.
          </p>
        </div>

        {/* Main content */}
        <div className="mt-12 grid gap-10 lg:grid-cols-2 lg:gap-16">
          <div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
              Who I am
            </h3>

            <p className="mt-4 leading-7 text-gray-600 dark:text-gray-300">
              I build and deploy software that connects intelligent systems
with practical applications. My work spans RAG
applications, machine learning workflows, data pipelines,
backend APIs, and full-stack web applications.
            </p>

            <p className="mt-4 leading-7 text-gray-600 dark:text-gray-300">
              My engineering approach combines AI development with modern software engineering, using Python, React, Next.js, and backend technologies to work across the stack—from data and backend services to user-facing interfaces.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
              What I build
            </h3>

            <div className="mt-6 space-y-6">
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-white">
                  Generative AI & RAG
                </h4>

                <p className="mt-2 leading-7 text-gray-600 dark:text-gray-300">
                  Building LLM-powered applications using RAG, embeddings,
vector retrieval, prompt engineering, and evidence-grounded responses.
                </p>
              </div>

              <div>
                <h4 className="font-semibold text-gray-900 dark:text-white">
                  Full-Stack Development
                </h4>

                <p className="mt-2 leading-7 text-gray-600 dark:text-gray-300">
                  Building responsive web applications with React, Next.js,
Python, REST APIs, databases, authentication, and third-party integrations.
                </p>
              </div>

              <div>
                <h4 className="font-semibold text-gray-900 dark:text-white">
                  Engineering Approach
                </h4>

                <p className="mt-2 leading-7 text-gray-600 dark:text-gray-300">
                  Designing maintainable systems with clear architecture,
testing, version control, CI/CD, and deployment practices.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
