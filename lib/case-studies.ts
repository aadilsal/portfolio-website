import caseStudiesData from "@/data/case-studies.json";
import type { CaseStudy } from "@/lib/types";

/** GitHub repo `name` values (lowercase) that have a dedicated case study. */
export function getCaseStudyRepoSlugSet(): Set<string> {
  const studies = caseStudiesData.studies as CaseStudy[];
  return new Set(studies.map((s) => s.repo.toLowerCase()));
}
