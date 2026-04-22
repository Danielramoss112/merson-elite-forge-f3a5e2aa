import { useEffect, useRef, useState } from "react";
import { ArrowRight, X } from "lucide-react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { AREAS, SITE } from "@/lib/site";

export function Areas() {
  const [active, setActive] = useState<(typeof AREAS)[number] | null>(null);
  const [current, setCurrent] = useState(0);
  const scrollerRef = useRef<HTMLDivElement>(null);

  // Track mobile carousel current card via IntersectionObserver
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
      <div className="deco-circle" style={{ width: 360, height: 360, top: 80, right: -160 }} />
      <div className="deco-circle" style={{ width: 200, height: 200, bottom: 40, left: -80 }} />

      <div className="mx-auto max-w-7xl px-6">
        <div className="text-center reveal">
          <span className="eyebrow">Áreas de Atuação</span>
          <h2 className="mt-6 font-serif text-4xl md:text-5xl">
            Experiência que <span className="italic gold-text">Defende</span>
          </h2>
          <div className="ornament" aria-hidden>
            <span className="ornament-diamond" />
          </div>
          <p className="mt-5 max-w-2xl mx-auto font-body-serif text-[1.1rem] md:text-[1.18rem] text-foreground/70">
            Sete áreas de atuação consolidadas, com método, técnica e atendimento
            humanizado em cada caso.
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
                style={{ scrollSnapAlign: "start", flexShrink: 0, minWidth: "80vw" }}
              >
                <AreaCardSimple area={a} onOpen={setActive} />
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
                  background: current === i ? "#c4953a" : "rgba(196,149,58,0.3)",
                }}
              />
            ))}
          </div>
        </div>

        {/* Desktop / tablet grid with tilt */}
        <div className="mt-16 hidden md:grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {AREAS.map((a) => (
            <TiltCard key={a.id}>
              <AreaCardSimple area={a} onOpen={setActive} />
            </TiltCard>
          ))}
        </div>
      </div>

      {active && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
          onClick={() => setActive(null)}
        >
          <div
            className="relative max-w-2xl w-full bg-card border border-gold/40 rounded-3xl overflow-hidden shadow-elegant"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setActive(null)}
              className="absolute top-4 right-4 z-10 h-10 w-10 rounded-full bg-background/80 flex items-center justify-center hover:text-gold"
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
                <span className="italic gold-text">
                  {active.title.split(" ").slice(1).join(" ")}
                </span>
              </h3>
              <p className="mt-4 text-foreground/75 leading-relaxed">{active.full}</p>
              <div className="mt-6">
                <div className="flex items-center justify-between text-xs uppercase tracking-[0.2em] text-foreground/60">
                  <span>Taxa de Êxito</span>
                  <span className="text-gold">96%</span>
                </div>
                <div className="mt-2 h-1.5 rounded-full bg-foreground/10 overflow-hidden">
                  <div
                    className="h-full rounded-full"
                    style={{
                      width: "96%",
                      background: "linear-gradient(90deg, #c4953a, #dbb568)",
                      animation: "growBar 1.2s ease-out",
                    }}
                  />
                </div>
              </div>
              <a
                href={SITE.whatsappUrl}
                target="_blank"
                rel="noreferrer"
                className="mt-6 inline-flex items-center gap-2 rounded-full gradient-gold px-6 py-3 text-sm font-medium text-primary-foreground shadow-gold"
              >
                Falar com o Dr. Merson <ArrowRight size={16} />
              </a>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes growBar {
          from { width: 0%; }
          to { width: 96%; }
        }
      `}</style>
    </section>
  );
}

function AreaCardSimple({
  area,
  onOpen,
}: {
  area: (typeof AREAS)[number];
  onOpen: (a: (typeof AREAS)[number]) => void;
}) {
  return (
    <button
      onClick={() => onOpen(area)}
      className="card-premium group text-left rounded-2xl overflow-hidden border border-border bg-card w-full h-full shadow-elegant"
    >
      <div className="relative h-52 overflow-hidden bg-card">
        <img
          src={area.image}
          alt={area.title}
          loading="lazy"
          className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-700"
        />
        <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-card to-transparent pointer-events-none" />
      </div>
      <div className="p-6">
        <h3 className="font-serif text-2xl">{area.title}</h3>
        <p className="mt-3 text-sm text-foreground/70 leading-relaxed">{area.short}</p>
        <span className="mt-5 inline-flex items-center gap-2 text-sm text-gold group-hover:gap-3 transition-all">
          Saiba Mais <ArrowRight size={16} />
        </span>
      </div>
    </button>
  );
}

function TiltCard({ children }: { children: React.ReactNode }) {
  const [enabled, setEnabled] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 300, damping: 30 });
  const sy = useSpring(y, { stiffness: 300, damping: 30 });
  const rotateY = useTransform(sx, [-0.5, 0.5], [-8, 8]);
  const rotateX = useTransform(sy, [-0.5, 0.5], [8, -8]);
  const glossOpacity = useTransform(sx, [-0.5, 0, 0.5], [0, 0.5, 1]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    setEnabled(window.matchMedia("(pointer: fine)").matches);
  }, []);

  if (!enabled) return <>{children}</>;

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
      style={{ rotateX, rotateY, transformStyle: "preserve-3d", perspective: 1000 }}
      className="relative"
    >
      {children}
      <motion.div
        className="pointer-events-none absolute inset-0 rounded-2xl"
        style={{
          background:
            "linear-gradient(135deg, rgba(196,149,58,0.08) 0%, transparent 50%, rgba(196,149,58,0.04) 100%)",
          opacity: glossOpacity,
        }}
      />
    </motion.div>
  );
}
