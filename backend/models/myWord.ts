import { CategoryType } from './category';

type WordType = {
  definition: string;
  permalink: string;
  thumbs_up: number;
  author: string;
  word: string;
  defid: number;
  current_vote: string;
  written_on: string;
  example: string;
  thumbs_down: number;
};

type MyWordType = {
  id: string;
  memo?: string;
  word: WordType;
  category: CategoryType[];
};

class MyWord {
  id: string;
  memo?: string;
  word: WordType;
  category: CategoryType[];

  constructor(
    id: string,
    memo: string,
    word: WordType,
    category: CategoryType[]
  ) {
    this.id = id;
    this.memo = memo;
    this.word = word;
    this.category = category;
  }
}

// In-memory table
const myWords: MyWordType[] = [];

export default {
  MyWord,
  myWords,
};
