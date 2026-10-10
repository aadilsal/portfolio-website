import { Reveal } from "@/components/Reveal";
import { SectionHeader } from "@/components/SectionHeader";
import { SkillRow } from "@/components/SkillRow";
import { SkillStack } from "@/components/SkillStack";
import { skillGroups, skillsIn, tiers } from "@/data/skills";

const tierColour = { Production: "text-accent", Proficient: "text-text", Working: "text-text-dim" } as const;

// Bottom to top: Cloud, Backend, AI, Frontend.
const stackOrder = ["cloud", "backend", "ai", "frontend"] as const;

export function Skills() {
  const layers = stackOrder.map((id) => {
    const g = skillGroups.find((x) => x.id === id)!;
    return { id, label: g.label, count: skillsIn(id).length, accent: g.accent };
  });

  return (
    <section id="skills" aria-labelledby="skills-title" className="section page">
      <div className="grid items-center gap-8 lg:grid-cols-2">
        <SectionHeader
          id="skills-title"
          number="02"
          label="Skills"
          title="What I know, and how well."
          lead="Every level is tied to evidence, so you can check it. Pick a layer to jump to it."
        >
          <dl className="mt-6 space-y-1.5 text-[15px]" style={{ "--i": 3 } as React.CSSProperties}>
            {tiers.map((t) => (
              <div key={t.tier} className="flex gap-2">
                <dt className={`font-mono text-[13px] ${tierColour[t.tier]}`}>{t.tier}</dt>
                <dd className="text-text-muted">{t.meaning}</dd>
              </div>
            ))}
          </dl>
        </SectionHeader>
        <SkillStack layers={layers} />
      </div>

      <div className="mt-10 grid gap-5 lg:grid-cols-2">
        {skillGroups.map((g) => (
          <Reveal key={g.id} id={`skills-${g.id}`} className="skill-group card p-6">
            <div>
              <h3 className="font-display text-[22px] font-semibold">{g.label}</h3>
              <ul className="mt-4">
                {skillsIn(g.id).map((s, i) => (
                  <SkillRow key={s.name} skill={s} row={i} />
                ))}
              </ul>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
