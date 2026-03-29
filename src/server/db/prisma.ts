import { PrismaPg } from "@prisma/adapter-pg";

import { PrismaClient } from "@/generated/prisma/client";

const globalForPrisma = globalThis as typeof globalThis & {
  prisma?: PrismaClient;
};

export function hasRuntimeDatabaseUrl(): boolean {
  return typeof process.env.DATABASE_URL === "string" && process.env.DATABASE_URL.length > 0;
}

function getRuntimeDatabaseConfig(): {
  connectionString: string;
  ssl: {
    rejectUnauthorized: boolean;
  };
} {
  const rawConnectionString = process.env.DATABASE_URL;
  const disableSslVerification =
    process.env.DATABASE_SSL_REJECT_UNAUTHORIZED === "false";

  if (!rawConnectionString) {
    throw new Error("DATABASE_URL is not set.");
  }

  const connectionUrl = new URL(rawConnectionString);

  if (!connectionUrl.searchParams.has("sslmode")) {
    connectionUrl.searchParams.set("sslmode", "require");
  }

  if (disableSslVerification) {
    // pg-connection-string currently treats `sslmode=require` like verify-full
    // unless libpq-compatible parsing is enabled explicitly.
    connectionUrl.searchParams.set("uselibpqcompat", "true");
  }

  return {
    connectionString: connectionUrl.toString(),
    // Temporary local exception: keep TLS enabled, but allow certificate
    // verification to be relaxed only in this app runtime if the host CA store
    // cannot validate the managed Postgres chain yet.
    ssl: {
      rejectUnauthorized: !disableSslVerification,
    },
  };
}

export function getPrismaClient(): PrismaClient {
  if (globalForPrisma.prisma) {
    return globalForPrisma.prisma;
  }

  const runtimeDatabaseConfig = getRuntimeDatabaseConfig();

  const adapter = new PrismaPg({
    connectionString: runtimeDatabaseConfig.connectionString,
    ssl: runtimeDatabaseConfig.ssl,
  });

  const prisma = new PrismaClient({
    adapter,
    log: process.env.NODE_ENV === "development" ? ["error", "warn"] : ["error"],
  });

  if (process.env.NODE_ENV !== "production") {
    globalForPrisma.prisma = prisma;
  }

  return prisma;
}
