import { createFileRoute, Link } from "@tanstack/react-router";
import { Suspense, lazy, useEffect, useRef, useState, useCallback } from "react";
import { ArrowLeft, Send } from "lucide-react";
import { SITE } from "@/lib/site";
import { getLexResponse, QUICK_CHIPS } from "@/lib/lex-responses";

const Spline = lazy(() => import("@splinetool/react-spline"));
const SPLINE_URL = "https://prod.spline.design/ar717tfpG7qwEW0M/scene.splinecode";

export const Route = createFileRoute("/lex")({
  head: () => ({
    meta: [
      { title: "LEX — Assistente Jurídico Inteligente | Dr. Merson Macedo" },
      {
        name: "description",
        content:
          "Converse com LEX, o assistente jurídico inteligente do Dr. Merson Macedo. Tire dúvidas 24h por dia sobre direito bancário, previdenciário, civil e mais.",
      },
    ],
  }),
  component: LexPage,
});

type Msg = { id: string; from: "lex" | "user"; text: string; cta?: boolean; typed?: boolean };
const uid = () => Math.random().toString(36).slice(2, 10);

function LexPage() {
  const [messages, setMessages] = useState<Msg[]>([
    {
      id: uid(),
      from: "lex",
      text: "Olá! Sou o LEX, assistente jurídico do Dr. Merson Macedo. Escolha uma área ou digite sua dúvida:",
      typed: false,
    },
  ]);
  const [typing, setTyping] = useState(false);
  const [input, setInput] = useState("");
  const scrollerRef = useRef<HTMLDivElement>(null);

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

  const lastIsLexAnswered = messages.length > 1 && messages[messages.length - 1].from === "lex";

  return (
    <main className="min-h-screen bg-background text-foreground" style={{ fontFamily: "'Crimson Pro','Cormorant Garamond',serif" }}>
      <div className="absolute top-6 left-6 z-50">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm text-white/70 hover:text-[#c4953a] transition-colors"
        >
          <ArrowLeft size={16} /> Voltar
        </Link>
      </div>

      <div className="grid lg:grid-cols-2 min-h-screen">
        {/* Left: 3D + intro */}
        <div
          className="relative flex flex-col items-center justify-center p-8 lg:p-12"
          style={{ background: "#0a0a14" }}
        >
          <span
            className="rounded-full border px-4 py-1.5 text-[10px] tracking-[0.22em] uppercase"
            style={{ borderColor: "rgba(196,149,58,0.5)", color: "#c4953a", background: "rgba(196,149,58,0.05)" }}
          >
            LEX — Assistente Jurídico
          </span>

          <div
            className="relative mt-8 w-full max-w-md aspect-square"
            style={{ filter: "hue-rotate(200deg) saturate(1.5) brightness(0.9)" }}
          >
            <Suspense
              fallback={
                <div className="h-full w-full flex items-center justify-center text-[#c4953a]/60 text-sm">
                  Carregando LEX 3D…
                </div>
              }
            >
              <Spline scene={SPLINE_URL} style={{ width: "100%", height: "100%" }} />
            </Suspense>
            {/* Cobre o badge "Built with Spline" */}
            <div
              aria-hidden
              className="absolute pointer-events-none"
              style={{
                right: 0,
                bottom: 0,
                width: 160,
                height: 56,
                background: "#0a0a14",
              }}
            />
          </div>

          <p
            className="mt-6 text-center text-white/65 max-w-sm"
            style={{ fontFamily: "'Crimson Pro','Cormorant Garamond',serif", fontSize: 16, lineHeight: 1.6 }}
          >
            Desenvolvido para tirar suas dúvidas jurídicas 24h por dia.
          </p>
        </div>

        {/* Right: Chat */}
        <div className="flex items-center justify-center p-4 lg:p-8" style={{ background: "#0c0c0d" }}>
          <div
            className="flex flex-col w-full"
            style={{
              maxWidth: 560,
              height: "80vh",
              background: "rgba(12,12,13,0.95)",
              border: "1px solid rgba(196,149,58,0.3)",
              backdropFilter: "blur(20px)",
              WebkitBackdropFilter: "blur(20px)",
              borderRadius: 16,
              overflow: "hidden",
            }}
          >
            {/* Header */}
            <div
              className="px-5 py-4 shrink-0"
              style={{ borderBottom: "1px solid rgba(196,149,58,0.25)", background: "#111" }}
            >
              <div
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: 28,
                  color: "#c4953a",
                  lineHeight: 1,
                  letterSpacing: "-0.02em",
                }}
              >
                LEX
              </div>
              <div className="text-[13px] text-white/65 mt-1">Assistente Jurídico Inteligente</div>
              <div className="mt-1.5 inline-flex items-center gap-1.5 text-[11px] text-emerald-400">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Online
              </div>
            </div>

            {/* Messages */}
            <div ref={scrollerRef} className="flex-1 overflow-y-auto px-5 py-4 space-y-3">
              {messages.map((m) => (
                <ChatBubble key={m.id} msg={m} />
              ))}

              {typing && (
                <div className="flex">
                  <div
                    className="px-3 py-2 inline-flex gap-1"
                    style={{
                      background: "#1a1a1a",
                      border: "1px solid rgba(196,149,58,0.35)",
                      borderRadius: "0 12px 12px 12px",
                    }}
                  >
                    <Dot d={0} />
                    <Dot d={150} />
                    <Dot d={300} />
                  </div>
                </div>
              )}

              {messages.length === 1 && !typing && (
                <div className="pt-2 flex flex-wrap gap-2">
                  {QUICK_CHIPS.map((c) => (
                    <button
                      key={c}
                      onClick={() => respondTo(c)}
                      className="text-[11px] px-3 py-1.5 rounded-full border transition-colors hover:bg-[rgba(196,149,58,0.1)]"
                      style={{ borderColor: "#c4953a", color: "#c4953a" }}
                    >
                      {c}
                    </button>
                  ))}
                </div>
              )}

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
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
                placeholder="Digite sua dúvida jurídica..."
                className="flex-1 h-10 px-3 rounded-full text-sm text-white placeholder:text-white/40 outline-none"
                style={{ background: "#1a1a1a", border: "1px solid rgba(196,149,58,0.2)" }}
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
          </div>
        </div>
      </div>
    </main>
  );
}

function Dot({ d }: { d: number }) {
  return (
    <span
      className="inline-block h-1.5 w-1.5 rounded-full"
      style={{ background: "#c4953a", animation: "lexDot 1s ease-in-out infinite", animationDelay: `${d}ms` }}
    />
  );
}

function ChatBubble({ msg }: { msg: Msg }) {
  const [shown, setShown] = useState(msg.typed || msg.from === "user" ? msg.text : "");

  useEffect(() => {
    if (msg.from === "user" || msg.typed) {
      setShown(msg.text);
      return;
    }
    let i = 0;
    setShown("");
    const id = setInterval(() => {
      i += 1;
      setShown(msg.text.slice(0, i));
      if (i >= msg.text.length) clearInterval(id);
    }, 25);
    return () => clearInterval(id);
  }, [msg.id, msg.text, msg.from, msg.typed]);

  if (msg.from === "user") {
    return (
      <div className="flex justify-end">
        <div
          className="max-w-[85%] px-3 py-2 text-[14px]"
          style={{ background: "#c4953a", color: "#000", borderRadius: "12px 0 12px 12px" }}
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
          lineHeight: 1.55,
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
          Falar com Dr. Merson →
        </a>
      )}
    </div>
  );
}
