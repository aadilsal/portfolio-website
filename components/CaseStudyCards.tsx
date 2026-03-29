"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { CaseStudy } from "@/lib/types";

const viewport = {
  once: true,
  amount: 0.1,
  margin: "0px 0px 80px 0px",
} as const;

export function CaseStudyCards({ studies }: { studies: CaseStudy[] }) {
  const reduceMotion = useReducedMotion();

  return (
    <div className="grid gap-6 md:grid-cols-2">
      {studies.map((s, index) => (
        <motion.article
          key={s.repo}
          initial={reduceMotion ? false : { y: 12, opacity: 1 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={viewport}
          transition={{
            duration: reduceMotion ? 0 : 0.35,
            delay: reduceMotion ? 0 : index * 0.06,
          }}
          className="panel-border flex h-full flex-col p-6 sm:p-7"
        >
          <div className="mb-4 flex flex-wrap items-start justify-between gap-2">
            <div>
              <h3 className="text-lg font-semibold tracking-tight">{s.title}</h3>
              <p className="mt-1 font-mono text-xs text-secondary">{s.tagline}</p>
            </div>
            <span className="shrink-0 rounded border border-border px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
              {s.category}
            </span>
          </div>
          <dl className="space-y-4 text-sm text-muted-foreground">
            <div>
              <dt className="font-mono text-[10px] uppercase tracking-wider text-foreground/70">
                Context
              </dt>
              <dd className="mt-1 leading-relaxed">{s.problem}</dd>
            </div>
            <div>
              <dt className="font-mono text-[10px] uppercase tracking-wider text-foreground/70">
                My role
              </dt>
              <dd className="mt-1 leading-relaxed">{s.role}</dd>
            </div>
            <div>
              <dt className="font-mono text-[10px] uppercase tracking-wider text-foreground/70">
                Execution
              </dt>
              <dd className="mt-1 leading-relaxed">{s.approach}</dd>
            </div>
            <div>
              <dt className="font-mono text-[10px] uppercase tracking-wider text-foreground/70">
                Results
              </dt>
              <dd className="mt-1 leading-relaxed">{s.outcome}</dd>
            </div>
          </dl>
          <div className="mt-5 flex flex-wrap gap-2">
            {s.stack.map((tech) => (
              <span
                key={tech}
                className="rounded bg-accent/10 px-2 py-0.5 font-mono text-[11px] text-accent"
              >
                {tech}
              </span>
            ))}
          </div>
          <div className="mt-6 pt-4 border-t border-border">
            <Button variant="outline" size="sm" asChild>
              <a
                href={s.repoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2"
              >
                View repository
                <ExternalLink className="h-3.5 w-3.5" />
              </a>
            </Button>
          </div>
        </motion.article>
      ))}
    </div>
  );
}
