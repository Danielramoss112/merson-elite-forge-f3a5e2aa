import { useEffect, useRef, useState, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X, Send, MessageCircle } from "lucide-react";
import { SITE } from "@/lib/site";
import { getLexResponse, QUICK_CHIPS } from "@/lib/lex-responses";

declare module "react" {
  namespace JSX {
    interface IntrinsicElements {
      "spline-viewer": React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement> & {
          url?: string;
          "loading-anim-type"?: string;
        },
        HTMLElement
      >;
    }
  }
}

type Msg = {
  id: string;
  from: "lex" | "user";
  text: string;
  cta?: boolean;
  typed?: boolean;
};

const SPLINE_URL = "https://prod.spline.design/ar717tfpG7qwEW0M/scene.splinecode";
const SPLINE_VIEWER_SRC = "https://unpkg.com/@splinetool/viewer@1.12.86/build/spline-viewer.js";

let splineLoaded = false;
function loadSpline() {
  if (splineLoaded || typeof window === "undefined") return;
  if (document.querySelector(`script[src="${SPLINE_VIEWER_SRC}"]`)) {
    splineLoaded = true;
    return;
  }
  const s = document.createElement("script");
  s.type = "module";
  s.src = SPLINE_VIEWER_SRC;
  document.head.appendChild(s);
  splineLoaded = true;
}

function uid() {
  return Math.random().toString(36).slice(2, 10);
}

