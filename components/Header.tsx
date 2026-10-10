import { MobileMenu } from "@/components/MobileMenu";
import { links, resume } from "@/lib/site";

export const navItems = [
  { href: "/#work", label: "Work" },
  { href: "/#skills", label: "Skills" },
  { href: "/#experience", label: "Experience" },
  { href: "/#about", label: "About" },
];

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-line bg-bg/95 backdrop-blur-sm">
      <div className="page flex h-16 items-center justify-between gap-4">
        <a href="/#top" className="flex min-h-[44px] items-center font-display text-[17px] font-bold">
          {resume.name}
        </a>
        <nav aria-label="Main" className="hidden items-center gap-1 md:flex">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="flex min-h-[44px] items-center px-3 text-[15px] text-text-muted hover:text-text"
            >
              {item.label}
            </a>
          ))}
          <a
            href={links.resume}
            download
            data-event="resume_download"
            className="btn ml-3 h-11 border border-line-strong text-[14px] hover:border-text-dim"
          >
            Download résumé
          </a>
        </nav>
        <MobileMenu items={navItems} resumeHref={links.resume} />
      </div>
    </header>
  );
}
