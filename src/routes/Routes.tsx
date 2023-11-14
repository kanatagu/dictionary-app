import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { ProtectedRoutes, NotAuthenticatedRoutes } from '../routes';
import { useAuth } from '../hooks';
import { ErrorPage } from '../pages';

export const Routes = () => {
  const { user } = useAuth();

  const router = createBrowserRouter([
    { element: <ErrorPage /> },
    // ...(!user ? NotAuthenticatedRoutes : []),
    ...NotAuthenticatedRoutes,
    ...ProtectedRoutes,
  ]);

  return <RouterProvider router={router} />;
};
