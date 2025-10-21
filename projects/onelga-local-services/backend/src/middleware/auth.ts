import { Role } from "@prisma/client";
import { NextFunction, Request, Response } from "express";
import { verifyToken } from "../utils/token";
import { getUserById } from "../services/userService";

export interface AuthenticatedRequest extends Request {
  user?: {
    id: string;
    role: Role;
  };
}

export const authenticate = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  if (!authHeader?.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Authentication token missing" });
  }

  try {
    const token = authHeader.substring(7);
    const decoded = verifyToken(token);
    const user = await getUserById(decoded.sub);
    if (!user) {
      return res.status(401).json({ message: "Invalid authentication token" });
    }

    req.user = { id: user.id, role: user.role };
    return next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid authentication token" });
  }
};

export const authorize = (roles: Role[]) => {
  return (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return res.status(403).json({ message: "You do not have permission to perform this action" });
    }

    return next();
  };
};
