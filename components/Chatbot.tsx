"use client";

import { useCallback, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { MessageCircle, Send, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";

type Msg = { role: "user" | "assistant"; text: string };

export default function Chatbot() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([
    {
      role: "assistant",
      text: "Ask about experience, skills, or any public GitHub repo (loaded live).",
    },
  ]);
  const endRef = useRef<HTMLDivElement>(null);

  const scrollToEnd = useCallback(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  const send = useCallback(async () => {
    const text = input.trim();
    if (!text || loading) return;
    setInput("");
    setMessages((m) => [...m, { role: "user", text }]);
    setLoading(true);
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text }),
      });
      const data = (await res.json()) as { reply?: string; error?: string };
      const reply =
        data.reply ??
        (data.error || "Something went wrong. Try again later.");
      setMessages((m) => [...m, { role: "assistant", text: reply }]);
    } catch {
      setMessages((m) => [
        ...m,
        {
          role: "assistant",
          text: "Network error. Check your connection and try again.",
        },
      ]);
    } finally {
      setLoading(false);
      setTimeout(scrollToEnd, 50);
    }
  }, [input, loading, scrollToEnd]);

  return (
    <>
      <Button
        type="button"
        size="icon"
        className="fixed bottom-6 right-6 z-40 h-14 w-14 rounded-full shadow-glow md:bottom-8 md:right-8"
        onClick={() => setOpen((o) => !o)}
        aria-label={open ? "Close chat" : "Open chat"}
      >
        {open ? <X className="h-6 w-6" /> : <MessageCircle className="h-6 w-6" />}
      </Button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.96 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-24 right-6 z-40 flex w-[min(100vw-2rem,400px)] flex-col overflow-hidden rounded-xl border border-border bg-card shadow-glow-cyan md:bottom-28 md:right-8"
          >
            <div className="flex items-center justify-between border-b border-border px-4 py-3">
              <span className="font-mono text-xs uppercase tracking-wider text-secondary">
                Groq assistant
              </span>
              <button
                type="button"
                className="rounded p-1 text-muted-foreground hover:text-foreground"
                onClick={() => setOpen(false)}
                aria-label="Close"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <ScrollArea className="h-[280px] p-4">
              <div className="space-y-3 pr-3">
                {messages.map((m, i) => (
                  <div
                    key={`${i}-${m.role}`}
                    className={cn(
                      "rounded-lg px-3 py-2 text-sm leading-relaxed",
                      m.role === "user"
                        ? "ml-6 bg-accent/15 text-foreground"
                        : "mr-6 border border-border bg-background/60 text-muted-foreground"
                    )}
                  >
                    {m.text}
                  </div>
                ))}
                {loading && (
                  <p className="mr-6 text-xs font-mono text-muted-foreground">
                    Thinking…
                  </p>
                )}
                <div ref={endRef} />
              </div>
            </ScrollArea>
            <form
              className="flex gap-2 border-t border-border p-3"
              onSubmit={(e) => {
                e.preventDefault();
                void send();
              }}
            >
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about Aadil…"
                disabled={loading}
                className="flex-1"
              />
              <Button type="submit" size="icon" disabled={loading}>
                <Send className="h-4 w-4" />
              </Button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
