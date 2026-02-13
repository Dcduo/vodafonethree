import { Box, Flex, Heading, Text, Button, Container, IconButton } from '@chakra-ui/react';
import Image from 'next/image';
import { useState, useEffect, useCallback } from 'react';

import { PageProductFieldsFragment } from '@src/lib/__generated/sdk';

interface BannerSlide {
  title: string;
  subtitle: string;
  description: string;
  ctaText: string;
  ctaLink: string;
  bgGradient: string;
  accentColor: string;
  imageUrl: string;
  imageAlt: string;
}

const defaultSlides: BannerSlide[] = [
  {
    title: 'iPhone 17',
    subtitle: '3 months half price',
    description: 'Switch to us and get 3 months half price on selected plans. Limited time offer.',
    ctaText: 'Find out more',
    ctaLink: '/products/iphone-17',
    bgGradient: 'linear(to-br, #1a1a2e, #16213e, #0f3460)',
    accentColor: '#e94560',
    imageUrl:
      'https://www.three.co.uk/content/dam/threedigital/new-dam-structure-temp/device-images/phones/apple/iphone-17-series/iphone-17/1690x1100-hero-iphone-17.png',
    imageAlt: 'iPhone 17',
  },
  {
    title: 'Unlimited SIM',
    subtitle: 'From only £10/month',
    description:
      'Unlimited data, calls and texts. No contract tie-ins. Switch your SIM in minutes.',
    ctaText: 'Get this deal',
    ctaLink: '/products/unlimited-sim',
    bgGradient: 'linear(to-br, #0d7377, #14a3a8, #32e0c4)',
    accentColor: '#32e0c4',
    imageUrl:
      'https://www.three.co.uk/content/dam/threedigital/new-dam-structure-temp/device-images/sim/sim-630px-new.png',
    imageAlt: 'Three SIM card',
  },
  {
    title: 'Google Pixel 10 Pro',
    subtitle: 'The smartest Pixel yet',
    description: 'AI-powered photography, incredible display, and all-day battery life.',
    ctaText: 'Shop now',
    ctaLink: '/products/google-pixel-10-pro',
    bgGradient: 'linear(to-br, #2d1b69, #5c3d99, #8b5cf6)',
    accentColor: '#c4b5fd',
    imageUrl:
      'https://www.three.co.uk/content/dam/threedigital/new-dam-structure-temp/device-images/phones/google/pixel-10/google-pixel-10-pro-logo-1100-1100px.png',
    imageAlt: 'Google Pixel 10 Pro',
  },
  {
    title: 'Home Broadband',
    subtitle: 'Save £200 when you switch',
    description: 'Ultra-fast 5G broadband for your home. No landline needed. Set up in minutes.',
    ctaText: 'Check availability',
    ctaLink: '/products/5g-home-broadband',
    bgGradient: 'linear(to-br, #1b4332, #2d6a4f, #52b788)',
    accentColor: '#95d5b2',
    imageUrl:
      'https://www.three.co.uk/content/dam/threedigital/new-dam-structure-temp/device-images/broadband/wifi-graphic-1500x750.png',
    imageAlt: 'Three Home Broadband',
  },
];

const gradientPalette = [
  { bgGradient: 'linear(to-br, #1a1a2e, #16213e, #0f3460)', accentColor: '#e94560' },
  { bgGradient: 'linear(to-br, #0d7377, #14a3a8, #32e0c4)', accentColor: '#32e0c4' },
  { bgGradient: 'linear(to-br, #2d1b69, #5c3d99, #8b5cf6)', accentColor: '#c4b5fd' },
  { bgGradient: 'linear(to-br, #1b4332, #2d6a4f, #52b788)', accentColor: '#95d5b2' },
  { bgGradient: 'linear(to-br, #7f1d1d, #991b1b, #dc2626)', accentColor: '#fca5a5' },
  { bgGradient: 'linear(to-br, #78350f, #92400e, #d97706)', accentColor: '#fde68a' },
];

function buildSlidesFromProducts(products: Array<PageProductFieldsFragment | null>): BannerSlide[] {
  const validProducts = products.filter(
    (p): p is PageProductFieldsFragment => p !== null && !!p.name,
  );

  if (validProducts.length === 0) return defaultSlides;

  return validProducts.slice(0, 6).map((product, index) => {
    const palette = gradientPalette[index % gradientPalette.length];
    const imageUrl =
      product.featuredProductImage?.url || product.productImagesCollection?.items?.[0]?.url || '';
    const price = product.price != null ? `£${product.price}` : '';

    return {
      title: product.name || 'Product',
      subtitle: price ? `From ${price}/month` : 'Check it out',
      description: product.description || '',
      ctaText: 'Shop now',
      ctaLink: `/products/${product.slug || ''}`,
      bgGradient: palette.bgGradient,
      accentColor: palette.accentColor,
      imageUrl,
      imageAlt: product.featuredProductImage?.title || product.name || '',
    };
  });
}

