import { useRef } from "react";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { SITE } from "@/lib/site";
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
    const rotateX = (y - centerY) / 25;
    const rotateY = (centerX - x) / 25;
    card.style.transform = `perspective(2000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
  };

  const handleMouseLeave = () => {
    if (!cardRef.current) return;
    cardRef.current.style.transform = `perspective(2000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
  };

  return (
    <section id="top" className="relative min-h-screen flex items-center pt-24 overflow-hidden bg-[#040811]">
      {/* NEW INSTITUTIONAL MM BACKGROUND */}
      <div className="absolute inset-0 z-0">
        <img 
          src={institutionalBg} 
          alt="Institucional MM" 
          className="w-full h-full object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#040811] via-transparent to-[#040811]" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#040811] via-[#040811]/60 to-transparent" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-5 sm:px-6 w-full">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          
          {/* Left Content (Text) */}
          <div className="reveal">
            <div className="flex items-center gap-3 mb-8">
              <div className="h-[1px] w-12 bg-silver/30" />
              <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.4em] text-silver/60 font-medium">
                Advocacia Estratégica & Consultoria de Elite
              </span>
            </div>

            <h1 className="font-serif text-5xl sm:text-6xl md:text-7xl lg:text-7xl xl:text-8xl leading-[1.05] tracking-tight">
              Excelência <br />
              Jurídica de <br />
              <span className="italic silver-text">Alto Impacto</span>
            </h1>

            <p className="mt-10 text-[1.1rem] sm:text-[1.25rem] text-foreground/50 leading-relaxed max-w-xl font-light">
              Atuação técnica de excelência em causas de alta complexidade. 
              Soluções personalizadas com foco em resultados reais e segurança jurídica.
            </p>

            <div className="mt-12 flex flex-col sm:flex-row gap-6">
              <a
                href={SITE.whatsappUrl}
                target="_blank"
                rel="noreferrer"
                className="btn-silver inline-flex items-center justify-center gap-3 rounded-full bg-white px-10 py-5 text-sm font-semibold tracking-wide text-background shadow-silver transition-all duration-700"
              >
                Agendar Consultoria <ArrowRight size={20} />
              </a>
              <a
                href="#areas"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-white/10 bg-white/5 px-10 py-5 text-sm font-semibold tracking-wide text-foreground transition-all duration-500 hover:bg-white/10"
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

          {/* RIGHT CONTENT: THE 3D TILT PORTRAIT */}
          <div className="relative reveal flex justify-center lg:justify-end">
             {/* Ambient Aura Glow behind the portrait */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-silver/5 blur-[120px] rounded-full pointer-events-none opacity-40" />
            
            <div 
              ref={cardRef}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              className="relative z-10 p-[1px] rounded-[3.5rem] bg-gradient-to-br from-white/20 via-transparent to-white/10 shadow-elegant overflow-hidden transition-all duration-700 ease-out animate-float-slow"
              style={{ width: 'fit-content' }}
            >
              <div className="relative rounded-[calc(3.5rem-1px)] overflow-hidden bg-ink">
                <img
                  src={mersonPortrait}
                  alt="Dr. Merson Macedo"
                  className="w-full max-w-[500px] h-auto object-cover filter contrast-[1.05]"
                />
                
                {/* INTERACTIVE HOTSPOTS OVER IMAGE BUTTONS */}
                <a 
                  href="#depoimentos" 
                  className="absolute top-[25%] left-[5%] w-[45%] h-[15%] z-20 cursor-pointer group"
                  aria-label="Conquistas"
                >
                   <div className="absolute inset-0 bg-white/0 group-hover:bg-white/5 transition-colors duration-500 rounded-2xl" />
                </a>

                <a 
                  href="#sobre" 
                  className="absolute top-[25%] right-[5%] w-[35%] h-[15%] z-20 cursor-pointer group"
                  aria-label="História"
                >
                   <div className="absolute inset-0 bg-white/0 group-hover:bg-white/5 transition-colors duration-500 rounded-2xl" />
                </a>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
