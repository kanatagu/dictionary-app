import { Container, Flex, Box, Button } from '@chakra-ui/react';
import { SearchWord, WordCard, Loading, Error } from '../components';
import { useRandomDictionary, useSearchDictionary } from '../hooks';

export const Home = () => {
  const {
    data: randomData,
    isError: isRandomError,
    refetch: randomRefetch,
    isValidating: isRandomValidating,
  } = useRandomDictionary();
  const { data: searchData, isError: isSearchError } = useSearchDictionary();

  const data = searchData || randomData;
  const isError = isRandomError || isSearchError;

  if (isError) {
    return <Error backLink={'/'} />;
  }

  return (
    <Container maxW={{ base: '100%', lg: 'container.lg' }} pt='40px' pb='80px'>
      <SearchWord />
      {!data || isRandomValidating ? (
        <Loading />
      ) : (
        <>
          <Flex flexWrap='wrap' gap='30px' pt='40px' pb='60px'>
            {data.list.map((word) => (
              <WordCard key={word.defid} data={word} />
            ))}
          </Flex>
          <Box textAlign='center'>
            <Button
              colorScheme='blue'
              size='lg'
              onClick={() => {
                randomRefetch();
                window.scroll({ top: 0 });
              }}
            >
              Load Another Words
            </Button>
          </Box>
        </>
      )}
    </Container>
  );
};
