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
      <span
        style={{
          background: "linear-gradient(90deg, #cdd6e3 0%, #8aa6d6 50%, #cdd6e3 100%)",
          WebkitBackgroundClip: "text",
          backgroundClip: "text",
          color: "transparent",
        }}
      >
        {"> "}{text}
      </span>
      <span className="lex-caret" />
    </div>
  );
}

function Sparkline() {
  // Static elegant SVG sparkline (no script weight)
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
          <stop offset="0%" stopColor="#cdd6e3" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#cdd6e3" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="sparkLine" x1="0" x2="1">
          <stop offset="0%" stopColor="#8aa6d6" />
          <stop offset="100%" stopColor="#cdd6e3" />
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
    <section id="lex" className="relative py-28 overflow-hidden">
      <div className="mx-auto max-w-7xl px-6">
        <div className="text-center reveal">
          <span className="eyebrow">LEX IA · Radar Jurídico</span>
          <h2 className="mt-6 font-serif text-4xl md:text-5xl">
            Inteligência <span className="italic gold-text">Legal</span>
          </h2>
          <div className="ornament" aria-hidden>
            <span className="ornament-diamond" />
          </div>
          <p className="mt-5 max-w-2xl mx-auto font-body-serif text-[1.08rem] text-foreground/70">
            Painel de análise jurídica em tempo real, alimentado por jurisprudência atualizada
            de STF, STJ, TST e tribunais estaduais.
          </p>
        </div>

        {/* Bento dashboard */}
        <div className="mt-14 grid lg:grid-cols-6 gap-5">
          {/* LEX Terminal */}
          <div
            className="reveal lg:col-span-4 rounded-3xl border border-border bg-card p-6 md:p-8 shadow-elegant relative overflow-hidden"
          >
            <div
              aria-hidden
              className="absolute inset-0 opacity-[0.04] pointer-events-none"
              style={{
                backgroundImage:
                  "linear-gradient(transparent 95%, var(--gold) 95%), linear-gradient(90deg, transparent 95%, var(--gold) 95%)",
                backgroundSize: "32px 32px",
              }}
            />
            <div className="relative flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full" style={{ background: "#ff6b6b" }} />
                <span className="h-2.5 w-2.5 rounded-full" style={{ background: "#ffcc66" }} />
                <span className="h-2.5 w-2.5 rounded-full" style={{ background: "#7ed4a3" }} />
                <span className="ml-3 text-[11px] tracking-[0.2em] uppercase text-foreground/55">
                  lex.terminal
                </span>
              </div>
              <span className="inline-flex items-center gap-2 text-[10px] uppercase tracking-widest text-gold">
                <Activity size={12} /> processando
              </span>
            </div>

            <div className="relative mt-6 space-y-3">
              <TypingLine />
              <div className="font-mono text-[11.5px] text-foreground/55">
                {"// "}analisando 1.247 precedentes · 23ms
              </div>
              <div className="font-mono text-[11.5px] text-foreground/45">
                {">"} match: <span className="text-gold">REsp 1.840.531/SP</span> ·
                <span className="text-gold"> Súmula 297/STJ</span>
              </div>
            </div>

            <div className="relative mt-7 grid grid-cols-3 gap-4">
              <div className="rounded-xl border border-border bg-background/40 p-4">
                <div className="text-[9px] tracking-[0.22em] uppercase text-foreground/50">
                  Precedentes
                </div>
                <div ref={precRef as React.RefObject<HTMLDivElement>} className="mt-1 font-serif text-2xl gold-text">
                  {Math.round(precedents).toLocaleString("pt-BR")}
                </div>
              </div>
              <div className="rounded-xl border border-border bg-background/40 p-4">
                <div className="text-[9px] tracking-[0.22em] uppercase text-foreground/50">
                  Êxito médio
                </div>
                <div className="mt-1 font-serif text-2xl gold-text">94%</div>
              </div>
              <div className="rounded-xl border border-border bg-background/40 p-4">
                <div className="text-[9px] tracking-[0.22em] uppercase text-foreground/50">
                  Tempo resp.
                </div>
                <div className="mt-1 font-serif text-2xl gold-text">2.4s</div>
              </div>
            </div>

            <div className="relative mt-6">
              <div className="flex items-center justify-between text-[10px] tracking-[0.22em] uppercase text-foreground/50">
                <span>Jurisprudência · 12 semanas</span>
                <span className="text-gold inline-flex items-center gap-1">
                  <Sparkles size={11} /> +28%
                </span>
              </div>
              <Sparkline />
            </div>
          </div>

          {/* Live news */}
          <div className="reveal lg:col-span-2 rounded-3xl border border-border bg-card p-6 md:p-7 shadow-elegant flex flex-col">
            <div className="flex items-center gap-3">
              <span className="inline-flex items-center gap-2 rounded-full bg-destructive/15 px-3 py-1 text-[10px] uppercase tracking-widest text-destructive">
                <span className="h-2 w-2 rounded-full bg-destructive live-dot" />
                Live Feed
              </span>
              <span className="text-xs text-foreground/50">{current.date}</span>
            </div>
            <div className="mt-5 flex-1">
              <span className="inline-block rounded-md bg-gold/15 px-2.5 py-1 text-xs text-gold font-medium">
                {current.tag}
              </span>
              <h3 className="mt-3 font-serif text-xl md:text-[1.4rem] leading-snug">
                {current.link ? (
                  <a
                    href={current.link}
                    target="_blank"
                    rel="noreferrer"
                    className="hover:text-gold transition-colors"
                  >
                    {current.title}
                  </a>
                ) : (
                  current.title
                )}
              </h3>
            </div>
            <div className="mt-5 flex gap-2">
              {news.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setI(idx)}
                  className={`h-1.5 rounded-full transition-all ${
                    idx === i ? "w-10 bg-gold" : "w-4 bg-foreground/20"
                  }`}
                  aria-label={`Notícia ${idx + 1}`}
                />
              ))}
            </div>
          </div>

          {/* Resolution rate */}
          <div
            ref={pctRef as React.RefObject<HTMLDivElement>}
            className="reveal lg:col-span-2 rounded-3xl border border-border bg-card p-7 shadow-elegant"
          >
            <BarChart3 className="text-gold" size={24} />
            <div className="mt-2 font-serif text-5xl md:text-6xl gold-text leading-none">
              {Math.round(pct)}%
            </div>
            <div className="mt-1 text-[10px] uppercase tracking-[0.22em] text-foreground/65">
              Taxa de Resolução
            </div>
            <div className="mt-4 h-1.5 rounded-full bg-foreground/10 overflow-hidden">
              <div
                className="h-full rounded-full"
                style={{
                  width: `${Math.round(pct)}%`,
                  background: "linear-gradient(90deg, #8aa6d6, #cdd6e3)",
                }}
              />
            </div>
          </div>

          {/* Expertise */}
          <div className="reveal lg:col-span-4 rounded-3xl border border-border bg-card p-7 shadow-elegant flex flex-col md:flex-row md:items-center gap-5">
            <Scale className="text-gold shrink-0" size={28} />
            <div>
              <h4 className="font-serif text-2xl">Expertise Comprovada</h4>
              <p className="mt-2 text-sm text-foreground/70 leading-relaxed">
                Atuação técnica e estratégica em tribunais estaduais e federais, com domínio
                de jurisprudência, processo decisório e teses contemporâneas em Direito
                Bancário, Previdenciário, Civil e Família.
              </p>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .lex-caret {
          display: inline-block;
          width: 7px;
          height: 13px;
          margin-left: 3px;
          vertical-align: middle;
          background: linear-gradient(180deg, #cdd6e3, #8aa6d6);
          animation: lexCaret 1s steps(1) infinite;
          border-radius: 1px;
        }
        @keyframes lexCaret {
          50% { opacity: 0; }
        }
      `}</style>
    </section>
  );
}
