import { useCountUp } from "@/hooks/use-count-up";

type Stat = { end: number; prefix?: string; suffix?: string; label: string };

const stats: Stat[] = [
  { end: 4, suffix: " anos", label: "Assessor de Juiz · TJMA" },
  { end: 3, suffix: " anos", label: "Procurador Municipal" },
  { end: 3, suffix: " anos", label: "Experiência Privada" },
];

function StatItem({ end, prefix = "", suffix = "", label }: Stat) {
  const [value, ref] = useCountUp(end, 2500);
  return (
    <div ref={ref as React.RefObject<HTMLDivElement>} className="stat-separator text-center px-4 md:px-8">
      <div className="font-serif text-5xl md:text-6xl silver-text leading-none tracking-tighter">
        {prefix}
        {Math.round(value)}
        {suffix}
      </div>
      <div className="mt-5 text-[10px] md:text-[11px] tracking-[0.35em] uppercase text-foreground/40 font-medium">
        {label}
      </div>
    </div>
  );
}

export function Stats() {
  return (
    <section className="relative py-24 sm:py-32 border-y border-white/5 bg-[#060c1d]">
      <div className="mx-auto max-w-6xl px-6 grid grid-cols-1 md:grid-cols-3 gap-y-16">
        {stats.map((s) => (
          <StatItem key={s.label} {...s} />
        ))}
      </div>
    </section>
  );
}
