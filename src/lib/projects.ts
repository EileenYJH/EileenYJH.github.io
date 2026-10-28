// Shared access to the project registry (src/content/projects/*.md), so the
// home page, /projects, the CV and the generated project pages all apply the
// same ordering, visibility and link rules.
import { getCollection, type CollectionEntry } from 'astro:content';

export type Project = CollectionEntry<'projects'>;

export const DEFAULT_COLOR = '#2F5BD3';

export const projectHref = (p: Project) => p.data.href ?? `/projects/${p.id}`;

/** "Name: what it is" -> { name, what } */
export const splitTitle = (title: string) => {
  const [name, ...rest] = title.split(': ');
  return { name, what: rest.join(': ') };
};

/** Every project that gets built (public + unlisted), in display order. */
export async function builtProjects() {
  return (await getCollection('projects', (p) => p.data.visibility !== 'draft')).sort(
    (a, b) => a.data.order - b.data.order,
  );
}

/** Projects shown in lists: home page, /projects and the CV. */
export async function listedProjects() {
  return (await builtProjects()).filter((p) => p.data.visibility === 'public');
}
