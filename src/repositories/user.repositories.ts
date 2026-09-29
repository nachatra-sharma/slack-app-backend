import User from "../schema/user.schema.js";
import type { UserType } from "../types/user.types.js";

export const getUserByUserName = async (username: string) => {
  const user = await User.findOne({ username });
  return user;
};

export const getUserByEmail = async (email: string) => {
  const user = await User.findOne({ email });
  return user;
};

export const getUserById = async (id: number) => {
  const user = await User.findById(id);
  return user;
};

export const getUsers = async () => {
  const users = await User.find();
  return users;
};

export const createUser = async (user: UserType) => {
  const response = await User.create(user);
  return response;
};

export const updateUser = async ({
  id,
  user
}: {
  id: number;
  user: UserType;
}) => {
  const response = await User.findByIdAndUpdate(id, user);
  return response;
};

export const deleteUser = async (id: number) => {
  const user = await User.findByIdAndDelete(id);
  return user;
};
