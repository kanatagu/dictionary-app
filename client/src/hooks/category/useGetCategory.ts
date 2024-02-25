import useSWRImmutable from 'swr/immutable';
import { getCategoryApi } from '../../api/category';
import { CategoryType } from '../../types';

export const useGetCategory = (id: string) => {
  const { data, error, isLoading, isValidating, mutate } =
    useSWRImmutable<CategoryType>(`/categories/${id}`, getCategoryApi);

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
