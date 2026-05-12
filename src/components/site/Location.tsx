import { MapPin, ArrowRight } from "lucide-react";
import { SITE } from "@/lib/site";

const mapsUrl =
  "https://www.google.com/maps/search/?api=1&query=" +
  encodeURIComponent(SITE.address);

export function Location() {
  return (
    <section
      id="localizacao"
      className="relative py-24 sm:py-32 overflow-hidden bg-[#040811]"
    >
      <div 
        aria-hidden
        className="absolute top-1/2 -right-20 w-80 h-80 bg-silver/5 blur-[100px] rounded-full pointer-events-none" 
      />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-6">
        <div className="text-center reveal">
          <span className="eyebrow">Localização</span>
          <h2 className="mt-8 font-serif text-4xl sm:text-5xl md:text-6xl">
            Como <span className="italic silver-text">Chegar</span>
          </h2>
          <div className="ornament" aria-hidden>
            <span className="ornament-diamond" />
          </div>
        </div>

        <div className="mt-16 sm:mt-24 grid lg:grid-cols-3 gap-8 sm:gap-12 items-stretch">
          <div className="lg:col-span-2 reveal-left">
            <div className="relative p-[1px] rounded-[2.5rem] bg-gradient-to-br from-white/10 via-transparent to-white/5 shadow-elegant overflow-hidden">
              <iframe
                title="Mapa do escritório Merson Macedo Advocacia"
                src="https://maps.google.com/maps?q=SQ+12+Quadra+12+Proj+03+Loja+28+Sala+C+Cidade+Ocidental+GO&output=embed"
                width="100%"
                height="440"
                style={{ border: 0, display: "block" }} // Removido o filtro grayscale
                className="w-full h-full"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
            </div>
          </div>

          <div className="reveal-right flex flex-col justify-center items-center text-center rounded-[2.5rem] border border-white/5 bg-ink-soft/50 p-10 sm:p-12 shadow-elegant relative overflow-hidden">
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-silver/10 blur-2xl rounded-full" />
             
            <div className="flex items-center gap-3 text-silver">
              <MapPin size={24} />
              <span className="text-[10px] uppercase tracking-[0.3em] font-medium">Sede Principal</span>
            </div>
            
            <h3 className="mt-6 font-serif text-2xl sm:text-3xl leading-tight silver-text">
              Escritório <span className="italic">Cidade Ocidental</span>
            </h3>
            
            <p className="mt-6 text-[1.1rem] text-foreground/40 leading-relaxed font-light">
              SQ 12 Quadra 12 Proj 03<br />
              Loja 28 — Sala C<br />
              Centro · Cidade Ocidental/GO<br />
              CEP 72880-490
            </p>

            <a
              href={mapsUrl}
              target="_blank"
              rel="noreferrer"
              className="btn-silver mt-10 w-full inline-flex items-center justify-center gap-3 rounded-full bg-white px-8 py-4.5 text-sm font-semibold tracking-wide text-background shadow-silver transition-all duration-700"
            >
              Abrir no Google Maps <ArrowRight size={18} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
