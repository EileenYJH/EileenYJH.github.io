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
- **Publishing: standing approval.** Eileen has asked for every update to be
  pushed and published automatically (28 Oct 2026). Once tests and the build
  pass and the preview looks right, set `visibility: public`, push the branch,
  open a pull request and merge it into `main`, which deploys the live site.
  Hold back and ask instead if any check fails, if she says "draft" or "don't
  publish" for this update, or if something needs her answer first (a photo
  with faces she hasn't cleared, an unconfirmed claim she wants on the page).
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
`unknowns`. If Eileen isn't responding, leave out anything that depends on
her answer and carry on.

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
- `images`: see "Finding images" below. Save them as
  `public/images/projects/<id>/<short-name>.jpg`, write real alt text, and
  put the hero (best team or demo photo, landscape) first: it becomes the
  full-screen opening image.
- `visibility`: `public` when published (see Hard rules); `unlisted` builds
  the page without listing it; `draft` only when Eileen asks to hold it back.
- Body (below the frontmatter): optional 1–3 short paragraphs of extra
  detail, shown in "How it works" on the generated page.

#### Finding images
Eileen keeps project photos in Google Drive, in the folder
**`Portfolio picture`**. Each project has a subfolder named after it (e.g.
`sedic`, `OXHACK2026`); a few single photos sit loose in the top folder with
a descriptive file name (e.g. `Devfest george town.HEIC`).
1. Look there first. If a Google Drive tool is available, search for the
   folder `Portfolio picture`, then a subfolder or file whose name matches
   the project ID, name, event or context (case-insensitive). If there's no
   Drive tool, ask Eileen to download that subfolder into
   `handoffs/<id>-images/` (git-ignored) and continue once it's there.
2. Then check the handoff's media table and the project repo for screenshots
   or diagrams.
3. **Show Eileen what you found and which ones you'd use** (file names, and
   the image itself if you can view it), and wait for her OK. Photos with
   faces, other people's work or confidential screens need her explicit yes.
4. Convert and compress before adding: HEIC/PNG photos to JPEG, longest side
   about 1800 px for the hero and 1400 px for others, quality ~80, ideally
   under 400 KB each (`sharp` via `npx sharp-cli`, `ffmpeg`, or ImageMagick,
   whichever is installed). Strip location metadata. Rename to short
   kebab-case names (`team-stage.jpg`, not `WhatsApp Image 2026-10-28…`).
5. If nothing usable exists, leave `images` empty (the generated page works
   without a hero) and add "photos" to `unknowns`.

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

### 9. Commit, publish and report
- Stage only the files you changed (`git add <paths>`, never `git add -A`).
  Commit on the branch with a message like
  `Add <name> to portfolio` / `Update <name> project entry`.
- Publish (standing approval, unless one of the hold-back cases applies):
  1. `git fetch origin main` and rebase if `main` moved; rerun `npm run check`.
  2. `git push -u origin <branch>`.
  3. Open a pull request into `main` (`gh pr create`, or the REST API
     `gh api repos/<owner>/<repo>/pulls` if GraphQL is unavailable).
  4. Merge it (`gh pr merge --merge`, or
     `gh api -X PUT repos/<owner>/<repo>/pulls/<n>/merge`).
  5. Wait for the "Deploy to GitHub Pages" run to succeed
     (`gh run list --branch main --limit 1`), then open the live project page
     and check it loads with the new content.
- Report to Eileen, briefly:
  1. what was added or changed, and the live link,
  2. the card summary as it appears,
  3. **unknowns** still open and anything you left out on purpose,
  4. test/build results, what you previewed, and the deploy result,
  5. anything held back and why.
