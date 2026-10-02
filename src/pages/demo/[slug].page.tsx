import { Box, Container, Heading, Image, Stack, Text } from '@chakra-ui/react';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';

import { graphQlClient, previewGraphQlClient } from '@src/lib/client';
import { getServerSideTranslations } from '@src/pages/utils/get-serverside-translations';

type ContentfulAsset = {
  sys: {
    id: string;
  };
  url?: string | null;
  title?: string | null;
  description?: string | null;
};

type DemoBattenburg = {
  sys: {
    id: string;
  };
  internalName?: string;
  heading?: string;
  body?: string;
  imgbat?: ContentfulAsset | null;
};

type DemoPage = {
  sys: {
    id: string;
  };
  internalName?: string;
  slug: string;
  sectionsCollection?: {
    items: Array<DemoBattenburg | null>;
  } | null;
};

type DemoPageQueryResponse = {
  demoPageCollection?: {
    items: Array<DemoPage | null>;
  } | null;
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
              imgbat {
                sys {
                  id
                }
                url
                title
                description
              }
            }
          }
        }
      }
    }
  }
`;

const MINIMAL_DEMO_PAGE_QUERY = `
  query MinimalDemoPage($slug: String!, $locale: String, $preview: Boolean) {
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
          Contentful demo page
        </Text>

        <Heading as="h1" mb={8}>
          {page.internalName || 'Demo page'}
        </Heading>

        {sections.length === 0 && (
          <Text color="gray.600">
            This DemoPage is published, but it does not currently have any renderable published
            sections.
          </Text>
        )}

        <Stack spacing={10}>
          {sections.map(section => {
            const imageUrl = section.imgbat?.url;
            const imageAlt =
              section.imgbat?.description ||
              section.imgbat?.title ||
              section.heading ||
              section.internalName ||
              '';

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
                        alt={imageAlt}
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
                      <Text color="gray.500">No image has been added.</Text>
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

  const slug = params.slug;
  const gqlClient = preview ? previewGraphQlClient : graphQlClient;

  const loadPage = async (
    query: string,
    requestedLocale?: string,
  ): Promise<DemoPage | null> => {
    const data = await gqlClient.request<DemoPageQueryResponse>(
      query,
      {
        slug,
        locale: requestedLocale,
        preview: Boolean(preview),
      },
    );

    return data.demoPageCollection?.items[0] ?? null;
  };

  try {
    let page = await loadPage(DEMO_PAGE_QUERY, locale);

    if (!page && locale) {
      page = await loadPage(DEMO_PAGE_QUERY);
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
  } catch (error) {
    const graphQlError = error as GraphQlRequestError;

    console.error(
      'Rich DemoPage query failed; retrying minimal fields:',
      JSON.stringify(graphQlError.response?.errors, null, 2),
    );

    try {
      let page = await loadPage(MINIMAL_DEMO_PAGE_QUERY, locale);

      if (!page && locale) {
        page = await loadPage(MINIMAL_DEMO_PAGE_QUERY);
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
    } catch (minimalError) {
      const minimalGraphQlError = minimalError as GraphQlRequestError;

      console.error(
        'Minimal DemoPage query also failed:',
        JSON.stringify(minimalGraphQlError.response?.errors, null, 2),
      );

      throw minimalError;
    }
  }
};

export default DemoPageRoute;
