import { Flex } from '@chakra-ui/react';
import { ReactNode } from 'react';
import { useRouter } from 'next/router';

import { BlogLayout } from '@src/components/features/blog/BlogLayout';

import { Footer } from '../footer';
import { Header } from '../header';

interface LayoutPropsInterface {
  children: ReactNode;
}

export const Layout = ({ children }: LayoutPropsInterface) => {
  const { pathname } = useRouter();
  if (pathname.startsWith('/blog/') || pathname === '/demo/blog-preview') {
    return <BlogLayout>{children}</BlogLayout>;
  }
  return (
    <>
      <Header />
      <Flex flexGrow="1" flexDirection="column" width="100%" as="main">
        {children}
      </Flex>
      <Footer />
    </>
  );
};
