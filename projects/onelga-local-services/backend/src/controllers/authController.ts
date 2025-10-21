import { Request, Response } from "express";
import { Role } from "@prisma/client";
import {
  findUserByEmail,
  createUser,
  verifyPassword,
  recordFailedAttempt,
  resetFailedAttempts,
  getUserById,
} from "../services/userService";
import { signToken } from "../utils/token";

const normalizeEmail = (email: string) => email.trim().toLowerCase();

const sanitizeUser = (user: { id: string; email: string; role: Role; firstName: string; lastName: string }) => ({
  id: user.id,
  email: user.email,
  role: user.role,
  firstName: user.firstName,
  lastName: user.lastName,
});

export const register = async (req: Request, res: Response) => {
  const { email, password, firstName, lastName } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  if (!firstName || !lastName) {
    return res.status(400).json({ message: "First and last name are required" });
  }

  const existing = await findUserByEmail(normalizeEmail(email));
  if (existing) {
    return res.status(409).json({ message: "Email already in use" });
  }

  const user = await createUser({ email, password, firstName, lastName });
  const token = signToken({ sub: user.id, role: user.role });
  return res.status(201).json({
    user: sanitizeUser(user),
    token,
  });
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  const user = await findUserByEmail(normalizeEmail(email));
  if (!user) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  if (user.lockoutUntil && user.lockoutUntil > new Date()) {
    return res.status(423).json({ message: "Account locked. Try again later." });
  }

  const passwordMatches = await verifyPassword(password, user.passwordHash);
  if (!passwordMatches) {
    await recordFailedAttempt(user.id);
    return res.status(401).json({ message: "Invalid credentials" });
  }

  if (user.failedLoginAttempts > 0 || user.lockoutUntil) {
    await resetFailedAttempts(user.id);
  }

  const token = signToken({ sub: user.id, role: user.role });
  return res.json({
    token,
    user: sanitizeUser(user),
  });
};

export const validateToken = async (req: Request, res: Response) => {
  const { user } = req as Request & { user?: { id: string; role: Role } };
  if (!user) {
    return res.status(401).json({ message: "Invalid token" });
  }

  const freshUser = await getUserById(user.id);
  if (!freshUser) {
    return res.status(401).json({ message: "Invalid token" });
  }

  return res.json({ user: sanitizeUser(freshUser) });
};
