import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Link } from "next-view-transitions";
import { ArchitectureDiagram } from "@/components/ArchitectureDiagram";
import { StatusLine } from "@/components/ProjectFeature";
import { Reveal } from "@/components/Reveal";
import { ScreenshotFrame } from "@/components/ScreenshotFrame";
import { flagships, getProject } from "@/data/projects";

type Params = { params: { slug: string } };

export const dynamicParams = false;

export function generateStaticParams() {
  return flagships.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: Params): Metadata {
  const p = getProject(params.slug);
  if (!p) return {};
  const title = `${p.title} case study`;
  return {
    title,
    description: p.summary,
    alternates: { canonical: `/work/${p.slug}` },
    openGraph: { title, description: p.summary, url: `/work/${p.slug}`, type: "article" },
  };
}

const v = (i: number) => ({ "--i": i }) as React.CSSProperties;

export default function CaseStudyPage({ params }: Params) {
  const p = getProject(params.slug);
  const cs = p?.caseStudy;
  if (!p || !cs) notFound();
  const next = getProject(cs.next);
  const index = flagships.findIndex((f) => f.slug === p.slug) + 1;

  return (
    <main id="content" className="page pb-8">
      <header className="pt-12 md:pt-16">
        <Link href="/#work" className="text-link font-mono text-[12px] text-text-muted">
          ← All work
        </Link>
        <div className="enter mt-6 flex items-center gap-3 font-mono text-[12px]" style={v(0)}>
          <span className="text-accent">Case study {String(index).padStart(2, "0")}</span>
          <StatusLine project={p} />
        </div>
        <h1 className="enter h-page mt-4" style={v(1)}>
          {p.title}
        </h1>
        <p className="enter lead mt-5 max-w-[60ch]" style={v(2)}>
          {p.longSummary ?? p.summary}
        </p>
        <div className="enter mt-8 flex flex-col gap-3 sm:flex-row" style={v(3)}>
          {p.links.live ? (
            <a href={p.links.live} className="btn btn-primary" data-event="live_site_click" data-label={p.slug}>
              {p.links.liveLabel ?? "Open the live site"}
            </a>
          ) : null}
          <a href={p.links.code} className={`btn ${p.links.live ? "btn-secondary" : "btn-primary"}`}>
            View the code
          </a>
        </div>
      </header>

      {p.hero ? (
        <div className="enter mt-12" style={v(4)}>
          <ScreenshotFrame media={p.hero} transitionName={`shot-${p.slug}`} sizes="(min-width: 1200px) 1136px, 100vw" ratio="16/9" priority />
        </div>
      ) : (
        <div className="enter mt-12" style={v(4)}>
          <ArchitectureDiagram diagram={cs.diagram} />
        </div>
      )}

      <dl className="mt-12 grid grid-cols-2 gap-6 border-y border-line py-6 md:grid-cols-4">
        {[
          ["Role", cs.role],
          ["Timeline", cs.timeline],
          ["Stack", p.stack.join(", ")],
          ["Scale", cs.scale],
        ].map(([term, detail]) => (
          <div key={term}>
            <dt className="font-mono text-[12px] text-text-dim">{term}</dt>
            <dd className="mt-1 text-[15px]">{detail}</dd>
          </div>
        ))}
      </dl>

      <section aria-labelledby="problem" className="mt-20 grid gap-6 md:grid-cols-[220px_1fr] md:gap-12">
        <h2 id="problem" className="font-display text-[28px] font-semibold leading-tight">
          The problem
        </h2>
        <Reveal>
          {cs.problem.map((para, i) => (
            <p key={i} className="mb-4 max-w-[62ch] text-[17px] text-text-muted" style={v(i)}>
              {para}
            </p>
          ))}
        </Reveal>
      </section>

      <section aria-labelledby="built" className="mt-20">
        <h2 id="built" className="border-b border-line pb-5 font-display text-[28px] font-semibold">
          What I built
        </h2>
        {cs.features.map((f, i) => (
          <article
            key={f.title}
            className={`grid items-center gap-8 border-b border-line py-12 ${f.media ? "md:grid-cols-2 md:gap-12" : ""}`}
          >
            {f.media ? (
              <Reveal className={i % 2 === 1 ? "md:order-2" : ""}>
                <ScreenshotFrame media={f.media} sizes="(min-width: 768px) 560px, 100vw" revealClip />
              </Reveal>
            ) : null}
            <Reveal className={f.media ? "" : "grid gap-2 md:grid-cols-[220px_1fr] md:gap-12"}>
              <p className="font-mono text-[12px] text-text-dim">{String(i + 1).padStart(2, "0")}</p>
              <div>
                <h3 className="font-display text-[24px] font-semibold leading-tight">{f.title}</h3>
                <p className="mt-3 max-w-[60ch] text-[16px] text-text-muted">{f.body}</p>
              </div>
            </Reveal>
          </article>
        ))}
      </section>

      <section aria-labelledby="fits" className="mt-20">
        <h2 id="fits" className="font-display text-[28px] font-semibold">
          How it fits together
        </h2>
        <p className="mt-2 text-[15px] text-text-muted">{cs.diagram.caption}</p>
        <div className="mt-6">
          <ArchitectureDiagram diagram={cs.diagram} />
        </div>
      </section>

      <section aria-labelledby="decisions" className="mt-20">
        <h2 id="decisions" className="font-display text-[28px] font-semibold">
          Decisions and trade-offs
        </h2>
        <Reveal className="mt-6 grid gap-4 md:grid-cols-3">
          {cs.decisions.map((d, i) => (
            <article key={d.title} className="card p-6" style={v(i)}>
              <h3 className="text-[17px] font-semibold leading-snug">{d.title}</h3>
              <p className="mt-3 text-[15px] leading-relaxed text-text-muted">{d.why}</p>
              <p className="mt-3 text-[15px] leading-relaxed text-text-muted">{d.tradeoff}</p>
            </article>
          ))}
        </Reveal>
      </section>

      <section aria-labelledby="results" className="mt-20">
        <h2 id="results" className="font-display text-[28px] font-semibold">
          Results
        </h2>
        <dl className="mt-6 grid gap-6 border-y border-line py-8 sm:grid-cols-3">
          {cs.results.map((r) => (
            <div key={r.label}>
              <dt className="font-display text-[40px] font-bold leading-none">{r.value}</dt>
              <dd className="mt-2 text-[14px] text-text-muted">{r.label}</dd>
            </div>
          ))}
        </dl>
      </section>

      {next ? (
        <Link
          href={`/work/${next.slug}`}
          className="arrow-link mt-20 flex items-center justify-between gap-6 rounded-[20px] border border-line bg-surface px-6 py-10 hover:border-line-strong sm:px-10"
          data-event="case_study_view"
          data-label={next.slug}
        >
          <span>
            <span className="block font-mono text-[12px] text-text-dim">Next case study</span>
            <span className="mt-2 block font-display text-[32px] font-bold leading-tight md:text-[40px]">{next.title}</span>
          </span>
          <span aria-hidden="true" className="arrow text-[32px] text-accent">
            →
          </span>
        </Link>
      ) : null}
    </main>
  );
}
