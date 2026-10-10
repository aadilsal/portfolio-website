import Image from "next/image";
import { Reveal } from "@/components/Reveal";
import { SectionHeader } from "@/components/SectionHeader";
import { resume } from "@/lib/site";

export function About() {
  const facts = [
    {
      term: "Education",
      detail: `${resume.education.degree}, ${resume.education.institution}, ${resume.education.dates}`,
    },
    { term: "Certificates", detail: resume.certifications.join(". ") },
    { term: "Based in", detail: `${resume.location}, ${resume.timezone}` },
  ];

  return (
    <section id="about" aria-labelledby="about-title" className="section page grid gap-12 lg:grid-cols-2">
      <SectionHeader id="about-title" number="04" label="About" title="I like owning a feature from the schema to the button.">
        {resume.about.map((p, i) => (
          <p key={i} className="mt-5 max-w-[50ch] text-[17px] text-text-muted" style={{ "--i": 2 + i } as React.CSSProperties}>
            {p}
          </p>
        ))}
      </SectionHeader>
      <Reveal>
        <div className="relative aspect-[4/3] overflow-hidden rounded-xl border border-line bg-surface">
          <Image
            src={resume.portrait}
            alt={`Portrait of ${resume.name}`}
            fill
            sizes="(min-width: 1024px) 560px, 100vw"
            className="object-cover object-[50%_25%]"
          />
        </div>
        <dl className="mt-6" style={{ "--i": 1 } as React.CSSProperties}>
          {facts.map((f) => (
            <div key={f.term} className="grid grid-cols-[110px_1fr] gap-4 border-t border-line py-3 text-[15px]">
              <dt className="font-mono text-[12px] leading-6 text-text-dim">{f.term}</dt>
              <dd>{f.detail}</dd>
            </div>
          ))}
        </dl>
      </Reveal>
    </section>
  );
}
