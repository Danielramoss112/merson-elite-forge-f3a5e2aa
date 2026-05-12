import { useRef } from "react";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { SITE } from "@/lib/site";
import GradientButton from "@/components/ui/gradient-button";
import institutionalBg from "@/assets/merson-bg-institutional.png";
import mersonPortrait from "@/assets/merson-portrait.png";

export function Hero() {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const card = cardRef.current;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = (y - centerY) / 30;
    const rotateY = (centerX - x) / 30;
    card.style.transform = `perspective(2000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
  };

  const handleMouseLeave = () => {
    if (!cardRef.current) return;
    cardRef.current.style.transform = `perspective(2000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
  };

  return (
    <section id="top" className="relative min-h-screen flex items-center pt-24 overflow-hidden bg-[#040811]">
      {/* Institutional Background */}
      <div className="absolute inset-0 z-0">
        <img
          src={institutionalBg}
          alt=""
          aria-hidden
          className="w-full h-full object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#040811] via-transparent to-[#040811]" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#040811] via-[#040811]/60 to-transparent" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-5 sm:px-6 w-full">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">

          {/* Left Content */}
          <div className="reveal">
            <div className="flex items-center gap-3 mb-10">
              <div className="h-[1px] w-12 bg-silver/30" />
              <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.4em] text-silver/60 font-medium">
                A Elite da Advocacia Estratégica
              </span>
            </div>

            <h1 className="font-serif text-5xl sm:text-6xl md:text-7xl lg:text-7xl xl:text-8xl leading-[1.02] tracking-[-0.025em]">
              Sua Defesa <br />
              com Precisão <br />
              <span className="italic silver-text">Cirúrgica</span>
            </h1>

            <p className="mt-10 text-[1.05rem] sm:text-[1.15rem] text-foreground/45 leading-[1.7] max-w-xl font-light">
              Nenhuma decisão é por acaso. Atuamos com a visão e o rigor técnico de quem esteve do outro lado da mesa (TJMA). Soluções de alta complexidade desenhadas para proteger seu patrimônio e sua liberdade.
            </p>

            <div className="mt-12 flex flex-col sm:flex-row gap-5">
              <a
                href={SITE.whatsappUrl}
                target="_blank"
                rel="noreferrer"
              >
                <GradientButton>
                  Agendar Consultoria <ArrowRight size={18} />
                </GradientButton>
              </a>
              <a
                href="#areas"
                className="btn-silver inline-flex items-center justify-center gap-2 rounded-full border border-white/10 bg-white/5 px-10 py-4 text-sm font-medium tracking-wide text-foreground/80 transition-all duration-500 hover:bg-white/10 hover:text-foreground"
              >
                Especialidades
              </a>
            </div>

            <div className="mt-16 flex flex-wrap gap-x-10 gap-y-6">
              {[
                { label: "Assessor de Juiz (Ex)", icon: <CheckCircle2 size={16} /> },
                { label: "Procurador Municipal (Ex)", icon: <CheckCircle2 size={16} /> },
                { label: "+500 Casos Atuados", icon: <CheckCircle2 size={16} /> },
              ].map((item) => (
                <div key={item.label} className="flex items-center gap-2.5 text-[10px] uppercase tracking-[0.3em] text-foreground/40 font-medium">
                  <span className="text-silver/60">{item.icon}</span>
                  {item.label}
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT: Portrait with gradient mask blending into dark bg */}
          <div className="relative reveal reveal-delay-1 flex justify-center lg:justify-end">
            {/* Ambient midnight blue glow — NOT warm */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[110%] h-[110%] rounded-full pointer-events-none opacity-40"
              style={{ background: "radial-gradient(circle, rgba(10,20,46,0.8) 0%, transparent 70%)" }}
            />

            <div
              ref={cardRef}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              className="relative z-10 transition-all duration-700 ease-out"
              style={{ width: "fit-content" }}
            >
              {/* Portrait with CSS mask to blend bottom into dark background */}
              <div className="relative" style={{ maxWidth: "520px" }}>
                <img
                  src={mersonPortrait}
                  alt="Dr. Merson Macedo — Advocacia Estratégica"
                  fetchPriority="high"
                  decoding="async"
                  className="w-full h-auto object-cover object-top"
                  style={{
                    maskImage: "linear-gradient(to bottom, black 60%, transparent 100%)",
                    WebkitMaskImage: "linear-gradient(to bottom, black 60%, transparent 100%)",
                    filter: "contrast(1.05) brightness(0.95)",
                  }}
                />
              </div>

              {/* Hotspot overlays */}
              <a
                href="#depoimentos"
                className="absolute top-[28%] left-[5%] w-[40%] h-[12%] z-20 cursor-pointer group"
                aria-label="Principais Conquistas"
              >
                <div className="absolute inset-0 bg-white/0 group-hover:bg-white/5 transition-colors duration-500 rounded-2xl" />
              </a>
              <a
                href="#sobre"
                className="absolute top-[28%] right-[5%] w-[32%] h-[12%] z-20 cursor-pointer group"
                aria-label="História"
              >
                <div className="absolute inset-0 bg-white/0 group-hover:bg-white/5 transition-colors duration-500 rounded-2xl" />
              </a>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
