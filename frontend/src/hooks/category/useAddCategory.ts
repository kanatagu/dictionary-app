import { useState, FormEventHandler } from 'react';
import { useNavigate } from 'react-router-dom';
import useSWRMutation from 'swr/mutation';
import { useToast } from '@chakra-ui/react';
import { createCategoryApi } from '../../api/category';
import { useGetCategories } from '.';
import { isErrorWithMessage } from '../../utils';

export const useAddCategory = () => {
  const navigate = useNavigate();
  const toast = useToast();
  const [errorMessage, setErrorMessage] = useState('');

  const { trigger, isMutating } = useSWRMutation(
    '/categories',
    createCategoryApi
  );
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
      await trigger({ name: inputCategory });
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
      if (isErrorWithMessage(e)) {
        toast({
          title: 'Error',
          description:
            e.response?.data.message ||
            'Sorry, error has occurred. Try again later.',
          status: 'error',
          duration: 5000,
          isClosable: true,
        });
      }
    }
  };

  return {
    errorMessage,
    addCategory,
    isMutating,
  };
};
