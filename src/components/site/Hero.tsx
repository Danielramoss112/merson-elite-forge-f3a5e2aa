import merson from "@/assets/merson-hero.webp";
import { SITE } from "@/lib/site";
import { useEffect, useRef } from "react";

export function Hero() {
  const photoRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(hover: none)").matches) return;
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const y = window.scrollY;
        if (bgRef.current) bgRef.current.style.transform = `translate3d(0, ${y * 0.25}px, 0)`;
        if (photoRef.current) photoRef.current.style.transform = `translate3d(0, ${y * -0.08}px, 0)`;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section id="top" className="relative min-h-screen flex items-center pt-28 pb-20 overflow-hidden">
      {/* BG */}
      <div
        ref={bgRef}
        className="absolute inset-0 bg-cover bg-center will-change-transform"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1505664194779-8beaceb93744?q=80&w=2070')",
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-background via-background/95 to-background/70" />
      <div className="absolute inset-0" style={{ background: "var(--gradient-radial-gold)" }} />

      {/* Decor */}
      <div className="deco-circle" style={{ width: 480, height: 480, top: -120, right: -120 }} />
      <div className="deco-circle" style={{ width: 220, height: 220, bottom: 60, left: -60 }} />
      <div className="deco-dot" style={{ width: 8, height: 8, top: "30%", left: "55%" }} />
      <div className="deco-dot" style={{ width: 5, height: 5, top: "60%", left: "45%" }} />

      <div className="relative mx-auto max-w-7xl w-full px-6 grid lg:grid-cols-2 gap-12 items-center">
        <div className="reveal">
          <span className="eyebrow">{SITE.oab}</span>
          <h1 className="mt-7 font-serif text-5xl md:text-6xl lg:text-7xl leading-[1.02] tracking-[-0.035em]">
            Justiça com <span className="italic gold-text">Inteligência</span>
            <br />& <span className="italic gold-text">Estratégia.</span>
          </h1>
          <p className="mt-7 max-w-xl font-body-serif text-[1.18rem] md:text-[1.26rem] text-foreground/78 leading-[1.6]">
            Ex-Assessor de Juiz com quase 4 anos no TJMA. Transformamos desafios
            jurídicos complexos em soluções eficazes e personalizadas para sua segurança.
          </p>
          <div className="mt-9 flex flex-wrap gap-4">
            <a
              href={SITE.whatsappUrl}
              target="_blank"
              rel="noreferrer"
              className="btn-gold inline-flex items-center rounded-full gradient-gold px-7 py-3.5 text-sm font-medium tracking-wide text-primary-foreground shadow-gold"
            >
              Solicitar Consultoria
            </a>
            <a
              href="#areas"
              className="inline-flex items-center rounded-full border border-foreground/30 px-7 py-3.5 text-sm font-medium tracking-wide text-foreground hover:border-gold hover:text-gold transition-all"
            >
              Áreas de Atuação
            </a>
          </div>
        </div>

        <div ref={photoRef} className="relative reveal flex justify-center lg:justify-end will-change-transform" style={{ perspective: "1200px" }}>
          <div className="relative group hero-card-3d">
            <div className="absolute -inset-3 rounded-[2rem] bg-gradient-to-br from-gold/40 via-transparent to-gold/20 blur-xl" />
            <div className="relative rounded-[2rem] border-2 border-gold/60 p-2 bg-ink shadow-elegant overflow-hidden">
              <img
                src={merson}
                alt="Dr. Merson Macedo"
                className="hero-photo rounded-[1.6rem] w-[340px] md:w-[420px] h-[460px] md:h-[540px] object-cover object-top"
              />
            </div>

            {/* Floating side badges */}
            <div className="hidden md:flex absolute top-10 -left-6 lg:-left-12 flex-col gap-3">
              <span className="rounded-full border border-gold/40 glass px-4 py-2 text-[11px] tracking-[0.18em] uppercase text-gold shadow-elegant">
                Principais Conquistas
              </span>
            </div>
            <div className="hidden md:flex absolute top-10 -right-6 lg:-right-12 flex-col gap-3">
              <span className="rounded-full border border-gold/40 glass px-4 py-2 text-[11px] tracking-[0.18em] uppercase text-gold shadow-elegant">
                História
              </span>
            </div>

            <div className="absolute -bottom-6 -left-6 md:-left-10 rounded-2xl border border-gold/40 glass px-5 py-3 max-w-[260px] shadow-elegant">
              <div className="text-[10px] uppercase tracking-widest text-gold">
                Expertise Comprovada
              </div>
              <div className="text-sm text-foreground/90 mt-1">
                +10 Anos de Magistratura
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .hero-card-3d {
          transform-style: preserve-3d;
          transform: rotateY(4deg);
          transition: transform 0.6s ease;
          will-change: transform;
        }
        .hero-card-3d:hover {
          transform: rotateY(0deg);
        }
        .hero-photo {
          filter: grayscale(100%) brightness(0.85);
          transition: filter 0.4s ease, transform 0.4s ease;
          animation: heroZoom 6s ease-in-out infinite;
        }
        .group:hover .hero-photo,
        .hero-photo:active {
          filter: grayscale(0%) brightness(1);
        }
        @keyframes heroZoom {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.04); }
        }
        @media (hover: none) {
          .hero-photo:focus, .hero-photo:active {
            filter: grayscale(0%) brightness(1);
          }
        }
      `}</style>
    </section>
  );
}
