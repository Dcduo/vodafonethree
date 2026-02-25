import { Box, Container, Heading, Text, Button, Flex } from '@chakra-ui/react';
import Image from 'next/image';
import Link from 'next/link';

import { ComponentBannerFieldsFragment } from '@src/lib/__generated/sdk';

interface BannerProps {
  banner: ComponentBannerFieldsFragment;
  variant?: 'primary' | 'secondary';
}

export const Banner = ({ banner, variant = 'primary' }: BannerProps) => {
  const isPrimary = variant === 'primary';

  return (
    <Box
      position="relative"
      overflow="hidden"
      bg={isPrimary ? 'gray.900' : 'gray.50'}
      minH={{ base: '300px', md: isPrimary ? '420px' : '320px' }}
    >
      {banner.image?.url && (
        <Box position="absolute" inset={0} zIndex={0}>
          <Image
            src={banner.image.url}
            alt={banner.image.title || banner.headline || ''}
            fill
            style={{ objectFit: 'cover' }}
            sizes="100vw"
            priority={isPrimary}
          />
          <Box position="absolute" inset={0} bg={isPrimary ? 'blackAlpha.500' : 'blackAlpha.300'} />
        </Box>
      )}

      <Container maxW="1200px" position="relative" zIndex={1} h="100%">
        <Flex
          direction="column"
          justify="center"
          py={{ base: 12, md: 16 }}
          minH={{ base: '300px', md: isPrimary ? '420px' : '320px' }}
          maxW={{ base: '100%', md: '60%' }}
        >
          <Heading
            as={isPrimary ? 'h1' : 'h2'}
            fontSize={{ base: isPrimary ? '3xl' : '2xl', md: isPrimary ? '5xl' : '3xl' }}
            fontWeight="700"
            color="white"
            mb={banner.subheadline ? 4 : 0}
            lineHeight="1.1"
          >
            {banner.headline}
          </Heading>

          {banner.subheadline && (
            <Text
              fontSize={{ base: 'md', md: 'lg' }}
              color="whiteAlpha.900"
              mb={banner.ctaText ? 6 : 0}
              lineHeight="1.6"
            >
              {banner.subheadline}
            </Text>
          )}

          {banner.ctaText && banner.ctaUrl && (
            <Box>
              <Button
                as={Link}
                href={banner.ctaUrl}
                size="lg"
                bg={isPrimary ? 'white' : 'gray.900'}
                color={isPrimary ? 'gray.900' : 'white'}
                borderRadius="full"
                px={10}
                fontWeight="600"
                _hover={{
                  bg: '#ff7b67',
                  color: 'white',
                  transform: 'translateY(-2px)',
                  boxShadow: 'lg',
                }}
                transition="all 0.2s"
              >
                {banner.ctaText}
              </Button>
            </Box>
          )}
        </Flex>
      </Container>
    </Box>
  );
};
