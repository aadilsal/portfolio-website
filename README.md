# Aadil Portfolio — AI Systems Dashboard

High-performance personal portfolio: F1-inspired dark UI, JSON-driven resume, GitHub projects with ISR, and a Groq-powered chat assistant.

## Tech stack

- [Next.js 14](https://nextjs.org/) (App Router, Server Components)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/) + [tailwindcss-animate](https://github.com/jamiebuilds/tailwindcss-animate)
- [shadcn/ui](https://ui.shadcn.com/)-style primitives (Radix: Dialog, Scroll Area)
- [Framer Motion](https://www.framer.com/motion/) (scoped to modals, timelines, chat)
- [Groq](https://groq.com/) OpenAI-compatible API (`mixtral-8x7b-32768`)
- [GitHub REST API](https://docs.github.com/en/rest)

## Features

- **Hero** with typing line and anchor CTAs  
- **Driver profile** (About) and **system architecture** (skills grid) from `data/resume.json`  
- **Projects**: merged GitHub repos + `data/projects-meta.json` (featured, titles, categories, sort)  
- **Live GitHub feed** (recently updated repos)  
- **Experience** timeline and **education / certifications**  
- **Metrics** derived from resume + repo list  
- **Contact** with mail and social links  
- **Floating chatbot** → `POST /api/chat` (resume-grounded system prompt)

## Project structure

```text
app/
  layout.tsx          # Fonts (next/font), metadata, JSON-LD
  page.tsx            # Composes sections; lazy-loads Chatbot
  globals.css         # Design tokens & utilities
  api/github/route.ts # GET merged repos (shared lib + ISR)
  api/chat/route.ts   # POST Groq assistant
components/           # UI + Chatbot + ProjectShowcase
sections/             # Page sections (mostly Server Components)
data/
  resume.json         # Copy, skills, experience, contact
  projects-meta.json  # Per-repo overrides (key = repo name lowercased)
lib/
  github.ts           # Fetch user repos, 24h revalidate
  projects.ts         # Merge + sort
  ai.ts               # Groq client + resume context
```

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

```bash
npm run build   # production build
npm run start   # run production server
npm run lint    # ESLint
```

## Environment variables

Copy [`.env.example`](.env.example) to `.env.local` and set:

| Variable | Required | Purpose |
|----------|----------|---------|
| `GROQ_API_KEY` | For chat | Groq API key for `/api/chat` |
| `GITHUB_TOKEN` | Optional | Higher GitHub API rate limits (recommended in production) |
| `NEXT_PUBLIC_GITHUB_USER` | Optional | GitHub username for repos (default: `aadilsal`) |

## Editing content

- **Bio, skills, jobs, education, contact**: edit [`data/resume.json`](data/resume.json).  
- **Project titles, featured flag, category, priority**: edit [`data/projects-meta.json`](data/projects-meta.json) (object keys must match repository names in lowercase).

## Performance notes

- GitHub data uses `fetch` with `next: { revalidate: 86400 }` (ISR, 24 hours).  
- Chatbot is loaded with `dynamic(..., { ssr: false })` so it is not in the initial server HTML.  
- Prefer Tailwind/CSS motion; Framer Motion is limited to interactive or scroll-revealed slices.

## Deploy on Vercel

1. Push the repo to GitHub and import the project in [Vercel](https://vercel.com/new).  
2. Add `GROQ_API_KEY` and optionally `GITHUB_TOKEN` / `NEXT_PUBLIC_GITHUB_USER` in **Project → Settings → Environment Variables**.  
3. After you have a production URL, you can set `metadataBase` in [`app/layout.tsx`](app/layout.tsx) (or `NEXT_PUBLIC_SITE_URL` if you extend metadata) so Open Graph URLs resolve correctly.

## License

Private / personal portfolio — adjust as you prefer.
