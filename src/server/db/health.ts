import { getPrismaClient } from "@/server/db/prisma";

type DatabaseHealthResult =
  | {
      ok: true;
      database: "ok";
    }
  | {
      ok: false;
      database: "unreachable";
    };

export async function checkDatabaseHealth(): Promise<DatabaseHealthResult> {
  try {
    const prisma = getPrismaClient();
    const rows = await prisma.$queryRaw<Array<{ result: number }>>`SELECT 1 AS result`;

    if (rows[0]?.result === 1) {
      return {
        ok: true,
        database: "ok",
      };
    }
  } catch {
    return {
      ok: false,
      database: "unreachable",
    };
  }

  return {
    ok: false,
    database: "unreachable",
  };
}
