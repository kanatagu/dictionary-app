import { useParams } from 'react-router-dom';
import { Container, Heading, Box } from '@chakra-ui/react';
import { Error, Loading } from '../components/ui';
import { EditCategoryForm } from '../components/category';
import { useGetCategory } from '../hooks/category';

export const CategoryEditPage = () => {
  const params = useParams();
  const { categoryId } = params;
  const { data, isLoading, isError, isValidating } = useGetCategory(
    String(categoryId)
  );

  if (isError) {
    return <Error backLink={'/'} />;
  }

  return (
    <Container maxW={{ base: '100%', lg: 'container.sm' }} pt='40px' pb='80px'>
      <Heading>Edit Category</Heading>

      {!data || isLoading || isValidating ? (
        <Loading />
      ) : (
        <Box mt={{ base: '30px', md: '80px' }}>
          <EditCategoryForm data={data} />
        </Box>
      )}
    </Container>
  );
};
