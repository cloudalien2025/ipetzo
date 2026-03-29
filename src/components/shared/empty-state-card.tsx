import Link from "next/link";

type EmptyStateAction = {
  href: string;
  label: string;
};

type EmptyStateCardProps = {
  label: string;
  title: string;
  description: string;
  action?: EmptyStateAction;
  secondaryAction?: EmptyStateAction;
};

export function EmptyStateCard({
  label,
  title,
  description,
  action,
  secondaryAction,
}: EmptyStateCardProps) {
  return (
    <section className="rounded-[2rem] border border-emerald-950/10 bg-white/90 p-6 shadow-[0_18px_60px_rgba(15,23,42,0.06)] backdrop-blur sm:p-8">
      <p className="text-[0.72rem] font-semibold tracking-[0.18em] text-emerald-800 uppercase">
        {label}
      </p>
      <h3 className="mt-3 text-2xl font-semibold tracking-tight text-slate-950">
        {title}
      </h3>
      <p className="mt-3 max-w-2xl text-base leading-7 text-slate-600">
        {description}
      </p>

      {action || secondaryAction ? (
        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          {action ? (
            <Link
              href={action.href}
              className="inline-flex items-center justify-center rounded-full bg-emerald-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-emerald-800"
            >
              {action.label}
            </Link>
          ) : null}
          {secondaryAction ? (
            <Link
              href={secondaryAction.href}
              className="inline-flex items-center justify-center rounded-full border border-slate-300 px-5 py-3 text-sm font-semibold text-slate-700 transition hover:border-slate-400"
            >
              {secondaryAction.label}
            </Link>
          ) : null}
        </div>
      ) : null}
    </section>
  );
}
