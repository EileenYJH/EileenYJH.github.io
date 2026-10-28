---
name: update-portfolio
description: Add or update a project on Eileen's portfolio site (this repo) from a handoff file, project notes, a description or a repository URL. Use when Eileen runs /update-portfolio, or asks to add a finished project to the portfolio or refresh an existing project entry.
---

# /update-portfolio

Turns information about a project into a reviewed entry in the project
registry (`src/content/projects/<id>.md`), and changes site components only
when the data alone can't express what's needed. Read
`docs/portfolio-workflow.md` once for how the registry and pages fit
together.

**Arguments** (`$ARGUMENTS`): any of a path to a handoff file (often in
`handoffs/`), a GitHub URL, a local path to another repo, or free-text notes.
If nothing was given, ask for one of these and stop.

## Hard rules

- **Never invent.** No achievement, number, placing, link, date, teammate or
  contribution goes in unless it comes from the provided material, a file you
  read, or Eileen in this conversation. Unconfirmed items go in `unknowns`
  (never rendered), not into visible fields, and not as "TBD" text.
- **Never claim deployment** (no `demo:` URL) unless you fetched the URL and
  it loaded in this session, or Eileen confirms it works.
- **No secrets or private data.** Don't copy API keys, tokens, `.env` values,
  internal hostnames, confidential employer material or other people's
  personal details into this repo. This repo is public.
- **Don't touch unrelated work.** Run `git status` first. If there are
  uncommitted changes you didn't make, leave them alone and don't include them
  in your commit; mention them in the summary.
- **No push, no deploy, no merge to `main`** without Eileen's explicit yes in
  this conversation. Pushing to `main` deploys the live site.
- **Preserve the design.** Don't change `global.css`, the layout, fonts,
  colours of existing projects or existing hand-built pages unless asked.

## Steps

### 1. Prepare
- `git status` and `git branch --show-current`. Create a branch
  `portfolio/<project-id>` from an up-to-date `main` (`git fetch origin main`
  first if online). If not on `main` and the tree is dirty, ask before
  switching.
- `npm ci` if `node_modules` is missing.

### 2. Read the source material
- **Handoff file**: read it fully. It follows
  `.claude/skills/project-handoff/handoff-template.md`. Trust its sourced
  rows; treat rows marked UNKNOWN as unknown.
- **Repository URL or path**: only if it's reachable. Try a local path, or a
  shallow clone into a scratch directory outside this repo (never inside it).
  If it can't be reached, say so and continue from the notes. Read the README,
  docs, dependency files, main entry points, tests and any results files.
  Don't run its code unless that's needed to verify a result and is safe.
- **Free-text notes**: use them, and ask about anything ambiguous.
- Don't assume access to other Claude conversations: if the material refers
  to one ("as we discussed"), ask Eileen for the detail.

### 3. Extract
Fill this list for yourself, each item with its source:
name, what it is, problem, role, contributions, team, implementation,
technologies, results (with evidence), challenges, learnings, repo, demo,
post, images, status, completion date, context line, tags.
Anything unsourced goes to **unknowns**.

### 4. Check for an existing entry
Search `src/content/projects/` for the same project by ID, title words,
repo URL, demo URL, event or context. If one matches, **update that file**
and keep its `order`, `color`, `href`, `flagship`, existing wording and
anything you have no newer evidence for. Never create a second entry for the
same project. If it's unclear whether two are the same, ask.

### 5. Ask once, briefly
If key facts are missing (role, what Eileen personally did, completion date,
whether the repo is public, visibility), ask them in one message with
AskUserQuestion or plain text. Don't block on nice-to-haves; record them in
`unknowns`. If Eileen isn't responding, continue with `visibility: draft`.

### 6. Write the entry
Create or edit `src/content/projects/<id>.md` (kebab-case ID). Field
reference: the `projects` schema in `src/content.config.ts`. Conventions,
matching the existing entries:
- `title`: `"Name: what it is"`; the part before `: ` is the card name. Keep
  the name short (it's large type on the home page).
- `summary`: 1–2 sentences, concrete: what it does, how, and one verified
  result if there is one. Read two existing entries first and match their
  tone: specific, technical, no hype words, British spelling.
- `tags`: 3–5; the first three show on cards.
- `context`: the event/course/employer line shown above the name, e.g.
  `"SEDIC 2026 · Track 1 winner"`. Only include a placing if confirmed.
- `color`: a `#RRGGBB` that's distinct from the existing entries' colours
  and reads on a light background. Leave existing colours alone.
- `order`: new projects go after existing ones (next free number) unless
  Eileen says otherwise. `flagship: true` only if she asks.
- `status`, `completed`: only if known.
- `results`: each `{ text, source }`; the source is shown in small print.
- `images`: copy approved images into `public/images/projects/<id>/`,
  compress anything over ~500 KB (e.g. with `npx sharp-cli` or `ffmpeg`),
  write real alt text. Only images the handoff marks OK to publish, or that
  Eileen approves. The first image becomes the full-screen hero.
- `visibility`: `draft` until Eileen has reviewed the wording; then `public`
  (or `unlisted` to build the page without listing it).
- Body (below the frontmatter): optional 1–3 short paragraphs of extra
  detail, shown in "How it works" on the generated page.

### 7. Pages and components
- A project without its own page automatically gets the generated page
  `src/pages/projects/[slug].astro`, and is listed on the home page,
  /projects and the CV. Usually nothing else needs editing.
- Only build a bespoke page (`src/pages/projects/<id>.astro`, then set
  `href: /projects/<id>`) if Eileen asks for one. Copy the structure of an
  existing bespoke page and reuse `ProjectHero`.
- If the generated page can't show something the project genuinely needs,
  propose the smallest change and ask before editing shared components.

### 8. Verify
Run, and fix anything you caused:
- `npm test` (includes the registry checks: duplicates, missing images,
  broken links to pages, secrets, placeholder text on public entries)
- `npm run build` (validates every field against the schema)
- Preview: `npm run build && npm run preview`, then open
  `/`, `/projects`, `/projects/<id>` (or its bespoke page) and `/cv` at
  desktop and ~390 px width. Check: the new row looks like the others, no
  horizontal scroll, images load, no console errors. Use a browser tool or
  Playwright if available; otherwise say which pages Eileen should check.
- If a project page draft is `draft`, temporarily preview it as `unlisted`,
  then set it back.
There is no linter or `astro check` in this repo; don't add one unasked.

### 9. Commit locally and report
- Stage only the files you changed (`git add <paths>`, never `git add -A`).
  Commit on the branch with a message like
  `Add <name> to portfolio` / `Update <name> project entry`.
- Report to Eileen, briefly:
  1. what was added or changed (files),
  2. the card summary as it will appear,
  3. **unknowns** still open and anything you left out on purpose,
  4. test/build results and what you previewed,
  5. next step: review, then say "push" to push the branch and open a PR,
     or "merge" to merge into `main` (which deploys).
- Only after an explicit yes: `git push -u origin <branch>` and, if `gh` is
  available, `gh pr create`. Merge to `main` only when she says so.
