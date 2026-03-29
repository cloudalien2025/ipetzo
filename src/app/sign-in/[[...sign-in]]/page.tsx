import { SignIn } from "@clerk/nextjs";

import { isClerkConfigured } from "@/lib/auth/clerk";

export const dynamic = "force-dynamic";

export default function SignInPage() {
  if (!isClerkConfigured()) {
    return (
      <main className="flex min-h-screen items-center justify-center px-6 py-16">
        <div className="w-full max-w-lg rounded-3xl border border-amber-200 bg-amber-50 p-8 text-slate-900">
          <h1 className="text-2xl font-semibold">Clerk is not configured.</h1>
          <p className="mt-3 text-base leading-7 text-slate-700">
            Add the Clerk publishable and secret keys to your local environment
            before using the auth routes.
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-[radial-gradient(circle_at_top,#eff6ff_0%,#ecfdf5_45%,#ffffff_100%)] px-6 py-16">
      <SignIn fallbackRedirectUrl="/app" signUpUrl="/sign-up" />
    </main>
  );
}
