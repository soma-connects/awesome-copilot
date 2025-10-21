import env from "./config/env";
import app from "./app";
import prisma from "./utils/prisma";

const port = Number(env.PORT);

async function start() {
  try {
    await prisma.$connect();
    app.listen(port, () => {
      console.log(`Server listening on port ${port}`);
    });
  } catch (error) {
    console.error("Failed to start server", error);
    process.exit(1);
  }
}

void start();
