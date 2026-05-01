import { useEffect, useState } from "react";
import { TrendingUp, Scale, Activity, Award, Sparkles } from "lucide-react";
import { useCountUp } from "@/hooks/use-count-up";

type NewsItem = { tag: string; title: string; date: string; link?: string };

const FALLBACK: NewsItem[] = [
  { tag: "STJ", title: "Súmula amplia direito de revisão de contratos bancários", date: "Atualizado hoje" },
  { tag: "STF", title: "Plenário decide sobre marco temporal e impacta milhares de processos", date: "Atualizado hoje" },
  { tag: "TST", title: "Tribunal reconhece vínculo empregatício em plataformas digitais", date: "Atualizado hoje" },
  { tag: "TJMA", title: "Decisão fortalece proteção de consumidores em planos de saúde", date: "Atualizado hoje" },
];

// Elegant area chart — performance over 12 months
function PerformanceChart() {
  const points = [62, 68, 71, 70, 76, 79, 82, 85, 88, 91, 94, 96];
  const max = 100;
  const w = 600;
  const h = 180;
  const step = w / (points.length - 1);
  const path = points
    .map((v, i) => `${i === 0 ? "M" : "L"} ${i * step},${h - (v / max) * h * 0.85 - 10}`)
    .join(" ");
  const area = `${path} L ${w},${h} L 0,${h} Z`;
  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="w-full h-[180px]" preserveAspectRatio="none">
      <defs>
        <linearGradient id="perfFill" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="#d4af37" stopOpacity="0.32" />
          <stop offset="100%" stopColor="#d4af37" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="perfLine" x1="0" x2="1">
          <stop offset="0%" stopColor="#a8862a" />
          <stop offset="50%" stopColor="#f5e6b3" />
          <stop offset="100%" stopColor="#d4af37" />
        </linearGradient>
      </defs>
      {/* Gridlines */}
      {[0.25, 0.5, 0.75].map((g) => (
        <line
          key={g}
          x1="0"
          x2={w}
          y1={h * g + 10}
          y2={h * g + 10}
          stroke="#ffffff"
          strokeOpacity="0.04"
          strokeDasharray="3 4"
        />
      ))}
      <path d={area} fill="url(#perfFill)" />
      <path d={path} fill="none" stroke="url(#perfLine)" strokeWidth="2" strokeLinecap="round" />
      {points.map((v, i) => (
        <circle
          key={i}
          cx={i * step}
          cy={h - (v / max) * h * 0.85 - 10}
          r={i === points.length - 1 ? 4 : 0}
          fill="#f5e6b3"
        />
      ))}
    </svg>
  );
}

// Vertical bars — practice area distribution
function PracticeBars() {
  const data = [
    { label: "Bancário", v: 92 },
    { label: "Consumidor", v: 84 },
    { label: "Previd.", v: 88 },
    { label: "Civil", v: 79 },
    { label: "Família", v: 81 },
    { label: "Criminal", v: 76 },
  ];
  return (
    <div className="flex items-end gap-3 h-[120px]">
      {data.map((d, i) => (
        <div key={d.label} className="flex-1 flex flex-col items-center gap-2">
          <div className="relative w-full h-full flex items-end">
            <div
              className="w-full rounded-t-md"
              style={{
                height: `${d.v}%`,
                background: "linear-gradient(180deg, oklch(0.86 0.085 88) 0%, oklch(0.66 0.110 84) 100%)",
                boxShadow: "0 0 14px oklch(0.78 0.105 86 / 0.30)",
                animation: `barRise 0.9s ${i * 0.08}s cubic-bezier(.22,1,.36,1) both`,
              }}
            />
          </div>
          <span className="text-[9px] uppercase tracking-[0.16em] text-foreground/55">{d.label}</span>
        </div>
      ))}
      <style>{`
        @keyframes barRise { from { height: 0%; opacity: 0; } }
      `}</style>
    </div>
  );
}

