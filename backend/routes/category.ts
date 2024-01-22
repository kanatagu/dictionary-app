import express from 'express';
import {
  getCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
} from '../controllers/category';
import { verifyToken } from '../middleware/verifyToken';

const router = express.Router();

router.get('/', verifyToken, getCategories);
router.get('/:id', verifyToken, getCategoryById);
router.post('/', verifyToken, createCategory);
router.put('/:id', verifyToken, updateCategory);
router.delete('/:id', verifyToken, deleteCategory);

export default router;
