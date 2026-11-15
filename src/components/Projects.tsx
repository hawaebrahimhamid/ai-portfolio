"use client";

import { useState } from "react";
import Image from "next/image";
import { projects } from "@/data/projects";
import { FiGithub, FiExternalLink } from "react-icons/fi";

export default function Projects() {
  const [openCaseStudies, setOpenCaseStudies] = useState<string[]>([]);

  function toggleCaseStudy(projectTitle: string) {
    setOpenCaseStudies((openProjects) =>
      openProjects.includes(projectTitle)
        ? openProjects.filter((title) => title !== projectTitle)
        : [...openProjects, projectTitle],
    );
  }

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

        {/* Two-column project layout (2x2 Grid for professional balance) */}
        <div className="mt-12 grid grid-cols-1 gap-8 lg:grid-cols-2">
          {projects.map((project) => {
            const isCaseStudyOpen = openCaseStudies.includes(project.title);

            const projectImage = project.image ? (
              <Image
                src={project.image}
                alt={`${project.title} project screenshot`}
                fill
                className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
                sizes="(min-width: 1024px) 50vw, 100vw"
              />
            ) : null;

            return (
              <article
                key={project.title}
                className="flex h-full flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-blue-300 hover:shadow-xl dark:border-slate-800 dark:bg-slate-900 dark:hover:border-blue-800"
              >
                {/* Project Image Container with clear border contrast */}
                <div className="relative aspect-video overflow-hidden border-b border-gray-200 bg-slate-100 p-3 dark:border-slate-800 dark:bg-slate-950 sm:p-4">
                  {project.image ? (
                    project.liveUrl ? (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`View ${project.title} live project (opens in a new tab)`}
                        className="group relative block h-full w-full overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm outline-none transition-shadow hover:shadow-lg focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 dark:border-slate-700 dark:focus-visible:ring-offset-slate-900"
                      >
                        {projectImage}

                        <span className="absolute inset-x-0 bottom-0 flex translate-y-2 items-center justify-end bg-gradient-to-t from-slate-950/90 to-transparent px-4 pb-3 pt-10 text-sm font-semibold text-white opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100">
                          View Live Project
                          <FiExternalLink className="ml-2 h-4 w-4" />
                        </span>
                      </a>
                    ) : (
                      <div className="relative h-full w-full overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm dark:border-slate-700">
                        {projectImage}
                      </div>
                    )
                  ) : (
                    <div className="flex h-full items-center justify-center text-sm text-gray-500 dark:text-gray-400">
                      Project preview unavailable
                    </div>
                  )}
                </div>

                {/* Project information */}
                <div className="flex flex-1 flex-col justify-between p-6 sm:p-7">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl">
                      {project.title}
                    </h3>

                    <p className="mt-3 text-sm leading-7 text-gray-600 dark:text-gray-300 sm:text-base">
                      {project.description}
                    </p>

                    {/* Expandable case study */}
                    {project.caseStudy && isCaseStudyOpen && (
                      <div className="mt-5 space-y-4 rounded-xl border border-gray-200 bg-gray-50 p-4 dark:border-slate-700 dark:bg-slate-950 sm:p-5">
                        <div>
                          <h4 className="text-sm font-semibold text-gray-900 dark:text-white">
                            Problem & Objective
                          </h4>
                          <p className="mt-1 text-sm leading-6 text-gray-600 dark:text-gray-300">
                            {project.caseStudy.problem}
                          </p>
                        </div>

                        <div>
                          <h4 className="text-sm font-semibold text-gray-900 dark:text-white">
                            Architecture & Technical Approach
                          </h4>
                          <p className="mt-1 text-sm leading-6 text-gray-600 dark:text-gray-300">
                            {project.caseStudy.approach}
                          </p>
                        </div>

                        <div>
                          <h4 className="text-sm font-semibold text-gray-900 dark:text-white">
                            Key Implementation
                          </h4>
                          <p className="mt-1 text-sm leading-6 text-gray-600 dark:text-gray-300">
                            {project.caseStudy.implementation}
                          </p>
                        </div>

                        {project.caseStudy.engineeringDecisions && (
                          <div>
                            <h4 className="text-sm font-semibold text-gray-900 dark:text-white">
                              Engineering Decisions
                            </h4>
                            <p className="mt-1 text-sm leading-6 text-gray-600 dark:text-gray-300">
                              {project.caseStudy.engineeringDecisions}
                            </p>
                          </div>
                        )}

                        {project.caseStudy.challenges && (
                          <div>
                            <h4 className="text-sm font-semibold text-gray-900 dark:text-white">
                              Challenges & Solutions
                            </h4>
                            <p className="mt-1 text-sm leading-6 text-gray-600 dark:text-gray-300">
                              {project.caseStudy.challenges}
                            </p>
                          </div>
                        )}

                        {project.caseStudy.deployment && (
                          <div>
                            <h4 className="text-sm font-semibold text-gray-900 dark:text-white">
                              Deployment & Testing
                            </h4>
                            <p className="mt-1 text-sm leading-6 text-gray-600 dark:text-gray-300">
                              {project.caseStudy.deployment}
                            </p>
                          </div>
                        )}

                        {project.caseStudy.outcomes && (
                          <div>
                            <h4 className="text-sm font-semibold text-gray-900 dark:text-white">
                              Results & Outcomes
                            </h4>
                            <p className="mt-1 text-sm leading-6 text-gray-600 dark:text-gray-300">
                              {project.caseStudy.outcomes}
                            </p>
                          </div>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Technologies and project links */}
                  <div>
                    <ul
                      className="mt-6 flex flex-wrap gap-2"
                      aria-label={`${project.title} technologies`}
                    >
                      {project.technologies.map((technology) => (
                        <li
                          key={technology}
                          className="rounded-md border border-gray-200 bg-slate-50 px-2.5 py-1.5 text-xs font-medium text-gray-600 dark:border-slate-700 dark:bg-slate-800 dark:text-gray-300"
                        >
                          {technology}
                        </li>
                      ))}
                    </ul>

                    <div className="mt-6 flex flex-wrap items-center gap-3 border-t border-gray-100 pt-5 dark:border-slate-800">
                      {project.caseStudy && (
                        <button
                          type="button"
                          onClick={() => toggleCaseStudy(project.title)}
                          aria-expanded={isCaseStudyOpen}
                          className="inline-flex items-center rounded-lg border border-gray-300 px-3.5 py-2.5 text-xs font-semibold text-gray-700 transition-colors hover:border-blue-600 hover:text-blue-600 dark:border-slate-700 dark:text-gray-200 dark:hover:border-blue-400 dark:hover:text-blue-400"
                        >
                          {isCaseStudyOpen
                            ? "Hide Case Study"
                            : "View Case Study"}
                        </button>
                      )}

                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`View ${project.title} source code on GitHub (opens in a new tab)`}
                        className="inline-flex items-center gap-2 rounded-lg border border-gray-300 px-3.5 py-2.5 text-xs font-semibold text-gray-700 transition-all hover:border-blue-600 hover:text-blue-600 dark:border-slate-700 dark:text-gray-200 dark:hover:border-blue-400 dark:hover:text-blue-400"
                      >
                        <FiGithub className="h-4 w-4" />
                        Code
                      </a>

                      {project.liveUrl && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`Open ${project.title} live demo (opens in a new tab)`}
                          className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-3.5 py-2.5 text-xs font-semibold text-white transition-all hover:bg-blue-700 hover:shadow-md"
                        >
                          <FiExternalLink className="h-4 w-4" />
                          Live Demo
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
