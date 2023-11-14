import { useState, FormEventHandler } from 'react';
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  Box,
  Button,
  Input,
} from '@chakra-ui/react';

export const LoginForm = () => {
  const [errorMessage, setErrorMessage] = useState('');

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
  };

  return (
    <Box as='form' onSubmit={handleSubmit}>
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
