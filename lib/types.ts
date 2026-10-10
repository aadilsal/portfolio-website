export type Resume = {
  name: string;
  role: string;
  location: string;
  timezone: string;
  siteUrl: string;
  sourceUrl: string;
  portrait: string;
  status: string;
  headline: string;
  headlineAccent: string;
  intro: string;
  metaDescription: string;
  contact: {
    email: string;
    github: string;
    githubHandle: string;
    linkedin: string;
    /** Digits only, e.g. 923035116528 */
    whatsapp: string;
  };
  proof: { value: string; label: string }[];
  experience: {
    id: string;
    company: string;
    role: string;
    dates: string;
    place: string;
    summary?: string;
    points: string[];
  }[];
  about: string[];
  education: { degree: string; institution: string; dates: string };
  certifications: string[];
};

export type Tier = "Production" | "Proficient" | "Working";
export type SkillGroup = "frontend" | "backend" | "ai" | "cloud";

export type Skill = {
  name: string;
  group: SkillGroup;
  level: 2 | 3 | 4 | 5;
  tier: Tier;
  proof: string;
  /** A section anchor or /work/<slug> */
  proofHref?: string;
};

export type Media = {
  type: "image" | "video";
  src: string;
  alt: string;
  width: number;
  height: number;
};

export type CaseStudy = {
  role: string;
  timeline: string;
  scale: string;
  /** Paragraphs */
  problem: string[];
  features: { title: string; body: string; media?: Media }[];
  diagram: {
    caption: string;
    nodes: { id: string; title: string; note: string; accent?: boolean }[];
    edges: [string, string][];
  };
  decisions: { title: string; why: string; tradeoff: string }[];
  results: { value: string; label: string }[];
  /** Slug of the next case study */
  next: string;
};

export type Project = {
  slug: string;
  title: string;
  kind: "Client build" | "Production build" | "My own product" | "Personal project";
  status: "Live" | "Pre-launch" | "Code and write-up" | "Code only";
  /** One sentence */
  summary: string;
  /** Two-sentence summary for the case study header */
  longSummary?: string;
  /** Three bullets, flagships only */
  outcomes: string[];
  stack: string[];
  links: { live?: string; liveLabel?: string; code: string };
  cover?: Media;
  hero?: Media;
  featured: boolean;
  caseStudy?: CaseStudy;
};
