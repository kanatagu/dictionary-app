import { Container, Heading, Box } from '@chakra-ui/react';
import { AddCategoryForm } from '../features/category/components';

export const CategoryCreate = () => {
  return (
    <Container maxW={{ base: '100%', lg: 'container.sm' }} pt='40px' pb='80px'>
      <Heading>Create Category</Heading>
      <Box mt={{ base: '30px', md: '80px' }}>
        <AddCategoryForm />
      </Box>
    </Container>
  );
};
