import { PetSpeciesBadge } from "@/components/layout/app-shell-primitives";
import type { PetSummary } from "@/server/services/pets";

function formatText(value: string | null): string {
  return value?.trim() ? value : "Not added yet";
}

function formatBirthDate(birthDate: Date | null): string {
  if (!birthDate) {
    return "Not added yet";
  }

  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(birthDate);
}

function formatApproximateAge(birthDate: Date | null, now = new Date()): string {
  if (!birthDate) {
    return "Not added yet";
  }

  let years = now.getUTCFullYear() - birthDate.getUTCFullYear();
  let months = now.getUTCMonth() - birthDate.getUTCMonth();
  const dayDifference = now.getUTCDate() - birthDate.getUTCDate();

  if (dayDifference < 0) {
    months -= 1;
  }

  if (months < 0) {
    years -= 1;
    months += 12;
  }

  if (years > 1) {
    return `About ${years} years old`;
  }

  if (years === 1) {
    return "About 1 year old";
  }

  if (months > 1) {
    return `About ${months} months old`;
  }

  if (months === 1) {
    return "About 1 month old";
  }

  return "Less than a month old";
}

function formatWeight(pet: PetSummary): string {
  if (!pet.weightValue) {
    return "Not added yet";
  }

  return `${pet.weightValue.toString()} ${pet.weightUnit ?? "lb"}`;
}

function DetailCard({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <article className="rounded-[var(--radius-card)] border border-border-subtle bg-surface px-4 py-3.5">
      <p className="text-xs font-semibold uppercase tracking-[0.14em] text-text-secondary">
        {label}
      </p>
      <p className="mt-2 text-base font-semibold text-text-primary">{value}</p>
    </article>
  );
}

export function CurrentPetProfile({ pet }: { pet: PetSummary }) {
  return (
    <div className="space-y-5">
      <section className="rounded-[var(--radius-surface)] border border-border-subtle bg-surface px-4 py-5 sm:px-5">
        <div className="space-y-3">
          <div className="flex items-start justify-between gap-4">
            <div className="min-w-0">
              <p className="text-sm font-medium text-text-secondary">Current pet profile</p>
              <h1 className="mt-2 text-[2rem] leading-tight font-bold tracking-tight text-text-primary">
                {pet.name}
              </h1>
            </div>
            <PetSpeciesBadge species={pet.species} />
          </div>

          <p className="max-w-[28rem] text-sm leading-6 text-text-secondary">
            A calm home for the identity details you have for {pet.name}. This profile
            follows the signed-in shell&apos;s current pet.
          </p>
        </div>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-semibold tracking-tight text-text-primary">
          Identity basics
        </h2>
        <div className="grid grid-cols-1 gap-3 min-[420px]:grid-cols-2">
          <DetailCard label="Species" value={pet.species === "DOG" ? "Dog" : pet.species === "CAT" ? "Cat" : "Pet"} />
          <DetailCard label="Sex" value={formatText(pet.sex)} />
          <DetailCard label="Breed" value={formatText(pet.breed)} />
          <DetailCard label="Birth date" value={formatBirthDate(pet.birthDate)} />
          <DetailCard label="Approximate age" value={formatApproximateAge(pet.birthDate)} />
          <DetailCard label="Weight" value={formatWeight(pet)} />
        </div>
      </section>

      <section className="rounded-[var(--radius-surface)] border border-border-subtle bg-surface px-4 py-4 sm:px-5">
        <p className="text-sm font-semibold text-text-primary">Grounded profile</p>
        <p className="mt-2 text-sm leading-6 text-text-secondary">
          This screen is intentionally read-only for now. It reflects only server-owned
          pet data for the authenticated user and updates when the shell&apos;s current pet
          changes.
        </p>
      </section>
    </div>
  );
}
