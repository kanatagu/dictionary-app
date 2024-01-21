import useSWRImmutable from 'swr/immutable';
import { getCategory } from '../api';
import { CategoryType } from '../../../types';

export const useGetCategory = (id: string) => {
  const { data, error, isLoading, isValidating, mutate } =
    useSWRImmutable<CategoryType>(`/categories/${id}`, getCategory);

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
