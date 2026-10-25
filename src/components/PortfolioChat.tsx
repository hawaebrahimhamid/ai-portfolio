"use client";

import { FormEvent, useState } from "react";
import { Bot, LoaderCircle, Send, User, Sparkles } from "lucide-react";
import ReactMarkdown from "react-markdown";

type Message = {
  role: "user" | "assistant";
  content: string;
};

const suggestedQuestions = [
  "What AI and full-stack projects has Hawa built?",
  "What technologies does Hawa use?",
  "Tell me about the CrediTrust Complaint Assistant.",
];

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000";

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

      const data = await response.json();

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
        { role: "assistant", content: data.answer },
      ]);
    } catch {
      setError(
        "We couldn't connect to the assistant. Please check that the backend is running and try again.",
      );
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <section
      id="ai-assistant"
      className="border-t border-gray-200 py-20 dark:border-slate-800 sm:py-24"
    >
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-10 max-w-2xl text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-gray-200 px-4 py-2 text-sm text-gray-600 dark:border-slate-700 dark:text-slate-300">
            <Sparkles size={16} />
            AI-powered portfolio assistant
          </div>

          <h2 className="text-3xl font-semibold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
            Ask About My Work
          </h2>

          <p className="mt-4 leading-7 text-gray-600 dark:text-slate-300">
            Curious about my projects, technical skills, or experience? Ask a
            question and explore my portfolio with the help of AI.
          </p>
        </div>

        <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-950">
          <div className="flex items-center gap-3 border-b border-gray-200 px-5 py-4 dark:border-slate-800">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gray-900 text-white dark:bg-white dark:text-gray-900">
              <Bot size={21} />
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
          >
            {messages.length === 0 && (
              <div className="py-5 text-center">
                <Bot className="mx-auto mb-3 text-gray-400" size={32} />
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
                      className="rounded-xl border border-gray-200 px-3 py-2 text-left text-sm text-gray-700 transition-colors hover:bg-gray-50 disabled:opacity-50 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-900"
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
                    <Bot size={17} />
                  </div>
                )}

                <div
                  className={`max-w-[85%] whitespace-pre-wrap break-words rounded-2xl px-4 py-3 text-sm leading-6 ${
                    message.role === "user"
                      ? "bg-gray-900 text-white dark:bg-white dark:text-gray-900"
                      : "bg-gray-100 text-gray-800 dark:bg-slate-900 dark:text-slate-200"
                  }`}
                >
                  {message.role === "assistant" ? (
                    <ReactMarkdown
                      components={{
                        h1: ({ children }) => (
                          <h1 className="mb-2 text-lg font-semibold">
                            {children}
                          </h1>
                        ),
                        h2: ({ children }) => (
                          <h2 className="mb-2 text-base font-semibold">
                            {children}
                          </h2>
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
                          <ul className="mb-3 list-disc space-y-1 pl-5">
                            {children}
                          </ul>
                        ),
                        ol: ({ children }) => (
                          <ol className="mb-3 list-decimal space-y-1 pl-5">
                            {children}
                          </ol>
                        ),
                        li: ({ children }) => <li>{children}</li>,
                        strong: ({ children }) => (
                          <strong className="font-semibold">{children}</strong>
                        ),
                      }}
                    >
                      {message.content.replace(/\\([#*_`])/g, "$1")}
                    </ReactMarkdown>
                  ) : (
                    message.content
                  )}
                </div>

                {message.role === "user" && (
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-gray-100 text-gray-700 dark:bg-slate-800 dark:text-slate-200">
                    <User size={17} />
                  </div>
                )}
              </div>
            ))}

            {isLoading && (
              <div className="flex items-center gap-3 text-sm text-gray-500 dark:text-slate-400">
                <LoaderCircle size={18} className="animate-spin" />
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

            <div className="flex items-center gap-2 rounded-xl border border-gray-200 p-2 focus-within:ring-2 focus-within:ring-gray-400 dark:border-slate-700 dark:focus-within:ring-slate-500">
              <input
                id="portfolio-question"
                value={question}
                onChange={(event) => setQuestion(event.target.value)}
                placeholder="Ask about projects, skills, or technologies..."
                maxLength={1000}
                disabled={isLoading}
                className="min-w-0 flex-1 bg-transparent px-2 py-2 text-sm text-gray-900 outline-none placeholder:text-gray-400 dark:text-white dark:placeholder:text-slate-500"
              />

              <button
                type="submit"
                disabled={isLoading || question.trim().length < 3}
                aria-label="Send question"
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-gray-900 text-white transition-opacity hover:opacity-80 disabled:cursor-not-allowed disabled:opacity-40 dark:bg-white dark:text-gray-900"
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
