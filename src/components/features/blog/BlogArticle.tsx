import Head from 'next/head';
import { Fragment } from 'react';

import { BlogPage, readingMinutes, safeUrl, sectionAnchor } from '@src/lib/blog/types';

import styles from './blog.module.css';

// Small, deliberately constrained Markdown subset; CMS HTML is always escaped by React.
export const InlineText = ({ value }: { value: string }) => (
  <>
    {value.split(/(\*\*[^*]+\*\*|\[[^\]]+\]\([^)]+\))/g).map((part, index) => {
      if (part.startsWith('**') && part.endsWith('**'))
        return <strong key={index}>{part.slice(2, -2)}</strong>;
      const link = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
      if (link) {
        const href = safeUrl(link[2]);
        return href ? (
          <a key={index} href={href}>
            {link[1]}
          </a>
        ) : (
          <Fragment key={index}>{link[1]}</Fragment>
        );
      }
      return <Fragment key={index}>{part}</Fragment>;
    })}
  </>
);

export const BlogArticle = ({ page, preview = false }: { page: BlogPage; preview?: boolean }) => {
  const date = new Intl.DateTimeFormat('en-GB', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    timeZone: 'Europe/London',
  }).format(new Date(page.publishedDate));
  return (
    <>
      <Head>
        <title>{page.seoTitle || page.title} | Vodafone blog demo</title>
        <meta name="description" content={page.seoDescription || page.overview} />
        <meta name="robots" content="noindex, nofollow" />
      </Head>
      <nav className={styles.breadcrumb} aria-label="Breadcrumb">
        <div className={styles.wide}>
          <a href="/">Home</a>
          <span aria-hidden="true">›</span>
          <a href="https://www.vodafone.co.uk/blog">Blog</a>
          <span aria-hidden="true">›</span>
          <span aria-current="page">{page.title}</span>
        </div>
      </nav>
      {preview && (
        <div className={styles.preview}>
          Contentful draft preview · <a href="/api/exit-preview">Exit preview</a>
        </div>
      )}
      <article>
        <header className={styles.hero}>
          <div className={styles.wide}>
            <h1>{page.title}</h1>
            <div className={styles.metadata}>
              <span>
                <span aria-hidden="true">▦</span> Published{' '}
                <time dateTime={page.publishedDate}>{date}</time>
              </span>
              <span>
                <span aria-hidden="true">◷</span> {readingMinutes(page)} minute read
              </span>
            </div>
          </div>
        </header>
        <div className={styles.articleBackground}>
          <div className={styles.overview}>
            <div>
              <h2>Overview</h2>
              <p>
                <InlineText value={page.overview} />
              </p>
            </div>
            <span className={styles.info} aria-hidden="true">
              i
            </span>
          </div>
          <div className={styles.articleBody}>
            <nav className={styles.contents} aria-label="Article contents">
              <h2>Contents</h2>
              <ol>
                {page.sections.map((section, index) => (
                  <li key={`${section.id}-${index}`}>
                    <a href={`#${sectionAnchor(index)}`}>{section.heading}</a>
                  </li>
                ))}
              </ol>
            </nav>
            {page.sections.map((section, index) => (
              <section
                key={`${section.id}-${index}`}
                id={sectionAnchor(index)}
                className={styles.section}
              >
                <h2>
                  {index + 1}. {section.heading}
                </h2>
                {section.imageUrl && safeUrl(section.imageUrl) && (
                  <img
                    className={styles.sectionImage}
                    src={safeUrl(section.imageUrl)}
                    alt={section.imageAlt}
                    loading={index === 0 ? 'eager' : 'lazy'}
                    decoding="async"
                  />
                )}
                {section.body
                  .split(/\n\s*\n/)
                  .filter(Boolean)
                  .map((paragraph, n) => (
                    <p key={n}>
                      <InlineText value={paragraph} />
                    </p>
                  ))}
                {section.instructions.length > 0 && (
                  <ul className={styles.instructions}>
                    {section.instructions.map((item, n) => (
                      <li key={n}>
                        <span aria-hidden="true">✓</span>
                        <div>
                          <InlineText value={item} />
                        </div>
                      </li>
                    ))}
                  </ul>
                )}
                {section.callout && (
                  <aside className={styles.callout}>
                    <InlineText value={section.callout} />
                  </aside>
                )}
              </section>
            ))}
          </div>
        </div>
      </article>
    </>
  );
};
