import { db } from '../utils/db.server';
import { CommentRead, CommentWrite } from '../utils/type';

export const listComments = async () => {
  return db.comment.findMany({
    select: {
      id: true,
      description: true,
      rating: true,
      user: {
        select: {
          id: true,
          email: true,
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
          latitude: true,
          longitude: true,
        },
      },
    },
  });
};

export const getComment = async (id: number) => {
  return db.comment.findUnique({
    where: {
      id,
    },
    select: {
      id: true,
      description: true,
      rating: true,
      user: {
        select: {
          id: true,
          email: true,
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
          latitude: true,
          longitude: true,
        },
      },
    },
  });
};

export const createComment = async (comment: CommentWrite) => {
  const { description, userId, playgroundId, rating } = comment;
  return db.comment.create({
    data: {
      description,
      userId,
      playgroundId,
      rating,
    },
    select: {
      id: true,
      description: true,
      rating: true,
      user: {
        select: {
          id: true,
          email: true,
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
          latitude: true,
          longitude: true,
        },
      },
    },
  });
};

export const updateComment = async (
  comment: Omit<CommentWrite, 'id'>,
  id: number
) => {
  const { description, userId, playgroundId, rating } = comment;
  return db.comment.update({
    where: {
      id,
    },
    data: {
      description,
      userId,
      playgroundId,
      rating,
    },
    select: {
      id: true,
      description: true,
      userId: true,
      playgroundId: true,
      rating: true,
    },
  });
};

export const deleteComment = async (id: number) => {
  await db.comment.delete({
    where: {
      id,
    },
  });
};
