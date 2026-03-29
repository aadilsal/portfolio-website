"use client";

import { useEffect, useState } from "react";

type Props = { text: string };

export function HeroTyping({ text }: Props) {
  const [i, setI] = useState(0);

  useEffect(() => {
    setI(0);
    if (!text.length) return;
    const id = window.setInterval(() => {
      setI((n) => {
        if (n >= text.length - 1) {
          window.clearInterval(id);
          return text.length;
        }
        return n + 1;
      });
    }, 42);
    return () => window.clearInterval(id);
  }, [text]);

  return (
    <p className="font-mono text-sm text-secondary min-h-[1.35rem] tracking-wide">
      <span className="text-secondary">{text.slice(0, i)}</span>
      <span
        className="ml-0.5 inline-block h-4 w-0.5 animate-blink bg-secondary align-middle"
        aria-hidden
      />
    </p>
  );
}
