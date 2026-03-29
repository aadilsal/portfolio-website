import { Container } from "@/components/Container";
import { ProjectShowcase } from "@/components/ProjectShowcase";
import type { MergedProject } from "@/lib/types";

type Props = {
  projects: MergedProject[];
  /** True when every merged repo is already covered in Case studies. */
  allReposInCaseStudies: boolean;
  githubProfileUrl: string;
};

export function Projects({
  projects,
  allReposInCaseStudies,
  githubProfileUrl,
}: Props) {
  return (
    <section id="projects" className="py-24 scroll-mt-20">
      <Container>
        <div className="mb-10 flex flex-col gap-2">
          <span className="font-mono text-xs uppercase tracking-[0.3em] text-secondary">
            Additional work
          </span>
          <h2 className="text-3xl font-semibold tracking-tight">Projects</h2>
          <p className="max-w-2xl text-muted-foreground">
            Other public repositories and experiments—short summaries mirror each
            repo&apos;s GitHub description. Flagship work with more context lives
            in Case studies above.
          </p>
        </div>
        {projects.length === 0 ? (
          <div className="rounded-lg border border-border bg-card/50 p-6 text-muted-foreground space-y-3">
            {allReposInCaseStudies ? (
              <>
                <p>
                  Public work that&apos;s highlighted in depth appears in Case
                  studies. For the full list of repositories, see my GitHub
                  profile.
                </p>
                <a
                  href={githubProfileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block font-mono text-sm text-secondary hover:underline"
                >
                  Open GitHub profile →
                </a>
              </>
            ) : (
              <>
                <p>
                  Repository previews could not be loaded right now. You can
                  still browse all public work on GitHub.
                </p>
                <a
                  href={githubProfileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block font-mono text-sm text-secondary hover:underline"
                >
                  Open GitHub profile →
                </a>
                <p className="text-xs font-mono text-muted-foreground/80 pt-2 border-t border-border">
                  Developers: confirm{" "}
                  <code className="text-secondary">GITHUB_TOKEN</code> or{" "}
                  <code className="text-secondary">
                    NEXT_PUBLIC_GITHUB_USER
                  </code>{" "}
                  if this persists locally.
                </p>
              </>
            )}
          </div>
        ) : (
          <ProjectShowcase projects={projects} />
        )}
      </Container>
    </section>
  );
}
