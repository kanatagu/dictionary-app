import { useState, FormEventHandler } from 'react';
import { useToast } from '@chakra-ui/react';
import { useLocalStorage } from '../../../hooks';
import { MyItemType, CategoryType, WordType } from '../../../types';

export const useAddWord = (onClose: () => void, data: WordType) => {
  const toast = useToast();
  const [errorMessages, setErrorMessages] = useState<
    { message: string; label: string }[]
  >([]);
  const [checkedCategory, setCheckedCategory] = useState<CategoryType[]>([]);

  const afterSubmit = () => {
    toast({
      title: 'Success!',
      description: 'Added to my list',
      status: 'success',
      duration: 3000,
      isClosable: true,
    });
    onClose();
  };

  const [storedMyItemsValue, setStoredMyItemsValue] = useLocalStorage<
    MyItemType[]
  >('myItem', [], afterSubmit);

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

  const addWord: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    setErrorMessages([]);
    const form = new FormData(e.currentTarget);
    const inputMemo = form.get('memo')?.toString() || '';

    if (inputMemo.length > 100 || !checkedCategory.length) {
      if (inputMemo.length > 100) {
        const memoError = {
          message: 'Enter a memo less than 100 characters',
          label: 'memo',
        };
        setErrorMessages((currentItem) => [...currentItem, memoError]);
      }

      if (!checkedCategory.length) {
        const categoryError = {
          message: 'Select at lease one category',
          label: 'category',
        };
        setErrorMessages((currentItem) => [...currentItem, categoryError]);
      }
      return;
    }

    const id = storedMyItemsValue.length
      ? storedMyItemsValue.slice(-1)[0].id + 1
      : 1;

    const newData: MyItemType = {
      id,
      memo: inputMemo,
      word: data,
      category: checkedCategory,
    };

    setStoredMyItemsValue([...storedMyItemsValue, newData]);
  };

  return {
    errorMessages,
    clickHandler,
    addWord,
  };
};
