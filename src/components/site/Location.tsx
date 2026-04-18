import { MapPin, ArrowRight } from "lucide-react";
import { SITE } from "@/lib/site";

const mapsUrl =
  "https://www.google.com/maps/search/?api=1&query=" +
  encodeURIComponent(SITE.address);

export function Location() {
  return (
    <section
      id="localizacao"
      className="relative py-24 overflow-hidden"
      style={{ background: "linear-gradient(180deg, #0c0c0d 0%, #131210 100%)" }}
    >
      <div className="deco-circle" style={{ width: 320, height: 320, top: -120, left: -120 }} />

      <div className="relative mx-auto max-w-7xl px-6">
        <div className="text-center reveal">
          <span className="inline-block rounded-full border border-gold/40 bg-gold/5 px-4 py-1.5 text-[10px] tracking-[0.22em] uppercase text-gold">
            Localização
          </span>
          <h2 className="mt-5 font-serif text-4xl md:text-5xl">
            Como <span className="italic gold-text">Chegar</span>
          </h2>
          <div className="mt-4 h-[2px] w-20 gradient-gold rounded-full mx-auto" />
        </div>

        <div className="mt-12 grid lg:grid-cols-3 gap-8 items-stretch">
          <div className="lg:col-span-2 reveal">
            <div
              className="overflow-hidden rounded-3xl shadow-elegant"
              style={{ border: "1px solid rgba(196,149,58,0.5)" }}
            >
              <iframe
                title="Mapa do escritório Merson Macedo Advocacia"
                src="https://maps.google.com/maps?q=SQ+12+Quadra+12+Proj+03+Loja+28+Sala+C+Cidade+Ocidental+GO&output=embed"
                width="100%"
                height="380"
                style={{ border: 0, display: "block", filter: "grayscale(0.2) contrast(1.05)" }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
            </div>
          </div>

          <div className="reveal flex flex-col justify-center rounded-3xl border border-gold/30 bg-card/60 p-8 shadow-elegant">
            <div className="flex items-center gap-3 text-gold">
              <MapPin size={22} />
              <span className="text-[10px] uppercase tracking-[0.22em]">Endereço</span>
            </div>
            <h3 className="mt-3 font-serif text-2xl leading-snug">
              Escritório <span className="italic gold-text">Cidade Ocidental/GO</span>
            </h3>
            <p className="mt-4 text-foreground/80 leading-relaxed">
              SQ 12, Quadra 12, Projeção 03<br />
              Loja 28 — Sala C<br />
              Cidade Ocidental — GO
            </p>

            <a
              href={mapsUrl}
              target="_blank"
              rel="noreferrer"
              className="mt-8 inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-medium text-primary-foreground transition-all hover:opacity-90"
              style={{
                background: "linear-gradient(135deg, #c4953a, #dbb568)",
                boxShadow: "0 10px 30px -10px rgba(196,149,58,0.55)",
              }}
            >
              Abrir no Google Maps <ArrowRight size={16} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
