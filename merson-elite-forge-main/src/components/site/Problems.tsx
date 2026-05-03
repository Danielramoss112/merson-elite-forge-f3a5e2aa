const PROBLEMS = [
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"/>
        <path d="M16 16s-1.5-2-4-2-4 2-4 2"/><line x1="9" y1="9" x2="9.01" y2="9"/><line x1="15" y1="9" x2="15.01" y2="9"/>
      </svg>
    ),
    title: "Insegurança sobre seu processo",
    text: "Não saber como seu caso está caminhando causa ansiedade e medo do resultado.",
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
      </svg>
    ),
    title: "Falta de orientação clara",
    text: "Você precisa de respostas objetivas, não de termos técnicos incompreensíveis.",
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
        <line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/>
      </svg>
    ),
    title: "Medo de tomar decisão errada",
    text: "Um passo em falso pode custar caro. Você precisa de um especialista que já viveu essa realidade.",
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/>
        <line x1="19" y1="8" x2="19" y2="14"/><line x1="22" y1="11" x2="16" y2="11"/>
      </svg>
    ),
    title: "Atendimento genérico",
    text: "Cansado de profissionais que tratam seu caso como apenas mais um número?",
  },
];

export function Problems() {
  return (
    <section className="relative py-24 sm:py-32 overflow-hidden bg-[#040811]/80">
      <div className="relative mx-auto max-w-7xl px-5 sm:px-6">
        <div className="text-center reveal">
          <span className="eyebrow">Diagnóstico</span>
          <h2 className="mt-8 font-serif text-4xl sm:text-5xl md:text-6xl">
            Sua causa exige <span className="italic silver-text">assertividade</span>
          </h2>
          <div className="ornament" aria-hidden>
            <span className="ornament-diamond" />
          </div>
        </div>

        <div className="mt-16 sm:mt-24 grid sm:grid-cols-2 gap-6 sm:gap-8 max-w-5xl mx-auto">
          {PROBLEMS.map((p, i) => (
            <div
              key={i}
              className={`reveal reveal-delay-${i + 1} group relative rounded-[2.5rem] border border-white/5 bg-ink-soft p-8 sm:p-10 transition-all duration-700 hover:border-white/10 hover:bg-ink-soft/80 shadow-elegant`}
            >
              <div className="relative">
                <div className="h-14 w-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-silver/30 group-hover:text-silver transition-all duration-700">
                  {p.icon}
                </div>
                <h3 className="mt-8 font-serif text-2xl sm:text-3xl leading-tight text-foreground/80 group-hover:text-foreground transition-all duration-700">{p.title}</h3>
                <p className="mt-4 text-[1rem] text-foreground/40 leading-relaxed font-light">{p.text}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center reveal">
          <p className="text-foreground/30 text-[1.05rem] font-light italic">
            Se você se identificou com alguma dessas situações, 
            <span className="text-silver font-normal not-italic ml-2">estamos prontos para atuar.</span>
          </p>
        </div>
      </div>
    </section>
  );
}
