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
      isPublished: true,
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
    const totalReviews = ratings.length;

    return {
      ...playground,
      averageRating,
      totalReviews,
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
  const totalReviews = ratings.length;

  return {
    ...playground,
    averageRating,
    totalReviews,
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
      isPublished: false,
    },
    select: {
      id: true,
      name: true,
      address: true,
      latitude: true,
      longitude: true,
      openingHours: true,
      isPublished: true,
    },
  });
};

export const updatePlayground = async (
  playground: Omit<Playground, 'id'>,
  id: number
) => {
  const { name, address, latitude, longitude, isPublished } = playground;
  return db.playground.update({
    where: {
      id,
    },
    data: {
      name,
      address,
      latitude,
      longitude,
      isPublished,
    },
    select: {
      id: true,
      name: true,
      address: true,
      latitude: true,
      longitude: true,
      isPublished: true,
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

export const getPlaygroundEquipments = async (id: number) => {
  const playgroundEquipments = await db.playground.findUnique({
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
    },
  });

  if (!playgroundEquipments) {
    throw new Error('Playground not found');
  }

  return playgroundEquipments;
};

export const updatePlaygroundEquipments = async (
  id: number,
  equipmentIds: number[]
) => {
  try {
    // Find the playground by id
    const playground = await db.playground.findUnique({
      where: {
        id: id,
      },
    });

    if (!playground) {
      throw new Error('Playground not found');
    }

    // Get existing equipment relations
    const existingEquipmentRelations = await db.playgroundEquipment.findMany({
      where: {
        playgroundId: id,
      },
    });

    // Extract existing equipment ids
    const existingEquipmentIds = existingEquipmentRelations.map(
      (relation) => relation.equipmentId
    );

    // Calculate ids to be added and removed
    const idsToAdd = equipmentIds.filter(
      (equipmentId) => !existingEquipmentIds.includes(equipmentId)
    );
    const idsToRemove = existingEquipmentIds.filter(
      (existingId) => !equipmentIds.includes(existingId)
    );

    // Remove equipment relations to be removed
    await Promise.all(
      idsToRemove.map((equipmentId) =>
        db.playgroundEquipment.deleteMany({
          where: {
            playgroundId: id,
            equipmentId: equipmentId,
          },
        })
      )
    );

    // Add equipment relations to be added
    await Promise.all(
      idsToAdd.map((equipmentId) =>
        db.playgroundEquipment.create({
          data: {
            playground: {
              connect: {
                id: id,
              },
            },
            equipment: {
              connect: {
                id: equipmentId,
              },
            },
          },
        })
      )
    );

    return 'Playground equipments updated successfully';
  } catch (error: any) {
    return error.message;
  }
};
