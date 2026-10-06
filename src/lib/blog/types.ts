export interface BlogSection {
  id: string;
  heading: string;
  body: string;
  instructions: string[];
  imageUrl: string | null;
  imageAlt: string;
  callout: string | null;
}

export interface BlogPage {
  title: string;
  slug: string;
  publishedDate: string;
  overview: string;
  seoTitle: string | null;
  seoDescription: string | null;
  sections: BlogSection[];
}

// Only explicit HTTPS URLs and root-relative links are accepted from CMS content.
export function safeUrl(value: unknown): string | undefined {
  if (typeof value !== 'string' || /[\s\\]/.test(value)) return undefined;
  if (value.startsWith('/') && !value.startsWith('//')) return value;
  try {
    const url = new URL(value);
    return url.protocol === 'https:' && !url.username && !url.password ? url.href : undefined;
  } catch {
    return undefined;
  }
}

export function readingMinutes(page: BlogPage): number {
  const words = [
    page.overview,
    ...page.sections.flatMap(s => [s.heading, s.body, ...s.instructions, s.callout || '']),
  ]
    .join(' ')
    .trim()
    .split(/\s+/)
    .filter(Boolean).length;
  return Math.max(1, Math.ceil(words / 200));
}

export function sectionAnchor(index: number): string {
  return `section-${index + 1}`;
}
