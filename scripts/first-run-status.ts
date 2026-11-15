import "dotenv/config";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
try {
  const users = await prisma.users.count();
  console.log(users === 0 ? "SETUP_REQUIRED" : `SETUP_COMPLETE (${users} user${users === 1 ? "" : "s"})`);
} finally {
  await prisma.$disconnect();
}
