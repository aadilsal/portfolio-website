"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ExternalLink, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import type { MergedProject } from "@/lib/types";

const showcaseViewport = {
  once: true,
  amount: 0.12,
  margin: "0px 0px 100px 0px",
} as const;

export function ProjectShowcase({ projects }: { projects: MergedProject[] }) {
  const [openId, setOpenId] = useState<number | null>(null);
  const reduceMotion = useReducedMotion();

  return (
    <div className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory md:grid md:grid-cols-2 md:overflow-visible lg:grid-cols-3">
      {projects.map((p, index) => (
        <motion.article
          key={p.id}
          initial={reduceMotion ? false : { y: 14, opacity: 1 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={showcaseViewport}
          transition={{
            duration: reduceMotion ? 0 : 0.35,
            delay: reduceMotion ? 0 : index * 0.05,
          }}
          className="snap-start shrink-0 w-[min(100%,320px)] md:w-auto"
        >
          <div className="panel-border flex h-full flex-col p-5 transition-shadow hover:shadow-glow">
            <div className="mb-3 flex items-start justify-between gap-2">
              <h3 className="font-semibold leading-snug pr-2">
                {p.displayTitle}
              </h3>
              {p.meta?.featured && (
                <span className="shrink-0 rounded bg-accent/15 px-2 py-0.5 text-[10px] font-mono uppercase tracking-wider text-accent">
                  Featured
                </span>
              )}
            </div>
            {p.category && (
              <p className="mb-2 font-mono text-xs text-secondary">{p.category}</p>
            )}
            <p className="mb-4 flex-1 text-sm text-muted-foreground line-clamp-3">
              {p.description || "No description provided."}
            </p>
            <div className="mb-4 flex flex-wrap gap-1.5">
              {(p.topics ?? []).slice(0, 5).map((t) => (
                <span
                  key={t}
                  className="rounded border border-border px-2 py-0.5 text-[11px] text-muted-foreground"
                >
                  {t}
                </span>
              ))}
              {p.language && !(p.topics ?? []).length && (
                <span className="rounded border border-border px-2 py-0.5 text-[11px] text-muted-foreground">
                  {p.language}
                </span>
              )}
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <span className="flex items-center gap-1 text-xs text-muted-foreground">
                <Star className="h-3.5 w-3.5" />
                {p.stargazers_count}
              </span>
              <Dialog
                open={openId === p.id}
                onOpenChange={(o) => setOpenId(o ? p.id : null)}
              >
                <DialogTrigger asChild>
                  <Button variant="outline" size="sm" className="flex-1 md:flex-none">
                    Details
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-h-[85vh] overflow-y-auto border-border bg-card">
                  <DialogHeader>
                    <DialogTitle>{p.displayTitle}</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4 text-left text-sm text-muted-foreground">
                    <p>{p.description || "No description."}</p>
                    <div className="flex flex-wrap gap-2">
                      {(p.topics ?? []).map((t) => (
                        <span
                          key={t}
                          className="rounded border border-border px-2 py-0.5 text-xs"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                    <a
                      href={p.html_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-sm text-secondary hover:underline"
                    >
                      Open on GitHub
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  </div>
                </DialogContent>
              </Dialog>
              <Button variant="ghost" size="sm" asChild>
                <a href={p.html_url} target="_blank" rel="noopener noreferrer">
                  Repo
                </a>
              </Button>
            </div>
          </div>
        </motion.article>
      ))}
    </div>
  );
}
