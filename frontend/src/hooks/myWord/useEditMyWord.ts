import { useState, FormEventHandler } from 'react';
import useSWRMutation from 'swr/mutation';
import { useToast } from '@chakra-ui/react';
import { MyWordType, CategoryType } from '../../types';
import { updateMyWordApi } from '../../api/myWords';
import { useGetMyWords } from '.';

export const useEditMyWord = (item: MyWordType, onClose: () => void) => {
  const toast = useToast();
  const [errorMessages, setErrorMessages] = useState<
    { message: string; label: string }[]
  >([]);
  const [checkedCategory, setCheckedCategory] = useState<CategoryType[]>(
    item.category
  );

  const { trigger, isMutating } = useSWRMutation(
    `/my-words/${item.id}`,
    updateMyWordApi
  );
  const { refetch } = useGetMyWords();

  const isFavoriteThisCategory = (categoryId: string) => {
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

  const editMyItem: FormEventHandler<HTMLFormElement> = async (e) => {
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

    const arg = {
      memo: inputMemo,
      word: item.word,
      category: checkedCategory,
    };

    await trigger(arg);

    toast({
      title: 'Success!',
      description: 'Saved changes.',
      status: 'success',
      duration: 3000,
      isClosable: true,
    });
    onClose();
    refetch();
  };

  return {
    errorMessages,
    editMyItem,
    clickHandler,
    isFavoriteThisCategory,
    isMutating,
  };
};
