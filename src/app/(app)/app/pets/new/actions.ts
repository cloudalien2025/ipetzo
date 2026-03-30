"use server";

import { redirect } from "next/navigation";

import { PetSpecies } from "@/generated/prisma/client";
import { createPetForCurrentUser, getAuthenticatedPetContext } from "@/server/services/pets";

export type CreatePetFormState = {
  error: string | null;
};

const initialState: CreatePetFormState = {
  error: null,
};

function getTrimmedString(formData: FormData, key: string): string {
  const value = formData.get(key);
  return typeof value === "string" ? value.trim() : "";
}

function getOptionalString(formData: FormData, key: string): string | null {
  const value = getTrimmedString(formData, key);
  return value ? value : null;
}

function getPetSpecies(formData: FormData): PetSpecies | null {
  const value = getTrimmedString(formData, "species");

  if (value === PetSpecies.DOG || value === PetSpecies.CAT || value === PetSpecies.OTHER) {
    return value;
  }

  return null;
}

function getBirthDate(formData: FormData): Date | null {
  const value = getTrimmedString(formData, "birthDate");

  if (!value) {
    return null;
  }

  const date = new Date(`${value}T00:00:00.000Z`);

  if (Number.isNaN(date.getTime())) {
    return null;
  }

  return date;
}

function getWeightValue(formData: FormData): number | null {
  const value = getTrimmedString(formData, "weight");

  if (!value) {
    return null;
  }

  const parsed = Number.parseFloat(value);

  if (!Number.isFinite(parsed) || parsed <= 0) {
    return Number.NaN;
  }

  return parsed;
}

export async function createPetAction(
  _previousState: CreatePetFormState = initialState,
  formData: FormData,
): Promise<CreatePetFormState> {
  const existingContext = await getAuthenticatedPetContext();

  if (existingContext.petCount > 0) {
    redirect("/app");
  }

  const name = getTrimmedString(formData, "name");

  if (!name) {
    return {
      error: "Add your pet's name to continue.",
    };
  }

  const species = getPetSpecies(formData);

  if (!species) {
    return {
      error: "Choose your pet's species.",
    };
  }

  const weightValue = getWeightValue(formData);

  if (Number.isNaN(weightValue)) {
    return {
      error: "Enter a valid weight or leave it blank for now.",
    };
  }

  try {
    await createPetForCurrentUser({
      name,
      species,
      sex: getOptionalString(formData, "sex"),
      breed: getOptionalString(formData, "breed"),
      birthDate: getBirthDate(formData),
      weightValue,
      weightUnit: weightValue ? getOptionalString(formData, "weightUnit") ?? "lb" : null,
    });
  } catch (error) {
    console.error("Failed to create pet.", error);

    return {
      error: "We couldn't save your pet right now. Please try again.",
    };
  }

  redirect("/app");
}
