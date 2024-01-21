import useSWRMutation from 'swr/mutation';
import { useToast } from '@chakra-ui/react';
import { deleteCategory as deleteCategoryApi } from '../api';
import { useGetCategories } from '.';

export const useDeleteCategory = (id: string, onClose: () => void) => {
  const toast = useToast();

  const { trigger, isMutating } = useSWRMutation(
    `/categories/${id}`,
    deleteCategoryApi
  );
  const { refetch } = useGetCategories();

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

      refetch();
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
