/**
 * Regenerates data/case-studies.json using Groq + live GitHub repo metadata.
 * Requires GROQ_API_KEY in .env.local (or env). Optional GITHUB_TOKEN for rate limits.
 *
 *   npm run generate:case-studies
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const outPath = path.join(root, "data", "case-studies.json");

function loadEnvLocal() {
  const p = path.join(root, ".env.local");
  if (!fs.existsSync(p)) return {};
  const txt = fs.readFileSync(p, "utf8");
  const out = {};
  for (const line of txt.split("\n")) {
    const t = line.trim();
    if (!t || t.startsWith("#")) continue;
    const eq = t.indexOf("=");
    if (eq === -1) continue;
    const key = t.slice(0, eq).trim();
    let val = t.slice(eq + 1).trim();
    if (
      (val.startsWith('"') && val.endsWith('"')) ||
      (val.startsWith("'") && val.endsWith("'"))
    ) {
      val = val.slice(1, -1);
    }
    out[key] = val;
  }
  return out;
}

const env = { ...loadEnvLocal(), ...process.env };
const GITHUB_TOKEN = env.GITHUB_TOKEN;
const GROQ_API_KEY = env.GROQ_API_KEY;
const GITHUB_USER = (env.NEXT_PUBLIC_GITHUB_USER || "aadilsal").trim();
const MODEL = (env.GROQ_MODEL || "llama-3.1-8b-instant").trim();

function stripJsonFence(text) {
  let s = text.trim();
  const fence = /^```(?:json)?\s*([\s\S]*?)```$/m.exec(s);
  if (fence) s = fence[1].trim();
  return s;
}

async function fetchRepos() {
  const headers = {
    Accept: "application/vnd.github+json",
    "X-GitHub-Api-Version": "2022-11-28",
  };
  if (GITHUB_TOKEN) headers.Authorization = `Bearer ${GITHUB_TOKEN}`;
  const res = await fetch(
    `https://api.github.com/users/${GITHUB_USER}/repos?per_page=100&sort=updated`,
    { headers }
  );
  if (!res.ok) {
    throw new Error(`GitHub API ${res.status}: ${await res.text()}`);
  }
  const repos = await res.json();
  return repos
    .filter((r) => !r.fork)
    .sort((a, b) => b.stargazers_count - a.stargazers_count);
}

function reposPrompt(repos) {
  return repos
    .slice(0, 24)
    .map(
      (r) =>
        `- name: ${r.name}\n  description: ${r.description || "(none)"}\n  url: ${r.html_url}\n  language: ${r.language || "n/a"}\n  topics: ${(r.topics || []).join(", ") || "none"}\n  stars: ${r.stargazers_count}`
    )
    .join("\n");
}

async function generateWithGroq(userContent) {
  const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${GROQ_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: MODEL,
      temperature: 0.35,
      max_tokens: 4096,
      messages: [
        {
          role: "system",
          content: `You help build a senior software engineer portfolio. Reply with ONLY valid JSON (no markdown fences). Shape: {"studies":[...]}.
Each study object must have exactly these keys: repo (string), repoUrl (string), title (string), tagline (string), category (string), problem (string), role (string), approach (string), stack (array of strings), outcome (string).

Pick exactly 5 repositories that best represent full-stack, AI/ML, or production engineering. Skip trivial profile repos (e.g. github username readme), empty repos, and beginner class exercises unless unavoidable.
Ground narratives in the provided GitHub metadata only. Do not invent metrics, clients, or private deployment details. Write for both hiring managers and freelance clients.`,
        },
        {
          role: "user",
          content: `GitHub user: ${GITHUB_USER}\n\nRepositories (sorted by stars):\n\n${userContent}`,
        },
      ],
    }),
  });

  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.error?.message || `Groq ${res.status}`);
  }
  const raw = data.choices?.[0]?.message?.content?.trim();
  if (!raw) throw new Error("Empty Groq response");
  const parsed = JSON.parse(stripJsonFence(raw));
  if (!parsed.studies || !Array.isArray(parsed.studies)) {
    throw new Error("Response JSON must have a studies array");
  }
  return parsed;
}

async function main() {
  if (!GROQ_API_KEY) {
    console.error("Missing GROQ_API_KEY. Add it to .env.local or the environment.");
    process.exit(1);
  }
  console.log(`Fetching repos for ${GITHUB_USER}…`);
  const repos = await fetchRepos();
  if (!repos.length) {
    console.error("No repositories returned.");
    process.exit(1);
  }
  console.log(`Calling Groq (${MODEL})…`);
  const json = await generateWithGroq(reposPrompt(repos));
  fs.writeFileSync(outPath, JSON.stringify(json, null, 2) + "\n", "utf8");
  console.log(`Wrote ${outPath} (${json.studies.length} studies).`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
