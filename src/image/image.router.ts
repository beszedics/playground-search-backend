import express from 'express';
import getImagesUrlsForPlayground from './image.service';

export const imageRouter = express.Router();

// GET: Get all images from a single playground by ID
imageRouter.get('/', async (request, response) => {
  try {
    const imageUrls = await getImagesUrlsForPlayground();
    response.status(200).json({ imageUrls });
  } catch (error: any) {
    console.log(error.message);
  }
});
