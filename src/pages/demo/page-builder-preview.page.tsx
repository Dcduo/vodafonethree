import { Box, Container, Heading, Text } from '@chakra-ui/react';

import {
  PageBuilderBlock,
  PageBuilderRenderer,
} from '@src/components/features/contentful/page-builder';

const blocks: PageBuilderBlock[] = [
  {
    __typename: 'DemoFeatureBanner',
    sys: { id: 'preview-hero' },
    internalName: 'Preview hero',
    eyebrow: 'New modular pages',
    heading: 'Build richer pages without hard-coding the layout',
    body:
      'Feature banners can switch theme, layout and calls to action while remaining a reusable Contentful component.',
    layout: 'text-only',
    theme: 'dark',
    primaryCtaText: 'Primary action',
    primaryCtaUrl: '#tabs',
    secondaryCtaText: 'Secondary action',
    secondaryCtaUrl: '#section',
  },
  {
    __typename: 'DemoSectionContainer',
    sys: { id: 'preview-section' },
    internalName: 'Preview coloured section',
    eyebrow: 'Section container',
    heading: 'A full-width background that groups other blocks',
    intro:
      'This outer section controls colour, spacing and content width. Editors can place banners, text blocks and tab groups inside it.',
    theme: 'soft',
    spacing: 'spacious',
    maxWidth: 'standard',
    blocksCollection: {
      items: [
        {
          __typename: 'DemoRichTextBlock',
          sys: { id: 'preview-copy' },
          internalName: 'Preview text block',
          eyebrow: 'Text block',
          heading: 'Simple editorial content, with useful layout controls',
          body:
            'The first version deliberately keeps body copy as plain long text so Writer and Contentful can populate it reliably. Rich text can be added as a second iteration once the component model is proven.',
          alignment: 'left',
          width: 'narrow',
        },
        {
          __typename: 'DemoFeatureBanner',
          sys: { id: 'preview-promo' },
          internalName: 'Preview promo',
          eyebrow: 'Feature banner',
          heading: 'A brighter promotional treatment',
          body:
            'The same banner component can be reused with a brand or accent theme instead of inventing a new content type for every visual variation.',
          layout: 'text-only',
          theme: 'brand',
          primaryCtaText: 'See the tabs',
          primaryCtaUrl: '#tabs',
        },
      ],
    },
  },
  {
    __typename: 'DemoTabGroup',
    sys: { id: 'preview-tabs' },
    internalName: 'Preview tabs',
    eyebrow: 'Tabbed content',
    heading: 'One component, several related stories',
    intro:
      'Tabs are separate Contentful entries, so Writer or an editor can add, reorder and reuse them.',
    theme: 'white',
    tabsCollection: {
      items: [
        {
          __typename: 'DemoTab',
          sys: { id: 'tab-one' },
          internalName: 'Why modular',
          label: 'Why modular?',
          heading: 'Compose pages instead of coding each one',
          body:
            'DemoPage becomes a flexible ordered list of design components. The frontend renderer chooses the right React component from Contentful’s __typename.',
        },
        {
          __typename: 'DemoTab',
          sys: { id: 'tab-two' },
          internalName: 'Writer friendly',
          label: 'Writer friendly',
          heading: 'Structured enough for AI to use safely',
          body:
            'Each component has a small, understandable schema. That gives Writer clear fields to populate instead of asking it to invent presentation markup.',
        },
        {
          __typename: 'DemoTab',
          sys: { id: 'tab-three' },
          internalName: 'Extensible',
          label: 'Extensible',
          heading: 'More block types can be added later',
          body:
            'Card grids, FAQs, stats, comparison tables and other patterns can use the same renderer without changing the overall page model.',
        },
      ],
    },
  },
];

const PageBuilderPreview = () => (
  <Box bg="white">
    <Container maxW="1200px" py={{ base: 8, md: 12 }}>
      <Text color="gray.500" fontSize="sm" mb={2}>
        Contentful page-builder prototype
      </Text>
      <Heading as="h1" size="xl" mb={3}>
        Modular DemoPage components
      </Heading>
      <Text color="gray.600" maxW="760px">
        This page uses mock data only. It lets us validate the visual components before applying
        the Contentful migration or changing the live DemoPage GraphQL query.
      </Text>
    </Container>

    <Box px={{ base: 4, md: 8 }} pb={8}>
      <Container maxW="1400px" p={0}>
        <PageBuilderRenderer blocks={[blocks[0]]} />
      </Container>
    </Box>

    <Box id="section">
      <PageBuilderRenderer blocks={[blocks[1]]} />
    </Box>

    <Container id="tabs" maxW="1200px" py={{ base: 12, md: 16 }}>
      <PageBuilderRenderer blocks={[blocks[2]]} />
    </Container>
  </Box>
);

export default PageBuilderPreview;
