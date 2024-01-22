import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  Box,
  Button,
  Input,
} from '@chakra-ui/react';
import { useLogin } from '../../hooks/auth';

export const LoginForm = () => {
  const { errorMessages, login, isMutating } = useLogin();

  const emailError = errorMessages.find((error) => error.label === 'email');
  const passwordError = errorMessages.find(
    (error) => error.label === 'password'
  );

  return (
    <Box as='form' onSubmit={login}>
      <FormControl isInvalid={!!emailError}>
        <FormLabel>email</FormLabel>
        <Input
          type='text'
          name='email'
          bgColor={'gray.700'}
          placeholder='category'
        />
        <FormErrorMessage>{emailError?.message}</FormErrorMessage>
      </FormControl>

      <FormControl isInvalid={!!passwordError}>
        <FormLabel>Password</FormLabel>
        <Input
          type='password'
          name='password'
          bgColor={'gray.700'}
          placeholder='password'
        />
        <FormErrorMessage>{passwordError?.message}</FormErrorMessage>
      </FormControl>

      <Box textAlign='center' mt='38px'>
        <Button
          colorScheme='blue'
          size='lg'
          type='submit'
          isLoading={isMutating}
        >
          Login
        </Button>
      </Box>
    </Box>
  );
};
