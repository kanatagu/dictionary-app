import useSWRMutation from 'swr/mutation';
import { useToast } from '@chakra-ui/react';
import { deleteMyWordApi } from '../../api/myWords';
import { isErrorWithMessage } from '../../utils';

export const useDeleteMyWord = (
  onDeleteClose: () => void,
  id: string,
  refetch: () => void
) => {
  const toast = useToast();

  const { trigger, isMutating } = useSWRMutation(
    `/my-words/${id}`,
    deleteMyWordApi
  );

  const deleteMyWord = async () => {
    try {
      await trigger();

      toast({
        title: 'Success!',
        description: 'Deleted the word.',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
      onDeleteClose();
      refetch();
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
    deleteMyWord,
    isMutating,
  };
};
