import {
  Home,
  MyWordsPage,
  CategoriesPage,
  CategoryEditPage,
  CategoryCreatePage,
  AccountPage,
} from '../pages';
import { ProtectedLayout } from '../components';

export const ProtectedRoutes = [
  {
    path: '/',
    element: <ProtectedLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: 'my-words',
        element: <MyWordsPage />,
      },
      {
        path: 'category',
        element: <CategoriesPage />,
      },
      {
        path: '/category/:categoryId/edit',
        element: <CategoryEditPage />,
      },
      {
        path: 'category/new',
        element: <CategoryCreatePage />,
      },
      {
        path: 'account',
        element: <AccountPage />,
      },
    ],
  },
];
