"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { PetSpecies } from "@/generated/prisma/client";
import {
  createPetForCurrentUser,
  MAX_PETS_PER_ACCOUNT,
} from "@/server/services/pets";

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

function getOptionalUrl(formData: FormData, key: string): string | null {
  const value = getOptionalString(formData, key);

  if (!value) {
    return null;
  }

  try {
    const url = new URL(value);

    if (url.protocol !== "http:" && url.protocol !== "https:") {
      return null;
    }

    return url.toString();
  } catch {
    return null;
  }
}

function hasInvalidOptionalUrl(formData: FormData, key: string): boolean {
  return Boolean(getTrimmedString(formData, key)) && getOptionalUrl(formData, key) === null;
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
  previousState: CreatePetFormState = initialState,
  formData: FormData,
): Promise<CreatePetFormState> {
  void previousState;

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

  if (hasInvalidOptionalUrl(formData, "photoUrl")) {
    return {
      error: "Enter a valid photo URL or leave it blank for now.",
    };
  }

  try {
    const result = await createPetForCurrentUser({
      name,
      species,
      sex: getOptionalString(formData, "sex"),
      breed: getOptionalString(formData, "breed"),
      birthDate: getBirthDate(formData),
      weightValue,
      weightUnit: weightValue ? getOptionalString(formData, "weightUnit") ?? "lb" : null,
      photoUrl: getOptionalUrl(formData, "photoUrl"),
    });

    if (result.status === "limit_reached") {
      return {
        error: `You've reached the current limit of ${MAX_PETS_PER_ACCOUNT} pets on this account.`,
      };
    }
  } catch (error) {
    console.error("Failed to create pet.", error);

    return {
      error: "We couldn't save your pet right now. Please try again.",
    };
  }

  revalidatePath("/app", "layout");
  revalidatePath("/app");
  redirect("/app");
}