export function LexChat() {
  const [open, setOpen] = useState(false);
  const [showBadge, setShowBadge] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([]);
  const [typing, setTyping] = useState(false);
  const [input, setInput] = useState("");
  const [splineReady, setSplineReady] = useState(false);
  const scrollerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (open) window.dispatchEvent(new CustomEvent("lex:opened"));
  }, [open]);

  useEffect(() => {
    const t = setTimeout(() => setShowBadge(true), 5000);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (!open) return;
    setShowBadge(false);
    if (!splineReady) {
      loadSpline();
      setSplineReady(true);
    }
    if (messages.length === 0) {
      const welcome: Msg = {
        id: uid(),
        from: "lex",
        text: "Bem-vindo ao atendimento estratégico. Sou o LEX, assistente digital do Dr. Merson. Como posso auxiliar em sua jornada jurídica hoje?",
        typed: false,
      };
      setMessages([welcome]);
    }
  }, [open, splineReady, messages.length]);

  useEffect(() => {
    const el = scrollerRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [messages, typing]);

  const respondTo = useCallback(async (userText: string) => {
    setMessages((m) => [...m, { id: uid(), from: "user", text: userText, typed: true }]);
    setTyping(true);
    await new Promise((r) => setTimeout(r, 1200));
    const { text, cta } = getLexResponse(userText);
    setTyping(false);
    setMessages((m) => [...m, { id: uid(), from: "lex", text, cta, typed: false }]);
  }, []);

  const handleSend = () => {
    const t = input.trim();
    if (!t) return;
    setInput("");
    respondTo(t);
  };

  return (
    <>
      <div className="fixed left-6 bottom-8 z-[80] flex flex-col items-start gap-3">
        <AnimatePresence>
          {showBadge && !open && (
            <motion.button
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              onClick={() => setOpen(true)}
              className="rounded-full glass border border-white/10 text-foreground text-[10px] uppercase tracking-widest font-medium px-5 py-2.5 shadow-elegant"
            >
              Consultoria Digital
            </motion.button>
          )}
        </AnimatePresence>

        <button
          onClick={() => setOpen((v) => !v)}
          className="relative h-16 w-16 rounded-full flex items-center justify-center bg-ink border border-white/10 shadow-elegant transition-all duration-500 hover:scale-110 hover:border-silver/40 group"
        >
          <MessageCircle size={24} className="text-silver group-hover:text-white transition-colors" />
          <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-silver animate-pulse shadow-silver" />
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, x: -40, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: -40, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 200, damping: 28 }}
            className="lex-panel fixed z-[90] flex flex-col overflow-hidden bg-ink/95 border border-white/10 shadow-elegant rounded-[2.5rem]"
            style={{ backdropFilter: "blur(30px)", WebkitBackdropFilter: "blur(30px)" }}
          >
            <div className="relative flex items-center gap-4 px-6 py-5 shrink-0 bg-white/5 border-b border-white/5">
              <div className="relative h-16 w-16 shrink-0 rounded-2xl overflow-hidden bg-background border border-white/10">
                {splineReady && (
                  <spline-viewer
                    url={SPLINE_URL}
                    style={{ width: "100%", height: "100%", scale: "1.4" }}
                    loading-anim-type="none"
                  />
                )}
              </div>

              <div className="flex-1 min-w-0">
                <h3 className="font-serif text-2xl silver-text leading-none">LEX</h3>
                <div className="text-[10px] text-foreground/40 uppercase tracking-widest mt-1.5 font-medium">
                  Estratégia Digital
                </div>
              </div>

              <button
                onClick={() => setOpen(false)}
                className="h-10 w-10 rounded-xl hover:bg-white/5 flex items-center justify-center text-foreground/40 hover:text-foreground transition-all duration-500"
              >
                <X size={20} />
              </button>
            </div>

            <div
              ref={scrollerRef}
              className="flex-1 overflow-y-auto px-6 py-8 space-y-6 scrollbar-hide"
            >
              {messages.map((m, i) => (
                <Bubble key={m.id} msg={m} />
              ))}

              {typing && (
                <div className="flex items-center gap-2 text-silver/20">
                  <div className="h-2 w-2 rounded-full bg-current animate-bounce [animation-delay:-0.3s]" />
                  <div className="h-2 w-2 rounded-full bg-current animate-bounce [animation-delay:-0.15s]" />
                  <div className="h-2 w-2 rounded-full bg-current animate-bounce" />
                </div>
              )}

              {messages.length === 1 && !typing && (
                <div className="pt-4 flex flex-wrap gap-2">
                  {QUICK_CHIPS.map((c) => (
                    <button
                      key={c}
                      onClick={() => respondTo(c)}
                      className="text-[11px] px-4 py-2 rounded-full border border-white/10 bg-white/5 text-foreground/60 hover:text-foreground hover:border-silver/40 hover:bg-white/10 transition-all duration-500 uppercase tracking-widest"
                    >
                      {c}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className="p-6 bg-white/5 border-t border-white/5 flex items-center gap-3">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
                placeholder="Como podemos atuar hoje?"
                className="flex-1 h-14 px-6 rounded-2xl bg-background border border-white/10 text-sm text-foreground placeholder:text-foreground/20 outline-none transition-all duration-500 focus:border-silver/40"
              />
              <button
                onClick={handleSend}
                className="h-14 w-14 rounded-2xl bg-white flex items-center justify-center text-background shadow-silver transition-all duration-500 hover:scale-105"
              >
                <Send size={18} />
              </button>
            </div>
          </motion.div>
        </AnimatePresence>

        <style>{`
          .lex-panel {
            left: 24px;
            bottom: 110px;
            width: 400px;
            height: 640px;
          }
          @media (max-width: 640px) {
            .lex-panel {
              left: 0; right: 0; bottom: 0;
              width: 100vw; height: 90vh;
              border-radius: 2.5rem 2.5rem 0 0;
            }
          }
        `}</style>
    </>
  );
}

function Bubble({ msg }: { msg: Msg }) {
  const [shown, setShown] = useState(msg.typed || msg.from === "user" ? msg.text : "");

  useEffect(() => {
    if (msg.from === "user" || msg.typed) {
      setShown(msg.text);
      return;
    }
    let i = 0;
    const id = setInterval(() => {
      i += 1;
      setShown(msg.text.slice(0, i));
      if (i >= msg.text.length) clearInterval(id);
    }, 20);
    return () => clearInterval(id);
  }, [msg.id, msg.text, msg.from, msg.typed]);

  if (msg.from === "user") {
    return (
      <div className="flex justify-end">
        <div className="max-w-[80%] px-5 py-3 rounded-[1.5rem] bg-white text-background text-[14px] font-medium shadow-silver">
          {msg.text}
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-start gap-3">
      <div className="max-w-[90%] px-6 py-4 rounded-[1.5rem] bg-white/5 border border-white/10 text-[14px] text-foreground/80 leading-relaxed font-light">
        {shown}
      </div>
      {msg.cta && shown.length === msg.text.length && (
        <a
          href={SITE.whatsappUrl}
          target="_blank"
          rel="noreferrer"
          className="btn-silver inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-[11px] font-bold uppercase tracking-widest text-background shadow-silver"
        >
          Consultoria Direta <Send size={14} />
        </a>
      )}
    </div>
  );
}
