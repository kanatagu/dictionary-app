import { useState, FormEventHandler } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@chakra-ui/react';
import { useLocalStorage } from '../../../hooks';
import { CategoryType } from '../../../types';

export const useAddCategory = () => {
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

  const [storedCategoriesValue, setStoredCategoriesValue] = useLocalStorage<
    CategoryType[]
  >('category', [], afterSubmit);

  const addCategory: FormEventHandler<HTMLFormElement> = (e) => {
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

    const id = storedCategoriesValue.length
      ? storedCategoriesValue.slice(-1)[0].id + 1
      : 1;

    setStoredCategoriesValue([
      ...storedCategoriesValue,
      { id, name: inputCategory },
    ]);
  };

  return {
    errorMessage,
    addCategory,
  };
};
