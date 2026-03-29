import type { GitHubRepo } from "@/lib/types";

const GITHUB_USER =
  process.env.NEXT_PUBLIC_GITHUB_USER?.trim() || "aadilsal";

export async function getRepos(): Promise<GitHubRepo[]> {
  const headers: HeadersInit = {
    Accept: "application/vnd.github+json",
    "X-GitHub-Api-Version": "2022-11-28",
  };
  if (process.env.GITHUB_TOKEN) {
    (headers as Record<string, string>).Authorization =
      `Bearer ${process.env.GITHUB_TOKEN}`;
  }

  const res = await fetch(
    `https://api.github.com/users/${GITHUB_USER}/repos?per_page=100&sort=updated`,
    {
      headers,
      next: { revalidate: 86400 },
    }
  );

  if (!res.ok) {
    return [];
  }

  const repos = (await res.json()) as GitHubRepo[];

  return repos
    .filter((repo) => !repo.fork)
    .sort((a, b) => b.stargazers_count - a.stargazers_count);
}

export { GITHUB_USER };
