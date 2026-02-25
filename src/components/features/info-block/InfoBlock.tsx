import { Box, Heading, Text, Flex } from '@chakra-ui/react';
import Image from 'next/image';

import { ComponentInfoBlockFieldsFragment } from '@src/lib/__generated/sdk';

interface InfoBlockProps {
  block: ComponentInfoBlockFieldsFragment;
}

export const InfoBlock = ({ block }: InfoBlockProps) => {
  return (
    <Flex
      direction="column"
      bg="white"
      borderRadius="xl"
      p={{ base: 6, md: 8 }}
      border="1px solid"
      borderColor="gray.100"
      transition="all 0.25s"
      _hover={{
        transform: 'translateY(-4px)',
        boxShadow: 'lg',
      }}
    >
      {block.icon?.url && (
        <Box mb={4} w="48px" h="48px" position="relative" flexShrink={0}>
          <Image
            src={block.icon.url}
            alt={block.icon.title || block.heading || ''}
            width={48}
            height={48}
            style={{ objectFit: 'contain' }}
          />
        </Box>
      )}

      <Heading as="h3" fontSize={{ base: 'lg', md: 'xl' }} fontWeight="700" color="gray.900" mb={3}>
        {block.heading}
      </Heading>

      {block.body && (
        <Text color="gray.600" fontSize={{ base: 'sm', md: 'md' }} lineHeight="1.7">
          {block.body}
        </Text>
      )}
    </Flex>
  );
};
