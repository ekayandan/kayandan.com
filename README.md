# kayandan.com

Personal portfolio for Enver Can Kayandan. A static, single-page site built with Astro 5 (static
output), TypeScript and plain CSS. About 3 KB of gzipped JavaScript, two self-hosted variable fonts,
no external requests.

Design brief: warm-neutral minimalism (emilkowal.ski) plus a sticky scroll-spy sidebar, sibling-dimming
list hover and a soft cursor glow (brittanychiang.com).

## Run it

```bash
npm install
npm run dev        # http://localhost:4321 with hot reload
npm run build      # static site into dist/
npm run preview    # serve dist/ locally (http://localhost:4321 by default)
npm run check      # astro check (types + .astro diagnostics)
```

Node 20+ (developed on Node 26). npm 11 blocks dependency install scripts by default; none are needed here.

## Source of truth for content

Every fact on the site comes from the JobTrack candidate profile:

```
/Users/enver/code/jobtrack app/ai-job-search/.claude/skills/job-application-assistant/01-candidate-profile.md
```

When it changes, update `docs/CONTENT.md` first, then `src/data/*.ts`. If the site and the profile
disagree, the profile wins.

## Where to edit content

All copy lives in `src/data/` as typed data; components are generic and only render it.

| File | Controls |
|------|----------|
| `profile.ts` | Name, role line, tagline, email and social links, About paragraphs, languages, contact CTA, footer, SEO strings, the section list used by the nav |
| `experience.ts` | Jobs (bullets, tech pills, links) and the collapsed "Earlier internships" |
| `projects.ts` | Featured project cards and the "Also built" list (status, tags, links) |
| `openSource.ts` | Every merged PR (repo, number, title, +/- lines, month, `notable` flag). Counts and totals are derived. |
| `skills.ts`, `education.ts` | As named |
| `types.ts` | Shapes for all of the above |

## Regenerating demo clips

The looping clips in `public/videos/` (Flyism, BizeVizeYok, ARD help portal, Ulviye Yücel Sigorta;
desktop 1280x720 and mobile 390x844) are recorded from the live sites by `scripts/record-demos.mjs`.
Re-record them whenever a product's UI changes.

```bash
npx playwright install chromium   # once
npm run record:demos              # all clips (needs ffmpeg on PATH)
ONLY=ard npm run record:demos     # just the clips whose name contains "ard"
```

- Names: `flyism`, `bizevizeyok`, `ard`, `ulviye`, each with `-desktop` / `-mobile`.
- Output per clip: `<name>.mp4` (H.264, faststart, muted), `<name>.webm` and `<name>-poster.jpg`.
  Keep each under ~1.5 MB.
- The poster is the frame where the flow calls `mark(page)`; move that call to change it.
- Debugging: `DEBUG_FLOW=1` logs URLs after each click, `KEEP_RAW=1` keeps the raw frames.
- Browsing is read-only: consent banners declined, no forms submitted.
- Wiring: clips are listed under `videos` in `src/data/projects.ts`; aiutanda uses store
  screenshots (`public/images/clients/aiutanda/`, `gallery`) because there is no public web demo.
- After re-recording, watch the clips and check the posters before committing.

## Structure

```
src/
  pages/        index.astro (the page), 404.astro
  layouts/      Base.astro (head, SEO, JSON-LD, theme boot script, fonts)
  components/   Topbar, Header (sidebar), About, Experience, Projects, OpenSource, Skills,
                Education, Contact, Palette, Row (shared list row), Section, Tags,
                ExtLink, Icon
  scripts/      theme, glow, spy (scroll-spy), reveal (entrance), openSource (filter), palette, main
  styles/       global.css (tokens, layout, hover grammar, palette, motion)
  data/         content (see above)
public/         favicon.svg, robots.txt
docs/screenshots/
```

## Behaviour notes

- **Theme:** `color-scheme` plus `light-dark()` tokens. Default follows the system; the toggle cycles
  system, light, dark and persists to `localStorage` (in try/catch). A tiny inline script in `<head>` applies
  the saved choice before first paint, so there is no flash. `light-dark()` needs a 2024+ browser.
- **Command palette:** Cmd/Ctrl+K or `/`. A native `<dialog>` (focus trap, Esc, inert page), combobox/listbox
  ARIA, arrow keys + Enter. Jumps to sections, opens links, copies the email, sets the theme.
- **Hover grammar:** one pattern for every list (experience, projects, PRs, education): siblings dim to 50%,
  the hovered row gets a backdrop card and the arrow nudges. Pointer devices only. Keyboard focus shows the
  card and arrow without dimming.
- **Glow:** viewport-fixed, behind content, lerped. Disabled for touch, narrow screens and reduced motion.
- **Scroll-spy:** the sidebar lines grow for the section at the top 35% of the viewport; `aria-current="location"`.
  Below 1100px a sticky top bar with a scrolling nav strip replaces the sidebar.
- **Reduced motion:** no glow, no blur/translate entrance (150ms fade only), no smooth scrolling, no hover transitions.
- **No JavaScript:** everything is visible and anchor links work; the theme follows the system; the open-source
  list shows all 18 PRs and the palette/filter controls stay hidden.
- **Open source section:** shows the 6 notable PRs by default, with repo filter chips and "Show all 18".

## Deploying (notes only, nothing is deployed)

The build output is plain static files in `dist/`, with `https://kayandan.com` set as `site` in
`astro.config.mjs` (used for the canonical URL and the sitemap).

- **Cloudflare Pages:** connect the repo, build command `npm run build`, output directory `dist`, Node 20+.
- **Cloudflare Workers static assets:** add a `wrangler.jsonc` with `"assets": { "directory": "./dist" }`
  (and `"not_found_handling": "404-page"` so `404.html` is served), then `npx wrangler deploy`.
- Attach the `kayandan.com` custom domain in either case. `robots.txt` points at `/sitemap-index.xml`.
