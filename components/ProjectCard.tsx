import type { Project } from "@/lib/types";

export function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="card flex h-full flex-col p-6">
      <h3 className="font-display text-[22px] font-semibold leading-tight">{project.title}</h3>
      <p className="mt-3 flex-1 text-[15px] leading-relaxed text-text-muted">{project.summary}</p>
      <p className="mt-4 font-mono text-[12px] text-text-dim">{project.stack.join(" · ")}</p>
      <div className="mt-3 flex gap-5 text-[15px]">
        {project.links.live ? (
          <a
            href={project.links.live}
            className="text-link font-semibold"
            data-event="live_site_click"
            data-label={project.slug}
            aria-label={`${project.title}, live site`}
          >
            Live
          </a>
        ) : null}
        <a href={project.links.code} className="text-link text-text-muted" aria-label={`${project.title}, code`}>
          Code
        </a>
      </div>
    </article>
  );
}
