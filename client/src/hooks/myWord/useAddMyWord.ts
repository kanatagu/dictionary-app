import { useState, FormEventHandler } from 'react';
import useSWRMutation from 'swr/mutation';
import { useToast } from '@chakra-ui/react';
import { CategoryType, WordType } from '../../types';
import { addMyWordApi } from '../../api/myWords';
import { useGetMyWords } from '.';
import { isErrorWithMessage } from '../../utils';

export const useAddMyWord = (onClose: () => void, data: WordType) => {
  const toast = useToast();
  const [errorMessages, setErrorMessages] = useState<
    { message: string; label: string }[]
  >([]);
  const [checkedCategory, setCheckedCategory] = useState<CategoryType[]>([]);

  const { trigger, isMutating } = useSWRMutation('/my-words', addMyWordApi);
  const { refetch } = useGetMyWords();

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

  const addWord: FormEventHandler<HTMLFormElement> = async (e) => {
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

    try {
      const arg = {
        memo: inputMemo,
        word: data,
        category: checkedCategory,
      };

      await trigger(arg);

      toast({
        title: 'Success!',
        description: 'Added to my list',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });

      onClose();
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
    errorMessages,
    clickHandler,
    addWord,
    isMutating,
  };
};
