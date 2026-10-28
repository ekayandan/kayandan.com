export interface Link {
  label: string;
  href: string;
}

/** "top": media above the text at full width. "side": media beside the text, sharing the row width. */
export type MediaLayout = 'top' | 'side';

export interface Experience {
  id: string;
  title: string;
  company: string;
  location: string;
  /** Display string, e.g. "Jun 2026 – Present". */
  period: string;
  bullets: string[];
  tags: string[];
  links?: Link[];
  screenshots?: { src: string; alt: string }[];
}

export interface EarlierRole {
  id: string;
  title: string;
  company: string;
  period: string;
  summary: string;
}

export type ProjectStatus = 'Live' | 'Active' | 'New' | 'Dormant' | 'Exploratory' | 'Coursework' | 'In preparation';

export interface Project {
  id: string;
  name: string;
  status: ProjectStatus;
  visibility?: 'public' | 'private';
  /** Short date/period label shown in the left column of compact rows. */
  period?: string;
  /** Role line shown under the title (client work). */
  role?: string;
  blurb: string;
  /** Key numbers rendered as a compact strip under the blurb. */
  stats?: { value: string; label: string }[];
  bullets?: string[];
  /** Extra line shown under the bullets (e.g. internal tooling, credit). */
  notes?: { label: string; text: string }[];
  tags: string[];
  links?: Link[];
  /** Overrides the global media layout for this entry. */
  layout?: MediaLayout;
  screenshots?: { src: string; alt: string }[];
  /** Looping demo clips (muted). Poster is shown before play / with reduced motion; screenshots are the fallback. */
  videos?: { src: string; webm?: string; poster: string; alt: string; device: 'desktop' | 'mobile' }[];
  /** Still images shown as a same-height row (e.g. store screenshots). */
  gallery?: { src: string; alt: string; width: number; height: number }[];
}

export interface PullRequest {
  repo: 'ls1intum/Artemis' | 'ls1intum/edutelligence' | 'ls1intum/thesis-template-typst';
  number: number;
  title: string;
  additions: number;
  deletions: number;
  files?: number;
  /** YYYY-MM the PR was merged. */
  merged: string;
  notable?: boolean;
  note?: string;
}

export interface SkillGroup {
  label: string;
  items: string[];
  hint?: string;
}

export interface EducationEntry {
  id: string;
  title: string;
  institution: string;
  period: string;
  note?: string;
  bullets?: string[];
  tags?: string[];
}


export type MediaItem =
  | { kind: 'video'; src: string; webm?: string; poster: string; alt: string; width: number; height: number; ratio: number }
  | { kind: 'img'; src: string; alt: string; width: number; height: number; ratio: number };
