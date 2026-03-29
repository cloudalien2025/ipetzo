import "server-only";

import { auth, currentUser } from "@clerk/nextjs/server";

import type { AppUser } from "@/generated/prisma/client";
import { isClerkConfigured } from "@/lib/auth/clerk";
import { getPrismaClient, hasRuntimeDatabaseUrl } from "@/server/db/prisma";

type ClerkIdentity = {
  clerkUserId: string;
  displayName: string | null;
  email: string;
};

export type AuthenticatedSession = {
  isAuthenticated: boolean;
  clerkUserId: string | null;
  sessionId: string | null;
};

function getDisplayName(user: Awaited<ReturnType<typeof currentUser>>): string | null {
  if (!user) {
    return null;
  }

  const fullName = [user.firstName, user.lastName].filter(Boolean).join(" ").trim();

  if (fullName) {
    return fullName;
  }

  return user.username ?? null;
}

function getPrimaryEmail(user: NonNullable<Awaited<ReturnType<typeof currentUser>>>): string {
  const primaryEmail =
    user.emailAddresses.find(
      (emailAddress) => emailAddress.id === user.primaryEmailAddressId,
    ) ?? user.emailAddresses[0];

  const email = primaryEmail?.emailAddress?.trim().toLowerCase();

  if (!email) {
    throw new Error("Authenticated Clerk user is missing a usable email address.");
  }

  return email;
}

async function getCurrentClerkIdentity(): Promise<ClerkIdentity | null> {
  if (!isClerkConfigured()) {
    return null;
  }

  const session = await auth();

  if (!session.userId) {
    return null;
  }

  const user = await currentUser();

  if (!user) {
    return null;
  }

  return {
    clerkUserId: user.id,
    displayName: getDisplayName(user),
    email: getPrimaryEmail(user),
  };
}

async function syncAppUser(identity: ClerkIdentity): Promise<AppUser> {
  const prisma = getPrismaClient();
  const findMatches = () =>
    prisma.appUser.findMany({
      where: {
        OR: [
          { externalAuthId: identity.clerkUserId },
          { email: identity.email },
        ],
      },
      take: 2,
    });
  const matches = await findMatches();

  const existingByExternalAuthId = matches.find(
    (appUser) => appUser.externalAuthId === identity.clerkUserId,
  );
  const existingByEmail = matches.find((appUser) => appUser.email === identity.email);

  if (
    existingByExternalAuthId &&
    existingByEmail &&
    existingByExternalAuthId.id !== existingByEmail.id
  ) {
    throw new Error(
      "Authenticated Clerk user matched different app_users rows by external_auth_id and email.",
    );
  }

  const existingAppUser = existingByExternalAuthId ?? existingByEmail;

  if (existingAppUser) {
    return prisma.appUser.update({
      where: {
        id: existingAppUser.id,
      },
      data: {
        displayName: identity.displayName,
        email: identity.email,
        externalAuthId: identity.clerkUserId,
      },
    });
  }

  try {
    return await prisma.appUser.create({
      data: {
        displayName: identity.displayName,
        email: identity.email,
        externalAuthId: identity.clerkUserId,
      },
    });
  } catch (error) {
    if (
      typeof error === "object" &&
      error !== null &&
      "code" in error &&
      error.code === "P2002"
    ) {
      const conflictedAppUser = await findMatches().then((conflictMatches) => {
        const conflictedByExternalAuthId = conflictMatches.find(
          (appUser) => appUser.externalAuthId === identity.clerkUserId,
        );
        const conflictedByEmail = conflictMatches.find(
          (appUser) => appUser.email === identity.email,
        );

        return conflictedByExternalAuthId ?? conflictedByEmail ?? null;
      });

      if (conflictedAppUser) {
        return prisma.appUser.update({
          where: {
            id: conflictedAppUser.id,
          },
          data: {
            displayName: identity.displayName,
            email: identity.email,
            externalAuthId: identity.clerkUserId,
          },
        });
      }
    }

    throw error;
  }
}

export async function getAuthenticatedSession(): Promise<AuthenticatedSession> {
  if (!isClerkConfigured()) {
    return {
      isAuthenticated: false,
      clerkUserId: null,
      sessionId: null,
    };
  }

  const session = await auth();

  return {
    isAuthenticated: Boolean(session.userId),
    clerkUserId: session.userId ?? null,
    sessionId: session.sessionId ?? null,
  };
}

export async function ensureCurrentAppUser(): Promise<AppUser | null> {
  if (!hasRuntimeDatabaseUrl()) {
    return null;
  }

  const identity = await getCurrentClerkIdentity();

  if (!identity) {
    return null;
  }

  return syncAppUser(identity);
}

export async function getCurrentAuthenticatedAppUser(): Promise<AppUser | null> {
  return ensureCurrentAppUser();
}
