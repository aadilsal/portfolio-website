import { Container } from "@/components/Container";
import { HeroAvatar } from "@/components/HeroAvatar";
import { HeroSpotlight } from "@/components/HeroSpotlight";
import { HeroTyping } from "@/components/HeroTyping";
import { Button } from "@/components/ui/button";
import type { Resume } from "@/lib/types";

const TYPING_LINE =
  "Production web · AI & RAG · MLOps · Payments · Race-ready delivery";

export function Hero({ resume }: { resume: Resume }) {
  return (
    <section
      id="hero"
      className="relative min-h-[85vh] flex flex-col justify-center py-24 overflow-hidden"
    >
      <div className="pointer-events-none absolute inset-0 grid-overlay opacity-60" />
      <Container>
        <div className="relative grid items-center gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(260px,360px)] lg:gap-12">
          <div className="relative max-w-3xl space-y-6">
            <p className="font-mono text-xs uppercase tracking-[0.35em] text-muted-foreground">
              Overview
            </p>
            <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:gap-8">
              <HeroAvatar resume={resume} priority />
              <div className="min-w-0 flex-1 space-y-5">
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
              </div>
            </div>
            <HeroTyping text={TYPING_LINE} />
            <div className="flex flex-wrap gap-3 pt-2">
              <Button asChild>
                <a href="#case-studies">Selected work</a>
              </Button>
              <Button variant="secondary" asChild>
                <a href="#contact">Get in touch</a>
              </Button>
              <Button variant="ghost" asChild className="font-mono text-xs">
                <a href="#driver">Profile</a>
              </Button>
            </div>
          </div>
          <div className="flex justify-center lg:justify-end">
            <HeroSpotlight resume={resume} />
          </div>
        </div>
      </Container>
    </section>
  );
}
