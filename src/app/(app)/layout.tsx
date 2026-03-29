import { auth } from "@clerk/nextjs/server";

import { AppShell } from "@/components/layout/app-shell";
import { isClerkConfigured } from "@/lib/auth/clerk";
import { getCurrentAuthenticatedAppUser } from "@/server/services/auth/app-user";

export const dynamic = "force-dynamic";

export default async function ProtectedAppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  let appUser = null;

  if (isClerkConfigured()) {
    await auth.protect();
    appUser = await getCurrentAuthenticatedAppUser();
  }

  return <AppShell appUser={appUser}>{children}</AppShell>;
}
