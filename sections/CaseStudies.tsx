import { Container } from "@/components/Container";
import { CaseStudyCards } from "@/components/CaseStudyCards";
import caseStudiesData from "@/data/case-studies.json";
import type { CaseStudy } from "@/lib/types";

const studies = caseStudiesData.studies as CaseStudy[];

export function CaseStudies() {
  if (!studies.length) return null;

  return (
    <section id="case-studies" className="py-24 scroll-mt-20">
      <Container>
        <div className="mb-10 flex flex-col gap-2">
          <span className="font-mono text-xs uppercase tracking-[0.3em] text-secondary">
            Selected work
          </span>
          <h2 className="text-3xl font-semibold tracking-tight">Case studies</h2>
          <p className="max-w-2xl text-muted-foreground">
            A closer look at how I scope problems, make technical choices, and
            deliver outcomes—written for recruiters and hiring managers as well
            as clients evaluating product or AI work. Each story maps to a
            public repository you can review in detail.
          </p>
        </div>
        <CaseStudyCards studies={studies} />
      </Container>
    </section>
  );
}
