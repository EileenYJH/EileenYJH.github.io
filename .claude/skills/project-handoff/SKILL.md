---
name: project-handoff
description: Write a verified portfolio handoff file for the project in the current repository, so Eileen's portfolio can be updated later with /update-portfolio without this conversation. Use when Eileen says a project is finished, asks for a "portfolio handoff", "project handoff", or "/project-handoff".
---

# Project handoff

Produce `portfolio-handoff-<project-id>.md` for the project in the current
working directory, following `handoff-template.md` in this skill folder
exactly (same headings, same tables). The portfolio workflow will rely on it
without access to this conversation or, often, this repository, so it must
stand on its own.

## Steps

1. **Gather evidence, don't recall.** Read the README, docs, package or
   build files (package.json, requirements.txt, pyproject.toml, platformio.ini,
   CMakeLists.txt, BOMs), the main source entry points, test files and any
   reports or results folders. Run `git log --oneline -20` and
   `git remote -v` if it's a git repo. Use what this conversation established,
   but prefer the files where they disagree.
2. **Run what verifies results**, if it's cheap and safe: the test suite, a
   build, an evaluation script that already exists. Record the command and
   outcome in section 11. Don't run anything that deploys, sends messages,
   spends money or calls paid APIs.
3. **Check links before listing them.** A demo URL counts only if you
   fetched it and it loaded. Otherwise put it under Unknowns as "demo URL not
   verified". Note whether the repo is public.
4. **Separate Eileen's work from the team's.** Only list contributions that
   commits, files, or Eileen herself attribute to her. If unclear, ask her
   one short question rather than guessing; if she isn't around, put it in
   Unknowns.
5. **Fill the template.** Every factual row gets a source. Anything you
   couldn't confirm is written as `UNKNOWN` and repeated in section 10. Never
   estimate or round up a number, invent a placing, or describe something as
   deployed unless you verified it.
6. **Scrub before saving.** Remove API keys, tokens, passwords, `.env`
   contents, connection strings, private hostnames or IPs, internal
   company data, and other people's personal details. Mention in section 10
   that confidential material was left out, if any was.
7. **Save and hand over.** Write the file to the repo root (or where Eileen
   asks). Don't commit it unless she asks: it may hold private notes. Then tell
   her, in a few lines: where the file is, the main unknowns, and the next
   step: open her portfolio repo and run
   `/update-portfolio <path to this file>`, or paste the file's contents.

## Quality bar

- Technical and specific: components, numbers with units, what was measured
  and how. No adjectives doing the work of evidence ("robust", "cutting-edge").
- British spelling, plain sentences, no em-dash chains.
- Short is fine. An honest half-empty handoff beats a confident wrong one.
