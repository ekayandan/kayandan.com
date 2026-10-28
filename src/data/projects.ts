import type { Project } from './types';

export const featured: Project[] = [
  {
    id: 'flyism-bvy',
    name: 'Flyism.net & BizeVizeYok.com',
    status: 'Live',
    visibility: 'private',
    layout: 'top',
    blurb:
      'Flight discovery for visa-free destinations: find the cheapest flights to countries you can enter without a visa. Flyism.net serves international travellers, BizeVizeYok.com the Turkish market, from one shared codebase.',
    stats: [
      { value: '9', label: 'passports' },
      { value: '147', label: 'countries' },
      { value: '767', label: 'routes' },
      { value: '2,303', label: 'airports' },
      { value: '~750', label: 'tests' },
    ],
    bullets: [
      'React 19, TypeScript and Vite frontend; Hono and Zod on Cloudflare Workers, with KV (search cache, 1h for user searches and 6h for Explore rows), R2 and D1.',
      'Per-client rate limit of 20 requests a minute. Raw provider responses are kept immutably in R2 and projected into D1 price observations.',
      'Visa-rule datasets for 9 passports with 767 routes to 147 countries and 2,303 airports, researched by agents with a human review step before anything is used.',
      '~750 automated tests (Vitest, Playwright on desktop and mobile) and SonarCloud; trunk-based delivery with PR-required main and squash-only merges. Consent-gated PostHog (EU) analytics.',
    ],
    notes: [
      {
        label: 'Internal tooling · private',
        text: 'passport-manager (Worker + D1 admin for visa datasets with human review), seoctl (Node 22 CLI for Search Console, IndexNow, Lighthouse and CrUX), photo-curator (local Node app for picking and cropping destination photos).',
      },
    ],
    tags: ['React 19', 'TypeScript', 'Vite', 'Hono', 'Zod', 'Cloudflare Workers', 'KV', 'R2', 'D1', 'Playwright'],
    links: [
      { label: 'flyism.net', href: 'https://flyism.net' },
      { label: 'bizevizeyok.com', href: 'https://bizevizeyok.com' },
    ],
    videos: [
      { src: '/videos/flyism-desktop.mp4', webm: '/videos/flyism-desktop.webm', poster: '/videos/flyism-desktop-poster.jpg', alt: 'Flyism.net on desktop: pick a passport, browse visa-free destinations and the cheapest fares', device: 'desktop' },
      { src: '/videos/flyism-mobile.mp4', webm: '/videos/flyism-mobile.webm', poster: '/videos/flyism-mobile-poster.jpg', alt: 'Flyism.net on mobile: pick a passport, browse visa-free destinations and the cheapest fares', device: 'mobile' },
      { src: '/videos/bizevizeyok-mobile.mp4', webm: '/videos/bizevizeyok-mobile.webm', poster: '/videos/bizevizeyok-mobile-poster.jpg', alt: 'BizeVizeYok.com on mobile: pick a passport, browse visa-free destinations and the cheapest fares', device: 'mobile' },
      { src: '/videos/bizevizeyok-desktop.mp4', webm: '/videos/bizevizeyok-desktop.webm', poster: '/videos/bizevizeyok-desktop-poster.jpg', alt: 'BizeVizeYok.com on desktop: pick a passport, browse visa-free destinations and the cheapest fares', device: 'desktop' },
    ],
    screenshots: [
      { src: '/images/projects/flyism.jpg', alt: 'Flyism.net home page' },
      { src: '/images/projects/bizevizeyok.jpg', alt: 'BizeVizeYok.com home page' },
    ],
  },
  {
    id: 'agent-native-repository',
    name: 'agent-native-repository',
    status: 'New',
    visibility: 'public',
    blurb:
      'A portable Agent Skill that brings any repository to the state where Claude Code, Codex and Gemini CLI work well in it: an AGENTS.md codebase map enforced by a check, a routing table, one quality command, file-size and dead-code limits, workflow rules, and enforcement in git hooks and CI.',
    tags: ['Python', 'Shell', 'Agent Skills', 'AGENTS.md'],
    links: [{ label: 'github.com/ekayandan/agent-native-repository', href: 'https://github.com/ekayandan/agent-native-repository' }],
  },
];

