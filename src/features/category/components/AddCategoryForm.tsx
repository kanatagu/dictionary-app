import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FormEventHandler } from 'react';
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  Box,
  Button,
  Input,
  useToast,
} from '@chakra-ui/react';
import { useLocalStorage } from '../../../hooks';

export const AddCategoryForm = () => {
  const navigate = useNavigate();
  const toast = useToast();
  const [errorMessage, setErrorMessage] = useState('');

  const afterSubmit = () => {
    toast({
      title: 'Success!',
      description: 'Created category name.',
      status: 'success',
      duration: 3000,
      isClosable: true,
    });
    navigate('/category');
  };

  const [storedValue, setStoredValue] = useLocalStorage<
    { id: number; name: string }[]
  >('category', [], afterSubmit);

  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const category = form.get('category') || '';

    if (category === '') {
      setErrorMessage('Category name is required');
    }

    if (category.toString().length > 30) {
      setErrorMessage('Enter a category name less than 30 characters');
    }

    const id = storedValue.length ? storedValue.slice(-1)[0].id + 1 : 1;
    const categoryString = category.toString();

    setStoredValue([...storedValue, { id, name: categoryString }]);
  };

  return (
    <Box as='form' onSubmit={handleSubmit}>
      <FormControl isInvalid={!!errorMessage}>
        <FormLabel>Category Name</FormLabel>
        <Input
          type='text'
          name='category'
          bgColor={'gray.700'}
          placeholder='category'
        />
        <FormErrorMessage>{errorMessage}</FormErrorMessage>
      </FormControl>

      <Box textAlign='center' mt='50px'>
        <Button colorScheme='blue' size='lg' type='submit'>
          Add Category
        </Button>
      </Box>
    </Box>
  );
};
