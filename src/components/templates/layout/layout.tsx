import { Flex } from '@chakra-ui/react';
import { ReactNode } from 'react';

import { Footer } from '../footer';
import { Header } from '../header';

interface LayoutPropsInterface {
  children: ReactNode;
}

export const Layout = ({ children }: LayoutPropsInterface) => {
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
