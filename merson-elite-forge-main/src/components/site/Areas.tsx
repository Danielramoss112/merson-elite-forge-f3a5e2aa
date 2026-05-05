import { SITE } from "@/lib/site";
import bancarioImg from "@/assets/areas/DIREITO BANCARIO.png";
import consumidorImg from "@/assets/areas/Direito-do-consumidor.jpg";
import imobiliarioImg from "@/assets/areas/imobiliario-unsplash.jpg";
import previdenciarioImg from "@/assets/areas/DIREITO PREVIDENCIARIO INSS.png";
import civilImg from "@/assets/areas/direito-civil.jpg";
import familiaImg from "@/assets/areas/Direito FAMILIA.jpg";
import criminalImg from "@/assets/areas/DIREITO CRIMINAL.png";

/* ── 7 Practice Areas (Removed Direito Trabalhista) ── */
const AREAS = [
  {
    tag: "Direito Bancário",
    title: "Pare de Pagar Juros Abusivos",
    body: "Analisamos contratos bancários para eliminar taxas ilegais e reduzir suas dívidas drasticamente.",
    stat: { num: "R$ 2.4M+", label: "Recuperados" },
    image: bancarioImg,
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="7" width="20" height="14" rx="2" /><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" /><path d="M6 10h.01M6 14h.01M6 18h.01" />
      </svg>
    ),
  },
  {
    tag: "Direito do Consumidor",
    title: "Justiça Contra Abusos",
    body: "Protegemos seus direitos contra grandes empresas. Cobranças indevidas, danos morais e práticas abusivas.",
    stat: { num: "98%", label: "Êxito" },
    image: consumidorImg,
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
  },
  {
    tag: "Direito Imobiliário",
    title: "Segurança no Seu Patrimônio",
    body: "Do contrato à escritura. Assessoria especializada em regularização e transações imobiliárias seguras.",
    stat: { num: "340+", label: "Contratos" },
    image: imobiliarioImg,
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><polyline points="9 22 9 12 15 12 15 22" />
      </svg>
    ),
  },
  {
    tag: "Direito Previdenciário",
    title: "Sua Aposentadoria Merecida",
    body: "Não aceite a negativa do INSS. Lutamos para garantir o melhor benefício com agilidade e perícia técnica.",
    stat: { num: "500+", label: "Benefícios" },
    image: previdenciarioImg,
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="8" r="4" /><path d="M20 21a8 8 0 1 0-16 0" />
      </svg>
    ),
  },
  {
    tag: "Direito Civil",
    title: "Soluções Jurídicas Eficazes",
    body: "Proteção completa para seus contratos, indenizações e conflitos com estratégia jurídica personalizada.",
    stat: { num: "1.2K+", label: "Processos" },
    image: civilImg,
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /><line x1="16" y1="13" x2="8" y2="13" /><line x1="16" y1="17" x2="8" y2="17" />
      </svg>
    ),
  },
  {
    tag: "Família e Sucessões",
    title: "Proteção Familiar",
    body: "Divórcio, guarda, alimentos, inventário. Acompanhamento técnico e humano nas demandas mais sensíveis.",
    stat: { num: "280+", label: "Famílias" },
    image: familiaImg,
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
  },
  {
    tag: "Direito Criminal",
    title: "Defesa Estratégica",
    body: "Defesa penal agressiva e técnica. Habeas corpus, crimes de trânsito e revisão criminal em todas as instâncias.",
    stat: { num: "100%", label: "Dedicação" },
    image: criminalImg,
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" />
      </svg>
    ),
  },
];

