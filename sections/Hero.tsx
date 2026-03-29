import { Container } from "@/components/Container";
import { HeroF1Graphic } from "@/components/HeroF1Graphic";
import { HeroTyping } from "@/components/HeroTyping";
import { Button } from "@/components/ui/button";
import type { Resume } from "@/lib/types";

const TYPING_LINE = "AI Systems · Full-Stack · MLOps · Race-ready delivery";

export function Hero({ resume }: { resume: Resume }) {
  return (
    <section
      id="hero"
      className="relative min-h-[85vh] flex flex-col justify-center py-24 overflow-hidden"
    >
      <div className="pointer-events-none absolute inset-0 grid-overlay opacity-60" />
      <Container>
        <div className="relative grid items-center gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(220px,380px)] lg:gap-10">
          <div className="relative max-w-3xl space-y-6">
            <p className="font-mono text-xs uppercase tracking-[0.35em] text-muted-foreground">
              Race control / Entry
            </p>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-semibold tracking-tight text-balance">
              {(() => {
                const parts = resume.name.trim().split(/\s+/);
                if (parts.length < 2) {
                  return <span className="text-accent">{resume.name}</span>;
                }
                const last = parts.pop()!;
                return (
                  <>
                    {parts.join(" ")}{" "}
                    <span className="text-accent">{last}</span>
                  </>
                );
              })()}
            </h1>
            <p className="text-lg text-muted-foreground">{resume.role}</p>
            <HeroTyping text={TYPING_LINE} />
            <div className="flex flex-wrap gap-3 pt-4">
              <Button asChild>
                <a href="#driver">Driver profile</a>
              </Button>
              <Button variant="secondary" asChild>
                <a href="#projects">Projects</a>
              </Button>
            </div>
          </div>
          <div className="hidden lg:block">
            <HeroF1Graphic resume={resume} />
          </div>
        </div>
      </Container>
    </section>
  );
}
