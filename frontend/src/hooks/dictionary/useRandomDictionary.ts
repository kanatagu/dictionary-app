import { useSearchParams } from 'react-router-dom';
import useSWRImmutable from 'swr/immutable';
import { WordType } from '../../types';
import { getDictionariesApi } from '../../api/dictionary';

export const useRandomDictionary = () => {
  const [searchParams] = useSearchParams();
  const searchWord = searchParams.get('word');

  const { mutate, data, error, isValidating } = useSWRImmutable<
    Record<'list', WordType[]>
  >(!searchWord ? `/random` : null, getDictionariesApi);

  const refetch = () => {
    mutate();
  };

  return {
    data,
    isError: error,
    refetch,
    isValidating,
  };
};
