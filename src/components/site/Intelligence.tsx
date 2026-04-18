import { useEffect, useState } from "react";
import { BarChart3, Scale } from "lucide-react";
import { useCountUp } from "@/hooks/use-count-up";

type NewsItem = { tag: string; title: string; date: string; link?: string };

const FALLBACK: NewsItem[] = [
  { tag: "TST", title: "Tribunal reconhece vínculo empregatício em plataformas digitais", date: "Atualizado hoje" },
  { tag: "STF", title: "Plenário decide sobre marco temporal e impacta milhares de processos", date: "Atualizado hoje" },
  { tag: "STJ", title: "Súmula amplia direito de revisão de contratos bancários", date: "Atualizado hoje" },
  { tag: "TJMA", title: "Decisão fortalece proteção de consumidores em planos de saúde", date: "Atualizado hoje" },
];

export function Intelligence() {
  const [news, setNews] = useState<NewsItem[]>(FALLBACK);
  const [i, setI] = useState(0);
  const [pct, pctRef] = useCountUp(98, 2000);

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
    <section className="relative py-28 overflow-hidden">
      <div className="deco-circle" style={{ width: 300, height: 300, top: 100, right: -100 }} />

      <div className="mx-auto max-w-7xl px-6">
        <div className="text-center reveal">
          <span className="inline-block rounded-full border border-gold/40 bg-gold/5 px-4 py-1.5 text-[10px] tracking-[0.22em] uppercase text-gold">
            Radar Jurídico
          </span>
          <h2 className="mt-5 font-serif text-4xl md:text-5xl">
            Inteligência <span className="italic gold-text">Legal</span>
          </h2>
        </div>

        <div className="mt-16 grid lg:grid-cols-5 gap-6">
          <div className="lg:col-span-3 reveal rounded-3xl border border-border bg-card p-8 shadow-elegant">
            <div className="flex items-center gap-3">
              <span className="inline-flex items-center gap-2 rounded-full bg-destructive/15 px-3 py-1 text-[10px] uppercase tracking-widest text-destructive">
                <span className="h-2 w-2 rounded-full bg-destructive live-dot" />
                Live Feed
              </span>
              <span className="text-xs text-foreground/50">{current.date}</span>
            </div>
            <div className="mt-6 min-h-[160px]">
              <span className="inline-block rounded-md bg-gold/15 px-2.5 py-1 text-xs text-gold font-medium">
                {current.tag}
              </span>
              <h3 className="mt-4 font-serif text-2xl md:text-3xl leading-snug">
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
            <div className="mt-6 flex gap-2">
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

          <div className="lg:col-span-2 grid gap-6">
            <div
              ref={pctRef as React.RefObject<HTMLDivElement>}
              className="reveal rounded-3xl border border-border bg-card p-8 shadow-elegant"
            >
              <BarChart3 className="text-gold" size={28} />
              <div className="mt-3 font-serif text-6xl gold-text">{Math.round(pct)}%</div>
              <div className="mt-1 text-xs uppercase tracking-[0.2em] text-foreground/65">
                Taxa de Resolução
              </div>
            </div>
            <div className="reveal rounded-3xl border border-border bg-card p-8 shadow-elegant">
              <Scale className="text-gold" size={28} />
              <h4 className="mt-3 font-serif text-xl">Expertise Comprovada</h4>
              <p className="mt-2 text-sm text-foreground/70">
                Mais de 10 anos atuando em tribunais estaduais e federais, com domínio
                técnico e estratégico.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
