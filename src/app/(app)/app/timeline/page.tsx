import { EmptyStateCard } from "@/components/shared/empty-state-card";
import { PageFrame } from "@/components/shared/page-frame";

export default function TimelineShellPage() {
  return (
    <PageFrame
      eyebrow="Timeline"
      title="Records will collect here"
      description="Meals, medications, notes, and behavior logs are not implemented in this lane. This shell page gives those future records a stable home inside the authenticated app."
    >
      <EmptyStateCard
        label="Empty state"
        title="Nothing to read yet"
        description="Once pet setup and record logging arrive, this area can turn into a calm running timeline instead of a loose collection of disconnected events."
        action={{
          href: "/app/pets",
          label: "Go to pets shell",
        }}
        secondaryAction={{
          href: "/app",
          label: "Return home",
        }}
      />
    </PageFrame>
  );
}
