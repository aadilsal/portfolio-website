import type { Metadata } from "next";
import { IBM_Plex_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import resumeData from "@/data/resume.json";
import { resolveContact } from "@/lib/contact";
import type { Resume } from "@/lib/types";

const resume = resumeData as Resume;
const contact = resolveContact(resume);

const fontSans = IBM_Plex_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const fontMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: {
    default: `${resume.name} — ${resume.role}`,
    template: `%s — ${resume.name}`,
  },
  description: resume.summary,
  openGraph: {
    title: `${resume.name} — ${resume.role}`,
    description: resume.summary,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${resume.name} — ${resume.role}`,
    description: resume.summary,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: resume.name,
  jobTitle: resume.role,
  description: resume.summary,
  ...(contact.github ? { url: contact.github } : {}),
  sameAs: [contact.github, contact.linkedin].filter(
    (x): x is string => Boolean(x)
  ),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${fontSans.variable} ${fontMono.variable} font-sans min-h-screen grid-overlay`}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}
