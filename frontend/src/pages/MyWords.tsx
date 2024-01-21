import { Container, Flex } from '@chakra-ui/react';
import { Sidebar, MyWordList } from '../features/myWords/components';
import { Error, Loading } from '../components';
import { useGetMyWords } from '../features/myWords/hooks';
import { useGetCategories } from '../features/category/hooks';

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

  console.log('data', myWords);

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
