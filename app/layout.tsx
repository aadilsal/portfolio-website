import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque, IBM_Plex_Sans, JetBrains_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import { ViewTransitions } from "next-view-transitions";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { TrackClicks } from "@/components/TrackClicks";
import { links, resume, siteUrl } from "@/lib/site";

const fontPlex = IBM_Plex_Sans({
  subsets: ["latin"],
  variable: "--font-plex",
  display: "swap",
  weight: ["400", "500", "600"],
});

const fontJetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
  weight: ["400"],
});

const fontBricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-bricolage",
  display: "swap",
  weight: ["600", "700"],
});

const title = `${resume.name}, ${resume.role}`;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: title, template: `%s, ${resume.name}` },
  description: resume.metaDescription,
  alternates: { canonical: "/" },
  openGraph: {
    title,
    description: resume.metaDescription,
    url: "/",
    siteName: resume.name,
    type: "website",
  },
  twitter: { card: "summary_large_image", title, description: resume.metaDescription },
};

export const viewport: Viewport = { themeColor: "#0D0E10" };

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: resume.name,
  jobTitle: resume.role,
  url: siteUrl,
  email: `mailto:${resume.contact.email}`,
  address: { "@type": "PostalAddress", addressLocality: "Lahore", addressCountry: "PK" },
  alumniOf: { "@type": "CollegeOrUniversity", name: "FAST-NUCES Lahore" },
  sameAs: [links.github, links.linkedin],
};

// Keeps every revealed block readable when JavaScript is off.
const noscriptCss =
  ".reveal>*{opacity:1!important;transform:none!important}.reveal-clip{clip-path:none!important}.level-fill{transform:scaleX(var(--level))!important}.flow-arrow path{stroke-dashoffset:0!important}.slab{transform:translateZ(calc(var(--i) * 60px))!important}";

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <ViewTransitions>
      <html lang="en">
        <head>
          <noscript>
            <style>{noscriptCss}</style>
          </noscript>
        </head>
        <body
          className={`${fontPlex.variable} ${fontJetbrains.variable} ${fontBricolage.variable} min-h-screen bg-bg font-sans text-[17px] leading-[1.6] text-text`}
        >
          <a
            href="#content"
            className="sr-only z-50 rounded-lg bg-accent px-4 py-3 font-semibold text-bg focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
          >
            Skip to content
          </a>
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
          />
          <Header />
          {children}
          <Footer />
          <TrackClicks />
          <Analytics />
        </body>
      </html>
    </ViewTransitions>
  );
}
