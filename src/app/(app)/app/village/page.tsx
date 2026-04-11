import { EmptyStateCard } from "@/components/shared/empty-state-card";
import { PageFrame } from "@/components/shared/page-frame";
import { getVillageActivityFeed } from "@/server/services/village-activity";

export default async function VillageShellPage() {
  const villageActivityFeed = await getVillageActivityFeed();

  return (
    <PageFrame
      eyebrow="Village"
      title="Shared activity is waiting on backend truth"
      description="This route is reserved for village activity once the backend stores pet-scoped shared updates with actor identity and timestamps."
    >
      <EmptyStateCard
        label="Current status"
        title={
          villageActivityFeed.status === "no_current_pet"
            ? "Choose a pet before checking village activity"
            : "No village backend state exists for this pet yet"
        }
        description={
          villageActivityFeed.status === "no_current_pet"
            ? "Village activity cannot be scoped until a current pet is selected."
            : `Current pet id ${villageActivityFeed.petId} has no village id, actor metadata, or shared activity timestamps stored in the backend yet.`
        }
      />
    </PageFrame>
  );
}
