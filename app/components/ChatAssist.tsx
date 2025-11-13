"use client";

import { useEffect, useMemo, useRef, useState } from "react";

import content from "@/content/digesto-ai";
import type { Role } from "@/content/schema";

const ANSWER_FIELD = "answer";

interface ChatMessage {
  role: Role;
  content: string;
}

interface ChatAssistProps {
  title?: string;
  subtitle?: string;
}

export default function ChatAssist({ title, subtitle }: ChatAssistProps) {
  const [history, setHistory] = useState<ChatMessage[]>([]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const apiUrl = useMemo(() => process.env.NEXT_PUBLIC_API_URL?.trim() ?? "", []);
  const isMock = !apiUrl;

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [history]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const trimmed = message.trim();

    if (!trimmed || loading) {
      return;
    }

    const newHistory: ChatMessage[] = [
      ...history,
      { role: "user", content: trimmed },
    ];

    const placeholderIndex = newHistory.length;

    setHistory([
      ...newHistory,
      { role: "assistant", content: content.chat.thinkingLabel },
    ]);
    setMessage("");
    setLoading(true);
    setError(null);

    const updateAssistantMessage = (text: string) => {
      setHistory((prev) =>
        prev.map((entry, index) =>
          index === placeholderIndex ? { ...entry, content: text } : entry,
        ),
      );
    };

    if (isMock) {
      window.setTimeout(() => {
        updateAssistantMessage(content.chat.mockResponse);
        setLoading(false);
      }, 600);
      return;
    }

    try {
      const response = await fetch(`${apiUrl}/chat`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: trimmed,
          history: newHistory,
        }),
      });

      if (!response.ok) {
        const backendBody = await response.text();
        const snippet = backendBody.slice(0, 300);
        const backendError = `Errore backend: ${snippet}`;
        updateAssistantMessage(backendError);
        setError(backendError);
        return;
      }

      const data = await response.json();
      const answer = data?.[ANSWER_FIELD];
      const resolvedAnswer =
        typeof answer === "string" && answer.trim().length > 0
          ? answer
          : content.chat.mockResponse;
      updateAssistantMessage(resolvedAnswer);
    } catch (networkError) {
      console.error("ChatAssist", networkError);
      updateAssistantMessage(content.chat.errorNetwork);
      setError(content.chat.errorNetwork);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative rounded-3xl border border-gray-800/60 bg-gray-900/70 p-6 shadow-lg shadow-black/40 backdrop-blur-xs">
      <div className="mb-6 flex items-start justify-between gap-4">
        <div>
          <h2 className="font-nacelle text-2xl font-semibold text-gray-100">
            {title ?? content.chat.title}
          </h2>
          <p className="mt-1 text-sm text-indigo-200/70">
            {subtitle ?? content.chat.subtitle}
          </p>
        </div>
        {isMock && (
          <span className="inline-flex items-center rounded-full bg-emerald-400/10 px-3 py-1 text-xs font-medium text-emerald-300">
            {content.chat.demoBadge}
          </span>
        )}
      </div>

      <div
        className="relative mb-6 flex h-[58vh] flex-col overflow-hidden rounded-2xl border border-gray-800/50 bg-gray-950/60"
        role="log"
        aria-live="polite"
      >
        <div className="flex-1 space-y-4 overflow-y-auto p-6">
          {history.length === 0 ? (
            <p className="text-sm text-indigo-200/65">
              {content.chat.emptyState}
            </p>
          ) : (
            history.map((entry, index) => (
              <div
                key={`${entry.role}-${index}`}
                className={`flex ${
                  entry.role === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm leading-relaxed shadow ${
                    entry.role === "user"
                      ? "bg-emerald-500/10 text-emerald-100"
                      : "bg-gray-800/80 text-indigo-100"
                  }`}
                >
                  {entry.content}
                </div>
              </div>
            ))
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-3">
        <div className="flex items-start gap-3">
          <label htmlFor="digesto-message" className="sr-only">
            {content.chat.inputLabel}
          </label>
          <input
            id="digesto-message"
            name="message"
            type="text"
            className="w-full flex-1 rounded-2xl border border-gray-800/60 bg-gray-950/80 px-4 py-3 text-sm text-gray-100 placeholder:text-gray-500 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            placeholder={content.chat.inputPlaceholder}
            value={message}
            onChange={(event) => setMessage(event.target.value)}
            disabled={loading}
            autoComplete="off"
          />
          <button
            type="submit"
            className="btn bg-linear-to-t from-indigo-600 to-indigo-500 px-5 text-sm text-white shadow-[inset_0px_1px_0px_0px_--theme(--color-white/.16)] hover:bg-[length:100%_150%] disabled:cursor-not-allowed disabled:opacity-60"
            disabled={loading}
          >
            {loading ? content.chat.thinkingLabel : content.chat.sendButton}
          </button>
        </div>
        {error && (
          <p className="text-xs text-rose-300" role="alert">
            {error}
          </p>
        )}
        <p className="text-xs text-indigo-200/65">
          {content.chat.disclaimer}
        </p>
        {/* TODO: valutare una modalità streaming (SSE/chunk) quando il backend la esporrà. */}
      </form>
    </div>
  );
}
