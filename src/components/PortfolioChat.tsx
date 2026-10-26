"use client";

import { FormEvent, useState } from "react";
import { Bot, LoaderCircle, Send, User } from "lucide-react";
import ReactMarkdown from "react-markdown";

type Message = {
  role: "user" | "assistant";
  content: string;
};

type ChatResponse = {
  answer?: unknown;
  detail?: unknown;
};

const suggestedQuestions = [
  "What AI and full-stack projects has Hawa built?",
  "What technologies does Hawa use?",
  "Tell me about the CrediTrust Complaint Assistant.",
];

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000";

/**
 * Normalize common HTML entities that may arrive as literal text.
 * ReactMarkdown remains responsible for rendering Markdown safely.
 */
function cleanMarkdownContent(content: string): string {
  return content
    .replace(/&#x0*20;|&#0*32;|&nbsp;/gi, " ")
    .replace(/&#x0*a;|&#0*10;/gi, "\n")
    .replace(/&amp;/gi, "&")
    .replace(/&lt;/gi, "<")
    .replace(/&gt;/gi, ">")
    .replace(/&quot;/gi, '"')
    .replace(/&#39;|&apos;/gi, "'");
}

function normalizeMarkdown(content: string): string {
  return cleanMarkdownContent(content)
    .replace(/\\([#*_`])/g, "$1")
    .trim();
}

export default function PortfolioChat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [question, setQuestion] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  async function sendQuestion(
    event?: FormEvent<HTMLFormElement>,
    suggestedQuestion?: string,
  ) {
    event?.preventDefault();

    const text = (suggestedQuestion ?? question).trim();

    if (!text || isLoading) return;

    setMessages((previous) => [...previous, { role: "user", content: text }]);
    setQuestion("");
    setError("");
    setIsLoading(true);

    try {
      const response = await fetch(`${API_URL}/api/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: text }),
      });

      const data: ChatResponse = await response.json();

      if (!response.ok) {
        throw new Error(
          typeof data.detail === "string"
            ? data.detail
            : "The assistant couldn't answer. Please try again.",
        );
      }

      if (typeof data.answer !== "string" || !data.answer.trim()) {
        throw new Error("The assistant returned an empty answer.");
      }

      setMessages((previous) => [
        ...previous,
        { role: "assistant", content: data.answer as string },
      ]);
    } catch (caughtError) {
      setError(
        caughtError instanceof Error &&
          caughtError.message !== "Failed to fetch"
          ? caughtError.message
          : "We couldn't connect to the assistant. Check that the backend is running and try again.",
      );
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <section
      id="ai-assistant"
      aria-labelledby="ai-assistant-heading"
      className="border-t border-gray-200 py-20 dark:border-slate-800 sm:py-24"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 max-w-3xl text-left">
          <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-blue-600 dark:text-blue-400">
            Portfolio AI Assistant
          </p>

          <h2
            id="ai-assistant-heading"
            className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl"
          >
            Ask About{" "}
            <span className="text-blue-600 dark:text-blue-400">My Work.</span>
          </h2>

          <p className="mt-4 text-base leading-7 text-gray-600 dark:text-slate-300">
            Curious about my projects, technical skills, or experience? Ask a
            question and explore my portfolio with the help of AI.
          </p>
        </div>

        <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-950">
          <div className="flex items-center gap-3 border-b border-gray-200 px-5 py-4 dark:border-slate-800">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-white dark:bg-blue-500">
              <Bot size={21} aria-hidden="true" />
            </div>

            <div>
              <p className="font-medium text-gray-900 dark:text-white">
                Portfolio AI Assistant
              </p>
              <p className="text-sm text-gray-500 dark:text-slate-400">
                Ask questions about my projects and skills
              </p>
            </div>
          </div>

          <div
            className="max-h-[440px] min-h-[220px] space-y-5 overflow-y-auto p-4 sm:p-6"
            aria-live="polite"
            aria-label="Chat messages"
            role="log"
          >
            {messages.length === 0 && (
              <div className="py-5 text-center">
                <Bot
                  className="mx-auto mb-3 text-gray-400"
                  size={32}
                  aria-hidden="true"
                />

                <p className="font-medium text-gray-800 dark:text-slate-200">
                  What would you like to know?
                </p>

                <p className="mt-2 text-sm text-gray-500 dark:text-slate-400">
                  Try one of these questions to get started.
                </p>

                <div className="mx-auto mt-5 flex max-w-xl flex-wrap justify-center gap-2">
                  {suggestedQuestions.map((item) => (
                    <button
                      key={item}
                      type="button"
                      disabled={isLoading}
                      onClick={() => void sendQuestion(undefined, item)}
                      className="rounded-xl border border-gray-200 px-3 py-2 text-left text-sm text-gray-700 transition-colors hover:bg-gray-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-900"
                    >
                      {item}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {messages.map((message, index) => (
              <div
                key={`${message.role}-${index}`}
                className={`flex items-start gap-3 ${
                  message.role === "user" ? "justify-end" : "justify-start"
                }`}
              >
                {message.role === "assistant" && (
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-gray-100 text-gray-700 dark:bg-slate-800 dark:text-slate-200">
                    <Bot size={17} aria-hidden="true" />
                  </div>
                )}

                <div
                  className={`max-w-[85%] break-words rounded-2xl px-4 py-3 text-sm leading-6 ${
                    message.role === "user"
                      ? "whitespace-pre-wrap bg-blue-600 text-white dark:bg-blue-600"
                      : "bg-gray-100 text-gray-800 dark:bg-slate-900 dark:text-slate-200"
                  }`}
                >
                  {message.role === "assistant" ? (
                    <div className="min-w-0 [&_a]:break-all [&_a]:text-blue-600 [&_a]:underline dark:[&_a]:text-blue-400 [&_blockquote]:my-3 [&_blockquote]:border-l-2 [&_blockquote]:border-gray-300 [&_blockquote]:pl-3 dark:[&_blockquote]:border-slate-600 [&_code]:rounded [&_code]:bg-gray-200 [&_code]:px-1 [&_code]:py-0.5 dark:[&_code]:bg-slate-800 [&_pre]:my-3 [&_pre]:overflow-x-auto [&_pre]:rounded-lg [&_pre]:bg-gray-200 [&_pre]:p-3 dark:[&_pre]:bg-slate-800">
                      <ReactMarkdown
                        components={{
                          h1: ({ children }) => (
                            <h3 className="mb-2 text-lg font-semibold">
                              {children}
                            </h3>
                          ),
                          h2: ({ children }) => (
                            <h3 className="mb-2 text-base font-semibold">
                              {children}
                            </h3>
                          ),
                          h3: ({ children }) => (
                            <h3 className="mb-2 text-base font-semibold">
                              {children}
                            </h3>
                          ),
                          p: ({ children }) => (
                            <p className="mb-3 last:mb-0">{children}</p>
                          ),
                          ul: ({ children }) => (
                            <ul className="mb-3 list-disc space-y-1 pl-5 last:mb-0">
                              {children}
                            </ul>
                          ),
                          ol: ({ children }) => (
                            <ol className="mb-3 list-decimal space-y-1 pl-5 last:mb-0">
                              {children}
                            </ol>
                          ),
                          li: ({ children }) => <li>{children}</li>,
                          strong: ({ children }) => (
                            <strong className="font-semibold text-gray-950 dark:text-white">
                              {children}
                            </strong>
                          ),
                          a: ({ children, href }) => (
                            <a
                              href={href}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              {children}
                            </a>
                          ),
                        }}
                      >
                        {normalizeMarkdown(message.content)}
                      </ReactMarkdown>
                    </div>
                  ) : (
                    message.content
                  )}
                </div>

                {message.role === "user" && (
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-gray-100 text-gray-700 dark:bg-slate-800 dark:text-slate-200">
                    <User size={17} aria-hidden="true" />
                  </div>
                )}
              </div>
            ))}

            {isLoading && (
              <div
                className="flex items-center gap-3 text-sm text-gray-500 dark:text-slate-400"
                role="status"
              >
                <LoaderCircle
                  size={18}
                  className="animate-spin text-blue-600 dark:text-blue-400"
                  aria-hidden="true"
                />
                Searching the portfolio and preparing an answer...
              </div>
            )}

            {error && (
              <p
                role="alert"
                className="text-sm text-red-600 dark:text-red-400"
              >
                {error}
              </p>
            )}
          </div>

          <form
            onSubmit={(event) => void sendQuestion(event)}
            className="border-t border-gray-200 p-4 dark:border-slate-800 sm:p-5"
          >
            <label htmlFor="portfolio-question" className="sr-only">
              Ask a question about the portfolio
            </label>

            <div className="flex items-center gap-2 rounded-xl border border-gray-200 p-2 focus-within:ring-2 focus-within:ring-blue-500 dark:border-slate-700 dark:focus-within:ring-blue-500">
              <input
                id="portfolio-question"
                value={question}
                onChange={(event) => setQuestion(event.target.value)}
                placeholder="Ask about projects, skills, or technologies..."
                maxLength={1000}
                disabled={isLoading}
                className="min-w-0 flex-1 bg-transparent px-2 py-2 text-sm text-gray-900 outline-none placeholder:text-gray-400 focus-visible:outline-none dark:text-white dark:placeholder:text-slate-500"
              />

              <button
                type="submit"
                disabled={isLoading || question.trim().length < 3}
                aria-label="Send question"
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-600 text-white transition-opacity hover:opacity-80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-40 dark:bg-blue-600 dark:focus-visible:ring-offset-slate-950"
              >
                {isLoading ? (
                  <LoaderCircle size={18} className="animate-spin" />
                ) : (
                  <Send size={18} />
                )}
              </button>
            </div>

            <p className="mt-3 text-center text-xs text-gray-500 dark:text-slate-500">
              Answers are generated by AI using portfolio information.
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}
