import { About } from "@/sections/About";
import { Contact } from "@/sections/Contact";
import { Experience } from "@/sections/Experience";
import { Hero } from "@/sections/Hero";
import { ProofStrip } from "@/sections/ProofStrip";
import { Skills } from "@/sections/Skills";
import { Work } from "@/sections/Work";

export default function Home() {
  return (
    <main id="content">
      <Hero />
      <ProofStrip />
      <Work />
      <Skills />
      <Experience />
      <About />
      <Contact />
    </main>
  );
}
