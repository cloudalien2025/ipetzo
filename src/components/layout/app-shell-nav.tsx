"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

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
  return href === "/app" ? pathname === href : pathname.startsWith(href);
}

export function AppShellNav() {
  const pathname = usePathname();

  return (
    <nav
      aria-label="Bottom navigation"
      className="sticky bottom-0 z-20 mt-auto rounded-[1.6rem] border border-border-subtle bg-surface/95 px-2 pt-2 pb-[calc(0.75rem+env(safe-area-inset-bottom))] backdrop-blur"
    >
      <div className="grid grid-cols-5 gap-1">
        {appNavItems.map((item) => {
          const active = isItemActive(pathname, item.href);
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              aria-current={active ? "page" : undefined}
              className={`flex min-h-16 flex-col items-center justify-center gap-1 rounded-[1.15rem] px-1 py-2 text-center transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:ring-offset-2 focus-visible:ring-offset-surface ${
                active
                  ? "bg-[#edf2ff] text-nav-active"
                  : "text-nav-inactive hover:bg-surface-panel"
              }`}
            >
              <Icon className="h-5 w-5" />
              <span className="text-[0.72rem] font-medium">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
