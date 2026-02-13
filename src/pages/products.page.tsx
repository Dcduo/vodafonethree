import { Box, Container, Heading, Text, SimpleGrid, Flex, Button } from '@chakra-ui/react';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';

import { PageProductFieldsFragment } from '@src/lib/__generated/sdk';
import { client, previewClient } from '@src/lib/client';
import { getServerSideTranslations } from '@src/pages/utils/get-serverside-translations';

const ProductCard = ({ product }: { product: PageProductFieldsFragment }) => {
  const imageUrl =
    product.featuredProductImage?.url || product.productImagesCollection?.items?.[0]?.url || '';
  const price = product.price != null ? `£${product.price}` : '';

  return (
    <Box
      as={Link}
      href={`/products/${product.slug || ''}`}
      id={product.slug || undefined}
      display="flex"
      flexDirection="column"
      bg="white"
      borderRadius="xl"
      overflow="hidden"
      transition="all 0.25s"
      _hover={{
        transform: 'translateY(-4px)',
        boxShadow: 'xl',
      }}
      border="1px solid"
      borderColor="gray.100"
      cursor="pointer"
    >
      <Flex align="center" justify="center" h="220px" bg="#fdf2f0" position="relative" p={4}>
        {imageUrl && (
          <Box position="relative" w="180px" h="180px">
            <Image
              src={imageUrl}
              alt={product.featuredProductImage?.title || product.name || ''}
              fill
              style={{ objectFit: 'contain' }}
              sizes="180px"
            />
          </Box>
        )}
      </Flex>

      <Box p={5} flex="1" display="flex" flexDirection="column">
        <Heading as="h3" fontSize="lg" fontWeight="700" mb={2} color="gray.900">
          {product.name || 'Product'}
        </Heading>
        <Text color="gray.600" fontSize="sm" mb={4} noOfLines={2} flex="1">
          {product.description || ''}
        </Text>
        {price && (
          <Flex align="baseline" gap={1} mb={4}>
            <Text fontSize="2xl" fontWeight="700" color="gray.900">
              {price}
            </Text>
            <Text fontSize="sm" color="gray.500">
              /month
            </Text>
          </Flex>
        )}
        <Button
          size="sm"
          bg="gray.900"
          color="white"
          borderRadius="full"
          fontWeight="600"
          _hover={{
            bg: '#ff7b67',
            transform: 'translateY(-1px)',
          }}
          transition="all 0.2s"
          w="100%"
          pointerEvents="none"
        >
          View deal
        </Button>
      </Box>
    </Box>
  );
};

const Page = ({ products }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const allProducts: PageProductFieldsFragment[] = (products ?? []).filter(
    (p: PageProductFieldsFragment | null): p is PageProductFieldsFragment => p !== null && !!p.name,
  );

  return (
    <>
      <Head>
        <title>Products | VodafoneThree - Phones, SIMs, Broadband &amp; Wearables</title>
        <meta
          name="description"
          content="Browse our full range of phones, SIM only deals, broadband packages and wearables. Find the perfect deal for you."
        />
      </Head>

      {/* Hero section with gradient */}
      <Box
        background="linear-gradient(#ff7b67, #ff8474 26%, #ffaba9 66%, #ffdced)"
        py={{ base: 12, md: 16 }}
      >
        <Container maxW="1200px">
          <Box textAlign="center" maxW="700px" mx="auto">
            <Text
              color="white"
              fontWeight="600"
              fontSize="sm"
              textTransform="uppercase"
              letterSpacing="wider"
              mb={3}
            >
              Our full range
            </Text>
            <Heading
              as="h1"
              color="white"
              fontSize={{ base: '3xl', md: '4xl', lg: '5xl' }}
              fontWeight="700"
              lineHeight="1.1"
              mb={4}
            >
              All Products
            </Heading>
            <Text color="whiteAlpha.900" fontSize={{ base: 'md', md: 'lg' }}>
              Discover the latest phones, flexible SIM plans, ultrafast broadband and smart
              wearables. All on the UK&apos;s fastest 5G network.
            </Text>
          </Box>
        </Container>
      </Box>

      {/* Products grid */}
      <Box py={{ base: 8, md: 12 }} bg="#fdf2f0" minH="60vh">
        <Container maxW="1200px">
          {allProducts.length > 0 ? (
            <SimpleGrid columns={{ base: 1, sm: 2, lg: 3, xl: 4 }} spacing={6}>
              {allProducts.map(product => (
                <ProductCard key={product.sys.id} product={product} />
              ))}
            </SimpleGrid>
          ) : (
            <Box textAlign="center" py={16}>
              <Text color="gray.500" fontSize="lg">
                No products available at the moment. Check back soon!
              </Text>
            </Box>
          )}
        </Container>
      </Box>

      {/* Bottom CTA */}
      <Box py={{ base: 12, md: 16 }} bg="white">
        <Container maxW="800px" textAlign="center">
          <Heading
            as="h2"
            fontSize={{ base: '2xl', md: '3xl' }}
            fontWeight="700"
            mb={3}
            color="gray.900"
          >
            Not sure what you need?
          </Heading>
          <Text color="gray.600" fontSize={{ base: 'md', md: 'lg' }} mb={6}>
            Our team can help you find the perfect plan. Whether you&apos;re looking for a new
            phone, a SIM only deal, or broadband for your home, we&apos;ve got you covered.
          </Text>
          <Flex justify="center" gap={4} flexWrap="wrap">
            <Button
              as={Link}
              href="/"
              size="lg"
              bg="gray.900"
              color="white"
              borderRadius="full"
              px={8}
              fontWeight="600"
              _hover={{
                bg: '#ff7b67',
                transform: 'translateY(-2px)',
                boxShadow: 'lg',
              }}
              transition="all 0.2s"
            >
              Back to home
            </Button>
          </Flex>
        </Container>
      </Box>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ locale, preview }) => {
  const gqlClient = preview ? previewClient : client;

  let products: Array<PageProductFieldsFragment | null> = [];
  try {
    const data = await gqlClient.pageProductCollection({ locale, preview });
    products = data.pageProductCollection?.items ?? [];
  } catch {
    // Contentful may be empty or unavailable
  }

  return {
    props: {
      ...(await getServerSideTranslations(locale)),
      products,
    },
  };
};

export default Page;
