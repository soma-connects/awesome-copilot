import { Request, Response } from "express";
import { ApplicationStatus } from "@prisma/client";
import { listUsers } from "../services/userService";
import { getDashboardStats, listApplications, updateApplicationStatus } from "../services/applicationService";

export const getStats = async (_req: Request, res: Response) => {
  const stats = await getDashboardStats();
  return res.json(stats);
};

export const getUsers = async (_req: Request, res: Response) => {
  const users = await listUsers();
  return res.json(users);
};

export const getApplications = async (req: Request, res: Response) => {
  const status = req.query.status as ApplicationStatus | undefined;
  const applications = await listApplications(status ? { status } : undefined);
  return res.json(applications);
};

export const decideApplication = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { status } = req.body as { status: ApplicationStatus };
  if (!status) {
    return res.status(400).json({ message: "Status is required" });
  }

  const updated = await updateApplicationStatus(id, status);
  return res.json(updated);
};
