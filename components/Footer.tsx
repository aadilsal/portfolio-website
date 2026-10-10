import { flagships } from "@/data/projects";
import { links, resume } from "@/lib/site";

const columns = [
  {
    title: "Site",
    items: [
      { label: "Work", href: "/#work" },
      { label: "Skills", href: "/#skills" },
      { label: "Experience", href: "/#experience" },
      { label: "About", href: "/#about" },
    ],
  },
  {
    title: "Case studies",
    items: flagships.map((p) => ({ label: p.title, href: `/work/${p.slug}` })),
  },
  {
    title: "Contact",
    items: [
      { label: "Email", href: links.email, event: "contact_click" },
      { label: "WhatsApp", href: links.whatsapp, event: "contact_click" },
      { label: "LinkedIn", href: links.linkedin, event: "contact_click" },
      { label: "GitHub", href: links.github, event: "contact_click" },
      { label: "Résumé, PDF", href: links.resume, event: "resume_download", download: true },
    ],
  },
];

export function Footer() {
  return (
    <footer className="mt-32 border-t border-line bg-surface/40">
      <div className="page grid gap-12 py-16 md:grid-cols-[1.4fr_repeat(3,1fr)]">
        <div>
          <a href="/#top" className="font-display text-[22px] font-bold">
            {resume.name}
          </a>
          <p className="mt-3 max-w-[34ch] text-[15px] text-text-muted">
            {resume.role} in {resume.location}. Full-stack products with AI built in.
          </p>
          <p className="mt-5 flex items-center gap-2.5 font-mono text-[12px] text-text-muted">
            <span aria-hidden="true" className="h-2 w-2 rounded-full bg-live" />
            {resume.status}
          </p>
          <a href={links.email} className="text-link mt-3 font-mono text-[13px]" data-event="contact_click" data-label="footer-email">
            {resume.contact.email}
          </a>
        </div>

        {columns.map((col) => (
          <nav key={col.title} aria-label={col.title}>
            <h2 className="font-mono text-[12px] uppercase tracking-[0.08em] text-text-dim">{col.title}</h2>
            <ul className="mt-3">
              {col.items.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    download={"download" in item ? true : undefined}
                    data-event={"event" in item ? item.event : undefined}
                    data-label={"event" in item ? `footer-${item.label.toLowerCase()}` : undefined}
                    className="flex min-h-[44px] items-center text-[15px] text-text-muted hover:text-text"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        ))}
      </div>

      <div className="border-t border-line">
        <div className="page flex flex-col gap-1 py-5 font-mono text-[12px] text-text-dim sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {resume.name}
          </p>
          <p>
            Built with Next.js.{" "}
            <a href={links.source} className="text-link text-text-muted">
              Source on GitHub
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
