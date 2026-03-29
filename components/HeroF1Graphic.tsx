import Image from "next/image";
import { Hand } from "lucide-react";
import type { Resume } from "@/lib/types";

function initialsFromName(name: string) {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "?";
  if (parts.length === 1) return parts[0]!.slice(0, 2).toUpperCase();
  return (
    parts[0]![0]! + parts[parts.length - 1]![0]!
  ).toUpperCase();
}

export function HeroF1Graphic({ resume }: { resume: Resume }) {
  const avatarSrc = resume.heroAvatar?.trim();
  const isRemoteAvatar = Boolean(
    avatarSrc?.startsWith("http://") || avatarSrc?.startsWith("https://")
  );

  return (
    <div
      className="pointer-events-none flex w-full flex-col items-end justify-center gap-6 text-muted-foreground"
      aria-hidden
    >
      <div className="panel-border w-full max-w-[300px] space-y-4 p-4 font-mono text-[10px] uppercase tracking-wider">
        <div className="flex items-center justify-between text-foreground/90">
          <span className="text-muted-foreground">Telemetry</span>
          <span className="text-secondary">Live</span>
        </div>

        <div className="grid grid-cols-3 gap-2 border-t border-border pt-3 text-center">
          {[
            { label: "S1", value: "24.18", tone: "text-foreground" },
            { label: "S2", value: "38.02", tone: "text-secondary" },
            { label: "S3", value: "22.71", tone: "text-foreground" },
          ].map((s) => (
            <div key={s.label}>
              <p className="text-muted-foreground">{s.label}</p>
              <p className={`tabular-nums text-xs font-semibold ${s.tone}`}>
                {s.value}
              </p>
            </div>
          ))}
        </div>

        <div className="flex justify-between gap-4 border-t border-border pt-3">
          <div>
            <p className="text-muted-foreground">Current</p>
            <p className="text-sm font-semibold tabular-nums text-foreground">
              1:24.892
            </p>
          </div>
          <div className="text-right">
            <p className="text-muted-foreground">Best</p>
            <p className="text-sm font-semibold tabular-nums text-secondary">
              1:24.105
            </p>
          </div>
        </div>

        <div className="flex justify-between gap-4 border-t border-border pt-3">
          <div>
            <p className="text-muted-foreground">Gear</p>
            <p className="text-lg font-semibold tabular-nums text-foreground">7</p>
          </div>
          <div className="text-right">
            <p className="text-muted-foreground">Delta</p>
            <p className="tabular-nums text-secondary">-0.042</p>
          </div>
        </div>

        <div className="border-t border-border pt-3">
          <div className="mb-1.5 flex justify-between">
            <span className="text-muted-foreground">ERS</span>
            <span className="tabular-nums text-foreground/80">Deploy</span>
          </div>
          <div className="h-1.5 overflow-hidden rounded-full bg-border">
            <div className="hero-f1-ers h-full w-[72%] rounded-full bg-gradient-to-r from-secondary to-accent" />
          </div>
        </div>

        <div className="relative h-12 w-full border-t border-border pt-3">
          <svg
            className="h-full w-full overflow-visible"
            viewBox="0 0 120 40"
            fill="none"
            aria-hidden
          >
            <path
              d="M4 32 A 52 52 0 0 1 108 32"
              className="text-border"
              stroke="currentColor"
              strokeWidth="3"
              strokeLinecap="round"
            />
            <path
              d="M4 32 A 52 52 0 0 1 108 32"
              className="hero-f1-rpm-sweep text-accent"
              stroke="currentColor"
              strokeWidth="3"
              strokeLinecap="round"
              strokeDasharray="82"
              strokeDashoffset="24"
            />
          </svg>
          <p className="absolute bottom-0 left-0 right-0 text-center text-[9px] text-muted-foreground">
            RPM
          </p>
        </div>
      </div>

      <div className="panel-border flex w-full max-w-[300px] items-center gap-4 p-4">
        <div className="relative h-16 w-16 shrink-0">
          {avatarSrc ? (
            <Image
              src={avatarSrc}
              alt=""
              width={64}
              height={64}
              unoptimized={isRemoteAvatar}
              className="h-16 w-16 rounded-full border border-border object-cover"
            />
          ) : (
            <div
              className="flex h-16 w-16 items-center justify-center rounded-full border border-border bg-card font-mono text-lg font-semibold text-accent"
              aria-hidden
            >
              {initialsFromName(resume.name)}
            </div>
          )}
          <Hand
            className="hero-f1-wave absolute -bottom-0.5 -right-1 h-6 w-6 text-secondary"
            strokeWidth={2}
            aria-hidden
          />
        </div>
        <div className="min-w-0 font-mono text-[10px] uppercase tracking-wider">
          <p className="text-muted-foreground">Pit wall</p>
          <p className="truncate text-foreground/90">Driver on track</p>
        </div>
      </div>
    </div>
  );
}
