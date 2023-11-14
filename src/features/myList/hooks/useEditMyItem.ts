import { useState, FormEventHandler } from 'react';
import { useToast } from '@chakra-ui/react';
import { useLocalStorage } from '../../../hooks';
import { MyItemType, CategoryType } from '../../../types';

export const useEditMyItem = (item: MyItemType, onClose: () => void) => {
  const toast = useToast();
  const [errorMessage, setErrorMessage] = useState('');
  const [checkedCategory, setCheckedCategory] = useState<CategoryType[]>(
    item.category
  );

  const afterSubmit = () => {
    toast({
      title: 'Success!',
      description: 'Saved changes.',
      status: 'success',
      duration: 3000,
      isClosable: true,
    });
    onClose();
  };

  const [storedCategoriesValue, _] = useLocalStorage<
    { id: number; name: string }[]
  >('category', []);

  const [storedMyItemsValue, setStoredMyItemsValue] = useLocalStorage<
    MyItemType[]
  >('myItem', [], afterSubmit);

  const newArray = [...storedMyItemsValue];
  const storedMyItem = newArray.find((storedItem) => storedItem.id === item.id);

  const isFavoriteThisCategory = (categoryId: number) => {
    return item.category.some((category) => category.id === categoryId);
  };

  const clickHandler = (category: CategoryType) => {
    const foundItem = checkedCategory.some(
      (checkedItem) => checkedItem.id === category.id
    );

    if (foundItem) {
      setCheckedCategory(
        checkedCategory.filter((checkedItem) => checkedItem.id !== category.id)
      );
    } else {
      setCheckedCategory([...checkedCategory, category]);
    }
  };

  const editMyItem: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    setErrorMessage('');
    const form = new FormData(e.currentTarget);
    const inputMemo = form.get('memo')?.toString() || '';

    if (inputMemo.length > 100) {
      setErrorMessage('Enter a memo less than 100 characters');
      return;
    }

    if (storedMyItem) {
      storedMyItem.memo = inputMemo;
      storedMyItem.category = checkedCategory;
      setStoredMyItemsValue(newArray);
    }
  };

  return {
    errorMessage,
    editMyItem,
    clickHandler,
    isFavoriteThisCategory,
    storedCategoriesValue,
  };
};
