import useSWRImmutable from 'swr/immutable';
import { getMyWord } from '../api';
import { MyWordType } from '../../../types';

export const useGetMyWords = () => {
  const { data, error, isLoading, isValidating, mutate } = useSWRImmutable<
    MyWordType[]
  >('/my-words', getMyWord);

  const refetch = () => {
    mutate();
  };

  return {
    data,
    isLoading,
    isError: error,
    isValidating,
    refetch,
  };
};
