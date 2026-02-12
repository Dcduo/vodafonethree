import { Box, Container, Heading, Text, SimpleGrid, Flex, Button } from '@chakra-ui/react';

interface Feature {
  title: string;
  subtitle: string;
  description: string;
  ctaText: string;
  emoji: string;
  bgGradient: string;
}

const features: Feature[] = [
  {
    title: 'Android Phones',
    subtitle: 'The latest from Samsung, Google & more',
    description:
      'Explore the newest Android smartphones from top brands. Find the perfect phone for you with our range of pay monthly and pay as you go options.',
    ctaText: 'Browse Android phones',
    emoji: '🤖',
    bgGradient: 'linear(to-br, #0f2027, #203a43, #2c5364)',
  },
  {
    title: 'Smart Glasses',
    subtitle: 'Ray-Ban Meta Collection',
    description:
      'The future of wearable tech. Stream, capture and stay connected hands-free with the latest smart glasses.',
    ctaText: 'Explore smart glasses',
    emoji: '🕶️',
    bgGradient: 'linear(to-br, #141e30, #243b55)',
  },
  {
    title: 'Rewards Programme',
    subtitle: 'More perks, just for being with us',
    description:
      'Get exclusive discounts, priority access to events, free treats and special partner offers. Download the app to start earning.',
    ctaText: 'Discover rewards',
    emoji: '🎉',
    bgGradient: 'linear(to-br, #5f2c82, #49a09d)',
  },
  {
    title: 'Customisable Plans',
    subtitle: 'Your plan, your way',
    description:
      'Mix and match your data, calls and texts to create a plan that fits your life. Adjust anytime, upgrade whenever you want.',
    ctaText: 'Build your plan',
    emoji: '⚙️',
    bgGradient: 'linear(to-br, #232526, #414345)',
  },
];

export const FeatureSection = () => {
  return (
    <Box py={{ base: 12, md: 16 }} bg="white">
      <Container maxW="1200px">
        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
          {features.map((feature, index) => (
            <Box
              key={index}
              borderRadius="2xl"
              overflow="hidden"
              bgGradient={feature.bgGradient}
              transition="all 0.25s"
              _hover={{
                transform: 'translateY(-2px)',
                boxShadow: '2xl',
              }}
            >
              <Flex direction="column" p={{ base: 6, md: 8 }} minH="280px" justify="space-between">
                <Box>
                  <Flex align="center" gap={3} mb={4}>
                    <Text fontSize="3xl">{feature.emoji}</Text>
                    <Box>
                      <Text
                        color="whiteAlpha.700"
                        fontSize="sm"
                        fontWeight="500"
                        textTransform="uppercase"
                        letterSpacing="wider"
                      >
                        {feature.subtitle}
                      </Text>
                      <Heading as="h3" fontSize="2xl" fontWeight="700" color="white">
                        {feature.title}
                      </Heading>
                    </Box>
                  </Flex>
                  <Text color="whiteAlpha.800" fontSize="md" mb={6} lineHeight="tall">
                    {feature.description}
                  </Text>
                </Box>
                <Box>
                  <Button
                    as="a"
                    href="/products"
                    variant="outline"
                    color="white"
                    borderColor="whiteAlpha.400"
                    borderRadius="full"
                    _hover={{
                      bg: 'whiteAlpha.200',
                      borderColor: 'white',
                    }}
                    size="md"
                  >
                    {feature.ctaText}
                  </Button>
                </Box>
              </Flex>
            </Box>
          ))}
        </SimpleGrid>
      </Container>
    </Box>
  );
};
