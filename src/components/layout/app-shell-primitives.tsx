import Link from "next/link";

import type { PetSpecies } from "@/generated/prisma/client";
import type { PetSummary } from "@/server/services/pets";

type IconProps = {
  className?: string;
};

type SectionHeaderProps = {
  title: string;
};

type TaskCardProps = {
  icon: React.ReactNode;
  title: string;
  detail: string;
};

type FeedRowProps = {
  actor: string;
  action: string;
};

type ConcernCardProps = {
  title: string;
};

type QuickActionButtonProps = {
  label: string;
  tone: "blue" | "green" | "red";
  icon: React.ReactNode;
};

type PlaceholderTabScreenProps = {
  title: string;
  description: string;
};

function iconClassName(className?: string): string {
  return `h-5 w-5 stroke-[1.9] ${className ?? ""}`;
}

function getInitials(name: string): string {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

function formatPetSpecies(species: PetSpecies): string {
  if (species === "DOG") {
    return "Dog";
  }

  if (species === "CAT") {
    return "Cat";
  }

  return "Pet";
}

export function PetSpeciesBadge({ species }: { species: PetSpecies }) {
  return <StatusPill>{formatPetSpecies(species)}</StatusPill>;
}

function formatWeight(pet: PetSummary): string | null {
  if (!pet.weightValue) {
    return null;
  }

  return `${pet.weightValue.toString()} ${pet.weightUnit ?? "lb"}`;
}

function quickActionToneClass(tone: QuickActionButtonProps["tone"]): string {
  if (tone === "green") {
    return "bg-action-green/20 text-[#447553]";
  }

  if (tone === "red") {
    return "bg-action-red/20 text-[#9d5249]";
  }

  return "bg-action-blue/20 text-[#4d6cad]";
}

export function ChevronUpDownIcon({ className }: IconProps) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      className={iconClassName(className)}
    >
      <path
        d="m7 10 5-5 5 5M17 14l-5 5-5-5"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function CheckIcon({ className }: IconProps) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      className={iconClassName(className)}
    >
      <path
        d="m5.5 12.5 4.25 4.25L18.5 8"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function BowlIcon({ className }: IconProps) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      className={iconClassName(className)}
    >
      <path
        d="M5 11c0 4.418 3.134 8 7 8s7-3.582 7-8H5Zm2.5-4.5h9"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M10 7.5c0-1.381.895-2.5 2-2.5s2 1.119 2 2.5"
        stroke="currentColor"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function CapsuleIcon({ className }: IconProps) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      className={iconClassName(className)}
    >
      <path
        d="m8.5 15.5 7-7a3.536 3.536 0 0 1 5 5l-7 7a3.536 3.536 0 0 1-5-5Z"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="m10 14 4 4M13.5 7.5l4 4"
        stroke="currentColor"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function DropIcon({ className }: IconProps) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      className={iconClassName(className)}
    >
      <path
        d="M12 4c2.552 3.09 5 6.272 5 9a5 5 0 1 1-10 0c0-2.728 2.448-5.91 5-9Z"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function AlertIcon({ className }: IconProps) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      className={iconClassName(className)}
    >
      <path
        d="M12 7.5v5m0 4h.01M10.42 4.966 4.69 15.25A2 2 0 0 0 6.438 18h11.124a2 2 0 0 0 1.748-2.75l-5.73-10.284a2 2 0 0 0-3.16 0Z"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function MicIcon({ className }: IconProps) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      className={iconClassName(className)}
    >
      <path
        d="M12 15a3 3 0 0 0 3-3V8a3 3 0 1 0-6 0v4a3 3 0 0 0 3 3Z"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M6 11.5v.5a6 6 0 1 0 12 0v-.5M12 18v2.5"
        stroke="currentColor"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function CameraIcon({ className }: IconProps) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      className={iconClassName(className)}
    >
      <path
        d="M4.75 8.5h14.5A1.75 1.75 0 0 1 21 10.25v7A1.75 1.75 0 0 1 19.25 19H4.75A1.75 1.75 0 0 1 3 17.25v-7A1.75 1.75 0 0 1 4.75 8.5Z"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="m9 8.5 1.2-2h3.6l1.2 2M12 16.25a2.75 2.75 0 1 0 0-5.5 2.75 2.75 0 0 0 0 5.5Z"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function SparkIcon({ className }: IconProps) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      className={iconClassName(className)}
    >
      <path
        d="m12 4 1.9 4.6L18.5 10l-4.6 1.4L12 16l-1.9-4.6L5.5 10l4.6-1.4L12 4Z"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function NoteIcon({ className }: IconProps) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      className={iconClassName(className)}
    >
      <path
        d="M7 5.5h10A1.5 1.5 0 0 1 18.5 7v10a1.5 1.5 0 0 1-1.5 1.5H7A1.5 1.5 0 0 1 5.5 17V7A1.5 1.5 0 0 1 7 5.5Z"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M9 9.5h6M9 12.5h6M9 15.5h4"
        stroke="currentColor"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function TodayIcon({ className }: IconProps) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      className={iconClassName(className)}
    >
      <path
        d="M5.5 8.25A1.75 1.75 0 0 1 7.25 6.5h9.5a1.75 1.75 0 0 1 1.75 1.75v8.5a1.75 1.75 0 0 1-1.75 1.75h-9.5A1.75 1.75 0 0 1 5.5 16.75v-8.5Z"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M8.5 4.75v3M15.5 4.75v3M8.5 11.25h7M8.5 14.25h4"
        stroke="currentColor"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function TimelineIcon({ className }: IconProps) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      className={iconClassName(className)}
    >
      <path
        d="M7 6.5v11M12 9.5v8M17 5.5v12"
        stroke="currentColor"
        strokeLinecap="round"
      />
      <path
        d="M5.5 17.5h13"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function VillageIcon({ className }: IconProps) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      className={iconClassName(className)}
    >
      <path
        d="M8 10a2 2 0 1 0 0-4 2 2 0 0 0 0 4ZM16 11a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M4.5 17c.45-2.05 2.213-3.5 4.25-3.5 2.038 0 3.8 1.45 4.25 3.5M12.5 17c.365-1.689 1.791-2.9 3.5-2.9 1.71 0 3.135 1.211 3.5 2.9"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function ProtectIcon({ className }: IconProps) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      className={iconClassName(className)}
    >
      <path
        d="M12 4.5c2.198 1.64 4.706 2.5 7 2.5v5.5c0 3.57-2.352 6.825-7 8.5-4.648-1.675-7-4.93-7-8.5V7c2.294 0 4.802-.86 7-2.5Z"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function PatternsIcon({ className }: IconProps) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      className={iconClassName(className)}
    >
      <path
        d="M5.5 16.5 9 13l3 2.5 6.5-7"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M5.5 6.5v11h13"
        stroke="currentColor"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function PetSelector({
  pet,
  detail,
  interactive = false,
}: {
  pet: PetSummary | null;
  detail?: string;
  interactive?: boolean;
}) {
  return (
    <div
      className={`flex w-full items-center justify-between gap-3 rounded-[var(--radius-surface)] border border-border-subtle bg-surface px-4 py-3.5 text-left text-sm font-semibold text-text-primary transition ${
        interactive ? "cursor-pointer hover:border-nav-active/45" : ""
      } focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:ring-offset-2 focus-visible:ring-offset-app-bg`}
      aria-label={pet ? `Current pet ${pet.name}` : "No pets yet"}
    >
      <span className="min-w-0">
        <span className="block truncate">{pet ? pet.name : "No pets yet"}</span>
        {detail ? (
          <span className="mt-1 block text-xs font-medium text-text-secondary">{detail}</span>
        ) : null}
      </span>
      {interactive ? <ChevronUpDownIcon className="h-4 w-4 text-text-secondary" /> : null}
    </div>
  );
}

export function StatusPill({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex w-fit items-center rounded-full bg-accent-monitoring/25 px-3 py-1 text-xs font-semibold text-[#9a5b1f]">
      {children}
    </span>
  );
}

export function PetHeader({ pet }: { pet: PetSummary }) {
  return (
    <section className="rounded-[var(--radius-surface)] border border-border-subtle bg-surface px-4 py-4 sm:px-5">
      <div className="flex items-center gap-3 sm:gap-4">
        <div className="flex h-[3.75rem] w-[3.75rem] shrink-0 items-center justify-center rounded-full bg-[#eadbc9] text-lg font-semibold text-text-primary sm:h-16 sm:w-16">
          {getInitials(pet.name)}
        </div>
        <div className="min-w-0">
          <p className="text-[1.55rem] leading-tight font-bold tracking-tight text-text-primary">
            {pet.name}
          </p>
          <div className="mt-2">
            <PetSpeciesBadge species={pet.species} />
          </div>
        </div>
      </div>
    </section>
  );
}

export function EmptyPetOverview({ pet }: { pet: PetSummary }) {
  const facts = [
    pet.breed,
    pet.sex,
    pet.birthDate
      ? new Intl.DateTimeFormat("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
        }).format(pet.birthDate)
      : null,
    formatWeight(pet),
  ].filter(Boolean);

  return (
    <section className="rounded-[var(--radius-surface)] border border-border-subtle bg-surface px-4 py-4 sm:px-5">
      <p className="text-sm font-semibold text-text-primary">Care record started</p>
      <p className="mt-2 text-sm leading-6 text-text-secondary">
        {facts.length > 0
          ? `${pet.name} is now part of your iPetzo account. ${facts.join(" • ")}`
          : `${pet.name} is now part of your iPetzo account.`}
      </p>
    </section>
  );
}

export function SectionHeader({ title }: SectionHeaderProps) {
  return (
    <h2 className="text-lg font-semibold tracking-tight text-text-primary">
      {title}
    </h2>
  );
}

export function TaskCard({ icon, title, detail }: TaskCardProps) {
  return (
    <article className="rounded-[var(--radius-card)] border border-border-subtle bg-surface px-3.5 py-3.5">
      <div className="flex items-start gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-surface-panel text-text-primary">
          {icon}
        </div>
        <div className="min-w-0">
          <p className="text-sm font-semibold text-text-primary">{title}</p>
          <p className="mt-1 text-xs text-text-secondary">{detail}</p>
        </div>
      </div>
    </article>
  );
}

export function FeedRow({ actor, action }: FeedRowProps) {
  return (
    <article className="flex items-center gap-3 rounded-[var(--radius-card)] border border-border-subtle bg-surface px-3.5 py-3.5">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#e7eef5] text-xs font-semibold text-[#5d6f86]">
        {getInitials(actor)}
      </div>
      <p className="text-sm leading-6 text-text-secondary">
        <span className="font-semibold text-text-primary">{actor}</span>{" "}
        {action}
      </p>
    </article>
  );
}

export function ConcernCard({ title }: ConcernCardProps) {
  return (
    <article className="flex items-center gap-3 rounded-[var(--radius-surface)] border border-border-subtle bg-surface px-4 py-4">
      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-accent-warning/20 text-[#a06d17]">
        <AlertIcon />
      </div>
      <div>
        <p className="text-sm text-text-secondary">Watching closely</p>
        <p className="mt-1 text-base font-semibold text-text-primary">{title}</p>
      </div>
    </article>
  );
}

export function QuickActionButton({
  label,
  tone,
  icon,
}: QuickActionButtonProps) {
  return (
    <button
      type="button"
      className="flex items-start justify-center rounded-[var(--radius-card)] px-2 py-1 text-center transition hover:bg-surface-panel/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:ring-offset-2 focus-visible:ring-offset-surface"
      aria-label={`${label} placeholder`}
    >
      <span className="flex flex-col items-center gap-2.5">
        <span
          className={`flex h-14 w-14 items-center justify-center rounded-full ${quickActionToneClass(tone)}`}
        >
          {icon}
        </span>
        <span className="text-xs leading-4 font-medium text-text-primary">
          {label}
        </span>
      </span>
    </button>
  );
}

export function QuickActionsPanel() {
  return (
    <section className="rounded-[var(--radius-surface)] border border-border-subtle bg-surface px-3 py-4">
      <div className="grid grid-cols-4 gap-2">
        <QuickActionButton
          label="Log by Voice"
          tone="blue"
          icon={<MicIcon />}
        />
        <QuickActionButton
          label="Take Photo"
          tone="blue"
          icon={<CameraIcon />}
        />
        <QuickActionButton
          label="Add Symptom"
          tone="green"
          icon={<SparkIcon />}
        />
        <QuickActionButton label="Add Note" tone="red" icon={<NoteIcon />} />
      </div>
    </section>
  );
}

export function PlaceholderTabScreen({
  title,
  description,
}: PlaceholderTabScreenProps) {
  return (
    <section className="space-y-5">
      <section className="rounded-[var(--radius-surface)] border border-border-subtle bg-surface px-4 py-4 sm:px-5">
        <p className="text-sm font-semibold text-text-primary">iPetzo shell</p>
        <p className="mt-2 text-sm leading-6 text-text-secondary">
          This area stays lightweight until that feature lane is ready.
        </p>
      </section>

      <section className="rounded-[var(--radius-surface)] border border-border-subtle bg-surface px-4 py-5 sm:px-5">
        <p className="text-sm font-semibold text-text-secondary">{title}</p>
        <h1 className="mt-2 text-2xl font-bold tracking-tight text-text-primary">
          Placeholder shell
        </h1>
        <p className="mt-3 text-sm leading-6 text-text-secondary">
          {description}
        </p>

        <div className="mt-5 rounded-[var(--radius-card)] border border-border-subtle bg-surface-muted px-4 py-4">
          <p className="text-sm font-semibold text-text-primary">
            This tab is intentionally shell-only.
          </p>
          <p className="mt-2 text-sm leading-6 text-text-secondary">
            Routing, spacing, surfaces, and bottom navigation are in place so
            real product logic can plug in later without reshaping the app
            frame.
          </p>
        </div>

        <Link
          href="/app"
          className="mt-5 inline-flex items-center rounded-full border border-border-subtle bg-surface-panel px-4 py-2 text-sm font-semibold text-text-primary transition hover:border-nav-active/45 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:ring-offset-2 focus-visible:ring-offset-surface"
        >
          Return to Today
        </Link>
      </section>
    </section>
  );
}
