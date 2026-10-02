import { ReactNode } from 'react';

import { FeatureBanner } from './FeatureBanner';
import { RichTextBlock } from './RichTextBlock';
import { SectionContainer } from './SectionContainer';
import { TabGroup } from './TabGroup';
import { PageBuilderBlock } from './types';

type Props = {
  blocks: Array<PageBuilderBlock | null>;
};

export const PageBuilderRenderer = ({ blocks }: Props) => {
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
        return null;
    }
  };

  return <>{blocks.filter((block): block is PageBuilderBlock => block !== null).map(renderBlock)}</>;
};
