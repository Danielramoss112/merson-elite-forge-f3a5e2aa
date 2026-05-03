import { useEffect, useState } from "react";
import { BarChart3, Scale, Activity, Sparkles } from "lucide-react";
import { useCountUp } from "@/hooks/use-count-up";

type NewsItem = { tag: string; title: string; date: string; link?: string };

const FALLBACK: NewsItem[] = [
  { tag: "TST", title: "Tribunal reconhece vínculo empregatício em plataformas digitais", date: "Atualizado hoje" },
  { tag: "STF", title: "Plenário decide sobre marco temporal e impacta milhares de processos", date: "Atualizado hoje" },
  { tag: "STJ", title: "Súmula amplia direito de revisão de contratos bancários", date: "Atualizado hoje" },
  { tag: "TJMA", title: "Decisão fortalece proteção de consumidores em planos de saúde", date: "Atualizado hoje" },
];

const LEX_LINES = [
  "Consultando jurisprudência no STJ...",
  "Analisando probabilidade de êxito...",
  "Cruzando precedentes bancários...",
  "Verificando teses recentes do TJMA...",
  "Mapeando decisões análogas no STF...",
];

function TypingLine() {
  const [idx, setIdx] = useState(0);
  const [text, setText] = useState("");

  useEffect(() => {
    const target = LEX_LINES[idx];
    let i = 0;
    setText("");
    const typer = setInterval(() => {
      i++;
      setText(target.slice(0, i));
      if (i >= target.length) clearInterval(typer);
    }, 32);
    const next = setTimeout(() => setIdx((p) => (p + 1) % LEX_LINES.length), 3600);
    return () => {
      clearInterval(typer);
      clearTimeout(next);
    };
  }, [idx]);

  return (
    <div className="font-mono text-[12px] md:text-[13px] tracking-tight">
      <span className="silver-text font-bold">
        {"> "}{text}
      </span>
      <span className="lex-caret" />
    </div>
  );
}

function Sparkline() {
  const points = [8, 14, 11, 18, 16, 22, 19, 26, 24, 30, 28, 34];
  const max = 36;
  const w = 220;
  const h = 60;
  const step = w / (points.length - 1);
  const path = points
    .map((v, i) => `${i === 0 ? "M" : "L"} ${i * step},${h - (v / max) * h}`)
    .join(" ");
  const area = `${path} L ${w},${h} L 0,${h} Z`;
  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="w-full h-[60px]" preserveAspectRatio="none">
      <defs>
        <linearGradient id="sparkFill" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="#cbd5e1" stopOpacity="0.2" />
          <stop offset="100%" stopColor="#cbd5e1" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="sparkLine" x1="0" x2="1">
          <stop offset="0%" stopColor="#94a3b8" />
          <stop offset="100%" stopColor="#f8fafc" />
        </linearGradient>
      </defs>
      <path d={area} fill="url(#sparkFill)" />
      <path d={path} fill="none" stroke="url(#sparkLine)" strokeWidth="1.5" />
    </svg>
  );
}

