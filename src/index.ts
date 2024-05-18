import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { userRouter } from './user/user.router';
import { playgroundRouter } from './playground/playground.router';
import { ratingRouter } from './rating/rating.router';
import { imageRouter } from './image/image.router';
import { authRouter } from './auth/auth.router';
import { equipmentRouter } from './equipment/equipment.router';

const BASE_API_URI = process.env.BASE_API_URI || '/api/v1';

dotenv.config();

if (!process.env.PORT) {
  process.exit(1);
}

const app = express();
const port = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());
app.use(
  cors({
    exposedHeaders: ['Content-Range'],
  })
);

app.use(`${BASE_API_URI}/users`, userRouter);
app.use(`${BASE_API_URI}/playgrounds`, playgroundRouter);
app.use(`${BASE_API_URI}/ratings`, ratingRouter);
app.use(`${BASE_API_URI}/images`, imageRouter);
app.use(`${BASE_API_URI}/equipments`, equipmentRouter);
app.use(`${BASE_API_URI}/auth`, authRouter);

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});

export default app;