interface HeroBannerCarouselProps {
  products?: Array<PageProductFieldsFragment | null>;
}

export const HeroBannerCarousel = ({ products }: HeroBannerCarouselProps) => {
  const slides =
    products && products.length > 0 ? buildSlidesFromProducts(products) : defaultSlides;
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = useCallback(() => {
    setCurrentSlide(prev => (prev + 1) % slides.length);
  }, [slides.length]);

  const prevSlide = useCallback(() => {
    setCurrentSlide(prev => (prev - 1 + slides.length) % slides.length);
  }, [slides.length]);

  useEffect(() => {
    const timer = setInterval(nextSlide, 6000);
    return () => clearInterval(timer);
  }, [nextSlide]);

  const slide = slides[currentSlide];

  return (
    <Box position="relative" overflow="hidden">
      <Box
        bgGradient={slide.bgGradient}
        transition="all 0.6s ease-in-out"
        minH={{ base: '480px', md: '520px', lg: '560px' }}
        display="flex"
        alignItems="center"
      >
        <Container maxW="1200px">
          <Flex
            direction={{ base: 'column', md: 'row' }}
            align="center"
            justify="space-between"
            gap={8}
          >
            <Box maxW={{ base: '100%', md: '50%' }} py={{ base: 12, md: 16 }}>
              <Text
                color={slide.accentColor}
                fontWeight="600"
                fontSize={{ base: 'sm', md: 'md' }}
                textTransform="uppercase"
                letterSpacing="wider"
                mb={3}
              >
                {slide.subtitle}
              </Text>
              <Heading
                as="h1"
                color="white"
                fontSize={{ base: '3xl', md: '4xl', lg: '5xl' }}
                fontWeight="700"
                lineHeight="1.1"
                mb={4}
              >
                {slide.title}
              </Heading>
              <Text color="whiteAlpha.800" fontSize={{ base: 'md', md: 'lg' }} mb={8} maxW="480px">
                {slide.description}
              </Text>
              <Button
                as="a"
                href={slide.ctaLink}
                size="lg"
                bg="white"
                color="gray.900"
                fontWeight="600"
                borderRadius="full"
                px={8}
                _hover={{
                  bg: 'whiteAlpha.900',
                  transform: 'translateY(-2px)',
                  boxShadow: 'lg',
                }}
                transition="all 0.2s"
              >
                {slide.ctaText}
              </Button>
            </Box>
            <Flex
              display={{ base: 'none', md: 'flex' }}
              align="center"
              justify="center"
              flex="1"
              position="relative"
              minH="350px"
            >
              {slide.imageUrl && (
                <Box position="relative" w="100%" h="350px">
                  <Image
                    src={slide.imageUrl}
                    alt={slide.imageAlt}
                    fill
                    style={{ objectFit: 'contain' }}
                    priority={currentSlide === 0}
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </Box>
              )}
            </Flex>
          </Flex>
        </Container>
      </Box>

      {/* Navigation dots */}
      <Flex
        position="absolute"
        bottom={6}
        left="50%"
        transform="translateX(-50%)"
        gap={2}
        zIndex={2}
      >
        {slides.map((_, index) => (
          <Box
            key={index}
            as="button"
            w={currentSlide === index ? '32px' : '10px'}
            h="10px"
            borderRadius="full"
            bg={currentSlide === index ? 'white' : 'whiteAlpha.500'}
            transition="all 0.3s"
            onClick={() => setCurrentSlide(index)}
            cursor="pointer"
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </Flex>

      {/* Arrow controls */}
      <IconButton
        aria-label="Previous slide"
        icon={<ChevronLeftIcon />}
        position="absolute"
        left={4}
        top="50%"
        transform="translateY(-50%)"
        onClick={prevSlide}
        variant="ghost"
        color="white"
        fontSize="2xl"
        _hover={{ bg: 'whiteAlpha.200' }}
        borderRadius="full"
        size="lg"
        display={{ base: 'none', md: 'flex' }}
      />
      <IconButton
        aria-label="Next slide"
        icon={<ChevronRightIcon />}
        position="absolute"
        right={4}
        top="50%"
        transform="translateY(-50%)"
        onClick={nextSlide}
        variant="ghost"
        color="white"
        fontSize="2xl"
        _hover={{ bg: 'whiteAlpha.200' }}
        borderRadius="full"
        size="lg"
        display={{ base: 'none', md: 'flex' }}
      />
    </Box>
  );
};

const ChevronLeftIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <polyline points="15 18 9 12 15 6" />
  </svg>
);

const ChevronRightIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <polyline points="9 18 15 12 9 6" />
  </svg>
);
