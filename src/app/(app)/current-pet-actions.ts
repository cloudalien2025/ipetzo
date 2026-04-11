"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { setCurrentPetForCurrentUser } from "@/server/services/pets";

export type SwitchCurrentPetFormState = {
  error: string | null;
};

const initialState: SwitchCurrentPetFormState = {
  error: null,
};

function getTrimmedString(formData: FormData, key: string): string {
  const value = formData.get(key);
  return typeof value === "string" ? value.trim() : "";
}

function getReturnPath(formData: FormData): string {
  const returnTo = getTrimmedString(formData, "returnTo");

  if (returnTo.startsWith("/app")) {
    return returnTo;
  }

  return "/app";
}

export async function switchCurrentPetAction(
  previousState: SwitchCurrentPetFormState = initialState,
  formData: FormData,
): Promise<SwitchCurrentPetFormState> {
  void previousState;

  const petId = getTrimmedString(formData, "petId");
  const returnTo = getReturnPath(formData);

  if (!petId) {
    return {
      error: "Select a pet to continue.",
    };
  }

  try {
    await setCurrentPetForCurrentUser(petId);
  } catch (error) {
    console.error("Failed to switch the current pet.", error);

    return {
      error: "We couldn't switch pets right now. Please try again.",
    };
  }

  revalidatePath("/app", "layout");
  revalidatePath(returnTo);
  redirect(returnTo);
}
