import { useSearchParams } from 'react-router-dom';
import useSWRImmutable from 'swr/immutable';
import { WordType } from '../../../types';
import { DICTIONARY_URL } from '../../../const';
import { dictionaryFetcher } from '../../../api';

export const useSearchDictionary = () => {
  const [searchParams] = useSearchParams();
  const searchWord = searchParams.get('word');

  const { data, error, mutate } = useSWRImmutable<Record<'list', WordType[]>>(
    searchWord ? `${DICTIONARY_URL}/define?term=${searchWord}` : null,
    dictionaryFetcher
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
