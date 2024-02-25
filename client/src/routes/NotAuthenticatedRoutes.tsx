import { LoginPage, SignUpPage } from '../pages';
import { NotAuthenticatedLayout } from '../components/layout';

export const NotAuthenticatedRoutes = [
  {
    element: <NotAuthenticatedLayout />,
    children: [
      {
        path: 'login',
        element: <LoginPage />,
      },
      {
        path: 'signup',
        element: <SignUpPage />,
      },
    ],
  },
];
