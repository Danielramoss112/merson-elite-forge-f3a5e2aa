import { useCountUp } from "@/hooks/use-count-up";

type Stat = { end: number; prefix?: string; suffix?: string; label: string };

const stats: Stat[] = [
  { end: 10, prefix: "+", label: "Anos de Experiência" },
  { end: 4, suffix: " anos", label: "Assessor no TJMA" },
  { end: 7, label: "Áreas de Atuação" },
  { end: 2, label: "Estados OAB (MA & GO)" },
];

function StatItem({ end, prefix = "", suffix = "", label }: Stat) {
  const [value, ref] = useCountUp(end, 2000);
  return (
    <div ref={ref as React.RefObject<HTMLDivElement>} className="text-center">
      <div className="font-serif text-4xl md:text-5xl gold-text">
        {prefix}
        {Math.round(value)}
        {suffix}
      </div>
      <div className="mt-2 text-xs md:text-sm tracking-[0.18em] uppercase text-foreground/65">
        {label}
      </div>
    </div>
  );
}

export function Stats() {
  return (
    <section className="relative py-16 border-y border-border bg-ink-soft/40">
      <div className="mx-auto max-w-7xl px-6 grid grid-cols-2 md:grid-cols-4 gap-8">
        {stats.map((s) => (
          <StatItem key={s.label} {...s} />
        ))}
      </div>
    </section>
  );
}
