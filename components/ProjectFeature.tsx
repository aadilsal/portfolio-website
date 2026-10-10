import { Link } from "next-view-transitions";
import { ArchitectureDiagram } from "@/components/ArchitectureDiagram";
import { Reveal } from "@/components/Reveal";
import { ScreenshotFrame } from "@/components/ScreenshotFrame";
import { TiltFrame } from "@/components/TiltFrame";
import type { Project } from "@/lib/types";

const v = (i: number) => ({ "--i": i }) as React.CSSProperties;

export function StatusLine({ index, project }: { index?: number; project: Project }) {
  return (
    <p className="flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-[12px] text-text-dim">
      {index != null ? <span>{String(index).padStart(2, "0")}</span> : null}
      <span>{project.kind}</span>
      <span className={project.status === "Live" ? "text-live" : "text-text"}>{project.status}</span>
    </p>
  );
}

export function ProjectFeature({ project, index }: { project: Project; index: number }) {
  const flip = index % 2 === 0;
  const caseHref = `/work/${project.slug}`;

  return (
    <article
      aria-labelledby={`p-${project.slug}`}
      className="grid items-center gap-10 border-t border-line py-14 md:grid-cols-2 md:gap-12"
    >
      <Reveal className={flip ? "md:order-2" : ""}>
        {project.cover ? (
          <TiltFrame>
            <Link href={caseHref} tabIndex={-1} aria-hidden="true" data-event="case_study_view" data-label={project.slug}>
              <ScreenshotFrame
                media={project.cover}
                transitionName={`shot-${project.slug}`}
                sizes="(min-width: 768px) 560px, 100vw"
                revealClip
              />
            </Link>
          </TiltFrame>
        ) : project.caseStudy ? (
          <div>
            <ArchitectureDiagram diagram={project.caseStudy.diagram} layout="column" />
          </div>
        ) : null}
      </Reveal>

      <Reveal>
        <div style={v(0)}>
          <StatusLine index={index} project={project} />
        </div>
        <h3 id={`p-${project.slug}`} className="mt-3 font-display text-[36px] font-bold leading-[1.1]" style={v(1)}>
          {project.title}
        </h3>
        <p className="lead mt-3" style={v(2)}>
          {project.summary}
        </p>
        <ul className="mt-5 space-y-2.5" style={v(3)}>
          {project.outcomes.map((o) => (
            <li key={o} className="flex gap-3 text-[16px] leading-snug">
              <span aria-hidden="true" className="text-accent">
                →
              </span>
              <span>{o}</span>
            </li>
          ))}
        </ul>
        <ul className="mt-5 flex flex-wrap gap-2" aria-label="Stack" style={v(4)}>
          {project.stack.map((s) => (
            <li key={s} className="tag">
              {s}
            </li>
          ))}
        </ul>
        <div className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-2" style={v(5)}>
          <Link href={caseHref} className="btn btn-light" data-event="case_study_view" data-label={project.slug}>
            Read the case study
          </Link>
          {project.links.live ? (
            <a
              href={project.links.live}
              className="text-link font-semibold"
              data-event="live_site_click"
              data-label={project.slug}
            >
              {project.links.liveLabel ?? "Open the live site"}
            </a>
          ) : null}
          <a href={project.links.code} className="text-link text-text-muted">
            View the code
          </a>
        </div>
      </Reveal>
    </article>
  );
}
