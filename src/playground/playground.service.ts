import { db } from '../utils/db.server';
import { Playground } from '../utils/type';

export const listPlaygrounds = async () => {
  return db.playground.findMany();
};

export const getPlayground = async (id: number) => {
  return db.playground.findUnique({
    where: {
      id,
    },
  });
};

export const createPlayground = async (playground: Playground) => {
  const { name, address, latitude, longitude } = playground;
  return db.playground.create({
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
