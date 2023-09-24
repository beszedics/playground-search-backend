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
    },
  });
};

export const getUser = async (id: number) => {
  return db.user.findUnique({
    where: {
      id,
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
  const { username, email, password, firstName, lastName } = user;
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

export const deleteUser = async (id: number) => {
  await db.user.delete({
    where: {
      id,
    },
  });
};
