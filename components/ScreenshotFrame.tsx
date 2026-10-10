import Image from "next/image";
import type { Media } from "@/lib/types";

type Props = {
  media: Media;
  /** Shared name for the homepage-to-case-study morph */
  transitionName?: string;
  sizes: string;
  priority?: boolean;
  ratio?: "16/10" | "16/9";
  /** Clip-path reveal from the bottom edge when inside a <Reveal> */
  revealClip?: boolean;
};

export function ScreenshotFrame({ media, transitionName, sizes, priority, ratio = "16/10", revealClip }: Props) {
  return (
    <div
      className={`relative overflow-hidden rounded-xl border border-line bg-surface ${revealClip ? "reveal-clip" : ""}`}
      style={{ aspectRatio: ratio }}
    >
      {media.type === "video" ? (
        <video
          src={media.src}
          aria-label={media.alt}
          className="h-full w-full object-cover"
          muted
          loop
          playsInline
          autoPlay
          preload="none"
        />
      ) : (
        <Image
          src={media.src}
          alt={media.alt}
          fill
          sizes={sizes}
          priority={priority}
          className="object-cover object-top"
          style={transitionName ? { viewTransitionName: transitionName } : undefined}
        />
      )}
    </div>
  );
}
