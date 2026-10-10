import { Assistant } from "@/components/Assistant";
import { sources } from "@/lib/assistant";
import { links, resume } from "@/lib/site";

const order = (i: number) => ({ "--i": i }) as React.CSSProperties;

export function Hero() {
  return (
    <section id="top" aria-labelledby="hero-title" className="page grid gap-12 pb-16 pt-14 md:pt-24 lg:grid-cols-[1.05fr_1fr] lg:gap-16">
      <div>
        <p className="enter flex items-center gap-2.5 font-mono text-[12px] text-text-muted" style={order(0)}>
          <span aria-hidden="true" className="h-2 w-2 rounded-full bg-live" />
          {resume.status}
        </p>
        <h1 id="hero-title" className="enter h-page mt-6 max-w-[13ch]" style={order(1)}>
          {resume.headline} <span className="accent-wipe text-accent">{resume.headlineAccent}</span>
        </h1>
        <p className="enter lead mt-6 max-w-[46ch]" style={order(2)}>
          {resume.intro}
        </p>
        <div className="enter mt-8 flex flex-col gap-3 sm:flex-row" style={order(3)}>
          <a href="#work" className="btn btn-primary">
            See the work
          </a>
          <a href="#contact" className="btn btn-secondary">
            Get in touch
          </a>
        </div>
        <ul className="enter mt-6 flex flex-wrap gap-x-6 font-mono text-[12px] text-text-muted" style={order(4)}>
          <li>
            <a href={links.github} className="text-link" data-event="contact_click" data-label="github">
              GitHub
            </a>
          </li>
          <li>
            <a href={links.linkedin} className="text-link" data-event="contact_click" data-label="linkedin">
              LinkedIn
            </a>
          </li>
          <li>
            <a href={links.email} className="text-link" data-event="contact_click" data-label="email">
              {resume.contact.email}
            </a>
          </li>
        </ul>
      </div>
      <div className="enter" style={order(5)}>
        <Assistant sources={sources} email={resume.contact.email} />
      </div>
    </section>
  );
}
