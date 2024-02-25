import {
  Flex,
  Heading,
  Box,
  Link as ChakraLink,
  Text,
  VStack,
} from '@chakra-ui/react';
import { Link as ReactRouterLink } from 'react-router-dom';
import { SignUpForm } from '../components/auth';

export const SignUpPage = () => {
  return (
    <Flex
      flexDir='column'
      justify='center'
      align='center'
      mx='auto'
      w={{ base: '100%', md: '480px' }}
    >
      <Box
        bgColor='gray.700'
        p='40px'
        w='100%'
        h={{ base: '100%', md: 'auto' }}
      >
        <Heading>Sign Up</Heading>
        <Box mt={{ base: '30px', md: '40px' }}>
          <SignUpForm />
        </Box>
        <VStack mt={{ base: '40px', md: '40px' }} color='gray.400' gap='4px'>
          <Text as='span'>Already have an account?</Text>
          <ChakraLink as={ReactRouterLink} to='/login' color='blue.500'>
            Login
          </ChakraLink>
        </VStack>
      </Box>
    </Flex>
  );
};
