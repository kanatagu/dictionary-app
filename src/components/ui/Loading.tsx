import { Flex, Spinner } from '@chakra-ui/react';

export const Loading = () => {
  return (
    <Flex align='center' justify='center' flexDir='column' py='100px'>
      <Spinner
        thickness='4px'
        speed='0.65s'
        emptyColor='gray.200'
        color='blue.500'
        size='xl'
      />
    </Flex>
  );
};
