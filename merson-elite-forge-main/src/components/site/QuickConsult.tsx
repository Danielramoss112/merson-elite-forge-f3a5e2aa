import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { MessageCircle, X } from "lucide-react";
import { SITE } from "@/lib/site";

export function QuickConsult({ onVisibilityChange }: { onVisibilityChange?: (v: boolean) => void }) {
  const [open, setOpen] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (sessionStorage.getItem("quickConsultShown")) {
      setDismissed(true);
      return;
    }
    let cancelled = false;
    const onLex = () => {
      cancelled = true;
      sessionStorage.setItem("quickConsultShown", "1");
      setDismissed(true);
    };
    const onWa = (e: MouseEvent) => {
      const t = e.target as HTMLElement | null;
      if (t?.closest('a[href*="whatsapp"]')) {
        cancelled = true;
        sessionStorage.setItem("quickConsultShown", "1");
        setDismissed(true);
      }
    };
    window.addEventListener("lex:opened", onLex);
    document.addEventListener("click", onWa, true);

    const t = setTimeout(() => {
      if (!cancelled) {
        setOpen(true);
        sessionStorage.setItem("quickConsultShown", "1");
      }
    }, 15000);
    return () => {
      clearTimeout(t);
      window.removeEventListener("lex:opened", onLex);
      document.removeEventListener("click", onWa, true);
    };
  }, []);

  useEffect(() => {
    onVisibilityChange?.(open);
  }, [open, onVisibilityChange]);

  const close = () => {
    setOpen(false);
    setDismissed(true);
  };

  if (dismissed && !open) return null;

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0, y: 30, x: 20 }}
          animate={{ opacity: 1, y: 0, x: 0 }}
          exit={{ opacity: 0, y: 30, x: 20 }}
          transition={{ type: "spring", stiffness: 200, damping: 25 }}
          className="fixed z-[70] bottom-24 right-6 sm:right-10 w-[300px] bg-ink border border-white/10 rounded-[2rem] p-8 shadow-elegant overflow-hidden"
        >
          {/* Ambient glow */}
          <div className="absolute top-0 right-0 w-24 h-24 bg-silver/5 blur-2xl rounded-full" />
          
          <button
            onClick={close}
            aria-label="Fechar"
            className="absolute top-4 right-4 h-8 w-8 rounded-xl hover:bg-white/5 flex items-center justify-center text-foreground/40 hover:text-foreground transition-all duration-500"
          >
            <X size={16} />
          </button>
          
          <div className="flex flex-col items-center text-center">
            <div className="h-12 w-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-silver shadow-silver mb-5">
              <MessageCircle size={24} />
            </div>
            
            <h4 className="font-serif text-2xl silver-text leading-tight">
              Análise <span className="italic">Estratégica</span>
            </h4>
            
            <p className="mt-4 text-[13px] text-foreground/50 leading-relaxed font-light">
              Tem uma dúvida jurídica urgente? Receba uma orientação direta em até 2h.
            </p>
            
            <a
              href={SITE.whatsappUrl}
              target="_blank"
              rel="noreferrer"
              onClick={close}
              className="mt-6 w-full btn-silver inline-flex items-center justify-center gap-2 rounded-full bg-white py-4 text-[13px] font-bold uppercase tracking-widest text-background shadow-silver transition-all duration-700"
            >
              Falar Agora
            </a>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
