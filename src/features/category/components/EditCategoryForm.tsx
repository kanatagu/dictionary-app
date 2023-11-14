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
import { CategoryType, MyItemType } from '../../../types';

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

  const [storedCategoriesValue, setStoredCategoriesValue] = useLocalStorage<
    CategoryType[]
  >('category', [], afterSubmit);

  const [storedMyItemsValue, setStoredMyItemsValue] = useLocalStorage<
    MyItemType[]
  >('myItem', []);

  const newArray = [...storedCategoriesValue];
  const storedCategoryItem = newArray.find(
    (item) => item.id === Number(params.categoryId)
  );

  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    setErrorMessage('');
    const form = new FormData(e.currentTarget);
    const inputCategory = form.get('category')?.toString() || '';

    if (inputCategory === '') {
      setErrorMessage('Category name is required');
      return;
    }

    if (inputCategory.length > 30) {
      setErrorMessage('Enter a category name less than 30 characters');
      return;
    }

    if (storedCategoryItem) {
      storedCategoryItem.name = inputCategory;
      setStoredCategoriesValue(newArray);
    }

    // Update category name in myItems
    const newItemsArray = storedMyItemsValue.map((myItem) => {
      myItem.category.forEach((categoryItem) => {
        if (categoryItem.id === storedCategoryItem?.id) {
          categoryItem.name = inputCategory;
        }
      });
      return myItem;
    });

    setStoredMyItemsValue(newItemsArray);
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
          defaultValue={storedCategoryItem?.name}
        />
        <FormErrorMessage>{errorMessage}</FormErrorMessage>
      </FormControl>

      <Box textAlign='center' mt='50px'>
        <Button colorScheme='blue' size='lg' type='submit'>
          Save Changes
        </Button>
      </Box>
    </Box>
  );
};
