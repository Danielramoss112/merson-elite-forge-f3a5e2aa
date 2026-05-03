import merson from "@/assets/merson-hero-new.jpg";
import { ArrowRight } from "lucide-react";
import { SITE } from "@/lib/site";
import { useState, useRef, useEffect } from "react";
import { CareerTimelineModal } from "./CareerTimelineModal";
import { motion, useInView, useAnimation } from "framer-motion";

export function About() {
  const [modal, setModal] = useState(false);
  
  return (
    <section id="sobre" className="relative py-24 sm:py-32 overflow-hidden bg-[#040811]">
      <div 
        aria-hidden
        className="absolute top-1/4 -left-20 w-96 h-96 bg-silver/5 blur-[120px] rounded-full pointer-events-none" 
      />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-6">
        <div className="text-center reveal">
          <span className="eyebrow">A Trajetória</span>
          <h2 className="mt-8 font-serif text-4xl sm:text-5xl md:text-6xl">
            Liderança e <span className="italic silver-text">Excelência</span>
          </h2>
          <div className="ornament" aria-hidden>
            <span className="ornament-diamond" />
          </div>
        </div>

        <div className="mt-16 sm:mt-24 grid lg:grid-cols-2 gap-16 lg:gap-24 items-start">
          {/* Photos side */}
          <div className="relative reveal flex justify-center lg:justify-start">
            <div className="relative hidden md:block">
              <div className="absolute -inset-6 rounded-[3rem] bg-silver/5 blur-3xl opacity-50" />
              <div className="relative rounded-[3rem] p-[1px] bg-gradient-to-br from-white/20 via-transparent to-white/10 shadow-elegant">
                <div className="rounded-[calc(3rem-1px)] overflow-hidden bg-ink p-2">
                  <img
                    src={merson}
                    alt="Dr. Merson Macedo"
                    className="rounded-[2.5rem] w-[440px] h-[580px] object-cover object-top filter contrast-[1.05]"
                  />
                </div>
              </div>
              <div className="absolute -top-6 -left-6 h-16 w-16 rounded-2xl bg-white border border-white/10 flex items-center justify-center font-serif text-2xl text-background shadow-silver z-20">
                M.
              </div>
            </div>

            <div className="md:hidden w-full">
              <div className="relative rounded-[2.5rem] p-[1px] bg-white/10 overflow-hidden shadow-elegant">
                <img
                  src={merson}
                  alt="Dr. Merson"
                  className="w-full h-[480px] object-cover object-top rounded-[calc(2.5rem-1px)]"
                />
              </div>
            </div>
          </div>

          {/* Text content side with Letter-by-Letter reveal */}
          <div className="space-y-8 leading-[1.8] font-light text-[1.1rem] sm:text-[1.2rem] text-foreground/50">
            <LetterReveal 
              text="Natural de Alto Parnaíba/MA, o Dr. Merson Borges Tavares de Macedo construiu sua trajetória jurídica alicerçada na disciplina acadêmica e na prática forense de excelência. Bacharel em Direito pela UNIRG, instituição reconhecida pela qualidade do ensino jurídico."
            />
            
            <LetterReveal 
              text="Exerceu por quase quatro anos a função de Assessor de Juiz de Direito no Tribunal de Justiça do Maranhão (TJMA), o que lhe proporcionou um entendimento profundo dos critérios que orientam as decisões judiciais e da técnica decisória do Estado."
            />
            
            <LetterReveal 
              text="Atuou ainda como Procurador Municipal, consolidando sua visão estratégica sobre o Direito Público e Administrativo. Essa vivência institucional é o diferencial que traz segurança e assertividade para cada caso sob sua responsabilidade."
            />

            <blockquote className="relative p-8 sm:p-10 bg-white/5 rounded-[2.5rem] border border-white/10 italic text-foreground/80 shadow-elegant reveal">
              <span className="absolute top-4 left-6 text-6xl text-silver/20 font-serif leading-none">“</span>
              Sócio-proprietário do escritório Merson Macedo Advogados, dirige uma equipe comprometida com soluções de alto impacto e atendimento humanizado focado em resultados reais.
            </blockquote>

            <div className="flex flex-wrap gap-3 pt-4 reveal">
              <span className="rounded-full border border-white/10 bg-white/5 px-5 py-2 text-[10px] uppercase tracking-widest text-silver">
                OAB/GO 69.793-A
              </span>
              <span className="rounded-full border border-white/10 bg-white/5 px-5 py-2 text-[10px] uppercase tracking-widest text-silver">
                OAB/MA 15.972
              </span>
            </div>

            <div className="pt-6 reveal">
              <button
                onClick={() => setModal(true)}
                className="btn-silver inline-flex items-center gap-3 rounded-full bg-white px-8 py-4 text-sm font-semibold tracking-wide text-background shadow-silver transition-all duration-700"
              >
                Conhecer Trajetória Completa <ArrowRight size={18} />
              </button>
            </div>
          </div>
        </div>
      </div>
      <CareerTimelineModal open={modal} onClose={() => setModal(false)} />
    </section>
  );
}

function LetterReveal({ text }: { text: string }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [isInView, controls]);

  const container = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: 0.008, delayChildren: 0.04 * i },
    }),
  };

  const child = {
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
      },
    },
    hidden: {
      opacity: 0,
      y: 10,
    },
  };

  return (
    <motion.p
      ref={ref}
      variants={container}
      initial="hidden"
      animate={controls}
      className="inline-block"
    >
      {text.split("").map((char, index) => (
        <motion.span key={index} variants={child}>
          {char}
        </motion.span>
      ))}
    </motion.p>
  );
}
