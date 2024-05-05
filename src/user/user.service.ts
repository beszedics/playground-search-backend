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
      role: true,
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
      firstName: true,
      lastName: true,
      isAdmin: true,
      role: true,
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
      isAdmin: true,
      role: true,
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

export const getUserFavoritePlaygrounds = async (
  id: number,
  playgroundId: number
) => {
  return db.user.findUnique({
    where: {
      id,
    },
    select: {
      id: true,
      email: true,
      username: true,
      playgrounds: {
        where: {
          playgroundId,
        },
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

export const updateUserFavoritePlayground = async (
  userId: number,
  playgroundId: number
) => {
  try {
    // Find the user by id
    const user = await db.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!user) {
      throw new Error('User not found');
    }

    // Check if the playground is already a favorite of the user
    const existingFavorite = await db.userPlayground.findFirst({
      where: {
        userId: userId,
        playgroundId: playgroundId,
      },
    });

    // If the playground is already a favorite, remove it
    if (existingFavorite) {
      await db.userPlayground.delete({
        where: {
          userId_playgroundId: {
            userId: userId,
            playgroundId: playgroundId,
          },
        },
      });
      return 'Playground removed from user favorites';
    }

    // Add the playground as a favorite for the user
    await db.userPlayground.create({
      data: {
        user: {
          connect: {
            id: userId,
          },
        },
        playground: {
          connect: {
            id: playgroundId,
          },
        },
      },
    });

    return 'User favorite playground updated successfully';
  } catch (error: any) {
    return error.message;
  }
};
