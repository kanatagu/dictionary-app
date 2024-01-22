import useSWRMutation from 'swr/mutation';
import { useToast } from '@chakra-ui/react';
import { deleteMyWordApi } from '../../api/myWords';

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
  };

  return {
    deleteMyWord,
    isMutating,
  };
};
