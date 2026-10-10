import resumeData from "@/data/resume.json";
import type { Resume } from "@/lib/types";

export const resume = resumeData as Resume;

export const links = {
  email: `mailto:${resume.contact.email}`,
  whatsapp: `https://wa.me/${resume.contact.whatsapp}`,
  github: resume.contact.github,
  linkedin: resume.contact.linkedin,
  resume: "/resume.pdf",
  source: resume.sourceUrl,
};

export const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || resume.siteUrl).replace(/\/+$/, "");
