import { SITE } from "@/lib/site";

const PILLARS = [
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"/><path d="m16 12-4 4-4-4"/><path d="M12 8v8"/>
      </svg>
    ),
    realIcon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
      </svg>
    ),
    title: "Atuação dentro do tribunal",
    text: "Quase 4 anos como Assessor de Juiz no TJMA. Conhecimento profundo de como juízes pensam e decidem.",
  },
  {
    realIcon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="7" width="20" height="14" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>
      </svg>
    ),
    title: "Experiência com processos reais",
    text: "3 anos como Procurador Municipal. Vivência em contencioso e consultoria pública de alta complexidade.",
  },
  {
    realIcon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/>
      </svg>
    ),
    title: "Análise estratégica, não genérica",
    text: "Cada caso é único e merece um estudo real. Nada de respostas prontas — sua situação exige atenção personalizada.",
  },
];

export function Authority() {
  return (
    <section className="relative py-24 sm:py-32 overflow-hidden bg-[#040811]">
      <div className="relative mx-auto max-w-7xl px-5 sm:px-6">
        <div className="text-center reveal">
          <span className="eyebrow">Autoridade</span>
          <h2 className="mt-8 font-serif text-4xl sm:text-5xl md:text-6xl">
            Experiência que faz{" "}
            <span className="italic silver-text">diferença</span>
            <br className="hidden sm:block" />
            no seu caso
          </h2>
          <div className="ornament" aria-hidden>
            <span className="ornament-diamond" />
          </div>
        </div>

        <div className="mt-16 sm:mt-24 grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {PILLARS.map((p, i) => (
            <div
              key={i}
              className={`reveal reveal-delay-${i + 1} card-premium rounded-[2.5rem] border border-white/5 bg-ink-soft p-8 sm:p-12`}
            >
              <div className="h-16 w-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-silver">
                {p.realIcon}
              </div>
              <h3 className="mt-8 font-serif text-2xl sm:text-3xl leading-snug silver-text">
                {p.title}
              </h3>
              <p className="mt-5 text-[1rem] text-foreground/40 leading-relaxed font-light">
                {p.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
