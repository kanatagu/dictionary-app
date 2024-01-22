import { Container, Flex } from '@chakra-ui/react';
import { MyWordList } from '../components/myWords';
import { Error, Loading } from '../components/ui';
import { Sidebar } from '../components/layout';
import { useGetMyWords } from '../hooks/myWord';
import { useGetCategories } from '../hooks/category';

export const MyWordsPage = () => {
  const {
    data: myWords,
    isLoading: isMyWordsLoading,
    isError: isMyWordsError,
    isValidating: isMyWordsValidating,
  } = useGetMyWords();

  const {
    data: categories,
    isLoading: isCategoriesLoading,
    isError: isCategoriesError,
    isValidating: isCategoriesValidating,
  } = useGetCategories();

  const isError = isMyWordsError || isCategoriesError;
  const isLoading =
    isMyWordsLoading ||
    isCategoriesLoading ||
    isMyWordsValidating ||
    isCategoriesValidating ||
    !myWords ||
    !categories;

  if (isError) {
    return <Error backLink={'/'} />;
  }

  return (
    <Container maxW={{ base: '100%', lg: 'container.lg' }}>
      {isLoading ? (
        <Loading />
      ) : (
        <Flex flexDir={{ base: 'column', lg: 'row' }}>
          <Sidebar categories={categories} />
          <MyWordList myWords={myWords} />
        </Flex>
      )}
    </Container>
  );
};
