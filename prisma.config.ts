import "dotenv/config";

import { defineConfig } from "prisma/config";

const fallbackDatabaseUrl = "postgresql://placeholder:placeholder@127.0.0.1:5432/ipetzo";
const prismaCliDatabaseUrl =
  process.env.DIRECT_URL ?? process.env.DATABASE_URL ?? fallbackDatabaseUrl;

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
  },
  datasource: {
    // Prisma CLI commands that need a datasource use DIRECT_URL first and fall back
    // to DATABASE_URL. `prisma generate` remains CI-safe with the placeholder URL.
    url: prismaCliDatabaseUrl,
  },
});
