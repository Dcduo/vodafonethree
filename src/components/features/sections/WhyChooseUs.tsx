import { Box, Container, Heading, Text, SimpleGrid, Flex } from '@chakra-ui/react';

interface Reason {
  title: string;
  description: string;
  emoji: string;
  stat?: string;
}

const reasons: Reason[] = [
  {
    title: "The UK's Fastest 5G Network",
    description:
      "Experience blazing-fast 5G speeds wherever you are. We've been awarded the UK's fastest 5G network, so you can stream, download and browse without limits.",
    emoji: '⚡',
    stat: '#1',
  },
  {
    title: '99% UK Population Coverage',
    description:
      'Stay connected almost everywhere with our extensive network coverage. From city centres to the countryside, we keep you online.',
    emoji: '📶',
    stat: '99%',
  },
  {
    title: 'Easy Switching',
    description:
      "Switching is simple and hassle-free. Keep your number, get set up in minutes and we'll handle everything for you. No downtime, no stress.",
    emoji: '🔄',
    stat: '5 min',
  },
];

export const WhyChooseUs = () => {
  return (
    <Box py={{ base: 12, md: 16, lg: 20 }} bg="#fdf2f0">
      <Container maxW="1200px">
        <Box textAlign="center" mb={{ base: 8, md: 12 }}>
          <Heading
            as="h2"
            fontSize={{ base: '2xl', md: '3xl', lg: '4xl' }}
            fontWeight="700"
            mb={3}
            color="gray.900"
          >
            Why choose us?
          </Heading>
          <Text color="gray.600" fontSize={{ base: 'md', md: 'lg' }} maxW="600px" mx="auto">
            We are committed to giving you the best mobile experience in the UK
          </Text>
        </Box>

        <SimpleGrid columns={{ base: 1, md: 3 }} spacing={8}>
          {reasons.map((reason, index) => (
            <Flex
              key={index}
              direction="column"
              align="center"
              textAlign="center"
              bg="white"
              borderRadius="2xl"
              p={{ base: 6, md: 8 }}
              boxShadow="sm"
              border="1px solid"
              borderColor="gray.100"
              transition="all 0.25s"
              _hover={{
                boxShadow: 'lg',
                transform: 'translateY(-2px)',
              }}
            >
              <Flex
                align="center"
                justify="center"
                w="80px"
                h="80px"
                borderRadius="full"
                bg="gray.50"
                fontSize="3xl"
                mb={4}
              >
                {reason.emoji}
              </Flex>
              {reason.stat && (
                <Text
                  fontSize="3xl"
                  fontWeight="800"
                  bgGradient="linear(to-r, #ff7b67, #ff8474)"
                  bgClip="text"
                  mb={2}
                >
                  {reason.stat}
                </Text>
              )}
              <Heading as="h3" fontSize="lg" fontWeight="700" mb={3} color="gray.900">
                {reason.title}
              </Heading>
              <Text color="gray.600" fontSize="sm" lineHeight="tall">
                {reason.description}
              </Text>
            </Flex>
          ))}
        </SimpleGrid>
      </Container>
    </Box>
  );
};
