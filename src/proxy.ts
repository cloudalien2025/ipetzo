import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

import { isClerkConfigured } from "@/lib/auth/clerk";

const isProtectedRoute = createRouteMatcher(["/app(.*)"]);

const clerkProxy = clerkMiddleware(
  async (auth, req) => {
    if (isProtectedRoute(req)) {
      await auth.protect();
    }
  },
  {
    signInUrl: "/sign-in",
    signUpUrl: "/sign-up",
  },
);

export default function proxy(...args: Parameters<typeof clerkProxy>) {
  if (!isClerkConfigured()) {
    return NextResponse.next();
  }

  return clerkProxy(...args);
}

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};
