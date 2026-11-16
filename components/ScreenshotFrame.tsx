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
  const contain = media.fit === "contain";
  // Portrait media (a phone-shaped launch video) keeps its own shape and a narrower frame.
  const portrait = media.height > media.width;
  return (
    <div
      className={`relative overflow-hidden rounded-xl border border-line bg-surface ${portrait ? "mx-auto max-w-[400px]" : ""} ${revealClip ? "reveal-clip" : ""}`}
      style={{ aspectRatio: portrait ? `${media.width}/${media.height}` : ratio, background: media.background }}
    >
      {media.type === "video" && media.controls ? (
        <video
          src={media.src}
          poster={media.poster}
          aria-label={media.alt}
          className="h-full w-full bg-black object-contain"
          controls
          playsInline
          preload="metadata"
        />
      ) : media.type === "video" ? (
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
          className={contain ? "object-contain object-top" : "object-cover object-top"}
          style={transitionName ? { viewTransitionName: transitionName } : undefined}
        />
      )}
    </div>
  );
}
