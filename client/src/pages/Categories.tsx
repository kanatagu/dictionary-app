import { Link as ReactRouterLink } from 'react-router-dom';
import { Container, Heading, Flex, Button } from '@chakra-ui/react';
import { FiChevronRight } from 'react-icons/fi';
import { Loading, Error } from '../components/ui';
import { CategoryList } from '../components/category';
import { useGetCategories } from '../hooks/category';

export const CategoriesPage = () => {
  const { data, isLoading, isError, isValidating } = useGetCategories();

  if (isError) {
    return <Error backLink={'/'} />;
  }

  return (
    <Container maxW={{ base: '100%', lg: 'container.sm' }} pt='40px' pb='80px'>
      <Flex justify='space-between' align='center'>
        <Heading>Category</Heading>
        <Button
          as={ReactRouterLink}
          to={'/category/new'}
          colorScheme='blue'
          rightIcon={<FiChevronRight />}
        >
          Add Category
        </Button>
      </Flex>

      {!data || isLoading || isValidating ? (
        <Loading />
      ) : (
        <CategoryList data={data} />
      )}
    </Container>
  );
};
