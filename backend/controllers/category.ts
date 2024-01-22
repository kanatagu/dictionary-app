import { Request, Response } from 'express';
import categoryModel from '../models/category';
import myWordModel from '../models/myWord';

/**
 * @desc     Get all categories
 * @route    GET /api/categories
 * @access   Public
 */
export function getCategories(req: Request, res: Response) {
  const { user } = req;

  // Filter categories by user
  const filteredCategories = categoryModel.categories.filter(
    (category) => category.userId === user.id
  );

  return res.status(200).json(filteredCategories);
}

/**
 * @desc     Get category by id
 * @route    GET /api/categories/:id
 * @access   Public
 */
export function getCategoryById(req: Request, res: Response) {
  const { user } = req;
  const { id } = req.params;

  // Filter categories by user
  const filteredCategories = categoryModel.categories.filter(
    (category) => category.userId === user.id
  );

  const category = filteredCategories.find((category) => category.id === id);

  if (!category) {
    return res.status(404).json({ message: 'The category not found' });
  }

  return res.status(200).json(category);
}

/**
 * @desc     Create category
 * @route    POST /api/categories
 * @access   Public
 */
export function createCategory(req: Request, res: Response) {
  const { user } = req;
  const { name } = req.body;

  if (!name) {
    return res.status(400).json({ message: 'Please provide category name' });
  }

  const categoryId = String(categoryModel.categories.length + 1);
  const category = new categoryModel.Category(categoryId, name, user.id);
  categoryModel.categories.push(category);

  return res.status(201).json({ id: categoryId, name });
}

/**
 * @desc     Update category
 * @route    PUT /api/categories/:id
 * @access   Public
 */
export function updateCategory(req: Request, res: Response) {
  const { user } = req;
  const { id } = req.params;
  const { name } = req.body;

  // Filter categories by user
  const filteredCategories = categoryModel.categories.filter(
    (category) => category.userId === user.id
  );

  const category = filteredCategories.find((category) => category.id === id);

  if (!category) {
    return res.status(404).json({ message: 'The category not found' });
  }

  category.name = name;

  // Update category name in myItems
  const newItemsArray = myWordModel.myWords.map((item) => {
    item.category.forEach((categoryItem) => {
      if (categoryItem.id === category.id) {
        categoryItem.name = name;
      }
    });
    return item;
  });
  myWordModel.myWords = newItemsArray;

  return res.status(200).json(category);
}

/**
 * @desc     Delete category
 * @route    DELETE /api/categories/:id
 * @access   Public
 */
export function deleteCategory(req: Request, res: Response) {
  const { user } = req;
  const { id } = req.params;

  // Filter categories by user
  const filteredCategories = categoryModel.categories.filter(
    (category) => category.userId === user.id
  );

  const category = filteredCategories.find((category) => category.id === id);

  if (!category) {
    return res.status(404).json({ message: 'The category not found' });
  }

  // Delete category from myItems
  // Filter myItems by user
  const filteredItems = myWordModel.myWords.filter(
    (item) => item.userId === user.id
  );

  let newArray = [...filteredItems];

  newArray.forEach((myItem) => {
    const updatedCategoryItems = myItem.category.filter(
      (categoryItem) => categoryItem.id !== category.id
    );

    // If only this category is attached, delete the entire item
    if (updatedCategoryItems.length === 0) {
      const deletedItemsArray = newArray.filter(
        (item) => item.id !== myItem.id
      );

      newArray = deletedItemsArray;
    } else {
      myItem.category = updatedCategoryItems;
    }
  });

  myWordModel.myWords = newArray;

  // Delete Category
  const index = categoryModel.categories.indexOf(category);
  categoryModel.categories.splice(index, 1);

  return res.status(200).json({ message: 'The category deleted' });
}
