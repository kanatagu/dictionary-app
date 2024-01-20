import { Request, Response } from 'express';
import categoryModel from '../models/category';

/**
 * @desc     Get all categories
 * @route    GET /api/categories
 * @access   Public
 */
export function getCategories(req: Request, res: Response) {
  return res.status(200).json(categoryModel.categories);
}

/**
 * @desc     Create category
 * @route    POST /api/categories
 * @access   Public
 */
export function createCategory(req: Request, res: Response) {
  const { name } = req.body;

  if (!name) {
    return res.status(400).json({ message: 'Please provide category name' });
  }

  const categoryId = String(categoryModel.categories.length + 1);
  const category = new categoryModel.Category(categoryId, name);
  categoryModel.categories.push(category);

  return res.status(201).json({ id: categoryId, name });
}

/**
 * @desc     Update category
 * @route    PUT /api/categories/:id
 * @access   Public
 */
export function updateCategory(req: Request, res: Response) {
  console.log('req.params', req.params);
  const { id } = req.params;
  const { name } = req.body;
  const category = categoryModel.categories.find(
    (category) => category.id === id
  );

  if (!category) {
    return res.status(404).json({ message: 'The category not found' });
  }

  category.name = name;

  return res.status(200).json(category);
}

/**
 * @desc     Delete category
 * @route    DELETE /api/categories/:id
 * @access   Public
 */
export function deleteCategory(req: Request, res: Response) {
  const { id } = req.params;
  const category = categoryModel.categories.find(
    (category) => category.id === id
  );

  if (!category) {
    return res.status(404).json({ message: 'The category not found' });
  }

  const index = categoryModel.categories.indexOf(category);
  categoryModel.categories.splice(index, 1);

  return res.status(200).json({ message: 'The category deleted' });
}
