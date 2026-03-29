import { NextResponse } from "next/server";
import resumeData from "@/data/resume.json";
import { askAI } from "@/lib/ai";
import { getMergedProjects } from "@/lib/projects";
import type { Resume } from "@/lib/types";

const resume = resumeData as Resume;

export async function POST(req: Request) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const message =
    typeof body === "object" &&
    body !== null &&
    "message" in body &&
    typeof (body as { message: unknown }).message === "string"
      ? (body as { message: string }).message.trim()
      : "";

  if (!message) {
    return NextResponse.json({ error: "Message is required" }, { status: 400 });
  }

  try {
    const projects = await getMergedProjects(resume);
    const reply = await askAI(message, resume, projects);
    return NextResponse.json({ reply });
  } catch (err) {
    const msg = err instanceof Error ? err.message : "";
    if (msg.includes("GROQ_API_KEY")) {
      return NextResponse.json(
        { error: "Assistant is not configured. Add GROQ_API_KEY to .env.local." },
        { status: 503 }
      );
    }
    const dev = process.env.NODE_ENV === "development";
    return NextResponse.json(
      {
        error: "Could not get a response. Try again later.",
        ...(dev && msg ? { detail: msg } : {}),
      },
      { status: 502 }
    );
  }
}
