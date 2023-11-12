import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
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

export const EditCategoryForm = () => {
  const navigate = useNavigate();
  const params = useParams();
  const toast = useToast();
  const [errorMessage, setErrorMessage] = useState('');

  const afterSubmit = () => {
    toast({
      title: 'Success!',
      description: 'Updated category name.',
      status: 'success',
      duration: 3000,
      isClosable: true,
    });
    navigate('/category');
  };

  const [storedValue, setStoredValue] = useLocalStorage<
    { id: number; name: string }[]
  >('category', [], afterSubmit);

  const newArray = [...storedValue];
  const storedCategory = newArray.find(
    (item) => item.id === Number(params.categoryId)
  );

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

    if (storedCategory) {
      storedCategory.name = category.toString();
      setStoredValue(newArray);
    }
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
          defaultValue={storedCategory?.name}
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
