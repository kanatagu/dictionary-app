import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt, { VerifyErrors } from 'jsonwebtoken';
import userModel from '../models/user';

/**
 * @desc     Register user
 * @route    POST /api/auth/register
 * @access   Public
 */
export async function createUser(req: Request, res: Response) {
  const { email, password } = req.body;

  if (!email || !password) {
    return res
      .status(400)
      .json({ message: 'Please provide email and password' });
  }

  // Check if user already exists
  const existingUser = userModel.users.find((user) => user.email === email);
  if (existingUser) {
    return res.status(400).json({ message: 'Invalid user Information' });
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

  const user = userModel.users.find((user) => user.email === email);

  const token = jwt.sign(
    { id: user?.id, email: user?.email },
    `${process.env.JWT_SECRET_KEY}`,
    {
      expiresIn: process.env.JWT_EXPIRES_IN,
    }
  );

  if (!user) {
    return res.status(400).json({ message: 'Invalid login information' });
  }

  const matchPassword = await bcrypt.compare(password, user.password);

  if (!matchPassword) {
    return res.status(400).json({ message: 'Invalid login information' });
  }

  res.cookie('token', token, {
    secure: true,
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000, // 24H
  });

  return res.status(200).json({ id: user.id, email: user.email });
}

/**
 * @desc     Get User
 * @route    GET /api/auth/user
 * @access   Public
 */
export function getUser(req: Request, res: Response) {
  const { user: reqUser } = req;

  const user = userModel.users.find((user) => user.id === reqUser?.id);

  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  return res.status(200).json({ user });
}

/**
 * @desc     Logout user
 * @route    GET /api/auth/logout
 * @access   Public
 */
export function logoutUser(req: Request, res: Response) {
  res.clearCookie('token');

  return res.status(200).json({ message: 'Logout successfully' });
}
