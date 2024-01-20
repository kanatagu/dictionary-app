import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jsonwebtoken from 'jsonwebtoken';
import userModel from '../models/user';

/**
 * @desc     Register user
 * @route    POST /api/auth/register
 * @access   Public
 */
export async function createUser(req: Request, res: Response) {
  const { email, password } = req.body;
  console.log('email', email);
  console.log('password', password);

  if (!email || !password) {
    return res
      .status(400)
      .json({ message: 'Please provide email and password' });
  }

  const userId = String(userModel.users.length + 1);
  const salt = await bcrypt.genSalt();
  const hashedPassword = await bcrypt.hash(password, salt);
  const user = new userModel.User(userId, email, hashedPassword);
  userModel.users.push(user);

  return res.status(201).json({ id: userId, email });
}

/**
 * @desc     Login user
 * @route    POST /api/auth/login
 * @access   Public
 */
export async function loginUser(req: Request, res: Response) {
  const { email, password } = req.body;
  const token = jsonwebtoken.sign({ email }, 'DUMMYKEY');
  const user = userModel.users.find((user) => user.email === email);

  if (!user) {
    return res.status(400).json({ message: 'Invalid login information' });
  }

  const matchPassword = await bcrypt.compare(password, user.password);

  if (!matchPassword) {
    return res.status(400).json({ message: 'Invalid login information' });
  }

  res.cookie('token', token, { httpOnly: true });

  return res.status(200).json({ id: user.id, email: user.email });
}
