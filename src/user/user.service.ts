import { db } from '../utils/db.server';
import { User } from '../utils/type';

export const listUsers = async () => {
  return db.user.findMany({
    select: {
      id: true,
      email: true,
      username: true,
      firstName: true,
      lastName: true,
      isAdmin: true,
      createdAt: true,
      updatedAt: true,
    },
  });
};

export const getUser = async (id: number) => {
  return db.user.findUnique({
    where: {
      id,
    },
    select: {
      id: true,
      email: true,
      username: true,
      password: true,
      firstName: true,
      lastName: true,
      isAdmin: true,
      ratings: {
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
          createdAt: true,
          updatedAt: true,
        },
      },
      playgrounds: {
        select: {
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
        },
      },
      createdAt: true,
      updatedAt: true,
    },
  });
};

export const createUser = async (user: Omit<User, 'id'>) => {
  const { username, email, password, firstName, lastName } = user;
  return db.user.create({
    data: {
      username,
      email,
      password,
      firstName,
      lastName,
    },
    select: {
      id: true,
      username: true,
      email: true,
      firstName: true,
      lastName: true,
    },
  });
};

export const updateUser = async (user: Omit<User, 'id'>, id: number) => {
  const { username, email, password, firstName, lastName, isAdmin } = user;
  return db.user.update({
    where: {
      id,
    },
    data: {
      username,
      email,
      password,
      firstName,
      lastName,
      isAdmin,
    },
    select: {
      id: true,
      username: true,
      password: true,
      email: true,
      firstName: true,
      lastName: true,
      isAdmin: true,
    },
  });
};

export const deleteUser = async (id: number) => {
  await db.user.delete({
    where: {
      id,
    },
  });
};
