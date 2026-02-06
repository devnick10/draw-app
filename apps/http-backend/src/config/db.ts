import { prisma } from "@repo/db";
export async function connectDb() {
  try {
    await prisma.$connect();
    console.log("Database connected");
  } catch (error) {
    console.error("Database connection error!", error);
    process.exit(1);
  }
}
