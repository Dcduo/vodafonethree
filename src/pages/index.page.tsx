import { GetServerSideProps } from 'next';
import Head from 'next/head';

import { CategoryGrid } from '@src/components/features/categories/CategoryGrid';
import { PopularDeals } from '@src/components/features/deals/PopularDeals';
import { HeroBannerCarousel } from '@src/components/features/hero-banner/HeroBannerCarousel';
import { FeatureSection } from '@src/components/features/sections/FeatureSection';
import { WhyChooseUs } from '@src/components/features/sections/WhyChooseUs';
import { getServerSideTranslations } from '@src/pages/utils/get-serverside-translations';

const Page = () => {
  return (
    <>
      <Head>
        <title>VodafoneThree | Mobile Phones, SIM Only Deals &amp; Broadband</title>
        <meta
          name="description"
          content="Explore the latest mobile phone deals, SIM only plans, broadband packages and more. Switch today and save."
        />
      </Head>
      <HeroBannerCarousel />
      <PopularDeals />
      <CategoryGrid />
      <FeatureSection />
      <WhyChooseUs />
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ locale }) => {
  return {
    props: {
      ...(await getServerSideTranslations(locale)),
    },
  };
};

export default Page;
