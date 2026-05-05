import merson from "@/assets/merson-hero.webp";
import { SITE } from "@/lib/site";
import { useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

export function Hero() {
  const photoRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);

  // Mouse-driven parallax for floating layers
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const smx = useSpring(mx, { stiffness: 80, damping: 20, mass: 0.6 });
  const smy = useSpring(my, { stiffness: 80, damping: 20, mass: 0.6 });
  const layerA = useTransform(smx, (v) => v * 18);
  const layerAY = useTransform(smy, (v) => v * 18);
  const layerB = useTransform(smx, (v) => v * -28);
  const layerBY = useTransform(smy, (v) => v * -28);
  const photoX = useTransform(smx, (v) => v * 8);
  const photoY = useTransform(smy, (v) => v * 8);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const y = window.scrollY;
        if (bgRef.current) bgRef.current.style.transform = `translate3d(0, ${y * 0.22}px, 0)`;
        if (photoRef.current) photoRef.current.style.transform = `translate3d(0, ${y * -0.06}px, 0)`;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    const onMove = (e: MouseEvent) => {
      const el = sectionRef.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      mx.set((e.clientX - r.left) / r.width - 0.5);
      my.set((e.clientY - r.top) / r.height - 0.5);
    };
    if (window.matchMedia("(pointer: fine)").matches) {
      window.addEventListener("mousemove", onMove, { passive: true });
    }

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
    };
  }, [mx, my]);

  return (
    <section
      ref={sectionRef}
      id="top"
      className="relative min-h-screen flex items-center pt-28 pb-20 overflow-hidden"
    >
      {/* BG layer */}
      <div
        ref={bgRef}
        className="absolute inset-0 bg-cover bg-center will-change-transform"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1505664194779-8beaceb93744?q=60&w=1280&auto=format&fm=webp')",
          filter: "saturate(0.7) brightness(0.55)",
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-background via-background/95 to-background/70" />
      <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-transparent to-background" />

      {/* Floating depth layers (geometric / data lines) */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{ x: layerA, y: layerAY }}
      >
        <div
          className="absolute top-[18%] left-[8%] h-[1px] w-40 opacity-40"
          style={{ background: "linear-gradient(90deg, transparent, var(--gold), transparent)" }}
        />
        <div
          className="absolute top-[62%] left-[14%] h-[1px] w-24 opacity-30"
          style={{ background: "linear-gradient(90deg, transparent, var(--gold), transparent)" }}
        />
        <div
          className="absolute top-[28%] right-[12%] h-[1px] w-56 opacity-35"
          style={{ background: "linear-gradient(90deg, transparent, var(--gold), transparent)" }}
        />
      </motion.div>

      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{ x: layerB, y: layerBY }}
      >
        {/* Particles */}
        {[
          { t: "12%", l: "22%", s: 4 },
          { t: "30%", l: "70%", s: 3 },
          { t: "55%", l: "30%", s: 5 },
          { t: "68%", l: "78%", s: 3 },
          { t: "82%", l: "20%", s: 4 },
          { t: "20%", l: "55%", s: 2 },
        ].map((p, i) => (
          <span
            key={i}
            className="absolute rounded-full"
            style={{
              top: p.t,
              left: p.l,
              width: p.s,
              height: p.s,
              background: "var(--gold)",
              boxShadow: "0 0 12px var(--gold)",
              opacity: 0.5,
              animation: `floatParticle ${6 + (i % 3)}s ease-in-out ${i * 0.4}s infinite`,
            }}
          />
        ))}
        {/* Soft halo */}
        <div
          className="absolute -top-32 -right-32 h-[420px] w-[420px] rounded-full"
          style={{
            background:
              "radial-gradient(circle, color-mix(in oklch, var(--gold) 22%, transparent), transparent 60%)",
            filter: "blur(20px)",
          }}
        />
      </motion.div>

      <div className="relative mx-auto max-w-7xl w-full px-6 grid lg:grid-cols-2 gap-12 items-center">
        {/* Glass content panel */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="relative rounded-3xl p-8 md:p-10"
          style={{
            background: "color-mix(in oklch, var(--ink) 55%, transparent)",
            backdropFilter: "blur(18px)",
            WebkitBackdropFilter: "blur(18px)",
            border: "1px solid color-mix(in oklch, var(--gold) 22%, transparent)",
            boxShadow:
              "0 30px 80px -30px rgba(0,0,0,0.6), inset 0 1px 0 color-mix(in oklch, var(--gold) 18%, transparent)",
          }}
        >
          <span className="eyebrow">{SITE.oab}</span>
          <h1 className="mt-7 font-serif font-light text-5xl md:text-6xl lg:text-7xl leading-[1.02] tracking-[-0.02em]">
            <span
              style={{
                background: "linear-gradient(180deg, #ffffff 0%, #cdd6e3 55%, #8a98b3 100%)",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                color: "transparent",
              }}
            >
              Merson Macedo
            </span>
            <br />
            <span className="italic gold-text">Advogados</span>
          </h1>
          <p className="mt-7 max-w-xl font-body-serif text-[1.18rem] md:text-[1.26rem] text-foreground/82 leading-[1.6]">
            Quase 4 anos como Assessor de Juiz e 3 anos como Procurador Municipal.
            Justiça com inteligência e estratégia para sua segurança jurídica.
          </p>
          <div className="mt-9 flex flex-wrap gap-4">
            <a
              href={SITE.whatsappUrl}
              target="_blank"
              rel="noreferrer"
              data-magnetic
              className="btn-gold inline-flex items-center rounded-full gradient-gold px-7 py-3.5 text-sm font-medium tracking-wide text-primary-foreground shadow-gold"
            >
              Solicitar Consultoria
            </a>
            <a
              href="#areas"
              data-magnetic
              className="inline-flex items-center rounded-full border border-foreground/30 px-7 py-3.5 text-sm font-medium tracking-wide text-foreground hover:border-gold hover:text-gold transition-all"
            >
              Áreas de Atuação
            </a>
          </div>
        </motion.div>

        <motion.div
          ref={photoRef}
          style={{ x: photoX, y: photoY, perspective: 1200 }}
          className="relative flex justify-center lg:justify-end will-change-transform"
        >
          <div className="relative group hero-card-3d">
            <div
              className="absolute -inset-4 rounded-[2rem] blur-2xl"
              style={{
                background:
                  "linear-gradient(135deg, color-mix(in oklch, var(--gold) 35%, transparent), transparent 55%, color-mix(in oklch, var(--gold) 18%, transparent))",
              }}
            />
            <div
              className="relative rounded-[2rem] p-2 overflow-hidden shadow-elegant"
              style={{
                background: "var(--ink)",
                border: "1.5px solid color-mix(in oklch, var(--gold) 50%, transparent)",
              }}
            >
              <img
                src={merson}
                alt="Dr. Merson Macedo"
                fetchPriority="high"
                decoding="async"
                width={420}
                height={540}
                className="hero-photo rounded-[1.6rem] w-[340px] md:w-[420px] h-[460px] md:h-[540px] object-cover object-top"
              />
            </div>

            <div className="hidden md:flex absolute top-10 -left-6 lg:-left-12 flex-col gap-3">
              <span className="rounded-full glass px-4 py-2 text-[11px] tracking-[0.18em] uppercase text-gold shadow-elegant"
                style={{ border: "1px solid color-mix(in oklch, var(--gold) 35%, transparent)" }}
              >
                Principais Conquistas
              </span>
            </div>
            <div className="hidden md:flex absolute top-10 -right-6 lg:-right-12 flex-col gap-3">
              <span className="rounded-full glass px-4 py-2 text-[11px] tracking-[0.18em] uppercase text-gold shadow-elegant"
                style={{ border: "1px solid color-mix(in oklch, var(--gold) 35%, transparent)" }}
              >
                História
              </span>
            </div>

            <div className="absolute -bottom-6 -left-6 md:-left-10 rounded-2xl glass px-5 py-3 max-w-[260px] shadow-elegant"
              style={{ border: "1px solid color-mix(in oklch, var(--gold) 35%, transparent)" }}
            >
              <div className="text-[10px] uppercase tracking-widest text-gold">
                Trajetória Sólida
              </div>
              <div className="text-sm text-foreground/90 mt-1">
                Assessor TJMA · Procurador Municipal
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      <style>{`
        .hero-card-3d {
          transform-style: preserve-3d;
          transform: rotateY(4deg);
          transition: transform 0.8s cubic-bezier(0.22,1,0.36,1);
          will-change: transform;
        }
        .hero-card-3d:hover { transform: rotateY(0deg); }
        .hero-photo {
          filter: grayscale(100%) brightness(0.85);
          transition: filter 0.5s ease, transform 0.5s ease;
        }
        .group:hover .hero-photo,
        .hero-photo:active { filter: grayscale(0%) brightness(1); }
        @keyframes floatParticle {
          0%, 100% { transform: translate(0,0); opacity: 0.3; }
          50% { transform: translate(6px,-10px); opacity: 0.7; }
        }
      `}</style>
    </section>
  );
}
