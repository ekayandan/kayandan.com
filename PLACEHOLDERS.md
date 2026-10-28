# Placeholders

Every placeholder renders on the page as a dashed, yellow-washed `.placeholder` element
starting with "TODO:" (search the page or the source for `data-placeholder`). Nothing was
silently omitted. To find them all in code: `grep -rn "placeholder" src/data src/components`.

| # | What | Where it shows | What you need to supply |
|---|------|----------------|--------------------------|
| 1 | Portrait photo | About, avatar slot (`src/data/profile.ts` → `aboutPlaceholders.avatar`, `src/components/About.astro`) | A square portrait. Replace the `<Placeholder variant="box">` with an `<img width height alt>`. |
| 10 | Kaset live demo | Projects, "Also built" → Kaset | Say whether to link the live workers.dev demo. |
| 12 | Ulviye Yücel Sigorta dates and stack | Projects, Client work | Dates and technology stack for the freelance site (role and description are set). |
| 11 | Link to the agent-supported research and academic-writing framework | Projects, "Also built" | The URL once the open-source release exists. The copy says "working on publishing", never "released". |

## Resolved

- Personal sentence added to About (guitar, piano, skiing, sailing, tinkering).
- Other social links: none. Writing section: removed (no posts). JobTrack: no project card or link; shown only as a module diagram in the Architecture section.
- Screenshots: live captures of flyism.net, bizevizeyok.com and the agent-native-repository GitHub page in `public/images/projects/` (retake them when the UIs change).
- Traffic/user numbers: deliberately not shown.
- OG image: generated `public/og.png` (1200x630) and wired into og:image / twitter:image.
- Footer colophon removed. Contact email is now dev@kayandan.com (the mailbox must exist, see README).
- Resume: no PDF is published; the button under Experience links to LinkedIn ("Full history on LinkedIn").
- TUM / ls1intum: open-source intro says "These contributions were made during my master’s thesis on Artemis at TUM." (`openSourceSummary.context`).

## Filled in by the implementer, please confirm

- Footer colophon: "Built with Astro. Set in Inter and JetBrains Mono." (`profile.footer.colophon`). The brief had it as a placeholder; this is just the true stack.
- The writing placeholder row says "Notes coming soon / No posts yet."
- Open source: "800+ stars" for Artemis follows CONTENT_CORE (the dossier counted 821 on 2026-10-24).
- The +10,734 / −5,198 line total for the 16 Artemis PRs is computed in code from the per-PR figures in GITHUB_DOSSIER.md, not typed in.

## Deliberately not published

Phone number, street address, date of birth, nationality, work-permit status, grades, private repo links
(JobTrack, bizevizeyok, bvy-admin, kasetcalar), and the skipped repos (wortkiste, typst, env-gineered,
whisp-N, kelime-oyunu, pdf-to-epub).
