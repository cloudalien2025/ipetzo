import { PrismaPg } from "@prisma/adapter-pg";

import { PrismaClient } from "@/generated/prisma/client";

const globalForPrisma = globalThis as typeof globalThis & {
  prisma?: PrismaClient;
};

const rawConnectionString = process.env.DATABASE_URL;
const disableSslVerification =
  process.env.DATABASE_SSL_REJECT_UNAUTHORIZED === "false";

if (!rawConnectionString) {
  throw new Error("DATABASE_URL is not set.");
}

const connectionUrl = new URL(rawConnectionString);

if (disableSslVerification) {
  connectionUrl.searchParams.delete("sslmode");
}

const adapter = new PrismaPg({
  connectionString: connectionUrl.toString(),
  ...(disableSslVerification ? { ssl: { rejectUnauthorized: false } } : {}),
});

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    adapter,
    log: process.env.NODE_ENV === "development" ? ["error", "warn"] : ["error"],
  });

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}
