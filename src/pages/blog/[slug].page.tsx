import { GetServerSideProps } from 'next';
import Head from 'next/head';

import { BlogArticle } from '@src/components/features/blog/BlogArticle';
import { getBlog } from '@src/lib/blog/contentful';
import { BlogPage } from '@src/lib/blog/types';
import { getServerSideTranslations } from '@src/pages/utils/get-serverside-translations';

interface Props {
  page: BlogPage | null;
  previewActive: boolean;
}

export default function BlogRoute({ page, previewActive }: Props) {
  if (!page)
    return (
      <>
        <Head>
          <title>Article temporarily unavailable</title>
          <meta name="robots" content="noindex, nofollow" />
        </Head>
        <div style={{ maxWidth: 1056, margin: '64px auto', padding: 24 }}>
          <h1>Article temporarily unavailable</h1>
          <p>Please try again shortly.</p>
        </div>
      </>
    );
  return <BlogArticle page={page} preview={previewActive} />;
}

export const getServerSideProps: GetServerSideProps<Props> = async ({
  params,
  locale,
  preview,
  res,
}) => {
  // New Writer publications are fetched on each request; no Netlify rebuild is needed.
  res.setHeader('Cache-Control', 'private, no-store, max-age=0');
  if (typeof params?.slug !== 'string') return { notFound: true };
  const translations = await getServerSideTranslations(locale);
  try {
    const page = await getBlog(params.slug, Boolean(preview));
    if (!page) return { notFound: true };
    return { props: { ...translations, page, previewActive: Boolean(preview) } };
  } catch (error) {
    // Never log request headers or Contentful's potentially sensitive response payload.
    console.error(
      '[blog] Unable to load article:',
      error instanceof Error ? error.name : 'UnknownError',
    );
    res.statusCode = 503;
    res.setHeader('Retry-After', '30');
    return { props: { ...translations, page: null, previewActive: false } };
  }
};
