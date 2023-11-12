import { useNavigate } from 'react-router-dom';
import { Container, Heading, Flex, Button } from '@chakra-ui/react';
import { CategoryList } from '../features/category/components';

export const Categories = () => {
  const navigate = useNavigate();

  return (
    <Container maxW={{ base: '100%', lg: 'container.sm' }} pt='40px' pb='80px'>
      <Flex justify='space-between' align='center'>
        <Heading>Category</Heading>
        <Button colorScheme='blue' onClick={() => navigate('/category/new')}>
          Add Category
        </Button>
      </Flex>

      <CategoryList />
    </Container>
  );
};
