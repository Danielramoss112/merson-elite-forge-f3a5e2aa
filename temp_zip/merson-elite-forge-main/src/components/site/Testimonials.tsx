import { useState } from "react";
import { ChevronLeft, ChevronRight, Star, Quote } from "lucide-react";

const items = [
  {
    text: "O Dr. Merson resolveu meu caso de revisão contratual bancária em tempo recorde. Profissionalismo e dedicação que fazem a diferença. Recomendo sem hesitação.",
    name: "Carlos Eduardo M.",
    role: "Empresário – Brasília/DF",
  },
  {
    text: "Consegui minha aposentadoria por invalidez após anos de negativas no INSS. O Dr. Merson foi incansável até o resultado.",
    name: "Maria Lúcia S.",
    role: "Aposentada – Goiânia/GO",
  },
  {
    text: "Cuidou de todo o inventário da minha família com sensibilidade e eficiência. Um advogado que realmente se importa.",
    name: "Roberto S.",
    role: "Empresário – Cidade Ocidental/GO",
  },
  {
    text: "Meu contrato bancário tinha juros absurdos. Em poucos meses recuperamos valores que eu nem sabia que tinha direito.",
    name: "Ana P.",
    role: "Professora – São Luís/MA",
  },
];

export function Testimonials() {
  const [i, setI] = useState(0);
  const t = items[i];
  const prev = () => setI((p) => (p - 1 + items.length) % items.length);
  const next = () => setI((p) => (p + 1) % items.length);
  const initial = t.name.charAt(0);

  return (
    <section id="depoimentos" className="relative py-28 bg-ink-soft/30 overflow-hidden">
      <div className="deco-circle" style={{ width: 400, height: 400, top: 80, left: -160 }} />

      <div className="mx-auto max-w-5xl px-6">
        <div className="text-center reveal">
          <span className="eyebrow">Depoimentos</span>
          <h2 className="mt-6 font-serif text-4xl md:text-5xl">
            O Que Dizem os <span className="italic gold-text">Clientes</span>
          </h2>
          <div className="ornament" aria-hidden>
            <span className="ornament-diamond" />
          </div>
        </div>

        <div className="mt-14 relative">
          <div className="relative rounded-3xl border border-gold/30 bg-card p-10 md:p-14 shadow-elegant reveal">
            <Quote className="absolute -top-6 left-8 text-gold" size={64} strokeWidth={1} fill="currentColor" />

            <div className="flex gap-1 mb-5">
              {[...Array(5)].map((_, idx) => (
                <Star key={idx} className="text-gold" size={18} fill="currentColor" />
              ))}
            </div>

            <p className="font-serif italic text-xl md:text-2xl leading-relaxed text-foreground/90">
              “{t.text}”
            </p>

            <div className="mt-8 flex items-center gap-4">
              <div className="h-14 w-14 rounded-full gradient-gold flex items-center justify-center font-serif text-xl text-primary-foreground">
                {initial}
              </div>
              <div>
                <div className="font-medium">{t.name}</div>
                <div className="text-sm text-foreground/60">{t.role}</div>
              </div>
            </div>
          </div>

          <button
            onClick={prev}
            className="absolute -left-4 md:-left-14 top-1/2 -translate-y-1/2 h-12 w-12 rounded-full border border-gold/40 bg-background/80 flex items-center justify-center hover:text-gold hover:border-gold transition-colors"
            aria-label="Anterior"
          >
            <ChevronLeft size={22} />
          </button>
          <button
            onClick={next}
            className="absolute -right-4 md:-right-14 top-1/2 -translate-y-1/2 h-12 w-12 rounded-full border border-gold/40 bg-background/80 flex items-center justify-center hover:text-gold hover:border-gold transition-colors"
            aria-label="Próximo"
          >
            <ChevronRight size={22} />
          </button>
        </div>

        <div className="mt-8 flex justify-center gap-2">
          {items.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setI(idx)}
              className={`h-2 rounded-full transition-all ${
                idx === i ? "w-8 bg-gold" : "w-2 bg-foreground/25"
              }`}
              aria-label={`Depoimento ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
