import merson from "@/assets/merson-main.jpeg";
import { SITE } from "@/lib/site";

export function Hero() {
  return (
    <section id="top" className="relative min-h-screen flex items-center pt-28 pb-20 overflow-hidden">
      {/* BG */}
      <div
        className="absolute inset-0 bg-cover bg-center"
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
          <span className="inline-flex items-center gap-2 rounded-full border border-gold/40 bg-gold/5 px-4 py-1.5 text-xs tracking-[0.18em] uppercase text-gold">
            <span className="h-1.5 w-1.5 rounded-full bg-gold" />
            {SITE.oab}
          </span>
          <h1 className="mt-6 font-serif text-5xl md:text-6xl lg:text-7xl leading-[1.05]">
            Justiça com <span className="italic gold-text">Inteligência</span>
            <br />& <span className="italic gold-text">Estratégia.</span>
          </h1>
          <p className="mt-6 max-w-xl text-base md:text-lg text-foreground/75 leading-relaxed">
            Ex-Assessor de Juiz com quase 4 anos no TJMA. Transformamos desafios
            jurídicos complexos em soluções eficazes e personalizadas para sua segurança.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <a
              href={SITE.whatsappUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center rounded-full gradient-gold px-7 py-3.5 text-sm font-medium text-primary-foreground shadow-gold hover:opacity-90 transition-all"
            >
              Solicitar Consultoria
            </a>
            <a
              href="#areas"
              className="inline-flex items-center rounded-full border border-foreground/40 px-7 py-3.5 text-sm font-medium text-foreground hover:border-gold hover:text-gold transition-all"
            >
              Áreas de Atuação
            </a>
          </div>
        </div>

        <div className="relative reveal flex justify-center lg:justify-end">
          <div className="relative">
            <div className="absolute -inset-3 rounded-[2rem] bg-gradient-to-br from-gold/40 via-transparent to-gold/20 blur-xl" />
            <div className="relative rounded-[2rem] border-2 border-gold/60 p-2 bg-ink shadow-elegant">
              <img
                src={merson}
                alt="Dr. Merson Macedo"
                className="rounded-[1.6rem] w-[340px] md:w-[420px] h-[460px] md:h-[540px] object-cover object-top"
              />
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
    </section>
  );
}
