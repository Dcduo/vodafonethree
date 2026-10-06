import { GetStaticProps } from 'next';

import { BlogArticle } from '@src/components/features/blog/BlogArticle';
import demo from '@src/lib/blog/demo.json';
import { getServerSideTranslations } from '@src/pages/utils/get-serverside-translations';

export default function BlogPreview() {
  return <BlogArticle page={demo} />;
}

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
  props: await getServerSideTranslations(locale),
});
