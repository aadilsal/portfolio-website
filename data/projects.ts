import type { Project } from "@/lib/types";

const GH = "https://github.com/aadilsal";

const LAAS = "/work/local-ai-anti-spam";

export const projects: Project[] = [
  {
    slug: "local-ai-anti-spam",
    title: "Local AI Anti-Spam",
    kind: "My own product",
    status: "Beta",
    summary:
      "A WordPress plugin that filters contact-form spam with a machine-learning model running on the site's own server.",
    longSummary:
      "A WordPress plugin that filters contact-form and comment spam with a model I trained in Python and run in plain PHP. No CAPTCHA, no API key, and no message ever leaves the site.",
    outcomes: [
      "Scores every Contact Form 7, WPForms and comment submission locally, in 3.5 ms at worst.",
      "Holds spam in a 30-day quarantine. One click delivers a real message, notification email included.",
      "Shows the score and the words behind every verdict.",
    ],
    stack: ["Python", "scikit-learn", "PHP", "WordPress", "MiniLM", "GitHub Actions"],
    links: { code: `${GH}/Local-AI-Anti-Spam` },
    cover: {
      type: "image",
      src: `${LAAS}/cover.png`,
      alt: "The plugin's quarantine page in wp-admin, listing six held spam messages with their scores and the words that drove each verdict",
      width: 2880,
      height: 1800,
    },
    hero: {
      type: "video",
      src: `${LAAS}/demo.mp4`,
      poster: `${LAAS}/poster.png`,
      controls: true,
      alt: "A 47-second narrated demo of Local AI Anti-Spam",
      width: 1920,
      height: 1080,
      transcript: [
        "Contact form spam, stopped on your own server.",
        "Small businesses lose real leads to spam filters. CAPTCHAs annoy customers, and cloud filters read every message.",
        "Local AI Anti-Spam holds spam in a quarantine. Nothing is deleted, and one click delivers anything real.",
        "Every decision shows its score and the words behind it.",
        "On a test site, six of six genuine enquiries got through. Six of seven spam messages were held, and the unsure one was delivered with a warning tag.",
        "The model was trained from scratch in Python, and runs inside WordPress in PHP, matching to four decimal places.",
        "Free, private, and open source. Now in beta.",
      ],
    },
    featured: true,
    caseStudy: {
      role: "Product, data, model training, PHP plugin and CI",
      timeline: "Oct 2026 to now",
      scale: "Beta 0.1.0, CI on PHP 7.4 to 8.3",
      problem: [
        "Contact-form spam is now written by cheap language models: fluent, unique enquiries that pass CAPTCHAs, honeypots and keyword rules. The filters that can read them, like Akismet and CleanTalk, send every visitor's message to their own cloud and charge per check.",
        "I wanted a filter that reads the message, runs on ordinary shared hosting, sends nothing off the site and never silently loses a real lead.",
      ],
      features: [
        {
          title: "A quarantine instead of a delete button",
          body: "Spam is held for 30 days, never deleted on arrival. Releasing a message delivers it exactly as it would have been, notification email included, and can add the sender to an allow list. If anything fails, such as a missing model file, the message is delivered.",
          media: {
            type: "image",
            src: `${LAAS}/quarantine.png`,
            alt: "Quarantine list with sender, message, form, score and the words behind each verdict",
            width: 2520,
            height: 1596,
          },
        },
        {
          title: "Every verdict explains itself",
          body: "Each held message shows its score, the threshold it crossed and the words that pushed it towards spam. A site owner can see why something was held before deciding to release it.",
          media: {
            type: "image",
            src: `${LAAS}/reason.png`,
            alt: "Why this was held: the model scored the message 1.00, above the 0.97 threshold, with the words that drove it",
            width: 2520,
            height: 1096,
            fit: "contain",
            background: "#f0f0f1",
          },
        },
        {
          title: "Trained in Python, served in plain PHP",
          body: "A logistic regression on hashed word and character n-grams plus link and sender features, trained on 96,549 licence-checked rows. A custom featurizer uses crc32 hashing in both languages, and shared fixtures prove PHP and Python agree to four decimal places. PHP reads only the weights a message touches, straight from a 2.1 MB file.",
          media: {
            type: "image",
            src: `${LAAS}/how.png`,
            alt: "Trained in Python, runs in PHP, same score to four decimal places",
            width: 1920,
            height: 1080,
          },
        },
        {
          title: "Rules the owner controls",
          body: "Allow and block lists for emails, domains, IPs and phrases run before the model. If a message matches both lists, allow wins.",
          media: {
            type: "image",
            src: `${LAAS}/rules.png`,
            alt: "Rules page with always-allow and always-block lists",
            width: 2520,
            height: 1072,
            fit: "contain",
            background: "#f0f0f1",
          },
        },
      ],
      diagram: {
        caption: "Every check runs inside WordPress. The model is trained offline and ships as a file in the plugin.",
        nodes: [
          { id: "form", title: "Form or comment", note: "CF7, WPForms, comments" },
          { id: "rules", title: "Allow and block lists", note: "checked first" },
          { id: "model", title: "Local model in PHP", note: "2.1 MB, 3.5 ms worst case", accent: true },
          { id: "inbox", title: "Delivered", note: "unsure ones tagged" },
          { id: "quarantine", title: "Quarantine", note: "30 days, one-click release" },
        ],
        edges: [
          ["form", "rules"],
          ["rules", "model"],
          ["model", "inbox"],
          ["model", "quarantine"],
        ],
      },
      decisions: [
        {
          title: "A small linear model instead of a transformer",
          why: "It has to run on cheap shared hosting with no extensions. A hashed logistic regression scores an 8 KB message in 3.5 ms (p95) with about 8 MB of extra memory, and CI fails the build past 20 ms or 16 MB.",
          tradeoff: "Trade-off: less accuracy than the MiniLM model I also trained. That one is kept for an optional cloud second opinion on unsure messages.",
        },
        {
          title: "Fail open, hold instead of delete",
          why: "For a small business, a lost enquiry costs more than one spam email. Unsure messages are delivered with a [Possible spam] tag, errors deliver the message, and held mail waits 30 days.",
          tradeoff: "Trade-off: some spam still reaches the inbox, tagged.",
        },
        {
          title: "Evaluation that can't flatter itself",
          why: "Splits are grouped by source and by synthetic template, so test styles are never seen in training, and synthetic text is reweighted so the generator's style can't become a spam signal.",
          tradeoff: "Trade-off: lower headline numbers. They still come from public and synthetic data until real labelled traffic is collected.",
        },
      ],
      results: [
        { value: "0.33%", label: "of genuine messages held on the synthetic test set (95% CI 0.19 to 0.58%)" },
        { value: "90.5%", label: "of spam caught at that rate. Not yet measured on real contact-form traffic" },
        { value: "3.5 ms", label: "worst-case check in plain PHP (p95, 8 KB message)" },
      ],
      next: "dentalai-receptionist",
    },
  },
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
    featured: false,
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
      next: "local-ai-anti-spam",
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
