import {
  Box,
  Container,
  Heading,
  Text,
  Flex,
  Badge,
  Button,
  SimpleGrid,
  List,
  ListItem,
  ListIcon,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
} from '@chakra-ui/react';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';

import { Product, getProductBySlug, getRelatedProducts, categoryLabels } from '@src/data/products';
import { getServerSideTranslations } from '@src/pages/utils/get-serverside-translations';

const CheckIcon = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="#ff7b67"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    style={{ flexShrink: 0 }}
  >
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

const ChevronRightSmall = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <polyline points="9 18 15 12 9 6" />
  </svg>
);

const RelatedProductCard = ({ product }: { product: Product }) => (
  <Box
    as={Link}
    href={`/products/${product.slug}`}
    display="block"
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
  >
    <Flex align="center" justify="center" h="180px" bg="#fdf2f0" position="relative" p={4}>
      {product.badge && (
        <Badge
          position="absolute"
          top={3}
          left={3}
          colorScheme={product.badgeColor}
          borderRadius="full"
          px={3}
          py={1}
          fontSize="xs"
          fontWeight="600"
          zIndex={1}
        >
          {product.badge}
        </Badge>
      )}
      <Box position="relative" w="140px" h="140px">
        <Image
          src={product.imageUrl}
          alt={product.imageAlt}
          fill
          style={{ objectFit: 'contain' }}
          sizes="140px"
        />
      </Box>
    </Flex>
    <Box p={4}>
      <Heading as="h3" fontSize="md" fontWeight="700" mb={1} color="gray.900" noOfLines={1}>
        {product.name}
      </Heading>
      <Flex align="baseline" gap={1}>
        <Text fontSize="lg" fontWeight="700" color="gray.900">
          {product.price}
        </Text>
        <Text fontSize="xs" color="gray.500">
          {product.pricePeriod}
        </Text>
      </Flex>
    </Box>
  </Box>
);

