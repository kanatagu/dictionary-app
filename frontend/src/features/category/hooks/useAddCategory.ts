import { useState, FormEventHandler } from 'react';
import { useNavigate } from 'react-router-dom';
import useSWRMutation from 'swr/mutation';
import { useToast } from '@chakra-ui/react';
import { createCategory } from '../api';
import { useGetCategories } from '.';

export const useAddCategory = () => {
  const navigate = useNavigate();
  const toast = useToast();
  const [errorMessage, setErrorMessage] = useState('');

  const { trigger, isMutating } = useSWRMutation('/categories', createCategory);
  const { refetch } = useGetCategories();

  const addCategory: FormEventHandler<HTMLFormElement> = async (e) => {
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

    try {
      const result = await trigger({ name: inputCategory });
      console.log(result);
      toast({
        title: 'Success!',
        description: 'Created category name.',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });

      refetch();
      navigate('/category');
    } catch (e) {
      console.error(e);
      toast({
        title: 'Error',
        description: 'Sorry, error has occurred. Try again later.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return {
    errorMessage,
    addCategory,
    isMutating,
  };
};
