/* ── FAQ Component — Apple-style Accordion with native <details>/<summary> ── */

const FAQS = [
  {
    q: "Como funciona a primeira consultoria?",
    a: "Realizamos uma análise profunda do seu caso, onde mapeamos os riscos e definimos a melhor estratégia jurídica antes de qualquer ação.",
  },
  {
    q: "O atendimento pode ser 100% online?",
    a: "Sim. Atendemos clientes de todo o Brasil com a mesma proximidade, segurança e sigilo do atendimento presencial.",
  },
  {
    q: "Quais as garantias do meu processo?",
    a: "A advocacia é uma atividade de meio, não de fim. Nossa garantia é a aplicação da mais alta técnica jurídica, transparência total e dedicação incansável ao seu resultado.",
  },
  {
    q: "O Dr. Merson atende em quais regiões?",
    a: "Nossa sede física localiza-se em Cidade Ocidental/GO, mas atendemos clientes em todo o território nacional, com foco especial nos tribunais do Maranhão (TJMA) e tribunais superiores em Brasília.",
  },
  {
    q: "Quanto custa uma consulta inicial?",
    a: "Os honorários são calculados com base na complexidade da demanda e seguem rigorosamente a tabela da OAB. Entre em contato para uma avaliação personalizada do seu cenário jurídico.",
  },
];

export function Faq() {
  return (
    <section id="faq" className="relative py-24 sm:py-32 overflow-hidden bg-[#040811]">
      <div className="relative mx-auto max-w-3xl px-5 sm:px-6">
        <div className="text-center reveal">
          <span className="eyebrow">Dúvidas Frequentes</span>
          <h2 className="mt-8 font-serif text-4xl sm:text-5xl md:text-6xl tracking-[-0.015em]">
            Transparência e <span className="italic silver-text">Clareza</span>
          </h2>
          <div className="ornament" aria-hidden>
            <span className="ornament-diamond" />
          </div>
        </div>

        <div className="mt-16 sm:mt-20 space-y-3 reveal">
          {FAQS.map((f, i) => (
            <details key={i} className="faq-item group">
              <summary className="faq-summary">
                <span className="font-serif text-lg sm:text-xl text-foreground/85 leading-snug tracking-[-0.01em] pr-4">
                  {f.q}
                </span>
                <span className="faq-icon" aria-hidden>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                    {/* + horizontal */}
                    <line x1="5" y1="12" x2="19" y2="12" className="faq-line-h" />
                    {/* + vertical (rotates to 0 when open) */}
                    <line x1="12" y1="5" x2="12" y2="19" className="faq-line-v" />
                  </svg>
                </span>
              </summary>
              <div className="faq-body">
                <p className="text-foreground/45 text-[1rem] font-light leading-[1.7]">
                  {f.a}
                </p>
              </div>
            </details>
          ))}
        </div>
      </div>

      <style>{`
        /* ── FAQ accordion base ── */
        .faq-item {
          border: 1px solid rgba(255,255,255,0.06);
          border-radius: 1.5rem;
          background: transparent;
          transition: background 0.3s ease, border-color 0.3s ease;
          overflow: hidden;
        }
        .faq-item[open] {
          background: rgba(10,20,46,0.4);
          border-color: rgba(255,255,255,0.1);
        }

        /* Remove default browser arrow */
        .faq-summary {
          list-style: none;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 1rem;
          padding: 1.5rem 1.75rem;
          cursor: pointer;
          user-select: none;
        }
        .faq-summary::-webkit-details-marker { display: none; }
        .faq-summary::marker { display: none; }

        /* Icon: + that becomes - */
        .faq-icon {
          flex-shrink: 0;
          width: 32px;
          height: 32px;
          border-radius: 50%;
          border: 1px solid rgba(255,255,255,0.1);
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--silver);
          transition: border-color 0.3s ease, background 0.3s ease;
        }
        .faq-item[open] .faq-icon {
          background: rgba(148,163,184,0.08);
          border-color: rgba(148,163,184,0.25);
        }

        /* Vertical line (the | of +) rotates/disappears on open */
        .faq-line-v {
          transition: transform 0.35s cubic-bezier(0.25,1,0.5,1), opacity 0.3s ease;
          transform-origin: center;
          transform-box: fill-box;
        }
        .faq-item[open] .faq-line-v {
          transform: rotate(90deg);
          opacity: 0;
        }

        /* Body */
        .faq-body {
          padding: 0 1.75rem 1.5rem;
          animation: faqOpen 0.4s cubic-bezier(0.25,1,0.5,1);
        }
        @keyframes faqOpen {
          from { opacity: 0; transform: translateY(-6px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </section>
  );
}
