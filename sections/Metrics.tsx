import { Container } from "@/components/Container";
import type { MergedProject, Resume } from "@/lib/types";

type Props = {
  resume: Resume;
  projects: MergedProject[];
};

export function Metrics({ resume, projects }: Props) {
  const years = resume.metrics?.yearsExperience ?? 2;
  const totalRepos = projects.length;
  const featured = projects.filter((p) => p.meta?.featured).length;

  return (
    <section id="metrics" className="py-24 scroll-mt-20">
      <Container>
        <div className="mb-10 flex flex-col gap-2">
          <span className="font-mono text-xs uppercase tracking-[0.3em] text-secondary">
            Performance
          </span>
          <h2 className="text-3xl font-semibold tracking-tight">Metrics</h2>
          <p className="text-sm text-muted-foreground">
            {resume.metrics?.projectsBuiltNote ??
              "Approximate indicators from public GitHub data."}
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
            <p className="font-mono text-xs text-muted-foreground">Featured</p>
            <p className="mt-2 text-4xl font-semibold tabular-nums text-accent">
              {featured}
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}
