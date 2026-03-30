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
    title: "Dinner Due",
    detail: "6:00 PM",
    icon: <BowlIcon />,
  },
  {
    title: "Apoquel",
    detail: "8:00 PM",
    icon: <CapsuleIcon />,
  },
  {
    title: "Give Ears Meds",
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
    <div className="space-y-4">
      <PetHeader pet={petContext.currentPet} />

      <section className="rounded-[1.15rem] border border-[#d8e2f3] bg-[linear-gradient(180deg,#f7faff_0%,#eef4fb_100%)] px-3.5 py-3">
        <p className="text-[0.82rem] font-semibold text-[#41618f]">
          {petContext.currentPet.name} is on track today.
        </p>
        <p className="mt-1 text-[0.8rem] leading-5 text-text-secondary">
          Next item: Dinner at 6:00 PM.
        </p>
      </section>

      <section className="space-y-2.5">
        <SectionHeader title="Due Now" eyebrow="What matters now" />
        <div className="grid grid-cols-1 gap-2 min-[420px]:grid-cols-3">
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

      <section className="space-y-2.5">
        <SectionHeader title="Watch Item" eyebrow="Monitor calmly" />
        <ConcernCard title="Ear Infection Recovery Day 2" />
      </section>

      <section className="space-y-2.5">
        <SectionHeader title="Quick Actions" eyebrow="Log something fast" />
        <QuickActionsPanel />
      </section>

      <section className="space-y-2.5">
        <SectionHeader title="Village Feed" eyebrow="Care stream" />
        <div className="space-y-2">
          {villageFeedItems.map((item) => (
            <FeedRow
              key={`${item.actor}-${item.action}`}
              actor={item.actor}
              action={item.action}
            />
          ))}
        </div>
      </section>
    </div>
  );
}
