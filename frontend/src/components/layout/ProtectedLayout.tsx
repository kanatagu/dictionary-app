import { Navigate, Outlet } from 'react-router-dom';
import { Flex } from '@chakra-ui/react';
import { Header } from '../../components/layout';
import { useAuth } from '../../hooks/common';

export const ProtectedLayout = () => {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to='/login' />;
  }

  return (
    <>
      <Header />
      <Flex
        as={'main'}
        minH={'calc(100vh - 60px)'}
        position={'relative'}
        top={'60px'}
      >
        <Outlet />
      </Flex>
    </>
  );
};
