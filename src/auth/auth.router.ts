import express from 'express';
import { body, validationResult } from 'express-validator';

import * as AuthService from './auth.service';
import * as UserService from '../user/user.service';
import { compareSync, hashSync } from 'bcryptjs';

const SALT = 10;

export const authRouter = express.Router();

authRouter.post(
  '/register',
  body('email').isEmail(),
  body('username').isString(),
  body('password').isString(),
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
          .json({ errors: 'Email already exists', success: false });
      }

      if (userByUsername) {
        console.log(userByUsername);
        return response
          .status(409)
          .json({ errors: 'Username already exists', success: false });
      }

      const user = request.body;
      const hashedPassword = hashSync(password, SALT);

      const createdUser = await UserService.createUser({
        ...user,
        password: hashedPassword,
      });
      return response.status(200).json({ user: createdUser, success: true });
    } catch (error: any) {
      return response
        .status(500)
        .json({ errors: error.message, success: false });
    }
  }
);

authRouter.post(
  '/login',
  body('username').isString(),
  body('password').isString(),
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

      return response
        .status(200)
        .json({ user: userWithoutPassword, success: true });
    } catch (error: any) {
      return response
        .status(500)
        .json({ errors: error.message, success: false });
    }
  }
);