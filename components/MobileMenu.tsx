"use client";

import { useEffect, useRef, useState } from "react";

type Props = {
  items: { href: string; label: string }[];
  resumeHref: string;
};

export function MobileMenu({ items, resumeHref }: Props) {
  const [open, setOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    panelRef.current?.querySelector<HTMLElement>("a")?.focus();
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") close();
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  function close() {
    setOpen(false);
    buttonRef.current?.focus();
  }

  return (
    <div className="md:hidden">
      <button
        ref={buttonRef}
        type="button"
        className="btn h-11 border border-line-strong px-4 text-[14px]"
        aria-expanded={open}
        aria-controls="mobile-menu"
        onClick={() => setOpen((o) => !o)}
      >
        {open ? "Close" : "Menu"}
      </button>
      <div
        ref={panelRef}
        id="mobile-menu"
        data-open={open}
        inert={!open ? ("" as unknown as boolean) : undefined}
        className="menu-panel absolute inset-x-0 top-16 border-b border-line bg-bg"
      >
        <nav aria-label="Mobile" className="page flex flex-col py-4">
          {items.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={close}
              className="flex min-h-[52px] items-center border-b border-line text-[18px] last:border-0"
            >
              {item.label}
            </a>
          ))}
          <a
            href={resumeHref}
            download
            data-event="resume_download"
            onClick={close}
            className="btn btn-secondary mt-4 w-full"
          >
            Download résumé
          </a>
        </nav>
      </div>
    </div>
  );
}
