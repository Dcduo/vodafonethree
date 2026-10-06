import { BlogPage, BlogSection, safeUrl } from './types';

interface Resource {
  sys: { id: string; contentType?: { sys: { id: string } } };
  fields: Record<string, any>;
}
interface Collection {
  items: Resource[];
  total: number;
  includes?: { Entry?: Resource[]; Asset?: Resource[] };
}

export class BlogContentError extends Error {}

const text = (value: unknown): string => (typeof value === 'string' ? value : '');

export function resolveBlog(data: Collection): BlogPage | null {
  if (!data.items.length) return null;
  if (data.total > 1) throw new BlogContentError('More than one Blog Page has this slug.');
  const fields = data.items[0].fields;
  const entries = new Map((data.includes?.Entry || []).map(e => [e.sys.id, e]));
  const assets = new Map((data.includes?.Asset || []).map(a => [a.sys.id, a]));
  const links = fields.sections;
  if (!Array.isArray(links) || !links.length)
    throw new BlogContentError('The blog has no sections.');
  const sections: BlogSection[] = links.map(link => {
    const entry = entries.get(link?.sys?.id);
    if (!entry || entry.sys.contentType?.sys.id !== 'blogSection') {
      throw new BlogContentError('A linked Blog Section is missing or unpublished.');
    }
    const s = entry.fields;
    if (!text(s.heading).trim() || !text(s.body).trim()) {
      throw new BlogContentError('A Blog Section is missing its heading or body.');
    }
    const asset = s.image ? assets.get(s.image.sys?.id) : undefined;
    if (s.image && !asset) throw new BlogContentError('A linked image is missing or unpublished.');
    let imageUrl = text(asset?.fields.file?.url) || text(s.imageUrl);
    if (imageUrl.startsWith('//')) imageUrl = `https:${imageUrl}`;
    if (imageUrl && !safeUrl(imageUrl)) throw new BlogContentError('An image URL is invalid.');
    if (imageUrl && !text(s.imageAlt).trim())
      throw new BlogContentError('An image needs alternative text.');
    return {
      id: entry.sys.id,
      heading: text(s.heading),
      body: text(s.body),
      instructions: Array.isArray(s.instructions)
        ? s.instructions.filter((v): v is string => typeof v === 'string')
        : [],
      imageUrl: imageUrl || null,
      imageAlt: text(s.imageAlt),
      callout: text(s.callout) || null,
    };
  });
  if (
    !text(fields.title).trim() ||
    !text(fields.overview).trim() ||
    !/^\d{4}-\d{2}-\d{2}/.test(text(fields.publishedDate)) ||
    Number.isNaN(Date.parse(fields.publishedDate))
  ) {
    throw new BlogContentError(
      'The blog is missing its title, overview or valid publication date.',
    );
  }
  return {
    title: text(fields.title),
    slug: text(fields.slug),
    publishedDate: text(fields.publishedDate),
    overview: text(fields.overview),
    seoTitle: text(fields.seoTitle) || null,
    seoDescription: text(fields.seoDescription) || null,
    sections,
  };
}

export async function getBlog(slug: string, preview = false): Promise<BlogPage | null> {
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) return null;
  const space = process.env.CONTENTFUL_SPACE_ID;
  const token = preview
    ? process.env.CONTENTFUL_PREVIEW_ACCESS_TOKEN
    : process.env.CONTENTFUL_ACCESS_TOKEN;
  if (!space || !token) throw new BlogContentError('Contentful credentials are not configured.');
  const region = process.env.CONTENTFUL_REGION === 'eu' ? '.eu' : '';
  const host = `${preview ? 'preview' : 'cdn'}${region}.contentful.com`;
  const environment = process.env.CONTENTFUL_ENVIRONMENT || 'master';
  const url = new URL(
    `https://${host}/spaces/${encodeURIComponent(space)}/environments/${encodeURIComponent(environment)}/entries`,
  );
  url.search = new URLSearchParams({
    content_type: 'blogPage',
    'fields.slug': slug,
    include: '2',
    limit: '2',
    ...(process.env.CONTENTFUL_BLOG_LOCALE ? { locale: process.env.CONTENTFUL_BLOG_LOCALE } : {}),
  }).toString();
  const response = await fetch(url, {
    headers: { Authorization: `Bearer ${token}` },
    signal: AbortSignal.timeout(10000),
    cache: 'no-store',
  });
  if (!response.ok)
    throw new BlogContentError(`Contentful blog request failed (${response.status}).`);
  return resolveBlog(await response.json());
}
