import {
  Home,
  MyListPage,
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
        path: 'my-list',
        element: <MyListPage />,
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
