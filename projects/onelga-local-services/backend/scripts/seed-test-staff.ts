import "dotenv/config";
import { PrismaClient, Role } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function seedStaff() {
  const passwordHash = await bcrypt.hash("Passw0rd!", 10);

  await prisma.user.upsert({
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

  console.log("Seeded staff account");
}

seedStaff()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
