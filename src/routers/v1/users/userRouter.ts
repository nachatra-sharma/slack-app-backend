import express from "express";

import {
  deleteUserById,
  getAllUser,
  getUserByEmail,
  getUserById,
  getUserByUsername,
  updateUserById,
  userSignin,
  userSignUp
} from "../../../controllers/users.controllers.js";
import {
  userSigninRequestBodySchema,
  userSignupRequestBodySchema,
  userUpdateRequestBodySchema
} from "../../../validations/user/user.validations.js";
import { validateRequestBody } from "../../../validations/validate.js";

const userRouter = express.Router();

userRouter.get("/", getAllUser);

userRouter.get("/id/:id", getUserById);

userRouter.get("/username/:username", getUserByUsername);

userRouter.get("/email/:email", getUserByEmail);

userRouter.post(
  "/signup",
  validateRequestBody(userSignupRequestBodySchema),
  userSignUp
);

userRouter.post(
  "/signin",
  validateRequestBody(userSigninRequestBodySchema),
  userSignin
);

userRouter.patch(
  "/:id",
  validateRequestBody(userUpdateRequestBodySchema),
  updateUserById
);

userRouter.delete("/:id", deleteUserById);

export default userRouter;
