import Link from "next/link";

import { PetCreateForm } from "@/app/(app)/app/pets/new/pet-create-form";
import { getAuthenticatedPetContext, MAX_PETS_PER_ACCOUNT } from "@/server/services/pets";

export default async function NewPetPage() {
  const petContext = await getAuthenticatedPetContext();

  const isFirstPet = petContext.petCount === 0;
  const hasReachedPetLimit = petContext.petCount >= MAX_PETS_PER_ACCOUNT;

  if (hasReachedPetLimit) {
    return (
      <section className="mx-auto max-w-2xl space-y-5">
        <div className="space-y-3 rounded-[2rem] border border-emerald-950/10 bg-white/90 p-6 shadow-[0_18px_60px_rgba(15,23,42,0.06)] backdrop-blur sm:p-8">
          <p className="text-[0.72rem] font-semibold tracking-[0.18em] text-emerald-800 uppercase">
            Pet limit reached
          </p>
          <h1 className="text-3xl font-semibold tracking-tight text-slate-950">
            You&apos;ve reached the current limit of {MAX_PETS_PER_ACCOUNT} pets on this account.
          </h1>
          <p className="max-w-xl text-base leading-7 text-slate-600">
            Your current pet selection and switcher still work as usual. Head back to the app
            to keep managing your household.
          </p>
          <Link
            href="/app"
            className="inline-flex items-center justify-center rounded-full bg-emerald-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-emerald-800"
          >
            Back to app
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="mx-auto max-w-2xl space-y-5">
      <div className="space-y-3 rounded-[2rem] border border-emerald-950/10 bg-white/90 p-6 shadow-[0_18px_60px_rgba(15,23,42,0.06)] backdrop-blur sm:p-8">
        <p className="text-[0.72rem] font-semibold tracking-[0.18em] text-emerald-800 uppercase">
          {isFirstPet ? "First pet" : "Add a pet"}
        </p>
        <h1 className="text-3xl font-semibold tracking-tight text-slate-950">
          {isFirstPet ? "Add your first pet" : "Add another pet"}
        </h1>
        <p className="max-w-xl text-base leading-7 text-slate-600">
          {isFirstPet
            ? "Start with a few basics. You can fill in the rest later."
            : "Start with a few basics. We&apos;ll make this pet your current pet right away."}
        </p>
        <PetCreateForm />
      </div>

      <Link
        href="/app"
        className="inline-flex items-center justify-center rounded-full px-4 py-2 text-sm font-medium text-slate-600 transition hover:text-slate-900"
      >
        Back to app
      </Link>
    </section>
  );
}
