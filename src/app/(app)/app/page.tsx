import {
  BowlIcon,
  CapsuleIcon,
  ConcernCard,
  DropIcon,
  FeedRow,
  PetHeader,
  QuickActionsPanel,
  SectionHeader,
  TaskCard,
} from "@/components/layout/app-shell-primitives";
import { EmptyStateCard } from "@/components/shared/empty-state-card";
import { getAuthenticatedPetContext } from "@/server/services/pets";

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

const villageFeedItems = [
  {
    actor: "Michael",
    action: "fed Buddy and Izzy at 8:30 AM",
  },
  {
    actor: "Sarah",
    action: "gave Apoquel at 9:00 AM",
  },
  {
    actor: "Jake",
    action: "noted itching after walk",
  },
] as const;

export default async function AppHomePage() {
  const petContext = await getAuthenticatedPetContext();

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
        <SectionHeader title="Village Feed" eyebrow="Recent care" actionLabel="Village" />
        <div className="space-y-1.5">
          {villageFeedItems.map((item) => (
            <FeedRow
              key={`${item.actor}-${item.action}`}
              actor={item.actor}
              action={item.action}
            />
          ))}
        </div>
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
