import { Request, Response } from 'express';
import myItemModel from '../models/myItem';

/**
 * @desc     Get all myItems
 * @route    GET /api/myItems
 * @access   Public
 */
export function getMyItems(req: Request, res: Response) {
  return res.status(200).json(myItemModel.myItems);
}

/**
 * @desc     Create myItem
 * @route    POST /api/myItems
 * @access   Public
 */
export function createMyItem(req: Request, res: Response) {
  const { memo, word, category } = req.body;

  if (!word) {
    return res.status(400).json({ message: 'Please select a word' });
  }

  if (!category) {
    return res.status(400).json({ message: 'Please select a category' });
  }

  const myItemId = String(myItemModel.myItems.length + 1);
  const myItem = new myItemModel.MyItem(myItemId, memo, word, category);
  myItemModel.myItems.push(myItem);

  return res.status(201).json({ id: myItemId, memo, word, category });
}

/**
 * @desc     Update myItem
 * @route    PUT /api/myItems/:id
 * @access   Public
 */
export function updateMyItem(req: Request, res: Response) {
  const { id } = req.params;
  const { memo, word, category } = req.body;
  const myItem = myItemModel.myItems.find((myItem) => myItem.id === id);

  if (!myItem) {
    return res.status(404).json({ message: 'The item not found' });
  }

  myItem.memo = memo;
  myItem.word = word;
  myItem.category = category;

  return res.status(200).json(myItem);
}

/**
 * @desc     Delete myItem
 * @route    DELETE /api/myItems/:id
 * @access   Public
 */
export function deleteMyItem(req: Request, res: Response) {
  const { id } = req.params;
  const myItem = myItemModel.myItems.find((myItem) => myItem.id === id);

  if (!myItem) {
    return res.status(404).json({ message: 'The item not found' });
  }

  const index = myItemModel.myItems.indexOf(myItem);
  myItemModel.myItems.splice(index, 1);

  return res.status(200).json(myItem);
}
