import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./sections/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: "#0D0E10",
        surface: { DEFAULT: "#15171A", raised: "#24282E" },
        line: { DEFAULT: "#2A2E34", strong: "#3A3F47" },
        text: { DEFAULT: "#F1F2F3", muted: "#A3A9B1", dim: "#858C95" },
        accent: "#FF6A3D",
        live: "#5BD68A",
      },
      fontFamily: {
        display: ["var(--font-bricolage)", "Helvetica Neue", "sans-serif"],
        sans: ["var(--font-plex)", "Segoe UI", "system-ui", "sans-serif"],
        mono: ["var(--font-jetbrains)", "ui-monospace", "monospace"],
      },
      maxWidth: { page: "1200px" },
    },
  },
  plugins: [],
};
export default config;
