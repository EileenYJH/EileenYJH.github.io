# eileenyjh.github.io — portfolio

Personal portfolio of Eileen Yeoh. Astro + GSAP. Deploys to GitHub Pages on
every push to `main`.

## Commands

| Command         | Action                                  |
| --------------- | --------------------------------------- |
| `npm run dev`   | Dev server at http://localhost:4321     |
| `npm run build` | Production build to `dist/`             |
| `npm test`      | Unit tests + project registry checks    |
| `npm run check` | Tests + build (run before merging)      |

## Adding or updating a project

Projects live in `src/content/projects/<id>.md` (the project registry). In
Claude Code, run `/update-portfolio <handoff file, repo URL or notes>`. At the
end of a project in another repo, run `/project-handoff` there first. Full
guide: [`docs/portfolio-workflow.md`](docs/portfolio-workflow.md).

## Writing a blog post

Create `src/content/blog/<slug>.md`:

```markdown
---
title: Post title
description: One-sentence summary shown on cards.
date: 2026-07-01
tags: [embedded, uni]
---

Markdown body here.
```

Push to `main` — the post appears automatically.

## Content checklist before sharing the link

- [ ] Rewrite the starter post `src/content/blog/building-aria.md` in your own words
- [ ] Edit the about-page story (`src/pages/about.astro`) so it sounds like you
- [ ] Add `public/cv.pdf` (the footer and about page link to it)
- [ ] Add your LinkedIn URL to `src/components/Footer.astro`
- [ ] Add hardware photos / demo video to the ARIA page gallery
      (`galleryImages` array in `src/pages/projects/aria.astro`)
- [ ] Refine the hero one-liner on the homepage if it doesn't feel like you
