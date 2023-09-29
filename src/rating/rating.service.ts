import { db } from '../utils/db.server';
import { RatingWrite } from '../utils/type';

export const listRatings = async () => {
  return db.rating.findMany({
    select: {
      id: true,
      score: true,
      comment: true,
      playground: {
        select: {
          id: true,
          name: true,
          address: true,
          latitude: true,
          longitude: true,
        },
      },
      user: {
        select: {
          id: true,
          username: true,
          firstName: true,
          lastName: true,
        },
      },
      createdAt: true,
      updatedAt: true,
    },
  });
};

export const getRating = async (id: number) => {
  return db.rating.findUnique({
    where: {
      id,
    },
    select: {
      id: true,
      score: true,
      comment: true,
      playground: {
        select: {
          id: true,
          name: true,
          address: true,
          latitude: true,
          longitude: true,
          openingHours: true,
          createdAt: true,
          updatedAt: true,
        },
      },
      user: {
        select: {
          id: true,
          username: true,
          firstName: true,
          lastName: true,
        },
      },
      createdAt: true,
      updatedAt: true,
    },
  });
};

export const createRating = async (rating: RatingWrite) => {
  const { score, comment, userId, playgroundId } = rating;
  return db.rating.create({
    data: {
      score,
      comment,
      userId,
      playgroundId,
    },
    select: {
      id: true,
      score: true,
      comment: true,
      user: {
        select: {
          id: true,
          username: true,
          firstName: true,
          lastName: true,
        },
      },
      playground: {
        select: {
          id: true,
          name: true,
          address: true,
          longitude: true,
          latitude: true,
        },
      },
    },
  });
};

export const updateRating = async (
  rating: Omit<RatingWrite, 'id'>,
  id: number
) => {
  const { score, comment, userId, playgroundId } = rating;
  return db.rating.update({
    where: {
      id,
    },
    data: {
      score,
      comment,
      userId,
      playgroundId,
    },
    select: {
      id: true,
      score: true,
      comment: true,
      user: {
        select: {
          id: true,
          username: true,
          firstName: true,
          lastName: true,
        },
      },
      playground: {
        select: {
          id: true,
          name: true,
          address: true,
          longitude: true,
          latitude: true,
        },
      },
    },
  });
};

export const deleteRating = async (id: number) => {
  await db.rating.delete({
    where: {
      id,
    },
  });
};
