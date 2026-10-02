import { Box, Container, Heading, Stack, Text } from '@chakra-ui/react';
import { ReactNode } from 'react';

import { pageBuilderMaxWidth, pageBuilderTheme } from './theme';
import { DemoSectionContainer } from './types';

type Props = {
  section: DemoSectionContainer;
  children: ReactNode;
};

const spacingMap = {
  compact: { base: 8, md: 10 },
  normal: { base: 12, md: 16 },
  spacious: { base: 16, md: 24 },
};

export const SectionContainer = ({ section, children }: Props) => {
  const theme = pageBuilderTheme(section.theme);
  const spacing = spacingMap[section.spacing || 'normal'];

  return (
    <Box width="100%" bg={theme.bg} color={theme.color} py={spacing}>
      <Container maxW={pageBuilderMaxWidth(section.maxWidth)}>
        {(section.eyebrow || section.heading || section.intro) && (
          <Stack spacing={3} mb={{ base: 7, md: 10 }} maxW="850px">
            {section.eyebrow && (
              <Text
                fontSize="sm"
                fontWeight="700"
                letterSpacing="0.08em"
                textTransform="uppercase"
                color={theme.muted}
              >
                {section.eyebrow}
              </Text>
            )}
            {section.heading && <Heading as="h2" size="xl">{section.heading}</Heading>}
            {section.intro && (
              <Text fontSize={{ base: 'md', md: 'lg' }} lineHeight="1.7" color={theme.muted}>
                {section.intro}
              </Text>
            )}
          </Stack>
        )}

        <Stack spacing={{ base: 7, md: 10 }}>{children}</Stack>
      </Container>
    </Box>
  );
};
