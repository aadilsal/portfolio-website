export type CaseStudy = {
  repo: string;
  repoUrl: string;
  title: string;
  tagline: string;
  category: string;
  problem: string;
  role: string;
  approach: string;
  stack: string[];
  outcome: string;
};

export type Resume = {
  name: string;
  role: string;
  summary: string;
  location?: string;
  /** One line for senior roles + freelance (shown under summary when set). */
  availability?: string;
  /** Local path (e.g. `/avatar.jpg`) or image URL for hero / nav avatar */
  heroAvatar?: string;
  skills: {
    frontend: string[];
    backend: string[];
    ai: string[];
    cloud: string[];
  };
  experience: {
    company: string;
    role: string;
    duration: string;
    points: string[];
  }[];
  education: {
    institution: string;
    degree: string;
    duration: string;
  }[];
  certifications: string[];
  metrics?: {
    yearsExperience: number;
    projectsBuiltNote?: string;
  };
  /** Root-level fallbacks if `contact` is omitted */
  email?: string;
  github?: string;
  contact?: {
    email: string;
    github: string;
    githubHandle: string;
    linkedin?: string;
    /** WhatsApp number, digits only (e.g. 923035116528 for Pakistan). */
    whatsapp?: string;
  };
  /** Shown when GitHub API returns no repos (e.g. rate limit, offline). */
  projects?: {
    name: string;
    tagline?: string;
    description: string;
    features?: string[];
    category?: string;
  }[];
};

export type ProjectMetaEntry = {
  featured?: boolean;
  title?: string;
  category?: string;
  priority?: number;
};

export type ProjectsMeta = Record<string, ProjectMetaEntry>;

export type GitHubRepo = {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  stargazers_count: number;
  updated_at: string;
  fork: boolean;
  topics?: string[];
  language: string | null;
};

export type MergedProject = GitHubRepo & {
  displayTitle: string;
  category: string | null;
  meta: ProjectMetaEntry | undefined;
};
