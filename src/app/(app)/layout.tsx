import { auth } from "@clerk/nextjs/server";

import { AppShell } from "@/components/layout/app-shell";
import { isClerkConfigured } from "@/lib/auth/clerk";
import { getCurrentAuthenticatedAppUser } from "@/server/services/auth/app-user";
import type { AuthenticatedPetContext } from "@/server/services/pets";
import { getAuthenticatedPetContext } from "@/server/services/pets";

export const dynamic = "force-dynamic";

export default async function ProtectedAppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  let appUser = null;
  let petContext: AuthenticatedPetContext = {
    petCount: 0,
    currentPet: null,
    pets: [],
  };

  if (isClerkConfigured()) {
    await auth.protect();
    appUser = await getCurrentAuthenticatedAppUser();
    petContext = await getAuthenticatedPetContext();
  }

  return (
    <AppShell appUser={appUser} petContext={petContext}>
      {children}
    </AppShell>
  );
}