export function Intelligence() {
  const [news, setNews] = useState<NewsItem[]>(FALLBACK);
  const [i, setI] = useState(0);
  const [pct, pctRef] = useCountUp(98, 2000);
  const [precedents, precRef] = useCountUp(1247, 1800);

  useEffect(() => {
    let cancelled = false;
    fetch("/api/news")
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => {
        if (!cancelled && d?.items?.length) setNews(d.items.slice(0, 4));
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    const t = setInterval(() => setI((p) => (p + 1) % news.length), 4000);
    return () => clearInterval(t);
  }, [news.length]);

  const current = news[i] ?? FALLBACK[0];

  return (
    <section id="lex" className="relative py-24 sm:py-32 overflow-hidden bg-[#040811]">
      <div className="mx-auto max-w-7xl px-5 sm:px-6">
        <div className="text-center reveal">
          <span className="eyebrow">LEX Radar</span>
          <h2 className="mt-8 font-serif text-4xl sm:text-5xl md:text-6xl">
            Inteligência <span className="italic silver-text">Legal</span>
          </h2>
          <div className="ornament" aria-hidden>
            <span className="ornament-diamond" />
          </div>
          <p className="mt-8 max-w-2xl mx-auto font-light text-[1.1rem] text-foreground/40 leading-relaxed">
            Painel de análise jurídica em tempo real, integrando jurisprudência atualizada 
            do STF, STJ, TST e tribunais estaduais.
          </p>
        </div>

        {/* Bento dashboard */}
        <div className="mt-16 sm:mt-24 grid lg:grid-cols-6 gap-6 sm:gap-8">
          {/* LEX Terminal */}
          <div
            className="reveal lg:col-span-4 rounded-[2.5rem] border border-white/5 bg-ink-soft p-8 md:p-10 shadow-elegant relative overflow-hidden"
          >
            <div
              aria-hidden
              className="absolute inset-0 opacity-[0.03] pointer-events-none"
              style={{
                backgroundImage:
                  "linear-gradient(transparent 95%, rgba(255,255,255,0.1) 95%), linear-gradient(90deg, transparent 95%, rgba(255,255,255,0.1) 95%)",
                backgroundSize: "32px 32px",
              }}
            />
            <div className="relative flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full" style={{ background: "#ef4444" }} />
                <span className="h-2 w-2 rounded-full" style={{ background: "#fbbf24" }} />
                <span className="h-2 w-2 rounded-full" style={{ background: "#22c55e" }} />
                <span className="ml-4 text-[10px] tracking-[0.3em] uppercase text-foreground/30 font-medium">
                  lex.terminal
                </span>
              </div>
              <span className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.3em] text-silver/60">
                <Activity size={12} className="animate-pulse" /> processando
              </span>
            </div>

            <div className="relative mt-10 space-y-4">
              <TypingLine />
              <div className="font-mono text-[12px] text-foreground/30">
                {"// "}analisando 1.247 precedentes · 23ms
              </div>
              <div className="font-mono text-[12px] text-foreground/30">
                {">"} match: <span className="text-silver">REsp 1.840.531/SP</span> ·
                <span className="text-silver"> Súmula 297/STJ</span>
              </div>
            </div>

            <div className="relative mt-10 grid grid-cols-3 gap-6">
              {[
                { label: "Precedentes", val: Math.round(precedents).toLocaleString("pt-BR"), ref: precRef },
                { label: "Êxito Médio", val: "94%" },
                { label: "Latência", val: "2.4s" }
              ].map((item, idx) => (
                <div key={idx} className="rounded-[1.5rem] border border-white/5 bg-background/40 p-6">
                  <div className="text-[9px] tracking-[0.3em] uppercase text-foreground/30 font-medium">
                    {item.label}
                  </div>
                  <div ref={item.ref as any} className="mt-2 font-serif text-3xl silver-text">
                    {item.val}
                  </div>
                </div>
              ))}
            </div>

            <div className="relative mt-10">
              <div className="flex items-center justify-between text-[10px] tracking-[0.3em] uppercase text-foreground/30 mb-4">
                <span>Jurisprudência · Tendência 12 semanas</span>
                <span className="text-silver inline-flex items-center gap-1">
                  <Sparkles size={12} /> +28%
                </span>
              </div>
              <Sparkline />
            </div>
          </div>

          {/* Live news */}
          <div className="reveal lg:col-span-2 rounded-[2.5rem] border border-white/5 bg-ink-soft p-8 md:p-10 shadow-elegant flex flex-col">
            <div className="flex items-center gap-4">
              <span className="inline-flex items-center gap-2 rounded-full bg-white/5 border border-white/10 px-4 py-2 text-[9px] uppercase tracking-[0.2em] text-foreground/60">
                <span className="h-2 w-2 rounded-full bg-red-500 live-dot shadow-[0_0_8px_rgba(239,68,68,0.5)]" />
                Live Feed
              </span>
              <span className="text-[10px] text-foreground/30 uppercase tracking-widest">{current.date}</span>
            </div>
            <div className="mt-8 flex-1">
              <span className="inline-block rounded-lg bg-white/5 border border-white/10 px-3 py-1.5 text-[10px] text-silver font-bold uppercase tracking-widest">
                {current.tag}
              </span>
              <h3 className="mt-6 font-serif text-2xl md:text-3xl leading-snug silver-text">
                {current.link ? (
                  <a href={current.link} target="_blank" rel="noreferrer" className="hover:opacity-80 transition-opacity">
                    {current.title}
                  </a>
                ) : (
                  current.title
                )}
              </h3>
            </div>
            <div className="mt-10 flex gap-3">
              {news.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setI(idx)}
                  className={`h-1 rounded-full transition-all duration-500 ${
                    idx === i ? "w-10 bg-silver" : "w-4 bg-white/10"
                  }`}
                  aria-label={`Notícia ${idx + 1}`}
                />
              ))}
            </div>
          </div>

          {/* Resolution rate */}
          <div
            ref={pctRef as React.RefObject<HTMLDivElement>}
            className="reveal lg:col-span-2 rounded-[2.5rem] border border-white/5 bg-ink-soft p-10 shadow-elegant flex flex-col justify-between"
          >
            <BarChart3 className="text-silver/40" size={32} />
            <div className="mt-8">
              <div className="font-serif text-6xl md:text-7xl silver-text leading-none">
                {Math.round(pct)}%
              </div>
              <div className="mt-4 text-[10px] uppercase tracking-[0.3em] text-foreground/40 font-medium">
                Taxa de Resolução Estratégica
              </div>
              <div className="mt-8 h-1.5 rounded-full bg-white/5 overflow-hidden">
                <div
                  className="h-full rounded-full bg-silver shadow-silver"
                  style={{ width: `${Math.round(pct)}%`, transition: 'width 2s cubic-bezier(0.16, 1, 0.3, 1)' }}
                />
              </div>
            </div>
          </div>

          {/* Expertise */}
          <div className="reveal lg:col-span-4 rounded-[2.5rem] border border-white/5 bg-ink-soft p-10 shadow-elegant flex flex-col md:flex-row md:items-center gap-10">
            <div className="h-16 w-16 rounded-3xl bg-white/5 border border-white/10 flex items-center justify-center text-silver shrink-0">
              <Scale size={32} />
            </div>
            <div>
              <h4 className="font-serif text-3xl silver-text">Expertise Comprovada</h4>
              <p className="mt-4 text-[1rem] text-foreground/40 leading-relaxed font-light">
                Atuação técnica rigorosa em tribunais superiores, com domínio absoluto 
                do processo decisório e teses contemporâneas em Direito Civil e Público.
              </p>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .lex-caret {
          display: inline-block;
          width: 7px; height: 14px;
          margin-left: 4px;
          vertical-align: middle;
          background: var(--silver);
          animation: lexCaret 1s steps(1) infinite;
          border-radius: 1px;
        }
        @keyframes lexCaret { 50% { opacity: 0; } }
      `}</style>
    </section>
  );
}
