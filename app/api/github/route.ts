import { NextResponse } from "next/server";
import { getMergedProjects } from "@/lib/projects";

export const dynamic = "force-dynamic";

export async function GET() {
  const noStore = {
    "Cache-Control": "private, no-store, max-age=0, must-revalidate",
  } as const;
  try {
    const repos = await getMergedProjects();
    return NextResponse.json({ repos }, { headers: noStore });
  } catch {
    return NextResponse.json({ repos: [] }, { status: 200, headers: noStore });
  }
}
