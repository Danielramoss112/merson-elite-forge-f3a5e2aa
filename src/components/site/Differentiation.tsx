import mersonPhone from "@/assets/merson-hero-new.jpg";

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
          <h2 className="mt-8 font-serif text-4xl sm:text-5xl md:text-6xl tracking-[-0.015em]">
            Por que escolher o{" "}
            <span className="italic silver-text">Dr. Merson</span>?
          </h2>
          <div className="ornament" aria-hidden>
            <span className="ornament-diamond" />
          </div>
        </div>

        {/* Comparison grid */}
        <div className="mt-16 sm:mt-24 grid md:grid-cols-2 gap-8 sm:gap-12 max-w-5xl mx-auto items-stretch">
          {/* LEFT — Others */}
          <div className="reveal-left compare-col-muted rounded-[2.5rem] p-8 sm:p-12">
            <div className="text-[10px] uppercase tracking-[0.3em] text-foreground/30 font-medium">
              Outras Soluções
            </div>
            <div className="mt-10 space-y-6">
              {OTHERS.map((item, i) => (
                <div key={i} className="flex items-center gap-4">
                  <span className="flex items-center justify-center h-8 w-8 rounded-full bg-destructive/5 text-destructive/40 text-[10px] font-bold shrink-0">
                    {item.icon}
                  </span>
                  <span className="text-foreground/30 text-[1rem] font-light leading-[1.6]">{item.text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT — Ours */}
          <div className="reveal-right reveal-delay-1 compare-col-silver rounded-[2.5rem] p-8 sm:p-12 relative overflow-hidden">
            <div aria-hidden className="absolute top-0 right-0 w-64 h-64 pointer-events-none"
              style={{ background: "radial-gradient(circle, rgba(148,163,184,0.08), transparent 70%)" }}
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
                    <span className="text-foreground/90 text-[1.1rem] font-light tracking-wide leading-[1.6]">{item.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Atendimento Direto Block with celular image — Task 1c */}
        <div className="mt-20 sm:mt-28 reveal-scale">
          <div className="relative rounded-[3rem] overflow-hidden border border-white/5 bg-[#0a142e]/50 shadow-elegant">
            <div className="grid md:grid-cols-2 gap-0 items-center">
              {/* Image side */}
              <div className="relative h-72 md:h-auto overflow-hidden">
                <img
                  src={mersonPhone}
                  alt="Dr. Merson Macedo — Atendimento direto e ágil"
                  loading="lazy"
                  className="w-full h-full object-cover object-top md:object-center"
                  style={{
                    filter: "contrast(1.05) brightness(0.85) saturate(0.9)",
                    maskImage: "linear-gradient(to right, black 70%, transparent 100%)",
                    WebkitMaskImage: "linear-gradient(to right, black 70%, transparent 100%)",
                  }}
                />
                {/* Dark blue overlay to prevent warm tones bleeding */}
                <div className="absolute inset-0 bg-[#040811]/20 mix-blend-color" />
              </div>

              {/* Text side */}
              <div className="p-10 sm:p-14">
                <span className="text-[10px] uppercase tracking-[0.3em] text-silver/60 font-medium">
                  Atendimento Direto
                </span>
                <h3 className="mt-4 font-serif text-3xl sm:text-4xl text-foreground/95 tracking-[-0.015em] leading-snug">
                  Você fala direto com quem decide
                </h3>
                <p className="mt-6 text-[1.05rem] text-foreground/45 font-light leading-[1.7]">
                  Sem intermediários. Sem protocolos genéricos. Seu caso é analisado com atenção total, do primeiro contato à resolução final.
                </p>
                <div className="mt-8 flex items-center gap-3">
                  <div className="h-[1px] w-8 bg-silver/30" />
                  <span className="text-[10px] uppercase tracking-[0.3em] text-silver/50 font-medium">
                    Resposta em até 24h
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
