import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import Head from 'next/head';

import { CategoryGrid } from '@src/components/features/categories/CategoryGrid';
import { PopularDeals } from '@src/components/features/deals/PopularDeals';
import { HeroBannerCarousel } from '@src/components/features/hero-banner/HeroBannerCarousel';
import { FeatureSection } from '@src/components/features/sections/FeatureSection';
import { WhyChooseUs } from '@src/components/features/sections/WhyChooseUs';
import { PageLandingFieldsFragment } from '@src/lib/__generated/sdk';
import { client, previewClient } from '@src/lib/client';
import { getServerSideTranslations } from '@src/pages/utils/get-serverside-translations';

const Page = ({ landing }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const title =
    landing?.heroBannerHeadline || 'VodafoneThree | Mobile Phones, SIM Only Deals & Broadband';
  const products = landing?.productsCollection?.items ?? [];

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta
          name="description"
          content={
            landing?.seoFields?.pageDescription ||
            'Explore the latest mobile phone deals, SIM only plans, broadband packages and more. Switch today and save.'
          }
        />
      </Head>
      <HeroBannerCarousel products={products} />
      <PopularDeals products={products} />
      <CategoryGrid />
      <FeatureSection />
      <WhyChooseUs />
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ locale, preview }) => {
  const gqlClient = preview ? previewClient : client;

  let landing: PageLandingFieldsFragment | null = null;
  try {
    const data = await gqlClient.pageLanding({ locale, preview });
    landing = data.pageLandingCollection?.items[0] ?? null;
  } catch {
    // Contentful may be empty or unavailable — fall back to defaults
  }

  return {
    props: {
      ...(await getServerSideTranslations(locale)),
      landing,
    },
  };
};

export default Page;
