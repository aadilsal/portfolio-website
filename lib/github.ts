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
      cache: "no-store",
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

/**
 * Commits attributed to this user in GitHub's public search index (one API call).
 * Returns null if the request fails or is unavailable—callers can fall back to other stats.
 */
export async function getSearchCommitTotal(): Promise<number | null> {
  const headers: HeadersInit = {
    Accept: "application/vnd.github+json",
    "X-GitHub-Api-Version": "2022-11-28",
  };
  if (process.env.GITHUB_TOKEN) {
    (headers as Record<string, string>).Authorization =
      `Bearer ${process.env.GITHUB_TOKEN}`;
  }

  const q = encodeURIComponent(`committer:${GITHUB_USER}`);
  const res = await fetch(
    `https://api.github.com/search/commits?q=${q}&per_page=1`,
    { headers, cache: "no-store" }
  );

  if (!res.ok) {
    return null;
  }

  const data = (await res.json()) as { total_count?: unknown };
  const n = data.total_count;
  return typeof n === "number" && Number.isFinite(n) ? n : null;
}

export { GITHUB_USER };
