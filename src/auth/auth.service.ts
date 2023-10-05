import { db } from '../utils/db.server';

export const getUserByEmail = (email: string) => {
  return db.user.findUnique({
    where: {
      email,
    },
  });
};

export const getUserByUsername = (username: string) => {
  return db.user.findUnique({
    where: {
      username,
    },
  });
};
