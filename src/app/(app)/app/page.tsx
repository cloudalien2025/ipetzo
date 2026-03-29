import { getCurrentAuthenticatedAppUser } from "@/server/services/auth/app-user";

export const dynamic = "force-dynamic";

export default async function AppHomePage() {
  const appUser = await getCurrentAuthenticatedAppUser();

  return (
    <main className="flex min-h-screen items-center bg-[radial-gradient(circle_at_top,#f1f5f9_0%,#ecfdf5_40%,#ffffff_100%)] px-6 py-16 text-slate-900">
      <section className="mx-auto w-full max-w-3xl rounded-[2rem] border border-emerald-950/10 bg-white/95 p-10 shadow-[0_24px_100px_rgba(15,23,42,0.08)]">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-emerald-800">
          Protected app area
        </p>
        <h1 className="mt-4 text-4xl font-semibold tracking-tight">
          Authentication is wired.
        </h1>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          This route is protected by Clerk and resolves the signed-in user into
          the neutral <code>app_users</code> backbone.
        </p>
        <dl className="mt-8 grid gap-4 rounded-3xl border border-slate-200 bg-slate-50/80 p-6 text-sm text-slate-700 sm:grid-cols-2">
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
      </section>
    </main>
  );
}
