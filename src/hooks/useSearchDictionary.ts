import { useLocation } from 'react-router-dom';
import useSWRImmutable from 'swr/immutable';
import { WordType } from '../type';
import { DICTIONARY_URL } from '../const';
import { dictionaryFetcher } from '../api';

export const useSearchDictionary = () => {
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const searchWord = query.get('word');

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
