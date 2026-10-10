import { ProjectCard } from "@/components/ProjectCard";
import { ProjectFeature } from "@/components/ProjectFeature";
import { Reveal } from "@/components/Reveal";
import { SectionHeader } from "@/components/SectionHeader";
import { flagships, moreWork } from "@/data/projects";
import { links } from "@/lib/site";

export function Work() {
  return (
    <section id="work" aria-labelledby="work-title" className="section page">
      <SectionHeader
        id="work-title"
        number="01"
        label="Selected work"
        title="Three builds, start to finish."
        lead="Each one has a live link, the code, and a write-up of the decisions behind it."
      />
      <div className="mt-12 border-b border-line">
        {flagships.map((p, i) => (
          <ProjectFeature key={p.slug} project={p} index={i + 1} />
        ))}
      </div>

      <div className="mt-20">
        <div className="flex flex-wrap items-baseline justify-between gap-4">
          <h3 className="font-display text-[28px] font-semibold">More work</h3>
          <a href={links.github} className="text-link font-semibold">
            All repositories on GitHub
          </a>
        </div>
        <Reveal as="ul" className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {moreWork.map((p, i) => (
            <li key={p.slug} id={`project-${p.slug}`} style={{ "--i": i } as React.CSSProperties}>
              <ProjectCard project={p} />
            </li>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
