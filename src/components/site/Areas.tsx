import { useEffect, useRef, useState } from "react";
import { ArrowRight, X, Scale, ShoppingBag, Building2, Heart, Gavel, Shield, FileText } from "lucide-react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { AREAS, SITE } from "@/lib/site";

const ICON_MAP: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  bancario: Scale,
  consumidor: ShoppingBag,
  imobiliario: Building2,
  previdenciario: Shield,
  civil: FileText,
  familia: Heart,
  criminal: Gavel,
};

// Bento layout — varied tile sizes for editorial rhythm
const BENTO_CLASS: Record<number, string> = {
  0: "md:col-span-2 md:row-span-2", // hero tile
  1: "md:col-span-2",
  2: "md:col-span-2",
  3: "md:col-span-2",
  4: "md:col-span-2",
  5: "md:col-span-2",
  6: "md:col-span-2",
};

export function Areas() {
  const [active, setActive] = useState<(typeof AREAS)[number] | null>(null);
  const [current, setCurrent] = useState(0);
  const scrollerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = scrollerRef.current;
    if (!root) return;
    const cards = root.querySelectorAll<HTMLElement>("[data-area-card]");
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting && e.intersectionRatio > 0.6) {
            const idx = Number(e.target.getAttribute("data-idx"));
            if (!Number.isNaN(idx)) setCurrent(idx);
          }
        });
      },
      { root, threshold: [0.6, 0.9] }
    );
    cards.forEach((c) => io.observe(c));
    return () => io.disconnect();
  }, []);

  const scrollToIdx = (idx: number) => {
    const root = scrollerRef.current;
    if (!root) return;
    const card = root.querySelector<HTMLElement>(`[data-idx="${idx}"]`);
    card?.scrollIntoView({ behavior: "smooth", inline: "start", block: "nearest" });
  };

  return (
    <section id="areas" className="relative py-28 overflow-hidden">
      <div className="mx-auto max-w-7xl px-6">
        <div className="text-center reveal">
          <span className="eyebrow">Expertise · Áreas de Atuação</span>
          <h2 className="mt-6 font-serif text-4xl md:text-6xl">
            Domínio que <span className="italic champagne-text">Defende</span>
          </h2>
          <div className="ornament" aria-hidden>
            <span className="ornament-diamond" />
          </div>
          <p className="mt-5 max-w-2xl mx-auto font-body-serif text-[1.1rem] md:text-[1.18rem] text-foreground/70">
            Sete frentes consolidadas. Cada caso é tratado com técnica, sigilo e
            estratégia desenhada por quem viveu o Judiciário por dentro.
          </p>
        </div>

        {/* Mobile carousel */}
        <div className="md:hidden mt-10 -mx-6">
          <div
            ref={scrollerRef}
            className="flex overflow-x-scroll scrollbar-hide"
            style={{
              scrollSnapType: "x mandatory",
              WebkitOverflowScrolling: "touch",
              gap: 16,
              padding: "0 20px",
            }}
          >
            {AREAS.map((a, i) => (
              <div
                key={a.id}
                data-area-card
                data-idx={i}
                style={{ scrollSnapAlign: "start", flexShrink: 0, minWidth: "82vw" }}
              >
                <BentoTile area={a} onOpen={setActive} variant="mobile" />
              </div>
            ))}
          </div>
          <div className="mt-5 flex justify-center gap-2">
            {AREAS.map((_, i) => (
              <button
                key={i}
                aria-label={`Ir para card ${i + 1}`}
                onClick={() => scrollToIdx(i)}
                className="rounded-full transition-all"
                style={{
                  width: current === i ? 22 : 8,
                  height: 8,
                  background: current === i ? "var(--gold)" : "rgba(212,175,55,0.25)",
                }}
              />
            ))}
          </div>
        </div>

        {/* Desktop Bento Grid */}
        <div className="mt-16 hidden md:grid md:grid-cols-4 md:auto-rows-[220px] gap-5">
          {AREAS.map((a, i) => (
            <TiltCard key={a.id} className={BENTO_CLASS[i] ?? "md:col-span-2"}>
              <BentoTile area={a} onOpen={setActive} variant={i === 0 ? "hero" : "regular"} />
            </TiltCard>
          ))}
        </div>
      </div>

      {active && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-black/85 backdrop-blur-md p-4"
          onClick={() => setActive(null)}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 280, damping: 26 }}
            className="relative max-w-2xl w-full glass-card rounded-3xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setActive(null)}
              className="absolute top-4 right-4 z-10 h-10 w-10 rounded-full bg-background/70 backdrop-blur flex items-center justify-center hover:text-gold transition-colors"
              aria-label="Fechar"
            >
              <X size={20} />
            </button>
            <div className="h-56 relative">
              <img src={active.image} alt={active.title} className="h-full w-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-card to-transparent" />
            </div>
            <div className="p-8">
              <h3 className="font-serif text-3xl">
                {active.title.split(" ")[0]}{" "}
                <span className="italic champagne-text">
                  {active.title.split(" ").slice(1).join(" ")}
                </span>
              </h3>
              <p className="mt-4 text-foreground/80 leading-relaxed">{active.full}</p>
              <div className="mt-6">
                <div className="flex items-center justify-between text-xs uppercase tracking-[0.2em] text-foreground/60">
                  <span>Taxa de Êxito</span>
                  <span className="champagne-text font-semibold">96%</span>
                </div>
                <div className="mt-2 h-1.5 rounded-full bg-foreground/10 overflow-hidden">
                  <div
                    className="h-full rounded-full"
                    style={{
                      width: "96%",
                      background: "linear-gradient(90deg, #d4af37, #f5e6b3)",
                      animation: "growBar 1.2s ease-out",
                    }}
                  />
                </div>
              </div>
              <a
                href={SITE.whatsappUrl}
                target="_blank"
                rel="noreferrer"
                data-magnetic
                className="btn-gold mt-6 inline-flex items-center gap-2 rounded-full gradient-silver px-6 py-3 text-sm font-medium text-primary-foreground shadow-gold"
              >
                Falar com o Dr. Merson <ArrowRight size={16} />
              </a>
            </div>
          </motion.div>
        </div>
      )}

      <style>{`
        @keyframes growBar { from { width: 0%; } to { width: 96%; } }
      `}</style>
    </section>
  );
}

