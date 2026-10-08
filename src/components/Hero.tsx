"use client";

import { motion, type Variants, useReducedMotion } from "framer-motion";

const fadeUp: Variants = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

export default function Hero() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className="py-11 sm:py-15 lg:py-19">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Left Content */}
          <motion.div
            initial={shouldReduceMotion ? false : "hidden"}
            animate="visible"
            variants={{
              hidden: {},
              visible: {
                transition: {
                  staggerChildren: shouldReduceMotion ? 0 : 0.12,
                },
              },
            }}
          >
            {/* Professional Title */}
            <motion.p
              variants={fadeUp}
              className="text-sm font-semibold uppercase tracking-[0.15em] text-blue-600 dark:text-blue-400"
            >
              AI Engineer & Full-Stack Developer
            </motion.p>

            {/* Main Heading */}
            <motion.h1
              variants={fadeUp}
              className="mt-6 text-5xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-6xl lg:text-[64px] xl:text-[72px]"
            >
              Building AI-Powered
              <span className="block text-blue-600 dark:text-blue-400">
                Web Applications.
              </span>
            </motion.h1>

            {/* Supporting Focus */}
            <motion.p
              variants={fadeUp}
              className="mt-5 text-sm font-medium tracking-wide text-gray-600 dark:text-gray-300 sm:text-base"
            >
             Generative AI · RAG · LLM Applications · Full-Stack Engineering
            </motion.p>

            {/* Description */}
            <motion.p
              variants={fadeUp}
              className="mt-5 max-w-xl text-base leading-7 text-gray-600 dark:text-gray-300"
            >
             I combine Generative AI with modern software engineering to build practical applications using Python, React, and backend APIs.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              variants={fadeUp}
              className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4"
            >
              {/* Primary CTA */}
              <a
                href="#projects"
                className="inline-flex items-center justify-center rounded-xl bg-blue-600 px-6 py-3 text-base font-semibold text-white shadow-md transition-all duration-300 hover:-translate-y-0.5 hover:bg-blue-700 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-slate-950"
              >
                View Projects
              </a>

              {/* Secondary CTA */}
              <a
                href="#contact"
                className="inline-flex items-center justify-center rounded-xl border border-gray-300 px-6 py-3 text-base font-semibold text-gray-900 transition-all duration-300 hover:-translate-y-0.5 hover:border-blue-600 hover:text-blue-600 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:border-slate-700 dark:text-gray-100 dark:hover:border-blue-400 dark:hover:text-blue-400 dark:focus:ring-offset-slate-950"
              >
                Get in Touch
              </a>
            </motion.div>
          </motion.div>

          {/* Right Technology Card */}
          <motion.div
            className="flex w-full justify-center lg:justify-end"
            initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: shouldReduceMotion ? 0 : 0.7,
              delay: shouldReduceMotion ? 0 : 0.2,
              ease: "easeOut",
            }}
          >
            <div className="w-full max-w-lg">
              <div className="rounded-3xl border border-gray-200 bg-white/80 p-6 shadow-xl backdrop-blur sm:p-8 dark:border-slate-800 dark:bg-slate-900/80">
                {/* Card Header */}
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-600 dark:text-blue-400">
                      AI Engineering
                    </p>

                    <h2 className="mt-2 text-2xl font-bold text-gray-900 dark:text-white">
                      Intelligent Systems
                    </h2>
                  </div>

                  <div
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-100 text-blue-600 dark:bg-blue-950 dark:text-blue-400"
                    aria-hidden="true"
                  >
                    ✦
                  </div>
                </div>

                {/* Technologies */}
                <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
                  {/* AI */}
                  <div className="rounded-xl border border-gray-200 bg-gray-50 p-4 dark:border-slate-700 dark:bg-slate-800/60">
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      AI
                    </p>

                    <p className="mt-1 font-semibold text-gray-900 dark:text-white">
                      RAG & LLMs
                    </p>
                  </div>

                  {/* Backend */}
                  <div className="rounded-xl border border-gray-200 bg-gray-50 p-4 dark:border-slate-700 dark:bg-slate-800/60">
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Backend
                    </p>

                    <p className="mt-1 font-semibold text-gray-900 dark:text-white">
                      Python & FastAPI
                    </p>
                  </div>

                  {/* Frontend */}
                  <div className="rounded-xl border border-gray-200 bg-gray-50 p-4 dark:border-slate-700 dark:bg-slate-800/60">
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Frontend
                    </p>

                    <p className="mt-1 font-semibold text-gray-900 dark:text-white">
                      Next.js & React
                    </p>
                  </div>

                  {/* Data */}
                  <div className="rounded-xl border border-gray-200 bg-gray-50 p-4 dark:border-slate-700 dark:bg-slate-800/60">
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Data
                    </p>

                    <p className="mt-1 font-semibold text-gray-900 dark:text-white">
                      PostgreSQL & FAISS
                    </p>
                  </div>
                </div>

                {/* Status */}
                <div className="mt-6 flex items-center gap-3 rounded-xl bg-gray-50 px-4 py-3 dark:bg-slate-800/60">
                  <span
                    className="h-2.5 w-2.5 shrink-0 rounded-full bg-green-500"
                    aria-hidden="true"
                  />

                  <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Building AI & full-stack applications
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