export function Intelligence() {
  const [news, setNews] = useState<NewsItem[]>(FALLBACK);
  const [i, setI] = useState(0);
  const [pct, pctRef] = useCountUp(96, 2000);
  const [precedents, precRef] = useCountUp(1247, 1800);
  const [cases, casesRef] = useCountUp(540, 1800);

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
    const t = setInterval(() => setI((p) => (p + 1) % news.length), 4500);
    return () => clearInterval(t);
  }, [news.length]);

  const current = news[i] ?? FALLBACK[0];

  return (
    <section id="intelligence" className="relative py-28 overflow-hidden">
      <div className="mx-auto max-w-7xl px-6">
        <div className="text-center reveal">
          <span className="eyebrow">Intelligence Hub</span>
          <h2 className="mt-6 font-serif text-4xl md:text-6xl">
            Inteligência <span className="italic champagne-text">Jurídica</span>
          </h2>
          <div className="ornament" aria-hidden>
            <span className="ornament-diamond" />
          </div>
          <p className="mt-5 max-w-2xl mx-auto font-body-serif text-[1.08rem] text-foreground/70">
            Performance medida. Decisões baseadas em dados, jurisprudência viva e
            uma leitura estratégica do Judiciário.
          </p>
        </div>

        {/* Bento Dashboard */}
        <div className="mt-14 grid lg:grid-cols-6 gap-5">
          {/* Performance chart — main */}
          <div className="reveal lg:col-span-4 glass-card rounded-3xl p-6 md:p-8 relative overflow-hidden">
            <div className="flex items-start justify-between flex-wrap gap-3">
              <div>
                <div className="text-[10px] uppercase tracking-[0.22em] text-foreground/55">
                  Performance Jurídica · 12 meses
                </div>
                <div className="mt-2 flex items-baseline gap-3">
                  <span ref={pctRef as React.RefObject<HTMLDivElement>} className="font-serif text-5xl md:text-6xl champagne-text">
                    {Math.round(pct)}%
                  </span>
                  <span className="inline-flex items-center gap-1 text-xs text-gold/90">
                    <TrendingUp size={13} /> +34 pp
                  </span>
                </div>
                <p className="mt-1 text-sm text-foreground/65">
                  Taxa de êxito ponderada em decisões favoráveis e acordos.
                </p>
              </div>
              <span className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-[10px] uppercase tracking-widest text-gold border border-gold/30">
                <Activity size={11} /> ao vivo
              </span>
            </div>

            <div className="mt-6">
              <PerformanceChart />
            </div>
            <div className="mt-2 flex justify-between text-[10px] uppercase tracking-[0.18em] text-foreground/40">
              <span>Jan</span><span>Mar</span><span>Mai</span><span>Jul</span><span>Set</span><span>Nov</span>
            </div>
          </div>

          {/* Live news */}
          <div className="reveal lg:col-span-2 glass-card rounded-3xl p-6 md:p-7 flex flex-col">
            <div className="flex items-center gap-3">
              <span className="inline-flex items-center gap-2 rounded-full bg-destructive/15 px-3 py-1 text-[10px] uppercase tracking-widest text-destructive">
                <span className="h-2 w-2 rounded-full bg-destructive live-dot" />
                Live Feed
              </span>
              <span className="text-xs text-foreground/50">{current.date}</span>
            </div>
            <div className="mt-5 flex-1">
              <span className="inline-block rounded-md px-2.5 py-1 text-xs font-medium border border-gold/30 text-gold">
                {current.tag}
              </span>
              <h3 className="mt-3 font-serif text-xl md:text-[1.4rem] leading-snug">
                {current.link ? (
                  <a href={current.link} target="_blank" rel="noreferrer" className="hover:text-gold transition-colors">
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
                  className={`h-1 rounded-full transition-all ${idx === i ? "w-10 bg-gold" : "w-4 bg-foreground/20"}`}
                  aria-label={`Notícia ${idx + 1}`}
                />
              ))}
            </div>
          </div>

          {/* Precedentes */}
          <div ref={precRef as React.RefObject<HTMLDivElement>} className="reveal lg:col-span-2 glass-card rounded-3xl p-7">
            <Scale className="text-gold" size={22} />
            <div className="mt-4 font-serif text-5xl champagne-text leading-none">
              {Math.round(precedents).toLocaleString("pt-BR")}
            </div>
            <div className="mt-2 text-[10px] uppercase tracking-[0.22em] text-foreground/65">
              Precedentes Mapeados
            </div>
            <p className="mt-3 text-sm text-foreground/60 leading-relaxed">
              Base viva de jurisprudência consultada em cada estratégia.
            </p>
          </div>

          {/* Casos */}
          <div ref={casesRef as React.RefObject<HTMLDivElement>} className="reveal lg:col-span-2 glass-card rounded-3xl p-7">
            <Award className="text-gold" size={22} />
            <div className="mt-4 font-serif text-5xl silver-text leading-none">
              +{Math.round(cases)}
            </div>
            <div className="mt-2 text-[10px] uppercase tracking-[0.22em] text-foreground/65">
              Casos Conduzidos
            </div>
            <p className="mt-3 text-sm text-foreground/60 leading-relaxed">
              Atuação técnica em todas as instâncias, com sigilo absoluto.
            </p>
          </div>

          {/* Practice bars */}
          <div className="reveal lg:col-span-2 glass-card rounded-3xl p-7">
            <div className="flex items-center justify-between">
              <div className="text-[10px] uppercase tracking-[0.22em] text-foreground/55">
                Êxito por área
              </div>
              <Sparkles size={14} className="text-gold" />
            </div>
            <div className="mt-5">
              <PracticeBars />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
