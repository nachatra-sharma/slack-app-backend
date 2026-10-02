import type { NextFunction, Request, Response } from "express";
import type { JwtPayload } from "jsonwebtoken";
import jwt from "jsonwebtoken";

import env from "../config/serverConfig.js";
import userCrudRepositories from "../repositories/user.repositories.js";
import {
  ForbiddenError,
  InternalServerError,
  UnauthorizedError
} from "../utils/error/error.utils.js";

interface AccessTokenPayload extends JwtPayload {
  id: string;
  email: string;
  username: string;
}

export const AuthMiddleware = async (
  req: Request,
  _res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.headers["authorization"];
    if (!authHeader) {
      throw new UnauthorizedError("Auth Header is not provided");
    }
    const token = authHeader.split(" ")[1];
    if (!token) {
      throw new ForbiddenError("Auth Token is not provided");
    }
    const verify = jwt.verify(token, env.JWT_SECRET) as AccessTokenPayload;

    if (!verify) {
      throw new ForbiddenError("Provided token is not valid");
    }

    const userInfo = await userCrudRepositories.getById(verify.id);
    if (!userInfo) {
      throw new UnauthorizedError("User not found");
    }
    req.user = userInfo;
    next();
  } catch (error) {
    console.log("Error in auth middlware", error);
    throw new InternalServerError(
      "Something went wrong please try again later."
    );
  }
};
