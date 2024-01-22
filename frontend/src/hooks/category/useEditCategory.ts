import { useState } from 'react';
import { FormEventHandler } from 'react';
import { useNavigate } from 'react-router-dom';
import useSWRMutation from 'swr/mutation';
import { useToast } from '@chakra-ui/react';
import { updateCategoryApi } from '../../api/category';
import { useGetCategories } from '.';

export const useEditCategory = (id: string) => {
  const navigate = useNavigate();
  const toast = useToast();
  const [errorMessage, setErrorMessage] = useState('');

  const { trigger, isMutating } = useSWRMutation(
    `/categories/${id}`,
    updateCategoryApi
  );
  const { refetch } = useGetCategories();

  const editCategory: FormEventHandler<HTMLFormElement> = async (e) => {
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
        description: 'Updated category name.',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });

      // TODO : not working to refetch, fix this
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
    editCategory,
    isMutating,
  };
};
