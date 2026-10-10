import { Reveal } from "@/components/Reveal";

type Props = {
  number: string;
  label: string;
  title: string;
  lead?: string;
  id: string;
  children?: React.ReactNode;
};

export function SectionHeader({ number, label, title, lead, id, children }: Props) {
  return (
    <Reveal>
      <p className="label" style={{ "--i": 0 } as React.CSSProperties}>
        {number} / {label}
      </p>
      <h2 id={id} className="h-section mt-4 max-w-[16ch]" style={{ "--i": 1 } as React.CSSProperties}>
        {title}
      </h2>
      {lead ? (
        <p className="lead mt-4 max-w-[52ch]" style={{ "--i": 2 } as React.CSSProperties}>
          {lead}
        </p>
      ) : null}
      {children}
    </Reveal>
  );
}
