import Link from "next/link";

import type { PetSpecies } from "@/generated/prisma/client";
import type { PetSummary } from "@/server/services/pets";

type IconProps = {
  className?: string;
};

type SectionHeaderProps = {
  title: string;
  eyebrow?: string;
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

function formatBirthDateLabel(birthDate: Date | null): string | null {
  if (!birthDate) {
    return null;
  }

  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(birthDate);
}

function formatApproximateAgeLabel(birthDate: Date | null, now = new Date()): string | null {
  if (!birthDate) {
    return null;
  }

  let years = now.getUTCFullYear() - birthDate.getUTCFullYear();
  let months = now.getUTCMonth() - birthDate.getUTCMonth();

  if (now.getUTCDate() < birthDate.getUTCDate()) {
    months -= 1;
  }

  if (months < 0) {
    years -= 1;
    months += 12;
  }

  if (years > 1) {
    return `${years} yrs old`;
  }

  if (years === 1) {
    return "1 yr old";
  }

  if (months > 1) {
    return `${months} mos old`;
  }

  if (months === 1) {
    return "1 mo old";
  }

  return "New arrival";
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
    return "bg-action-green/20 text-[#447553] ring-1 ring-inset ring-[#93b59b]/45";
  }

  if (tone === "red") {
    return "bg-action-red/20 text-[#9d5249] ring-1 ring-inset ring-[#dca29b]/45";
  }

  return "bg-action-blue/20 text-[#4d6cad] ring-1 ring-inset ring-[#9db6e2]/45";
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
  const petMeta = pet ? [formatPetSpecies(pet.species), pet.breed].filter(Boolean) : [];

  return (
    <div
      className={`flex w-full items-center justify-between gap-3 rounded-[1.6rem] border border-border-soft bg-surface px-4 py-3.5 text-left text-sm font-semibold text-text-primary shadow-[0_10px_24px_rgba(42,52,68,0.04)] transition ${
        interactive ? "cursor-pointer hover:border-nav-active/35 hover:bg-surface-soft" : ""
      } focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:ring-offset-2 focus-visible:ring-offset-app-bg`}
      aria-label={pet ? `Current pet ${pet.name}` : "No pets yet"}
    >
      <span className="flex min-w-0 items-center gap-3">
        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[radial-gradient(circle_at_top,#f5ddbb,#e6c79c_72%)] text-sm font-bold tracking-tight text-text-primary">
          {pet ? getInitials(pet.name) : "IP"}
        </span>
        <span className="min-w-0">
          <span className="block text-[0.68rem] font-semibold tracking-[0.18em] text-text-muted uppercase">
            Current pet
          </span>
          <span className="mt-1 block truncate text-[0.98rem] font-semibold tracking-tight">
            {pet ? pet.name : "No pets yet"}
          </span>
          <span className="mt-1.5 flex flex-wrap items-center gap-1.5">
            {petMeta.length > 0 ? (
              petMeta.map((meta) => (
                <span
                  key={meta}
                  className="inline-flex items-center rounded-full bg-surface-panel px-2.5 py-1 text-[0.68rem] font-semibold tracking-tight text-text-secondary"
                >
                  {meta}
                </span>
              ))
            ) : detail ? (
              <span className="text-xs font-medium text-text-secondary">{detail}</span>
            ) : null}
          </span>
        </span>
      </span>
      <span className="flex shrink-0 items-center gap-2">
        {detail && petMeta.length > 0 ? (
          <span className="hidden text-[0.72rem] font-medium text-text-secondary min-[400px]:inline">
            {detail}
          </span>
        ) : null}
        {interactive ? (
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-surface-panel text-text-secondary">
            <ChevronUpDownIcon className="h-4 w-4" />
          </span>
        ) : null}
      </span>
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
  const ageLabel = formatApproximateAgeLabel(pet.birthDate);
  const careSince = new Intl.DateTimeFormat("en-US", {
    month: "short",
    year: "numeric",
  }).format(pet.createdAt);
  const detailChips = [
    formatPetSpecies(pet.species),
    pet.breed,
    pet.sex,
    formatWeight(pet),
  ].filter(Boolean);

  return (
    <section className="overflow-hidden rounded-[2rem] border border-border-soft bg-[linear-gradient(180deg,#fffdf9_0%,#f6f1e9_100%)] px-5 py-5 shadow-[0_16px_32px_rgba(40,50,66,0.06)]">
      <div className="flex flex-col items-center text-center">
        <span className="inline-flex max-w-full items-center rounded-full bg-white/85 px-3 py-1 text-[0.68rem] font-semibold tracking-[0.18em] text-text-muted uppercase">
          Today with {pet.name}
        </span>
        <div className="mt-4 flex h-24 w-24 items-center justify-center rounded-full bg-[radial-gradient(circle_at_top,#f7e8cf,#e8cda6_70%)] text-[1.7rem] font-bold tracking-tight text-text-primary shadow-[inset_0_1px_0_rgba(255,255,255,0.7)]">
          {getInitials(pet.name)}
        </div>
        <div className="mt-4 min-w-0">
          <h1 className="break-words text-[1.9rem] leading-none font-bold tracking-tight text-text-primary min-[380px]:text-[2.15rem]">
            {pet.name}
          </h1>
          <p className="mt-3 max-w-[18rem] text-sm leading-6 text-text-secondary">
            Everything important for {pet.name}&rsquo;s care, routines, and active
            watch items lives here.
          </p>
        </div>
        <div className="mt-4 flex max-w-full flex-wrap items-center justify-center gap-2">
          <PetSpeciesBadge species={pet.species} />
          {detailChips.slice(1).map((chip) => (
            <span
              key={chip}
              className="inline-flex max-w-full items-center rounded-full border border-border-soft bg-white/80 px-3 py-1 text-center text-xs font-semibold text-text-secondary"
            >
              {chip}
            </span>
          ))}
        </div>
      </div>

      <div className="mt-5 grid grid-cols-1 gap-3 min-[380px]:grid-cols-2">
        <div className="rounded-[1.4rem] border border-border-soft bg-white/78 px-4 py-3.5 text-left">
          <p className="text-[0.68rem] font-semibold tracking-[0.18em] text-text-muted uppercase">
            Care record
          </p>
          <p className="mt-2 text-base font-semibold text-text-primary">Since {careSince}</p>
        </div>
        <div className="rounded-[1.4rem] border border-border-soft bg-white/78 px-4 py-3.5 text-left">
          <p className="text-[0.68rem] font-semibold tracking-[0.18em] text-text-muted uppercase">
            Snapshot
          </p>
          <p className="mt-2 text-base font-semibold text-text-primary">
            {ageLabel ?? "Profile growing"}
          </p>
        </div>
      </div>
    </section>
  );
}

export function EmptyPetOverview({ pet }: { pet: PetSummary }) {
  const facts = [
    pet.breed,
    pet.sex,
    formatBirthDateLabel(pet.birthDate),
    formatWeight(pet),
  ].filter(Boolean);

  return (
    <section className="rounded-[1.7rem] border border-border-soft bg-surface px-4 py-4 sm:px-5">
      <p className="text-[0.72rem] font-semibold tracking-[0.18em] text-text-muted uppercase">
        Pet overview
      </p>
      <p className="mt-2 text-sm leading-6 text-text-secondary">
        {facts.length > 0
          ? `${pet.name}'s profile is grounded with ${facts.join(" • ")}.`
          : `${pet.name} is part of your iPetzo account and ready for care tracking.`}
      </p>
    </section>
  );
}

export function SectionHeader({ title, eyebrow }: SectionHeaderProps) {
  return (
    <div className="space-y-1 px-1">
      {eyebrow ? (
        <p className="text-[0.68rem] font-semibold tracking-[0.18em] text-text-muted uppercase">
          {eyebrow}
        </p>
      ) : null}
      <h2 className="text-[1.28rem] font-semibold tracking-tight text-text-primary">{title}</h2>
    </div>
  );
}

export function TaskCard({ icon, title, detail }: TaskCardProps) {
  return (
    <article className="rounded-[1.45rem] border border-border-soft bg-surface px-4 py-4 shadow-[0_10px_22px_rgba(42,52,68,0.04)]">
      <div className="flex items-start gap-3">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#eef3fb] text-[#5671a0]">
          {icon}
        </div>
        <div className="min-w-0">
          <p className="text-[0.68rem] font-semibold tracking-[0.18em] text-text-muted uppercase">
            Due now
          </p>
          <p className="mt-2 text-sm font-semibold text-text-primary">{title}</p>
          <p className="mt-1 text-xs font-medium text-text-secondary">{detail}</p>
        </div>
      </div>
    </article>
  );
}

export function FeedRow({ actor, action }: FeedRowProps) {
  return (
    <article className="flex items-center gap-3 rounded-[1.35rem] border border-border-soft bg-surface px-4 py-3.5">
      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#eaf0f5] text-xs font-semibold text-[#5d6f86]">
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
    <article className="rounded-[1.7rem] border border-[#ead9b8] bg-[linear-gradient(180deg,#fffaf0_0%,#fff7e8_100%)] px-4 py-4">
      <div className="flex items-start gap-3">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-accent-warning/18 text-[#a06d17]">
          <AlertIcon />
        </div>
        <div>
          <p className="text-[0.68rem] font-semibold tracking-[0.18em] text-[#9f7a36] uppercase">
            Active concern
          </p>
          <p className="mt-2 text-base font-semibold text-text-primary">{title}</p>
          <p className="mt-1 text-sm leading-6 text-text-secondary">
            Stay attentive, but calm. This card is intentionally visible without
            turning the screen into an alarm state.
          </p>
        </div>
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
      className="flex items-start justify-center rounded-[1.25rem] px-2 py-2 text-center transition hover:bg-surface-soft focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:ring-offset-2 focus-visible:ring-offset-surface"
      aria-label={`${label} placeholder`}
    >
      <span className="flex flex-col items-center gap-2.5">
        <span
          className={`flex h-[3.75rem] w-[3.75rem] items-center justify-center rounded-full ${quickActionToneClass(tone)}`}
        >
          {icon}
        </span>
        <span className="max-w-[4.5rem] text-xs leading-4 font-medium text-text-primary">
          {label}
        </span>
      </span>
    </button>
  );
}

export function QuickActionsPanel() {
  return (
    <section className="rounded-[1.8rem] border border-border-soft bg-surface px-3 py-4 shadow-[0_12px_24px_rgba(42,52,68,0.04)]">
      <div className="grid grid-cols-2 gap-2 min-[400px]:grid-cols-4">
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
      <section className="rounded-[var(--radius-surface)] border border-border-soft bg-surface px-4 py-4 sm:px-5">
        <p className="text-sm font-semibold text-text-primary">iPetzo shell</p>
        <p className="mt-2 text-sm leading-6 text-text-secondary">
          This area stays lightweight until that feature lane is ready.
        </p>
      </section>

      <section className="rounded-[var(--radius-surface)] border border-border-soft bg-surface px-4 py-5 sm:px-5">
        <p className="text-sm font-semibold text-text-secondary">{title}</p>
        <h1 className="mt-2 text-2xl font-bold tracking-tight text-text-primary">
          Placeholder shell
        </h1>
        <p className="mt-3 text-sm leading-6 text-text-secondary">
          {description}
        </p>

        <div className="mt-5 rounded-[var(--radius-card)] border border-border-soft bg-surface-muted px-4 py-4">
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
          className="mt-5 inline-flex items-center rounded-full border border-border-soft bg-surface-panel px-4 py-2 text-sm font-semibold text-text-primary transition hover:border-nav-active/45 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:ring-offset-2 focus-visible:ring-offset-surface"
        >
          Return to Today
        </Link>
      </section>
    </section>
  );
}
