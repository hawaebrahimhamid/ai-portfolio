import Image from "next/image";
import { projects } from "@/data/projects";

export default function Projects() {
  return (
    <section
      id="projects"
      className="border-t border-gray-200 py-20 dark:border-slate-800 sm:py-24"
      aria-labelledby="projects-heading"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.15em] text-blue-600 dark:text-blue-400">
            Selected Projects
          </p>

          <h2
            id="projects-heading"
            className="mt-3 text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl"
          >
            Building practical{" "}
            <span className="text-blue-600 dark:text-blue-400">
              AI and software solutions.
            </span>
          </h2>

          <p className="mt-5 text-base leading-7 text-gray-600 dark:text-gray-300 sm:text-lg">
            A selection of projects demonstrating my experience across
            Generative AI, machine learning, data engineering, and full-stack
            development.
          </p>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {projects.map((project) => (
            <article
              key={project.title}
              className="flex h-full flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white transition-colors duration-300 hover:border-blue-200 hover:shadow-md motion-safe:hover:-translate-y-0.5 dark:border-slate-800 dark:bg-slate-900 dark:hover:border-blue-900"
            >
              <div className="relative aspect-video overflow-hidden border-b border-gray-200 bg-gray-50 dark:border-slate-800 dark:bg-slate-950">
                {project.videoUrl ? (
                  <video
                    className="absolute inset-0 h-full w-full bg-black object-contain"
                    controls
                    playsInline
                    preload="metadata"
                    aria-label={`${project.title} project demonstration video`}
                  >
                    <source src={project.videoUrl} type="video/mp4" />
                    Your browser does not support HTML video.
                  </video>
                ) : project.image ? (
                  <Image
                    src={project.image}
                    alt={`${project.title} project screenshot`}
                    fill
                    className="object-cover"
                    sizes="(min-width: 1024px) 33vw, 100vw"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center text-sm text-gray-500 dark:text-gray-400">
                    Project preview unavailable
                  </div>
                )}
              </div>

              <div className="flex flex-1 flex-col p-5 sm:p-6">
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                    {project.title}
                  </h3>

                  <p className="mt-4 leading-7 text-gray-600 dark:text-gray-300">
                    {project.description}
                  </p>

                  <ul
                    className="mt-6 flex flex-wrap gap-2"
                    aria-label={`${project.title} technologies`}
                  >
                    {project.technologies.map((technology) => (
                      <li
                        key={technology}
                        className="rounded-full border border-gray-200 bg-gray-50 px-3 py-1.5 text-sm text-gray-700 transition-colors duration-200 hover:border-blue-300 hover:text-blue-600 dark:border-slate-700 dark:bg-slate-800/60 dark:text-gray-300 dark:hover:border-blue-700 dark:hover:text-blue-400"
                      >
                        {technology}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-8 flex flex-wrap gap-3">
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`View ${project.title} source code on GitHub (opens in a new tab)`}
                    className="inline-flex items-center rounded-lg border border-gray-300 px-4 py-2 text-sm font-semibold text-gray-900 transition-colors duration-200 hover:border-blue-600 hover:text-blue-600 dark:border-slate-700 dark:text-gray-100 dark:hover:border-blue-400 dark:hover:text-blue-400"
                  >
                    GitHub
                  </a>

                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Open ${project.title} live demo (opens in a new tab)`}
                      className="inline-flex items-center rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition-colors duration-200 hover:bg-blue-700 hover:shadow-md"
                    >
                      Live Demo
                    </a>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
