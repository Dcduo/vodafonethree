import {
  Box,
  BoxProps,
  Flex,
  Text,
  HStack,
  Container,
  IconButton,
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
  VStack,
} from '@chakra-ui/react';
import Link from 'next/link';

export const HEADER_HEIGHT = 64;

const navItems = [
  { label: 'Phones', href: '/products' },
  { label: 'SIM Only', href: '/products' },
  { label: 'Broadband', href: '/products' },
  { label: 'Smartwatches', href: '/products' },
  { label: 'Products', href: '/products' },
  { label: 'Help', href: '#' },
];

export const Header = (props: BoxProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box
      as="nav"
      bg="white"
      position="sticky"
      top={0}
      zIndex={10}
      borderBottom="1px solid"
      borderColor="gray.200"
      {...props}
    >
      <Container maxW="1200px">
        <Flex justify="space-between" align="center" height={`${HEADER_HEIGHT}px`}>
          {/* Logo */}
          <Link href="/">
            <Flex align="center" gap={0} cursor="pointer">
              <Box as="span" fontWeight="800" fontSize="xl" color="red.500" letterSpacing="-0.02em">
                vodafone
              </Box>
              <Box
                as="span"
                fontWeight="800"
                fontSize="xl"
                color="gray.900"
                letterSpacing="-0.02em"
              >
                three
              </Box>
            </Flex>
          </Link>

          {/* Desktop Nav */}
          <HStack spacing={6} display={{ base: 'none', md: 'flex' }}>
            {navItems.map(item => (
              <Link key={item.label} href={item.href}>
                <Text
                  fontSize="sm"
                  fontWeight="500"
                  color="gray.700"
                  _hover={{ color: 'red.500' }}
                  transition="color 0.2s"
                  cursor="pointer"
                >
                  {item.label}
                </Text>
              </Link>
            ))}
          </HStack>

          {/* Right side actions */}
          <HStack spacing={3}>
            <Link href="#">
              <Flex
                align="center"
                gap={1}
                px={3}
                py={1.5}
                borderRadius="full"
                bg="gray.50"
                _hover={{ bg: 'gray.100' }}
                transition="all 0.2s"
                cursor="pointer"
                display={{ base: 'none', md: 'flex' }}
              >
                <PersonIcon />
                <Text fontSize="sm" fontWeight="500" color="gray.700">
                  My Account
                </Text>
              </Flex>
            </Link>
            <Link href="#">
              <Flex
                align="center"
                justify="center"
                w="40px"
                h="40px"
                borderRadius="full"
                bg="gray.50"
                _hover={{ bg: 'gray.100' }}
                transition="all 0.2s"
                cursor="pointer"
                display={{ base: 'none', md: 'flex' }}
              >
                <BasketIcon />
              </Flex>
            </Link>

            {/* Mobile menu button */}
            <IconButton
              display={{ base: 'flex', md: 'none' }}
              aria-label="Open menu"
              icon={<MenuIcon />}
              variant="ghost"
              onClick={onOpen}
              size="md"
            />
          </HStack>
        </Flex>
      </Container>

      {/* Mobile Drawer */}
      <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader borderBottomWidth="1px">
            <Flex align="center" gap={0}>
              <Box as="span" fontWeight="800" fontSize="lg" color="red.500">
                vodafone
              </Box>
              <Box as="span" fontWeight="800" fontSize="lg" color="gray.900">
                three
              </Box>
            </Flex>
          </DrawerHeader>
          <DrawerBody pt={4}>
            <VStack align="stretch" spacing={0}>
              {navItems.map(item => (
                <Link key={item.label} href={item.href}>
                  <Box
                    py={3}
                    px={2}
                    borderBottom="1px solid"
                    borderColor="gray.100"
                    _hover={{ bg: 'gray.50' }}
                    transition="all 0.2s"
                    onClick={onClose}
                    cursor="pointer"
                  >
                    <Text fontSize="md" fontWeight="500" color="gray.800">
                      {item.label}
                    </Text>
                  </Box>
                </Link>
              ))}
              <Link href="#">
                <Box
                  py={3}
                  px={2}
                  borderBottom="1px solid"
                  borderColor="gray.100"
                  _hover={{ bg: 'gray.50' }}
                  transition="all 0.2s"
                  onClick={onClose}
                  cursor="pointer"
                >
                  <Flex align="center" gap={2}>
                    <PersonIcon />
                    <Text fontSize="md" fontWeight="500" color="gray.800">
                      My Account
                    </Text>
                  </Flex>
                </Box>
              </Link>
              <Link href="#">
                <Box
                  py={3}
                  px={2}
                  _hover={{ bg: 'gray.50' }}
                  transition="all 0.2s"
                  onClick={onClose}
                  cursor="pointer"
                >
                  <Flex align="center" gap={2}>
                    <BasketIcon />
                    <Text fontSize="md" fontWeight="500" color="gray.800">
                      Basket
                    </Text>
                  </Flex>
                </Box>
              </Link>
            </VStack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Box>
  );
};

const PersonIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);

const BasketIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
    <line x1="3" y1="6" x2="21" y2="6" />
    <path d="M16 10a4 4 0 01-8 0" />
  </svg>
);

const MenuIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <line x1="3" y1="12" x2="21" y2="12" />
    <line x1="3" y1="6" x2="21" y2="6" />
    <line x1="3" y1="18" x2="21" y2="18" />
  </svg>
);
