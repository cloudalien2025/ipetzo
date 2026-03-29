import { auth } from "@clerk/nextjs/server";

import { isClerkConfigured } from "@/lib/auth/clerk";
import { ensureCurrentAppUser } from "@/server/services/auth/app-user";

export default async function ProtectedAppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  if (isClerkConfigured()) {
    await auth.protect();
    await ensureCurrentAppUser();
  }

  return children;
}
