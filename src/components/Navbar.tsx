
"use client";

import { useEffect, useState } from "react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { Menu } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";

import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";

export default function Navbar() {
  const [activeSection, setActiveSection] = useState("about");

  useEffect(() => {
    const sections = document.querySelectorAll("section[id]");

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleSection = entries.find(
          (entry) => entry.isIntersecting,
        );

        if (visibleSection) {
          setActiveSection(visibleSection.target.id);
        }
      },
      {
        rootMargin: "-20% 0px -60% 0px",
        threshold: 0,
      },
    );

    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  const navItems = [
    { label: "About", href: "#about" },
    { label: "Skills", href: "#skills" },
    { label: "Experience", href: "#experience" },
    { label: "Projects", href: "#projects" },
    { label: "Contact", href: "#contact" },
  ];

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-gray-200/80 bg-white/90 backdrop-blur-xl dark:border-slate-800/80 dark:bg-slate-950/90">
      <div className="mx-auto grid h-20 w-full max-w-[2400px] grid-cols-[auto_1fr_auto] items-center px-5 sm:px-6 lg:px-8 2xl:px-12">
        {/* Logo */}
        <div className="shrink-0">
          <a
            href="#"
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
                      isActive
                        ? "w-full"
                        : "w-0 group-hover:w-full"
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

            {/* Resume */}
            <a
              href="/resume.pdf"
              className="ml-1 whitespace-nowrap rounded-lg bg-gray-900 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:bg-gray-800 hover:shadow-md dark:bg-white dark:text-gray-900 dark:hover:bg-gray-200"
            >
              Resume
            </a>
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
                    const isActive =
                      activeSection === item.href.slice(1);

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

                {/* Mobile Resume */}
                
                  <a
                    href="/resume.pdf"
                    className="mt-6 rounded-lg bg-blue-600 px-4 py-3 text-center text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:bg-blue-700 hover:shadow-md"
                  >
                    View Resume
                  </a>
                
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
}

