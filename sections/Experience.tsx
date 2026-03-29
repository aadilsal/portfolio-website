"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Container } from "@/components/Container";
import type { Resume } from "@/lib/types";

const inView = {
  once: true,
  amount: 0.15,
  margin: "0px 0px 120px 0px",
} as const;

export function Experience({ resume }: { resume: Resume }) {
  const reduceMotion = useReducedMotion();

  return (
    <section id="experience" className="py-24 scroll-mt-20">
      <Container>
        <div className="mb-10 flex flex-col gap-2">
          <span className="font-mono text-xs uppercase tracking-[0.3em] text-secondary">
            Race history
          </span>
          <h2 className="text-3xl font-semibold tracking-tight">Experience</h2>
          <p className="max-w-2xl text-muted-foreground">
            Roles where I owned delivery across the stack: product-facing
            features, integrations, AI assistants, payments, and performance.
          </p>
        </div>
        <ol className="relative space-y-8 border-l border-border pl-8">
          {resume.experience.map((job, index) => (
            <motion.li
              key={`${job.company}-${index}`}
              initial={reduceMotion ? false : { y: 20, opacity: 1 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={inView}
              transition={{
                duration: reduceMotion ? 0 : 0.4,
                delay: reduceMotion ? 0 : index * 0.08,
              }}
              className="relative"
            >
              <span className="absolute -left-[9px] top-1.5 h-3 w-3 rounded-full border-2 border-background bg-accent shadow-glow" />
              <div className="panel-border p-5 sm:p-6">
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <h3 className="text-lg font-semibold">{job.role}</h3>
                  <span className="font-mono text-xs text-secondary">
                    {job.duration}
                  </span>
                </div>
                <p className="mt-1 font-mono text-sm text-muted-foreground">
                  {job.company}
                </p>
                <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-muted-foreground">
                  {job.points.map((pt) => (
                    <li key={pt}>{pt}</li>
                  ))}
                </ul>
              </div>
            </motion.li>
          ))}
        </ol>
      </Container>
    </section>
  );
}
