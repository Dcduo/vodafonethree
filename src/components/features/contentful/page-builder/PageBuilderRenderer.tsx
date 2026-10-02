import { Box, Container, Text } from '@chakra-ui/react';
import { ReactNode } from 'react';

import { FeatureBanner } from './FeatureBanner';
import { RichTextBlock } from './RichTextBlock';
import { SectionContainer } from './SectionContainer';
import { TabGroup } from './TabGroup';
import { PageBuilderBlock } from './types';

type Props = {
  blocks: Array<PageBuilderBlock | null>;
  showUnknownBlocks?: boolean;
};

export const PageBuilderRenderer = ({ blocks, showUnknownBlocks = false }: Props) => {
  const renderBlock = (block: PageBuilderBlock): ReactNode => {
    switch (block.__typename) {
      case 'DemoFeatureBanner':
        return <FeatureBanner key={block.sys.id} block={block} />;

      case 'DemoRichTextBlock':
        return <RichTextBlock key={block.sys.id} block={block} />;

      case 'DemoTabGroup':
        return <TabGroup key={block.sys.id} block={block} />;

      case 'DemoSectionContainer': {
        const nestedBlocks = (block.blocksCollection?.items ?? []).filter(
          (item): item is NonNullable<typeof item> => item !== null,
        );

        return (
          <SectionContainer key={block.sys.id} section={block}>
            {nestedBlocks.map(nestedBlock => renderBlock(nestedBlock))}
          </SectionContainer>
        );
      }

      default:
        if (!showUnknownBlocks) return null;

        return (
          <Container key={block.sys.id} maxW="1200px" py={4}>
            <Box borderWidth="1px" borderRadius="lg" p={4}>
              <Text color="gray.500">Unsupported page-builder block: {block.__typename}</Text>
            </Box>
          </Container>
        );
    }
  };

  return <>{blocks.filter((block): block is PageBuilderBlock => block !== null).map(renderBlock)}</>;
};
