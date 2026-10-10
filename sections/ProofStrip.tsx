import { resume } from "@/lib/site";

export function ProofStrip() {
  return (
    <section aria-label="At a glance" className="border-y border-line">
      <dl className="page grid grid-cols-2 gap-x-6 gap-y-8 py-10 md:grid-cols-4">
        {resume.proof.map((p) => (
          <div key={p.label}>
            <dt className="font-display text-[36px] font-bold leading-none md:text-[40px]">{p.value}</dt>
            <dd className="mt-2 text-[14px] leading-snug text-text-muted">{p.label}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
