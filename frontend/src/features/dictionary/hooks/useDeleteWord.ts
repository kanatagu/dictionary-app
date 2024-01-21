import useSWRMutation from 'swr/mutation';
import { useToast } from '@chakra-ui/react';
import { WordType } from '../../../types';
import { deleteMyWord as deleteMyWordApi } from '../../myWords/api';
import { useGetMyWords } from '../../myWords/hooks';

export const useDeleteWord = (onDeleteClose: () => void, data: WordType) => {
  const toast = useToast();

  const { data: myWords, refetch } = useGetMyWords();

  const id = myWords?.find((item) => item.word.defid === data.defid)?.id;
  console.log('id', id);

  const { trigger, isMutating } = useSWRMutation(
    `/my-words/${id}`,
    deleteMyWordApi
  );

  const deleteWord = async () => {
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

  const isInMyItem = !!id;

  return {
    deleteWord,
    isInMyItem,
    isMutating,
  };
};
