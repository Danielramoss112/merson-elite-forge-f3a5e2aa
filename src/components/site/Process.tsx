import { SITE } from "@/lib/site";
import { Radar, IconContainer } from "@/components/ui/radar-effect";
import { Calendar, Search, Shield } from "lucide-react";

export function Process() {
  return (
    <section id="processo" className="relative py-24 sm:py-32 overflow-hidden bg-[#040811]">
      <div className="relative mx-auto max-w-7xl px-5 sm:px-6">
        <div className="text-center reveal mb-16">
          <span className="eyebrow">Como Funciona</span>
          <h2 className="mt-8 font-serif text-4xl sm:text-5xl md:text-6xl tracking-[-0.015em]">
            Simples, direto e{" "}
            <span className="italic silver-text">transparente</span>
          </h2>
          <div className="ornament" aria-hidden>
            <span className="ornament-diamond" />
          </div>
        </div>

        {/* Radar Effect Section */}
        <div className="relative flex min-h-[500px] w-full items-center justify-center overflow-hidden rounded-3xl border border-white/5 bg-[#06101f]/50 px-4 py-20 shadow-2xl">
          <div className="relative flex h-96 w-full max-w-4xl flex-col items-center justify-center space-y-8">
            
            {/* Top Row — Step 1 */}
            <div className="mx-auto w-full">
              <div className="flex w-full items-center justify-center">
                <IconContainer
                  num="01"
                  text="Você agenda a consulta"
                  subtext="Escolha o melhor horário para uma conversa via WhatsApp, telefone ou presencial."
                  delay={0.2}
                  icon={<Calendar className="h-7 w-7" />}
                />
              </div>
            </div>

            {/* Middle Row — Step 2 & 3 */}
            <div className="mx-auto w-full max-w-3xl">
              <div className="flex w-full items-center justify-between sm:justify-around gap-8">
                <IconContainer
                  num="02"
                  delay={0.4}
                  text="Analisamos seu caso"
                  subtext="Estudo técnico e estratégico da sua situação com atenção a cada detalhe."
                  icon={<Search className="h-7 w-7" />}
                />
                
                <IconContainer
                  num="03"
                  text="Você recebe orientação clara"
                  subtext="Saia da consulta sabendo exatamente o caminho jurídico para o seu caso."
                  delay={0.6}
                  icon={<Shield className="h-7 w-7" />}
                />
              </div>
            </div>

            {/* Radar Background */}
            <Radar className="absolute -bottom-20 scale-125 opacity-40" />
            <div className="absolute bottom-0 z-[41] h-px w-full bg-gradient-to-r from-transparent via-sky-500/20 to-transparent" />
          </div>
        </div>

        <div className="mt-20 text-center reveal">
          <a
            href={SITE.whatsappUrl}
            target="_blank"
            rel="noreferrer"
            id="process-cta"
            className="btn-silver inline-flex items-center justify-center gap-3 rounded-full bg-white px-12 py-5 text-sm font-bold tracking-wide text-background shadow-silver hover:scale-105 transition-all duration-500"
          >
            Iniciar Minha Consulta
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
