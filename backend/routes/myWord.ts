import express from 'express';
import {
  getMyWords,
  createMyWord,
  updateMyWord,
  deleteMyWord,
} from '../controllers/myWord';
import { verifyToken } from '../middleware/verifyToken';

const router = express.Router();
router.get('/', verifyToken, getMyWords);
router.post('/', verifyToken, createMyWord);
router.put('/:id', verifyToken, updateMyWord);
router.delete('/:id', verifyToken, deleteMyWord);

export default router;
