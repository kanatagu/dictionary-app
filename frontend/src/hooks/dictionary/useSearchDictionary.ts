import { useSearchParams } from 'react-router-dom';
import useSWRImmutable from 'swr/immutable';
import { WordType } from '../../types';
import { getDictionariesApi } from '../../api/dictionary';

export const useSearchDictionary = () => {
  const [searchParams] = useSearchParams();
  const searchWord = searchParams.get('word');

  const { data, error, mutate } = useSWRImmutable<Record<'list', WordType[]>>(
    searchWord ? `/define?term=${searchWord}` : null,
    getDictionariesApi
  );

  const refetch = () => {
    mutate();
  };

  return {
    data,
    isError: error,
    refetch,
  };
};
