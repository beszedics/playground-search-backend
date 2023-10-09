import { db } from '../utils/db.server';

export const listEquipments = async () => {
  return db.equipment.findMany({
    select: {
      id: true,
      name: true,
      description: true,
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

export const getEquipment = async (id: number) => {
  return db.equipment.findUnique({
    where: {
      id,
    },
    select: {
      id: true,
      name: true,
      description: true,
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
