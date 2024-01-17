import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  Box,
  Button,
  Input,
} from '@chakra-ui/react';
import { useSignUp } from '../hooks';

export const SignUpForm = () => {
  const { errorMessage, signUp } = useSignUp();

  return (
    <Box as='form' onSubmit={signUp}>
      <FormControl isInvalid={!!errorMessage}>
        <FormLabel>email</FormLabel>
        <Input
          type='text'
          name='email'
          bgColor={'gray.700'}
          placeholder='example@gmail.com'
        />
        <FormErrorMessage>{errorMessage}</FormErrorMessage>
      </FormControl>

      <Box textAlign='center' mt='50px'>
        <Button colorScheme='blue' size='lg' type='submit'>
          Create Account
        </Button>
      </Box>
    </Box>
  );
};
