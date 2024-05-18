import express from 'express';
import { body, validationResult } from 'express-validator';

import * as AuthService from './auth.service';
import * as UserService from '../user/user.service';
import { compareSync, hashSync } from 'bcryptjs';

import dotenv from 'dotenv';
import { generateToken, verifyToken } from '../middleware/authJWT';
import { PASSWORD_SALT } from '../utils/consts';

dotenv.config();

export const authRouter = express.Router();

authRouter.post(
  '/registration',
  body('email').isEmail().notEmpty().withMessage('Email is required'),
  body('username').isString().notEmpty().withMessage('Username is required'),
  body('password').isString().notEmpty().withMessage('Password is required'),
  body('firstName').isString(),
  body('lastName').isString(),
  async (request, response) => {
    const errors = validationResult(request);

    const { email, username, password } = request.body;

    if (!errors.isEmpty()) {
      return response.status(400).json({ errors: errors.array() });
    }

    try {
      const userByEmail = await AuthService.getUserByEmail(email);
      const userByUsername = await AuthService.getUserByUsername(username);

      if (userByEmail) {
        return response
          .status(409)
          .json({ errors: 'Email is already exists', success: false });
      }

      if (userByUsername) {
        return response
          .status(409)
          .json({ errors: 'Username is already exists', success: false });
      }

      const user = request.body;
      const hashedPassword = hashSync(password, PASSWORD_SALT);

      const createdUser = await UserService.createUser({
        ...user,
        password: hashedPassword,
      });

      const token = generateToken(createdUser);

      return response.status(200).json({
        user: createdUser,
        token: token,
        message: 'User created successfully',
        success: true,
      });
    } catch (error: any) {
      console.log(error);
      return response
        .status(500)
        .json({ errors: error.message, success: false });
    }
  }
);

authRouter.post(
  '/login',
  body('username').isString().withMessage('Username is required'),
  body('password').isString().withMessage('Password is required'),
  async (request, response) => {
    const { username, password: inputPassword } = request.body;
    try {
      const user = await AuthService.getUserByUsername(username);

      if (!user) {
        return response
          .status(404)
          .json({ errors: 'User could not be found', success: false });
      }

      const isValidPassword = compareSync(inputPassword, user.password);

      if (!isValidPassword) {
        return response
          .status(401)
          .json({ errors: 'Invalid password', success: false });
      }

      const { password, ...userWithoutPassword } = user;

      const token = generateToken(userWithoutPassword);

      return response.status(200).json({
        user: userWithoutPassword,
        token: token,
        message: 'Login successful',
        success: true,
      });
    } catch (error: any) {
      return response
        .status(500)
        .json({ errors: error.message, success: false });
    }
  }
);
