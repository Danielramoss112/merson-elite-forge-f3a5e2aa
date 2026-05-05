import { useEffect, useRef, useState } from "react";

const items = [
  {
    text: "O Dr. Merson resolveu meu caso de revisão contratual bancária em tempo recorde. Recuperei valores que nem sabia que tinha direito.",
    name: "Carlos Eduardo M.",
    role: "Empresário — Brasília/DF",
    benefit: "Revisão bancária resolvida em 4 meses",
  },
  {
    text: "Consegui minha aposentadoria por invalidez após anos de negativas no INSS. O Dr. Merson foi incansável até o resultado.",
    name: "Maria Lúcia S.",
    role: "Aposentada — Goiânia/GO",
    benefit: "Benefício concedido após 3 negativas",
  },
  {
    text: "Cuidou de todo o inventário da minha família com sensibilidade e eficiência. Um advogado que realmente se importa com as pessoas.",
    name: "Roberto S.",
    role: "Empresário — Cidade Ocidental/GO",
    benefit: "Inventário resolvido sem conflitos",
  },
  {
    text: "Meu contrato bancário tinha juros absurdos. Em poucos meses recuperamos valores significativos. Profissionalismo exemplar.",
    name: "Ana P.",
    role: "Professora — São Luís/MA",
    benefit: "R$ 12.000 recuperados em juros abusivos",
  },
  {
    text: "Atendimento humanizado e estratégico. O Dr. Merson explica tudo com clareza, sem juridiquês. Me senti segura durante todo o processo.",
    name: "Fernanda L.",
    role: "Enfermeira — Goiânia/GO",
    benefit: "Causa trabalhista ganha em 1ª instância",
  },
];

export function Testimonials() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const root = scrollRef.current;
    if (!root) return;

    const cards = root.querySelectorAll<HTMLElement>("[data-testimonial]");
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting && e.intersectionRatio > 0.6) {
            const idx = Number(e.target.getAttribute("data-idx"));
            if (!Number.isNaN(idx)) setCurrent(idx);
          }
        });
      },
      { root, threshold: [0.6] }
    );
    cards.forEach((c) => io.observe(c));
    return () => io.disconnect();
  }, []);

  const scrollToIdx = (idx: number) => {
    const root = scrollRef.current;
    if (!root) return;
    const card = root.querySelector<HTMLElement>(`[data-idx="${idx}"]`);
    card?.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
  };

  return (
    <section id="depoimentos" className="relative py-24 sm:py-32 overflow-hidden bg-[#060c1d]/60">
      <div className="mx-auto max-w-7xl px-5 sm:px-6">
        <div className="text-center reveal">
          <span className="eyebrow">Depoimentos</span>
          <h2 className="mt-8 font-serif text-4xl sm:text-5xl md:text-6xl">
            Quem já confiou no <span className="italic silver-text">Dr. Merson</span>
          </h2>
          <div className="ornament" aria-hidden>
            <span className="ornament-diamond" />
          </div>
        </div>

        {/* Horizontal scroll carousel */}
        <div className="mt-16 sm:mt-24 -mx-5 sm:-mx-6 reveal">
          <div
            ref={scrollRef}
            className="flex overflow-x-auto scrollbar-hide gap-6 sm:gap-8 px-5 sm:px-6 pb-8"
            style={{ scrollSnapType: "x mandatory", WebkitOverflowScrolling: "touch" }}
          >
            {items.map((t, i) => (
              <div
                key={i}
                data-testimonial
                data-idx={i}
                className="shrink-0 w-[85vw] sm:w-[420px]"
                style={{ scrollSnapAlign: "center" }}
              >
                <div className="h-full rounded-[2.5rem] border border-white/5 bg-ink-soft p-8 sm:p-12 flex flex-col transition-all duration-700 hover:border-white/10 shadow-elegant">
                  {/* Stars */}
                  <div className="flex gap-1 text-silver/40">
                    {[...Array(5)].map((_, si) => (
                      <svg key={si} width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
                      </svg>
                    ))}
                  </div>

                  {/* Quote */}
                  <p className="mt-8 flex-1 text-foreground/40 leading-[1.8] text-[1.05rem] font-light italic">
                    "{t.text}"
                  </p>

                  {/* Benefit badge */}
                  <div className="mt-8 inline-flex self-start items-center gap-2 rounded-full bg-white/5 border border-white/10 px-4 py-2 text-[10px] text-silver font-medium uppercase tracking-widest">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12"/>
                    </svg>
                    {t.benefit}
                  </div>

                  {/* Author */}
                  <div className="mt-8 pt-8 border-t border-white/5 flex items-center gap-4">
                    <div className="h-12 w-12 rounded-2xl bg-white/5 flex items-center justify-center font-serif text-lg text-silver border border-white/10">
                      {t.name.charAt(0)}
                    </div>
                    <div>
                      <div className="text-[1.05rem] font-light tracking-wide">{t.name}</div>
                      <div className="text-[10px] text-foreground/30 uppercase tracking-[0.2em] mt-1">{t.role}</div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Dots */}
        <div className="mt-10 flex justify-center gap-3">
          {items.map((_, idx) => (
            <button
              key={idx}
              onClick={() => scrollToIdx(idx)}
              className={`h-1 rounded-full transition-all duration-700 ${
                idx === current ? "w-10 bg-silver" : "w-2 bg-white/10 hover:bg-white/20"
              }`}
              aria-label={`Depoimento ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
