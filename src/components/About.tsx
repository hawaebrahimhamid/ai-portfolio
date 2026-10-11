import Image from "next/image";
import { FiArrowUpRight, FiCheckCircle } from "react-icons/fi";

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
            Building practical software with{" "}
            <span className="text-blue-600 dark:text-blue-400">
              AI and modern web technologies.
            </span>
          </h2>

          <p className="mt-5 text-base leading-7 text-gray-600 dark:text-gray-300 sm:text-lg">
            I am an AI Engineer and Full-Stack Developer focused on building
            AI-powered applications that combine Generative AI, machine
            learning, backend systems, and modern web development.
          </p>
        </div>

        {/* Main content grid */}
        <div className="mt-12 grid items-start gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Column 1: Who I am */}
          <div className="flex flex-col justify-between h-full">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                Who I am
              </h3>

              <p className="mt-4 leading-7 text-gray-600 dark:text-gray-300">
                I build and deploy software that connects intelligent systems
                with practical applications. My work spans RAG applications,
                machine learning workflows, data pipelines, backend APIs, and
                full-stack web applications.
              </p>

              <p className="mt-4 leading-7 text-gray-600 dark:text-gray-300">
                My engineering approach combines AI development with modern
                software engineering, using Python, React, Next.js, and backend
                technologies to work across the stack—from data and backend
                services to user-facing interfaces.
              </p>
            </div>

            {/* Quick Impact Highlights for Recruiters */}
            <div className="mt-8 grid grid-cols-2 gap-4 rounded-xl border border-gray-200/80 bg-slate-50/50 p-4 dark:border-slate-800 dark:bg-slate-900/50">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                  Primary Focus
                </p>
                <p className="mt-1 text-sm font-medium text-gray-900 dark:text-white">
                  Generative AI & Full-Stack
                </p>
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                  Engineering Style
                </p>
                <p className="mt-1 text-sm font-medium text-gray-900 dark:text-white">
                  End-to-End Ownership
                </p>
              </div>
            </div>
          </div>

          {/* Column 2: What I build */}
          <div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
              What I build
            </h3>

            <div className="mt-6 space-y-4">
              <div className="rounded-xl border border-gray-200/80 bg-white p-5 shadow-sm transition-all hover:border-blue-300 dark:border-slate-800 dark:bg-slate-900/80 dark:hover:border-blue-900">
                <h4 className="font-semibold text-gray-900 dark:text-white">
                  Generative AI & RAG
                </h4>
                <p className="mt-2 text-sm leading-6 text-gray-600 dark:text-gray-300">
                  Building LLM-powered applications using RAG, embeddings,
                  vector retrieval, prompt engineering, and evidence-grounded
                  responses.
                </p>
              </div>

              <div className="rounded-xl border border-gray-200/80 bg-white p-5 shadow-sm transition-all hover:border-blue-300 dark:border-slate-800 dark:bg-slate-900/80 dark:hover:border-blue-900">
                <h4 className="font-semibold text-gray-900 dark:text-white">
                  Full-Stack Development
                </h4>
                <p className="mt-2 text-sm leading-6 text-gray-600 dark:text-gray-300">
                  Building responsive web applications with React, Next.js,
                  Python, REST APIs, databases, authentication, and third-party
                  integrations.
                </p>
              </div>

              <div className="rounded-xl border border-gray-200/80 bg-white p-5 shadow-sm transition-all hover:border-blue-300 dark:border-slate-800 dark:bg-slate-900/80 dark:hover:border-blue-900">
                <h4 className="font-semibold text-gray-900 dark:text-white">
                  Engineering Approach
                </h4>
                <p className="mt-2 text-sm leading-6 text-gray-600 dark:text-gray-300">
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