function BentoTile({
  area,
  onOpen,
  variant = "regular",
}: {
  area: (typeof AREAS)[number];
  onOpen: (a: (typeof AREAS)[number]) => void;
  variant?: "hero" | "regular" | "mobile";
}) {
  const Icon = ICON_MAP[area.id] ?? Scale;
  const isHero = variant === "hero";

  return (
    <button
      onClick={() => onOpen(area)}
      className="glass-card group relative text-left rounded-3xl overflow-hidden w-full h-full flex flex-col"
      style={{ minHeight: variant === "mobile" ? 360 : undefined }}
    >
      {/* Image backdrop with gradient overlay */}
      <div className="absolute inset-0">
        <img
          src={area.image}
          alt=""
          loading="lazy"
          aria-hidden
          className="h-full w-full object-cover opacity-40 group-hover:opacity-55 group-hover:scale-105 transition-all duration-700"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, oklch(0.10 0.025 235 / 0.50) 0%, oklch(0.10 0.025 235 / 0.85) 60%, oklch(0.08 0.02 235 / 0.95) 100%)",
          }}
        />
      </div>

      {/* Champagne hairline on hover */}
      <div
        className="pointer-events-none absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          boxShadow: "inset 0 0 0 1px oklch(0.78 0.105 86 / 0.50), 0 0 30px oklch(0.78 0.105 86 / 0.18)",
        }}
      />

      <div className="relative flex-1 flex flex-col justify-between p-6 md:p-7">
        <div>
          <div
            className="inline-flex h-11 w-11 items-center justify-center rounded-xl"
            style={{
              background: "linear-gradient(135deg, oklch(0.78 0.105 86 / 0.18), oklch(0.78 0.105 86 / 0.04))",
              border: "1px solid oklch(0.78 0.105 86 / 0.30)",
            }}
          >
            <Icon size={20} className="text-gold" />
          </div>
          <h3 className={`mt-5 font-serif ${isHero ? "text-3xl md:text-4xl" : "text-2xl"}`}>
            {area.title}
          </h3>
          <p className="mt-3 text-sm text-foreground/70 leading-relaxed">{area.short}</p>
        </div>
        <span className="mt-5 inline-flex items-center gap-2 text-sm text-gold/90 group-hover:gap-3 transition-all">
          Saiba Mais <ArrowRight size={16} />
        </span>
      </div>
    </button>
  );
}

function TiltCard({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const [enabled, setEnabled] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 300, damping: 30 });
  const sy = useSpring(y, { stiffness: 300, damping: 30 });
  const rotateY = useTransform(sx, [-0.5, 0.5], [-6, 6]);
  const rotateX = useTransform(sy, [-0.5, 0.5], [6, -6]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    setEnabled(window.matchMedia("(pointer: fine)").matches);
  }, []);

  if (!enabled) return <div className={className}>{children}</div>;

  return (
    <motion.div
      ref={ref}
      onMouseMove={(e) => {
        const r = ref.current?.getBoundingClientRect();
        if (!r) return;
        x.set((e.clientX - r.left) / r.width - 0.5);
        y.set((e.clientY - r.top) / r.height - 0.5);
      }}
      onMouseLeave={() => {
        x.set(0);
        y.set(0);
      }}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d", perspective: 1200 }}
      className={`relative ${className}`}
    >
      {children}
    </motion.div>
  );
}
