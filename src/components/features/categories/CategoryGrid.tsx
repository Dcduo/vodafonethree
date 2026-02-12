import { Box, Container, Heading, Text, SimpleGrid, Flex } from '@chakra-ui/react';
import Link from 'next/link';

interface Category {
  name: string;
  description: string;
  emoji: string;
  bgGradient: string;
  href: string;
}

const categories: Category[] = [
  {
    name: 'Pay Monthly Phones',
    description: 'Latest smartphones on flexible plans',
    emoji: '📱',
    bgGradient: 'linear(to-br, #667eea, #764ba2)',
    href: '/products',
  },
  {
    name: 'SIM Only Deals',
    description: 'Keep your phone, switch your plan',
    emoji: '💳',
    bgGradient: 'linear(to-br, #f093fb, #f5576c)',
    href: '/products',
  },
  {
    name: 'Pay As You Go',
    description: 'Top up as you need, no commitment',
    emoji: '💰',
    bgGradient: 'linear(to-br, #4facfe, #00f2fe)',
    href: '/products',
  },
  {
    name: 'Home Broadband',
    description: '5G and fibre broadband for your home',
    emoji: '🏠',
    bgGradient: 'linear(to-br, #43e97b, #38f9d7)',
    href: '/products',
  },
  {
    name: 'Mobile Broadband',
    description: 'Portable Wi-Fi wherever you go',
    emoji: '📡',
    bgGradient: 'linear(to-br, #fa709a, #fee140)',
    href: '/products',
  },
  {
    name: 'Tablets & Laptops',
    description: 'Stay connected on bigger screens',
    emoji: '💻',
    bgGradient: 'linear(to-br, #a18cd1, #fbc2eb)',
    href: '/products',
  },
  {
    name: 'Smartwatches',
    description: 'Smart tech for your wrist',
    emoji: '⌚',
    bgGradient: 'linear(to-br, #ffecd2, #fcb69f)',
    href: '/products',
  },
  {
    name: 'Accessories',
    description: 'Cases, chargers and more',
    emoji: '🎧',
    bgGradient: 'linear(to-br, #a1c4fd, #c2e9fb)',
    href: '/products',
  },
  {
    name: 'Student Discounts',
    description: 'Exclusive offers for students',
    emoji: '🎓',
    bgGradient: 'linear(to-br, #d4fc79, #96e6a1)',
    href: '/products',
  },
  {
    name: 'Business Plans',
    description: 'Solutions for businesses of all sizes',
    emoji: '💼',
    bgGradient: 'linear(to-br, #667eea, #764ba2)',
    href: '/products',
  },
  {
    name: 'Top Up',
    description: 'Quick and easy top ups',
    emoji: '🔋',
    bgGradient: 'linear(to-br, #89f7fe, #66a6ff)',
    href: '/products',
  },
  {
    name: 'Refer a Friend',
    description: 'Earn rewards for referrals',
    emoji: '🤝',
    bgGradient: 'linear(to-br, #fddb92, #d1fdff)',
    href: '/products',
  },
];

export const CategoryGrid = () => {
  return (
    <Box py={{ base: 12, md: 16 }} bg="#fdf2f0">
      <Container maxW="1200px">
        <Heading
          as="h2"
          fontSize={{ base: '2xl', md: '3xl' }}
          fontWeight="700"
          mb={2}
          color="gray.900"
        >
          Take a look around
        </Heading>
        <Text color="gray.600" mb={8} fontSize={{ base: 'md', md: 'lg' }}>
          Browse our products and services
        </Text>

        <SimpleGrid columns={{ base: 2, sm: 3, md: 4, lg: 6 }} spacing={4}>
          {categories.map((category, index) => (
            <Box
              key={index}
              as={Link}
              href={category.href}
              display="block"
              borderRadius="xl"
              overflow="hidden"
              transition="all 0.25s"
              _hover={{
                transform: 'translateY(-4px)',
                boxShadow: 'lg',
              }}
              cursor="pointer"
              bg="white"
              border="1px solid"
              borderColor="gray.100"
            >
              <Flex
                align="center"
                justify="center"
                h={{ base: '80px', md: '100px' }}
                bgGradient={category.bgGradient}
                fontSize={{ base: '2xl', md: '3xl' }}
              >
                {category.emoji}
              </Flex>
              <Box p={3} textAlign="center">
                <Text fontWeight="600" fontSize="sm" color="gray.800" noOfLines={1}>
                  {category.name}
                </Text>
                <Text fontSize="xs" color="gray.500" noOfLines={1} mt={1}>
                  {category.description}
                </Text>
              </Box>
            </Box>
          ))}
        </SimpleGrid>
      </Container>
    </Box>
  );
};
