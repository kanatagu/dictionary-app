import { Request, Response } from 'express';
import myWordModel from '../models/myWord';

// TODO getMyWords with categoryId (filter) when change to use mongodb
/**
 * @desc     Get all myWords
 * @route    GET /api/my-words
 * @access   Public
 */
export function getMyWords(req: Request, res: Response) {
  return res.status(200).json(myWordModel.myWords);
}

/**
 * @desc     Create myWord
 * @route    POST /api/my-words
 * @access   Public
 */
export function createMyWord(req: Request, res: Response) {
  const { memo, word, category } = req.body;

  if (!word) {
    return res.status(400).json({ message: 'Please select a word' });
  }

  if (!category) {
    return res.status(400).json({ message: 'Please select a category' });
  }

  const myWordId = String(myWordModel.myWords.length + 1);
  const myWord = new myWordModel.MyWord(myWordId, memo, word, category);
  myWordModel.myWords.push(myWord);

  return res.status(201).json({ id: myWordId, memo, word, category });
}

/**
 * @desc     Update myWord
 * @route    PUT /api/my-words/:id
 * @access   Public
 */
export function updateMyWord(req: Request, res: Response) {
  const { id } = req.params;
  const { memo, word, category } = req.body;
  const myWord = myWordModel.myWords.find((myWord) => myWord.id === id);

  if (!myWord) {
    return res.status(404).json({ message: 'The item not found' });
  }

  myWord.memo = memo;
  myWord.word = word;
  myWord.category = category;

  return res.status(200).json(myWord);
}

/**
 * @desc     Delete myWord
 * @route    DELETE /api/my-words/:id
 * @access   Public
 */
export function deleteMyWord(req: Request, res: Response) {
  const { id } = req.params;
  const myWord = myWordModel.myWords.find((myItem) => myItem.id === id);

  if (!myWord) {
    return res.status(404).json({ message: 'The item not found' });
  }

  const index = myWordModel.myWords.indexOf(myWord);
  myWordModel.myWords.splice(index, 1);

  return res.status(200).json(myWord);
}
