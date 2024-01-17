import { useToast } from '@chakra-ui/react';
import { useLocalStorage } from '../../../hooks';
import { MyItemType } from '../../../types';

export const useDeleteMyItem = (
  myItem: MyItemType,
  onDeleteClose: () => void
) => {
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

  const deleteMyItem = () => {
    const filteredMyList = storedMyItemsValue.filter(
      (item) => item.id !== myItem.id
    );
    setStoredMyItemsValue(filteredMyList);
  };

  return {
    deleteMyItem,
  };
};
