import useSWRMutation from 'swr/mutation';
import { mutate } from 'swr';
import { useToast } from '@chakra-ui/react';
import { deleteCategoryApi } from '../../api/category';

export const useDeleteCategory = (id: string, onClose: () => void) => {
  const toast = useToast();

  const { trigger, isMutating } = useSWRMutation(
    `/categories/${id}`,
    deleteCategoryApi
  );

  const deleteCategory = async () => {
    try {
      await trigger();
      toast({
        title: 'Success!',
        description: 'Deleted category name.',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });

      // Need to use mutate() to update multiple keys
      mutate('/categories', undefined, { revalidate: true });
      mutate('/my-words', undefined, { revalidate: true });

      onClose();
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
    deleteCategory,
    isMutating,
  };
};
