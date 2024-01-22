import { useState } from 'react';
import { FormEventHandler } from 'react';
import { useNavigate } from 'react-router-dom';
import useSWRMutation from 'swr/mutation';
import { mutate } from 'swr';
import { useToast } from '@chakra-ui/react';
import { updateCategoryApi } from '../../api/category';
import { isErrorWithMessage } from '../../utils';

export const useEditCategory = (id: string) => {
  const navigate = useNavigate();
  const toast = useToast();
  const [errorMessage, setErrorMessage] = useState('');

  const { trigger, isMutating } = useSWRMutation(
    `/categories/${id}`,
    updateCategoryApi
  );

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

      // Need to use mutate() to update multiple keys
      mutate(
        (key) => typeof key === 'string' && key.startsWith('/categories'),
        undefined,
        { revalidate: true }
      );
      mutate('/my-words', undefined, { revalidate: true });

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
    editCategory,
    isMutating,
  };
};
