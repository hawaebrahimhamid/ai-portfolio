import Link from "next/link";
import { FiArrowUpRight } from "react-icons/fi";
import { FaGithub, FaLinkedinIn } from "react-icons/fa";

const footerLinks = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-gray-200 bg-gray-50 dark:border-slate-800 dark:bg-slate-950">
      <div className="mx-auto max-w-6xl px-6 py-10 sm:py-12">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_0.8fr] lg:gap-12">
          {/* Professional identity */}
          <div>
            <Link
              href="#home"
              className="inline-block text-lg font-bold tracking-tight text-gray-900 transition-colors hover:text-blue-600 dark:text-white dark:hover:text-blue-400"
            >
              AI Engineer{" "}
              <span className="text-blue-600 dark:text-blue-400">&</span>{" "}
              Full-Stack Developer
            </Link>

            <p className="mt-4 max-w-sm text-sm leading-7 text-gray-600 dark:text-slate-400">
              Building AI-powered applications and web experiences with a focus
              on practical solutions, thoughtful engineering, and continuous
              learning.
            </p>
          </div>

          {/* Quick navigation */}
          <div>
            <h2 className="text-sm font-semibold text-gray-900 dark:text-white">
              Explore
            </h2>

            <nav aria-label="Footer navigation" className="mt-4">
              <ul className="space-y-3">
                {footerLinks.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      className="text-sm text-gray-600 transition-colors hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-400"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          {/* Professional links */}
          <div>
            <h2 className="text-sm font-semibold text-gray-900 dark:text-white">
              Connect
            </h2>

            <div className="mt-4 flex flex-col items-start gap-4">
              <a
                href="https://github.com/hawaebrahimhamid"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm text-gray-600 transition-colors hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-400"
              >
                <FaGithub aria-hidden="true" size={17} />
                GitHub
                <FiArrowUpRight aria-hidden="true" size={14} />
              </a>

              <a
                href="https://linkedin.com/in/hawa-ebrahim-hamid"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm text-gray-600 transition-colors hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-400"
              >
                <FaLinkedinIn aria-hidden="true" size={17} />
                LinkedIn
                <FiArrowUpRight aria-hidden="true" size={14} />
              </a>

              <a
                href="mailto:hawaebrahimhamid@gmail.com"
                className="text-sm text-gray-600 transition-colors hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-400"
              >
                Email me
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-10 border-t border-gray-200 pt-6 dark:border-slate-800 sm:mt-12">
          <p className="text-sm text-gray-500 dark:text-slate-500">
            © {currentYear} Hawa Ebrahim Hamid. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
