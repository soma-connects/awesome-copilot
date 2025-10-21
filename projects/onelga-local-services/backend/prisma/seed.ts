import "dotenv/config";
import { PrismaClient, Role, ApplicationStatus } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

const users = [
  {
    email: "admin@onelga.local",
    role: Role.ADMIN,
    firstName: "Admin",
    lastName: "User",
  },
  {
    email: "staff@onelga.local",
    role: Role.STAFF,
    firstName: "Staff",
    lastName: "Member",
  },
  {
    email: "citizen@onelga.local",
    role: Role.CITIZEN,
    firstName: "Citizen",
    lastName: "Resident",
  },
];

async function main() {
  const passwordHash = await bcrypt.hash("Passw0rd!", 10);
  for (const user of users) {
    await prisma.user.upsert({
      where: { email: user.email },
      update: {},
      create: {
        ...user,
        passwordHash,
      },
    });
  }

  const admin = await prisma.user.findUnique({ where: { email: "admin@onelga.local" } });
  const citizen = await prisma.user.findUnique({ where: { email: "citizen@onelga.local" } });
  if (!admin || !citizen) {
    throw new Error("Seed users not found");
  }

  await prisma.newsArticle.upsert({
    where: { slug: "welcome-to-onelga" },
    update: {},
    create: {
      title: "Welcome to Onelga Services",
      slug: "welcome-to-onelga",
      content: "Discover services, news, and updates for Onelga citizens.",
      published: true,
      publishedAt: new Date(),
      authorId: admin.id,
    },
  });

  await prisma.application.upsert({
    where: { id: "demo-application" },
    update: {},
    create: {
      id: "demo-application",
      type: "building-permit",
      status: ApplicationStatus.PENDING,
      data: { projectName: "Community Center" },
      userId: citizen.id,
    },
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
