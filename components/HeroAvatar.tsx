import Image from "next/image";
import { cn } from "@/lib/utils";
import type { Resume } from "@/lib/types";

function initialsFromName(name: string) {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "?";
  if (parts.length === 1) return parts[0]!.slice(0, 2).toUpperCase();
  return (
    parts[0]![0]! + parts[parts.length - 1]![0]!
  ).toUpperCase();
}

type Props = {
  resume: Resume;
  className?: string;
  /** Larger image request for hero LCP */
  priority?: boolean;
};

export function HeroAvatar({ resume, className, priority }: Props) {
  const avatarSrc = resume.heroAvatar?.trim();
  const isRemoteAvatar = Boolean(
    avatarSrc?.startsWith("http://") || avatarSrc?.startsWith("https://")
  );

  return (
    <div
      className={cn(
        "relative shrink-0 overflow-hidden rounded-full border border-border/70 bg-card ring-2 ring-secondary/20 ring-offset-2 ring-offset-background",
        "h-24 w-24 sm:h-28 sm:w-28 md:h-32 md:w-32",
        className
      )}
    >
      {avatarSrc ? (
        <Image
          src={avatarSrc}
          alt=""
          width={256}
          height={256}
          priority={priority}
          unoptimized={isRemoteAvatar}
          className="h-full w-full object-cover"
        />
      ) : (
        <div
          className="flex h-full w-full items-center justify-center font-mono text-xl font-semibold text-accent sm:text-2xl"
          aria-hidden
        >
          {initialsFromName(resume.name)}
        </div>
      )}
    </div>
  );
}
