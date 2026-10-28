import type { Link } from './types';

export const profile = {
  name: 'Enver Can Kayandan',
  initials: 'EK',
  role: 'Full-stack engineer, backend focus',
  tagline: 'Founder of Flyism.net and BizeVizeYok.com. Based in Munich, Germany.',
  availability: 'Available immediately',
  location: 'Munich, Germany',
  email: 'dev@kayandan.com',
  site: 'https://kayandan.com',
  github: 'https://github.com/ekayandan',
  linkedin: 'https://linkedin.com/in/enverkayandan',
  seo: {
    title: 'Enver Can Kayandan — Full-stack engineer',
    description:
      'Full-stack engineer in Munich. Founder of Flyism.net and BizeVizeYok.com. M.Sc. Informatics, TUM.',
  },
  about: [
    "I'm a full-stack engineer with 3+ years of professional experience owning web applications from requirements to production. I like small teams with direct influence on the product, and I back speed with automated quality gates.",
    'Right now I run <a class="link" href="https://flyism.net" target="_blank" rel="noreferrer noopener">Flyism.net</a> and <a class="link" href="https://bizevizeyok.com" target="_blank" rel="noreferrer noopener">BizeVizeYok.com</a>, two live flight-discovery products on Cloudflare. I build them by orchestrating a team of AI agents while acting as sole architect and reviewer — which only works because of the test suites and checks around the code.',
    "Before that: a master's thesis on performance in <a class=\"link\" href=\"https://github.com/ls1intum/Artemis\" target=\"_blank\" rel=\"noreferrer noopener\">Artemis</a> (TUM's open-source programming education platform), working-student roles at Infineon and Jatosha, and engineering roles at GE Gas Power, Vodafone and Octovan.",
    'M.Sc. Informatics from the Technical University of Munich. Outside of work I play guitar and piano, ski, sail, and tinker with things.',
  ],
  aboutPlaceholders: {
    avatar: 'portrait photo',
  },
  languages: [
    { name: 'English', level: 'fluent, C1' },
    { name: 'Turkish', level: 'native' },
    { name: 'German', level: 'A2, learning' },
  ],
  contact: {
    cta: 'Open to full-time roles in Germany — AI/agent engineering, full-stack product engineering, backend. Available immediately.',
    relocation: 'Based in Munich, open to relocation within Germany. On-site or hybrid.',
  },
  footer: {
    copyright: '© 2026 Enver Can Kayandan',
  },
} as const;

export const socials: (Link & { icon: 'github' | 'linkedin' | 'mail' })[] = [
  { label: 'GitHub', href: profile.github, icon: 'github' },
  { label: 'LinkedIn', href: profile.linkedin, icon: 'linkedin' },
  { label: 'Email', href: `mailto:${profile.email}`, icon: 'mail' },
];

export interface Section {
  id: string;
  label: string;
}

export const sections: Section[] = [
  { id: 'about', label: 'About' },
  { id: 'experience', label: 'Experience' },
  { id: 'projects', label: 'Projects' },
  { id: 'architecture', label: 'Architecture' },
  { id: 'open-source', label: 'Open source' },
  { id: 'skills', label: 'Skills' },
  { id: 'education', label: 'Education' },
  { id: 'contact', label: 'Contact' },
];
