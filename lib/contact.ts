import type { Resume } from "@/lib/types";

export type ResolvedContact = {
  email: string;
  github: string;
  githubHandle: string;
  linkedin?: string;
};

type ResumeInput = Resume & { email?: string; github?: string };

function handleFromGithubUrl(url: string): string {
  const trimmed = url.replace(/\/+$/, "");
  const segment = trimmed.split("/").pop();
  return segment && segment !== "github.com" ? segment : "github";
}

export function resolveContact(resume: ResumeInput): ResolvedContact {
  const c = resume.contact;
  const email = c?.email ?? resume.email ?? "";
  const github = c?.github ?? resume.github ?? "";
  const githubHandle =
    c?.githubHandle ?? (github ? handleFromGithubUrl(github) : "");
  return {
    email,
    github,
    githubHandle: githubHandle || "github",
    linkedin: c?.linkedin,
  };
}
