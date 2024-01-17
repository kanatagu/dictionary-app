import { Container, Heading, Box } from '@chakra-ui/react';
import { EditCategoryForm } from '../features/category/components';

export const CategoryEditPage = () => {
  return (
    <Container maxW={{ base: '100%', lg: 'container.sm' }} pt='40px' pb='80px'>
      <Heading>Edit Category</Heading>
      <Box mt={{ base: '30px', md: '80px' }}>
        <EditCategoryForm />
      </Box>
    </Container>
  );
};
