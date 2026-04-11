import "server-only";

import type { VillageActivityFeed } from "@/types/domain/collaboration";
import { getAuthenticatedPetContext } from "@/server/services/pets";

export async function getVillageActivityFeed(): Promise<VillageActivityFeed> {
  const petContext = await getAuthenticatedPetContext();

  if (!petContext.currentPet) {
    return {
      status: "no_current_pet",
      petId: null,
      villageId: null,
      lastActivityAt: null,
      syncState: "saved_on_device",
      activities: [],
    };
  }

  return {
    status: "backend_unavailable",
    petId: petContext.currentPet.id,
    villageId: null,
    lastActivityAt: null,
    syncState: "backend_unavailable",
    activities: [],
  };
}
