import { Request, Response, NextFunction } from 'express';
import { sign, verify } from 'jsonwebtoken';
import dotenv from 'dotenv';
import { User } from '../utils/type';

dotenv.config();

export const generateToken = (user: Omit<User, 'password'>) => {
  const payload = {
    id: user.id,
    email: user.email,
    username: user.username,
    firstName: user.firstName,
    lastName: user.lastName,
    isAdmin: user.isAdmin,
  };
  return sign(payload, process.env.JWT_SECRET!, {
    expiresIn: '1h',
  });
};

export const verifyToken = (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const token = request.header('token');

  if (!token) {
    return response
      .status(401)
      .json({ errors: 'No access token provided', success: false });
  }

  try {
    const validToken = verify(token, process.env.JWT_SECRET!);

    if (validToken) {
      return next();
    }
  } catch (error: any) {
    console.log(error);
    return response.status(500).json({ errors: error.message, success: false });
  }
};
