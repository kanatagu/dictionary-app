import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  Box,
  Button,
  Input,
} from '@chakra-ui/react';
import { useSignUp } from '../../hooks/auth';

export const SignUpForm = () => {
  const { errorMessages, signUp, isMutating } = useSignUp();

  const emailError = errorMessages.find((error) => error.label === 'email');
  const passwordError = errorMessages.find(
    (error) => error.label === 'password'
  );

  return (
    <Box as='form' onSubmit={signUp}>
      <FormControl isInvalid={!!emailError}>
        <FormLabel>Email</FormLabel>
        <Input
          type='text'
          name='email'
          bgColor={'gray.700'}
          placeholder='example@gmail.com'
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

      <Box textAlign='center' mt='50px'>
        <Button
          colorScheme='blue'
          size='lg'
          type='submit'
          isLoading={isMutating}
        >
          Create Account
        </Button>
      </Box>
    </Box>
  );
};
