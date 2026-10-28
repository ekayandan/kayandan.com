# kayandan.com: content document

The facts the site is allowed to say, the wording it uses, and where each one lives in code.
**Source of truth:** the JobTrack candidate profile at
`/Users/enver/code/jobtrack app/ai-job-search/.claude/skills/job-application-assistant/01-candidate-profile.md`
(also recorded in `README.md`). If anything here or on the site disagrees with it, the profile wins.
When the profile changes, update this file first, then `src/data/*.ts`.

Last synced with the profile: 2026-10-28.

---

## 1. Positioning

- **Headline:** Full-stack engineer, backend focus. (`profile.role`)
- **One-liner:** Founder of Flyism.net and BizeVizeYok.com. Based in Munich, Germany.
- **What I'm looking for:** full-time roles in Germany: AI/agent engineering, full-stack product engineering, backend. Open to work. Munich, open to relocation within Germany; on-site or hybrid.
- **Story in one sentence:** I ship real products by orchestrating AI coding agents as sole architect and reviewer, and I make that safe with automated quality gates. Before that, 3+ years of Spring/Angular/React work at GE, Vodafone, Octovan, Infineon and Jatosha, and a TUM thesis on Artemis performance.

## 2. Hard numbers (use these, nothing else)

| Claim | Value | Source / note |
|---|---|---|
| Flyism/BVY coverage | 9 passports, 767 routes to 147 countries, 2,303 airports | profile, Oct 2026 |
| Flyism/BVY tests | ~750 automated tests (Vitest, Playwright desktop + mobile) | profile |
| Flyism/BVY history | 310 commits since Jun 2026 | profile |
| Artemis export endpoint | ~75% faster turnaround (in-memory Git/ZIP) | thesis |
| Artemis inter-service payload | **~83%** smaller (~100 KB → ~17 KB) | thesis |
| Artemis diff move to browser | 20–124 ms server work removed per submission; ~33–207 CPU-h/semester at TUM (est.) | thesis |
| Artemis CI gate failure rate | ~80% → ~20% (Jenkins stage retries) | thesis |
| Artemis PRs | 16 PRs, +10,734 / −5,198 lines (computed in code) | GitHub |
| Infineon testbed update downtime | 1–5 h → 5–10 min | Infineon |
| GE parts tree | minutes → under 700 ms to first data | GE Gas Power |
| Jatosha | 4 production apps in 9 months | Jatosha |
| Vodafone | 30+ service Kafka data-exchange architecture | Vodafone |

Deliberately not shown: traffic/user numbers for Flyism/BVY, ARD visit estimate, Allianz agency count.

## 3. Sections

### About (`src/data/profile.ts` → `about`)
Current four paragraphs are accurate. Keep the personal line (guitar, piano, skiing, sailing, tinkering).

### Experience (`src/data/experience.ts`)
Order: Flyism/BVY → TUM thesis → Infineon → Jatosha → GE Gas Power → Vodafone → Octovan; earlier: GE Aerospace, Allianz.
Bullets worth adding from the profile, if space allows:
- **Thesis:** diff computation moved to the browser (Angular, Monaco); CI fail rate ~80% → ~20%; Copilot/Codex implemented while I owned architecture, review and tests.
- **GE Gas Power:** lazy-loaded parts tree, minutes → <700 ms (the strongest story on the CV, currently missing on the site).
- **Octovan:** tiered cargo-price lookup (cache → interpolation → fallback); generic change-history dashboard on Hibernate Envers.
- **Infineon:** internal moved from Software Engineering to DevOps via internal posting (Jul 2024).

### Projects (`src/data/projects.ts`)
- **Featured:** Flyism.net & BizeVizeYok.com; agent-native-repository.
- **Also built:** Talent Tracker, Park Depot, Kaset, ASR tooling, research framework (in preparation).
- **Architecture section** (`src/components/Architecture.astro`): Flyism/BVY diagram, JobTrack module diagram (private, no link), Artemis before/after chart. Update the JobTrack diagram when modules change (source: `jobtrack app/AGENTS.md`, Modules).
- **Not on the site:** PDF-to-EPUB, Clapp (2017, KWORKS winner: could go in Awards).

### Open source (`src/data/openSource.ts`)
Artemis thesis PRs (ls1intum/Artemis, 800+ stars) and the Athena contribution (ls1intum/edutelligence).

### Skills, Education, Contact
- Education: M.Sc. Informatics, TUM (2022–2026); B.Sc. Computer Engineering, Koç University (2016–2021); SAFe 5 Practitioner (2022).
- Languages: English C1 (TOEFL PBT 617), Turkish native, German A2 (studying for B1).
- No experience, do not claim: Kotlin, .NET/C#, Azure, Go, Rust, server-side Swift, ML model training.
- Contact email on the site: dev@kayandan.com (the profile/CV uses envercankayandan@gmail.com; intentional).

## 4. Mismatches between the site and the profile

All five fixed on 2026-10-28 (thesis ~83%, 147 countries, Allianz CSV library, Gemini in the agent list, ~750 tests). GE lazy-loading, Octovan pricing/dashboard and the thesis diff/CI bullets were added to Experience.

