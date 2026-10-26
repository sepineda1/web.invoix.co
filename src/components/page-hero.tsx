export function PageHero({ eyebrow, title, description }: { eyebrow: string; title: string; description: string }) {
  return (
    <section className="relative overflow-hidden bg-navy text-white">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-10 top-0 h-56 w-56 rounded-full bg-blue/30 blur-3xl" />
        <div className="absolute right-0 top-0 h-56 w-56 rounded-full bg-cyan/20 blur-3xl" />
      </div>
      <div className="relative mx-auto max-w-7xl px-5 pb-16 pt-32 sm:px-8 lg:pt-36">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-cyan">{eyebrow}</p>
        <h1 className="mt-3 max-w-3xl font-display text-4xl font-semibold tracking-tight sm:text-5xl">{title}</h1>
        <p className="mt-4 max-w-2xl text-lg leading-8 text-white/70">{description}</p>
      </div>
    </section>
  );
}
