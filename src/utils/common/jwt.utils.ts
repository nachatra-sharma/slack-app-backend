import jwt from "jsonwebtoken";

import env from "../../config/serverConfig.js";

type JwtPayload = {
  username: string;
  email: string;
  id: string;
};

export const generateToken = (payload: JwtPayload) => {
  const token = jwt.sign(payload, env.JWT_SECRET, {
    expiresIn: env.JWT_EXPIRES_IN
  });
  return token;
};
