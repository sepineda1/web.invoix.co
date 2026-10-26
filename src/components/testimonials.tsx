type TestimonialView = {
  id: string;
  quote: string;
  name: string;
  role: string;
  city: string;
};

export function Testimonials({ items }: { items: TestimonialView[] }) {
  return (
    <section className="bg-white py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-blue">Confianza</p>
          <h2 className="mt-3 font-display text-4xl font-semibold tracking-tight text-ink sm:text-5xl">
            Negocios reales, resultados reales.
          </h2>
        </div>
        <div className="mt-12 grid gap-5 lg:grid-cols-3">
          {items.map((item) => (
            <figure key={item.id} className="flex flex-col rounded-[28px] border border-line bg-mist p-7">
              <span className="font-display text-5xl leading-none text-blue/30" aria-hidden>
                “
              </span>
              <blockquote className="mt-2 flex-1 text-base leading-7 text-ink">{item.quote}</blockquote>
              <figcaption className="mt-6 flex items-center gap-3">
                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-cyan to-blue font-display text-sm font-semibold text-white">
                  {item.name
                    .split(" ")
                    .slice(0, 2)
                    .map((part) => part[0])
                    .join("")}
                </span>
                <span>
                  <span className="block text-sm font-semibold text-ink">{item.name}</span>
                  <span className="block text-sm text-muted">
                    {item.role} · {item.city}
                  </span>
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
