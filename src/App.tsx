import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';
import { ProtectedLayout, AuthLayout } from './components';
import { customTheme } from './theme';
import {
  ErrorPage,
  Home,
  LoginPage,
  MyListPage,
  CategoriesPage,
  CategoryEditPage,
  CategoryCreatePage,
} from './pages';
import { AuthProvider } from './providers';
import { Routes } from './routes';

const App = () => {
  // const router = createBrowserRouter([
  //   {
  //     element: <AuthLayout />,
  //     children: [{ path: 'login', element: <LoginPage /> }],
  //   },
  //   {
  //     path: '/',
  //     // element: <ProtectedLayout />,
  //     errorElement: <ErrorPage />,
  //     children: [
  //       {
  //         index: true,
  //         element: <Home />,
  //       },

  //       {
  //         path: 'my-list',
  //         element: <MyListPage />,
  //       },
  //       {
  //         path: 'category',
  //         element: <CategoriesPage />,
  //       },
  //       {
  //         path: '/category/:categoryId/edit',
  //         element: <CategoryEditPage />,
  //       },
  //       {
  //         path: 'category/new',
  //         element: <CategoryCreatePage />,
  //       },
  //     ],
  //   },
  // ]);

  return (
    <ChakraProvider theme={customTheme}>
      <AuthProvider>
        <Routes />
      </AuthProvider>
    </ChakraProvider>
  );
};

export default App;
