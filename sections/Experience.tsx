import { Reveal } from "@/components/Reveal";
import { SectionHeader } from "@/components/SectionHeader";
import { resume } from "@/lib/site";

export function Experience() {
  return (
    <section id="experience" aria-labelledby="experience-title" className="section page">
      <SectionHeader id="experience-title" number="03" label="Experience" title="Where I have shipped." />
      <ol className="mt-10 border-b border-line">
        {resume.experience.map((job) => (
          <li key={job.id} className="border-t border-line py-10">
            <Reveal className="grid gap-4 md:grid-cols-[180px_1fr] md:gap-10">
              <p className="font-mono text-[12px] leading-relaxed text-text-dim">
                {job.dates}
                <br />
                <span className="text-text-muted">{job.place}</span>
              </p>
              <div>
                <h3 className="font-display text-[24px] font-semibold leading-tight">
                  {job.role}, {job.company}
                </h3>
                {job.summary ? <p className="mt-2 text-text-muted">{job.summary}</p> : null}
                <ul className="mt-4 space-y-2.5">
                  {job.points.map((p) => (
                    <li key={p} className="flex gap-3 text-[16px] leading-snug">
                      <span aria-hidden="true" className="text-accent">
                        →
                      </span>
                      <span>{p}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </li>
        ))}
      </ol>
    </section>
  );
}