## 5. Never publish
Phone, street address, date of birth, nationality, work-permit status, grades, private repo links
(JobTrack, bizevizeyok, bvy-admin, kasetcalar), referee names.

---

## 6. Visibility plan: showing the products, not just describing them

The site currently has one static screenshot per product. Recruiters spend seconds per page, so the
products should be *seen working*. In priority order:

### Quick wins (an afternoon)
1. **Looping demo clips instead of static screenshots.** 8–15 s, muted, autoplaying `<video>` (MP4/WebM, <1.5 MB, poster frame = current JPG). Flyism: pick passport → see visa-free destinations → cheapest flight. BVY: same in Turkish on mobile. Record with Playwright's video recording (you already have the suites) so clips are reproducible when the UI changes.
2. **Mobile + desktop pair** per product (a phone frame next to the browser frame). The product is mobile-first; show it.
3. **"Proof" strip under Flyism**: 9 passports · 147 countries · 2,303 airports · ~750 tests · 310 commits. Numbers people can scan.
4. **agent-native-repository:** replace the GitHub-page screenshot with an asciinema/terminal GIF of the install script and the check failing → passing. Add a README badge and a 30-second GIF to the repo itself.

### Medium (a few days)
5. **One 2–3 minute walkthrough video** (Loom or YouTube, unlisted is fine): "How I ship a product with five AI agents and one reviewer." Screen of worktrees, agents in parallel, a PR blocked by CI, the merge. This is the single most differentiating thing you have; embed it in Projects and link it in applications.
6. **Architecture diagram** for Flyism/BVY (Workers → KV/R2/D1, provider adapter, research-agent API with human approval). An inline SVG on the site; reuse it in interviews.
7. **Case-study pages** (`/projects/flyism`, `/projects/artemis`): problem → constraints → what I did → numbers. The Artemis thesis already has the perfect structure (four measured improvements). Gives SEO and something to link from LinkedIn.
8. **Before/after visuals for Artemis**: a small bar chart of the 4 measured results (75%, 83%, CI 80→20%, CPU-hours).

### Ongoing distribution
9. **LinkedIn:** a post per clip/case study (Featured section: pin the walkthrough video and flyism.net). Turkish-language posts for BizeVizeYok.
10. **Launch posts:** Show HN / r/ClaudeAI / r/ChatGPTCoding for agent-native-repository; r/Turkey-adjacent travel communities and Ekşi/Twitter-TR for BizeVizeYok.
11. **Write-ups** (re-adds the Writing section once real): "~750 tests as the price of single-reviewer agent development", "Making Artemis CI pass 80% → 20% failures with three retries".
12. **Search:** you already have seoctl; add `Person` + `SoftwareApplication` JSON-LD on kayandan.com, and link kayandan.com from both product footers ("Built by Enver Can Kayandan").

### Not recommended
- Traffic/user numbers until they're impressive and you're comfortable publishing them.
- Long autoplay videos with sound, or heavy GIFs (hurts page weight; use MP4).

---

## 7. TODO / research

- [x] Demo clips for Flyism/BVY, ARD and Ulviye Yücel Sigorta (regenerate: see README, "Regenerating demo clips"), stats strip, architecture diagrams, Client work section.
- [ ] **Walkthrough video + YouTube channel (research).** 2–3 min: "Shipping a product with five AI agents and one reviewer." Decide: channel name and scope (agentic engineering? building Flyism in public?), recording setup (OBS/Screen Studio, mic), cadence, whether Turkish or English or both, and Shorts cut-downs. Then embed the video in Projects and pin it on LinkedIn.
- [ ] **Distribution (later, important):** LinkedIn posts per clip/diagram, Show HN + r/ClaudeAI for agent-native-repository, Turkish channels for BizeVizeYok, write-ups to bring back the Writing section, `Person`/`SoftwareApplication` JSON-LD, "Built by" footer links on both products.
- [ ] **Client work section** (decide): ARD help portal and aiutanda, see below.

## 8. Live work that could go on the site

| Work | Live where | Notes |
|---|---|---|
| ARD help portal (Jatosha) | https://hilfe.ard.de | Public. Fine to name, link and screenshot as "built the React frontend while at Jatosha". Don't use ARD's logo as if it endorses you, and don't claim the whole site or its current state. |
| aiutanda patient app (Jatosha) | Google Play, `de.aiutanda.gesundheitsapp` | Public store listing; link it and use your own screenshots of public screens (no patient data). Admin web app is internal: describe only. |
| Artemis (thesis) | artemis.tum.de / github.com/ls1intum/Artemis | Already linked; a screenshot of the diff view you moved to the browser would make it concrete. |
| Athena (edutelligence) | GitHub | Already in Open source. |
| agent-native-repository | GitHub | Already featured. |
| Kaset | workers.dev demo | Only if you're OK showing it (dormant). |

Suggested form: a compact "Client work" list under Projects: name, client, your role, stack, link, one screenshot. Check your Jatosha contract for any confidentiality clause first; public, live sites are normally fine to reference.
Not found live: SmartHomeCare (no public URL in the profile), GE/Infineon/Vodafone/Octovan tools (internal).
