"use client";

import { track } from "@vercel/analytics";
import { useEffect } from "react";

/**
 * One delegated listener for the five tracked events. Links opt in with
 * data-event="resume_download | live_site_click | contact_click | case_study_view"
 * and an optional data-label.
 */
export function TrackClicks() {
  useEffect(() => {
    function onClick(e: MouseEvent) {
      const el = (e.target as HTMLElement | null)?.closest<HTMLElement>("[data-event]");
      if (!el?.dataset.event) return;
      track(el.dataset.event, el.dataset.label ? { label: el.dataset.label } : undefined);
    }
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);
  return null;
}
