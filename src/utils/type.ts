export type User = {
  id: number;
  email: string;
  username: string;
  firstName: string;
  lastName: string;
  isAdmin: boolean;
  password: string;
};

export type Playground = {
  id: number;
  name: string;
  address: string;
  latitude: number;
  longitude: number;
  openingHours?: string;
  equipments?: [];
  ratings?: [];
};

export type RatingWrite = {
  id: number;
  score: number;
  comment?: string;
  userId: number;
  playgroundId: number;
};
