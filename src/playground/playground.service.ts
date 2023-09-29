import { db } from '../utils/db.server';
import { Playground } from '../utils/type';

export const listPlaygrounds = async () => {
  const playgrounds = db.playground.findMany({
    select: {
      id: true,
      name: true,
      address: true,
      latitude: true,
      longitude: true,
      openingHours: true,
      equipments: {
        select: {
          equipment: {
            select: {
              id: true,
              name: true,
              description: true,
              createdAt: true,
              updatedAt: true,
            },
          },
        },
      },
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
      },
      createdAt: true,
      updatedAt: true,
    },
  });

  const playgroundsWithAverageRating = (await playgrounds).map((playground) => {
    const ratings = playground.ratings;
    if (ratings.length === 0) {
      return {
        ...playground,
        averageRating: 0,
      };
    }

    const totalRating = ratings.reduce((acc, rating) => acc + rating.score, 0);
    const averageRating = Number((totalRating / ratings.length).toFixed(2));
    return {
      ...playground,
      averageRating,
    };
  });

  return playgroundsWithAverageRating;
};

export const getPlayground = async (id: number) => {
  const playground = await db.playground.findUnique({
    where: {
      id,
    },
    include: {
      equipments: {
        select: {
          equipment: {
            select: {
              id: true,
              name: true,
              description: true,
            },
          },
        },
      },
      ratings: {
        select: {
          id: true,
          score: true,
          comment: true,
          createdAt: true,
          updatedAt: true,
          user: {
            select: {
              id: true,
              username: true,
              firstName: true,
              lastName: true,
            },
          },
        },
      },
    },
  });

  if (!playground) {
    return null;
  }

  const ratings = playground.ratings;
  if (ratings.length === 0) {
    return {
      ...playground,
      averageRating: 0,
    };
  }

  const totalRating = ratings.reduce((acc, rating) => acc + rating.score, 0);
  const averageRating = Number((totalRating / ratings.length).toFixed(2));

  return {
    ...playground,
    averageRating,
  };
};

export const createPlayground = async (playground: Playground) => {
  const { name, address, latitude, longitude, openingHours } = playground;
  return db.playground.create({
    data: {
      name,
      address,
      latitude,
      longitude,
      openingHours,
    },
    select: {
      id: true,
      name: true,
      address: true,
      latitude: true,
      longitude: true,
      openingHours: true,
    },
  });
};

export const updatePlayground = async (
  playground: Omit<Playground, 'id'>,
  id: number
) => {
  const { name, address, latitude, longitude } = playground;
  return db.playground.update({
    where: {
      id,
    },
    data: {
      name,
      address,
      latitude,
      longitude,
    },
    select: {
      id: true,
      name: true,
      address: true,
      latitude: true,
      longitude: true,
    },
  });
};

export const deletePlayground = async (id: number) => {
  await db.playground.delete({
    where: {
      id,
    },
  });
};
