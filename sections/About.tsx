import { Container } from "@/components/Container";
import type { Resume } from "@/lib/types";

export function About({ resume }: { resume: Resume }) {
  return (
    <section id="driver" className="py-24 scroll-mt-20">
      <Container>
        <div className="mb-10 flex flex-col gap-2">
          <span className="font-mono text-xs uppercase tracking-[0.3em] text-secondary">
            Driver profile
          </span>
          <h2 className="text-3xl font-semibold tracking-tight">About</h2>
          <p className="max-w-2xl text-muted-foreground">
            Who I am, what I focus on, and how I prefer to work with teams and
            clients.
          </p>
        </div>
        <div className="panel-border p-6 sm:p-8 shadow-glow">
          <div className="grid gap-6 sm:grid-cols-[1fr_2fr] sm:gap-10">
            <div className="space-y-2">
              <p className="font-mono text-xs text-muted-foreground">Name</p>
              <p className="text-xl font-medium">{resume.name}</p>
              <p className="font-mono text-xs text-muted-foreground pt-4">Role</p>
              <p className="text-secondary">{resume.role}</p>
            </div>
            <div>
              <p className="font-mono text-xs text-muted-foreground mb-2">
                Professional summary
              </p>
              <p className="text-muted-foreground leading-relaxed">
                {resume.summary}
              </p>
              {resume.availability && (
                <p className="mt-4 border-l-2 border-accent/50 pl-4 text-sm text-secondary leading-relaxed">
                  {resume.availability}
                </p>
              )}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
