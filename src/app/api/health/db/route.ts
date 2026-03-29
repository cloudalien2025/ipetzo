import { checkDatabaseHealth } from "@/server/db/health";

export const dynamic = "force-dynamic";

export async function GET() {
  const result = await checkDatabaseHealth();

  return Response.json(result, {
    status: result.ok ? 200 : 503,
  });
}
