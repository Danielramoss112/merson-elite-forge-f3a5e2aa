import { SITE } from "@/lib/site";

const STEPS = [
  {
    num: "01",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
      </svg>
    ),
    title: "Você agenda a consulta",
    text: "Escolha o melhor horário para uma conversa via WhatsApp, telefone ou presencial.",
  },
  {
    num: "02",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
      </svg>
    ),
    title: "Analisamos seu caso",
    text: "Estudo técnico e estratégico da sua situação com atenção a cada detalhe.",
  },
  {
    num: "03",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/>
      </svg>
    ),
    title: "Você recebe orientação clara",
    text: "Saia da consulta sabendo exatamente o caminho jurídico para o seu caso.",
  },
];

export function Process() {
  return (
    <section className="relative py-24 sm:py-32 overflow-hidden">
      <div className="relative mx-auto max-w-7xl px-5 sm:px-6">
        <div className="text-center reveal">
          <span className="eyebrow">Como Funciona</span>
          <h2 className="mt-8 font-serif text-4xl sm:text-5xl md:text-6xl">
            Simples, direto e{" "}
            <span className="italic silver-text">transparente</span>
          </h2>
          <div className="ornament" aria-hidden>
            <span className="ornament-diamond" />
          </div>
        </div>

        <div className="mt-16 sm:mt-24 grid md:grid-cols-3 gap-8 sm:gap-12 max-w-5xl mx-auto relative">
          {/* Connector line (desktop only) */}
          <div
            aria-hidden
            className="hidden md:block absolute top-[3.5rem] left-[calc(16.67%+2rem)] right-[calc(16.67%+2rem)] h-[1px]"
            style={{
              background: "linear-gradient(90deg, transparent, rgba(148,163,184,0.3), rgba(148,163,184,0.3), transparent)",
            }}
          />

          {STEPS.map((s, i) => (
            <div key={i} className={`reveal reveal-delay-${i + 1} relative text-center`}>
              <div className="relative z-10 mx-auto h-16 w-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-silver shadow-silver">
                {s.icon}
              </div>
              <div className="mt-4 text-[11px] tracking-[0.4em] uppercase text-silver/40 font-mono">
                {s.num}
              </div>
              <h3 className="mt-4 font-serif text-2xl sm:text-3xl silver-text">{s.title}</h3>
              <p className="mt-4 text-[1rem] text-foreground/40 leading-relaxed max-w-xs mx-auto font-light">
                {s.text}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center reveal">
          <a
            href={SITE.whatsappUrl}
            target="_blank"
            rel="noreferrer"
            id="process-cta"
            className="btn-silver inline-flex items-center justify-center gap-3 rounded-full bg-white px-10 py-5 text-sm font-semibold tracking-wide text-background shadow-silver"
          >
            Iniciar Minha Consulta
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
