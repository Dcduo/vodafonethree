import { Box, Container, Heading, SimpleGrid, Text } from '@chakra-ui/react';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';

import { Banner } from '@src/components/features/banner';
import { InfoBlock } from '@src/components/features/info-block';
import { SeoFields } from '@src/components/features/seo/SeoFields';
import {
  ComponentBannerFieldsFragment,
  ComponentInfoBlockFieldsFragment,
  PageStandardFieldsFragment,
} from '@src/lib/__generated/sdk';
import {
  client,
  graphQlClient,
  previewClient,
  previewGraphQlClient,
} from '@src/lib/client';
import { getServerSideTranslations } from '@src/pages/utils/get-serverside-translations';

type MinimalPage = {
  __typename: 'PageStandard';
  sys: {
    id: string;
    spaceId: string;
  };
  internalName?: string | null;
  title?: string | null;
  slug?: string | null;
};

type MinimalPageQueryResponse = {
  pageStandardCollection?: {
    items: Array<MinimalPage | null>;
  } | null;
};

const MINIMAL_PAGE_QUERY = `
  query MinimalPageStandard($slug: String!, $locale: String, $preview: Boolean) {
    pageStandardCollection(
      limit: 1
      where: { slug: $slug }
      locale: $locale
      preview: $preview
    ) {
      items {
        __typename
        sys {
          id
          spaceId
        }
        internalName
        title
        slug
      }
    }
  }
`;

const StandardPage = (props: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const page: PageStandardFieldsFragment = props.page;

  const infoBlocks = (page.infoBlocksCollection?.items ?? []).filter(
    (block): block is ComponentInfoBlockFieldsFragment => block !== null && !!block.heading,
  );

  const hasStructuredContent =
    Boolean(page.bannerPrimary) || Boolean(page.bannerSecondary) || infoBlocks.length > 0;

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

      {!hasStructuredContent && (
        <Container maxW="1200px" py={{ base: 10, md: 14 }}>
          <Heading as="h1" mb={4}>
            {page.title || page.internalName || 'Page'}
          </Heading>
          <Text color="gray.600">
            This Contentful page is published, but no renderable page modules were returned.
          </Text>
        </Container>
      )}
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ params, locale, preview }) => {
  if (!params?.slug || typeof params.slug !== 'string') {
    return { notFound: true };
  }

  const slug = params.slug;
  const sdkClient = preview ? previewClient : client;
  const rawClient = preview ? previewGraphQlClient : graphQlClient;

  const loadRichPage = async (requestedLocale?: string) => {
    const data = await sdkClient.pageStandard({
      slug,
      locale: requestedLocale,
      preview,
    });

    return data.pageStandardCollection?.items[0] ?? null;
  };

  const loadMinimalPage = async (requestedLocale?: string) => {
    const data = await rawClient.request<MinimalPageQueryResponse>(MINIMAL_PAGE_QUERY, {
      slug,
      locale: requestedLocale,
      preview: Boolean(preview),
    });

    return data.pageStandardCollection?.items[0] ?? null;
  };

  try {
    let page = await loadRichPage(locale);

    // A Writer-created entry may only have values in the Contentful default
    // locale. Retry without forcing the Next.js locale before returning 404.
    if (!page && locale) {
      page = await loadRichPage();
    }

    if (!page) {
      return { notFound: true };
    }

    return {
      props: {
        ...(await getServerSideTranslations(locale)),
        page,
      },
    };
  } catch (richError) {
    console.error('Rich Contentful page query failed; retrying minimal page fields:', {
      slug,
      locale,
      preview: Boolean(preview),
      message: richError instanceof Error ? richError.message : 'Unknown error',
    });

    try {
      let minimalPage = await loadMinimalPage(locale);

      if (!minimalPage && locale) {
        minimalPage = await loadMinimalPage();
      }

      if (!minimalPage) {
        return { notFound: true };
      }

      const page: PageStandardFieldsFragment = {
        ...minimalPage,
        bannerPrimary: null,
        bannerSecondary: null,
        infoBlocksCollection: null,
        seoFields: null,
      };

      return {
        props: {
          ...(await getServerSideTranslations(locale)),
          page,
        },
      };
    } catch (minimalError) {
      console.error('Minimal Contentful page query also failed:', {
        slug,
        locale,
        preview: Boolean(preview),
        message: minimalError instanceof Error ? minimalError.message : 'Unknown error',
      });

      throw minimalError;
    }
  }
};

export default StandardPage;
