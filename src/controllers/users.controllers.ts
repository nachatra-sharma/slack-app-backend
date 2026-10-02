import type { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

import {
  deleteUserService,
  getAllUsersService,
  getUserByEmailService,
  getUserByIdService,
  getUserByUsernameService,
  updateUserService,
  userSigninService,
  userSignupService
} from "../services/users.services.js";
import { successResponse } from "../utils/common/response.utils.js";

export const userSignUp = async (req: Request, res: Response) => {
  const user = await userSignupService(req.body);
  return res
    .status(StatusCodes.CREATED)
    .json(successResponse(user, "Successfully signed up user."));
};

export const userSignin = async (req: Request, res: Response) => {
  const response = await userSigninService(req.body);
  return res.status(StatusCodes.ACCEPTED).json(
    successResponse(
      {
        user: response.user,
        token: response.token
      },
      "Successfully signed in user."
    )
  );
};

/**
 * @param _req
 * @param res
 * @returns list of all users
 */

export const getAllUser = async (_req: Request, res: Response) => {
  const users = await getAllUsersService();
  return res
    .status(StatusCodes.OK)
    .json(successResponse(users, "Successfully fetched all users."));
};

/**
 *
 * @param req
 * @param res
 * @returns return user with the same username
 */

export const getUserByUsername = async (req: Request, res: Response) => {
  const { username } = req.params;
  const user = await getUserByUsernameService(username as string);
  return res
    .status(StatusCodes.OK)
    .json(successResponse(user, "Successfully fetched user by username."));
};

/**
 *
 * @param req
 * @param res
 * @returns return user with the same email
 */
export const getUserByEmail = async (req: Request, res: Response) => {
  const { email } = req.params;
  const user = await getUserByEmailService(email as string);
  return res
    .status(StatusCodes.OK)
    .json(successResponse(user, "Successfully fetched user by email."));
};

/**
 *
 * @param req
 * @param res
 * @returns return user with the same id
 */
export const getUserById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const user = await getUserByIdService(id as string);
  return res
    .status(StatusCodes.OK)
    .json(successResponse(user, "Successfully fetched user by id."));
};

/**
 * @param req
 * @param res
 * @returns delete user with the id
 */
export const deleteUserById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const user = await deleteUserService(id as string);
  return res
    .status(StatusCodes.OK)
    .json(successResponse(user, "Successfully deleted user by id."));
};

/**
 * @param req
 * @param res
 * @returns update user with the id and data
 */

export const updateUserById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const user = await updateUserService(id as string, req.body);
  return res
    .status(StatusCodes.OK)
    .json(successResponse(user, "Successfully updated user by id."));
};
