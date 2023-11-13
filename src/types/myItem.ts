import { CategoryType, WordType } from '../types';

export type MyItemType = {
  id: number;
  memo?: string;
  word: WordType;
  category: CategoryType[];
};
