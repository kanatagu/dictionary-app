import express from 'express';
import {
  createUser,
  loginUser,
  getUser,
  logoutUser,
} from '../controllers/auth';
import { verifyToken } from '../middleware/verifyToken';

const router = express.Router();

router.post('/register', createUser);
router.post('/login', loginUser);
router.get('/user', verifyToken, getUser);
router.get('/logout', logoutUser);

export default router;
