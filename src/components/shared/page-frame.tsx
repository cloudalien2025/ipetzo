type PageFrameProps = {
  eyebrow?: string;
  title: string;
  description: string;
  children: React.ReactNode;
};

export function PageFrame({
  eyebrow,
  title,
  description,
  children,
}: PageFrameProps) {
  return (
    <div className="space-y-6">
      <section className="rounded-[2rem] border border-white/70 bg-white/88 p-6 shadow-[0_20px_70px_rgba(15,23,42,0.07)] backdrop-blur sm:p-8">
        {eyebrow ? (
          <p className="text-[0.72rem] font-semibold tracking-[0.18em] text-emerald-800 uppercase">
            {eyebrow}
          </p>
        ) : null}
        <h2 className="mt-3 text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">
          {title}
        </h2>
        <p className="mt-3 max-w-3xl text-base leading-7 text-slate-600">
          {description}
        </p>
      </section>

      {children}
    </div>
  );
}
