import "server-only";

import type { Pet, PetSpecies } from "@/generated/prisma/client";
import { getPrismaClient, hasRuntimeDatabaseUrl } from "@/server/db/prisma";
import { getCurrentAuthenticatedAppUser } from "@/server/services/auth/app-user";

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
    };
  }

  const appUser = await getCurrentAuthenticatedAppUser();

  if (!appUser) {
    return {
      petCount: 0,
      currentPet: null,
    };
  }

  const prisma = getPrismaClient();
  const [petCount, currentPet] = await Promise.all([
    prisma.pet.count({
      where: {
        userId: appUser.id,
      },
    }),
    prisma.pet.findFirst({
      where: {
        userId: appUser.id,
      },
      orderBy: {
        createdAt: "asc",
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
    }),
  ]);

  return {
    petCount,
    currentPet,
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

  return prisma.pet.create({
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
}
