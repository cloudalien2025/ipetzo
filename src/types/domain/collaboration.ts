export type CollaborationSyncState =
  | "saved_on_device"
  | "saving_to_village"
  | "synced_with_village"
  | "backend_unavailable";

export type VillageActivityRecord = {
  itemId: string;
  petId: string;
  villageId: string;
  actorId: string;
  actorDisplayName: string | null;
  createdAt: Date;
  updatedAt: Date;
  lastActivityAt: Date;
  syncState: Extract<CollaborationSyncState, "saving_to_village" | "synced_with_village">;
  summary: string;
};

export type VillageActivityFeed =
  | {
      status: "no_current_pet";
      petId: null;
      villageId: null;
      lastActivityAt: null;
      syncState: "saved_on_device";
      activities: [];
    }
  | {
      status: "backend_unavailable";
      petId: string;
      villageId: null;
      lastActivityAt: null;
      syncState: "backend_unavailable";
      activities: [];
    }
  | {
      status: "ready";
      petId: string;
      villageId: string;
      lastActivityAt: Date | null;
      syncState: Extract<CollaborationSyncState, "saving_to_village" | "synced_with_village">;
      activities: VillageActivityRecord[];
    };
