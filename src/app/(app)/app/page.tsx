import {
  BowlIcon,
  CapsuleIcon,
  ConcernCard,
  DropIcon,
  PetHeader,
  QuickActionsPanel,
  SectionHeader,
  TaskCard,
} from "@/components/layout/app-shell-primitives";
import { EmptyStateCard } from "@/components/shared/empty-state-card";
import { getAuthenticatedPetContext } from "@/server/services/pets";
import { getVillageActivityFeed } from "@/server/services/village-activity";
import { Card } from "@/components/ui/card";

const dueNowItems = [
  {
    title: "Dinner",
    detail: "6:00 PM",
    icon: <BowlIcon />,
  },
  {
    title: "Apoquel",
    detail: "8:00 PM",
    icon: <CapsuleIcon />,
  },
  {
    title: "Ear meds",
    detail: "Tomorrow",
    icon: <DropIcon />,
  },
] as const;

export default async function AppHomePage() {
  const petContext = await getAuthenticatedPetContext();
  const villageActivityFeed = await getVillageActivityFeed();

  if (!petContext.currentPet) {
    return (
      <div className="space-y-5">
        <EmptyStateCard
          label="Welcome to iPetzo"
          title="Start with your first pet"
          description="Add your first pet to start building their care record."
          action={{
            href: "/app/pets/new",
            label: "Add your first pet",
          }}
        />
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <PetHeader pet={petContext.currentPet} />

      <section className="space-y-2">
        <SectionHeader title="Due Now" eyebrow="What matters now" actionLabel="View all" />
        <div className="grid grid-cols-3 gap-2">
          {dueNowItems.map((item) => (
            <TaskCard
              key={item.title}
              icon={item.icon}
              title={item.title}
              detail={item.detail}
            />
          ))}
        </div>
      </section>

      <section className="space-y-2">
        <SectionHeader title="Village" eyebrow="Shared care" />
        <Card className="gap-1 rounded-[1rem] border-border-soft bg-surface px-3 py-3 shadow-none">
          <p className="text-[0.8rem] font-semibold text-text-primary">
            Village activity is not connected in this build.
          </p>
          <p className="text-[0.74rem] leading-[1.15rem] text-text-secondary">
            {villageActivityFeed.status === "backend_unavailable"
              ? `${petContext.currentPet.name} is scoped to pet records on this account until village storage, actor metadata, and timestamps exist in the backend.`
              : "Add a pet before village activity can be scoped."}
          </p>
        </Card>
      </section>

      <section className="space-y-2">
        <SectionHeader title="Active Concern" eyebrow="Monitor calmly" />
        <ConcernCard title="Ear Infection Recovery Day 2" />
      </section>

      <section className="space-y-2">
        <SectionHeader title="Quick Actions" eyebrow="Log something fast" />
        <QuickActionsPanel />
      </section>
    </div>
  );
}
