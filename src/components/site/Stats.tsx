import { useEffect, useRef, useState } from "react";

const stats = [
  { value: "+10", label: "Anos de Experiência" },
  { value: "4 anos", label: "Assessor no TJMA" },
  { value: "7", label: "Áreas de Atuação" },
  { value: "2", label: "Estados OAB (MA & GO)" },
];

function StatItem({ value, label }: { value: string; label: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [show, setShow] = useState(false);
  useEffect(() => {
    if (!ref.current) return;
    const io = new IntersectionObserver(
      ([e]) => e.isIntersecting && setShow(true),
      { threshold: 0.4 }
    );
    io.observe(ref.current);
    return () => io.disconnect();
  }, []);
  return (
    <div ref={ref} className="text-center">
      <div
        className={`font-serif text-4xl md:text-5xl gold-text transition-all duration-700 ${
          show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        }`}
      >
        {value}
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
