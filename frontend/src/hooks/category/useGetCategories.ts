import useSWRImmutable from 'swr/immutable';
import { getCategoryApi } from '../../api/category';
import { CategoryType } from '../../types';

export const useGetCategories = () => {
  const { data, error, isLoading, isValidating, mutate } = useSWRImmutable<
    CategoryType[]
  >('/categories', getCategoryApi);

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
