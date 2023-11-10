import { useLocation } from 'react-router-dom';
import useSWR, { useSWRConfig } from 'swr';
import { WordType } from '../type';
import { DICTIONARY_URL } from '../const';
import { dictionaryFetcher } from '../api';

export const useRandomDictionary = () => {
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const searchWord = query.get('word');

  const { data, error } = useSWR<Record<'list', WordType[]>>(
    !searchWord ? `${DICTIONARY_URL}/random` : null,
    dictionaryFetcher
  );
  const { mutate } = useSWRConfig();

  const refetch = () => {
    mutate(`${DICTIONARY_URL}/random`);
  };

  return {
    data,
    isError: error,
    refetch,
  };
};
