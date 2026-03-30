import { redirect } from "next/navigation";

import { CurrentPetProfile } from "@/components/pets/current-pet-profile";
import { getAuthenticatedPetContext } from "@/server/services/pets";

export default async function CurrentPetProfilePage() {
  const petContext = await getAuthenticatedPetContext();

  if (!petContext.currentPet) {
    redirect("/app");
  }

  return <CurrentPetProfile pet={petContext.currentPet} />;
}
