import express, { response } from 'express';
import { body, validationResult } from 'express-validator';

import * as RatingService from './rating.service';

export const ratingRouter = express.Router();

// GET: List of ratings
ratingRouter.get('/', async (request, response) => {
  try {
    const ratings = await RatingService.listRatings();

    const totalRatings = ratings.length;
    response.setHeader(
      'Content-Range',
      `users 0-${totalRatings - 1}/${totalRatings}`
    );

    return response.status(200).json(ratings);
  } catch (error: any) {
    return response.status(500).json({ errors: error.message, success: false });
  }
});

// GET: Get a single rating by ID
ratingRouter.get('/:id', async (request, response) => {
  const id = parseInt(request.params.id, 10);

  try {
    const rating = await RatingService.getRating(id);
    if (rating) {
      return response.status(200).json(rating);
    }
    return response.status(404).json('Rating could not be found');
  } catch (error: any) {
    return response.status(500).json({ errors: error.message, success: false });
  }
});

// POST: Create a rating
// Params: score, comment?, userId, playgroundId
ratingRouter.post(
  '/',
  body('score')
    .isNumeric()
    .isFloat({ min: 0, max: 5 })
    .withMessage('Score must be between 0 and 5'),
  body('comment').isString().optional({ nullable: true }),
  body('userId').isInt().withMessage('userId is required'),
  body('playgroundId').isInt().withMessage('playgroundId is required!'),
  async (request, response) => {
    const errors = validationResult(request);

    if (!errors.isEmpty()) {
      return response.status(400).json({ errors: errors.array() });
    }

    try {
      const rating = request.body;
      const newRating = await RatingService.createRating(rating);
      return response.status(201).json(newRating);
    } catch (error: any) {
      return response
        .status(500)
        .json({ error: error.message, success: false });
    }
  }
);

// PUT: Update a rating
// Params: score, comment, userId, playgroundId
ratingRouter.put(
  '/:id',
  body('score')
    .isNumeric()
    .isFloat({ min: 0, max: 5 })
    .withMessage('Score must be between 0 and 5'),
  body('comment').isString().optional({ nullable: true }),
  body('userId').isInt().withMessage('userId is required'),
  body('playgroundId').isInt().withMessage('playgroundId is required!'),
  async (request, response) => {
    const errors = validationResult(request);

    if (!errors.isEmpty()) {
      return response.status(400).json({ errors: errors.array() });
    }

    const id = parseInt(request.params?.id, 10);

    try {
      const rating = request.body;
      const updatedRating = await RatingService.updateRating(rating, id);
      return response.status(200).json(updatedRating);
    } catch (error: any) {
      return response
        .status(500)
        .json({ errors: error.message, success: false });
    }
  }
);

// DELETE: Delete a rating by ID
ratingRouter.delete('/:id', async (request, response) => {
  const id = parseInt(request.params.id, 10);

  try {
    await RatingService.deleteRating(id);
    return response.status(204).json('Rating has been successfully deleted');
  } catch (error: any) {
    return response.status(500).json({ errors: error.message, success: false });
  }
});
