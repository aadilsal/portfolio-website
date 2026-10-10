"use client";

import { motion, useMotionTemplate, useMotionValue, useReducedMotion, useSpring } from "motion/react";

export const TILT_SPRING = { stiffness: 158, damping: 20, mass: 1 }; // duration 0.5s, bounce 0.2
const MAX = 5; // degrees

export function TiltFrame({ children, className }: { children: React.ReactNode; className?: string }) {
  const reduce = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(y, TILT_SPRING);
  const rotateY = useSpring(x, TILT_SPRING);
  const transform = useMotionTemplate`perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;

  function onMove(e: React.PointerEvent<HTMLDivElement>) {
    if (reduce || e.pointerType !== "mouse") return; // no tilt on touch
    const r = e.currentTarget.getBoundingClientRect();
    x.set(((e.clientX - r.left) / r.width - 0.5) * 2 * MAX);
    y.set(((e.clientY - r.top) / r.height - 0.5) * -2 * MAX);
  }
  function onLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.div className={className} onPointerMove={onMove} onPointerLeave={onLeave} style={{ transform }}>
      {children}
    </motion.div>
  );
}
