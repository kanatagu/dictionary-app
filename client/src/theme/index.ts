import { extendTheme } from '@chakra-ui/react';

export const customTheme = extendTheme({
  config: {
    initialColorMode: 'dark',
    useSystemColorMode: false,
  },
  styles: {},
  colors: {
    blue: {
      dark: '#132845',
    },
  },
});
