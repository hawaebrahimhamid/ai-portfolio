"use client";

import { useEffect, useState } from "react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { Menu, ChevronDown } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

export default function Navbar() {
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    // Select all sections with an id attribute
    const sections = document.querySelectorAll("section[id]");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        rootMargin: "-20% 0px -55% 0px", // Better viewport intersection margin
        threshold: 0.1,
      },
    );

    sections.forEach((section) => observer.observe(section));

    // Reset active highlight when scrolled back to the very top (Hero section)
    const handleScroll = () => {
      if (window.scrollY < 100) {
        setActiveSection("");
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const navItems = [
    { label: "About", href: "#about" },
    { label: "Skills", href: "#skills" },
    { label: "Experience", href: "#experience" },
    { label: "Projects", href: "#projects" },
    { label: "Ask AI", href: "#ai-assistant" },
    { label: "Contact", href: "#contact" },
  ];

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-gray-200/80 bg-white/90 backdrop-blur-xl dark:border-slate-800/80 dark:bg-slate-950/90">
      <div className="mx-auto grid h-20 w-full max-w-[2400px] grid-cols-[auto_1fr_auto] items-center px-5 sm:px-6 lg:px-8 2xl:px-12">
        {/* Logo */}
        <div className="shrink-0">
          <a
            href="#home"
            onClick={() => setActiveSection("")}
            className="text-2xl font-bold tracking-tight text-gray-900 transition-colors duration-200 hover:text-blue-600 dark:text-white dark:hover:text-blue-400 sm:text-[26px]"
          >
            Hawa<span className="text-blue-600 dark:text-blue-400">.dev</span>
          </a>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden xl:flex items-center justify-center">
          <div className="flex items-center gap-7 2xl:gap-10">
            {navItems.map((item) => {
              const isActive = activeSection === item.href.slice(1);

              return (
                <a
                  key={item.href}
                  href={item.href}
                  className={`group relative whitespace-nowrap px-1 py-2 text-[15px] font-medium transition-all duration-200 ${
                    isActive
                      ? "text-blue-600 dark:text-blue-400"
                      : "text-gray-700 hover:text-blue-600 dark:text-gray-200 dark:hover:text-blue-400"
                  }`}
                >
                  {item.label}

                  <span
                    className={`absolute bottom-0 left-1/2 h-0.5 -translate-x-1/2 rounded-full bg-blue-600 transition-all duration-200 dark:bg-blue-400 ${
                      isActive ? "w-full" : "w-0 group-hover:w-full"
                    }`}
                  />
                </a>
              );
            })}
          </div>
        </div>

        {/* Right Side */}
        <div className="flex shrink-0 items-center justify-end gap-2 sm:gap-3">
          {/* Desktop Social Links + Resume */}
          <div className="hidden xl:flex items-center gap-2">
            {/* GitHub */}
            <a
              href="https://github.com/hawaebrahimhamid"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub Profile"
              className="flex h-10 w-10 items-center justify-center rounded-full text-gray-700 transition-all duration-200 hover:-translate-y-0.5 hover:bg-gray-100 hover:text-blue-600 dark:text-gray-200 dark:hover:bg-slate-800 dark:hover:text-blue-400"
            >
              <FaGithub size={22} />
            </a>

            {/* LinkedIn */}
            <a
              href="https://linkedin.com/in/hawa-ebrahim-hamid"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn Profile"
              className="flex h-10 w-10 items-center justify-center rounded-full text-gray-700 transition-all duration-200 hover:-translate-y-0.5 hover:bg-gray-100 hover:text-blue-600 dark:text-gray-200 dark:hover:bg-slate-800 dark:hover:text-blue-400"
            >
              <FaLinkedin size={22} />
            </a>

            {/* Desktop Resume Dropdown */}
            <div className="relative ml-1 group">
              <button
                type="button"
                aria-haspopup="true"
                className="flex items-center gap-2 whitespace-nowrap rounded-lg bg-gray-900 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors duration-200 hover:bg-gray-800 dark:bg-white dark:text-gray-900 dark:hover:bg-gray-200"
              >
                Resume
                <ChevronDown size={16} />
              </button>

              <div className="invisible absolute right-0 top-full z-50 w-72 pt-2 opacity-0 transition-all duration-150 group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100">
                <div className="rounded-xl border border-gray-200 bg-white p-2 shadow-lg dark:border-slate-700 dark:bg-slate-900">
                  <a
                    href="/resume.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block rounded-lg px-3 py-3 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-slate-800"
                  >
                    <span className="block font-semibold">
                      AI Engineer & Full-Stack Developer Resume
                    </span>
                  </a>

                  <a
                    href="/full-stack-engineer-resume.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block rounded-lg px-3 py-3 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-slate-800"
                  >
                    <span className="block font-semibold">
                      Full-Stack Engineer Resume
                    </span>
                  </a>

                  <a
                    href="/ai-ml-engineer-resume.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block rounded-lg px-3 py-3 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-slate-800"
                  >
                    <span className="block font-semibold">
                      AI/ML Engineer Resume
                    </span>
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Theme Toggle */}
          <ThemeToggle />

          {/* Mobile / Tablet Menu */}
          <Sheet>
            <SheetTrigger
              className="flex h-10 w-10 items-center justify-center rounded-lg text-gray-700 transition-colors duration-200 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-slate-800 xl:hidden"
              aria-label="Open navigation menu"
            >
              <Menu size={24} />
            </SheetTrigger>

            <SheetContent
              side="right"
              className="w-[300px] border-slate-200 dark:border-slate-800"
            >
              <nav className="mt-10 flex flex-col">
                {/* Mobile Navigation */}
                <div className="flex flex-col">
                  {navItems.map((item) => {
                    const isActive = activeSection === item.href.slice(1);

                    return (
                      <a
                        key={item.href}
                        href={item.href}
                        className={`border-b border-gray-100 py-4 text-base font-medium transition-colors dark:border-slate-800 ${
                          isActive
                            ? "text-blue-600 dark:text-blue-400"
                            : "text-gray-700 hover:text-blue-600 dark:text-gray-200 dark:hover:text-blue-400"
                        }`}
                      >
                        {item.label}
                      </a>
                    );
                  })}
                </div>

                {/* Mobile Social Links */}
                <div className="mt-8 flex items-center gap-3">
                  <a
                    href="https://github.com/hawaebrahimhamid"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="GitHub Profile"
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 text-gray-700 transition-colors hover:border-blue-500 hover:text-blue-600 dark:border-slate-700 dark:text-gray-200 dark:hover:border-blue-400 dark:hover:text-blue-400"
                  >
                    <FaGithub size={20} />
                  </a>

                  <a
                    href="https://linkedin.com/in/hawa-ebrahim-hamid"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="LinkedIn Profile"
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 text-gray-700 transition-colors hover:border-blue-500 hover:text-blue-600 dark:border-slate-700 dark:text-gray-200 dark:hover:border-blue-400 dark:hover:text-blue-400"
                  >
                    <FaLinkedin size={20} />
                  </a>
                </div>

                {/* Mobile Resume Options */}
                <div className="mt-6 flex flex-col gap-3">
                  <p className="text-sm font-semibold text-gray-900 dark:text-white">
                    Choose a Resume
                  </p>

                  <a
                    href="/resume.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-lg bg-blue-600 px-4 py-3 text-center text-sm font-semibold text-white hover:bg-blue-700"
                  >
                    AI Engineer & Full-Stack Developer Resume
                  </a>

                  <a
                    href="/full-stack-engineer-resume.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-lg border border-gray-200 px-4 py-3 text-center text-sm font-semibold text-gray-700 hover:bg-gray-100 dark:border-slate-700 dark:text-gray-200 dark:hover:bg-slate-800"
                  >
                    Full-Stack Engineer Resume
                  </a>

                  <a
                    href="/ai-ml-engineer-resume.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-lg border border-gray-200 px-4 py-3 text-center text-sm font-semibold text-gray-700 hover:bg-gray-100 dark:border-slate-700 dark:text-gray-200 dark:hover:bg-slate-800"
                  >
                    AI/ML Engineer Resume
                  </a>
                </div>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
}
