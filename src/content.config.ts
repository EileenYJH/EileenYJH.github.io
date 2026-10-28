import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const blog = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.coerce.date(),
    tags: z.array(z.string()).default([]),
  }),
});

// Project registry. One Markdown file per project in src/content/projects/;
// the file name is the project's unique ID (e.g. sedic.md -> "sedic").
// Only title and summary are required. Everything else is optional so a
// record can be added before every detail is known: list what's missing in
// `unknowns` instead of guessing. See docs/portfolio-workflow.md.
const url = z.string().url();
const sitePath = z.string().regex(/^\//, 'must be a site path starting with /');

const projects = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/projects' }),
  schema: z.object({
    // Shown on cards: "Name: what it is". The part before ": " is the name.
    title: z.string(),
    // One or two sentences shown on the home page, /projects and the CV.
    summary: z.string(),
    // Optional short hook for the generated project page.
    tagline: z.string().optional(),
    // Up to three are shown on cards; all feed the CV skills list.
    tags: z.array(z.string()).default([]),
    // Featured project (kept as `flagship` for backward compatibility).
    flagship: z.boolean().default(false),
    // public: listed everywhere. unlisted: page builds but isn't linked.
    // draft: not built at all. Use draft until the record is reviewed.
    visibility: z.enum(['public', 'unlisted', 'draft']).default('public'),
    order: z.number().default(99),
    // Defaults to /projects/<id>. Set it when the project has a bespoke page.
    href: z.string().optional(),
    // Card colour and context line (event, award or setting).
    color: z.string().regex(/^#[0-9A-Fa-f]{6}$/).optional(),
    context: z.string().optional(),

    status: z.enum(['completed', 'in-progress', 'archived', 'unknown']).default('unknown'),
    // "2026", "2026-10" or "2026-10-07". Kept as text so a month is enough.
    completed: z.string().regex(/^\d{4}(-\d{2}){0,2}$/).optional(),

    problem: z.string().optional(),
    role: z.string().optional(),
    contributions: z.array(z.string()).default([]),
    team: z.array(z.string()).default([]),
    implementation: z.string().optional(),
    technologies: z.array(z.string()).default([]),
    // Only results with evidence. `source` says where the figure came from
    // (test report, judging sheet, measurement, repo README...).
    results: z.array(z.object({ text: z.string(), source: z.string().optional() })).default([]),
    challenges: z.array(z.string()).default([]),
    learnings: z.array(z.string()).default([]),

    repo: url.optional(),
    // Only set a demo URL you have opened and confirmed works.
    demo: url.optional(),
    post: url.optional(),
    // `focus` is the CSS object-position for the hero crop, e.g. "50% 30%".
    images: z.array(z.object({ src: sitePath, alt: z.string(), caption: z.string().optional(), focus: z.string().optional() })).default([]),

    // Fields still unconfirmed, e.g. ["completion date", "test accuracy"].
    // Never rendered on the site; a reminder for the next update.
    unknowns: z.array(z.string()).default([]),
  }),
});

export const collections = { blog, projects };
