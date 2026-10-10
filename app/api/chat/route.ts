import { NextResponse } from "next/server";
import { systemPrompt } from "@/lib/assistant";

export const runtime = "nodejs";

const MAX_QUESTION = 400;
const MAX_HISTORY = 4;
const LIMIT = 10; // questions per visitor per minute
const WINDOW_MS = 60_000;
const FALLBACK_MODEL = "openai/gpt-oss-20b";

// Per-instance limiter; good enough to stop a single visitor hammering the endpoint.
const hits = new Map<string, number[]>();

function limited(ip: string): boolean {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  if (hits.size > 5000) hits.clear();
  return recent.length > LIMIT;
}

type Turn = { role: "user" | "assistant"; content: string };

function parseBody(body: unknown): Turn[] | null {
  if (typeof body !== "object" || body === null) return null;
  const raw = (body as { messages?: unknown }).messages;
  if (!Array.isArray(raw)) return null;
  const turns = raw
    .filter(
      (m): m is Turn =>
        typeof m === "object" &&
        m !== null &&
        ((m as Turn).role === "user" || (m as Turn).role === "assistant") &&
        typeof (m as Turn).content === "string"
    )
    .map((m) => ({ role: m.role, content: m.content.trim().slice(0, MAX_QUESTION * 2) }))
    .filter((m) => m.content)
    .slice(-(MAX_HISTORY * 2 + 1));
  const last = turns.at(-1);
  if (!last || last.role !== "user" || last.content.length > MAX_QUESTION) return null;
  return turns;
}

export async function POST(req: Request) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "local";
  if (limited(ip)) {
    return NextResponse.json({ error: "Too many questions. Try again in a minute." }, { status: 429 });
  }

  let turns: Turn[] | null = null;
  try {
    turns = parseBody(await req.json());
  } catch {
    turns = null;
  }
  if (!turns) {
    return NextResponse.json({ error: "Ask a question of up to 400 characters." }, { status: 400 });
  }

  const key = process.env.GROQ_API_KEY;
  if (!key) {
    return NextResponse.json({ error: "Assistant is not configured." }, { status: 503 });
  }

  const messages = [{ role: "system", content: systemPrompt() }, ...turns];
  const call = (model: string) =>
    fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        model,
        messages,
        temperature: 0.2,
        // gpt-oss reasons before answering; keep that short and leave room for a 2–3 sentence reply.
        reasoning_effort: "low",
        max_tokens: 400,
        stream: true,
      }),
    }).catch(() => null);

  // The smaller model has its own rate-limit bucket, so it covers bursts on the free tier.
  let upstream = await call(process.env.GROQ_MODEL?.trim() || "openai/gpt-oss-120b");
  if (!upstream || upstream.status === 429 || upstream.status >= 500) {
    upstream = await call(FALLBACK_MODEL);
  }

  if (!upstream || !upstream.ok || !upstream.body) {
    return NextResponse.json({ error: "The assistant is unavailable right now." }, { status: 502 });
  }

  // Turn Groq's server-sent events into a plain text stream of tokens.
  const decoder = new TextDecoder();
  const encoder = new TextEncoder();
  let buffer = "";
  const stream = upstream.body.pipeThrough(
    new TransformStream<Uint8Array, Uint8Array>({
      transform(chunk, controller) {
        buffer += decoder.decode(chunk, { stream: true });
        const lines = buffer.split("\n");
        buffer = lines.pop() ?? "";
        for (const line of lines) {
          if (!line.startsWith("data:")) continue;
          const data = line.slice(5).trim();
          if (!data || data === "[DONE]") continue;
          try {
            const token = JSON.parse(data).choices?.[0]?.delta?.content;
            if (token) controller.enqueue(encoder.encode(token));
          } catch {
            // ignore keep-alive or partial lines
          }
        }
      },
    })
  );

  return new Response(stream, {
    headers: { "Content-Type": "text/plain; charset=utf-8", "Cache-Control": "no-store" },
  });
}