const ProductPage = ({
  product,
  relatedProducts,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  if (!product) return null;

  return (
    <>
      <Head>
        <title>
          {product.name} | VodafoneThree - From {product.price}
          {product.pricePeriod}
        </title>
        <meta name="description" content={product.longDescription || product.description} />
      </Head>

      {/* Gradient banner */}
      <Box
        background="linear-gradient(#ff7b67, #ff8474 26%, #ffaba9 66%, #ffdced)"
        pt={{ base: 4, md: 6 }}
        pb={{ base: 0, md: 0 }}
      >
        <Container maxW="1200px">
          {/* Breadcrumb */}
          <Breadcrumb
            separator={<ChevronRightSmall />}
            mb={{ base: 4, md: 6 }}
            fontSize="sm"
            color="whiteAlpha.900"
          >
            <BreadcrumbItem>
              <BreadcrumbLink as={Link} href="/" _hover={{ color: 'white' }}>
                Home
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbItem>
              <BreadcrumbLink as={Link} href="/products" _hover={{ color: 'white' }}>
                Products
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbItem>
              <BreadcrumbLink as={Link} href="/products" _hover={{ color: 'white' }}>
                {categoryLabels[product.category]}
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbItem isCurrentPage>
              <BreadcrumbLink color="white" fontWeight="600">
                {product.name}
              </BreadcrumbLink>
            </BreadcrumbItem>
          </Breadcrumb>
        </Container>
      </Box>

      {/* Product detail section */}
      <Box bg="#fdf2f0" py={{ base: 8, md: 12 }}>
        <Container maxW="1200px">
          <Flex
            direction={{ base: 'column', lg: 'row' }}
            gap={{ base: 8, lg: 12 }}
            align={{ base: 'center', lg: 'flex-start' }}
          >
            {/* Product image */}
            <Box
              flex={{ base: '1', lg: '0 0 480px' }}
              w={{ base: '100%', lg: '480px' }}
              bg="white"
              borderRadius="2xl"
              p={{ base: 6, md: 10 }}
              display="flex"
              alignItems="center"
              justifyContent="center"
              border="1px solid"
              borderColor="gray.100"
              boxShadow="sm"
            >
              <Box
                position="relative"
                w={{ base: '260px', md: '360px' }}
                h={{ base: '260px', md: '360px' }}
              >
                <Image
                  src={product.imageUrl}
                  alt={product.imageAlt}
                  fill
                  style={{ objectFit: 'contain' }}
                  sizes="(max-width: 768px) 260px, 360px"
                  priority
                />
              </Box>
            </Box>

            {/* Product info */}
            <Box flex="1" w="100%">
              {product.badge && (
                <Badge
                  colorScheme={product.badgeColor}
                  borderRadius="full"
                  px={4}
                  py={1}
                  fontSize="sm"
                  fontWeight="600"
                  mb={3}
                >
                  {product.badge}
                </Badge>
              )}

              <Heading
                as="h1"
                fontSize={{ base: '2xl', md: '3xl', lg: '4xl' }}
                fontWeight="700"
                color="gray.900"
                mb={2}
              >
                {product.name}
              </Heading>

              <Text
                color="gray.500"
                fontSize="sm"
                textTransform="uppercase"
                letterSpacing="wider"
                mb={4}
              >
                {categoryLabels[product.category]}
              </Text>

              <Flex
                align="baseline"
                gap={2}
                mb={6}
                bg="white"
                p={4}
                borderRadius="xl"
                border="1px solid"
                borderColor="gray.100"
              >
                <Text fontSize={{ base: '3xl', md: '4xl' }} fontWeight="700" color="gray.900">
                  {product.price}
                </Text>
                <Text fontSize="lg" color="gray.500" fontWeight="500">
                  {product.pricePeriod}
                </Text>
              </Flex>

              <Text color="gray.700" fontSize={{ base: 'md', md: 'lg' }} lineHeight="1.7" mb={6}>
                {product.longDescription}
              </Text>

              {/* CTA buttons */}
              <Flex gap={4} mb={8} flexWrap="wrap">
                <Button
                  size="lg"
                  bg="gray.900"
                  color="white"
                  borderRadius="full"
                  px={10}
                  fontWeight="600"
                  _hover={{
                    bg: '#ff7b67',
                    transform: 'translateY(-2px)',
                    boxShadow: 'lg',
                  }}
                  transition="all 0.2s"
                >
                  Get this deal
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  borderColor="gray.900"
                  color="gray.900"
                  borderRadius="full"
                  px={10}
                  fontWeight="600"
                  _hover={{
                    bg: 'gray.900',
                    color: 'white',
                    transform: 'translateY(-2px)',
                    boxShadow: 'lg',
                  }}
                  transition="all 0.2s"
                >
                  Compare plans
                </Button>
              </Flex>

              {/* Key highlights */}
              {product.highlights && product.highlights.length > 0 && (
                <Box bg="white" borderRadius="xl" p={6} border="1px solid" borderColor="gray.100">
                  <Heading as="h2" fontSize="lg" fontWeight="700" color="gray.900" mb={4}>
                    Key features
                  </Heading>
                  <List spacing={3}>
                    {product.highlights.map((highlight, index) => (
                      <ListItem
                        key={index}
                        display="flex"
                        alignItems="center"
                        gap={3}
                        color="gray.700"
                        fontSize="md"
                      >
                        <ListIcon as={() => <CheckIcon />} />
                        {highlight}
                      </ListItem>
                    ))}
                  </List>
                </Box>
              )}
            </Box>
          </Flex>
        </Container>
      </Box>

      {/* Why choose VodafoneThree strip */}
      <Box
        background="linear-gradient(#ff7b67, #ff8474 26%, #ffaba9 66%, #ffdced)"
        py={{ base: 8, md: 10 }}
      >
        <Container maxW="1200px">
          <SimpleGrid columns={{ base: 1, md: 3 }} spacing={{ base: 6, md: 8 }}>
            <Flex align="center" gap={4}>
              <Flex
                w="50px"
                h="50px"
                bg="whiteAlpha.400"
                borderRadius="full"
                align="center"
                justify="center"
                flexShrink={0}
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="white"
                  strokeWidth="2"
                >
                  <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
                </svg>
              </Flex>
              <Box>
                <Text color="white" fontWeight="700" fontSize="md">
                  Fastest 5G Network
                </Text>
                <Text color="whiteAlpha.900" fontSize="sm">
                  Blazing speeds across the UK
                </Text>
              </Box>
            </Flex>
            <Flex align="center" gap={4}>
              <Flex
                w="50px"
                h="50px"
                bg="whiteAlpha.400"
                borderRadius="full"
                align="center"
                justify="center"
                flexShrink={0}
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="white"
                  strokeWidth="2"
                >
                  <path d="M12 22s-8-4.5-8-11.8A8 8 0 0 1 12 2a8 8 0 0 1 8 8.2c0 7.3-8 11.8-8 11.8z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
              </Flex>
              <Box>
                <Text color="white" fontWeight="700" fontSize="md">
                  99% UK Coverage
                </Text>
                <Text color="whiteAlpha.900" fontSize="sm">
                  Stay connected everywhere
                </Text>
              </Box>
            </Flex>
            <Flex align="center" gap={4}>
              <Flex
                w="50px"
                h="50px"
                bg="whiteAlpha.400"
                borderRadius="full"
                align="center"
                justify="center"
                flexShrink={0}
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="white"
                  strokeWidth="2"
                >
                  <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3H14z" />
                  <path d="M7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3" />
                </svg>
              </Flex>
              <Box>
                <Text color="white" fontWeight="700" fontSize="md">
                  Easy Switching
                </Text>
                <Text color="whiteAlpha.900" fontSize="sm">
                  Switch in under 5 minutes
                </Text>
              </Box>
            </Flex>
          </SimpleGrid>
        </Container>
      </Box>

      {/* Related products */}
      {relatedProducts && relatedProducts.length > 0 && (
        <Box py={{ base: 10, md: 14 }} bg="white">
          <Container maxW="1200px">
            <Heading
              as="h2"
              fontSize={{ base: 'xl', md: '2xl' }}
              fontWeight="700"
              mb={2}
              color="gray.900"
            >
              You might also like
            </Heading>
            <Text color="gray.600" mb={8} fontSize={{ base: 'sm', md: 'md' }}>
              More from {categoryLabels[product.category]}
            </Text>
            <SimpleGrid columns={{ base: 2, md: 3, lg: 4 }} spacing={6}>
              {relatedProducts.map((rp: Product) => (
                <RelatedProductCard key={rp.slug} product={rp} />
              ))}
            </SimpleGrid>
            <Flex justify="center" mt={10}>
              <Button
                as={Link}
                href="/products"
                size="lg"
                bg="gray.900"
                color="white"
                borderRadius="full"
                px={10}
                fontWeight="600"
                _hover={{
                  bg: '#ff7b67',
                  transform: 'translateY(-2px)',
                  boxShadow: 'lg',
                }}
                transition="all 0.2s"
              >
                Browse all products
              </Button>
            </Flex>
          </Container>
        </Box>
      )}
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ params, locale }) => {
  if (!params?.slug || typeof params.slug !== 'string') {
    return { notFound: true };
  }

  const product = getProductBySlug(params.slug);

  if (!product) {
    return { notFound: true };
  }

  const relatedProducts = getRelatedProducts(product, 4);

  return {
    props: {
      ...(await getServerSideTranslations(locale)),
      product,
      relatedProducts,
    },
  };
};

export default ProductPage;
