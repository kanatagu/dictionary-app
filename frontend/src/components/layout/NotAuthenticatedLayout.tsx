import { Navigate, Outlet } from 'react-router-dom';
import { Flex } from '@chakra-ui/react';
import { useAuth } from '../../hooks';

export const NotAuthenticatedLayout = () => {
  const { user } = useAuth();

  if (user) {
    return <Navigate to='/' />;
  }

  return (
    <Flex as={'main'} minH={'100vh'}>
      <Outlet />
    </Flex>
  );
};
