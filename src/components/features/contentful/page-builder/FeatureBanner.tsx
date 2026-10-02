import { Box, Button, Flex, Heading, Image, Stack, Text } from '@chakra-ui/react';

import { pageBuilderTheme } from './theme';
import { DemoFeatureBanner } from './types';

type Props = {
  block: DemoFeatureBanner;
};

export const FeatureBanner = ({ block }: Props) => {
  const theme = pageBuilderTheme(block.theme);
  const layout = block.layout || 'text-only';
  const hasImage = Boolean(block.image?.url);
  const imageFirst = layout === 'image-left';
  const backgroundImage = layout === 'image-background' && block.image?.url;

  const copy = (
    <Stack
      spacing={4}
      flex="1"
      justify="center"
      position="relative"
      zIndex={1}
      p={{ base: 7, md: 10, lg: 12 }}
    >
      {block.eyebrow && (
        <Text
          fontSize="sm"
          fontWeight="700"
          letterSpacing="0.08em"
          textTransform="uppercase"
          color={theme.muted}
        >
          {block.eyebrow}
        </Text>
      )}

      {block.heading && (
        <Heading as="h2" fontSize={{ base: '3xl', md: '4xl' }} lineHeight="1.08">
          {block.heading}
        </Heading>
      )}

      {block.body && (
        <Text fontSize={{ base: 'md', md: 'lg' }} lineHeight="1.7" color={theme.muted}>
          {block.body}
        </Text>
      )}

      {(block.primaryCtaText || block.secondaryCtaText) && (
        <Flex gap={3} wrap="wrap" pt={2}>
          {block.primaryCtaText && block.primaryCtaUrl && (
            <Button
              as="a"
              href={block.primaryCtaUrl}
              bg={block.theme === 'white' || block.theme === 'soft' ? 'gray.900' : 'white'}
              color={block.theme === 'white' || block.theme === 'soft' ? 'white' : 'gray.900'}
              _hover={{ opacity: 0.9 }}
            >
              {block.primaryCtaText}
            </Button>
          )}

          {block.secondaryCtaText && block.secondaryCtaUrl && (
            <Button
              as="a"
              href={block.secondaryCtaUrl}
              variant="outline"
              borderColor="currentColor"
              color="inherit"
              _hover={{ bg: theme.subtle }}
            >
              {block.secondaryCtaText}
            </Button>
          )}
        </Flex>
      )}
    </Stack>
  );

  return (
    <Box
      position="relative"
      overflow="hidden"
      borderRadius="2xl"
      bg={theme.bg}
      color={theme.color}
      minH={{ base: '320px', md: '380px' }}
      backgroundImage={backgroundImage ? `linear-gradient(rgba(0,0,0,.48), rgba(0,0,0,.48)), url("${backgroundImage}")` : undefined}
      backgroundSize="cover"
      backgroundPosition="center"
      boxShadow="sm"
    >
      {backgroundImage ? (
        copy
      ) : (
        <Flex
          direction={{
            base: 'column',
            md: imageFirst ? 'row-reverse' : 'row',
          }}
          minH={{ base: '320px', md: '380px' }}
        >
          {copy}

          {hasImage && layout !== 'text-only' && (
            <Box flex="1" minH={{ base: '260px', md: '380px' }}>
              <Image
                src={block.image?.url || ''}
                alt={block.image?.description || block.image?.title || ''}
                width="100%"
                height="100%"
                minH={{ base: '260px', md: '380px' }}
                objectFit="cover"
              />
            </Box>
          )}
        </Flex>
      )}
    </Box>
  );
};
