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

  // Notify other widgets that LEX was opened
  useEffect(() => {
    if (open) {
      window.dispatchEvent(new CustomEvent("lex:opened"));
    }
  }, [open]);

  // Show badge after 5s
  useEffect(() => {
    const t = setTimeout(() => setShowBadge(true), 5000);
    return () => clearTimeout(t);
  }, []);

  // First open: load spline, send welcome
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
        text:
          "Olá! Sou o LEX, assistente jurídico do Dr. Merson Macedo. Escolha uma área ou digite sua dúvida:",
        typed: false,
      };
      setMessages([welcome]);
    }
  }, [open, splineReady, messages.length]);

  // Auto-scroll
  useEffect(() => {
    const el = scrollerRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [messages, typing]);

  const respondTo = useCallback(async (userText: string) => {
    setMessages((m) => [...m, { id: uid(), from: "user", text: userText, typed: true }]);
    setTyping(true);
    await new Promise((r) => setTimeout(r, 800));
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

  const handleChip = (chip: string) => {
    if (chip === "Falar com Dr. Merson") {
      respondTo("Quero falar com o Dr. Merson");
    } else {
      respondTo(chip);
    }
  };

  const lastIsLexAnswered = messages.length > 1 && messages[messages.length - 1].from === "lex";

  return (
    <>
      {/* Floating button */}
      <div className="fixed left-[28px] bottom-[30px] z-[80] flex flex-col items-start gap-2">
        <AnimatePresence>
          {showBadge && !open && (
            <motion.button
              key="badge"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 8 }}
              onClick={() => setOpen(true)}
              className="ml-1 rounded-full bg-[#c4953a] text-black text-[11px] font-medium px-3 py-1.5 shadow-[0_4px_18px_rgba(196,149,58,0.35)]"
            >
              LEX — Tire sua dúvida
            </motion.button>
          )}
        </AnimatePresence>

        <button
          aria-label="Abrir chat com LEX"
          onClick={() => setOpen((v) => !v)}
          className="lex-fab relative h-[58px] w-[58px] rounded-full flex items-center justify-center"
          style={{
            background: "#0c0c0d",
            border: "1.5px solid #c4953a",
          }}
        >
          <MessageCircle size={22} className="text-[#c4953a]" />
        </button>
      </div>

      {/* Panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="panel"
            initial={{ opacity: 0, x: -40, y: 0 }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            exit={{ opacity: 0, x: -40 }}
            transition={{ type: "spring", stiffness: 240, damping: 28 }}
            className="lex-panel fixed z-[90] flex flex-col overflow-hidden"
            style={{
              backdropFilter: "blur(20px)",
              WebkitBackdropFilter: "blur(20px)",
              background: "rgba(12,12,13,0.85)",
              border: "1px solid rgba(196,149,58,0.3)",
              boxShadow: "0 0 40px rgba(196,149,58,0.15)",
            }}
          >
            {/* Header */}
            <div
              className="relative flex items-center gap-3 px-4 py-3 shrink-0"
              style={{ background: "#111", borderBottom: "1px solid rgba(196,149,58,0.35)" }}
            >
              <div
                className="relative h-[100px] w-[100px] shrink-0 rounded-xl overflow-hidden"
                style={{ pointerEvents: "none", background: "#0c0c0d" }}
              >
                {splineReady ? (
                  <spline-viewer
                    url={SPLINE_URL}
                    style={{ width: "100%", height: "100%", pointerEvents: "none" }}
                    loading-anim-type="none"
                  />
                ) : (
                  <div className="h-full w-full flex items-center justify-center text-[#c4953a] text-xs">
                    LEX
                  </div>
                )}
              </div>

              <div className="flex-1 min-w-0">
                <div
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: 24,
                    color: "#c4953a",
                    lineHeight: 1,
                    letterSpacing: "-0.02em",
                  }}
                >
                  LEX
                </div>
                <div className="text-[12px] text-white/85 mt-1">
                  Assistente Jurídico Inteligente
                </div>
                <div className="mt-1.5 inline-flex items-center gap-1.5 text-[10px] text-emerald-400">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  Online
                </div>
              </div>

              <button
                onClick={() => setOpen(false)}
                aria-label="Fechar"
                className="absolute top-2 right-2 h-8 w-8 rounded-full hover:bg-white/5 flex items-center justify-center text-white/70 hover:text-[#c4953a]"
              >
                <X size={16} />
              </button>
            </div>

            {/* Messages */}
            <div
              ref={scrollerRef}
              className="flex-1 overflow-y-auto px-4 py-4 space-y-3"
              style={{ background: "#0c0c0d", fontFamily: "'Crimson Pro', serif" }}
            >
              {messages.map((m, i) => (
                <Bubble key={m.id} msg={m} isFirst={i === 0} />
              ))}

              {typing && (
                <div className="flex items-end gap-2">
                  <div
                    className="px-3 py-2 inline-flex gap-1"
                    style={{
                      background: "#1a1a1a",
                      border: "1px solid rgba(196,149,58,0.35)",
                      borderRadius: "0 12px 12px 12px",
                    }}
                  >
                    <Dot delay={0} />
                    <Dot delay={150} />
                    <Dot delay={300} />
                  </div>
                </div>
              )}

              {/* Initial chips */}
              {messages.length === 1 && !typing && (
                <div className="pt-2 flex flex-wrap gap-2">
                  {QUICK_CHIPS.map((c) => (
                    <button
                      key={c}
                      onClick={() => handleChip(c)}
                      className="text-[11px] px-3 py-1.5 rounded-full border transition-colors"
                      style={{ borderColor: "#c4953a", color: "#c4953a" }}
                      onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(196,149,58,0.1)")}
                      onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                    >
                      {c}
                    </button>
                  ))}
                </div>
              )}

              {/* Follow-up chips after each LEX answer */}
              {lastIsLexAnswered && !typing && messages.length > 1 && (
                <div className="pt-1 flex flex-wrap gap-2">
                  <button
                    onClick={() => respondTo("Saber mais")}
                    className="text-[11px] px-3 py-1.5 rounded-full border"
                    style={{ borderColor: "#c4953a", color: "#c4953a" }}
                  >
                    Saber mais
                  </button>
                  <a
                    href={SITE.whatsappUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="text-[11px] px-3 py-1.5 rounded-full"
                    style={{ background: "#c4953a", color: "#000" }}
                  >
                    Falar com Dr. Merson →
                  </a>
                </div>
              )}
            </div>

            {/* Input */}
            <div
              className="p-3 shrink-0 flex items-center gap-2"
              style={{ background: "#111", borderTop: "1px solid rgba(196,149,58,0.2)" }}
            >
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleSend();
                }}
                placeholder="Digite sua dúvida jurídica..."
                className="flex-1 h-10 px-3 rounded-full text-sm text-white placeholder:text-white/40 outline-none transition-colors"
                style={{
                  background: "#1a1a1a",
                  border: "1px solid rgba(196,149,58,0.2)",
                }}
                onFocus={(e) => (e.currentTarget.style.borderColor = "#c4953a")}
                onBlur={(e) => (e.currentTarget.style.borderColor = "rgba(196,149,58,0.2)")}
              />
              <button
                onClick={handleSend}
                aria-label="Enviar"
                className="h-10 w-10 rounded-full flex items-center justify-center"
                style={{ background: "rgba(196,149,58,0.15)", color: "#c4953a" }}
              >
                <Send size={16} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        .lex-fab {
          animation: lexPulse 2.4s ease-in-out infinite;
        }
        @keyframes lexPulse {
          0%, 100% { box-shadow: 0 0 0 0 rgba(196,149,58,0.45), 0 0 20px rgba(196,149,58,0.3); }
          50% { box-shadow: 0 0 0 10px rgba(196,149,58,0), 0 0 28px rgba(196,149,58,0.5); }
        }
        .lex-panel {
          left: 28px;
          bottom: 100px;
          width: 380px;
          height: 600px;
          border-radius: 16px;
        }
        @media (max-width: 640px) {
          .lex-panel {
            left: 0;
            right: 0;
            bottom: 0;
            width: 100vw;
            height: 85vh;
            border-radius: 16px 16px 0 0;
          }
        }
        @keyframes lexDot {
          0%, 80%, 100% { opacity: 0.3; transform: translateY(0); }
          40% { opacity: 1; transform: translateY(-3px); }
        }
      `}</style>
    </>
  );
}

function Dot({ delay }: { delay: number }) {
  return (
    <span
      className="inline-block h-1.5 w-1.5 rounded-full"
      style={{
        background: "#c4953a",
        animation: "lexDot 1s ease-in-out infinite",
        animationDelay: `${delay}ms`,
      }}
    />
  );
}

function Bubble({ msg, isFirst }: { msg: Msg; isFirst: boolean }) {
  const [shown, setShown] = useState(msg.typed || msg.from === "user" ? msg.text : "");

  useEffect(() => {
    if (msg.from === "user" || msg.typed) {
      setShown(msg.text);
      return;
    }
    let i = isFirst ? 0 : 0;
    setShown("");
    const id = setInterval(() => {
      i += 1;
      setShown(msg.text.slice(0, i));
      if (i >= msg.text.length) clearInterval(id);
    }, 30);
    return () => clearInterval(id);
  }, [msg.id, msg.text, msg.from, msg.typed, isFirst]);

  if (msg.from === "user") {
    return (
      <div className="flex justify-end">
        <div
          className="max-w-[85%] px-3 py-2 text-[14px]"
          style={{
            background: "#c4953a",
            color: "#000",
            borderRadius: "12px 0 12px 12px",
          }}
        >
          {msg.text}
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-start gap-2">
      <div
        className="max-w-[88%] px-3 py-2 text-[14px] text-white"
        style={{
          background: "#1a1a1a",
          border: "1px solid rgba(196,149,58,0.35)",
          borderRadius: "0 12px 12px 12px",
          lineHeight: 1.5,
        }}
      >
        {shown}
        {shown.length < msg.text.length && (
          <span className="inline-block w-1 h-3 ml-0.5 align-middle" style={{ background: "#c4953a" }} />
        )}
      </div>
      {msg.cta && shown.length === msg.text.length && (
        <a
          href={SITE.whatsappUrl}
          target="_blank"
          rel="noreferrer"
          className="text-[12px] px-4 py-2 rounded-full font-medium"
          style={{ background: "#22c55e", color: "#fff" }}
        >
          Falar pelo WhatsApp →
        </a>
      )}
    </div>
  );
}
