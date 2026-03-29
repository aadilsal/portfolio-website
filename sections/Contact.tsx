import { Container } from "@/components/Container";
import { Button } from "@/components/ui/button";
import { resolveContact } from "@/lib/contact";
import type { Resume } from "@/lib/types";
import { GitBranch, Globe, Mail, MessageCircle } from "lucide-react";

export function Contact({ resume }: { resume: Resume }) {
  const { email, github, linkedin, whatsappHref } = resolveContact(resume);

  return (
    <section id="contact" className="py-24 scroll-mt-20 pb-32">
      <Container>
        <div className="mb-10 flex flex-col gap-2">
          <span className="font-mono text-xs uppercase tracking-[0.3em] text-secondary">
            Reach out
          </span>
          <h2 className="text-3xl font-semibold tracking-tight">Contact</h2>
          <p className="text-muted-foreground max-w-xl">
            Whether you&apos;re hiring for a senior role or need a focused build
            or integration, email and WhatsApp are the quickest ways to reach
            me. I respond to both full-time and consulting inquiries.
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
            {whatsappHref && (
              <a
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-foreground hover:text-secondary transition-colors"
              >
                <MessageCircle className="h-5 w-5 text-accent" />
                <span className="font-mono text-sm">WhatsApp</span>
              </a>
            )}
          </div>
          <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap">
            <Button size="lg" asChild>
              <a
                href={`mailto:${email}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                Send email
              </a>
            </Button>
            {whatsappHref && (
              <Button size="lg" variant="secondary" asChild>
                <a href={whatsappHref} target="_blank" rel="noopener noreferrer">
                  Message on WhatsApp
                </a>
              </Button>
            )}
          </div>
        </div>
      </Container>
    </section>
  );
}
