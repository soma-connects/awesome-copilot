import { Role } from "@prisma/client";
import bcrypt from "bcryptjs";
import prisma from "../utils/prisma";

const MAX_FAILED_ATTEMPTS = 5;
const LOCKOUT_DURATION_MINUTES = 15;

export const findUserByEmail = (email: string) => {
  return prisma.user.findUnique({ where: { email: email.toLowerCase() } });
};

export const getUserById = (id: string) => {
  return prisma.user.findUnique({ where: { id } });
};

export const createUser = async (params: {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  role?: Role;
}) => {
  const hash = await bcrypt.hash(params.password, 10);
  return prisma.user.create({
    data: {
      email: params.email.toLowerCase(),
      passwordHash: hash,
      firstName: params.firstName,
      lastName: params.lastName,
      role: params.role ?? Role.CITIZEN,
    },
  });
};

export const verifyPassword = (password: string, hash: string) => bcrypt.compare(password, hash);

export const recordFailedAttempt = async (userId: string) => {
  const user = await prisma.user.findUnique({ where: { id: userId } });
  if (!user) {
    return null;
  }

  const failedAttempts = user.failedLoginAttempts + 1;
  const updateData: { failedLoginAttempts: number; lockoutUntil?: Date } = {
    failedLoginAttempts: failedAttempts,
  };

  if (failedAttempts >= MAX_FAILED_ATTEMPTS) {
    updateData.lockoutUntil = new Date(Date.now() + LOCKOUT_DURATION_MINUTES * 60 * 1000);
  }

  return prisma.user.update({
    where: { id: userId },
    data: updateData,
  });
};

export const resetFailedAttempts = (userId: string) => {
  return prisma.user.update({
    where: { id: userId },
    data: { failedLoginAttempts: 0, lockoutUntil: null },
  });
};

export const listUsers = () => {
  return prisma.user.findMany({
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      email: true,
      firstName: true,
      lastName: true,
      role: true,
      createdAt: true,
    },
  });
};
