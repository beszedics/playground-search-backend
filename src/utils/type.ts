export type User = {
  id: number;
  email: string;
  username: string;
  firstName: string;
  lastName: string;
  password: string;
};

export type Playground = {
  id: number;
  name: string;
  address: string;
  latitude: number;
  longitude: number;
};

export type CommentRead = {
  id: number;
  description: string;
  user: User;
  playground: Playground;
  rating: number;
};

export type CommentWrite = {
  id: number;
  description: string;
  userId: number;
  playgroundId: number;
  rating: number;
};
