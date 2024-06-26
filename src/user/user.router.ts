import express, { response } from 'express';
import { body, validationResult } from 'express-validator';

import * as UserService from './user.service';
import { hashSync } from 'bcryptjs';
import { PASSWORD_SALT } from '../utils/consts';
import { generateToken } from '../middleware/authJWT';

export const userRouter = express.Router();

// GET: List of all Users
userRouter.get('/', async (request, response) => {
  try {
    const users = await UserService.listUsers();

    const totalUsers = users.length;
    response.setHeader(
      'Content-Range',
      `users 0-${totalUsers - 1}/${totalUsers}`
    );

    return response.status(200).json(users);
  } catch (error: any) {
    return response.status(500).json({ errors: error.message, success: false });
  }
});

// GET: Get a single user by ID
userRouter.get('/:id', async (request, response) => {
  const id = parseInt(request.params.id, 10);

  try {
    const user = await UserService.getUser(id);
    if (user) {
      return response.status(200).json(user);
    }
    return response.status(404).json('User could not be found');
  } catch (error: any) {
    return response.status(500).json({ errors: error.message, success: false });
  }
});

// POST: Create a user
// Params: email, username, password, firstName, lastName
userRouter.post(
  '/',
  body('email').isEmail(),
  body('username').isString(),
  body('password').isString(),
  body('firstName').isString(),
  body('lastName').isString(),
  async (request, response) => {
    const errors = validationResult(request);

    if (!errors.isEmpty()) {
      return response.status(400).json({ errors: errors.array() });
    }

    try {
      const user = request.body;
      const newUser = await UserService.createUser(user);
      return response.status(201).json({
        user: newUser,
        message: 'User created successfully',
        success: true,
      });
    } catch (error: any) {
      return response
        .status(500)
        .json({ error: error.message, success: false });
    }
  }
);

// PUT: Update a user
// Params: email, username, password, firstName, lastName
userRouter.put(
  '/:id',
  body('email').isEmail(),
  body('username').isString(),
  body('password').isString(),
  body('firstName').isString(),
  body('lastName').isString(),
  async (request, response) => {
    const errors = validationResult(request);

    if (!errors.isEmpty()) {
      return response.status(400).json({ errors: errors.array() });
    }

    const id = parseInt(request.params?.id, 10);

    try {
      const user = request.body;
      const { password } = request.body;

      const hashedPassword = hashSync(password, PASSWORD_SALT);

      const userWithHashedPassword = {
        ...user,
        password: hashedPassword,
      };

      const token = generateToken(userWithHashedPassword);

      const updatedUser = await UserService.updateUser(
        userWithHashedPassword,
        id
      );
      return response.status(200).json({ updatedUser, token });
    } catch (error: any) {
      return response
        .status(500)
        .json({ errors: error.message, success: false });
    }
  }
);

// DELETE: Delete a user by ID
userRouter.delete('/:id', async (request, response) => {
  const id = parseInt(request.params.id, 10);

  try {
    await UserService.deleteUser(id);
    return response.status(204).json('User has been successfully deleted');
  } catch (error: any) {
    return response.status(500).json({ errors: error.message, success: false });
  }
});

userRouter.post('/:id/favorite-playgrounds', async (request, response) => {
  const userId = parseInt(request.params?.id, 10);
  const playgroundId: number = parseInt(request.body.playgroundId);

  try {
    const userFavoritePlaygrounds =
      await UserService.getUserFavoritePlaygrounds(userId, playgroundId);
    if (userFavoritePlaygrounds) {
      return response.status(200).json(userFavoritePlaygrounds);
    }
    return response
      .status(404)
      .json('UserFavoritePlayground could not be found');
  } catch (error: any) {
    return response.status(500).json({ errors: error.message, success: false });
  }
});

// PUT: Update user favorite playgrounds
// Params: userId, playgroundId
userRouter.put('/:id/favorite-playgrounds', async (request, response) => {
  const userId = parseInt(request.params?.id, 10);
  const playgroundId: number = parseInt(request.body.playgroundId);

  try {
    const userFavoritePlaygrounds =
      await UserService.updateUserFavoritePlayground(userId, playgroundId);
    if (userFavoritePlaygrounds) {
      return response.status(200).json(userFavoritePlaygrounds);
    }
    return response
      .status(404)
      .json('UserFavoritePlayground could not be found');
  } catch (error: any) {
    return response.status(500).json({ errors: error.message, success: false });
  }
});
