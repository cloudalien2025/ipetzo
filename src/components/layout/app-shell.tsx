import Link from "next/link";

import type { AppUser } from "@/generated/prisma/client";

import { AppShellNav } from "@/components/layout/app-shell-nav";

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
  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,#f8fbf8_0%,#eef6f0_35%,#f7f3ea_100%)] text-slate-900">
      <div className="mx-auto flex min-h-screen w-full max-w-6xl flex-col px-4 pb-28 pt-4 sm:px-6 sm:pb-32 sm:pt-6">
        <header className="rounded-[2rem] border border-white/70 bg-white/85 px-5 py-5 shadow-[0_20px_70px_rgba(15,23,42,0.08)] backdrop-blur sm:px-7">
          <div className="flex flex-col gap-5">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <Link
                  href="/app"
                  className="inline-flex items-center rounded-full border border-emerald-900/10 bg-emerald-50 px-3 py-1 text-[0.68rem] font-semibold tracking-[0.18em] text-emerald-900 uppercase"
                >
                  iPetzo app
                </Link>
                <h1 className="mt-4 text-2xl font-semibold tracking-tight sm:text-3xl">
                  Hi, {getGreeting(appUser)}.
                </h1>
                <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600 sm:text-base">
                  Keep each pet at the center. The shell is ready for records,
                  timeline, and care workflows to plug in next.
                </p>
              </div>

              <div className="rounded-[1.5rem] border border-slate-200 bg-slate-50/90 px-4 py-3 text-sm text-slate-600">
                <p className="font-semibold text-slate-900">
                  {appUser?.displayName ?? "Authenticated account"}
                </p>
                <p className="mt-1 break-all">{appUser?.email ?? "Signed in"}</p>
              </div>
            </div>

            <AppShellNav />
          </div>
        </header>

        <main className="flex-1 py-6 sm:py-8">{children}</main>
      </div>
    </div>
  );
}
