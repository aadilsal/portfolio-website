"use client";

import { useEffect, useRef } from "react";

type Props = {
  children: React.ReactNode;
  className?: string;
  as?: "div" | "ul" | "ol";
  /** Also sets data-settled this many ms after becoming visible (used by the skills stack). */
  settleAfter?: number;
  id?: string;
};

export function Reveal({ children, className = "", as: Tag = "div", settleAfter, id }: Props) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let timer: ReturnType<typeof setTimeout> | undefined;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.dataset.visible = "true";
          if (settleAfter != null) timer = setTimeout(() => (el.dataset.settled = "true"), settleAfter);
          io.disconnect(); // once only
        }
      },
      { rootMargin: "0px 0px -100px 0px" }
    );
    io.observe(el);
    return () => {
      io.disconnect();
      if (timer) clearTimeout(timer);
    };
  }, [settleAfter]);

  return (
    <Tag ref={ref as never} id={id} className={`reveal ${className}`}>
      {children}
    </Tag>
  );
}
