"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";

import { usePathname } from "next/navigation";

import type { SwitchCurrentPetFormState } from "@/app/(app)/current-pet-actions";
import { switchCurrentPetAction } from "@/app/(app)/current-pet-actions";
import {
  CheckIcon,
  PetSelector,
  PetSpeciesBadge,
} from "@/components/layout/app-shell-primitives";
import type { AuthenticatedPetContext } from "@/server/services/pets";

const initialState: SwitchCurrentPetFormState = {
  error: null,
};

function formatSpeciesLabel(species: string): string {
  if (species === "DOG") {
    return "Dog";
  }

  if (species === "CAT") {
    return "Cat";
  }

  return "Pet";
}

function SwitchPetButton({
  petId,
  isCurrent,
  name,
  speciesLabel,
  returnTo,
}: {
  petId: string;
  isCurrent: boolean;
  name: string;
  speciesLabel: string;
  returnTo: string;
}) {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending || isCurrent}
      className="flex w-full items-center justify-between gap-3 rounded-[1.2rem] border border-border-soft bg-surface px-4 py-3.5 text-left transition hover:border-nav-active/35 hover:bg-surface-soft disabled:cursor-default disabled:opacity-100"
    >
      <span className="min-w-0">
        <span className="block truncate text-sm font-semibold text-text-primary">{name}</span>
        <span className="mt-1 block text-xs font-medium text-text-secondary">{speciesLabel}</span>
      </span>
      <span className="flex shrink-0 items-center gap-2 text-xs font-semibold text-text-secondary">
        {isCurrent ? (
          <>
            <CheckIcon className="h-4 w-4 text-nav-active" />
            Current
          </>
        ) : pending ? (
          "Switching..."
        ) : (
          "Switch"
        )}
      </span>
      <input type="hidden" name="petId" value={petId} />
      <input type="hidden" name="returnTo" value={returnTo} />
    </button>
  );
}

export function CurrentPetSwitcher({ petContext }: { petContext: AuthenticatedPetContext }) {
  const pathname = usePathname() || "/app";
  const [state, formAction] = useActionState(switchCurrentPetAction, initialState);

  if (petContext.petCount === 0) {
    return <PetSelector pet={null} detail="Add your first pet to begin" />;
  }

  if (petContext.petCount === 1 || !petContext.currentPet) {
    return (
      <PetSelector
        pet={petContext.currentPet ?? petContext.pets[0] ?? null}
        detail="Current pet"
      />
    );
  }

  return (
    <details className="group relative">
      <summary className="list-none [&::-webkit-details-marker]:hidden">
        <PetSelector
          pet={petContext.currentPet}
          detail={`${petContext.petCount} pets in your account`}
          interactive
        />
      </summary>

      <div className="absolute inset-x-0 top-[calc(100%+0.75rem)] z-20 rounded-[1.7rem] border border-border-soft bg-[#fbf8f3] p-3 shadow-[0_22px_44px_rgba(42,52,68,0.16)]">
        <div className="flex items-center justify-between gap-3 px-2 pb-3">
          <div>
            <p className="text-sm font-semibold text-text-primary">Switch current pet</p>
            <p className="mt-1 text-xs text-text-secondary">
              Your selection is saved to your account.
            </p>
          </div>
          <PetSpeciesBadge species={petContext.currentPet.species} />
        </div>

        <div className="space-y-2">
          {petContext.pets.map((pet) => (
            <form key={pet.id} action={formAction}>
              <SwitchPetButton
                petId={pet.id}
                isCurrent={pet.id === petContext.currentPet?.id}
                name={pet.name}
                speciesLabel={formatSpeciesLabel(pet.species)}
                returnTo={pathname}
              />
            </form>
          ))}
        </div>

        {state.error ? (
          <p className="mt-3 rounded-2xl border border-rose-200 bg-rose-50 px-3 py-2 text-xs text-rose-700">
            {state.error}
          </p>
        ) : null}
      </div>
    </details>
  );
}
