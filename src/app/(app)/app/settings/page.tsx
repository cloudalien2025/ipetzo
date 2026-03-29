import { EmptyStateCard } from "@/components/shared/empty-state-card";
import { PageFrame } from "@/components/shared/page-frame";

export default function SettingsShellPage() {
  return (
    <PageFrame
      eyebrow="Settings"
      title="Shell settings placeholder"
      description="This space can later hold account preferences and app-level controls. It stays intentionally shallow in this lane so the shell remains focused."
    >
      <EmptyStateCard
        label="Placeholder"
        title="No settings workflow yet"
        description="Authentication is active and the shell is stable. Real account and profile controls can be added later without reshaping the protected layout."
        action={{
          href: "/app",
          label: "Back to dashboard",
        }}
      />
    </PageFrame>
  );
}
