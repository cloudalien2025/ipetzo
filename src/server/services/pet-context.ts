import type { PetSummary } from "@/server/services/pets";

export function comparePetsByFallbackOrder(left: PetSummary, right: PetSummary): number {
  const createdAtDifference = left.createdAt.getTime() - right.createdAt.getTime();

  if (createdAtDifference !== 0) {
    return createdAtDifference;
  }

  return left.id.localeCompare(right.id);
}

export function resolveCurrentPetFromSummaries(
  pets: PetSummary[],
  currentPetId: string | null,
): PetSummary | null {
  if (pets.length === 0) {
    return null;
  }

  const persistedPet = currentPetId ? pets.find((pet) => pet.id === currentPetId) ?? null : null;

  if (persistedPet) {
    return persistedPet;
  }

  return [...pets].sort(comparePetsByFallbackOrder)[0] ?? null;
}
