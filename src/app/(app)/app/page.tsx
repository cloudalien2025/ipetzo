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

export default function AppHomePage() {
  return (
    <div className="space-y-5">
      <PetHeader />

      <section className="space-y-3">
        <SectionHeader title="Due Now" />
        <div className="grid grid-cols-1 gap-3 min-[420px]:grid-cols-3">
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

      <section className="space-y-3">
        <SectionHeader title="Village Feed" />
        <div className="space-y-2.5">
          {villageFeedItems.map((item) => (
            <FeedRow
              key={`${item.actor}-${item.action}`}
              actor={item.actor}
              action={item.action}
            />
          ))}
        </div>
      </section>

      <section className="space-y-3">
        <SectionHeader title="Active Concern" />
        <ConcernCard title="Ear Infection Recovery Day 2" />
      </section>

      <section className="space-y-3">
        <SectionHeader title="Quick Actions" />
        <QuickActionsPanel />
      </section>
    </div>
  );
}
