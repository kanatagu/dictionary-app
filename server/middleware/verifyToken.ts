import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export const verifyToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({ token: null });
    }

    const verified = jwt.verify(token, `${process.env.JWT_SECRET_KEY}`);

    if (!verified || typeof verified !== 'object') {
      return res.status(401).json({ message: 'Invalid token' });
    }

    req.user = {
      id: verified.id,
      email: verified.email,
    };

    next();
  } catch (e: any) {
    return res.status(401).json({ message: e.message });
  }
};
