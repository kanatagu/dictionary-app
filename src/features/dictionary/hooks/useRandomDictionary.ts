import { useSearchParams } from 'react-router-dom';
import useSWRImmutable from 'swr/immutable';
import { WordType } from '../../../types';
import { DICTIONARY_URL } from '../../../const';
import { dictionaryFetcher } from '../../../api';

export const useRandomDictionary = () => {
  const [searchParams] = useSearchParams();
  const searchWord = searchParams.get('word');

  const { mutate, data, error, isValidating } = useSWRImmutable<
    Record<'list', WordType[]>
  >(!searchWord ? `${DICTIONARY_URL}/random` : null, dictionaryFetcher);

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
