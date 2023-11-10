import { Outlet } from 'react-router-dom';
import { Flex } from '@chakra-ui/react';
import { Header } from '..';

export const Layout = () => {
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
