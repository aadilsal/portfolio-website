import type { Resume } from "@/lib/types";

function spotlightSkills(resume: Resume): string[] {
  const raw = [
    ...resume.skills.frontend.slice(0, 2),
    ...resume.skills.backend.slice(0, 2),
    ...resume.skills.ai.slice(0, 2),
    ...resume.skills.cloud.slice(0, 1),
  ];
  return Array.from(new Set(raw)).slice(0, 6);
}

const barHeights = [42, 68, 52, 78, 48];

export function HeroSpotlight({ resume }: { resume: Resume }) {
  const chips = spotlightSkills(resume);

  return (
    <div className="relative w-full max-w-[340px] lg:ml-auto lg:mr-0">
      <div className="panel-border relative overflow-hidden p-7 sm:p-8">
        <div
          className="pointer-events-none absolute -right-24 -top-24 h-48 w-48 rounded-full bg-accent/[0.12] blur-3xl"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute -bottom-20 -left-16 h-44 w-44 rounded-full bg-secondary/[0.08] blur-3xl"
          aria-hidden
        />

        <p className="font-mono text-[10px] uppercase tracking-[0.35em] text-secondary">
          At a glance
        </p>
        <h3 className="mt-3 text-lg font-semibold tracking-tight text-foreground sm:text-xl">
          {resume.role}
        </h3>
        {resume.location ? (
          <p className="mt-1.5 text-sm text-muted-foreground">{resume.location}</p>
        ) : null}

        <div className="mt-6 border-t border-border pt-6">
          <p className="mb-3 font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
            Core stack
          </p>
          <div className="flex flex-wrap gap-2">
            {chips.map((skill) => (
              <span
                key={skill}
                className="rounded-md border border-border/90 bg-background/50 px-2.5 py-1 text-xs text-foreground/90"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>

        <div
          className="mt-8 flex h-14 items-end justify-center gap-2.5 border-t border-border pt-7"
          aria-hidden
        >
          {barHeights.map((pct, i) => (
            <div
              key={i}
              className="w-2 rounded-t-sm bg-gradient-to-t from-secondary/25 via-secondary/45 to-accent/55 opacity-90"
              style={{ height: `${pct}%` }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
