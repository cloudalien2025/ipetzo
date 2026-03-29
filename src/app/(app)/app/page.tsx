import Link from "next/link";

import { EmptyStateCard } from "@/components/shared/empty-state-card";
import { PageFrame } from "@/components/shared/page-frame";
import { getCurrentAuthenticatedAppUser } from "@/server/services/auth/app-user";

export const dynamic = "force-dynamic";

export default async function AppHomePage() {
  const appUser = await getCurrentAuthenticatedAppUser();

  return (
    <PageFrame
      eyebrow="Dashboard"
      title="Your pet care home base"
      description="You are signed in and inside the protected iPetzo app shell. Pets, records, and timeline flows can now plug into this frame without changing the auth boundary."
    >
      <section className="grid gap-4 lg:grid-cols-[1.3fr_0.9fr]">
        <EmptyStateCard
          label="Next step"
          title="Add your first pet when the pet lane lands"
          description="Each pet will become the center of gravity for records, routines, and care context. This shell keeps that next step obvious without jumping ahead into form work yet."
          action={{
            href: "/app/pets",
            label: "View pets shell",
          }}
          secondaryAction={{
            href: "/app/timeline",
            label: "View timeline shell",
          }}
        />

        <section className="rounded-[2rem] border border-white/70 bg-white/88 p-6 shadow-[0_18px_60px_rgba(15,23,42,0.06)] backdrop-blur sm:p-8">
          <p className="text-[0.72rem] font-semibold tracking-[0.18em] text-slate-500 uppercase">
            Account context
          </p>
          <dl className="mt-5 space-y-4 text-sm text-slate-600">
            <div>
              <dt className="font-semibold uppercase tracking-[0.14em] text-slate-500">
                App user id
              </dt>
              <dd className="mt-2 break-all text-base text-slate-950">
                {appUser?.id ?? "Not synced"}
              </dd>
            </div>
            <div>
              <dt className="font-semibold uppercase tracking-[0.14em] text-slate-500">
                Email
              </dt>
              <dd className="mt-2 break-all text-base text-slate-950">
                {appUser?.email ?? "Not available"}
              </dd>
            </div>
          </dl>
          <Link
            href="/app/settings"
            className="mt-6 inline-flex items-center text-sm font-semibold text-emerald-900 transition hover:text-emerald-700"
          >
            Open shell settings
          </Link>
        </section>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        <section className="rounded-[1.75rem] border border-white/70 bg-white/88 p-6 shadow-[0_16px_50px_rgba(15,23,42,0.05)]">
          <p className="text-sm font-semibold text-slate-900">Pets</p>
          <p className="mt-3 text-sm leading-6 text-slate-600">
            The pet area will become the source of record ownership and care
            context.
          </p>
        </section>
        <section className="rounded-[1.75rem] border border-white/70 bg-white/88 p-6 shadow-[0_16px_50px_rgba(15,23,42,0.05)]">
          <p className="text-sm font-semibold text-slate-900">Timeline</p>
          <p className="mt-3 text-sm leading-6 text-slate-600">
            Logs and events will flow into a readable timeline once that lane is
            built.
          </p>
        </section>
        <section className="rounded-[1.75rem] border border-white/70 bg-white/88 p-6 shadow-[0_16px_50px_rgba(15,23,42,0.05)]">
          <p className="text-sm font-semibold text-slate-900">Settings</p>
          <p className="mt-3 text-sm leading-6 text-slate-600">
            Account and shell preferences can grow here later without changing
            the app frame.
          </p>
        </section>
      </section>
    </PageFrame>
  );
}
