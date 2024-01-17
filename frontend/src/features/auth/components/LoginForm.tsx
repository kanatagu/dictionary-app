import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  Box,
  Button,
  Input,
} from '@chakra-ui/react';
import { useLogin } from '../hooks';

export const LoginForm = () => {
  const { errorMessage, login } = useLogin();

  return (
    <Box as='form' onSubmit={login}>
      <FormControl isInvalid={!!errorMessage}>
        <FormLabel>email</FormLabel>
        <Input
          type='text'
          name='email'
          bgColor={'gray.700'}
          placeholder='category'
        />
        <FormErrorMessage>{errorMessage}</FormErrorMessage>
      </FormControl>

      <Box textAlign='center' mt='38px'>
        <Button colorScheme='blue' size='lg' type='submit'>
          Login
        </Button>
      </Box>
    </Box>
  );
};
