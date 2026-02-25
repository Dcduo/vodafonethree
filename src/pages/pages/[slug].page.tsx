import { Box, Container, SimpleGrid } from '@chakra-ui/react';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';

import { Banner } from '@src/components/features/banner';
import { InfoBlock } from '@src/components/features/info-block';
import { SeoFields } from '@src/components/features/seo/SeoFields';
import {
  ComponentBannerFieldsFragment,
  ComponentInfoBlockFieldsFragment,
  PageStandardFieldsFragment,
} from '@src/lib/__generated/sdk';
import { client, previewClient } from '@src/lib/client';
import { getServerSideTranslations } from '@src/pages/utils/get-serverside-translations';

const StandardPage = (props: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const page: PageStandardFieldsFragment = props.page;

  const infoBlocks = (page.infoBlocksCollection?.items ?? []).filter(
    (block): block is ComponentInfoBlockFieldsFragment => block !== null && !!block.heading,
  );

  return (
    <>
      {page.seoFields && <SeoFields {...page.seoFields} />}

      {/* Primary banner */}
      {page.bannerPrimary && (
        <Banner banner={page.bannerPrimary as ComponentBannerFieldsFragment} variant="primary" />
      )}

      {/* Secondary banner */}
      {page.bannerSecondary && (
        <Banner
          banner={page.bannerSecondary as ComponentBannerFieldsFragment}
          variant="secondary"
        />
      )}

      {/* Info blocks */}
      {infoBlocks.length > 0 && (
        <Box py={{ base: 10, md: 14 }} bg="gray.50">
          <Container maxW="1200px">
            <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={{ base: 6, md: 8 }}>
              {infoBlocks.map(block => (
                <InfoBlock key={block.sys.id} block={block} />
              ))}
            </SimpleGrid>
          </Container>
        </Box>
      )}
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ params, locale, preview }) => {
  if (!params?.slug || typeof params.slug !== 'string') {
    return { notFound: true };
  }

  const gqlClient = preview ? previewClient : client;

  try {
    const data = await gqlClient.pageStandard({ slug: params.slug, locale, preview });
    const page = data.pageStandardCollection?.items[0];

    if (!page) {
      return { notFound: true };
    }

    return {
      props: {
        ...(await getServerSideTranslations(locale)),
        page,
      },
    };
  } catch {
    return { notFound: true };
  }
};

export default StandardPage;
