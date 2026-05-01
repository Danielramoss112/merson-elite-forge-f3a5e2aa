import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef } from "react";
import { ArrowLeft, MapPin, Building2, Scale, Briefcase, GraduationCap } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";
import { ScrollProgress } from "@/components/site/ScrollProgress";
import { CustomCursor } from "@/components/site/CustomCursor";
import { MobileTabBar } from "@/components/site/MobileTabBar";
import { SITE } from "@/lib/site";

export const Route = createFileRoute("/escritorio")({
  head: () => ({
    meta: [
      { title: "O Escritório | Merson Macedo Advogados" },
      {
        name: "description",
        content:
          "Trajetória institucional de Merson Macedo Advogados — quase 4 anos como Assessor de Juiz no TJMA, 3 anos como Procurador Municipal e 3 anos à frente do escritório em Cidade Ocidental/GO.",
      },
      { property: "og:title", content: "O Escritório | Merson Macedo Advogados" },
      {
        property: "og:description",
        content: "Uma trajetória de disciplina, técnica e estratégia jurídica.",
      },
    ],
  }),
  component: EscritorioPage,
});

const TIMELINE = [
  {
    year: "Formação",
    title: "Bacharelado em Direito",
    where: "UNIRG — Universidade de Gurupi/TO",
    desc: "Base acadêmica sólida, com foco em técnica processual e fundamentos do direito público e privado.",
    icon: GraduationCap,
  },
  {
    year: "≈ 4 anos",
    title: "Assessor de Juiz de Direito",
    where: "Tribunal de Justiça do Maranhão · TJMA",
    desc: "Atuação ao lado da magistratura, com leitura privilegiada da jurisprudência e dos critérios de decisão.",
    icon: Scale,
  },
  {
    year: "3 anos",
    title: "Procurador Municipal",
    where: "Procuradoria Municipal",
    desc: "Defesa institucional do município, contencioso estratégico e domínio das normas de direito público.",
    icon: Briefcase,
  },
  {
    year: "3 anos",
    title: "Sócio Proprietário",
    where: "Merson Macedo Advogados · Cidade Ocidental/GO",
    desc: "Direção do escritório e construção de uma equipe focada em resultado com atendimento humanizado.",
    icon: Building2,
  },
];

function EscritorioPage() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });
  const bgY = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const fgY = useTransform(scrollYProgress, [0, 1], [60, -60]);

  useEffect(() => {
    document.documentElement.classList.add("scroll-smooth");
  }, []);

  return (
    <main className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <ScrollProgress />
      <CustomCursor />
      <Navbar />

      {/* Parallax hero */}
      <section ref={sectionRef} className="relative pt-36 pb-24 overflow-hidden">
        <motion.div
          aria-hidden
          style={{ y: bgY }}
          className="absolute inset-0"
        >
          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse 70% 50% at 50% 30%, oklch(0.22 0.06 235 / 0.7), transparent 60%)",
            }}
          />
        </motion.div>

        <motion.div style={{ y: fgY }} className="relative mx-auto max-w-5xl px-6 text-center">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm text-foreground/60 hover:text-gold transition-colors"
          >
            <ArrowLeft size={16} /> Voltar ao início
          </Link>
          <span className="eyebrow mt-8">O Escritório</span>
          <h1 className="mt-7 font-serif text-5xl md:text-7xl tracking-[-0.025em] leading-[1.02]">
            <span className="silver-text">Uma trajetória de</span>
            <br />
            <span className="italic champagne-text">disciplina e técnica</span>
          </h1>
          <p className="mt-7 max-w-2xl mx-auto font-body-serif text-[1.18rem] text-foreground/75 leading-relaxed">
            Merson Macedo Advogados nasce da convicção de que o melhor advogado é
            aquele que conhece o Judiciário por dentro. Cada decisão estratégica
            carrega anos de leitura forense, prática institucional e fidelidade ao
            cliente.
          </p>
        </motion.div>
      </section>

      {/* Timeline */}
      <section className="relative pb-24">
        <div className="mx-auto max-w-4xl px-6">
          <div className="relative">
            {/* Vertical line */}
            <div
              aria-hidden
              className="absolute left-[22px] md:left-1/2 md:-translate-x-1/2 top-2 bottom-2 w-px"
              style={{
                background:
                  "linear-gradient(180deg, transparent, oklch(0.78 0.105 86 / 0.45) 15%, oklch(0.78 0.105 86 / 0.45) 85%, transparent)",
              }}
            />
            <ul className="space-y-12">
              {TIMELINE.map((step, idx) => {
                const Icon = step.icon;
                const right = idx % 2 === 1;
                return (
                  <motion.li
                    key={step.title}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ type: "spring", stiffness: 120, damping: 20 }}
                    className="relative md:grid md:grid-cols-2 md:gap-12"
                  >
                    {/* Dot */}
                    <span
                      aria-hidden
                      className="absolute left-[14px] md:left-1/2 md:-translate-x-1/2 top-3 h-4 w-4 rounded-full"
                      style={{
                        background:
                          "radial-gradient(circle, oklch(0.86 0.085 88) 0%, oklch(0.66 0.110 84) 100%)",
                        boxShadow: "0 0 18px oklch(0.78 0.105 86 / 0.6)",
                      }}
                    />
                    <div className={`pl-12 md:pl-0 ${right ? "md:order-2 md:pl-12" : "md:pr-12 md:text-right"}`}>
                      <span className="text-[11px] uppercase tracking-[0.22em] text-gold">
                        {step.year}
                      </span>
                      <h3 className="mt-2 font-serif text-2xl md:text-3xl">{step.title}</h3>
                      <p className="mt-1 text-sm text-foreground/65">{step.where}</p>
                    </div>
                    <div className={`pl-12 md:pl-0 mt-3 md:mt-0 ${right ? "md:order-1 md:pr-12 md:text-right" : "md:pl-12"}`}>
                      <div className="glass-card rounded-2xl p-5 inline-flex items-start gap-3 text-left">
                        <Icon size={20} className="text-gold mt-0.5 shrink-0" />
                        <p className="text-sm text-foreground/80 leading-relaxed">{step.desc}</p>
                      </div>
                    </div>
                  </motion.li>
                );
              })}
            </ul>
          </div>

          {/* Address card */}
          <div className="mt-20 glass-card rounded-3xl p-8 text-center">
            <MapPin size={20} className="text-gold mx-auto" />
            <h3 className="mt-4 font-serif text-2xl">Sede do Escritório</h3>
            <p className="mt-3 font-body-serif text-foreground/80">
              {SITE.address}
            </p>
            <div className="mt-5 flex flex-wrap justify-center gap-2 text-xs text-gold">
              <span className="rounded-full border border-gold/30 px-3 py-1">OAB/MA 15.972</span>
              <span className="rounded-full border border-gold/30 px-3 py-1">OAB/GO 69.793-A</span>
            </div>
          </div>
        </div>
      </section>

      <Footer />
      <MobileTabBar />
    </main>
  );
}
