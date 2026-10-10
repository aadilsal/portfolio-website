import type { Skill, SkillGroup, Tier } from "@/lib/types";

export const skillGroups: { id: SkillGroup; label: string; accent?: boolean }[] = [
  { id: "frontend", label: "Frontend" },
  { id: "backend", label: "Backend and data" },
  { id: "ai", label: "AI and machine learning", accent: true },
  { id: "cloud", label: "Cloud and delivery" },
];

export const tiers: { tier: Tier; meaning: string }[] = [
  { tier: "Production", meaning: "shipped at work or to real users" },
  { tier: "Proficient", meaning: "several finished projects" },
  { tier: "Working", meaning: "one project or coursework" },
];

const JT = "/work/junket-tours";
const DA = "/work/dentalai-receptionist";
const AF = "/work/apexflow";

export const skills: Skill[] = [
  { group: "frontend", name: "TypeScript", level: 5, tier: "Production", proof: "Day job and 10+ public repos" },
  { group: "frontend", name: "React", level: 5, tier: "Production", proof: "Ilmversity, Fiveriver", proofHref: "#experience" },
  { group: "frontend", name: "Next.js App Router", level: 5, tier: "Production", proof: "Junket Tours, ResearchOS", proofHref: JT },
  { group: "frontend", name: "JavaScript", level: 5, tier: "Production", proof: "In production since 2023" },
  { group: "frontend", name: "Tailwind, shadcn/ui", level: 4, tier: "Production", proof: "Every recent build" },
  { group: "frontend", name: "Testing with Vitest", level: 3, tier: "Proficient", proof: "Junket Tours, Fiveriver", proofHref: JT },

  { group: "backend", name: "Node.js, REST APIs", level: 4, tier: "Production", proof: "Ilmversity backend", proofHref: "#experience" },
  { group: "backend", name: "Payment gateways", level: 4, tier: "Production", proof: "Stripe, Chase, KuickPay at work", proofHref: "#experience" },
  { group: "backend", name: "Convex", level: 4, tier: "Production", proof: "Junket Tours, DentalAI, ResearchOS", proofHref: JT },
  { group: "backend", name: "Python, FastAPI", level: 4, tier: "Proficient", proof: "ApexFlow, Churn Predictor", proofHref: AF },
  { group: "backend", name: "SQL databases", level: 3, tier: "Proficient", proof: "Day job, ApexFlow, InsightOS" },
  { group: "backend", name: "MongoDB", level: 3, tier: "Proficient", proof: "Fiveriver, FinBotics" },
  { group: "backend", name: "C#, ASP.NET", level: 2, tier: "Working", proof: "Hospital Management System" },

  { group: "ai", name: "LLM apps and agents", level: 4, tier: "Production", proof: "Ilmversity chatbots, ResearchOS", proofHref: "#experience" },
  { group: "ai", name: "Classical ML", level: 4, tier: "Proficient", proof: "XGBoost, LightGBM, SHAP in ApexFlow", proofHref: AF },
  { group: "ai", name: "Voice agents", level: 3, tier: "Proficient", proof: "DentalAI on Vapi, day job", proofHref: DA },
  { group: "ai", name: "RAG and vector search", level: 3, tier: "Proficient", proof: "LegalMindRAG with FAISS" },
  { group: "ai", name: "MLOps", level: 3, tier: "Proficient", proof: "Airflow, MLflow, DVC in ApexFlow", proofHref: AF },
  { group: "ai", name: "Workflow automation", level: 3, tier: "Proficient", proof: "n8n flows in DentalAI", proofHref: DA },
  { group: "ai", name: "Computer vision", level: 2, tier: "Working", proof: "FairPlay Review System" },

  { group: "cloud", name: "Git and GitHub", level: 5, tier: "Production", proof: "Daily, at work and on my own builds" },
  { group: "cloud", name: "Vercel deployment", level: 4, tier: "Production", proof: "Every live project on this page", proofHref: "#work" },
  { group: "cloud", name: "Docker", level: 3, tier: "Proficient", proof: "ApexFlow's three images and compose file", proofHref: AF },
  { group: "cloud", name: "CI/CD", level: 3, tier: "Proficient", proof: "GitHub Actions in ApexFlow, Junket Tours" },
  { group: "cloud", name: "Monitoring", level: 2, tier: "Working", proof: "Prometheus, Grafana in ApexFlow", proofHref: AF },
  { group: "cloud", name: "AWS", level: 2, tier: "Working", proof: "Cloud Foundations certificate", proofHref: "#about" },
];

export function skillsIn(group: SkillGroup): Skill[] {
  return skills.filter((s) => s.group === group);
}
