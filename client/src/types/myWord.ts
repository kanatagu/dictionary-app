import { CategoryType, WordType } from '.';

export type MyWordType = {
  id: string;
  memo?: string;
  word: WordType;
  category: CategoryType[];
};
