import { Container } from "@/components/Container";
import { formatRelativeTime } from "@/lib/format";
import type { MergedProject } from "@/lib/types";
import { Star } from "lucide-react";

export function GitHubFeed({ projects }: { projects: MergedProject[] }) {
  return (
    <section id="github-feed" className="py-24 scroll-mt-20">
      <Container>
        <div className="mb-10 flex flex-col gap-2">
          <span className="font-mono text-xs uppercase tracking-[0.3em] text-secondary">
            Live telemetry
          </span>
          <h2 className="text-3xl font-semibold tracking-tight">
            GitHub activity
          </h2>
          <p className="text-muted-foreground">
            Recently updated repositories with at least one star.
          </p>
        </div>
        {projects.length === 0 ? (
          <p className="text-muted-foreground">
            No starred public repositories in the feed window yet.
          </p>
        ) : (
          <ul className="stagger-fade space-y-3">
            {projects.map((p) => (
              <li key={p.id}>
                <a
                  href={p.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="panel-border flex flex-wrap items-center justify-between gap-3 p-4 transition-colors hover:border-secondary/35"
                >
                  <div>
                    <p className="font-medium">{p.displayTitle}</p>
                    <p className="font-mono text-xs text-muted-foreground">
                      Updated {formatRelativeTime(p.updated_at)}
                    </p>
                  </div>
                  <span className="flex items-center gap-1 font-mono text-sm text-muted-foreground">
                    <Star className="h-4 w-4 text-secondary" />
                    {p.stargazers_count}
                  </span>
                </a>
              </li>
            ))}
          </ul>
        )}
      </Container>
    </section>
  );
}
