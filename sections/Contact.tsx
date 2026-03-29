import { Container } from "@/components/Container";
import { Button } from "@/components/ui/button";
import { resolveContact } from "@/lib/contact";
import type { Resume } from "@/lib/types";
import { GitBranch, Globe, Mail } from "lucide-react";

export function Contact({ resume }: { resume: Resume }) {
  const { email, github, linkedin } = resolveContact(resume);

  return (
    <section id="contact" className="py-24 scroll-mt-20 pb-32">
      <Container>
        <div className="mb-10 flex flex-col gap-2">
          <span className="font-mono text-xs uppercase tracking-[0.3em] text-secondary">
            Pit wall
          </span>
          <h2 className="text-3xl font-semibold tracking-tight">Contact</h2>
          <p className="text-muted-foreground">
            Reach out for collaborations or systems work.
          </p>
        </div>
        <div className="panel-border flex flex-col gap-6 p-8 sm:flex-row sm:items-center sm:justify-between">
          <div className="space-y-3">
            <a
              href={`mailto:${email}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 text-foreground hover:text-secondary transition-colors"
            >
              <Mail className="h-5 w-5 text-accent" />
              <span className="font-mono text-sm">{email}</span>
            </a>
            <a
              href={github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 text-foreground hover:text-secondary transition-colors"
            >
              <GitBranch className="h-5 w-5 text-secondary" />
              <span className="font-mono text-sm">{github}</span>
            </a>
            {linkedin && (
              <a
                href={linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-foreground hover:text-secondary transition-colors"
              >
                <Globe className="h-5 w-5 text-secondary" />
                <span className="font-mono text-sm">LinkedIn</span>
              </a>
            )}
          </div>
          <Button size="lg" asChild>
            <a
              href={`mailto:${email}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              Send email
            </a>
          </Button>
        </div>
      </Container>
    </section>
  );
}
