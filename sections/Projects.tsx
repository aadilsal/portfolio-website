import { Container } from "@/components/Container";
import { ProjectShowcase } from "@/components/ProjectShowcase";
import type { MergedProject } from "@/lib/types";

export function Projects({ projects }: { projects: MergedProject[] }) {
  return (
    <section id="projects" className="py-24 scroll-mt-20">
      <Container>
        <div className="mb-10 flex flex-col gap-2">
          <span className="font-mono text-xs uppercase tracking-[0.3em] text-secondary">
            Build log
          </span>
          <h2 className="text-3xl font-semibold tracking-tight">Projects</h2>
          <p className="max-w-2xl text-muted-foreground">
            Descriptions use each repo’s GitHub summary (About), merged with
            local metadata. Repo data is loaded from GitHub when you open this
            page.
          </p>
        </div>
        {projects.length === 0 ? (
          <p className="rounded-lg border border-border bg-card/50 p-6 text-muted-foreground">
            No public repositories loaded. Set{" "}
            <code className="font-mono text-secondary">GITHUB_TOKEN</code> or
            check{" "}
            <code className="font-mono text-secondary">
              NEXT_PUBLIC_GITHUB_USER
            </code>
            .
          </p>
        ) : (
          <ProjectShowcase projects={projects} />
        )}
      </Container>
    </section>
  );
}
