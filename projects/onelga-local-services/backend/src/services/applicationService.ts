import { ApplicationStatus, Prisma } from "@prisma/client";
import prisma from "../utils/prisma";

export const listApplications = async (filters?: { status?: ApplicationStatus }) => {
  return prisma.application.findMany({
    where: filters,
    include: {
      user: {
        select: { id: true, email: true, firstName: true, lastName: true, role: true },
      },
      documents: true,
      assignments: true,
    },
    orderBy: { createdAt: "desc" },
  });
};

export const updateApplicationStatus = (id: string, status: ApplicationStatus) => {
  return prisma.application.update({
    where: { id },
    data: { status },
  });
};

export const createApplication = (data: Prisma.ApplicationCreateInput) => {
  return prisma.application.create({ data });
};

export const getDashboardStats = async () => {
  const [totalUsers, totalApplications, pendingApplications, publishedArticles] = await Promise.all([
    prisma.user.count(),
    prisma.application.count(),
    prisma.application.count({ where: { status: ApplicationStatus.PENDING } }),
    prisma.newsArticle.count({ where: { published: true } }),
  ]);

  return {
    totalUsers,
    totalApplications,
    pendingApplications,
    publishedArticles,
  };
};
