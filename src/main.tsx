import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { ColorModeScript } from '@chakra-ui/react';
import { customTheme } from './theme';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ColorModeScript initialColorMode={customTheme.config.initialColorMode} />
    <App />
  </React.StrictMode>
);
