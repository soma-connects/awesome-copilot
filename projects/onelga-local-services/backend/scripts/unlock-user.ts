import "dotenv/config";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function unlock(email: string) {
  const user = await prisma.user.update({
    where: { email: email.toLowerCase() },
    data: { failedLoginAttempts: 0, lockoutUntil: null },
  });

  console.log(`Unlocked user ${user.email}`);
}

const email = process.argv[2];

if (!email) {
  console.error("Usage: ts-node scripts/unlock-user.ts <email>");
  process.exit(1);
}

unlock(email)
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
