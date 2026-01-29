import { prisma } from "@repo/db/client"
export async function connectDb() {
    try {
        await prisma.$connect()
    } catch (error) {
        console.error("Database connection error!", error);
        process.exit(1)
    }
}