import { Container } from "@/components/Container";
import type { MergedProject, Resume } from "@/lib/types";

type Props = {
  resume: Resume;
  projects: MergedProject[];
  /** GitHub search index total for `committer:user`; null if unavailable */
  commitIndexTotal: number | null;
};

function formatStat(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 10_000) return `${Math.round(n / 1000)}k`;
  if (n >= 1000) return `${(n / 1000).toFixed(1)}k`;
  return n.toLocaleString();
}

export function Metrics({ resume, projects, commitIndexTotal }: Props) {
  const years = resume.metrics?.yearsExperience ?? 2;
  const totalRepos = projects.length;
  const totalStars = projects.reduce((acc, p) => acc + p.stargazers_count, 0);

  const showCommits =
    commitIndexTotal != null && commitIndexTotal > 0;
  const thirdValue = showCommits ? commitIndexTotal : totalStars;
  const thirdLabel = showCommits ? "Public commits" : "Repo stars";
  const thirdHint = showCommits
    ? "Public commits attributed to you in GitHub's search index."
    : "Total stargazers across your public repositories—a simple reach signal.";

  return (
    <section id="metrics" className="py-24 scroll-mt-20">
      <Container>
        <div className="mb-10 flex flex-col gap-2">
          <span className="font-mono text-xs uppercase tracking-[0.3em] text-secondary">
            Performance
          </span>
          <h2 className="text-3xl font-semibold tracking-tight">Metrics</h2>
          <p className="text-sm text-muted-foreground max-w-2xl">
            {resume.metrics?.projectsBuiltNote ??
              "At-a-glance signals from public GitHub activity—best read together with case studies and experience above."}
          </p>
        </div>
        <div className="grid gap-4 sm:grid-cols-3">
          <div className="panel-border p-6 text-center sm:text-left">
            <p className="font-mono text-xs text-muted-foreground">Total repos</p>
            <p className="mt-2 text-4xl font-semibold tabular-nums text-secondary">
              {totalRepos}
            </p>
          </div>
          <div className="panel-border p-6 text-center sm:text-left">
            <p className="font-mono text-xs text-muted-foreground">
              Years experience
            </p>
            <p className="mt-2 text-4xl font-semibold tabular-nums text-secondary">
              {years}+
            </p>
          </div>
          <div className="panel-border p-6 text-center sm:text-left">
            <p className="font-mono text-xs text-muted-foreground">{thirdLabel}</p>
            <p
              className="mt-2 text-4xl font-semibold tabular-nums text-accent"
              title={thirdHint}
            >
              {formatStat(thirdValue)}
            </p>
            <p className="mt-2 text-[11px] leading-snug text-muted-foreground/90 sm:max-w-[14rem]">
              {thirdHint}
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}
