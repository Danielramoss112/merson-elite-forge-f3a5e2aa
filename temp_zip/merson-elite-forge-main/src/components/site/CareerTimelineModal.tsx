import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, X } from "lucide-react";
import { SITE } from "@/lib/site";

const MILESTONES = [
  {
    year: "2015",
    title: "Bacharel em Direito",
    desc: "Graduado pelo Centro Universitário UNIRG, Gurupi/TO, com distinção acadêmica.",
  },
  {
    year: "2017",
    title: "Assessor de Juiz",
    desc: "Nomeado Assessor de Juiz no TJMA, quase 4 anos elaborando milhares de decisões e sentenças.",
  },
  {
    year: "2021",
    title: "Procurador Municipal",
    desc: "Assessor e Procurador Municipal, consolidando expertise em Direito Público.",
  },
  {
    year: "2022",
    title: "Fundação do Escritório",
    desc: "Fundou o escritório Merson Macedo Advocacia & Consultoria, OAB/GO e OAB/MA.",
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
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
          style={{ background: "rgba(0,0,0,0.88)", backdropFilter: "blur(8px)" }}
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", stiffness: 240, damping: 26 }}
            className="relative w-full max-h-[90vh] overflow-y-auto"
            style={{
              maxWidth: 560,
              background: "#111",
              border: "1px solid rgba(168,184,208,0.3)",
              borderRadius: 16,
              padding: "48px 32px",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={onClose}
              aria-label="Fechar"
              className="absolute top-4 right-4 h-9 w-9 rounded-full hover:bg-white/5 flex items-center justify-center text-white/70 hover:text-[#a8b8d0]"
            >
              <X size={18} />
            </button>

            <h3
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontStyle: "italic",
                fontSize: 28,
                color: "#a8b8d0",
                letterSpacing: "-0.02em",
                lineHeight: 1.15,
              }}
            >
              Trajetória do Dr. Merson Macedo
            </h3>

            <div className="relative mt-8 pl-8">
              <motion.div
                initial={{ scaleY: 0 }}
                animate={{ scaleY: 1 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                style={{
                  position: "absolute",
                  left: 9,
                  top: 6,
                  bottom: 6,
                  width: 2,
                  background: "linear-gradient(180deg, #a67c2e, #cdd6e3, #a8b8d0)",
                  transformOrigin: "top",
                }}
              />
              <ul className="space-y-7">
                {MILESTONES.map((m, i) => (
                  <motion.li
                    key={m.year}
                    initial={{ opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 + i * 0.15, duration: 0.45 }}
                    className="relative"
                  >
                    <span
                      className="absolute"
                      style={{
                        left: -27,
                        top: 4,
                        width: 14,
                        height: 14,
                        borderRadius: 999,
                        background: "#a8b8d0",
                        boxShadow: "0 0 0 4px #111, 0 0 12px rgba(168,184,208,0.6)",
                      }}
                    />
                    <div className="text-sm font-bold" style={{ color: "#a8b8d0" }}>
                      {m.year}
                    </div>
                    <div className="text-[16px] text-white mt-0.5">{m.title}</div>
                    <div className="text-[14px] text-white/65 mt-1" style={{ lineHeight: 1.55 }}>
                      {m.desc}
                    </div>
                  </motion.li>
                ))}
              </ul>
            </div>

            <a
              href={SITE.whatsappUrl}
              target="_blank"
              rel="noreferrer"
              onClick={onClose}
              className="mt-10 inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-medium"
              style={{
                background: "linear-gradient(135deg, #a67c2e 0%, #a8b8d0 40%, #cdd6e3 70%, #a8b8d0 100%)",
                color: "#000",
              }}
            >
              Agendar Consulta <ArrowRight size={16} />
            </a>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
