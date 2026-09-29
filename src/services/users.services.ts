import userCrudRepositories from "../repositories/user.repositories.js";
import type { UserType } from "../types/user.types.js";
import { NotFoundError } from "../utils/error/error.utils.js";

export const userSignupService = async (data: UserType) => {
  return await userCrudRepositories.create(data);
};

export const getAllUsersService = async () => {
  return await userCrudRepositories.getAll();
};

export const getUserByIdService = async (id: string) => {
  const user = await userCrudRepositories.getById(id);
  if (!user) {
    throw new NotFoundError("User not found with the given id.");
  }
  return user;
};

export const getUserByEmailService = async (email: string) => {
  const user = await userCrudRepositories.getUserByEmail(email);
  if (!user) {
    throw new NotFoundError("User not found with the given email.");
  }
  return user;
};

export const getUserByUsernameService = async (username: string) => {
  const user = await userCrudRepositories.getUserByUserName(username);
  if (!user) {
    throw new NotFoundError("User not found with the given username.");
  }
  return user;
};

export const updateUserService = async (id: string, data: UserType) => {
  const updatedUser = await userCrudRepositories.update(id, data);
  if (!updatedUser) {
    throw new NotFoundError("User not found with the given id.");
  }
  return updatedUser;
};

export const deleteUserService = async (id: string) => {
  const deletedUser = await userCrudRepositories.delete(id);
  if (!deletedUser) {
    throw new NotFoundError("User not found with the given id.");
  }
  return deletedUser;
};
