import { auth } from "@clerk/nextjs/server";

import { AppShell } from "@/components/layout/app-shell";
import { isClerkConfigured } from "@/lib/auth/clerk";
import { getCurrentAuthenticatedAppUser } from "@/server/services/auth/app-user";
import { getAuthenticatedPetContext } from "@/server/services/pets";

export const dynamic = "force-dynamic";

export default async function ProtectedAppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  let appUser = null;
  let currentPet = null;

  if (isClerkConfigured()) {
    await auth.protect();
    appUser = await getCurrentAuthenticatedAppUser();
    currentPet = (await getAuthenticatedPetContext()).currentPet;
  }

  return (
    <AppShell appUser={appUser} currentPet={currentPet}>
      {children}
    </AppShell>
  );
}
