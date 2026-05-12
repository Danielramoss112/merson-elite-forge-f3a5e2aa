import { ArrowRight } from "lucide-react";
import { SITE } from "@/lib/site";
import GradientButton from "@/components/ui/gradient-button";

export function FinalCta() {
  return (
    <section className="relative py-28 sm:py-36 overflow-hidden px-5 sm:px-6">
      <div className="mx-auto max-w-7xl">
        <div className="relative rounded-[3.5rem] bg-[#0a142e] p-12 sm:p-24 text-center border border-white/5 shadow-elegant overflow-hidden reveal-scale">
          {/* Ambient glow */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-silver/5 blur-[120px] rounded-full -mr-32 -mt-32 pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-silver/5 blur-[100px] rounded-full -ml-24 -mb-24 pointer-events-none" />
          
          <div className="relative z-10 max-w-3xl mx-auto">
            <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-[1.02] silver-text">
              Transforme sua <span className="italic">incerteza</span> em uma estratégia vencedora
            </h2>
            <p className="mt-10 text-[1.15rem] sm:text-[1.3rem] text-foreground/40 leading-relaxed font-light">
              Fale diretamente com quem entende a visão estratégica do tribunal. 
              Sua defesa começa agora.
            </p>
            <div className="mt-14 flex flex-col sm:flex-row items-center justify-center gap-6">
              <a
                href={SITE.whatsappUrl}
                target="_blank"
                rel="noreferrer"
                id="final-cta-button"
              >
                <GradientButton>
                  Agendar Minha Consultoria <ArrowRight size={18} />
                </GradientButton>
              </a>
            </div>
            
            <div className="mt-10 flex items-center justify-center gap-3 text-[11px] uppercase tracking-[0.3em] text-silver/30">
              <span className="h-1 w-1 rounded-full bg-silver/40" />
              Sigilo Total Garantido
              <span className="h-1 w-1 rounded-full bg-silver/40" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
