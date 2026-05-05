import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, X } from "lucide-react";
import { SITE } from "@/lib/site";

const MILESTONES = [
  {
    year: "2015",
    title: "Bacharel em Direito",
    desc: "Graduado pela UNIRG — Universidade de Gurupi/TO, com sólido desempenho acadêmico.",
  },
  {
    year: "2017",
    title: "Assessor de Juiz de Direito (TJMA)",
    desc: "Atuação direta no Tribunal de Justiça do Maranhão por quase 4 anos, elaborando decisões estratégicas.",
  },
  {
    year: "2021",
    title: "Procurador Municipal",
    desc: "Consolidou expertise em Direito Público e Processual Administrativo na esfera municipal.",
  },
  {
    year: "2022",
    title: "Merson Macedo Advogados",
    desc: "Fundação do escritório focado em advocacia estratégica e resultados de alto impacto.",
  },
];

export function CareerTimelineModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-5 sm:p-6"
          style={{ background: "rgba(4,8,17,0.95)", backdropFilter: "blur(20px)" }}
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.98 }}
            transition={{ type: "spring", stiffness: 200, damping: 28 }}
            className="relative w-full max-h-[85vh] overflow-y-auto scrollbar-hide bg-ink border border-white/10 rounded-[3rem] p-10 sm:p-16 shadow-elegant"
            style={{ maxWidth: 640 }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={onClose}
              aria-label="Fechar"
              className="absolute top-6 right-6 h-12 w-12 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 flex items-center justify-center text-foreground transition-all duration-500"
            >
              <X size={20} />
            </button>

            <div className="text-center mb-12">
              <span className="eyebrow">Carreira</span>
              <h3 className="mt-8 font-serif text-3xl sm:text-4xl silver-text leading-tight">
                Trajetória de <span className="italic">Excelência</span>
              </h3>
            </div>

            <div className="relative mt-8 pl-12">
              <motion.div
                initial={{ scaleY: 0 }}
                animate={{ scaleY: 1 }}
                transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                className="absolute left-4 top-2 bottom-2 w-[1px] bg-gradient-to-b from-silver via-silver/20 to-transparent origin-top"
              />
              
              <ul className="space-y-12">
                {MILESTONES.map((m, i) => (
                  <motion.li
                    key={m.year}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 + i * 0.15, duration: 0.8 }}
                    className="relative group"
                  >
                    <span className="absolute -left-[43px] top-1.5 h-3 w-3 rounded-full bg-white shadow-[0_0_15px_rgba(255,255,255,0.4)] z-10 transition-transform duration-500 group-hover:scale-125" />
                    
                    <div className="text-[10px] uppercase tracking-[0.3em] text-silver font-bold font-mono">
                      {m.year}
                    </div>
                    <div className="text-xl sm:text-2xl font-serif text-foreground mt-2 leading-snug tracking-wide">
                      {m.title}
                    </div>
                    <div className="text-[1rem] text-foreground/40 mt-3 leading-relaxed font-light">
                      {m.desc}
                    </div>
                  </motion.li>
                ))}
              </ul>
            </div>

            <div className="mt-16 text-center">
              <a
                href={SITE.whatsappUrl}
                target="_blank"
                rel="noreferrer"
                onClick={onClose}
                className="btn-silver inline-flex items-center gap-3 rounded-full bg-white px-10 py-5 text-sm font-semibold tracking-wide text-background shadow-silver transition-all duration-700"
              >
                Agendar Consultoria <ArrowRight size={20} />
              </a>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
