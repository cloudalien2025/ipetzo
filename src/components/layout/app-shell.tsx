import Link from "next/link";

import type { AppUser } from "@/generated/prisma/client";

import { AppShellNav } from "@/components/layout/app-shell-nav";
import { CurrentPetSwitcher } from "@/components/layout/current-pet-switcher";
import { SparkIcon } from "@/components/layout/app-shell-primitives";
import { Button } from "@/components/ui/button";
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
  const canAddAnotherPet = petContext.petCount < MAX_PETS_PER_ACCOUNT;

  return (
    <div className="min-h-dvh bg-app-bg text-text-primary">
      <div className="mx-auto flex min-h-dvh w-full max-w-[38rem] flex-col px-2 pt-1.5 pb-0 sm:px-4 sm:pt-4">
        <div className="flex min-h-0 flex-1 flex-col rounded-t-[1.75rem] border border-b-0 border-border-soft bg-app-shell shadow-[var(--shadow-soft)] sm:rounded-t-[2rem]">
          <header className="px-3.5 pt-3 sm:px-5 sm:pt-4">
            <div className="flex items-center justify-between gap-3">
              <Link
                href="/app"
                className="inline-flex items-center gap-2 rounded-full px-1 py-1 text-sm font-semibold tracking-tight text-text-primary transition hover:text-nav-active focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:ring-offset-2 focus-visible:ring-offset-app-bg"
              >
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[linear-gradient(180deg,#fff7ee_0%,#ecd7b7_100%)] text-[#7d5b39] shadow-[inset_0_1px_0_rgba(255,255,255,0.6)]">
                  <SparkIcon className="h-4 w-4" />
                </span>
                <span>iPetzo</span>
              </Link>
              {canAddAnotherPet ? (
                <Button
                  asChild
                  variant="outline"
                  size="icon"
                  className="h-9 w-9 shrink-0 rounded-full border-border-soft bg-surface/82 text-text-secondary shadow-none hover:border-nav-active/35 hover:bg-surface/82 hover:text-nav-active focus-visible:ring-focus-ring focus-visible:ring-offset-app-bg"
                >
                  <Link href="/app/pets/new" aria-label="Add pet">
                    <span className="text-lg leading-none">+</span>
                  </Link>
                </Button>
              ) : (
                <span className="text-[0.68rem] font-medium tracking-[0.18em] text-text-muted uppercase">
                  {petContext.currentPet ? "Care Today" : "Welcome"}
                </span>
              )}
            </div>
            <div className="mt-2.5">
              <CurrentPetSwitcher petContext={petContext} />
            </div>
            {petContext.currentPet ? (
              <div className="mt-1.5 flex items-center justify-between px-0.5">
                <p className="truncate pr-3 text-[0.75rem] font-medium text-text-secondary">
                  {petContext.currentPet.name}&rsquo;s command center
                </p>
                <Button
                  asChild
                  variant="outline"
                  size="sm"
                  className="max-w-full rounded-full border-border-soft bg-surface/90 px-3 py-1.5 text-[0.72rem] font-semibold tracking-tight text-text-primary shadow-none hover:border-nav-active/40 hover:bg-surface/90 hover:text-nav-active focus-visible:ring-focus-ring focus-visible:ring-offset-app-bg"
                >
                  <Link href="/app/pet">Profile</Link>
                </Button>
              </div>
            ) : null}
            <span className="sr-only">
              Authenticated shell for {appUser?.displayName ?? greeting}
            </span>
          </header>

          <main className="flex-1 px-3.5 pt-2.5 pb-[calc(5.35rem+env(safe-area-inset-bottom))] sm:px-5 sm:pt-4 sm:pb-[calc(6rem+env(safe-area-inset-bottom))]">
            {children}
          </main>
          <AppShellNav />
        </div>
      </div>
    </div>
  );
}
