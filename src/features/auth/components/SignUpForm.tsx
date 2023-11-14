import { useState, FormEventHandler } from 'react';
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  Box,
  Button,
  Input,
} from '@chakra-ui/react';
import { useAuth } from '../../../hooks';

export const SignUpForm = () => {
  const [errorMessage, setErrorMessage] = useState('');

  const { setUser } = useAuth();

  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    setErrorMessage('');
    const form = new FormData(e.currentTarget);
    const inputEmail = form.get('email')?.toString() || '';

    const emailPattern =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

    if (!emailPattern.test(inputEmail)) {
      setErrorMessage('Enter a valid email address');
      return;
    }

    setUser({ id: '1', email: inputEmail });
  };

  return (
    <Box as='form' onSubmit={handleSubmit}>
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
