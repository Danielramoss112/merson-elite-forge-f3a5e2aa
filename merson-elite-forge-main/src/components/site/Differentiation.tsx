const OTHERS = [
  { text: "Atendimento superficial", icon: "✕" },
  { text: "Falta de estratégia jurídica", icon: "✕" },
  { text: "Comunicação lenta e confusa", icon: "✕" },
  { text: "Sem experiência real no tribunal", icon: "✕" },
  { text: "Respostas genéricas e automáticas", icon: "✕" },
];

const OURS = [
  { text: "Análise técnica de alto nível", icon: "✓" },
  { text: "Experiência estratégica no tribunal", icon: "✓" },
  { text: "Clareza total em cada etapa", icon: "✓" },
  { text: "Visão de ex-assessor de juiz (TJMA)", icon: "✓" },
  { text: "Estratégia personalizada para o seu caso", icon: "✓" },
];

export function Differentiation() {
  return (
    <section className="relative py-24 sm:py-32 overflow-hidden bg-[#060c1d]/30">
      <div className="relative mx-auto max-w-7xl px-5 sm:px-6">
        <div className="text-center reveal">
          <span className="eyebrow">Diferencial</span>
          <h2 className="mt-8 font-serif text-4xl sm:text-5xl md:text-6xl">
            Por que escolher o{" "}
            <span className="italic silver-text">Dr. Merson</span>?
          </h2>
          <div className="ornament" aria-hidden>
            <span className="ornament-diamond" />
          </div>
        </div>

        <div className="mt-16 sm:mt-24 grid md:grid-cols-2 gap-8 sm:gap-12 max-w-5xl mx-auto items-stretch">
          {/* LEFT — Others */}
          <div className="reveal compare-col-muted rounded-[2.5rem] p-8 sm:p-12">
            <div className="text-[10px] uppercase tracking-[0.3em] text-foreground/30 font-medium">
              Outras Soluções
            </div>
            <div className="mt-10 space-y-6">
              {OTHERS.map((item, i) => (
                <div key={i} className="flex items-center gap-4">
                  <span className="flex items-center justify-center h-8 w-8 rounded-full bg-destructive/5 text-destructive/40 text-[10px] font-bold shrink-0">
                    {item.icon}
                  </span>
                  <span className="text-foreground/30 text-[1rem] font-light">{item.text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT — Ours */}
          <div className="reveal reveal-delay-1 compare-col-silver rounded-[2.5rem] p-8 sm:p-12 relative overflow-hidden">
            {/* Ambient glow */}
            <div
              aria-hidden
              className="absolute top-0 right-0 w-64 h-64 pointer-events-none"
              style={{
                background: "radial-gradient(circle, rgba(148,163,184,0.1), transparent 70%)",
              }}
            />
            <div className="relative">
              <div className="text-[10px] uppercase tracking-[0.3em] text-silver font-medium">
                Advocacia Estratégica
              </div>
              <div className="mt-10 space-y-6">
                {OURS.map((item, i) => (
                  <div key={i} className="flex items-center gap-4">
                    <span className="flex items-center justify-center h-8 w-8 rounded-full bg-white/10 text-silver text-[10px] font-bold shrink-0 shadow-silver">
                      {item.icon}
                    </span>
                    <span className="text-foreground/90 text-[1.1rem] font-light tracking-wide">{item.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
