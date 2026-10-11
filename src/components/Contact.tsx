import { FiArrowUpRight, FiMail } from "react-icons/fi";
import { FaGithub, FaLinkedinIn } from "react-icons/fa";

const contactLinks = [
  {
    label: "LinkedIn",
    href: "https://linkedin.com/in/hawa-ebrahim-hamid",
    icon: FaLinkedinIn,
  },
  {
    label: "GitHub",
    href: "https://github.com/hawaebrahimhamid",
    icon: FaGithub,
  },
];

export default function Contact() {
  return (
    <section
      id="contact"
      className="border-t border-gray-200 py-20 dark:border-slate-800 sm:py-24"
      aria-labelledby="contact-heading"
    >
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid gap-10 md:grid-cols-[1.2fr_0.8fr] md:items-center md:gap-16">
          <div>
            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-blue-600 dark:text-blue-400">
              Get in touch
            </p>

            <h2
              id="contact-heading"
              className="max-w-2xl text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl lg:text-5xl"
            >
              Let’s Build Intelligent, Useful Software.
            </h2>

            <p className="mt-6 max-w-xl text-base leading-7 text-gray-600 dark:text-slate-300 sm:text-lg">
              I’m interested in AI engineering and full-stack development
              opportunities where I can build practical AI-powered applications,
              develop reliable web experiences, and solve real-world problems.
            </p>

            <a
              href="mailto:hawaebrahimhamid@gmail.com"
              className="mt-8 inline-flex items-center gap-3 rounded-lg bg-gray-900 px-5 py-3 font-semibold text-white transition-colors hover:bg-gray-700 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-600 dark:bg-white dark:text-gray-900 dark:hover:bg-slate-200"
            >
              <FiMail aria-hidden="true" size={18} />
              Email Me
              <FiArrowUpRight aria-hidden="true" size={18} />
            </a>
          </div>

          <div className="rounded-2xl border border-gray-200 bg-gray-50 p-6 dark:border-slate-800 dark:bg-slate-900/50 sm:p-8">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Connect with me
            </h3>

            <p className="mt-2 text-sm leading-6 text-gray-600 dark:text-slate-400">
              Explore my work or connect with me professionally.
            </p>

            <div className="mt-6 space-y-3">
              {contactLinks.map((link) => {
                const Icon = link.icon;

                return (
                  <a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center justify-between rounded-xl border border-gray-200 bg-white p-4 transition-colors hover:border-blue-500 dark:border-slate-700 dark:bg-slate-950 dark:hover:border-blue-400"
                  >
                    <span className="flex items-center gap-3">
                      <Icon
                        aria-hidden="true"
                        size={20}
                        className="text-gray-700 dark:text-slate-300"
                      />
                      <span className="font-medium text-gray-800 dark:text-slate-100">
                        {link.label}
                      </span>
                    </span>

                    <FiArrowUpRight
                      aria-hidden="true"
                      size={18}
                      className="text-gray-500 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 dark:text-slate-400"
                    />
                  </a>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
