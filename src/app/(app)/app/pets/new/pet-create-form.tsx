"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";

import type { CreatePetFormState } from "@/app/(app)/app/pets/new/actions";
import { createPetAction } from "@/app/(app)/app/pets/new/actions";

const initialState: CreatePetFormState = {
  error: null,
};

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="inline-flex w-full items-center justify-center rounded-full bg-emerald-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-emerald-800 disabled:cursor-not-allowed disabled:opacity-70"
    >
      {pending ? "Saving pet..." : "Create pet"}
    </button>
  );
}

export function PetCreateForm() {
  const [state, formAction] = useActionState(createPetAction, initialState);

  return (
    <form action={formAction} className="space-y-4">
      <div className="space-y-2">
        <label htmlFor="name" className="text-sm font-medium text-slate-900">
          Pet name
        </label>
        <input
          id="name"
          name="name"
          type="text"
          required
          autoComplete="off"
          className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-base text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-emerald-700 focus:ring-2 focus:ring-emerald-200"
          placeholder="Buddy"
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <label htmlFor="species" className="text-sm font-medium text-slate-900">
            Species
          </label>
          <select
            id="species"
            name="species"
            required
            defaultValue=""
            className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-base text-slate-900 outline-none transition focus:border-emerald-700 focus:ring-2 focus:ring-emerald-200"
          >
            <option value="" disabled>
              Select species
            </option>
            <option value="DOG">Dog</option>
            <option value="CAT">Cat</option>
            <option value="OTHER">Other</option>
          </select>
        </div>

        <div className="space-y-2">
          <label htmlFor="sex" className="text-sm font-medium text-slate-900">
            Sex
          </label>
          <select
            id="sex"
            name="sex"
            defaultValue=""
            className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-base text-slate-900 outline-none transition focus:border-emerald-700 focus:ring-2 focus:ring-emerald-200"
          >
            <option value="">Prefer not to say</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Unknown">Unknown</option>
          </select>
        </div>
      </div>

      <div className="space-y-2">
        <label htmlFor="breed" className="text-sm font-medium text-slate-900">
          Breed
        </label>
        <input
          id="breed"
          name="breed"
          type="text"
          className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-base text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-emerald-700 focus:ring-2 focus:ring-emerald-200"
          placeholder="Golden Retriever"
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-[minmax(0,1fr)_8.5rem]">
        <div className="space-y-2">
          <label htmlFor="birthDate" className="text-sm font-medium text-slate-900">
            Birth date
          </label>
          <input
            id="birthDate"
            name="birthDate"
            type="date"
            className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-base text-slate-900 outline-none transition focus:border-emerald-700 focus:ring-2 focus:ring-emerald-200"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="weight" className="text-sm font-medium text-slate-900">
            Weight
          </label>
          <input
            id="weight"
            name="weight"
            type="number"
            min="0"
            step="0.01"
            inputMode="decimal"
            className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-base text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-emerald-700 focus:ring-2 focus:ring-emerald-200"
            placeholder="22"
          />
        </div>
      </div>

      <div className="space-y-2">
        <label htmlFor="weightUnit" className="text-sm font-medium text-slate-900">
          Weight unit
        </label>
        <select
          id="weightUnit"
          name="weightUnit"
          defaultValue="lb"
          className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-base text-slate-900 outline-none transition focus:border-emerald-700 focus:ring-2 focus:ring-emerald-200"
        >
          <option value="lb">lb</option>
          <option value="kg">kg</option>
        </select>
      </div>

      {state.error ? (
        <p className="rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
          {state.error}
        </p>
      ) : null}

      <SubmitButton />
    </form>
  );
}
