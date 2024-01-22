import useSWRImmutable from 'swr/immutable';
import { getMyWordApi } from '../../api/myWords';
import { MyWordType } from '../../types';

export const useGetMyWords = () => {
  const { data, error, isLoading, isValidating, mutate } = useSWRImmutable<
    MyWordType[]
  >('/my-words', getMyWordApi);

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
