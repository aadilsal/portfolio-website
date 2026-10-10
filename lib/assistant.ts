import { projects } from "@/data/projects";
import { skillGroups, skills } from "@/data/skills";
import { resume } from "@/lib/site";

export type Source = { id: string; label: string; href: string };

/** Every place an answer can cite. Ids are what the model returns; the UI renders label + href. */
export const sources: Source[] = [
  ...resume.experience.map((e) => ({
    id: e.id,
    label: `Experience: ${e.company.split(" ")[0]}`,
    href: "#experience",
  })),
  ...projects.map((p) => ({
    id: p.slug,
    label: `Project: ${p.title}`,
    href: p.featured ? `/work/${p.slug}` : `#project-${p.slug}`,
  })),
  { id: "skills", label: "Skills", href: "#skills" },
  { id: "about", label: "About", href: "#about" },
  { id: "contact", label: "Contact", href: "#contact" },
];

function projectBlock(): string {
  return projects
    .map((p) => {
      const lines = [
        `[${p.slug}] ${p.title} (${p.kind}, ${p.status}). ${p.summary}`,
        p.outcomes.length ? `Outcomes: ${p.outcomes.join(" ")}` : "",
        `Stack: ${p.stack.join(", ")}.`,
        p.links.live ? `Live: ${p.links.live}` : "",
      ];
      const cs = p.caseStudy;
      if (cs) {
        lines.push(
          `Role: ${cs.role}. Timeline: ${cs.timeline}.`,
          `Key decisions: ${cs.decisions.map((d) => d.title).join("; ")}.`
        );
      }
      return lines.filter(Boolean).join("\n");
    })
    .join("\n\n");
}

function resumeBlock(): string {
  const exp = resume.experience
    .map((e) => `[${e.id}] ${e.role}, ${e.company}, ${e.dates}, ${e.place}. ${e.summary ?? ""} ${e.points.join(" ")}`)
    .join("\n");
  const skillLines = skillGroups
    .map(
      (g) =>
        `${g.label}: ${skills
          .filter((s) => s.group === g.id)
          .map((s) => `${s.name} (${s.tier}; proof: ${s.proof})`)
          .join("; ")}`
    )
    .join("\n");
  return [
    `Name: ${resume.name}. Title: ${resume.role}. Based in ${resume.location}. ${resume.status}.`,
    `About: ${resume.about.join(" ")}`,
    `Experience:\n${exp}`,
    `Education: ${resume.education.degree}, ${resume.education.institution}, ${resume.education.dates}.`,
    `Certificates: ${resume.certifications.join("; ")}.`,
    `Skills [skills]:\n${skillLines}`,
    `Contact [contact]: email ${resume.contact.email}, LinkedIn ${resume.contact.linkedin}, GitHub ${resume.contact.github}, WhatsApp on the site.`,
  ].join("\n\n");
}

export function systemPrompt(): string {
  return `You are the assistant on ${resume.name}'s portfolio. Visitors are usually recruiters, hiring managers and clients. Always give a helpful answer; never refuse.

Rules:
- Questions about him (work, projects, skills, experience, education, availability, whether he fits a role or stack, salary or hiring logistics): answer from the data below. For "is he a fit for X" questions, match X against his actual projects, experience and skill tiers and say plainly where he fits and where his evidence is thinner.
- Facts about him must come from the data. Never invent employers, projects, numbers, links, hosting or users. If a specific detail isn't in the data, give what the data does say and suggest emailing him at ${resume.contact.email} for the rest.
- Any other question (general knowledge, tech, advice, small talk): answer it briefly and correctly, then, where it fits naturally, connect it to his work in one clause.
- Refer to him in the third person ("he"). Two to four short sentences of plain text. No markdown, no lists, no emoji. Do not call him senior.
- After the answer, write one final line exactly in this form: SOURCES: id, id
  Use one to three ids from this list that support the answer: ${sources.map((s) => s.id).join(", ")}.
  If nothing in the list supports it, use: SOURCES: contact

DATA
${resumeBlock()}

PROJECTS
${projectBlock()}`;
}

export const SOURCES_MARKER = "SOURCES:";