export const clientWork: Project[] = [
  {
    id: 'ard-hilfe',
    name: 'ARD help portal',
    status: 'Live',
    period: '2023',
    layout: 'top',
    role: 'Working student at Jatosha GmbH',
    blurb:
      "Built the React frontend for ARD's public help portal, on ARD's UI library, while working as a working student at Jatosha GmbH.",
    tags: ['React'],
    links: [{ label: 'hilfe.ard.de', href: 'https://hilfe.ard.de' }],
    videos: [
      { src: '/videos/ard-desktop.mp4', webm: '/videos/ard-desktop.webm', poster: '/videos/ard-desktop-poster.jpg', light: { src: '/videos/ard-desktop-light.mp4', webm: '/videos/ard-desktop-light.webm', poster: '/videos/ard-desktop-light-poster.jpg' }, alt: 'The ARD help portal: search, help areas and a help category on desktop', device: 'desktop' },
      { src: '/videos/ard-mobile.mp4', webm: '/videos/ard-mobile.webm', poster: '/videos/ard-mobile-poster.jpg', light: { src: '/videos/ard-mobile-light.mp4', webm: '/videos/ard-mobile-light.webm', poster: '/videos/ard-mobile-light-poster.jpg' }, alt: 'The ARD help portal: search, help areas and a help category on mobile', device: 'mobile' },
    ],
  },
  {
    id: 'aiutanda',
    name: 'aiutanda patient app and admin web app',
    status: 'Live',
    period: '2022',
    role: 'at Jatosha GmbH, for aiutanda',
    blurb:
      'Built at Jatosha GmbH for aiutanda, a nationwide healthcare group: a Flutter patient app so nurses can request care services and supplies in the field, plus an Angular admin web app. There is no public web demo, so these are the store screenshots (sample data).',
    tags: ['Flutter', 'Angular'],
    links: [
      { label: 'Google Play', href: 'https://play.google.com/store/apps/details?id=de.aiutanda.gesundheitsapp' },
      { label: 'App Store', href: 'https://apps.apple.com/de/app/aiutanda-gesundheitsapp/id6446090783' },
    ],
    gallery: [
      { src: '/images/clients/aiutanda/app-1.jpg', alt: 'aiutanda app: request services such as wound care, rehabilitation aids and incontinence supplies', width: 600, height: 1067 },
      { src: '/images/clients/aiutanda/app-2.jpg', alt: 'aiutanda app: patient list with a button to add a patient (sample names)', width: 600, height: 1067 },
      { src: '/images/clients/aiutanda/app-3.jpg', alt: 'aiutanda app: a patient timeline of service requests (sample data)', width: 600, height: 1067 },
    ],
  },
  {
    id: 'ulviye-yucel-sigorta',
    name: 'Ulviye Yücel Sigorta',
    status: 'Live',
    period: '2019',
    role: 'Freelance web developer',
    blurb:
      "Designed and built the agency's website as a freelancer. A Turkish-language site for an insurance brokerage: product pages for traffic, comprehensive, health, home and DASK cover, a quote-request form and contact details.",
    tags: [],
    links: [{ label: 'ulviyeyucelsigorta.com', href: 'https://ulviyeyucelsigorta.com' }],
    videos: [
      { src: '/videos/ulviye-desktop.mp4', webm: '/videos/ulviye-desktop.webm', poster: '/videos/ulviye-desktop-poster.jpg', alt: 'The Ulviye Yücel Sigorta website on desktop', device: 'desktop' },
      { src: '/videos/ulviye-mobile.mp4', webm: '/videos/ulviye-mobile.webm', poster: '/videos/ulviye-mobile-poster.jpg', alt: 'The Ulviye Yücel Sigorta website on mobile', device: 'mobile' },
    ],
  },
];

export const alsoBuilt: Project[] = [
  {
    id: 'talent-tracker',
    name: 'Talent Tracker',
    status: 'Coursework',
    period: 'Mar – Sep 2024',
    blurb:
      'TUM CDTM Interdisciplinary Project: backend, infrastructure and CI/CD for an event-driven data-ingestion platform collecting LinkedIn-based startup data.',
    tags: ['FastAPI', 'MinIO', 'PostgreSQL', 'Redis'],
  },
  {
    id: 'park-depot',
    name: 'Park Depot',
    status: 'Coursework',
    period: 'Oct 2023 – Feb 2024',
    blurb: 'Master Practical Course, JavaScript Technology: AWS cloud infrastructure for web and mobile apps.',
    tags: ['AWS', 'Terraform', 'Django'],
  },
  {
    id: 'kaset',
    name: 'Kaset',
    status: 'Dormant',
    visibility: 'private',
    period: 'Apr 2026',
    blurb: 'Event pages and admin on Cloudflare: public event pages with galleries and a password-protected admin.',
    tags: ['Next.js', 'D1', 'R2'],
  },
  {
    id: 'asr',
    name: 'ASR post-correction & evaluation tooling',
    status: 'Exploratory',
    visibility: 'public',
    period: 'Oct 2025',
    blurb: 'Exploratory Python tooling for correcting and evaluating speech-recognition output.',
    tags: ['Python'],
    links: [{ label: 'asr-analyzer', href: 'https://github.com/ekayandan/asr-analyzer' }],
  },
  {
    id: 'research-framework',
    name: 'Agent-supported research & academic-writing framework',
    status: 'In preparation',
    period: 'In preparation',
    blurb: 'Grew out of my thesis work. I am working on publishing it as open source.',
    tags: [],
  },
];
