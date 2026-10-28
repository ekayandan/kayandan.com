import type { EducationEntry } from './types';

export const education: EducationEntry[] = [
  {
    id: 'tum',
    title: 'M.Sc. Informatics',
    institution: 'Technical University of Munich (TUM)',
    period: '2022 – 2026',
    note: "Master's thesis: performance and scalability improvements in Artemis, an open-source programming education platform used by universities in Germany and internationally (Mar 2025 – Jan 2026).",
    bullets: [
      'In-memory Git and ZIP handling in Java cut an export endpoint’s turnaround time by ~75%; lightweight JSON repository representations between the Java and Python services cut inter-service payloads by ~83% (~100 KB to ~17 KB).',
      'Moved code-diff computation from the server to the browser (Angular, Monaco Editor), removing 20–124 ms of server work per submission, an estimated 33–207 server CPU-hours per semester at TUM alone.',
      'Made failing Jenkins stages retry before alerting, cutting the fail rate of Artemis’ CI gates from ~80% to ~20%.',
    ],
    tags: ['Java', 'Spring Boot', 'Git', 'Performance'],
  },
  {
    id: 'koc',
    title: 'B.Sc. Computer Engineering',
    institution: 'Koç University',
    period: '2016 – 2021',
  },
  {
    id: 'safe',
    title: 'Certified SAFe® 5 Practitioner',
    institution: 'Scaled Agile Inc.',
    period: '2022',
  },
];
