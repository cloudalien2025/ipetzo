import Link from "next/link";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import type { PetSpecies } from "@/generated/prisma/client";
import type { PetSummary } from "@/server/services/pets";

type IconProps = {
  className?: string;
};

type SectionHeaderProps = {
  title: string;
  eyebrow?: string;
  actionLabel?: string;
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

type PetAvatarProps = {
  pet: PetSummary | null;
  size?: "sm" | "md" | "lg";
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

function getPetImageSrc(pet: PetSummary | null): string | null {
  if (!pet) {
    return null;
  }

  const imagePet = pet as PetSummary & {
    imageUrl?: string | null;
    avatarUrl?: string | null;
    photoUrl?: string | null;
  };

  return imagePet.imageUrl ?? imagePet.avatarUrl ?? imagePet.photoUrl ?? null;
}

function getPetFallbackTone(species?: PetSpecies | null): string {
  if (species === "DOG") {
    return "bg-[radial-gradient(circle_at_30%_30%,#fff7ef_0%,#efd3af_50%,#ddb78a_100%)] text-[#7f5936]";
  }

  if (species === "CAT") {
    return "bg-[radial-gradient(circle_at_30%_30%,#fffdf4_0%,#eadfc2_52%,#d5c09d_100%)] text-[#6f6655]";
  }

  return "bg-[radial-gradient(circle_at_30%_30%,#f5f2ea_0%,#e4d6c1_52%,#c5ae90_100%)] text-[#725c45]";
}

function getPetFallbackLabel(species?: PetSpecies | null): string {
  if (species === "DOG") {
    return "Dog";
  }

  if (species === "CAT") {
    return "Cat";
  }

  return "Pet";
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

export function DogIcon({ className }: IconProps) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      className={iconClassName(className)}
    >
      <path
        d="M8 8.5 6 6l-1.5 3v4.5C4.5 17.09 7.41 20 11 20s6.5-2.91 6.5-6.5v-2l2-2.5-2-1.5-2 1.5H8Z"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M9.5 13h.01M14.5 13h.01M10.25 16.25c.55.5 1.13.75 1.75.75s1.2-.25 1.75-.75"
        stroke="currentColor"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function CatIcon({ className }: IconProps) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      className={iconClassName(className)}
    >
      <path
        d="m8 8-2.5-3L5 9.5v3C5 16.64 8.36 20 12.5 20S20 16.64 20 12.5v-3L18.5 5 16 8H8Z"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M10 12.5h.01M15 12.5h.01M10 16c.6.55 1.25.82 2 .82.74 0 1.4-.27 2-.82"
        stroke="currentColor"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function PetAvatar({ pet, size = "md" }: PetAvatarProps) {
  const sizeClassName =
    size === "sm"
      ? "h-10 w-10"
      : size === "lg"
        ? "h-18 w-18 min-[400px]:h-[4.75rem] min-[400px]:w-[4.75rem]"
        : "h-14 w-14";

  const iconClassNameOverride =
    size === "sm" ? "h-[1.1rem] w-[1.1rem]" : size === "lg" ? "h-8 w-8" : "h-6 w-6";
  const imageSrc = getPetImageSrc(pet);
  const fallbackLabel = getPetFallbackLabel(pet?.species);
  const initials = pet ? getInitials(pet.name) : "IP";

  return (
    <Avatar
      size={size === "md" ? "default" : size}
      className={cn(
        "ring-1 ring-white/70 shadow-[0_10px_24px_rgba(42,52,68,0.12)]",
        sizeClassName,
        getPetFallbackTone(pet?.species),
      )}
    >
      {imageSrc ? (
        <AvatarImage
          src={imageSrc}
          alt={pet ? `${pet.name} portrait` : `${fallbackLabel} portrait`}
          className="object-cover"
        />
      ) : null}
      <AvatarFallback
        className={cn(
          "bg-transparent font-semibold text-inherit",
          !imageSrc && pet?.species !== "DOG" && pet?.species !== "CAT"
            ? "text-[0.72rem] tracking-[0.16em] uppercase"
            : "",
        )}
      >
        {pet?.species === "DOG" ? (
          <DogIcon className={iconClassNameOverride} />
        ) : pet?.species === "CAT" ? (
          <CatIcon className={iconClassNameOverride} />
        ) : (
          initials
        )}
      </AvatarFallback>
    </Avatar>
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
      className={`flex w-full items-center justify-between gap-2.5 rounded-[1.05rem] border border-border-soft bg-surface/94 px-2.5 py-2 text-left text-sm font-semibold text-text-primary shadow-[0_8px_18px_rgba(42,52,68,0.04)] transition ${
        interactive ? "cursor-pointer hover:border-nav-active/35 hover:bg-surface-soft" : ""
      } focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:ring-offset-2 focus-visible:ring-offset-app-bg`}
      aria-label={pet ? `Current pet ${pet.name}` : "No pets yet"}
    >
      <span className="flex min-w-0 items-center gap-3">
        <PetAvatar pet={pet} size="sm" />
        <span className="min-w-0">
          <span className="block text-[0.62rem] font-semibold tracking-[0.18em] text-text-muted uppercase">
            Pet
          </span>
          <span className="mt-0.5 block truncate text-[0.92rem] font-semibold tracking-tight">
            {pet ? pet.name : "No pets yet"}
          </span>
          <span className="mt-0.5 flex flex-wrap items-center gap-1.5">
            {petMeta.length > 0 ? (
              <span className="truncate text-[0.72rem] font-medium text-text-secondary">
                {petMeta.join(" • ")}
              </span>
            ) : detail ? (
              <span className="text-[0.72rem] font-medium text-text-secondary">{detail}</span>
            ) : null}
          </span>
        </span>
      </span>
      <span className="flex shrink-0 items-center gap-1.5">
        {detail && petMeta.length > 0 ? (
          <span className="hidden text-[0.68rem] font-medium text-text-secondary min-[400px]:inline">
            {detail}
          </span>
        ) : null}
        {interactive ? (
          <ChevronUpDownIcon className="h-4 w-4 text-text-secondary" />
        ) : null}
      </span>
    </div>
  );
}

export function StatusPill({ children }: { children: React.ReactNode }) {
  return (
    <Badge className="inline-flex h-7 w-fit rounded-full border-0 bg-accent-monitoring/20 px-3 py-0 text-[0.72rem] font-semibold text-[#8d5c25] ring-1 ring-inset ring-[#ebc789]/45">
      {children}
    </Badge>
  );
}

export function PetHeader({ pet }: { pet: PetSummary }) {
  const ageLabel = formatApproximateAgeLabel(pet.birthDate);
  const detailChips = [formatPetSpecies(pet.species), pet.breed, ageLabel].filter(Boolean);

  return (
    <Card className="gap-0 rounded-[1.4rem] border-[#dfd6c8] bg-[linear-gradient(180deg,#fffaf4_0%,#f7edde_100%)] px-3.5 py-3.5 shadow-[0_12px_24px_rgba(40,50,66,0.06)]">
      <div className="flex items-start gap-3">
        <PetAvatar pet={pet} size="lg" />
        <div className="min-w-0 flex-1">
          <p className="truncate text-[0.66rem] font-semibold tracking-[0.2em] text-[#8a7762] uppercase">
            Current pet
          </p>
          <h1 className="mt-1 truncate text-[1.18rem] leading-none font-bold tracking-tight text-text-primary min-[380px]:text-[1.3rem]">
            {pet.name}
          </h1>
          <p className="mt-1 truncate text-[0.77rem] font-medium text-text-secondary">
            {detailChips.join(" • ")}
          </p>
          <div className="mt-3 space-y-2">
            <div className="rounded-[1rem] bg-[#fff7ed]/92 px-3 py-2 shadow-[inset_0_1px_0_rgba(255,255,255,0.65)] ring-1 ring-inset ring-[#efd9b7]">
              <p className="text-[1rem] leading-5 font-semibold tracking-tight text-[#3f3124]">
                On track today
              </p>
              <p className="mt-0.5 text-[0.72rem] leading-4 text-[#7d6750]">
                Dinner at 6:00 PM is the next key task.
              </p>
            </div>
            <StatusPill>Stable routine</StatusPill>
          </div>
        </div>
      </div>
    </Card>
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
    <Card className="gap-0 rounded-[1.7rem] border-border-soft bg-surface px-4 py-4 sm:px-5">
      <p className="text-[0.72rem] font-semibold tracking-[0.18em] text-text-muted uppercase">
        Pet overview
      </p>
      <p className="mt-2 text-sm leading-6 text-text-secondary">
        {facts.length > 0
          ? `${pet.name}'s profile is grounded with ${facts.join(" • ")}.`
          : `${pet.name} is part of your iPetzo account and ready for care tracking.`}
      </p>
    </Card>
  );
}

export function SectionHeader({ title, eyebrow, actionLabel }: SectionHeaderProps) {
  return (
    <div className="flex items-end justify-between gap-3 px-0.5">
      <div className="space-y-0.5">
        {eyebrow ? (
          <p className="text-[0.61rem] font-semibold tracking-[0.18em] text-text-muted uppercase">
            {eyebrow}
          </p>
        ) : null}
        <h2 className="text-[0.98rem] font-semibold tracking-tight text-text-primary">{title}</h2>
      </div>
      {actionLabel ? (
        <span className="text-[0.68rem] font-semibold text-[#6b7ea6]">{actionLabel}</span>
      ) : null}
    </div>
  );
}

export function TaskCard({ icon, title, detail }: TaskCardProps) {
  return (
    <Card className="gap-0 rounded-[1rem] border-border-soft bg-surface px-2.5 py-2.5 shadow-[0_8px_18px_rgba(42,52,68,0.035)]">
      <div className="flex items-center gap-2.5">
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-[0.9rem] bg-[#eef3fb] text-[#5671a0]">
          {icon}
        </div>
        <div className="min-w-0">
          <p className="truncate text-[0.82rem] leading-4 font-semibold text-text-primary">
            {title}
          </p>
          <p className="mt-0.5 text-[0.68rem] leading-4 font-medium text-text-secondary">
            {detail}
          </p>
        </div>
      </div>
    </Card>
  );
}

export function FeedRow({ actor, action }: FeedRowProps) {
  return (
    <Card className="flex-row items-center gap-2.5 rounded-[1rem] border-border-soft bg-surface px-2.5 py-2.5 shadow-none">
      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#eaf0f5] text-[0.68rem] font-semibold text-[#5d6f86]">
        {getInitials(actor)}
      </div>
      <p className="text-[0.78rem] leading-[1.15rem] text-text-secondary">
        <span className="font-semibold text-text-primary">{actor}</span>{" "}
        {action}
      </p>
    </Card>
  );
}

export function ConcernCard({ title }: ConcernCardProps) {
  return (
    <Card className="gap-0 rounded-[1.05rem] border-[#ead9b8] bg-[linear-gradient(180deg,#fffaf0_0%,#fff5e2_100%)] px-3 py-2.5 shadow-none">
      <div className="flex items-center gap-2.5">
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-[0.9rem] bg-accent-warning/20 text-[#a06d17]">
          <AlertIcon className="h-[1.05rem] w-[1.05rem]" />
        </div>
        <div className="min-w-0 flex-1">
          <p className="truncate text-[0.86rem] font-semibold text-text-primary">{title}</p>
          <p className="mt-0.5 text-[0.71rem] leading-4 text-text-secondary">
            Being monitored today.
          </p>
        </div>
      </div>
    </Card>
  );
}

export function QuickActionButton({
  label,
  tone,
  icon,
}: QuickActionButtonProps) {
  return (
    <Button
      type="button"
      variant="outline"
      className="flex h-auto items-start justify-center rounded-[1rem] border-border-soft/70 bg-white/78 px-1.5 py-2 text-center text-inherit shadow-none hover:bg-surface-soft focus-visible:ring-focus-ring focus-visible:ring-offset-surface"
      aria-label={`${label} placeholder`}
    >
      <span className="flex flex-col items-center gap-1.5">
        <span
          className={`flex h-10 w-10 items-center justify-center rounded-[0.95rem] ${quickActionToneClass(tone)}`}
        >
          {icon}
        </span>
        <span className="max-w-[4.3rem] text-[0.69rem] leading-4 font-semibold text-text-primary">
          {label}
        </span>
      </span>
    </Button>
  );
}

export function QuickActionsPanel() {
  return (
    <Card className="gap-0 rounded-[1.1rem] border-border-soft bg-surface px-2 py-2 shadow-[0_10px_22px_rgba(42,52,68,0.04)]">
      <div className="grid grid-cols-4 gap-1.5">
        <QuickActionButton
          label="Voice"
          tone="blue"
          icon={<MicIcon />}
        />
        <QuickActionButton
          label="Photo"
          tone="blue"
          icon={<CameraIcon />}
        />
        <QuickActionButton
          label="Symptom"
          tone="green"
          icon={<SparkIcon />}
        />
        <QuickActionButton label="Note" tone="red" icon={<NoteIcon />} />
      </div>
    </Card>
  );
}

export function PlaceholderTabScreen({
  title,
  description,
}: PlaceholderTabScreenProps) {
  return (
    <section className="space-y-3.5">
      <Card className="gap-0 rounded-[1.25rem] border-border-soft bg-[linear-gradient(180deg,#fffdf9_0%,#f6efe4_100%)] px-4 py-3.5">
        <p className="text-[0.63rem] font-semibold tracking-[0.18em] text-text-muted uppercase">
          {title}
        </p>
        <h1 className="mt-1 text-[1.35rem] font-bold tracking-tight text-text-primary">
          {title} is staged for the next lane
        </h1>
        <p className="mt-2 text-[0.88rem] leading-5 text-text-secondary">
          {description}
        </p>
      </Card>

      <Card className="gap-0 rounded-[1.25rem] border-border-soft bg-surface px-4 py-4">
        <Card className="gap-0 rounded-[1rem] border-border-soft bg-surface-muted px-3.5 py-3.5 shadow-none">
          <p className="text-sm font-semibold text-text-primary">
            Shell continuity is in place.
          </p>
          <p className="mt-1.5 text-[0.84rem] leading-5 text-text-secondary">
            Routing, spacing, and the compact frame are already aligned with Today, so
            product-specific content can land here without another shell rewrite.
          </p>
        </Card>

        <Button
          asChild
          variant="outline"
          className="mt-4 inline-flex rounded-full border-border-soft bg-surface-panel px-4 py-2 text-sm font-semibold text-text-primary shadow-none hover:border-nav-active/45 hover:bg-surface-panel"
        >
          <Link href="/app">Return to Today</Link>
        </Button>
      </Card>
    </section>
  );
}
