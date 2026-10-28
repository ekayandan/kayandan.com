import type { EarlierRole, Experience } from './types';

export const experience: Experience[] = [
  {
    id: 'flyism-bvy',
    title: 'Founder & Software Engineer',
    company: 'Flyism.net & BizeVizeYok.com',
    location: 'Remote',
    period: 'Jun 2026 – Present',
    bullets: [
      'Built two live flight-discovery products that find the cheapest flights to countries a traveller can enter without a visa: Flyism.net (international travellers) and BizeVizeYok.com (Turkish market), from one shared codebase.',
      'Orchestrate a multi-agent engineering setup (Claude Code, Codex, Gemini, Cursor, Hermes Agent) with shared memory; agents implement in parallel, each in its own git worktree, while I own product decisions, specs, architecture rules and acceptance as single reviewer.',
      'Made single-reviewer development safe with automated gates: ~750 tests (Vitest, Playwright on desktop and mobile), type, lint and dead-code checks and SonarCloud; a pull request merges only with passing CI.',
      'Cover 9 passports with 767 routes to 147 countries and 2,303 airports with scheduled flights.',
      'Serverless TypeScript backend on Cloudflare Workers (Hono, Zod): provider adapter over a GraphQL flight-data API, KV caching, per-client rate limiting.',
      'Price-history pipeline: raw provider responses archived in R2, projected asynchronously into D1, with replay and recovery tooling.',
      'Restricted API for visa-rule research agents: they read only human-approved official pages and submit proofs that must quote the saved page exactly; a human reviews before anything is used.',
      'Mobile-first multilingual React frontend with server-rendered SEO pages, a public-holiday trip planner and consent-gated analytics.',
    ],
    tags: ['TypeScript', 'React', 'Cloudflare Workers', 'Hono', 'Zod', 'D1', 'R2', 'KV', 'Vitest', 'Playwright'],
    links: [
      { label: 'flyism.net', href: 'https://flyism.net' },
      { label: 'bizevizeyok.com', href: 'https://bizevizeyok.com' },
    ],
  },
  {
    id: 'tum-thesis',
    title: "Master's Thesis, Artemis",
    company: 'Technical University of Munich',
    location: 'Munich',
    period: 'Mar 2025 – Jan 2026',
    bullets: [
      'Performance and scalability improvements in Artemis, an open-source programming education platform used by universities in Germany and internationally.',
      'In-memory Git and ZIP handling in Java cut an export endpoint’s turnaround time by ~75%; lightweight JSON repository representations between the Java and Python services cut inter-service payloads by ~83% (~100 KB to ~17 KB).',
      'Moved code-diff computation from the server to the browser (Angular, Monaco Editor), removing 20–124 ms of server work per submission, an estimated 33–207 server CPU-hours per semester at TUM alone.',
      'Made failing Jenkins stages retry before alerting, cutting the fail rate of Artemis’ CI gates from ~80% to ~20%.',
    ],
    tags: ['Java', 'Spring Boot', 'Git', 'Performance'],
  },
  {
    id: 'infineon',
    title: 'Software & DevOps Engineering Working Student',
    company: 'Infineon AG',
    location: 'Munich (hybrid)',
    period: 'Oct 2023 – Dec 2024',
    bullets: [
      "Designed and built full-stack cloud-native tooling for the Quality Assurance department with Spring Boot and Angular, deployed on Infineon's internal Kubernetes (OpenShift) cluster.",
      'Modernized and containerized Jenkins pipelines for field-update rollouts of microchip testbeds, cutting testbed downtime by over 90% (from 1–5 hours to 5–10 minutes).',
    ],
    tags: ['Spring Boot', 'Angular', 'OpenShift', 'Kubernetes', 'Jenkins', 'Docker'],
  },
  {
    id: 'jatosha',
    title: 'Frontend Engineering Working Student',
    company: 'Jatosha GmbH',
    location: 'Munich (hybrid)',
    period: 'Dec 2022 – Sep 2023',
    bullets: [
      'Owned customer-facing applications end-to-end: 4 production apps in 9 months, working directly with founders, customers and freelancers.',
      "Public help portal for ARD, Germany's national broadcaster (React). Patient-management mobile app (Flutter) and admin web app (Angular) for aiutanda.",
    ],
    tags: ['React', 'Flutter', 'Angular'],
  },
  {
    id: 'ge-gas-power',
    title: 'Software Engineering Specialist',
    company: 'General Electric Gas Power',
    location: 'Gebze, Turkey (remote)',
    period: 'Jun 2021 – Sep 2022',
    bullets: [
      'Re-implemented a slow legacy gas-turbine maintenance tracking application as a real-time Spring Boot and Angular system used by all field maintenance engineers.',
      'Lazy-loaded a huge engine part hierarchy 2–3 levels at a time, cutting time to first data from minutes to under 700 ms in most cases.',
      'Established testing and security guidelines adopted across multiple teams (documented practices, SonarQube quality gates).',
      'Led an intern and mentored a newly hired junior engineer.',
    ],
    tags: ['Spring', 'Angular', 'SonarQube'],
  },
  {
    id: 'vodafone',
    title: 'Backend Engineer',
    company: 'Vodafone',
    location: 'Istanbul (remote)',
    period: 'Mar 2021 – Jun 2021',
    bullets: [
      'Spring Boot microservices in a distributed architecture of 30+ services exchanging customer usage and billing data over Kafka streams (Discover Tech Talent graduate program).',
    ],
    tags: ['Spring Boot', 'Kafka'],
  },
  {
    id: 'octovan',
    title: 'Backend Engineer',
    company: 'Octovan',
    location: 'Istanbul (hybrid)',
    period: 'Aug 2020 – Dec 2020',
    bullets: [
      "Owned the company's backend application and REST APIs (Spring Boot, PostgreSQL, Redis, AWS).",
      'Built a cargo-price API with tiered lookup (exact cached price, interpolation between nearby routes, cheap fallback), serving far more requests on the same servers.',
      'Built a generic change-history dashboard on Hibernate Envers so customer relations agents could see who changed a price, discount or service detail, and when.',
      'Structured logging and monitoring with the ELK stack for early detection of production issues.',
    ],
    tags: ['Spring Boot', 'PostgreSQL', 'Redis', 'AWS', 'ELK'],
  },
];

export const earlier: EarlierRole[] = [
  {
    id: 'ge-aerospace',
    title: 'Software Development Intern',
    company: 'GE Aerospace',
    period: 'Oct – Dec 2019',
    summary: 'Node.js and Vue.js digital-twin web app for Boeing jet engines.',
  },
  {
    id: 'allianz',
    title: 'Software Development Intern',
    company: 'Allianz',
    period: 'Jul – Aug 2018',
    summary: 'Generic Angular mapping library (Docker) that turns agency CSV tables into web forms customers fill in themselves.',
  },
];
