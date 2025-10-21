import jwt from "jsonwebtoken";
import env from "../config/env";

interface TokenPayload {
  sub: string;
  role: string;
}

export const signToken = (payload: TokenPayload) => {
  return jwt.sign(payload, env.JWT_SECRET, { expiresIn: env.JWT_EXPIRES_IN });
};

export const verifyToken = (token: string) => {
  return jwt.verify(token, env.JWT_SECRET) as TokenPayload & { iat: number; exp: number };
};
