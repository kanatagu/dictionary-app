import { ChakraProvider } from '@chakra-ui/react';
import { customTheme } from './theme';
import { AuthProvider } from './providers';
import { Routes } from './routes';

const App = () => {
  return (
    <ChakraProvider theme={customTheme}>
      <AuthProvider>
        <Routes />
      </AuthProvider>
    </ChakraProvider>
  );
};

export default App;
