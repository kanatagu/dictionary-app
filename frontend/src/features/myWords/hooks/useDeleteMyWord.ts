import useSWRMutation from 'swr/mutation';
import { useToast } from '@chakra-ui/react';
import { MyWordType } from '../../../types';
import { deleteMyWord as deleteMyWordApi } from '../api';
import { useGetMyWords } from '.';

export const useDeleteMyWord = (
  myItem: MyWordType,
  onDeleteClose: () => void
) => {
  const toast = useToast();

  const { trigger, isMutating } = useSWRMutation(
    `/my-words/${myItem.id}`,
    deleteMyWordApi
  );

  const { refetch } = useGetMyWords();

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
