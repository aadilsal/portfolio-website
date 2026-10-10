"use client";

import { useEffect, useRef } from "react";
import { motion, useMotionTemplate, useMotionValue, useReducedMotion, useSpring, useTransform } from "motion/react";
import { TILT_SPRING } from "@/components/TiltFrame";

type Layer = { id: string; label: string; count: number; accent?: boolean };

const LEAN = 4; // degrees

/** Four slabs, bottom layer first in source order, so keyboard users get four plain links. */
export function SkillStack({ layers }: { layers: Layer[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const tx = useMotionValue(0);
  const ty = useMotionValue(0);
  const sx = useSpring(tx, TILT_SPRING);
  const sy = useSpring(ty, TILT_SPRING);
  const rotX = useTransform(sy, (n) => 58 + n);
  const rotZ = useTransform(sx, (n) => -38 + n);
  const transform = useMotionTemplate`translate(-50%, -50%) rotateX(${rotX}deg) rotateZ(${rotZ}deg)`;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let timer: ReturnType<typeof setTimeout> | undefined;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        el.dataset.visible = "true";
        // The last layer has stopped after 700ms + 3 × 80ms.
        timer = setTimeout(() => (el.dataset.settled = "true"), 1000);
        io.disconnect();
      },
      { rootMargin: "0px 0px -100px 0px" }
    );
    io.observe(el);
    return () => {
      io.disconnect();
      if (timer) clearTimeout(timer);
    };
  }, []);

  function onMove(e: React.PointerEvent<HTMLDivElement>) {
    if (reduce || e.pointerType !== "mouse") return;
    const r = e.currentTarget.getBoundingClientRect();
    tx.set(((e.clientX - r.left) / r.width - 0.5) * 2 * LEAN);
    ty.set(((e.clientY - r.top) / r.height - 0.5) * -2 * LEAN);
  }
  function onLeave() {
    tx.set(0);
    ty.set(0);
  }

  return (
    <div ref={ref} className="stack" onPointerMove={onMove} onPointerLeave={onLeave}>
      <motion.div className="stack-scene" style={{ transform }}>
        {layers.map((layer, i) => (
          <a
            key={layer.id}
            href={`#skills-${layer.id}`}
            className={layer.accent ? "slab slab-accent" : "slab"}
            style={{ "--i": i } as React.CSSProperties}
            aria-label={`${layer.label}: ${layer.count} skills`}
          >
            <span>{layer.label}</span>
            <span aria-hidden="true">{layer.count}</span>
          </a>
        ))}
      </motion.div>
    </div>
  );
}
