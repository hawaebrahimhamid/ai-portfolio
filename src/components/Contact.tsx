"use client";

import { useState, type FormEvent } from "react";
import { FiArrowUpRight, FiMail, FiSend } from "react-icons/fi";
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

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://127.0.0.1:8000";

export default function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [feedback, setFeedback] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setFeedback(null);
    setIsSubmitting(true);

    try {
      const response = await fetch(`${API_URL}/api/contact`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          message: message.trim(),
        }),
      });

      if (!response.ok) {
        if (response.status === 422) {
          throw new Error(
            "Please check your name, email address, and message. " +
              "Your message must contain at least 10 characters.",
          );
        }

        throw new Error(
          "We couldn't send your message right now. Please try again.",
        );
      }

      setFeedback({
        type: "success",
        text: "Thank you! Your message was sent successfully.",
      });

      setName("");
      setEmail("");
      setMessage("");
    } catch (error) {
      setFeedback({
        type: "error",
        text:
          error instanceof TypeError
            ? "Unable to reach the server. Please try again shortly."
            : error instanceof Error
              ? error.message
              : "Something went wrong. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <section
      id="contact"
      className="border-t border-gray-200 py-20 dark:border-slate-800 sm:py-24"
      aria-labelledby="contact-heading"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Top Header Section */}
        <div className="max-w-3xl">
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-blue-600 dark:text-blue-400">
            Get in touch
          </p>

          <h2
            id="contact-heading"
            className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl lg:text-5xl"
          >
            Let’s Build Intelligent, Useful Software.
          </h2>

          <p className="mt-6 text-base leading-7 text-gray-600 dark:text-slate-300 sm:text-lg">
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

        {/* Bottom Grid: Form on Left, Connect Cards on Right */}
        <div className="mt-16 grid gap-10 lg:grid-cols-2 lg:gap-16 items-start">
          {/* Left Column: Form */}
          <div className="rounded-2xl border border-gray-200 bg-gray-50 p-6 dark:border-slate-800 dark:bg-slate-900/50 sm:p-8">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
              Send me a message
            </h3>

            <p className="mt-2 text-sm leading-6 text-gray-600 dark:text-slate-400">
              Have a project, opportunity, or question? Feel free to reach out.
            </p>

            <form onSubmit={handleSubmit} className="mt-6 space-y-5">
              <div>
                <label
                  htmlFor="contact-name"
                  className="mb-2 block text-sm font-medium text-gray-800 dark:text-slate-200"
                >
                  Name
                </label>
                <input
                  id="contact-name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  minLength={2}
                  maxLength={100}
                  required
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-900 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
                  placeholder="Your name"
                />
              </div>

              <div>
                <label
                  htmlFor="contact-email"
                  className="mb-2 block text-sm font-medium text-gray-800 dark:text-slate-200"
                >
                  Email address
                </label>
                <input
                  id="contact-email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  maxLength={254}
                  required
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-900 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
                  placeholder="you@example.com"
                />
              </div>

              <div>
                <label
                  htmlFor="contact-message"
                  className="mb-2 block text-sm font-medium text-gray-800 dark:text-slate-200"
                >
                  Message
                </label>
                <textarea
                  id="contact-message"
                  name="message"
                  rows={5}
                  minLength={10}
                  maxLength={5000}
                  required
                  value={message}
                  onChange={(event) => setMessage(event.target.value)}
                  className="w-full resize-y rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-900 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
                  placeholder="How can I help?"
                />
                <p className="mt-1 text-right text-xs text-gray-500 dark:text-slate-400">
                  {message.length}/5000 characters
                </p>
              </div>

              {feedback && (
                <p
                  role="status"
                  aria-live="polite"
                  className={`text-sm leading-6 ${
                    feedback.type === "success"
                      ? "text-green-700 dark:text-green-400"
                      : "text-red-600 dark:text-red-400"
                  }`}
                >
                  {feedback.text}
                </p>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-blue-600 px-5 py-3 font-semibold text-white transition-colors hover:bg-blue-700 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-600 disabled:cursor-not-allowed disabled:opacity-60"
              >
                <FiSend aria-hidden="true" size={18} />
                {isSubmitting ? "Sending..." : "Send Message"}
              </button>
            </form>
          </div>

          {/* Right Column: Connect Links */}
          <div className="rounded-2xl border border-gray-200 bg-gray-50 p-6 dark:border-slate-800 dark:bg-slate-900/50 sm:p-8">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
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
