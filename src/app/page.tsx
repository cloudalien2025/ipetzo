export default function Home() {
  return (
    <main className="flex min-h-screen items-center bg-[radial-gradient(circle_at_top,#f6fbf6_0%,#eef5ef_45%,#e8f0ea_100%)] px-6 py-16 text-slate-900">
      <section className="mx-auto w-full max-w-5xl rounded-[2rem] border border-emerald-950/10 bg-white/90 p-10 shadow-[0_24px_100px_rgba(15,23,42,0.10)] backdrop-blur sm:p-14 lg:p-16">
        <div className="mb-8 inline-flex rounded-full border border-emerald-800/10 bg-emerald-50 px-4 py-1.5 text-sm font-semibold tracking-[0.18em] text-emerald-900 uppercase">
          The iPetzo app foundation is live.
        </div>
        <h1 className="max-w-3xl text-5xl font-semibold tracking-tight text-balance sm:text-6xl">
          iPetzo
        </h1>
        <p className="mt-6 max-w-3xl text-xl leading-8 text-slate-700 sm:text-2xl">
          The AI operating system for pet parents.
        </p>
        <p className="mt-5 max-w-3xl text-base leading-8 text-slate-600 sm:text-lg">
          Track health. Understand behavior. Organize care. Get smarter next
          steps for the pets you love.
        </p>
        <div className="mt-10 grid gap-4 sm:grid-cols-2">
          <div className="rounded-2xl border border-slate-200 bg-slate-50/80 px-5 py-4">
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-slate-500">
              Launch
            </p>
            <p className="mt-2 text-base leading-7 text-slate-700">
              Launching first for dogs and cats.
            </p>
          </div>
          <div className="rounded-2xl border border-emerald-900/10 bg-emerald-50/70 px-5 py-4">
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-emerald-800">
              Status
            </p>
            <p className="mt-2 text-base leading-7 text-emerald-950">
              The iPetzo app foundation is live.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
