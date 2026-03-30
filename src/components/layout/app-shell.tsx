import Link from "next/link";

import type { AppUser } from "@/generated/prisma/client";

import { AppShellNav } from "@/components/layout/app-shell-nav";
import { CurrentPetSwitcher } from "@/components/layout/current-pet-switcher";
import { MAX_PETS_PER_ACCOUNT } from "@/server/services/pets";
import type { AuthenticatedPetContext } from "@/server/services/pets";

type AppShellProps = {
  appUser: AppUser | null;
  petContext: AuthenticatedPetContext;
  children: React.ReactNode;
};

function getGreeting(appUser: AppUser | null): string {
  if (appUser?.displayName) {
    return appUser.displayName.split(" ")[0] ?? appUser.displayName;
  }

  return "there";
}

export function AppShell({ appUser, petContext, children }: AppShellProps) {
  const greeting = getGreeting(appUser);
  const currentPet = petContext.currentPet;
  const canAddAnotherPet = petContext.petCount < MAX_PETS_PER_ACCOUNT;

  return (
    <div className="min-h-screen bg-app-bg text-text-primary">
      <div className="mx-auto flex min-h-screen w-full max-w-[32rem] flex-col px-3 pt-3 pb-0 sm:px-4 sm:pt-4">
        <div className="flex min-h-screen flex-1 flex-col rounded-t-[2.25rem] border border-b-0 border-border-soft bg-app-shell shadow-[var(--shadow-soft)]">
          <header className="px-4 pt-4 sm:px-5 sm:pt-5">
            <div className="flex items-center justify-between px-1">
              <Link
                href="/app"
                className="text-sm font-semibold tracking-tight text-text-primary transition hover:text-nav-active focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:ring-offset-2 focus-visible:ring-offset-app-bg"
              >
                iPetzo
              </Link>
              <p className="text-[0.72rem] font-medium tracking-[0.18em] text-text-muted uppercase">
                Care Today
              </p>
            </div>
            <div className="mt-4 flex justify-center">
              <div className="w-full max-w-[22rem]">
                <CurrentPetSwitcher petContext={petContext} />
              </div>
            </div>
            {currentPet ? (
              <div className="mt-3 flex flex-wrap items-center justify-center gap-2 px-1">
                <Link
                  href="/app/pet"
                  className="inline-flex items-center rounded-full border border-border-soft bg-surface/90 px-3.5 py-2 text-xs font-semibold tracking-tight text-text-primary transition hover:border-nav-active/40 hover:text-nav-active focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:ring-offset-2 focus-visible:ring-offset-app-bg"
                >
                  Open {currentPet.name}&rsquo;s profile
                </Link>
                {canAddAnotherPet ? (
                  <Link
                    href="/app/pets/new"
                    className="inline-flex items-center rounded-full border border-border-soft bg-surface/90 px-3.5 py-2 text-xs font-semibold tracking-tight text-text-primary transition hover:border-nav-active/40 hover:text-nav-active focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:ring-offset-2 focus-visible:ring-offset-app-bg"
                  >
                    Add pet
                  </Link>
                ) : null}
              </div>
            ) : null}
            <span className="sr-only">
              Authenticated shell for {appUser?.displayName ?? greeting}
            </span>
          </header>

          <main className="flex-1 px-4 pt-5 pb-4 sm:px-5 sm:pt-6">{children}</main>
          <AppShellNav />
        </div>
      </div>
    </div>
  );
}
