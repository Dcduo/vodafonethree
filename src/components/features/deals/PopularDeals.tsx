import { Box, Container, Heading, Text, SimpleGrid, Flex, Badge, Button } from '@chakra-ui/react';
import Image from 'next/image';
import Link from 'next/link';

interface Deal {
  name: string;
  promotion: string;
  description: string;
  price: string;
  pricePeriod: string;
  badge?: string;
  badgeColor?: string;
  imageUrl: string;
  imageAlt: string;
  bgColor: string;
  slug: string;
}

const deals: Deal[] = [
  {
    name: 'iPhone 15',
    promotion: '3 months half price',
    description: 'On selected pay monthly plans when you switch to us.',
    price: '£35.99',
    pricePeriod: '/month',
    badge: 'Popular',
    badgeColor: 'red',
    imageUrl:
      'https://www.three.co.uk/content/dam/threedigital/new-dam-structure-temp/device-images/phones/apple/iphone-15/popular-deals-tile-620px-iphone15-pink-dmcd.png',
    imageAlt: 'iPhone 15 in Pink',
    bgColor: '#fdf2f0',
    slug: 'iphone-15',
  },
  {
    name: 'Samsung Galaxy S25',
    promotion: 'Double storage',
    description: 'Get 512GB for the price of 256GB. Online exclusive.',
    price: '£39.99',
    pricePeriod: '/month',
    badge: 'New',
    badgeColor: 'purple',
    imageUrl:
      'https://www.three.co.uk/content/dam/threedigital/new-dam-structure-temp/device-images/phones/samsung/s25-range/hub-and-series-page/620x620-samsung-s25-blue.png',
    imageAlt: 'Samsung Galaxy S25 in Blue',
    bgColor: '#fdf2f0',
    slug: 'samsung-galaxy-s25',
  },
  {
    name: 'Unlimited SIM Only',
    promotion: 'Best value SIM',
    description: 'Unlimited data, calls and texts. 30-day rolling contract available.',
    price: '£10',
    pricePeriod: '/month',
    badge: 'Best Seller',
    badgeColor: 'green',
    imageUrl:
      'https://www.three.co.uk/content/dam/threedigital/new-dam-structure-temp/device-images/sim/sim-630px-new.png',
    imageAlt: 'Three SIM Card',
    bgColor: '#fdf2f0',
    slug: 'unlimited-sim',
  },
  {
    name: 'Google Pixel 10 Pro',
    promotion: 'AI-powered photography',
    description: 'The smartest Pixel yet with Gemini built in and incredible camera.',
    price: '£42.99',
    pricePeriod: '/month',
    imageUrl:
      'https://www.three.co.uk/content/dam/threedigital/new-dam-structure-temp/device-images/phones/google/pixel-10/google-pixel-10-pro-logo-1100-1100px.png',
    imageAlt: 'Google Pixel 10 Pro',
    bgColor: '#fdf2f0',
    slug: 'google-pixel-10-pro',
  },
  {
    name: 'HONOR Magic V5',
    promotion: '3 months half price',
    description: 'The latest foldable phone. Incredible display, ultra-thin design.',
    price: '£52.99',
    pricePeriod: '/month',
    badge: 'Hot',
    badgeColor: 'orange',
    imageUrl:
      'https://www.three.co.uk/content/dam/threedigital/new-dam-structure-temp/device-images/phones/honor/magic-v5/620x620-honor-magic-v5-black.png',
    imageAlt: 'HONOR Magic V5 in Black',
    bgColor: '#fdf2f0',
    slug: 'honor-magic-v5',
  },
  {
    name: '5G Home Broadband',
    promotion: 'Save £200',
    description: 'Ultra-fast broadband. No landline required. Easy plug-and-play setup.',
    price: '£20',
    pricePeriod: '/month',
    imageUrl:
      'https://www.three.co.uk/content/dam/threedigital/new-dam-structure-temp/device-images/broadband/wifi-graphic-1500x750.png',
    imageAlt: 'Three 5G Home Broadband',
    bgColor: '#fdf2f0',
    slug: '5g-home-broadband',
  },
];

export const PopularDeals = () => {
  return (
    <Box py={{ base: 12, md: 16 }} bg="white">
      <Container maxW="1200px">
        <Heading
          as="h2"
          fontSize={{ base: '2xl', md: '3xl' }}
          fontWeight="700"
          mb={2}
          color="gray.900"
        >
          Popular deals
        </Heading>
        <Text color="gray.600" mb={8} fontSize={{ base: 'md', md: 'lg' }}>
          Our most popular offers right now
        </Text>

        <SimpleGrid columns={{ base: 1, sm: 2, lg: 3 }} spacing={6}>
          {deals.map((deal, index) => (
            <Box
              key={index}
              as={Link}
              href={`/products/${deal.slug}`}
              display="block"
              bg={deal.bgColor}
              borderRadius="xl"
              overflow="hidden"
              transition="all 0.25s"
              _hover={{
                transform: 'translateY(-4px)',
                boxShadow: 'xl',
              }}
              cursor="pointer"
              border="1px solid"
              borderColor="gray.100"
            >
              {/* Card image area */}
              <Flex
                align="center"
                justify="center"
                h="200px"
                bg="whiteAlpha.600"
                position="relative"
                p={4}
              >
                {deal.badge && (
                  <Badge
                    position="absolute"
                    top={3}
                    left={3}
                    colorScheme={deal.badgeColor}
                    borderRadius="full"
                    px={3}
                    py={1}
                    fontSize="xs"
                    fontWeight="600"
                    zIndex={1}
                  >
                    {deal.badge}
                  </Badge>
                )}
                <Box position="relative" w="160px" h="160px">
                  <Image
                    src={deal.imageUrl}
                    alt={deal.imageAlt}
                    fill
                    style={{ objectFit: 'contain' }}
                    sizes="160px"
                  />
                </Box>
              </Flex>

              {/* Card content */}
              <Box p={5}>
                <Text
                  color="#ff7b67"
                  fontWeight="600"
                  fontSize="sm"
                  mb={1}
                  textTransform="uppercase"
                  letterSpacing="wide"
                >
                  {deal.promotion}
                </Text>
                <Heading as="h3" fontSize="xl" fontWeight="700" mb={2} color="gray.900">
                  {deal.name}
                </Heading>
                <Text color="gray.600" fontSize="sm" mb={4} noOfLines={2}>
                  {deal.description}
                </Text>
                <Flex align="baseline" gap={1}>
                  <Text fontSize="2xl" fontWeight="700" color="gray.900">
                    {deal.price}
                  </Text>
                  <Text fontSize="sm" color="gray.500">
                    {deal.pricePeriod}
                  </Text>
                </Flex>
              </Box>
            </Box>
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
  );
};
