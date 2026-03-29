import { EmptyStateCard } from "@/components/shared/empty-state-card";
import { PageFrame } from "@/components/shared/page-frame";

export default function PetsShellPage() {
  return (
    <PageFrame
      eyebrow="Pets"
      title="No pets in the shell yet"
      description="This page holds the place where each pet will anchor records, routines, and care context. The shell is ready; the pet creation lane comes next."
    >
      <EmptyStateCard
        label="Coming next"
        title="Pet setup belongs here"
        description="Expect the first pet creation flow to land in this area, followed by lightweight pet context that other parts of the app can rely on."
        action={{
          href: "/app",
          label: "Back to dashboard",
        }}
        secondaryAction={{
          href: "/app/timeline",
          label: "Preview timeline shell",
        }}
      />
    </PageFrame>
  );
}
