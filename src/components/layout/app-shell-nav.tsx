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
      className="sticky bottom-0 z-20 mt-auto border-t border-border-soft bg-[rgba(248,244,237,0.92)] px-2 pt-2 pb-[calc(0.75rem+env(safe-area-inset-bottom))] shadow-[var(--shadow-nav)] backdrop-blur-xl min-[380px]:px-3 min-[380px]:pt-3 min-[380px]:pb-[calc(0.9rem+env(safe-area-inset-bottom))] sm:px-4"
    >
      <div className="grid grid-cols-5 gap-0.5 rounded-[1.55rem] border border-border-soft bg-surface/96 px-1 py-1 min-[380px]:gap-1 min-[380px]:rounded-[1.9rem] min-[380px]:px-1.5 min-[380px]:py-1.5">
        {appNavItems.map((item) => {
          const active = isItemActive(pathname, item.href);
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              aria-current={active ? "page" : undefined}
              className={`flex min-h-[3.85rem] flex-col items-center justify-center gap-0.5 rounded-[1.15rem] px-0.5 py-1.5 text-center transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:ring-offset-2 focus-visible:ring-offset-surface min-[380px]:min-h-[4.6rem] min-[380px]:gap-1.5 min-[380px]:rounded-[1.45rem] min-[380px]:px-1 min-[380px]:py-2 ${
                active
                  ? "bg-[#eef3ff] text-nav-active shadow-[inset_0_1px_0_rgba(255,255,255,0.7)]"
                  : "text-nav-inactive hover:bg-surface-soft"
              }`}
            >
              <span
                className={`flex h-8 w-8 items-center justify-center rounded-full min-[380px]:h-9 min-[380px]:w-9 ${
                  active ? "bg-white/90 shadow-[0_6px_16px_rgba(91,116,166,0.14)]" : ""
                }`}
              >
                <Icon className="h-[1.125rem] w-[1.125rem] min-[380px]:h-5 min-[380px]:w-5" />
              </span>
              <span
                className={`text-[0.62rem] leading-none min-[380px]:text-[0.72rem] ${
                  active ? "font-semibold" : "font-medium"
                }`}
              >
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
