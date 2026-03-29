import { ClerkProvider } from "@clerk/nextjs";
import type { Metadata } from "next";

import { isClerkConfigured } from "@/lib/auth/clerk";
import "./globals.css";

export const metadata: Metadata = {
  title: "iPetzo",
  description: "AI operating system for pet parents",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const content = isClerkConfigured() ? (
    <ClerkProvider>{children}</ClerkProvider>
  ) : (
    children
  );

  return (
    <html lang="en" className="h-full antialiased">
      <body className="flex min-h-full flex-col">{content}</body>
    </html>
  );
}
