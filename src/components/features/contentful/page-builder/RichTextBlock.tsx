import { Box, Heading, Text } from '@chakra-ui/react';

import { pageBuilderMaxWidth } from './theme';
import { DemoRichTextBlock } from './types';

type Props = {
  block: DemoRichTextBlock;
};

export const RichTextBlock = ({ block }: Props) => {
  const centered = block.alignment === 'center';

  return (
    <Box
      maxW={pageBuilderMaxWidth(block.width)}
      mx={centered ? 'auto' : undefined}
      textAlign={centered ? 'center' : 'left'}
    >
      {block.eyebrow && (
        <Text
          mb={2}
          fontSize="sm"
          fontWeight="700"
          letterSpacing="0.08em"
          textTransform="uppercase"
          opacity={0.75}
        >
          {block.eyebrow}
        </Text>
      )}

      {block.heading && (
        <Heading as="h2" size="xl" mb={block.body ? 4 : 0} lineHeight="1.15">
          {block.heading}
        </Heading>
      )}

      {block.body && (
        <Text fontSize={{ base: 'md', md: 'lg' }} lineHeight="1.8" whiteSpace="pre-line">
          {block.body}
        </Text>
      )}
    </Box>
  );
};
