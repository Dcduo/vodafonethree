import { Box, Container, Heading, Image, Stack, Text } from '@chakra-ui/react';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';

import { graphQlClient, previewGraphQlClient } from '@src/lib/client';
import { getServerSideTranslations } from '@src/pages/utils/get-serverside-translations';

type DemoImage = {
  sys: {
    id: string;
  };
  internalName?: string;
  desktopImageUrl?: string;
};

type DemoBattenburg = {
  sys: {
    id: string;
  };
  internalName?: string;
  heading?: string;
  body?: string;
  image?: DemoImage;
  damAsset?: Record<string, unknown>;
};

type DemoPage = {
  sys: {
    id: string;
  };
  internalName?: string;
  slug: string;
  sectionsCollection?: {
    items: Array<DemoBattenburg | null>;
  };
};

type DemoPageQueryResponse = {
  demoPageCollection?: {
    items: Array<DemoPage | null>;
  };
};

type GraphQlRequestError = {
  response?: {
    errors?: unknown;
  };
};

const DEMO_PAGE_QUERY = `
  query DemoPage($slug: String!, $locale: String, $preview: Boolean) {
    demoPageCollection(
      limit: 1
      where: { slug: $slug }
      locale: $locale
      preview: $preview
    ) {
      items {
        sys {
          id
        }
        internalName
        slug
        sectionsCollection(limit: 20) {
          items {
            __typename
            sys {
              id
            }
            ... on DemoBattenburg {
              internalName
              heading
              body
              damAsset
              image {
                sys {
                  id
                }
                internalName
                desktopImageUrl
              }
            }
          }
        }
      }
    }
  }
`;

const DemoPageRoute = (
  props: InferGetServerSidePropsType<typeof getServerSideProps>,
) => {
  const page = props.page as DemoPage;

  const sections = (page.sectionsCollection?.items ?? []).filter(
    (section): section is DemoBattenburg => section !== null,
  );

  return (
    <Box py={{ base: 8, md: 12 }}>
      <Container maxW="1200px">
        <Text mb={2} color="gray.500" fontSize="sm">
          DAM connector prototype
        </Text>

        <Heading as="h1" mb={8}>
          {page.internalName || 'Demo page'}
        </Heading>

        <Stack spacing={10}>
          {sections.map(section => {
            const imageUrl = section.image?.desktopImageUrl;

            return (
              <Box
                key={section.sys.id}
                overflow="hidden"
                borderWidth="1px"
                borderRadius="lg"
                bg="white"
              >
                <Stack
                  direction={{ base: 'column', md: 'row' }}
                  spacing={0}
                  align="stretch"
                >
                  {imageUrl ? (
                    <Box
                      flex="1"
                      minH={{ base: '280px', md: '420px' }}
                      bg="gray.50"
                    >
                      <Image
                        src={imageUrl}
                        alt={section.image?.internalName || ''}
                        width="100%"
                        height="100%"
                        minH={{ base: '280px', md: '420px' }}
                        objectFit="cover"
                      />
                    </Box>
                  ) : (
                    <Box
                      flex="1"
                      minH={{ base: '280px', md: '420px' }}
                      bg="gray.50"
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                      p={6}
                    >
                      <Text color="gray.500">No image URL has been added.</Text>
                    </Box>
                  )}

                  <Stack
                    flex="1"
                    justify="center"
                    spacing={4}
                    p={{ base: 6, md: 10 }}
                  >
                    <Heading as="h2" size="lg">
                      {section.heading || section.internalName}
                    </Heading>

                    {section.body && <Text>{section.body}</Text>}

                    <Text color="gray.500" fontSize="sm">
                      Image delivered directly from Adobe Dynamic Media
                    </Text>
                  </Stack>
                </Stack>
              </Box>
            );
          })}
        </Stack>
      </Container>
    </Box>
  );
};

export const getServerSideProps: GetServerSideProps = async ({
  params,
  locale,
  preview,
}) => {
  if (!params?.slug || typeof params.slug !== 'string') {
    return { notFound: true };
  }

  const gqlClient = preview ? previewGraphQlClient : graphQlClient;

  try {
    const data = await gqlClient.request<DemoPageQueryResponse>(
      DEMO_PAGE_QUERY,
      {
        slug: params.slug,
        locale,
        preview: Boolean(preview),
      },
    );

    const page = data.demoPageCollection?.items[0];

    if (!page) {
      return { notFound: true };
    }

    return {
      props: {
        ...(await getServerSideTranslations(locale)),
        page,
      },
    };
  } catch (error) {
    const graphQlError = error as GraphQlRequestError;

    console.error(
      'CONTENTFUL GRAPHQL ERRORS:',
      JSON.stringify(graphQlError.response?.errors, null, 2),
    );

    throw error;
  }
};

export default DemoPageRoute;
