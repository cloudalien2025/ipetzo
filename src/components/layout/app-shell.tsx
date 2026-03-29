import Link from "next/link";

import type { AppUser } from "@/generated/prisma/client";

import { AppShellNav } from "@/components/layout/app-shell-nav";
import { PetSelector } from "@/components/layout/app-shell-primitives";

type AppShellProps = {
  appUser: AppUser | null;
  children: React.ReactNode;
};

function getGreeting(appUser: AppUser | null): string {
  if (appUser?.displayName) {
    return appUser.displayName.split(" ")[0] ?? appUser.displayName;
  }

  return "there";
}

export function AppShell({ appUser, children }: AppShellProps) {
  const greeting = getGreeting(appUser);

  return (
    <div className="min-h-screen bg-app-bg text-text-primary">
      <div className="mx-auto flex min-h-screen w-full max-w-[34rem] flex-col px-4 py-4 sm:px-5 sm:py-5 lg:py-6">
        <div className="flex min-h-[calc(100vh-2rem)] flex-1 flex-col rounded-[var(--radius-shell)] border border-border-subtle/90 bg-[linear-gradient(180deg,rgba(255,255,255,0.56),rgba(255,255,255,0.28))] p-3 sm:min-h-[calc(100vh-2.5rem)] sm:p-4">
          <header className="space-y-3">
            <div className="flex items-center justify-between px-1">
              <Link
                href="/app"
                className="text-sm font-semibold tracking-tight text-text-primary transition hover:text-nav-active focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:ring-offset-2 focus-visible:ring-offset-app-bg"
              >
                iPetzo
              </Link>
              <p className="text-xs text-text-secondary">Today shell</p>
            </div>
            <PetSelector />
            <span className="sr-only">
              Authenticated shell for {appUser?.displayName ?? greeting}
            </span>
          </header>

          <main className="flex-1 px-1 pt-4 pb-5 sm:pt-5">{children}</main>
          <AppShellNav />
        </div>
      </div>
    </div>
  );
}
