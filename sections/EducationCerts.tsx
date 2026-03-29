import { Container } from "@/components/Container";
import type { Resume } from "@/lib/types";

export function EducationCerts({ resume }: { resume: Resume }) {
  return (
    <section id="education" className="py-24 scroll-mt-20">
      <Container>
        <div className="mb-10 flex flex-col gap-2">
          <span className="font-mono text-xs uppercase tracking-[0.3em] text-secondary">
            Credentials
          </span>
          <h2 className="text-3xl font-semibold tracking-tight">
            Education & certifications
          </h2>
          <p className="max-w-2xl text-muted-foreground">
            Academic background and formal credentials alongside hands-on
            engineering and product delivery.
          </p>
        </div>
        <div className="grid gap-10 lg:grid-cols-2">
          <div>
            <h3 className="mb-4 font-mono text-sm text-accent">Education</h3>
            <ul className="space-y-4">
              {resume.education.map((ed) => (
                <li key={ed.institution} className="panel-border p-5">
                  <p className="font-semibold">{ed.degree}</p>
                  <p className="text-muted-foreground">{ed.institution}</p>
                  <p className="mt-2 font-mono text-xs text-secondary">
                    {ed.duration}
                  </p>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="mb-4 font-mono text-sm text-accent">
              Certifications
            </h3>
            <ul className="space-y-2">
              {resume.certifications.map((c) => (
                <li
                  key={c}
                  className="flex items-center gap-3 rounded-lg border border-border bg-card/40 px-4 py-3 text-sm"
                >
                  <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-secondary" />
                  {c}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Container>
    </section>
  );
}
