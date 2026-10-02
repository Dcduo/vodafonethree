import { PageBuilderTheme, PageBuilderWidth } from './types';

export const pageBuilderTheme = (theme: PageBuilderTheme | null | undefined) => {
  switch (theme) {
    case 'brand':
      return {
        bg: 'red.600',
        color: 'white',
        muted: 'whiteAlpha.900',
        subtle: 'whiteAlpha.200',
      };
    case 'dark':
      return {
        bg: 'gray.900',
        color: 'white',
        muted: 'gray.200',
        subtle: 'whiteAlpha.200',
      };
    case 'accent':
      return {
        bg: 'purple.600',
        color: 'white',
        muted: 'whiteAlpha.900',
        subtle: 'whiteAlpha.200',
      };
    case 'soft':
      return {
        bg: 'gray.50',
        color: 'gray.900',
        muted: 'gray.600',
        subtle: 'gray.200',
      };
    default:
      return {
        bg: 'white',
        color: 'gray.900',
        muted: 'gray.600',
        subtle: 'gray.200',
      };
  }
};

export const pageBuilderMaxWidth = (width: PageBuilderWidth | null | undefined) => {
  switch (width) {
    case 'narrow':
      return '760px';
    case 'wide':
      return '1440px';
    default:
      return '1200px';
  }
};
