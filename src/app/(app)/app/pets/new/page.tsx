import Link from "next/link";
import { redirect } from "next/navigation";

import { PetCreateForm } from "@/app/(app)/app/pets/new/pet-create-form";
import { getAuthenticatedPetContext } from "@/server/services/pets";

export default async function NewPetPage() {
  const petContext = await getAuthenticatedPetContext();

  if (petContext.petCount > 0) {
    redirect("/app");
  }

  return (
    <section className="mx-auto max-w-2xl space-y-5">
      <div className="space-y-3 rounded-[2rem] border border-emerald-950/10 bg-white/90 p-6 shadow-[0_18px_60px_rgba(15,23,42,0.06)] backdrop-blur sm:p-8">
        <p className="text-[0.72rem] font-semibold tracking-[0.18em] text-emerald-800 uppercase">
          First pet
        </p>
        <h1 className="text-3xl font-semibold tracking-tight text-slate-950">
          Add your first pet
        </h1>
        <p className="max-w-xl text-base leading-7 text-slate-600">
          Start with a few basics. You can fill in the rest later.
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
