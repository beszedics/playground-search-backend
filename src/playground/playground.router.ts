import express, { response } from 'express';
import { body, validationResult } from 'express-validator';

import * as PlaygroundService from './playground.service';

export const playgroundRouter = express.Router();

// GET: List of all Playgrounds
playgroundRouter.get('/', async (request, response) => {
  try {
    const playgrounds = await PlaygroundService.listPlaygrounds();
    return response.status(200).json(playgrounds);
  } catch (error: any) {
    return response.status(500).json({ errors: error.message, success: false });
  }
});

// GET: Get a single playground by ID
playgroundRouter.get('/:id', async (request, response) => {
  const id = parseInt(request.params.id, 10);

  try {
    const playground = await PlaygroundService.getPlayground(id);
    if (playground) {
      return response.status(200).json(playground);
    }
    return response.status(404).json('Playground could not be found');
  } catch (error: any) {
    return response.status(500).json({ errors: error.message, success: false });
  }
});

// POST: Create a playground
// Params: name, address, latitude, longitude, openingHours?
playgroundRouter.post(
  '/',
  body('name').isString(),
  body('address').isString(),
  body('latitude').isFloat(),
  body('longitude').isFloat(),
  body('openingHours').isString().optional({ nullable: true }),
  async (request, response) => {
    const errors = validationResult(request);

    if (!errors.isEmpty()) {
      return response.status(400).json({ errors: errors.array() });
    }

    try {
      const playground = request.body;
      const newPlayground = await PlaygroundService.createPlayground(
        playground
      );
      return response.status(201).json(newPlayground);
    } catch (error: any) {
      return response
        .status(500)
        .json({ errors: error.message, success: false });
    }
  }
);

// PUT: Update a playground
// Params: name, address, latitude, longitude
playgroundRouter.put(
  '/:id',
  body('name').isString(),
  body('address').isString(),
  body('latitude').isDecimal(),
  body('longitude').isDecimal(),
  async (request, response) => {
    const errors = validationResult(request);

    if (!errors.isEmpty()) {
      return response.status(400).json({ errors: errors.array() });
    }

    const id = parseInt(request.params?.id, 10);

    try {
      const playground = request.body;
      const updatedPlayground = await PlaygroundService.updatePlayground(
        playground,
        id
      );
      return response.status(200).json(updatedPlayground);
    } catch (error: any) {
      return response
        .status(500)
        .json({ errors: error.message, success: false });
    }
  }
);

// DELETE: Delete a playground by ID
playgroundRouter.delete('/:id', async (request, response) => {
  const id = parseInt(request.params?.id, 10);

  try {
    await PlaygroundService.deletePlayground(id);
    return response
      .status(204)
      .json('Playground has been successfully deleted');
  } catch (error: any) {
    return response.status(500).json({ errors: error.message, success: false });
  }
});
