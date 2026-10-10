"use client";

import { track } from "@vercel/analytics";
import { useEffect, useId, useRef, useState } from "react";
import type { Source } from "@/lib/assistant";

type Message = {
  from: "visitor" | "assistant";
  text: string;
  sources?: string[];
  pending?: boolean;
  error?: boolean;
};

const MARKER = "SOURCES:";

const SUGGESTIONS = [
  "Show me his AI work",
  "What has he shipped to real users?",
  "Is he a fit for a Next.js role?",
];

const EXAMPLE: Message[] = [
  { from: "visitor", text: "Has he built payment systems?" },
  {
    from: "assistant",
    text: "Yes. At Ilmversity he integrated Stripe, Chase and KuickPay into a school management SaaS. His open-source SaaS starter also ships with Stripe subscriptions.",
    sources: ["ilmversity", "saas-starter"],
  },
];

/** Splits a streamed reply into the visible answer and the cited source ids. */
function split(raw: string, known: Set<string>): { text: string; ids: string[] } {
  const at = raw.indexOf(MARKER);
  const text = (at === -1 ? raw : raw.slice(0, at)).replace(/[*_#`]/g, "").trim();
  const ids =
    at === -1
      ? []
      : raw
          .slice(at + MARKER.length)
          .split(/[,\s]+/)
          .map((s) => s.trim().toLowerCase())
          .filter((s) => known.has(s));
  return { text, ids: Array.from(new Set(ids)).slice(0, 3) };
}

export function Assistant({ sources, email }: { sources: Source[]; email: string }) {
  const [messages, setMessages] = useState<Message[]>(EXAMPLE);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const [announce, setAnnounce] = useState("");
  const listRef = useRef<HTMLDivElement>(null);
  const inputId = useId();
  const byId = new Map(sources.map((s) => [s.id, s]));
  const known = new Set(byId.keys());

  useEffect(() => {
    const el = listRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [messages]);

  async function ask(question: string) {
    const q = question.trim();
    if (!q || busy) return;
    track("assistant_question");
    setBusy(true);
    setInput("");
    const history = messages
      .filter((m) => !m.error && !m.pending)
      .map((m) => ({ role: m.from === "visitor" ? "user" : "assistant", content: m.text }));
    setMessages((m) => [...m, { from: "visitor", text: q }, { from: "assistant", text: "", pending: true }]);

    const update = (patch: Partial<Message>) =>
      setMessages((m) => [...m.slice(0, -1), { ...m[m.length - 1], ...patch }]);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: [...history, { role: "user", content: q }] }),
      });
      if (!res.ok || !res.body) throw new Error(String(res.status));
      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let raw = "";
      for (;;) {
        const { done, value } = await reader.read();
        if (done) break;
        raw += decoder.decode(value, { stream: true });
        const { text } = split(raw, known);
        if (text) update({ text, pending: false });
      }
      const { text, ids } = split(raw, known);
      if (!text) throw new Error("empty");
      update({ text, sources: ids, pending: false });
      setAnnounce(text);
    } catch {
      update({ text: "", pending: false, error: true });
      setAnnounce("The assistant is unavailable right now. Email me instead.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <section aria-labelledby="ask-title" className="rounded-[20px] border border-line bg-surface p-5 sm:p-6">
      <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
        <h2 id="ask-title" className="font-display text-[22px] font-semibold">
          Ask my portfolio
        </h2>
        <p className="font-mono text-[12px] text-text-dim">Answers cite my résumé and repos</p>
      </div>

      <div ref={listRef} className="mt-5 max-h-[340px] space-y-3 overflow-y-auto pr-1">
        {messages.map((m, i) =>
          m.from === "visitor" ? (
            <div key={i} data-from="visitor" className="msg ml-auto w-fit max-w-[85%] rounded-xl bg-surface-raised px-4 py-2.5 text-[15px]">
              {m.text}
            </div>
          ) : (
            <div key={i} data-from="assistant" className="msg max-w-[92%] rounded-xl border border-line bg-bg/40 px-4 py-3 text-[15px] leading-relaxed">
              {m.pending ? (
                <span className="typing inline-flex gap-1 py-1" aria-label="Thinking">
                  <span className="h-1.5 w-1.5 rounded-full bg-text-muted" />
                  <span className="h-1.5 w-1.5 rounded-full bg-text-muted" />
                  <span className="h-1.5 w-1.5 rounded-full bg-text-muted" />
                </span>
              ) : m.error ? (
                <p>
                  The assistant is unavailable right now.{" "}
                  <a href={`mailto:${email}`} className="underline underline-offset-4" data-event="contact_click" data-label="assistant">
                    Email me instead.
                  </a>
                </p>
              ) : (
                <p>{m.text}</p>
              )}
              {m.sources?.length ? (
                <ul className="mt-3 flex flex-wrap gap-2" aria-label="Sources">
                  {m.sources.map((id, j) => {
                    const s = byId.get(id);
                    return s ? (
                      <li key={id} className="chip-in" style={{ "--i": j } as React.CSSProperties}>
                        <a href={s.href} className="tag min-h-[44px] hover:border-line-strong hover:text-text">
                          {s.label}
                        </a>
                      </li>
                    ) : null;
                  })}
                </ul>
              ) : null}
            </div>
          )
        )}
      </div>

      <p className="sr-only" aria-live="polite">
        {announce}
      </p>

      <div className="mt-4 flex flex-wrap gap-2">
        {SUGGESTIONS.map((s) => (
          <button
            key={s}
            type="button"
            disabled={busy}
            onClick={() => ask(s)}
            className="btn rounded-full border border-line-strong px-4 text-[14px] font-medium hover:border-text-dim disabled:opacity-60"
          >
            {s}
          </button>
        ))}
      </div>

      <form
        className="mt-5"
        onSubmit={(e) => {
          e.preventDefault();
          ask(input);
        }}
      >
        <label htmlFor={inputId} className="font-mono text-[12px] text-text-dim">
          Your question
        </label>
        <div className="mt-2 flex gap-2">
          <input
            id={inputId}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            maxLength={400}
            placeholder="What did he build at Ilmversity?"
            autoComplete="off"
            className="h-12 min-w-0 flex-1 rounded-lg border border-line-strong bg-bg px-4 text-[16px] placeholder:text-text-dim focus:border-text-dim"
          />
          <button type="submit" disabled={busy || !input.trim()} className="btn btn-light disabled:opacity-60">
            Ask
          </button>
        </div>
      </form>
    </section>
  );
}
