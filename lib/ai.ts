import caseStudiesData from "@/data/case-studies.json";
import { sanitizeChatReply } from "@/lib/chatReply";
import { resolveContact } from "@/lib/contact";
import type { CaseStudy, MergedProject, Resume } from "@/lib/types";

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

function buildCaseStudiesContext(): string {
  const studies = caseStudiesData.studies as CaseStudy[];
  if (!studies.length) {
    return "Case studies: none in data/case-studies.json.";
  }
  const blocks = studies.map(
    (s) =>
      `### ${s.title} (repo: ${s.repo}, ${s.repoUrl})\n` +
      `Category: ${s.category}. ${s.tagline}\n` +
      `Problem: ${s.problem}\n` +
      `Role: ${s.role}\n` +
      `Approach: ${s.approach}\n` +
      `Stack: ${s.stack.join(", ")}\n` +
      `Outcome: ${s.outcome}`
  );
  return `Published case studies (narrative on the portfolio site; use for depth questions):\n\n${blocks.join("\n\n")}`;
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
  const availability = resume.availability
    ? `Availability note: ${resume.availability}`
    : "";
  const wa =
    contact.whatsappHref != null
      ? " WhatsApp contact link is on the portfolio contact section."
      : "";
  return [
    `Name: ${resume.name}`,
    `Role: ${resume.role}`,
    `Summary: ${resume.summary}`,
    availability,
    `Skills:\n${skillLines}`,
    `Experience:\n${exp}`,
    `Education: ${resume.education.map((x) => `${x.degree}, ${x.institution} (${x.duration})`).join("; ")}`,
    `Certifications: ${resume.certifications.join(", ")}`,
    `Contact: email ${contact.email}, GitHub ${contact.githubHandle}.${wa}`,
  ]
    .filter(Boolean)
    .join("\n\n");
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
  const caseStudiesBlock = buildCaseStudiesContext();
  const context = `${resumeBlock}\n\n---\n\n${caseStudiesBlock}\n\n---\n\n${reposBlock}`;

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

Use ONLY the blocks below: (1) resume / profile facts, (2) case study narratives from the portfolio site, (3) GitHub repositories loaded at request time.
For career, skills, education, certifications, availability: use the resume block.
For flagship project depth, problem/solution framing, or "how would you describe project X": use the case studies block when the project matches; otherwise use the GitHub block.
For questions about repositories, tech stack of a repo, stars, topics, links, or what repos: use the GitHub block. Match by display name or slug. Do not invent repositories or URLs not listed.
If something is not in the blocks, say you do not have that detail and suggest GitHub, WhatsApp, or email as appropriate for contact.

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
