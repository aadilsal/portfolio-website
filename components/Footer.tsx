import { links, resume } from "@/lib/site";

export function Footer() {
  return (
    <footer className="mt-24 border-t border-line">
      <div className="page flex flex-col gap-2 py-6 font-mono text-[12px] text-text-dim sm:flex-row sm:items-center sm:justify-between">
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
    </footer>
  );
}
