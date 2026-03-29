import { Container } from "@/components/Container";
import type { Resume } from "@/lib/types";

const LABELS: Record<keyof Resume["skills"], string> = {
  frontend: "Frontend",
  backend: "Backend",
  ai: "AI / ML",
  cloud: "Cloud / Ops",
};

export function Architecture({ resume }: { resume: Resume }) {
  const layers = Object.entries(resume.skills) as [
    keyof Resume["skills"],
    string[],
  ][];

  return (
    <section id="architecture" className="py-24 scroll-mt-20">
      <Container>
        <div className="mb-10 flex flex-col gap-2">
          <span className="font-mono text-xs uppercase tracking-[0.3em] text-secondary">
            Stack layers
          </span>
          <h2 className="text-3xl font-semibold tracking-tight">
            System architecture
          </h2>
          <p className="max-w-2xl text-muted-foreground">
            Capability map — hover a layer to highlight the stack.
          </p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          {layers.map(([key, items]) => (
            <div
              key={key}
              className="group panel-border p-6 transition-transform duration-200 hover:-translate-y-0.5 hover:border-secondary/40 hover:shadow-glow-cyan"
            >
              <h3 className="font-mono text-sm text-accent mb-4">
                {LABELS[key]}
              </h3>
              <ul className="flex flex-wrap gap-2">
                {items.map((skill) => (
                  <li
                    key={skill}
                    className="rounded border border-border bg-background/50 px-3 py-1 text-sm text-foreground/90 transition-colors group-hover:border-secondary/30"
                  >
                    {skill}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
