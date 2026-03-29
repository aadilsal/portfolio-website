import { NextResponse } from "next/server";
import { getMergedProjects } from "@/lib/projects";

export const revalidate = 86400;

export async function GET() {
  try {
    const repos = await getMergedProjects();
    return NextResponse.json({ repos });
  } catch {
    return NextResponse.json({ repos: [] }, { status: 200 });
  }
}
