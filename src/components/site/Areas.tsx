import { useState } from "react";
import { ArrowRight, X } from "lucide-react";
import { AREAS, SITE } from "@/lib/site";

export function Areas() {
  const [active, setActive] = useState<(typeof AREAS)[number] | null>(null);

  return (
    <section id="areas" className="relative py-28 overflow-hidden">
      <div className="deco-circle" style={{ width: 360, height: 360, top: 80, right: -160 }} />
      <div className="deco-circle" style={{ width: 200, height: 200, bottom: 40, left: -80 }} />

      <div className="mx-auto max-w-7xl px-6">
        <div className="text-center reveal">
          <span className="inline-block rounded-full border border-gold/40 bg-gold/5 px-4 py-1.5 text-[10px] tracking-[0.22em] uppercase text-gold">
            Áreas de Atuação
          </span>
          <h2 className="mt-5 font-serif text-4xl md:text-5xl">
            Experiência que <span className="italic gold-text">Defende</span>
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-foreground/65">
            Sete áreas de atuação consolidadas, com método, técnica e atendimento
            humanizado em cada caso.
          </p>
        </div>

        {/* Mobile: horizontal swipe carousel */}
        <div className="mt-12 sm:hidden -mx-6 px-6 flex gap-4 overflow-x-auto snap-x snap-mandatory pb-4 scrollbar-hide">
          {AREAS.map((a) => (
            <AreaCard key={a.id} area={a} onOpen={setActive} className="snap-center shrink-0 w-[78%]" />
          ))}
        </div>

        {/* Desktop / tablet grid */}
        <div className="mt-16 hidden sm:grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {AREAS.map((a) => (
            <AreaCard key={a.id} area={a} onOpen={setActive} />
          ))}
        </div>
      </div>

      {active && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
          onClick={() => setActive(null)}
        >
          <div
            className="relative max-w-2xl w-full bg-card border border-gold/40 rounded-3xl overflow-hidden shadow-elegant"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setActive(null)}
              className="absolute top-4 right-4 z-10 h-10 w-10 rounded-full bg-background/80 flex items-center justify-center hover:text-gold"
              aria-label="Fechar"
            >
              <X size={20} />
            </button>
            <div className="h-56 relative">
              <img src={active.image} alt={active.title} className="h-full w-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-card to-transparent" />
            </div>
            <div className="p-8">
              <h3 className="font-serif text-3xl">
                {active.title.split(" ")[0]}{" "}
                <span className="italic gold-text">
                  {active.title.split(" ").slice(1).join(" ")}
                </span>
              </h3>
              <p className="mt-4 text-foreground/75 leading-relaxed">{active.full}</p>

              {/* Success rate bar */}
              <div className="mt-6">
                <div className="flex items-center justify-between text-xs uppercase tracking-[0.2em] text-foreground/60">
                  <span>Taxa de Êxito</span>
                  <span className="text-gold">96%</span>
                </div>
                <div className="mt-2 h-1.5 rounded-full bg-foreground/10 overflow-hidden">
                  <div
                    className="h-full rounded-full"
                    style={{
                      width: "96%",
                      background: "linear-gradient(90deg, #c4953a, #dbb568)",
                      animation: "growBar 1.2s ease-out",
                    }}
                  />
                </div>
              </div>

              <a
                href={SITE.whatsappUrl}
                target="_blank"
                rel="noreferrer"
                className="mt-6 inline-flex items-center gap-2 rounded-full gradient-gold px-6 py-3 text-sm font-medium text-primary-foreground shadow-gold"
              >
                Falar com o Dr. Merson <ArrowRight size={16} />
              </a>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes growBar {
          from { width: 0%; }
          to { width: 96%; }
        }
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { scrollbar-width: none; }
      `}</style>
    </section>
  );
}

function AreaCard({
  area,
  onOpen,
  className = "",
}: {
  area: (typeof AREAS)[number];
  onOpen: (a: (typeof AREAS)[number]) => void;
  className?: string;
}) {
  return (
    <button
      onClick={() => onOpen(area)}
      className={`group reveal text-left rounded-2xl overflow-hidden border border-border bg-card hover:border-gold/60 transition-all shadow-elegant hover:-translate-y-1 ${className}`}
    >
      <div className="relative h-44 overflow-hidden">
        <img
          src={area.image}
          alt={area.title}
          loading="lazy"
          className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-card via-card/30 to-transparent" />
      </div>
      <div className="p-6">
        <h3 className="font-serif text-2xl">{area.title}</h3>
        <p className="mt-3 text-sm text-foreground/70 leading-relaxed">{area.short}</p>
        <span className="mt-5 inline-flex items-center gap-2 text-sm text-gold group-hover:gap-3 transition-all">
          Saiba Mais <ArrowRight size={16} />
        </span>
      </div>
    </button>
  );
}
