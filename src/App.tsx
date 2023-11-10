import {
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';
import useSWR, { SWRConfig } from 'swr';
import { Layout } from './components';
import { customTheme } from './theme';
import {
  ErrorPage,
  Home,
  // randomWordsLoader,
  MyList,
  WordEdit,
  Categories,
  CategoryEdit,
  CategoryCreate,
} from './pages';
import { getRandomWords, fetcher } from './api';

const App = () => {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Layout />,
      errorElement: <ErrorPage />,
      children: [
        {
          index: true,
          element: <Home />,
          // loader: getRandomWords,
        },
        {
          path: 'my-list',
          element: <MyList />,
          children: [
            {
              path: ':wordId/edit',
              element: <WordEdit />,
            },
          ],
        },
        {
          path: 'categories',
          element: <Categories />,
          children: [
            {
              path: ':categoryId/edit',
              element: <CategoryEdit />,
            },
          ],
        },
        {
          path: 'categories/new',
          element: <CategoryCreate />,
        },
      ],
    },
    {
      path: 'error',
      element: <ErrorPage />,
    },
  ]);

  return (
    <SWRConfig
    // value={{ fetcher: (url) => fetch(url).then((res) => res.json()) }}
    // value={{ fetcher: fetcher }}
    >
      <ChakraProvider theme={customTheme}>
        <RouterProvider router={router} />
      </ChakraProvider>
    </SWRConfig>
  );
};

export default App;
