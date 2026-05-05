import mersonPortrait from "@/assets/DOUTOR SOBRE MIM.png";
import { ArrowRight } from "lucide-react";
import { useState } from "react";
import { CareerTimelineModal } from "./CareerTimelineModal";
import { TextRevealByWord } from "@/components/ui/text-reveal";
import { ProgressiveBlur } from "@/components/ui/progressive-blur";

export function About() {
  const [modal, setModal] = useState(false);

  const shortCopy = "Merson Borges Tavares de Macedo (OAB/MA 15.972 • OAB/GO 69.793) Mais do que conhecimento jurídico, entregamos estratégia e segurança em cada decisão. Com formação sólida e vivência prática direta dentro do sistema judiciário, Merson Macedo atuou como Procurador de Município e, por quase quatro anos, como Assessor de Juiz no Tribunal de Justiça do Maranhão (TJMA). Nesse período, participou ativamente da elaboração de decisões, sentenças e condução de audiências, desenvolvendo uma visão privilegiada sobre como o Judiciário realmente funciona e decide. Essa experiência permite uma atuação mais cirúrgica, estratégica e segura, centrada na análise detalhada de cada caso, transparência total e foco absoluto no resultado.";

  return (
    <section id="sobre" className="relative overflow-hidden bg-[#040811]">
      <ProgressiveBlur position="top" backgroundColor="#040811" height="150px" />
      
      <div className="relative mx-auto max-w-7xl px-5 sm:px-6 py-24 sm:py-32">
        <div className="text-center reveal">
          <span className="eyebrow">Quem Somos</span>
          <h2 className="mt-8 font-serif text-4xl sm:text-5xl md:text-6xl tracking-[-0.015em]">
            A <span className="italic silver-text">Trajetória</span>
          </h2>
          <div className="ornament" aria-hidden>
            <span className="ornament-diamond" />
          </div>
        </div>

        <div className="mt-16 sm:mt-24 grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* Photo side */}
          <div className="relative reveal flex justify-center lg:justify-start">
            <div className="relative sticky top-32">
              <div className="absolute -inset-10 rounded-full bg-sky-500/10 blur-3xl opacity-40 animate-pulse" />
              <div className="relative rounded-[3rem] p-[1px] bg-gradient-to-br from-white/10 via-transparent to-white/5">
                <img
                  src={mersonPortrait}
                  alt="Dr. Merson Macedo"
                  loading="lazy"
                  className="rounded-[3rem] w-full max-w-[650px] h-auto object-cover filter contrast-[1.05]"
                />
              </div>
            </div>
          </div>

          {/* Text Reveal Side */}
          <div className="relative flex flex-col justify-center min-h-full">
            <div className="relative min-h-[120vh]">
               <TextRevealByWord 
                text={shortCopy} 
                className="!h-auto !min-h-0" 
              />
            </div>

            <div className="pt-10 reveal pb-32">
              <button
                onClick={() => setModal(true)}
                className="btn-silver inline-flex items-center gap-3 rounded-full bg-white px-10 py-5 text-sm font-semibold tracking-wide text-background shadow-silver hover:scale-105 transition-all duration-500"
              >
                Conhecer Trajetória Completa <ArrowRight size={20} />
              </button>
            </div>
          </div>
        </div>
      </div>

      <ProgressiveBlur position="bottom" backgroundColor="#040811" height="150px" />
      <CareerTimelineModal open={modal} onClose={() => setModal(false)} />
    </section>
  );
}
