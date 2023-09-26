import express, { response } from 'express';
import { body, validationResult } from 'express-validator';

import * as CommentService from './comment.service';

export const commentRouter = express.Router();

// GET: List of all Comments
commentRouter.get('/', async (request, response) => {
  try {
    const comments = await CommentService.listComments();
    return response.status(200).json(comments);
  } catch (error: any) {
    return response
      .status(500)
      .json({ error: error.meta.cause, success: false });
  }
});

// GET: Get a single comment by ID
commentRouter.get('/:id', async (request, response) => {
  const id = parseInt(request.params.id, 10);

  try {
    const comment = await CommentService.getComment(id);
    if (comment) {
      return response.status(200).json(comment);
    }
    return response.status(404).json('Comment could not be found');
  } catch (error: any) {
    return response
      .status(500)
      .json({ error: error.meta.cause, success: false });
  }
});

// POST: Create a comment
// Params: description, userId, playgroundId, rating
commentRouter.post(
  '/',
  body('description').isString(),
  body('userId').isInt(),
  body('playgroundId').isInt(),
  body('rating').isInt(),
  async (request, response) => {
    const errors = validationResult(request);

    if (!errors.isEmpty()) {
      return response.status(400).json({ errors: errors.array() });
    }

    try {
      const comment = request.body;
      const newComment = await CommentService.createComment(comment);
      return response.status(201).json(newComment);
    } catch (error: any) {
      return response
        .status(500)
        .json({ error: error.meta.cause, success: false });
    }
  }
);

// PUT: Update a comment
// Params: description, userId, playgroundId, rating
commentRouter.put(
  '/:id',
  body('description').isString(),
  body('userId').isInt(),
  body('playgroundId').isInt(),
  body('rating').isNumeric(),
  async (request, response) => {
    const errors = validationResult(request);

    if (!errors.isEmpty()) {
      return response.status(400).json({ errors: errors.array() });
    }

    const id = parseInt(request.params?.id, 10);

    try {
      const comment = request.body;
      const updatedComment = await CommentService.updateComment(comment, id);
      return response.status(200).json(updatedComment);
    } catch (error: any) {
      return response
        .status(500)
        .json({ error: error.meta.cause, success: false });
    }
  }
);

// DELETE: Delete a comment by ID
commentRouter.delete('/:id', async (request, response) => {
  const id = parseInt(request.params.id, 10);

  try {
    await CommentService.deleteComment(id);
    return response.status(204).json('Comment has been successfully deleted');
  } catch (error: any) {
    return response
      .status(500)
      .json({ error: error.meta.cause, success: false });
  }
});
