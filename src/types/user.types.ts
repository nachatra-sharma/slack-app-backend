export type UserType = {
  email: string;
  password: string;
  username: string;
  avatar?: string;
  createdAt: Date;
  updatedAt: Date;
};

export type UserSigninType = {
  email: string;
  password: string;
};
