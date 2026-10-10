import { Reveal } from "@/components/Reveal";
import { links } from "@/lib/site";

export function Contact() {
  return (
    <section id="contact" aria-labelledby="contact-title" className="section page">
      <Reveal className="rounded-[20px] border border-line bg-surface px-6 py-12 sm:px-12">
        <p className="label">05 / Contact</p>
        <h2 id="contact-title" className="h-section mt-4 max-w-[16ch]" style={{ "--i": 1 } as React.CSSProperties}>
          Hiring for a full-stack or AI role? Let&apos;s talk.
        </h2>
        <p className="lead mt-4 max-w-[48ch]" style={{ "--i": 2 } as React.CSSProperties}>
          Email and WhatsApp are the quickest ways to reach me. I&apos;m also open to focused contract builds.
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap" style={{ "--i": 3 } as React.CSSProperties}>
          <a href={links.email} className="btn btn-primary" data-event="contact_click" data-label="email">
            Email me
          </a>
          <a href={links.whatsapp} className="btn btn-secondary" data-event="contact_click" data-label="whatsapp">
            WhatsApp
          </a>
          <a href={links.linkedin} className="btn btn-secondary" data-event="contact_click" data-label="linkedin">
            LinkedIn
          </a>
          <a href={links.resume} download className="btn btn-secondary" data-event="resume_download">
            Download résumé, PDF
          </a>
        </div>
      </Reveal>
    </section>
  );
}
