import { useToast } from '@chakra-ui/react';
import { WordType, MyItemType } from '../../../types';
import { useLocalStorage } from '../../../hooks';

export const useDeleteWord = (onDeleteClose: () => void, data: WordType) => {
  const toast = useToast();

  const afterSubmit = () => {
    toast({
      title: 'Success!',
      description: 'Deleted the word.',
      status: 'success',
      duration: 3000,
      isClosable: true,
    });
    onDeleteClose();
  };

  const [storedMyItemsValue, setStoredMyItemsValue] = useLocalStorage<
    MyItemType[]
  >('myItem', [], afterSubmit);

  const deleteWord = () => {
    const filteredMyItems = storedMyItemsValue.filter(
      (item) => item.word.defid !== data.defid
    );
    setStoredMyItemsValue(filteredMyItems);
  };

  const isInMyItem = storedMyItemsValue.some(
    (item) => item.word.defid === data.defid
  );

  return {
    deleteWord,
    isInMyItem,
  };
};
