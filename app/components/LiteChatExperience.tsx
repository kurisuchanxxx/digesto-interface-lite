"use client";

import { useEffect, useMemo, useRef, useState } from "react";

import content from "@/content/digesto-ai";
import type { Role } from "@/content/schema";

const ANSWER_FIELD = "answer";

interface ChatMessage {
  role: Role;
  content: string;
}

interface ConversationSummary {
  id: string;
  title: string;
  timestamp: string;
  messageCount: number;
}

interface SubmitOptions {
  titleOverride?: string;
}

const createId = () => {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }

  return Math.random().toString(36).slice(2);
};

export default function LiteChatExperience() {
  const { chat, lite } = content;

  const [history, setHistory] = useState<ChatMessage[]>([]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [conversationTitle, setConversationTitle] = useState<string | null>(
    null,
  );
  const [conversations, setConversations] = useState<ConversationSummary[]>([]);

  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const apiUrl = useMemo(() => process.env.NEXT_PUBLIC_API_URL?.trim() ?? "", []);
  const isMock = !apiUrl;

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [history]);

  const formatTimestamp = useMemo(
    () =>
      new Intl.DateTimeFormat("it-IT", {
        dateStyle: "short",
        timeStyle: "short",
      }),
    [],
  );

  const archiveConversation = () => {
    if (history.length === 0) {
      return;
    }

    const titleFallback =
      conversationTitle ??
      history.find((msg) => msg.role === "user")?.content ??
      `Conversazione ${conversations.length + 1}`;

    setConversations((prev) => [
      {
        id: createId(),
        title: titleFallback.slice(0, 80),
        timestamp: new Date().toISOString(),
        messageCount: history.length,
      },
      ...prev,
    ]);
  };

  const handleNewConversation = () => {
    archiveConversation();
    setHistory([]);
    setConversationTitle(null);
    setMessage("");
    setError(null);
  };

  const updateAssistantMessage = (index: number, text: string) => {
    setHistory((prev) =>
      prev.map((entry, idx) => (idx === index ? { ...entry, content: text } : entry)),
    );
  };

  const submitMessage = async (raw: string, options?: SubmitOptions) => {
    const trimmed = raw.trim();

    if (!trimmed || loading) {
      return;
    }

    if (history.length === 0) {
      setConversationTitle(options?.titleOverride ?? trimmed);
    }

    const newHistory: ChatMessage[] = [...history, { role: "user", content: trimmed }];
    const placeholderIndex = newHistory.length;

    setHistory([
      ...newHistory,
      { role: "assistant", content: chat.thinkingLabel },
    ]);
    setMessage("");
    setLoading(true);
    setError(null);

    if (isMock) {
      window.setTimeout(() => {
        updateAssistantMessage(placeholderIndex, chat.mockResponse);
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
        updateAssistantMessage(placeholderIndex, backendError);
        setError(backendError);
        return;
      }

      const data = await response.json();
      const answer = data?.[ANSWER_FIELD];
      const resolvedAnswer =
        typeof answer === "string" && answer.trim().length > 0
          ? answer
          : chat.mockResponse;
      updateAssistantMessage(placeholderIndex, resolvedAnswer);
    } catch (networkError) {
      console.error("LiteChatExperience", networkError);
      setError(chat.errorNetwork);
      updateAssistantMessage(placeholderIndex, chat.errorNetwork);
    } finally {
      setLoading(false);
    }
  };

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    submitMessage(message);
  };

  const handleQuickPrompt = (prompt: string, title: string) => {
    submitMessage(prompt, { titleOverride: title });
  };

  const historyIsEmpty = conversations.length === 0;

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-b from-[#030511] via-[#050f2c] to-[#010208] text-white">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(69,85,255,0.35),_transparent_60%)]" />
      <div className="relative mx-auto flex max-w-6xl flex-col gap-12 px-4 py-16">
        <header className="space-y-6 text-center">
          <span className="inline-flex items-center justify-center rounded-full bg-white/10 px-5 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-indigo-200">
            {lite.badgeLabel}
          </span>
          <div className="space-y-4">
            <h1 className="font-nacelle text-4xl font-semibold tracking-tight text-white md:text-5xl">
              {lite.heroTitle}
            </h1>
            <p className="mx-auto max-w-2xl text-lg text-indigo-100/80">
              {lite.heroSubtitle}
            </p>
          </div>
          <form
            onSubmit={handleFormSubmit}
            className="mx-auto w-full max-w-3xl"
          >
            <label htmlFor="lite-hero-input" className="sr-only">
              {lite.promptPlaceholder}
            </label>
            <div className="flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-5 py-2">
              <input
                id="lite-hero-input"
                type="text"
                value={message}
                onChange={(event) => setMessage(event.target.value)}
                placeholder={lite.promptPlaceholder}
                className="w-full bg-transparent text-base text-white placeholder:text-white/50 focus:outline-none"
                disabled={loading}
                autoComplete="off"
              />
              <button
                type="submit"
                className="rounded-full bg-white/20 px-4 py-2 text-sm font-medium text-white transition hover:bg-white/30 disabled:opacity-50"
                disabled={loading}
              >
                {loading ? chat.thinkingLabel : chat.sendButton}
              </button>
            </div>
          </form>
        </header>

        <section className="grid gap-4 text-sm sm:grid-cols-2 md:grid-cols-4">
          {lite.quickPrompts.map((prompt) => (
            <button
              key={prompt.label}
              type="button"
              onClick={() => handleQuickPrompt(prompt.prompt, prompt.label)}
              className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-left text-indigo-100 transition hover:border-indigo-400/40 hover:bg-white/10"
              disabled={loading}
            >
              <div className="text-xs uppercase tracking-wide text-indigo-200/80">
                {prompt.label}
              </div>
              <p className="mt-1 text-base text-white/90">{prompt.prompt}</p>
            </button>
          ))}
        </section>

        <section className="grid gap-6 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
          <div className="flex h-full flex-col rounded-[32px] border border-white/10 bg-white/5/20 bg-gradient-to-b from-white/5 to-white/0 p-6">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <p className="text-sm uppercase tracking-[0.3em] text-indigo-200/70">
                  DigestoAI
                </p>
                <h2 className="text-2xl font-semibold text-white">Chat in tempo reale</h2>
              </div>
              {isMock && (
                <span className="rounded-full bg-amber-400/20 px-3 py-1 text-xs font-semibold text-amber-200">
                  {lite.badgeLabel}
                </span>
              )}
            </div>

            <div
              className="flex-1 space-y-4 overflow-y-auto rounded-3xl bg-black/20 p-6 shadow-inner"
              role="log"
              aria-live="polite"
            >
              {history.length === 0 ? (
                <p className="text-base text-indigo-100/70">
                  {chat.emptyState}
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
                      className={`max-w-[80%] rounded-3xl px-4 py-3 text-base leading-relaxed shadow-lg ${
                        entry.role === "user"
                          ? "bg-gradient-to-r from-[#6c5ce7] to-[#a29bfe] text-white"
                          : "bg-white/10 text-indigo-100"
                      }`}
                    >
                      {entry.content}
                    </div>
                  </div>
                ))
              )}
              <div ref={messagesEndRef} />
            </div>

            <form onSubmit={handleFormSubmit} className="mt-4 space-y-3">
              <label htmlFor="lite-message" className="sr-only">
                {chat.inputLabel}
              </label>
              <div className="flex items-center gap-3 rounded-full border border-white/10 bg-black/40 px-5 py-2">
                <input
                  id="lite-message"
                  type="text"
                  className="w-full bg-transparent text-base text-white placeholder:text-white/50 focus:outline-none"
                  placeholder={chat.inputPlaceholder}
                  value={message}
                  onChange={(event) => setMessage(event.target.value)}
                  disabled={loading}
                  autoComplete="off"
                />
                <button
                  type="submit"
                  className="rounded-full bg-indigo-500/80 px-5 py-2 text-sm font-semibold text-white transition hover:bg-indigo-400/80 disabled:opacity-50"
                  disabled={loading}
                >
                  {loading ? chat.thinkingLabel : chat.sendButton}
                </button>
              </div>
              {error && (
                <p className="text-xs text-rose-300" role="alert">
                  {error}
                </p>
              )}
              <p className="text-xs text-indigo-100/70">{chat.disclaimer}</p>
            </form>
          </div>

          <aside className="rounded-[32px] border border-white/10 bg-white/5 p-6 backdrop-blur">
            <div className="mb-4 flex items-center justify-between gap-3">
              <div>
                <p className="text-xs uppercase tracking-[0.4em] text-indigo-200/70">
                  {lite.historyTitle}
                </p>
                <h3 className="text-xl font-semibold text-white">
                  {conversations.length} conversazioni
                </h3>
              </div>
              <button
                type="button"
                onClick={handleNewConversation}
                className="rounded-full bg-white/10 px-4 py-2 text-sm font-medium text-white transition hover:bg-white/20"
              >
                + {lite.newConversationLabel}
              </button>
            </div>
            <div className="space-y-3 overflow-y-auto">
              {historyIsEmpty && conversations.length === 0 ? (
                <p className="text-sm text-indigo-100/70">{lite.historyEmpty}</p>
              ) : (
                conversations.map((conversation) => (
                  <div
                    key={conversation.id}
                    className="rounded-2xl border border-white/5 bg-black/30 p-4"
                  >
                    <p className="text-base font-semibold text-white">
                      {conversation.title}
                    </p>
                    <p className="text-xs text-indigo-200/70">
                      {formatTimestamp.format(new Date(conversation.timestamp))} ·{" "}
                      {conversation.messageCount} messaggi
                    </p>
                  </div>
                ))
              )}
            </div>
          </aside>
        </section>
      </div>
    </div>
  );
}
