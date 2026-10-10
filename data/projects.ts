import type { Project } from "@/lib/types";

const GH = "https://github.com/aadilsal";

export const projects: Project[] = [
  {
    slug: "junket-tours",
    title: "Junket Tours",
    kind: "Client build",
    status: "Live",
    summary: "A tour booking and operations platform for adventure travel in Pakistan.",
    longSummary:
      "A tour booking and operations platform for adventure travel in Pakistan. Guests book without an account, staff run everything from one realtime admin panel, and an AI planner suggests trips from the live catalog.",
    outcomes: [
      "Guests book a tour without creating an account.",
      "Staff run tours, bookings, users and the blog from one realtime admin panel.",
      "An AI trip planner builds itineraries only from tours that are in the catalog.",
    ],
    stack: ["Next.js 14", "Convex", "Groq", "Resend", "Tailwind CSS"],
    links: { live: "https://touragency-wheat.vercel.app", code: `${GH}/TourAgency` },
    cover: {
      type: "image",
      src: "/work/junket-tours/tour.webp",
      alt: "Junket Tours tour page with the itinerary and the booking form",
      width: 1600,
      height: 1000,
    },
    hero: {
      type: "image",
      src: "/work/junket-tours/home.webp",
      alt: "Junket Tours homepage with featured northern Pakistan tours",
      width: 2400,
      height: 1350,
    },
    featured: true,
    caseStudy: {
      role: "Design, frontend, backend and deployment",
      timeline: "Apr 2026 to now",
      scale: "62 commits",
      problem: [
        "Junket Tours sells guided trips across Pakistan. The agency needed one place to publish its tours, take bookings and answer trip questions, run by a small team.",
        "The build had two hard requirements. A visitor must be able to book without signing up, and staff must see a booking the moment it lands.",
      ],
      features: [
        {
          title: "Booking without an account",
          body: "A guest picks a tour and books with one form. Convex actions send the confirmation through Resend and notify staff of each new booking. Customers who do sign up get a dashboard of their trips.",
          media: {
            type: "image",
            src: "/work/junket-tours/tour.webp",
            alt: "A tour page with the guest booking form",
            width: 1600,
            height: 1000,
          },
        },
        {
          title: "A realtime admin panel",
          body: "Staff manage tours, destinations, bookings, users and blog posts in one place. The panel reads from Convex subscriptions, so a new booking appears without a refresh.",
          media: {
            type: "image",
            src: "/work/junket-tours/tours.webp",
            alt: "The tours catalog that staff manage from the admin panel",
            width: 1600,
            height: 1000,
          },
        },
        {
          title: "An AI planner that stays in the catalog",
          body: "The planner runs as a Convex action that calls Groq with the current tour catalog, so it suggests trips the agency actually sells. A request the catalog can't cover is flagged as a custom plan for staff to price.",
          media: {
            type: "image",
            src: "/work/junket-tours/planner.webp",
            alt: "The AI trip planner form filled in for a 7-day northern trip on a mid budget",
            width: 1600,
            height: 1000,
          },
        },
      ],
      diagram: {
        caption: "One Next.js app and one Convex deployment. There is no separate API server to host.",
        nodes: [
          { id: "browser", title: "Browser", note: "guests, customers, staff" },
          { id: "next", title: "Next.js 14 on Vercel", note: "site, dashboard, admin, session cookie" },
          { id: "convex", title: "Convex", note: "database, functions, live subscriptions", accent: true },
          { id: "groq", title: "Groq", note: "AI trip planner" },
          { id: "resend", title: "Resend", note: "booking emails" },
        ],
        edges: [
          ["browser", "next"],
          ["next", "convex"],
          ["convex", "groq"],
          ["convex", "resend"],
        ],
      },
      decisions: [
        {
          title: "Convex instead of a REST API and Postgres",
          why: "The admin panel has to update live. Convex gives the database, server functions and subscriptions in one deployment, so there is no polling and no second service to run.",
          tradeoff: "Trade-off: no SQL for ad hoc reporting, and the backend is tied to one vendor.",
        },
        {
          title: "My own session auth",
          why: "Sessions live in an HTTP-only cookie. Only a hash of the token is stored, in a Convex sessions table, so a leaked table cannot be replayed.",
          tradeoff: "Why not a hosted provider: guests, customers and staff roles all live next to the bookings in one database, with no extra service or per-user bill.",
        },
        {
          title: "A planner that cannot invent tours",
          why: "The model gets the live catalog with every request and must answer with catalog slugs. A made-up itinerary would be a sales problem, so the catalog is the only source.",
          tradeoff: "Trade-off: trips outside the catalog become a custom-plan request that a person prices.",
        },
      ],
      results: [
        { value: "62", label: "commits from first scaffold to the live site" },
        { value: "5", label: "areas run from one admin panel: tours, destinations, bookings, users, blog" },
        { value: "0", label: "accounts needed to book a tour" },
      ],
      next: "dentalai-receptionist",
    },
  },
  {
    slug: "dentalai-receptionist",
    title: "DentalAI Receptionist",
    kind: "My own product",
    status: "Pre-launch",
    summary:
      "An AI receptionist that answers a dental clinic's phone, books the appointment and knows when to hand over to a person.",
    longSummary:
      "An AI receptionist that answers a dental clinic's phone, books the appointment and knows when to hand over to a person. Clinic staff watch every call from a multi-tenant dashboard.",
    outcomes: [
      "Books, reschedules and cancels against Google Calendar during the call.",
      "Hands emergencies, billing disputes and clinical questions to staff.",
      "Writes a summary of every call to a multi-tenant clinic dashboard.",
    ],
    stack: ["Vapi", "Convex", "Next.js", "Google Calendar", "n8n", "Claude API"],
    links: {
      live: "https://voice-receptionist-dentail.vercel.app",
      liveLabel: "Open the product site",
      code: `${GH}/Voice-Receptionist-Dentail`,
    },
    cover: {
      type: "image",
      src: "/work/dentalai-receptionist/hero.webp",
      alt: "DentalAI Receptionist product site: Answer every call. Book every patient.",
      width: 1600,
      height: 1000,
    },
    hero: {
      type: "image",
      src: "/work/dentalai-receptionist/home.webp",
      alt: "DentalAI Receptionist product site homepage",
      width: 2400,
      height: 1350,
    },
    featured: true,
    caseStudy: {
      role: "Product, design, backend and voice flow",
      timeline: "Aug 2026 to now",
      scale: "Multi-tenant from day one",
      problem: [
        "A small dental clinic misses calls while the front desk is busy, and every missed call can be a missed booking. The receptionist has to pick up every time, book correctly and never pretend to be a clinician.",
        "The hard requirements: book against the clinic's real calendar during the call, and hand anything clinical, urgent or about money to a person.",
      ],
      features: [
        {
          title: "Booking by phone",
          body: "Vapi runs the call and invokes tools that are Convex HTTP actions. They check Google Calendar, then book, reschedule or cancel while the patient is still on the line.",
        },
        {
          title: "Knowing when to hand over",
          body: "Emergencies, billing disputes and clinical questions go to staff. The AI's only moves on a clinical question are to answer from the clinic's FAQ or escalate.",
        },
        {
          title: "A dashboard for the clinic",
          body: "Owners and staff see calls, appointments, the knowledge base and AI settings. After each call the Claude API writes a summary, and n8n sends the patient an SMS confirmation.",
          media: {
            type: "image",
            src: "/work/dentalai-receptionist/dashboard.webp",
            alt: "DentalAI product site showing booking slots and a call summary marked Booked",
            width: 1600,
            height: 1000,
          },
        },
      ],
      diagram: {
        caption: "The caller talks to Vapi, Vapi calls Convex, and Convex is the whole backend.",
        nodes: [
          { id: "caller", title: "Caller", note: "patient on the phone" },
          { id: "vapi", title: "Vapi", note: "number, speech, turn-taking" },
          { id: "convex", title: "Convex HTTP actions", note: "tools, webhooks, tenant data", accent: true },
          { id: "gcal", title: "Google Calendar", note: "real availability" },
          { id: "claude", title: "Claude API", note: "call summaries" },
          { id: "n8n", title: "n8n", note: "SMS confirmations" },
        ],
        edges: [
          ["caller", "vapi"],
          ["vapi", "convex"],
          ["convex", "gcal"],
          ["convex", "claude"],
          ["convex", "n8n"],
        ],
      },
      decisions: [
        {
          title: "Vapi instead of a home-made voice stack",
          why: "Telephony, speech-to-text, barge-in and text-to-speech latency are hard real-time problems. Vapi owns them, and my code owns the dental rules.",
          tradeoff: "Trade-off: per-minute cost and less control over the speech pipeline.",
        },
        {
          title: "Convex as the entire backend",
          why: "Queries, mutations, actions and HTTP actions are the backend, so there is no second service to deploy, and the dashboard gets live call lists for free.",
          tradeoff: "Trade-off: no row-level security, so every function enforces the clinic boundary in code.",
        },
        {
          title: "A hard line on what the AI won't do",
          why: "No diagnosis, insurance claims or payments. Anything that needs clinical judgement is escalated to a person.",
          tradeoff: "Trade-off: more calls reach staff than a looser assistant would send.",
        },
      ],
      results: [
        { value: "6", label: "services behind one phone number" },
        { value: "1", label: "backend deployment: Convex" },
        { value: "3", label: "kinds of call always handed to a person" },
      ],
      next: "apexflow",
    },
  },
  {
    slug: "apexflow",
    title: "ApexFlow",
    kind: "Personal project",
    status: "Code and write-up",
    summary:
      "A machine learning pipeline that predicts Formula 1 lap times and retrains itself every race week.",
    longSummary:
      "A machine learning pipeline that predicts Formula 1 lap times and retrains itself every race week. A new model replaces the current one only when it scores better.",
    outcomes: [
      "Airflow retrains weekly on new race data and promotes a model only if it beats the current one.",
      "A FastAPI service returns each prediction with an uncertainty estimate.",
      "Prometheus and Grafana watch accuracy and data drift.",
    ],
    stack: ["Python", "XGBoost", "Airflow", "MLflow", "FastAPI", "Docker"],
    links: { code: `${GH}/ApexFlow` },
    featured: true,
    caseStudy: {
      role: "Data pipeline, modelling, serving and monitoring",
      timeline: "Dec 2025 to Mar 2026",
      scale: "35 commits, 3 Docker images",
      problem: [
        "Lap times shift between practice, qualifying and the race, so a model trained once goes stale within a weekend. A notebook can't keep up with that.",
        "The requirement: retrain on each new race without a person in the loop, and never ship a model that is worse than the one already serving.",
      ],
      features: [
        {
          title: "Versioned, validated data",
          body: "Race data is schema-checked before training and versioned with DVC, so any model can be traced back to the exact data it saw.",
        },
        {
          title: "The weekly retrain-and-promote loop",
          body: "Airflow pulls the latest race, retrains XGBoost and LightGBM models tuned with Optuna, and logs each run to MLflow. A candidate is promoted only if it beats the current model.",
        },
        {
          title: "Inference and monitoring",
          body: "A FastAPI service returns each prediction with an uncertainty estimate to a React dashboard. Prometheus, Grafana and Loki track accuracy and drift.",
        },
      ],
      diagram: {
        caption: "Airflow drives the loop from race data to the dashboard, and Grafana watches every step.",
        nodes: [
          { id: "data", title: "Race data", note: "FastF1" },
          { id: "dvc", title: "Validation and DVC", note: "schema checks, versions" },
          { id: "train", title: "Training", note: "XGBoost, LightGBM, MLflow", accent: true },
          { id: "registry", title: "Model registry", note: "promote if better" },
          { id: "api", title: "FastAPI", note: "prediction plus uncertainty" },
          { id: "dash", title: "Dashboard", note: "React, Grafana" },
        ],
        edges: [
          ["data", "dvc"],
          ["dvc", "train"],
          ["train", "registry"],
          ["registry", "api"],
          ["api", "dash"],
        ],
      },
      decisions: [
        {
          title: "Promote only on improvement",
          why: "Automatic retraining is only safe if a worse model can never replace a better one. Every candidate is scored against the current model before promotion.",
          tradeoff: "Trade-off: a sudden regime change can leave an older model serving until a new one wins.",
        },
        {
          title: "Report uncertainty with each prediction",
          why: "A lap time without a range invites false precision. Each prediction comes with an interval so a reader knows how far to trust it.",
          tradeoff: "Trade-off: more compute per request and a more complex response.",
        },
        {
          title: "Free-tier deployment across three hosts",
          why: "The dashboard is on Vercel, the API on Render and the database on Supabase, which keeps the whole system free to run.",
          tradeoff: "Trade-off: cold starts on the API and three dashboards to watch.",
        },
      ],
      results: [
        { value: "3", label: "Docker images: pipeline, inference and dashboard" },
        { value: "35", label: "commits" },
        { value: "Weekly", label: "retrain on the latest race" },
      ],
      next: "junket-tours",
    },
  },

  // More work
  {
    slug: "researchos",
    title: "ResearchOS",
    kind: "Personal project",
    status: "Live",
    summary: "Four AI agents plan, search, read and write a research report while you watch the progress live.",
    outcomes: [],
    stack: ["Next.js 14", "Convex", "LangGraph", "Clerk"],
    links: { live: "https://research-os-taupe.vercel.app", code: `${GH}/ResearchOS` },
    featured: false,
  },
  {
    slug: "insightos",
    title: "InsightOS",
    kind: "Personal project",
    status: "Code only",
    summary: "Ask a question in plain English and get a read-only SQL query and a finance-style summary back.",
    outcomes: [],
    stack: ["TypeScript", "SQL", "LLM"],
    links: { code: `${GH}/Insight-OS` },
    featured: false,
  },
  {
    slug: "churn-predictor",
    title: "Churn Predictor",
    kind: "Personal project",
    status: "Code only",
    summary: "Churn risk scores with the reasons behind each one, served over an API with a dashboard.",
    outcomes: [],
    stack: ["XGBoost", "SHAP", "FastAPI", "Streamlit"],
    links: { code: `${GH}/Churn-Predictor` },
    featured: false,
  },
  {
    slug: "fairplay",
    title: "FairPlay Review System",
    kind: "Personal project",
    status: "Code only",
    summary:
      "Computer vision for cricket reviews: ball tracking, batsman tracking, wicket detection and pose estimation.",
    outcomes: [],
    stack: ["Python", "Computer vision"],
    links: { code: `${GH}/FairPlayReviewSystem` },
    featured: false,
  },
  {
    slug: "jobfinder",
    title: "JobFinder",
    kind: "Personal project",
    status: "Code only",
    summary:
      "Scans 15 job sources, scores each role against a CV and drafts the application for the ones worth sending.",
    outcomes: [],
    stack: ["Python", "Claude API"],
    links: { code: `${GH}/JobFinder` },
    featured: false,
  },
  {
    slug: "saas-starter",
    title: "SaaS Starter",
    kind: "Personal project",
    status: "Code only",
    summary: "A Next.js starter with auth, Stripe subscriptions, teams, emails and an admin panel already wired up.",
    outcomes: [],
    stack: ["TypeScript", "Supabase", "Stripe"],
    links: { code: `${GH}/Next.js-Supabase-SaaS-Boilerplate-with-Stripe-Auth` },
    featured: false,
  },
];

export const flagships = projects.filter((p) => p.featured);
export const moreWork = projects.filter((p) => !p.featured);

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}
