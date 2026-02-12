import {
  Box,
  Container,
  SimpleGrid,
  Text,
  Heading,
  Flex,
  Link as ChakraLink,
} from '@chakra-ui/react';
import NextLink from 'next/link';

const footerSections = [
  {
    title: 'Shop',
    links: [
      { label: 'Mobile Phones', href: '/products' },
      { label: 'SIM Only Deals', href: '/products' },
      { label: 'Pay As You Go', href: '/products' },
      { label: 'Broadband', href: '/products' },
      { label: 'Tablets', href: '/products' },
      { label: 'Smartwatches', href: '/products' },
      { label: 'Accessories', href: '/products' },
      { label: 'All Products', href: '/products' },
    ],
  },
  {
    title: 'Popular Phones',
    links: [
      { label: 'iPhone 17', href: '/products/iphone-17' },
      { label: 'iPhone 15', href: '/products/iphone-15' },
      { label: 'Samsung Galaxy S25', href: '/products/samsung-galaxy-s25' },
      { label: 'Google Pixel 10 Pro', href: '/products/google-pixel-10-pro' },
      { label: 'Samsung Galaxy Z Fold7', href: '/products/samsung-galaxy-z-fold7' },
      { label: 'HONOR Magic V5', href: '/products/honor-magic-v5' },
      { label: 'Motorola Razr 60 Ultra', href: '/products/motorola-razr-60-ultra' },
    ],
  },
  {
    title: 'Help & Support',
    links: [
      { label: 'Contact Us', href: '#' },
      { label: 'Coverage Checker', href: '#' },
      { label: 'Store Locator', href: '#' },
      { label: 'Network Status', href: '#' },
      { label: 'Manage Account', href: '#' },
      { label: 'Returns Policy', href: '#' },
      { label: 'FAQs', href: '#' },
    ],
  },
  {
    title: 'About Us',
    links: [
      { label: 'Our Company', href: '#' },
      { label: 'Careers', href: '#' },
      { label: 'Media Centre', href: '#' },
      { label: 'Social Commitment', href: '#' },
      { label: 'Accessibility', href: '#' },
      { label: 'Privacy Policy', href: '#' },
      { label: 'Terms & Conditions', href: '#' },
    ],
  },
];

export const Footer = () => {
  return (
    <Box as="footer" bg="gray.900" color="white" mt="auto">
      {/* Main footer */}
      <Container maxW="1200px" py={{ base: 10, md: 16 }}>
        <SimpleGrid columns={{ base: 2, md: 4 }} spacing={{ base: 8, md: 12 }}>
          {footerSections.map(section => (
            <Box key={section.title}>
              <Heading
                as="h4"
                fontSize="sm"
                fontWeight="700"
                textTransform="uppercase"
                letterSpacing="wider"
                color="gray.400"
                mb={4}
              >
                {section.title}
              </Heading>
              <Flex direction="column" gap={2}>
                {section.links.map(link => (
                  <NextLink key={link.label} href={link.href} passHref legacyBehavior>
                    <ChakraLink
                      fontSize="sm"
                      color="gray.300"
                      _hover={{ color: 'white', textDecoration: 'none' }}
                      transition="color 0.2s"
                    >
                      {link.label}
                    </ChakraLink>
                  </NextLink>
                ))}
              </Flex>
            </Box>
          ))}
        </SimpleGrid>

        {/* Social links */}
        <Flex
          mt={{ base: 10, md: 14 }}
          pt={8}
          borderTop="1px solid"
          borderColor="gray.700"
          justify="space-between"
          align={{ base: 'start', md: 'center' }}
          direction={{ base: 'column', md: 'row' }}
          gap={4}
        >
          <Flex align="center" gap={0}>
            <Text fontWeight="800" fontSize="lg" color="red.400">
              vodafone
            </Text>
            <Text fontWeight="800" fontSize="lg" color="white">
              three
            </Text>
          </Flex>
          <Flex gap={4}>
            <SocialIcon label="Twitter">
              <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z" />
            </SocialIcon>
            <SocialIcon label="Facebook">
              <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
            </SocialIcon>
            <SocialIcon label="Instagram">
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
              <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z" />
              <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
            </SocialIcon>
            <SocialIcon label="YouTube">
              <path d="M22.54 6.42a2.78 2.78 0 00-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 00-1.94 2A29 29 0 001 11.75a29 29 0 00.46 5.33A2.78 2.78 0 003.4 19.1c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 001.94-2 29 29 0 00.46-5.25 29 29 0 00-.46-5.43z" />
              <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" />
            </SocialIcon>
          </Flex>
        </Flex>
      </Container>

      {/* Legal bar */}
      <Box borderTop="1px solid" borderColor="gray.800" py={4}>
        <Container maxW="1200px">
          <Text fontSize="xs" color="gray.500" textAlign="center">
            &copy; {new Date().getFullYear()} VodafoneThree. All rights reserved. Registered in
            England &amp; Wales.
          </Text>
        </Container>
      </Box>
    </Box>
  );
};

const SocialIcon = ({ children, label }: { children: React.ReactNode; label: string }) => (
  <ChakraLink
    href="#"
    aria-label={label}
    display="flex"
    alignItems="center"
    justifyContent="center"
    w="40px"
    h="40px"
    borderRadius="full"
    bg="gray.800"
    _hover={{ bg: 'gray.700' }}
    transition="all 0.2s"
    isExternal
  >
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {children}
    </svg>
  </ChakraLink>
);
