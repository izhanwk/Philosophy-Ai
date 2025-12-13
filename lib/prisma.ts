import { PrismaClient } from "@/app/generated/prisma/client";

const globalPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const Prisma =
  globalPrisma.prisma ??
  new PrismaClient({
    log: ["query"],
  });

if (process.env.NODE_ENV !== "production") {
  globalPrisma.prisma = Prisma;
}
