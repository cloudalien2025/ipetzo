import "server-only";

import type { Pet, PetSpecies } from "@/generated/prisma/client";
import { getPrismaClient, hasRuntimeDatabaseUrl } from "@/server/db/prisma";
import { getCurrentAuthenticatedAppUser } from "@/server/services/auth/app-user";
import { resolveCurrentPetFromSummaries } from "@/server/services/pet-context";

export type PetSummary = Pick<
  Pet,
  | "id"
  | "name"
  | "species"
  | "sex"
  | "breed"
  | "birthDate"
  | "weightValue"
  | "weightUnit"
  | "createdAt"
>;

export type AuthenticatedPetContext = {
  petCount: number;
  currentPet: PetSummary | null;
  pets: PetSummary[];
};

export type CreatePetInput = {
  name: string;
  species: PetSpecies;
  sex: string | null;
  breed: string | null;
  birthDate: Date | null;
  weightValue: number | null;
  weightUnit: string | null;
};

export async function getAuthenticatedPetContext(): Promise<AuthenticatedPetContext> {
  if (!hasRuntimeDatabaseUrl()) {
    return {
      petCount: 0,
      currentPet: null,
      pets: [],
    };
  }

  const appUser = await getCurrentAuthenticatedAppUser();

  if (!appUser) {
    return {
      petCount: 0,
      currentPet: null,
      pets: [],
    };
  }

  const prisma = getPrismaClient();
  const pets = await prisma.pet.findMany({
    where: {
      userId: appUser.id,
    },
    orderBy: [{ createdAt: "asc" }, { id: "asc" }],
    select: {
      id: true,
      name: true,
      species: true,
      sex: true,
      breed: true,
      birthDate: true,
      weightValue: true,
      weightUnit: true,
      createdAt: true,
    },
  });
  const currentPet = resolveCurrentPetFromSummaries(pets, appUser.currentPetId);

  return {
    petCount: pets.length,
    currentPet,
    pets,
  };
}

export async function createPetForCurrentUser(input: CreatePetInput): Promise<PetSummary> {
  if (!hasRuntimeDatabaseUrl()) {
    throw new Error("Pet records are not available because DATABASE_URL is not configured.");
  }

  const appUser = await getCurrentAuthenticatedAppUser();

  if (!appUser) {
    throw new Error("You need to be signed in before you can create a pet.");
  }

  const prisma = getPrismaClient();

  return prisma.$transaction(async (tx) => {
    const pet = await tx.pet.create({
      data: {
        userId: appUser.id,
        name: input.name,
        species: input.species,
        sex: input.sex,
        breed: input.breed,
        birthDate: input.birthDate,
        weightValue: input.weightValue,
        weightUnit: input.weightUnit,
      },
      select: {
        id: true,
        name: true,
        species: true,
        sex: true,
        breed: true,
        birthDate: true,
        weightValue: true,
        weightUnit: true,
        createdAt: true,
      },
    });

    if (!appUser.currentPetId) {
      await tx.appUser.update({
        where: {
          id: appUser.id,
        },
        data: {
          currentPetId: pet.id,
        },
      });
    }

    return pet;
  });
}

export async function setCurrentPetForCurrentUser(petId: string): Promise<PetSummary> {
  if (!hasRuntimeDatabaseUrl()) {
    throw new Error("Pet records are not available because DATABASE_URL is not configured.");
  }

  const appUser = await getCurrentAuthenticatedAppUser();

  if (!appUser) {
    throw new Error("You need to be signed in before you can select a pet.");
  }

  const prisma = getPrismaClient();
  const requestedPet = await prisma.pet.findFirst({
    where: {
      id: petId,
      userId: appUser.id,
    },
    select: {
      id: true,
      name: true,
      species: true,
      sex: true,
      breed: true,
      birthDate: true,
      weightValue: true,
      weightUnit: true,
      createdAt: true,
    },
  });

  if (!requestedPet) {
    throw new Error("The selected pet was not found for the signed-in user.");
  }

  await prisma.appUser.update({
    where: {
      id: appUser.id,
    },
    data: {
      currentPetId: requestedPet.id,
    },
  });

  return requestedPet;
}
