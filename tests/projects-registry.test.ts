// Checks on the project registry (src/content/projects/*.md) that the Astro
// schema can't express: unique IDs and links, images that exist, links that
// resolve to a page, and nothing secret or unfinished on public entries.
// The field types themselves are validated by `npm run build`.
import { describe, expect, it } from 'vitest';
import { existsSync, readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import yaml from 'js-yaml';

const ROOT = join(__dirname, '..');
const DIR = join(ROOT, 'src/content/projects');
const PAGES = join(ROOT, 'src/pages/projects');

type Entry = { id: string; raw: string; data: Record<string, any> };

const entries: Entry[] = readdirSync(DIR)
  .filter((f) => f.endsWith('.md'))
  .map((f) => {
    const raw = readFileSync(join(DIR, f), 'utf8');
    const m = raw.match(/^---\r?\n([\s\S]*?)\r?\n---/);
    return { id: f.replace(/\.md$/, ''), raw, data: (m ? yaml.load(m[1]) : {}) as Record<string, any> };
  });
const visibility = (e: Entry) => e.data.visibility ?? 'public';
const href = (e: Entry) => e.data.href ?? `/projects/${e.id}`;

const SECRET_PATTERNS: [string, RegExp][] = [
  ['AWS access key', /\bAKIA[0-9A-Z]{16}\b/],
  ['GitHub token', /\bgh[pousr]_[A-Za-z0-9]{30,}\b/],
  ['API key (sk-…)', /\bsk-[A-Za-z0-9_-]{20,}\b/],
  ['Google API key', /\bAIza[0-9A-Za-z_-]{35}\b/],
  ['Slack token', /\bxox[abpors]-[A-Za-z0-9-]{10,}\b/],
  ['private key block', /-----BEGIN [A-Z ]*PRIVATE KEY-----/],
  ['credential assignment', /\b(password|passwd|secret|api[_-]?key|token)\s*[:=]\s*['"]?[^\s'"]{8,}/i],
];
// Visible fields must not ship placeholders on a public entry. Unknowns go
// in the `unknowns` list (never rendered) instead.
const PLACEHOLDER = /\b(TODO|TBD|TBC|FIXME|XXX|lorem ipsum)\b|\[(unknown|missing|placeholder)\]|<(fill in|unknown|tbd|add )[^>]*>/i;
const visibleText = (d: Record<string, any>) => {
  const { unknowns, ...rest } = d;
  return JSON.stringify(rest);
};

describe('project registry', () => {
  it('has at least one project', () => {
    expect(entries.length).toBeGreaterThan(0);
  });

  it('uses kebab-case file names as IDs', () => {
    for (const e of entries) expect(e.id, e.id).toMatch(/^[a-z0-9]+(-[a-z0-9]+)*$/);
  });

  it('has a title and summary on every entry', () => {
    for (const e of entries) {
      expect(typeof e.data.title, `${e.id}: title`).toBe('string');
      expect(typeof e.data.summary, `${e.id}: summary`).toBe('string');
    }
  });

  it('has no duplicate titles, links, repos or demos', () => {
    for (const key of ['title', 'repo', 'demo'] as const) {
      const vals = entries.map((e) => e.data[key]).filter(Boolean).map((v: string) => v.toLowerCase().replace(/\/$/, ''));
      expect(new Set(vals).size, `duplicate ${key}`).toBe(vals.length);
    }
    const hrefs = entries.map(href);
    expect(new Set(hrefs).size, 'duplicate href').toBe(hrefs.length);
  });

  it('links every built project to a page that exists', () => {
    for (const e of entries.filter((x) => visibility(x) !== 'draft')) {
      const h = href(e);
      if (/^https?:\/\//.test(h)) continue;
      const slug = h.match(/^\/projects\/([a-z0-9-]+)\/?$/)?.[1];
      expect(slug, `${e.id}: href ${h} should be /projects/<page>`).toBeTruthy();
      const bespoke = existsSync(join(PAGES, `${slug}.astro`));
      expect(bespoke || slug === e.id, `${e.id}: no page for ${h}`).toBe(true);
    }
  });

  it('only references images that exist in public/', () => {
    for (const e of entries) {
      for (const img of e.data.images ?? []) {
        expect(existsSync(join(ROOT, 'public', img.src)), `${e.id}: missing ${img.src}`).toBe(true);
        expect(img.alt?.trim(), `${e.id}: ${img.src} needs alt text`).toBeTruthy();
      }
    }
  });

  it('uses https for external links', () => {
    for (const e of entries) {
      for (const key of ['repo', 'demo', 'post']) {
        if (e.data[key]) expect(e.data[key], `${e.id}: ${key}`).toMatch(/^https:\/\//);
      }
    }
  });

  it('contains no secrets or credentials', () => {
    for (const e of entries) {
      for (const [name, re] of SECRET_PATTERNS) expect(re.test(e.raw), `${e.id}: looks like a ${name}`).toBe(false);
    }
  });

  it('ships no placeholder text on public entries', () => {
    for (const e of entries.filter((x) => visibility(x) === 'public')) {
      const body = e.raw.replace(/^---[\s\S]*?\n---/, '');
      expect(PLACEHOLDER.test(visibleText(e.data)) || PLACEHOLDER.test(body), `${e.id}: placeholder text`).toBe(false);
    }
  });
});
