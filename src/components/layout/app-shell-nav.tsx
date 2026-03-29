"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

type AppNavItem = {
  href: string;
  label: string;
  shortLabel: string;
};

const appNavItems: AppNavItem[] = [
  {
    href: "/app",
    label: "Home",
    shortLabel: "Home",
  },
  {
    href: "/app/pets",
    label: "Pets",
    shortLabel: "Pets",
  },
  {
    href: "/app/timeline",
    label: "Timeline",
    shortLabel: "Timeline",
  },
  {
    href: "/app/settings",
    label: "Settings",
    shortLabel: "Settings",
  },
];

function isItemActive(pathname: string, href: string): boolean {
  return href === "/app" ? pathname === href : pathname.startsWith(href);
}

export function AppShellNav() {
  const pathname = usePathname();

  return (
    <>
      <nav
        aria-label="Primary"
        className="hidden rounded-[1.75rem] border border-white/70 bg-white/85 p-2 shadow-[0_18px_55px_rgba(15,23,42,0.08)] backdrop-blur md:block"
      >
        <div className="flex items-center gap-2">
          {appNavItems.map((item) => {
            const active = isItemActive(pathname, item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={`rounded-full px-4 py-2.5 text-sm font-semibold transition ${
                  active
                    ? "bg-emerald-900 text-white shadow-[0_12px_30px_rgba(6,78,59,0.28)]"
                    : "text-slate-600 hover:bg-emerald-50 hover:text-emerald-950"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </div>
      </nav>

      <nav
        aria-label="Bottom navigation"
        className="fixed inset-x-4 bottom-4 z-20 rounded-[1.75rem] border border-white/70 bg-white/92 p-2 shadow-[0_22px_70px_rgba(15,23,42,0.14)] backdrop-blur md:hidden"
      >
        <div className="grid grid-cols-4 gap-1">
          {appNavItems.map((item) => {
            const active = isItemActive(pathname, item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={`rounded-2xl px-2 py-3 text-center text-[0.72rem] font-semibold transition ${
                  active
                    ? "bg-emerald-900 text-white"
                    : "text-slate-600 hover:bg-emerald-50 hover:text-emerald-950"
                }`}
              >
                {item.shortLabel}
              </Link>
            );
          })}
        </div>
      </nav>
    </>
  );
}
