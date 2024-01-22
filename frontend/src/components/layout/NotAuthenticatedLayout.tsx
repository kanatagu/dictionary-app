import { Navigate, Outlet } from 'react-router-dom';
import { Flex } from '@chakra-ui/react';
import { useAuthContext } from '../../providers';

export const NotAuthenticatedLayout = () => {
  const { user } = useAuthContext();

  if (user) {
    return <Navigate to='/' />;
  }

  return (
    <Flex as={'main'} minH={'100vh'}>
      <Outlet />
    </Flex>
  );
};
