import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { ProtectedRoutes, NotAuthenticatedRoutes } from '../routes';
import { ErrorPage } from '../pages';

export const Routes = () => {
  const router = createBrowserRouter([
    { element: <ErrorPage /> },
    ...NotAuthenticatedRoutes,
    ...ProtectedRoutes,
  ]);

  return <RouterProvider router={router} />;
};
