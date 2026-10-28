# Project-to-portfolio workflow

How a finished project, built in some other repo and some other Claude Code
conversation, ends up on the site without rewriting it by hand.

```
other project repo                         this repo (portfolio)
──────────────────                         ─────────────────────
/project-handoff  ──► portfolio-handoff-<id>.md ──► handoffs/
                                                     │
                                         /update-portfolio handoffs/…
                                                     │
                            src/content/projects/<id>.md  (registry entry)
                                                     │
                     home page · /projects · /cv · /projects/<id>  (automatic)
                                                     │
                         branch + local commit ──► you review ──► push / merge
```

## 1. The project registry

Every project is one Markdown file in `src/content/projects/`. The file name
is the project's unique ID (`sedic.md` → `sedic`). The fields are defined and
validated in `src/content.config.ts`; a build fails if one is wrong.

| Field | Used for |
| --- | --- |
| `title` | `"Name: what it is"`. The name is the big text on cards. **Required.** |
| `summary` | 1–2 sentences on cards and the CV. **Required.** |
| `tagline` | Optional hook on the generated page (falls back to `summary`). |
| `tags` | Card tags (first three shown) and the CV skills list. |
| `context` | The coloured line above the name: event, course, award. |
| `color` | `#RRGGBB` swatch and page accent. |
| `order` | Position in lists (lower first). |
| `flagship` | Featured project. |
| `visibility` | `public` (listed), `unlisted` (page built, not linked), `draft` (not built). |
| `href` | Only for projects with a hand-built page. Defaults to `/projects/<id>`. |
| `status`, `completed` | `completed` / `in-progress` / `archived` / `unknown`; date as `2026`, `2026-10` or `2026-10-07`. |
| `problem`, `role`, `contributions`, `team` | "The problem" and "My role" sections. |
| `implementation` + Markdown body | "How it works". |
| `technologies` | "Built with" (falls back to `tags`). |
| `results` | `{ text, source }` cards. Only results with evidence. |
| `challenges`, `learnings` | "What was hard" / "What I learned". |
| `repo`, `demo`, `post` | Link buttons. `demo` only once verified working. |
| `images` | `{ src, alt, caption }`, files in `public/`. The first is the hero. |
| `unknowns` | Things not yet confirmed. **Never shown on the site.** |

Everything except `title` and `summary` is optional, and empty sections
simply don't render. Unknown facts go in `unknowns`, not into visible text.

### Where projects appear

- **Home page "Selected work"** and **/projects**: `src/components/home/WorkList.astro`, public entries only.
- **CV** (`/cv`): `src/pages/cv.astro`, public entries only.
- **Project page**:
  - If `src/pages/projects/<id>.astro` exists, that hand-built page is used
    (all eight current projects have one, with interactive demos).
  - Otherwise `src/pages/projects/[slug].astro` generates a page from the
    registry fields, in the site's existing style.

The shared rules (ordering, visibility, default link) live in
`src/lib/projects.ts`.

## 2. Finishing a project in another repo

The portfolio workflow never assumes it can see the other repo or the other
conversation, so the project conversation writes down what it knows first.

**One-time setup**: copy the handoff skill to your personal Claude Code
skills so it works in every repo:

```powershell
# Windows (PowerShell), from this repo
Copy-Item -Recurse .claude\skills\project-handoff $HOME\.claude\skills\
```
```bash
# macOS / Linux
cp -r .claude/skills/project-handoff ~/.claude/skills/
```

**At the end of each project**, in that project's Claude Code conversation:

```
/project-handoff
```

It reads the repo, runs the tests if it can, and writes
`portfolio-handoff-<id>.md` using `.claude/skills/project-handoff/handoff-template.md`.
Every claim has a source; anything unconfirmed is marked UNKNOWN.

No skill installed? Paste the template into the conversation and ask Claude
to fill it in from the repo, with the same rules.

Move the file into this repo's `handoffs/` folder (git-ignored, so private
notes stay local).

## 3. Running /update-portfolio

From this repo, in Claude Code:

```
/update-portfolio handoffs/portfolio-handoff-<id>.md
/update-portfolio https://github.com/EileenYJH/<repo>
/update-portfolio ../path/to/local/repo
/update-portfolio <free-text notes about the project>
```

You can combine them (e.g. a handoff plus a repo URL). The skill:

1. checks `git status` and works on a new branch `portfolio/<id>`;
2. reads the material, and the other repo only if it can reach it;
3. checks the registry for an existing entry and updates it instead of
   duplicating;
4. asks you once about missing key facts, and records the rest as `unknowns`;
5. writes the entry (as `draft` until you've approved the wording), copying
   and compressing approved images into `public/images/projects/<id>/`;
6. runs tests and the build, previews the pages;
7. commits locally and reports what changed, what's still unknown, and what to
   review. It does not push or deploy until you say so.

The full instructions are in `.claude/skills/update-portfolio/SKILL.md`.

## 4. Previewing and verifying

```bash
npm ci            # first time only
npm test          # unit tests + registry checks
npm run build     # schema validation + full static build
npm run preview   # serve the build at http://localhost:4321
npm run check     # test + build in one go
```

Or `npm run dev` for live reload while editing.

The registry checks (`tests/projects-registry.test.ts`) fail on: duplicate
titles, links, repos or demos; a project link with no page behind it; images
missing from `public/` or without alt text; non-https links; anything that
looks like a key, token or password; and placeholder text (TODO, TBD,
`[unknown]`…) on a public entry.

Pages to look at after a change: `/`, `/projects`, the project's page and
`/cv`, on desktop and phone width. For the full browser check of the live
site's interactive parts there's `node scripts/verify-site.mjs <url>`
(needs `npx playwright install chromium` once).

## 5. Publishing

Pushing to `main` deploys: `.github/workflows/deploy.yml` builds with
`withastro/action` and publishes to GitHub Pages (eileenyjh.github.io)
on every push to `main`.

Recommended flow:

1. Review the branch locally (`git diff main`, then preview).
2. Push the branch and open a pull request
   (`git push -u origin portfolio/<id>`, then `gh pr create` or the GitHub
   website). The Actions build only runs on `main`, so run `npm run check`
   before merging.
3. Merge the PR into `main`. The site updates once the "Deploy to GitHub
   Pages" action finishes (Actions tab).
4. Check the live page.

Claude will only push, open a PR or merge after you explicitly say so.