function WaIcon() {
  return (
    <svg width={14} height={14} viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

export function Areas() {
  return (
    <section id="areas" className="relative py-24 sm:py-32 overflow-hidden bg-[#040811]">
      <div
        aria-hidden
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px] pointer-events-none"
        style={{ background: "radial-gradient(ellipse, rgba(10,20,60,0.5) 0%, transparent 70%)" }}
      />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-6">
        <div className="text-center reveal">
          <span className="eyebrow">Áreas de Atuação</span>
          <h2 className="mt-8 font-serif text-4xl sm:text-5xl md:text-6xl tracking-[-0.015em]">
            Especialidades <span className="italic silver-text">Jurídicas</span>
          </h2>
          <div className="ornament" aria-hidden>
            <span className="ornament-diamond" />
          </div>
        </div>

        <div className="mt-16 sm:mt-20 areas-grid">
          {AREAS.map((area, i) => (
            <div
              key={area.tag}
              className="area-card reveal group relative overflow-hidden"
              style={{ animationDelay: `${(i % 4) * 80}ms` }}
            >
              {/* Image Thumbnail */}
              <div className="area-card__image-container">
                <img 
                  src={area.image} 
                  alt={area.tag} 
                  loading="lazy" 
                  className="area-card__image" 
                />
                <div className="area-card__image-overlay"></div>
              </div>

              <div className="area-card__content relative z-10">
                <div className="area-card__icon">
                  {area.icon}
                </div>

                <div className="area-card__tag">{area.tag}</div>

                <h3 className="area-card__title">{area.title}</h3>

                {/* Prime Video Effect: opacity-0 translate-y-4 -> opacity-100 translate-y-0 */}
                <p className="area-card__body opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0">
                  {area.body}
                </p>

                <div className="area-card__stat">
                  <span className="area-card__stat-num">{area.stat.num}</span>
                  <span className="area-card__stat-lbl">{area.stat.label}</span>
                </div>

                <a
                  href={`${SITE.whatsappUrl}&text=${encodeURIComponent(`Olá, gostaria de uma consultoria sobre ${area.tag}.`)}`}
                  target="_blank"
                  rel="noreferrer"
                  className="area-card__cta"
                >
                  <WaIcon /> Consultar
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .areas-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 1.5rem;
        }

        .area-card {
          display: flex;
          flex-direction: column;
          background: #06101f;
          border: 1px solid rgba(255, 255, 255, 0.05);
          border-radius: 1.75rem;
          transition: transform 0.6s cubic-bezier(0.25, 1, 0.5, 1),
                      box-shadow 0.6s cubic-bezier(0.25, 1, 0.5, 1),
                      border-color 0.4s ease;
          will-change: transform;
          cursor: default;
        }

        /* Prime Video Hover: scale-105 + shadow/glow */
        .area-card:hover {
          transform: scale(1.05);
          box-shadow: 0 10px 40px rgba(10, 20, 60, 0.6);
          border-color: rgba(255, 255, 255, 0.12);
          z-index: 10;
        }

        .area-card__image-container {
          height: 160px;
          position: relative;
          overflow: hidden;
          border-top-left-radius: 1.75rem;
          border-top-right-radius: 1.75rem;
        }

        .area-card__image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.6s cubic-bezier(0.25, 1, 0.5, 1);
          filter: grayscale(80%) contrast(1.1) brightness(0.8);
        }

        .area-card:hover .area-card__image {
          transform: scale(1.1);
          filter: grayscale(20%) contrast(1.1) brightness(1);
        }

        .area-card__image-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(to bottom, transparent, #06101f 95%);
        }

        .area-card__content {
          padding: 0 2rem 1.75rem;
          display: flex;
          flex-direction: column;
          flex: 1;
          margin-top: -1.5rem;
        }

        .area-card__icon {
          width: 52px;
          height: 52px;
          border-radius: 1rem;
          background: #040811;
          border: 1px solid rgba(255, 255, 255, 0.07);
          display: flex;
          align-items: center;
          justify-content: center;
          color: #94a3b8;
          margin-bottom: 1.5rem;
          flex-shrink: 0;
          transition: background 0.3s ease, border-color 0.3s ease;
          box-shadow: 0 4px 10px rgba(0,0,0,0.5);
        }

        .area-card:hover .area-card__icon {
          background: rgba(255, 255, 255, 0.07);
          border-color: rgba(148, 163, 184, 0.2);
        }

        .area-card__tag {
          font-family: 'Inter', sans-serif;
          font-size: 0.65rem;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: #4a6fa5;
          margin-bottom: 0.75rem;
          font-weight: 500;
        }

        .area-card__title {
          font-family: 'Cormorant Garamond', Georgia, serif;
          font-size: clamp(1.25rem, 2vw, 1.5rem);
          color: #e2e8f0;
          line-height: 1.25;
          letter-spacing: -0.01em;
          margin-bottom: 0.9rem;
        }

        .area-card__body {
          font-family: 'Inter', sans-serif;
          font-size: 0.875rem;
          line-height: 1.7;
          color: #475569;
          font-weight: 300;
          flex: 1;
          margin-bottom: 1.5rem;
          transition: opacity 0.5s cubic-bezier(0.25, 1, 0.5, 1), 
                      transform 0.5s cubic-bezier(0.25, 1, 0.5, 1);
        }

        .area-card__stat {
          display: flex;
          align-items: baseline;
          gap: 0.5rem;
          margin-bottom: 1.5rem;
          padding-top: 1.25rem;
          border-top: 1px solid rgba(255, 255, 255, 0.05);
        }

        .area-card__stat-num {
          font-family: 'Cormorant Garamond', Georgia, serif;
          font-size: 1.75rem;
          color: #94a3b8;
          line-height: 1;
          letter-spacing: -0.02em;
        }

        .area-card__stat-lbl {
          font-family: 'Inter', sans-serif;
          font-size: 0.6rem;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: #334155;
          font-weight: 500;
        }

        .area-card__cta {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          background: transparent;
          border: 1px solid rgba(255, 255, 255, 0.08);
          color: #64748b;
          font-family: 'Inter', sans-serif;
          font-size: 0.7rem;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          font-weight: 500;
          padding: 0.6rem 1.25rem;
          border-radius: 100px;
          text-decoration: none;
          transition: background 0.3s ease, border-color 0.3s ease, color 0.3s ease;
          width: fit-content;
        }

        .area-card__cta:hover {
          background: rgba(255, 255, 255, 0.05);
          border-color: rgba(255, 255, 255, 0.15);
          color: #94a3b8;
        }

        @media (max-width: 480px) {
          .areas-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </section>
  );
}
