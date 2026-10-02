import {
  Box,
  Button,
  Heading,
  Image,
  Stack,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from '@chakra-ui/react';

import { pageBuilderTheme } from './theme';
import { DemoTabGroup } from './types';

type Props = {
  block: DemoTabGroup;
};

export const TabGroup = ({ block }: Props) => {
  const theme = pageBuilderTheme(block.theme);
  const tabs = (block.tabsCollection?.items ?? []).filter(
    (tab): tab is NonNullable<typeof tab> => tab !== null,
  );

  if (!tabs.length) return null;

  return (
    <Box borderRadius="2xl" bg={theme.bg} color={theme.color} p={{ base: 6, md: 9 }}>
      {(block.eyebrow || block.heading || block.intro) && (
        <Stack spacing={3} mb={7}>
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
          {block.heading && <Heading as="h2" size="xl">{block.heading}</Heading>}
          {block.intro && <Text color={theme.muted} maxW="800px">{block.intro}</Text>}
        </Stack>
      )}

      <Tabs variant="soft-rounded" isLazy>
        <TabList gap={2} flexWrap="wrap" mb={5}>
          {tabs.map(tab => (
            <Tab
              key={tab.sys.id}
              border="1px solid"
              borderColor={theme.subtle}
              _selected={{ bg: theme.color, color: theme.bg }}
            >
              {tab.label || tab.internalName || 'Tab'}
            </Tab>
          ))}
        </TabList>

        <TabPanels>
          {tabs.map(tab => (
            <TabPanel key={tab.sys.id} px={0}>
              <Stack
                direction={{ base: 'column', md: tab.image?.url ? 'row' : 'column' }}
                spacing={{ base: 6, md: 9 }}
                align="center"
              >
                <Stack spacing={4} flex="1" align="flex-start">
                  {tab.heading && <Heading as="h3" size="lg">{tab.heading}</Heading>}
                  {tab.body && (
                    <Text color={theme.muted} lineHeight="1.75" whiteSpace="pre-line">
                      {tab.body}
                    </Text>
                  )}
                  {tab.ctaText && tab.ctaUrl && (
                    <Button as="a" href={tab.ctaUrl}>
                      {tab.ctaText}
                    </Button>
                  )}
                </Stack>

                {tab.image?.url && (
                  <Image
                    src={tab.image.url}
                    alt={tab.image.description || tab.image.title || ''}
                    flex="1"
                    maxW={{ base: '100%', md: '50%' }}
                    borderRadius="xl"
                    objectFit="cover"
                  />
                )}
              </Stack>
            </TabPanel>
          ))}
        </TabPanels>
      </Tabs>
    </Box>
  );
};
