import type { PullRequest } from './types';

export const openSourceSummary = {
  headline: '16 merged PRs in Artemis',
  repoLine: 'ls1intum/Artemis, TUM’s open-source interactive learning platform (800+ stars). Java/Spring Boot server, Angular/TypeScript client, Python scripts and CI, March to December 2025.',
  artemisUrl: 'https://github.com/ls1intum/Artemis',
  context: 'These contributions were made during my master’s thesis on Artemis at TUM.',
};

const A = 'ls1intum/Artemis' as const;

export const pullRequests: PullRequest[] = [
  {
    repo: A, number: 11392, title: 'Improve programming exercise server tests',
    additions: 2552, deletions: 1440, files: 62, merged: '2025-12', notable: true,
  },
  {
    repo: 'ls1intum/edutelligence', number: 251,
    title: 'Athena: Convert repository import functions to work with file maps instead of zips',
    additions: 185, deletions: 122, files: 16, merged: '2025-11', notable: true,
    note: 'Athena-side half of Artemis #11357: JSON file maps instead of zip downloads, atomic file writes that reject unsafe paths.',
  },
  {
    repo: A, number: 11357, title: 'Convert Athena endpoints to return file maps of repositories',
    additions: 1022, deletions: 107, files: 18, merged: '2025-11', notable: true,
  },
  {
    repo: A, number: 11218, title: 'Introduce exam automation script',
    additions: 967, deletions: 34, files: 17, merged: '2025-10', notable: true,
    note: 'Python scripts under supporting_scripts.',
  },
  {
    repo: A, number: 11452, title: 'Adapt failing CI check thresholds',
    additions: 1, deletions: 1, merged: '2025-10',
  },
  {
    repo: A, number: 11396, title: 'Cleanup GitService',
    additions: 149, deletions: 269, files: 6, merged: '2025-10',
  },
  {
    repo: A, number: 11027, title: 'Export programming repositories in-memory',
    additions: 1781, deletions: 491, files: 26, merged: '2025-09', notable: true,
    note: 'Snapshot, full-history archive and Git bundle exports built in memory, with no temp files.',
  },
  {
    repo: A, number: 11325, title: 'Fix flaky course score calculation test',
    additions: 13, deletions: 0, merged: '2025-08',
  },
  {
    repo: A, number: 11207, title: 'Exam mode: Fix an issue with LaTeX styling in problem statements',
    additions: 43, deletions: 27, files: 8, merged: '2025-07',
  },
  {
    repo: A, number: 11191, title: 'Exam mode: Fix wrong student points after unfinished second round correction',
    additions: 146, deletions: 1, files: 5, merged: '2025-07',
  },
  {
    repo: A, number: 11144, title: 'Delete git diff related server code and database tables',
    additions: 18, deletions: 281, files: 8, merged: '2025-07',
  },
  {
    repo: A, number: 10885, title: 'Programming exercises: Move code comparison responsibility to client',
    additions: 3473, deletions: 2397, files: 71, merged: '2025-07', notable: true,
    note: 'Replaced server-generated diff reports with raw file contents and the Monaco diff editor in the browser.',
  },
  {
    repo: 'ls1intum/thesis-template-typst', number: 83, title: 'Convert thesis.bib file to yml',
    additions: 35, deletions: 3, merged: '2025-06',
  },
  {
    repo: A, number: 11072, title: 'Enhance database migration approval check',
    additions: 6, deletions: 2, files: 1, merged: '2025-06',
  },
  {
    repo: A, number: 10961, title: 'Fix verifyBuildPlans test case',
    additions: 17, deletions: 40, files: 4, merged: '2025-06',
  },
  {
    repo: A, number: 10765, title: 'Improve programming exercise test coverage',
    additions: 378, deletions: 3, files: 2, merged: '2025-05',
  },
  {
    repo: A, number: 10470, title: 'Fix an issue when changing the short name during import',
    additions: 159, deletions: 89, files: 3, merged: '2025-04',
  },
  {
    repo: A, number: 10467, title: 'Fix build results not available after file import',
    additions: 9, deletions: 16, files: 4, merged: '2025-03',
  },
];

export const prUrl = (pr: PullRequest) => `https://github.com/${pr.repo}/pull/${pr.number}`;

export const repoCounts = pullRequests.reduce<Record<string, number>>((acc, pr) => {
  acc[pr.repo] = (acc[pr.repo] ?? 0) + 1;
  return acc;
}, {});

export const artemisTotals = pullRequests
  .filter((pr) => pr.repo === 'ls1intum/Artemis')
  .reduce((acc, pr) => ({ add: acc.add + pr.additions, del: acc.del + pr.deletions }), { add: 0, del: 0 });

export const fmt = (n: number) => n.toLocaleString('en-US');
