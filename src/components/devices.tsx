import { PhoneFrame } from "./product-stage";

export function DeviceShowcase() {
  return (
    <section className="relative overflow-hidden bg-navy py-20 text-white lg:py-28">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-0 h-64 w-[640px] -translate-x-1/2 rounded-full bg-blue/30 blur-3xl" />
      </div>
      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-cyan">La plataforma</p>
          <h2 className="mt-3 font-display text-4xl font-semibold tracking-tight sm:text-5xl">
            Vende en caja, factura y responde a la DIAN desde el mismo lugar.
          </h2>
        </div>
        <div className="mt-14 grid gap-10 md:grid-cols-3">
          <div>
            <PhoneFrame title="Factura">
              <div className="grid gap-2 text-xs text-white/75">
                <div className="rounded-xl bg-white/8 px-3 py-2 ring-1 ring-white/10">
                  <p className="text-white">FV-10428</p>
                  <p>Comercial Andina</p>
                </div>
                <div className="rounded-xl bg-emerald-400/15 px-3 py-2 text-emerald-200">Aceptada por la DIAN</div>
                <p className="font-display text-2xl font-semibold text-white">$960.000</p>
              </div>
            </PhoneFrame>
            <p className="mt-4 text-center text-sm text-white/65">Documento validado, listo para tu cliente.</p>
          </div>
          <div>
            <PhoneFrame title="Punto de venta">
              <div className="grid gap-2 text-xs">
                <div className="rounded-xl bg-white px-3 py-2 text-ink">
                  <div className="flex justify-between"><span>Café 500 g</span><span>$28.000</span></div>
                  <div className="mt-1 flex justify-between text-muted"><span>Pan x 2</span><span>$9.500</span></div>
                </div>
                <div className="rounded-full bg-gradient-to-r from-cyan to-blue py-2 text-center text-xs font-semibold">
                  Cobrar $37.500
                </div>
              </div>
            </PhoneFrame>
            <p className="mt-4 text-center text-sm text-white/65">Lectores de código y cajón monedero.</p>
          </div>
          <div>
            <PhoneFrame title="Tu espacio">
              <div className="grid gap-2 text-xs text-white/80">
                <p className="rounded-xl bg-white/8 px-3 py-2 ring-1 ring-white/10">tumarca.invoix.co</p>
                <p className="rounded-xl bg-white/8 px-3 py-2 ring-1 ring-white/10">Stock de café: 42 und.</p>
                <p className="rounded-xl bg-white/8 px-3 py-2 ring-1 ring-white/10">3 usuarios activos</p>
              </div>
            </PhoneFrame>
            <p className="mt-4 text-center text-sm text-white/65">Subdominio propio, servidor aislado.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
