/* ── Google Reviews Component ── */
/* Placement: before Contact/Footer */

const REVIEWS = [
  {
    initials: "C.A.",
    name: "Carlos A.",
    text: "Profissionalismo impecável e clareza na estratégia. O Dr. Merson entendeu meu caso rapidamente e conduziu tudo com muita segurança. Recomendo de olhos fechados.",
    stars: 5,
  },
  {
    initials: "F.M.",
    name: "Fernanda M.",
    text: "Atendimento humanizado e direto ao ponto. Tive meu processo bancário resolvido em tempo recorde. Uma advocacia que realmente faz diferença.",
    stars: 5,
  },
  {
    initials: "R.S.",
    name: "Rafael S.",
    text: "Fui atendido com atenção e dedicação total. A equipe do Dr. Merson tem uma visão estratégica que outros advogados não têm. Resultado excelente.",
    stars: 5,
  },
];

function StarIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="#FBBC04" aria-hidden>
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
    </svg>
  );
}

function GoogleIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" aria-label="Google" role="img">
      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
    </svg>
  );
}

export function GoogleReviews() {
  return (
    <section className="relative py-24 sm:py-32 overflow-hidden bg-[#040811]">
      {/* Subtle ambient glow — midnight blue only */}
      <div
        aria-hidden
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] pointer-events-none"
        style={{ background: "radial-gradient(ellipse, rgba(10,20,46,0.6) 0%, transparent 70%)" }}
      />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-6">
        {/* Header */}
        <div className="text-center reveal">
          <span className="eyebrow">Reputação</span>
          <h2 className="mt-8 font-serif text-4xl sm:text-5xl md:text-6xl tracking-[-0.015em]">
            O que nossos <span className="italic silver-text">clientes dizem</span>
          </h2>
          <div className="ornament" aria-hidden>
            <span className="ornament-diamond" />
          </div>
        </div>

        {/* Google Rating Badge */}
        <div className="mt-16 reveal flex flex-col sm:flex-row items-center justify-center gap-6">
          <div className="flex items-center gap-4 rounded-[2rem] border border-white/8 bg-[#0a142e]/60 px-8 py-6 shadow-elegant backdrop-blur-sm">
            <GoogleIcon />
            <div className="h-10 w-[1px] bg-white/10" />
            <div className="flex items-baseline gap-2">
              <span className="font-serif text-5xl silver-text font-light tracking-[-0.02em]">5.0</span>
              <div className="flex flex-col gap-1">
                <div className="flex gap-0.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <StarIcon key={i} />
                  ))}
                </div>
                <span className="text-[10px] uppercase tracking-[0.2em] text-foreground/40 font-medium">
                  Avaliação Máxima no Google
                </span>
              </div>
            </div>
          </div>
        </div>

        <p className="mt-6 text-center text-[0.95rem] text-foreground/35 font-light leading-[1.6] reveal">
          Baseado na confiança real de nossos clientes.
        </p>

        {/* Review Cards — CSS Grid, Dark Blue, Apple elegance */}
        <div className="mt-16 sm:mt-20 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 reveal-scale">
          {REVIEWS.map((r, i) => (
            <div
              key={i}
              className="reviews-card"
            >
              {/* Stars */}
              <div className="flex gap-0.5 mb-5">
                {Array.from({ length: r.stars }).map((_, j) => (
                  <StarIcon key={j} />
                ))}
              </div>

              {/* Review text */}
              <p className="text-foreground/70 text-[0.95rem] font-light leading-[1.7] flex-1">
                "{r.text}"
              </p>

              {/* Reviewer */}
              <div className="mt-6 flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-[#0a142e] border border-white/10 flex items-center justify-center text-[11px] font-semibold text-silver tracking-[0.05em]">
                  {r.initials}
                </div>
                <div>
                  <div className="text-[0.85rem] font-medium text-foreground/80">{r.name}</div>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <GoogleIcon />
                    <span className="text-[10px] text-foreground/30 uppercase tracking-[0.15em] font-medium">Cliente verificado</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .reviews-card {
          display: flex;
          flex-direction: column;
          background: #06101f;
          border: 1px solid rgba(255, 255, 255, 0.05);
          border-radius: 2rem;
          padding: 2rem 2rem 1.75rem;
          transition: transform 0.4s cubic-bezier(0.25, 1, 0.5, 1),
                      box-shadow 0.4s cubic-bezier(0.25, 1, 0.5, 1),
                      border-color 0.4s ease;
          will-change: transform;
        }
        .reviews-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5),
                      0 0 0 1px rgba(148, 163, 184, 0.08);
          border-color: rgba(255, 255, 255, 0.09);
        }
      `}</style>
    </section>
  );
}
