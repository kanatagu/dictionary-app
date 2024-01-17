import { Container, Flex } from '@chakra-ui/react';
import { Sidebar, MyItemList } from '../features/myList/components';

export const MyListPage = () => {
  return (
    <Container maxW={{ base: '100%', lg: 'container.lg' }}>
      <Flex flexDir={{ base: 'column', lg: 'row' }}>
        <Sidebar />
        <MyItemList />
      </Flex>
    </Container>
  );
};
