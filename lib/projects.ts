import projectsMeta from "@/data/projects-meta.json";
import { getRepos } from "@/lib/github";
import type { GitHubRepo, MergedProject, ProjectsMeta, Resume } from "@/lib/types";

const meta = projectsMeta as ProjectsMeta;

function resumeProjectsFallback(resume: Resume): MergedProject[] {
  const list = resume.projects;
  if (!list?.length) return [];
  const profile =
    resume.contact?.github ?? resume.github ?? "https://github.com";
  return list.map((p, idx) => ({
    id: -(idx + 1),
    name: p.name,
    description: p.description,
    html_url: profile,
    stargazers_count: 0,
    updated_at: new Date().toISOString(),
    fork: false,
    topics: p.features,
    language: null,
    displayTitle: p.name,
    category: p.category ?? null,
    meta: p.category ? { category: p.category } : undefined,
  }));
}

function formatRepoName(name: string): string {
  return name
    .split(/[-_]/)
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

function mergeRepo(repo: GitHubRepo): MergedProject {
  const key = repo.name.toLowerCase();
  const m = meta[key];
  const displayTitle = m?.title ?? formatRepoName(repo.name);
  return {
    ...repo,
    displayTitle,
    category: m?.category ?? null,
    meta: m,
  };
}

function sortMerged(a: MergedProject, b: MergedProject): number {
  const fa = a.meta?.featured ? 1 : 0;
  const fb = b.meta?.featured ? 1 : 0;
  if (fb !== fa) return fb - fa;
  const pa = a.meta?.priority ?? 9999;
  const pb = b.meta?.priority ?? 9999;
  if (pa !== pb) return pa - pb;
  return b.stargazers_count - a.stargazers_count;
}

export async function getMergedProjects(resume?: Resume): Promise<MergedProject[]> {
  const repos = await getRepos();
  const merged = repos.map(mergeRepo).sort(sortMerged);
  if (merged.length > 0) return merged;
  if (resume) return resumeProjectsFallback(resume);
  return [];
}

export function sortByUpdated(projects: MergedProject[]): MergedProject[] {
  return [...projects].sort(
    (a, b) =>
      new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime()
  );
}
