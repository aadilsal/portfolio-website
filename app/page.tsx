import nextDynamic from "next/dynamic";
import { Container } from "@/components/Container";
import resumeData from "@/data/resume.json";
import { getMergedProjects, sortByUpdated } from "@/lib/projects";
import type { Resume } from "@/lib/types";
import { About } from "@/sections/About";
import { Architecture } from "@/sections/Architecture";
import { Contact } from "@/sections/Contact";
import { EducationCerts } from "@/sections/EducationCerts";
import { Experience } from "@/sections/Experience";
import { GitHubFeed } from "@/sections/GitHubFeed";
import { Hero } from "@/sections/Hero";
import { Metrics } from "@/sections/Metrics";
import { Projects } from "@/sections/Projects";

const Chatbot = nextDynamic(() => import("@/components/Chatbot"), {
  ssr: false,
});

const resume = resumeData as Resume;

export const dynamic = "force-dynamic";

export default async function Home() {
  const projects = await getMergedProjects(resume);
  const feed = sortByUpdated(projects)
    .filter((p) => p.stargazers_count > 0)
    .slice(0, 8);

  return (
    <>
      <header className="sticky top-0 z-30 border-b border-border/80 bg-background/85 backdrop-blur-md">
        <Container>
          <nav className="flex h-14 items-center justify-between gap-4">
            <a
              href="#hero"
              className="font-mono text-xs uppercase tracking-[0.2em] text-foreground"
            >
              {resume.name.split(" ")[0]}
              <span className="text-accent">.</span>
            </a>
            <ul className="hidden gap-6 font-mono text-[11px] uppercase tracking-wider text-muted-foreground sm:flex">
              <li>
                <a href="#driver" className="hover:text-secondary transition-colors">
                  Profile
                </a>
              </li>
              <li>
                <a
                  href="#architecture"
                  className="hover:text-secondary transition-colors"
                >
                  Stack
                </a>
              </li>
              <li>
                <a
                  href="#projects"
                  className="hover:text-secondary transition-colors"
                >
                  Projects
                </a>
              </li>
              <li>
                <a
                  href="#contact"
                  className="hover:text-secondary transition-colors"
                >
                  Contact
                </a>
              </li>
            </ul>
          </nav>
        </Container>
      </header>

      <main>
        <Hero resume={resume} />
        <About resume={resume} />
        <Architecture resume={resume} />
        <Projects projects={projects} />
        <GitHubFeed projects={feed} />
        <Experience resume={resume} />
        <EducationCerts resume={resume} />
        <Metrics resume={resume} projects={projects} />
        <Contact resume={resume} />
      </main>

      <footer className="border-t border-border py-8">
        <Container>
          <p className="text-center font-mono text-xs text-muted-foreground">
            © {new Date().getFullYear()} {resume.name} · Built with Next.js
          </p>
        </Container>
      </footer>

      <Chatbot />
    </>
  );
}
