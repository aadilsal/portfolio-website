import { ImageResponse } from "next/og";
import { resume } from "@/lib/site";

export const runtime = "edge";
export const alt =`${resume.name}, ${resume.role}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          background: "#0D0E10",
          color: "#F1F2F3",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16, fontSize: 26, color: "#A3A9B1" }}>
          <div style={{ width: 14, height: 14, borderRadius: 7, background: "#5BD68A" }} />
          {resume.name} · {resume.role}
        </div>
        <div style={{ display: "flex", flexDirection: "column", fontSize: 86, fontWeight: 700, lineHeight: 1.02, letterSpacing: -3 }}>
          <span>{resume.headline}</span>
          <span style={{ color: "#FF6A3D" }}>{resume.headlineAccent}</span>
        </div>
        <div style={{ display: "flex", fontSize: 26, color: "#858C95" }}>
          Next.js · Node · Python · Lahore, Pakistan
        </div>
      </div>
    ),
    size
  );
}
