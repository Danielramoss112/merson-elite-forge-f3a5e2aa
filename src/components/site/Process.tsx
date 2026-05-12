import { SITE } from "@/lib/site";
import { Radar, IconContainer } from "@/components/ui/radar-effect";
import { Calendar, Search, Shield, ArrowRight } from "lucide-react";
import GradientButton from "@/components/ui/gradient-button";

export function Process() {
  return (
    <section id="processo" className="relative py-28 sm:py-36 overflow-hidden bg-[#040811]">
      <div className="relative mx-auto max-w-7xl px-5 sm:px-6">
        <div className="text-center reveal mb-20">
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
          >
            <GradientButton>
              Iniciar Minha Consulta <ArrowRight size={18} />
            </GradientButton>
          </a>
        </div>
      </div>
    </section>
  );
}
