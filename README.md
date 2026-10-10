# Aadil Salman Butt, portfolio

A proof-first portfolio: a homepage with three flagship builds, a skills matrix where every level has evidence, and a case study page per flagship. A Groq-backed assistant in the hero answers questions about the work and cites where each answer comes from.

Live: https://aadilsalmanportfolio.vercel.app

## Stack

- Next.js 14 App Router, TypeScript, Tailwind CSS
- Motion (`motion/react`) for the two pointer-driven springs: screenshot tilt and the skills stack lean. Everything else is CSS.
- `next-view-transitions` for the screenshot morph from the homepage to a case study
- Groq (`openai/gpt-oss-120b`, falling back to `openai/gpt-oss-20b`) streamed through `POST /api/chat`
- Vercel Analytics for page views and five events: résumé download, case study view, live site click, assistant question, contact click

## Content

All copy is hand-written data, not pulled from GitHub.

| File | What it holds |
|------|---------------|
| `data/resume.json` | Hero copy, proof strip, experience, about, education, contact |
| `data/projects.ts` | Flagship projects with their case studies, plus the "More work" cards |
| `data/skills.ts` | Skill rows: level, tier and proof |
| `public/work/<slug>/*.webp` | Screenshots |
| `public/resume.pdf` | The downloadable résumé |

The assistant's system prompt is built from the same three data files (`lib/assistant.ts`), so the site and the assistant can't drift apart.

## Routes

`/`, `/work/junket-tours`, `/work/dentalai-receptionist`, `/work/apexflow`, `/resume.pdf`, `/api/chat`, `/opengraph-image`, `/sitemap.xml`, `/robots.txt`

## Develop

```bash
npm install
cp .env.example .env.local   # add GROQ_API_KEY
npm run dev
```

`npm run build`, `npm run start` and `npm run lint` work as usual.

## Environment variables

| Variable | Required | Purpose |
|----------|----------|---------|
| `GROQ_API_KEY` | For the assistant | Groq key for `/api/chat` |
| `GROQ_MODEL` | No | Override the default model |
| `NEXT_PUBLIC_SITE_URL` | No | Canonical address; defaults to `siteUrl` in `data/resume.json` |
