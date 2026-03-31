"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import {
  PatternsIcon,
  ProtectIcon,
  TimelineIcon,
  TodayIcon,
  VillageIcon,
} from "@/components/layout/app-shell-primitives";

type AppNavItem = {
  href: string;
  label: string;
  icon: (props: { className?: string }) => React.ReactNode;
};

const appNavItems: AppNavItem[] = [
  {
    href: "/app",
    label: "Today",
    icon: TodayIcon,
  },
  {
    href: "/app/timeline",
    label: "Timeline",
    icon: TimelineIcon,
  },
  {
    href: "/app/village",
    label: "Village",
    icon: VillageIcon,
  },
  {
    href: "/app/protect",
    label: "Protect",
    icon: ProtectIcon,
  },
  {
    href: "/app/patterns",
    label: "Patterns",
    icon: PatternsIcon,
  },
];

function isItemActive(pathname: string, href: string): boolean {
  if (href === "/app") {
    return pathname === href || pathname.startsWith("/app/pet");
  }

  return pathname.startsWith(href);
}

export function AppShellNav() {
  const pathname = usePathname();

  return (
    <nav
      aria-label="Bottom navigation"
      className="sticky bottom-0 z-20 mt-auto border-t border-border-soft bg-[rgba(248,244,237,0.94)] px-2 pt-2 pb-[calc(0.5rem+env(safe-area-inset-bottom))] shadow-[var(--shadow-nav)] backdrop-blur-xl sm:px-4"
    >
      <Card className="grid grid-cols-5 gap-1 rounded-[1.25rem] border-border-soft bg-surface/96 px-1 py-1 shadow-none">
        {appNavItems.map((item) => {
          const active = isItemActive(pathname, item.href);
          const Icon = item.icon;

          return (
            <Button
              key={item.href}
              asChild
              variant="ghost"
              aria-current={active ? "page" : undefined}
              className={cn(
                "h-auto min-h-[3.6rem] flex-col gap-1 rounded-[1rem] px-0.5 py-1.5 text-center shadow-none focus-visible:ring-focus-ring focus-visible:ring-offset-surface",
                active
                  ? "bg-[#eef3ff] text-nav-active hover:bg-[#eef3ff] shadow-[inset_0_1px_0_rgba(255,255,255,0.7),0_10px_18px_rgba(91,116,166,0.12)]"
                  : "text-nav-inactive hover:bg-surface-soft",
              )}
            >
              <Link href={item.href}>
                <span
                  className={cn(
                    "flex h-8 w-8 items-center justify-center rounded-full",
                    active ? "bg-white/90 shadow-[0_6px_16px_rgba(91,116,166,0.14)]" : "",
                  )}
                >
                  <Icon className="h-[1.05rem] w-[1.05rem]" />
                </span>
                <span
                  className={cn(
                    "text-[0.63rem] leading-none",
                    active ? "font-semibold" : "font-medium",
                  )}
                >
                  {item.label}
                </span>
              </Link>
            </Button>
          );
        })}
      </Card>
    </nav>
  );
}
