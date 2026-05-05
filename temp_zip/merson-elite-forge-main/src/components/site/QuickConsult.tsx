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
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 30 }}
          transition={{ type: "spring", stiffness: 260, damping: 26 }}
          className="fixed z-[70]"
          style={{
            bottom: 100,
            right: 28,
            width: 280,
            background: "#111",
            border: "1px solid #a8b8d0",
            borderRadius: 12,
            boxShadow: "0 0 30px rgba(168,184,208,0.15)",
            padding: 18,
          }}
        >
          <button
            onClick={close}
            aria-label="Fechar"
            className="absolute top-2 right-2 h-7 w-7 rounded-full hover:bg-white/5 flex items-center justify-center text-white/60 hover:text-[#a8b8d0]"
          >
            <X size={14} />
          </button>
          <div className="flex items-start gap-3">
            <div
              className="h-9 w-9 shrink-0 rounded-full flex items-center justify-center"
              style={{ background: "rgba(168,184,208,0.15)", color: "#a8b8d0" }}
            >
              <MessageCircle size={18} />
            </div>
            <div className="flex-1 min-w-0">
              <div
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: 18,
                  color: "#fff",
                  lineHeight: 1.2,
                }}
              >
                Tem uma dúvida jurídica?
              </div>
              <div className="text-[13px] text-white/60 mt-1" style={{ lineHeight: 1.45 }}>
                O Dr. Merson responde em até 2h
              </div>
            </div>
          </div>
          <a
            href={SITE.whatsappUrl}
            target="_blank"
            rel="noreferrer"
            onClick={close}
            className="mt-4 block w-full text-center text-[13px] font-medium py-2.5 rounded-full"
            style={{ background: "#22c55e", color: "#fff" }}
          >
            Falar agora →
          </a>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
