import type { Skill } from "@/lib/types";

const tierColour: Record<Skill["tier"], string> = {
  Production: "text-accent",
  Proficient: "text-text",
  Working: "text-text-dim",
};

export function SkillRow({ skill, row }: { skill: Skill; row: number }) {
  const proofClass = "text-[14px] leading-snug text-text-muted";
  return (
    <li className="grid grid-cols-[minmax(0,1fr)_72px_88px] items-center gap-x-4 gap-y-1 border-t border-line py-3 md:grid-cols-[minmax(0,10rem)_72px_88px_minmax(0,1fr)]">
      <span className="text-[15px] font-medium leading-snug">{skill.name}</span>
      <span
        role="img"
        aria-label={`Level ${skill.level} of 5`}
        className="block h-1 overflow-hidden rounded-full bg-line"
      >
        <span
          className="level-fill block h-full w-full rounded-full bg-text"
          style={{ "--level": skill.level / 5, "--row": row } as React.CSSProperties}
        />
      </span>
      <span className={`font-mono text-[12px] ${tierColour[skill.tier]}`}>{skill.tier}</span>
      <span className="col-span-3 md:col-span-1">
        {skill.proofHref ? (
          <a href={skill.proofHref} className={`${proofClass} -my-[13px] inline-block py-[13px] underline decoration-line-strong underline-offset-4 hover:text-text`}>
            {skill.proof}
          </a>
        ) : (
          <span className={proofClass}>{skill.proof}</span>
        )}
      </span>
    </li>
  );
}
