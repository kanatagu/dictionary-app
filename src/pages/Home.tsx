import { useLoaderData, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import useSWR, { useSWRConfig } from 'swr';
import { Container, Flex, Box, Button, Spinner } from '@chakra-ui/react';
import { SearchWord, WordCard, Loading } from '../components';
import { useRandomDictionary, useSearchDictionary } from '../hooks';
import { ErrorPage } from '../pages';

export const Home = () => {
  const navigate = useNavigate();
  const {
    data: randomData,
    isError: isRandomError,
    refetch: randomRefetch,
  } = useRandomDictionary();
  const { data: searchData, isError: isSearchError } = useSearchDictionary();

  const data = searchData || randomData;
  const isError = isRandomError || isSearchError;

  if (isError) {
    navigate('/error');
  }

  console.log('data', data);

  return (
    <Container maxW={{ base: '100%', lg: 'container.lg' }} pt='40px' pb='80px'>
      <SearchWord />
      {!data ? (
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
