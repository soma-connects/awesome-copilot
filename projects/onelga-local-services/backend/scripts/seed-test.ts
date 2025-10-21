import "dotenv/config";
import { PrismaClient, Role, ApplicationStatus } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function seed() {
  const passwordHash = await bcrypt.hash("Passw0rd!", 10);

  const admin = await prisma.user.upsert({
    where: { email: "admin@onelga.local" },
    update: {},
    create: {
      email: "admin@onelga.local",
      firstName: "Admin",
      lastName: "User",
      role: Role.ADMIN,
      passwordHash,
    },
  });

  const staff = await prisma.user.upsert({
    where: { email: "staff@onelga.local" },
    update: {},
    create: {
      email: "staff@onelga.local",
      firstName: "Staff",
      lastName: "Member",
      role: Role.STAFF,
      passwordHash,
    },
  });

  const citizen = await prisma.user.upsert({
    where: { email: "citizen@onelga.local" },
    update: {},
    create: {
      email: "citizen@onelga.local",
      firstName: "Citizen",
      lastName: "Resident",
      role: Role.CITIZEN,
      passwordHash,
    },
  });

  await prisma.newsArticle.createMany({
    data: [
      {
        title: "City Approves Park Renovation",
        slug: "park-renovation",
        content: "The city council approved the renovation budget for Central Park.",
        published: true,
        publishedAt: new Date(),
        authorId: admin.id,
      },
      {
        title: "Seasonal Road Maintenance Schedule",
        slug: "road-maintenance",
        content: "Road maintenance is scheduled for the coming weeks across the city.",
        published: true,
        publishedAt: new Date(),
        authorId: staff.id,
      },
    ],
    skipDuplicates: true,
  });

  await prisma.application.createMany({
    data: [
      {
        userId: citizen.id,
        type: "business-license",
        status: ApplicationStatus.UNDER_REVIEW,
        data: { businessName: "Citizen Bakery" },
      },
      {
        userId: citizen.id,
        type: "waste-management",
        status: ApplicationStatus.PENDING,
        data: { requestedBins: 2 },
      },
    ],
    skipDuplicates: true,
  });

  console.log("Seeded test data");
}

seed()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
