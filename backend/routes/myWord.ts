import express from 'express';
import {
  getMyWords,
  createMyWord,
  updateMyWord,
  deleteMyWord,
} from '../controllers/myWord';

const router = express.Router();
router.get('/', getMyWords);
router.post('/', createMyWord);
router.put('/:id', updateMyWord);
router.delete('/:id', deleteMyWord);

export default router;
