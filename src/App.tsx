import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';
import { Layout } from './components';
import { customTheme } from './theme';
import {
  ErrorPage,
  Home,
  MyList,
  WordEdit,
  Categories,
  CategoryEdit,
  CategoryCreate,
} from './pages';

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
          path: 'category',
          element: <Categories />,
        },
        {
          path: '/category/:categoryId/edit',
          element: <CategoryEdit />,
        },
        {
          path: 'category/new',
          element: <CategoryCreate />,
        },
      ],
    },
  ]);

  return (
    <ChakraProvider theme={customTheme}>
      <RouterProvider router={router} />
    </ChakraProvider>
  );
};

export default App;
