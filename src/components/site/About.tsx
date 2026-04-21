import merson from "@/assets/merson-hero-new.jpg";
import conquistas from "@/assets/merson-conquistas.jpg";
import { ArrowRight } from "lucide-react";
import { SITE } from "@/lib/site";
import { useState } from "react";
import { CareerTimelineModal } from "./CareerTimelineModal";
import { useTextReveal } from "@/hooks/use-text-reveal";

const slides = [
  { id: "foto", img: merson, label: "Dr. Merson" },
  { id: "conquistas", img: conquistas, label: "Principais Conquistas" },
];

export function About() {
  const [slide, setSlide] = useState(0);
  const [modal, setModal] = useState(false);

  return (
    <section id="sobre" className="relative py-28 overflow-hidden">
      <div className="deco-circle" style={{ width: 500, height: 500, top: -120, left: -200 }} />

      <div className="mx-auto max-w-7xl px-6">
        <div className="text-center reveal">
          <span className="inline-block rounded-full border border-gold/40 bg-gold/5 px-4 py-1.5 text-[10px] tracking-[0.22em] uppercase text-gold">
            Sobre o Advogado
          </span>
          <h2 className="mt-5 font-serif text-4xl md:text-5xl">
            Dr. Merson <span className="italic gold-text">Macedo</span>
          </h2>
        </div>

        <div className="mt-16 grid lg:grid-cols-2 gap-14 items-start">
          {/* Desktop: single photo. Mobile: swipe carousel */}
          <div className="relative reveal flex justify-center lg:justify-start">
            {/* Desktop photo */}
            <div className="relative hidden md:block">
              <div className="absolute -inset-3 rounded-[2rem] bg-gradient-to-br from-gold/40 via-transparent to-gold/20 blur-xl" />
              <div className="relative rounded-[2rem] border-2 border-gold/60 p-2 bg-ink">
                <img
                  src={merson}
                  alt="Dr. Merson Macedo"
                  className="rounded-[1.6rem] w-[420px] h-[560px] object-cover object-top"
                />
              </div>
              <div className="absolute -top-4 -left-4 h-16 w-16 rounded-full gradient-gold flex items-center justify-center font-serif text-2xl text-primary-foreground shadow-gold">
                Dr.
              </div>
              <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 flex gap-2 whitespace-nowrap">
                {["+500 casos", "TJMA & STJ", "OAB Ativo"].map((b) => (
                  <span
                    key={b}
                    className="rounded-full border border-gold/40 glass px-3 py-1.5 text-[11px] text-foreground/85"
                  >
                    {b}
                  </span>
                ))}
              </div>
            </div>

            {/* Mobile carousel */}
            <div className="md:hidden w-full">
              <div className="relative -mx-6 px-6 flex overflow-x-auto snap-x snap-mandatory gap-4 pb-3 scrollbar-hide">
                {slides.map((s, idx) => (
                  <div
                    key={s.id}
                    className="snap-center shrink-0 w-[85%] relative"
                    onScroll={() => setSlide(idx)}
                  >
                    <div className="relative rounded-[2rem] border-2 border-gold/60 p-2 bg-ink shadow-elegant">
                      <img
                        src={s.img}
                        alt={s.label}
                        className="rounded-[1.6rem] w-full h-[440px] object-cover object-top"
                      />
                    </div>
                    <span className="absolute top-6 left-6 rounded-full border border-gold/40 glass px-3 py-1.5 text-[10px] uppercase tracking-[0.2em] text-gold">
                      {s.label}
                    </span>
                  </div>
                ))}
              </div>
              <div className="mt-4 flex flex-wrap gap-2 justify-center">
                {["+500 casos", "TJMA & STJ", "OAB Ativo"].map((b) => (
                  <span
                    key={b}
                    className="rounded-full border border-gold/40 bg-gold/5 px-3 py-1.5 text-[11px] text-foreground/85"
                  >
                    {b}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="reveal space-y-5 text-foreground/80 leading-relaxed">
            <p>
              Natural de Alto Parnaíba/MA, o Dr. Merson Borges Tavares de Macedo construiu
              sua trajetória jurídica alicerçada na disciplina acadêmica e na prática
              forense de excelência. Bacharel em Direito pela UNIRG – Universidade de
              Gurupi/TO, instituição reconhecida pela qualidade do ensino jurídico no
              Centro-Oeste brasileiro.
            </p>
            <p>
              Em uma das fases mais formativas de sua carreira, Dr. Merson exerceu por
              quase quatro anos a função de Assessor de Juiz de Direito no Tribunal de
              Justiça do Maranhão (TJMA). Essa experiência ao lado do Poder Judiciário lhe
              proporcionou acesso privilegiado à jurisprudência, à técnica decisória e ao
              entendimento profundo dos critérios que orientam as decisões judiciais.
            </p>
            <p>
              Atuou como Assessor e Procurador de Município, função determinante para o
              desenvolvimento de sua visão institucional e capacidade de interpretação das
              normas de direito público. Essa passagem pela gestão pública conferiu ao Dr.
              Merson uma perspectiva estratégica única sobre o funcionamento do Estado e
              seus instrumentos jurídicos.
            </p>
            <blockquote className="border-l-2 border-gold pl-5 italic text-foreground/85">
              Dr. Merson Borges Tavares de Macedo é o sócio-fundador do escritório Merson
              Macedo – Advocacia & Consultoria, onde dirige uma equipe comprometida com
              a entrega de soluções jurídicas de alto impacto. Sob sua liderança, o
              escritório consolidou-se como referência em atendimento humanizado com
              resultado.
            </blockquote>

            <div className="flex flex-wrap gap-2 pt-2">
              <span className="rounded-full border border-gold/40 bg-gold/5 px-3 py-1.5 text-xs text-gold">
                OAB/GO 69.793-A
              </span>
              <span className="rounded-full border border-gold/40 bg-gold/5 px-3 py-1.5 text-xs text-gold">
                OAB/MA 15.972
              </span>
            </div>

            <button
              onClick={() => setModal(true)}
              className="mt-4 inline-flex items-center gap-2 text-gold hover:gap-3 transition-all"
            >
              Ver Trajetória Completa <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </div>
      <CareerTimelineModal open={modal} onClose={() => setModal(false)} />
    </section>
  );
}
