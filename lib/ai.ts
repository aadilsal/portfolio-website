import { sanitizeChatReply } from "@/lib/chatReply";
import { resolveContact } from "@/lib/contact";
import type { MergedProject, Resume } from "@/lib/types";

const REPO_DESC_MAX = 420;
const REPOS_CONTEXT_MAX_CHARS = 14_000;

function buildReposContext(projects: MergedProject[]): string {
  if (!projects.length) {
    return "GitHub: No repository list was loaded (API empty or unavailable). Do not invent repository names; say the list is not available and point to GitHub profile.";
  }

  const lines: string[] = [];
  let used = 0;

  for (const p of projects) {
    const desc = (p.description ?? "")
      .replace(/\s+/g, " ")
      .trim()
      .slice(0, REPO_DESC_MAX);
    const topics = (p.topics ?? []).slice(0, 10).join(", ");
    const cat = p.category ? ` [${p.category}]` : "";
    const line = `- **${p.displayTitle}** (slug: \`${p.name}\`)${cat}: ${desc || "(no GitHub description)"} — ${p.html_url} — lang: ${p.language ?? "n/a"} — topics: ${topics || "none"} — ★ ${p.stargazers_count} — updated ${p.updated_at.slice(0, 10)}`;
    if (used + line.length + 1 > REPOS_CONTEXT_MAX_CHARS) break;
    lines.push(line);
    used += line.length + 1;
  }

  return [
    `Public repositories for this profile (${lines.length} of ${projects.length} listed; data from GitHub at request time):`,
    ...lines,
  ].join("\n");
}

function buildResumeContext(resume: Resume): string {
  const contact = resolveContact(resume);
  const skillLines = Object.entries(resume.skills)
    .map(([k, v]) => `${k}: ${v.join(", ")}`)
    .join("\n");
  const exp = resume.experience
    .map(
      (e) =>
        `${e.role} at ${e.company} (${e.duration}): ${e.points.join("; ")}`
    )
    .join("\n");
  return [
    `Name: ${resume.name}`,
    `Role: ${resume.role}`,
    `Summary: ${resume.summary}`,
    `Skills:\n${skillLines}`,
    `Experience:\n${exp}`,
    `Education: ${resume.education.map((x) => `${x.degree}, ${x.institution} (${x.duration})`).join("; ")}`,
    `Certifications: ${resume.certifications.join(", ")}`,
    `Contact: GitHub ${contact.githubHandle}, email on request.`,
  ].join("\n\n");
}

export async function askAI(
  message: string,
  resume: Resume,
  projects: MergedProject[]
): Promise<string> {
  const key = process.env.GROQ_API_KEY;
  if (!key) {
    throw new Error("GROQ_API_KEY is not configured");
  }

  const resumeBlock = buildResumeContext(resume);
  const reposBlock = buildReposContext(projects);
  const context = `${resumeBlock}\n\n---\n\n${reposBlock}`;

  const model =
    process.env.GROQ_MODEL?.trim() || "llama-3.1-8b-instant";

  const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${key}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model,
      messages: [
        {
          role: "system",
          content: `You are a professional assistant representing ${resume.name}, ${resume.role}.

Use ONLY the two blocks below: (1) resume / profile facts, (2) GitHub repositories loaded at request time.
For career, skills, education, certifications: use the resume block.
For questions about repositories, tech stack of a repo, stars, topics, links, or what repos: use the GitHub block. Match by display name or slug. Do not invent repositories or URLs not listed.
If something is not in the blocks, say you do not have that detail and suggest GitHub or email as appropriate.

Output formatting (required):
Plain text only. Do not use markdown, asterisks, hash marks, backticks, angle brackets, or emoji for emphasis or structure.
Use short paragraphs separated by a blank line.
For lists, start each line with a hyphen and one space, like: - First item
For ordered steps or multiple roles, start each line with a number, period, and space, like: 1. First role
When describing work experience, give role title, company name, and dates on one line, then put responsibilities on separate lines each starting with hyphen and space.

---\n${context}\n---`,
        },
        { role: "user", content: message },
      ],
      temperature: 0.4,
      max_tokens: 768,
    }),
  });

  const data = (await res.json()) as {
    choices?: { message?: { content?: string } }[];
    error?: { message?: string };
  };

  if (!res.ok) {
    const msg = data.error?.message ?? "Groq request failed";
    throw new Error(msg);
  }

  const text = data.choices?.[0]?.message?.content?.trim();
  if (!text) {
    throw new Error("Empty response from model");
  }
  return sanitizeChatReply(text);
}
