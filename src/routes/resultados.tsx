import { createFileRoute, Link } from "@tanstack/react-router";
import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";
import { ScrollProgress } from "@/components/site/ScrollProgress";
import { CustomCursor } from "@/components/site/CustomCursor";
import { MobileTabBar } from "@/components/site/MobileTabBar";
import { CheckCircle2, ArrowLeft } from "lucide-react";
import { SITE } from "@/lib/site";

export const Route = createFileRoute("/resultados")({
  head: () => ({
    meta: [
      { title: "Resultados & Casos de Sucesso | Merson Macedo Advogados" },
      {
        name: "description",
        content:
          "Conheça resultados representativos do escritório Merson Macedo Advogados em Direito Bancário, Consumidor, Imobiliário, Previdenciário, Civil e Criminal.",
      },
      { property: "og:title", content: "Resultados & Casos de Sucesso | Merson Macedo Advogados" },
      {
        property: "og:description",
        content:
          "Casos representativos do escritório com atuação técnica e estratégica em diversas áreas do Direito.",
      },
    ],
  }),
  component: ResultadosPage,
});

type Categoria =
  | "Bancário"
  | "Consumidor"
  | "Imobiliário"
  | "Previdenciário"
  | "Civil"
  | "Criminal";

const badgeStyles: Record<Categoria, string> = {
  Bancário: "bg-[oklch(0.86_0.012_250/0.12)] text-gold border-gold/30",
  Consumidor: "bg-[oklch(0.74_0.012_250/0.10)] text-foreground/85 border-foreground/20",
  Imobiliário: "bg-[oklch(0.86_0.012_250/0.12)] text-gold border-gold/30",
  Previdenciário: "bg-[oklch(0.74_0.012_250/0.10)] text-foreground/85 border-foreground/20",
  Civil: "bg-[oklch(0.86_0.012_250/0.12)] text-gold border-gold/30",
  Criminal: "bg-[oklch(0.74_0.012_250/0.10)] text-foreground/85 border-foreground/20",
};

const cases: Array<{
  categoria: Categoria;
  titulo: string;
  resumo: string;
  resultado: string;
}> = [
  {
    categoria: "Bancário",
    titulo: "Revisão de financiamento com juros abusivos",
    resumo:
      "Cliente refinanciou veículo com taxa muito superior à média de mercado e capitalização indevida.",
    resultado: "Redução significativa da parcela e devolução em dobro dos valores cobrados a maior.",
  },
  {
    categoria: "Consumidor",
    titulo: "Plano de saúde negou cirurgia urgente",
    resumo:
      "Operadora alegou ausência de cobertura para procedimento prescrito em caráter de emergência.",
    resultado: "Tutela de urgência deferida em 24h e indenização por danos morais.",
  },
  {
    categoria: "Imobiliário",
    titulo: "Adjudicação compulsória após quitação",
    resumo:
      "Comprador quitou imóvel mas vendedor recusava lavrar a escritura definitiva.",
    resultado: "Sentença determinou transferência da propriedade ao cliente.",
  },
  {
    categoria: "Previdenciário",
    titulo: "Aposentadoria por incapacidade negada pelo INSS",
    resumo:
      "Segurado teve benefício indeferido administrativamente apesar de laudos consistentes.",
    resultado: "Concessão judicial com pagamento integral dos valores retroativos.",
  },
  {
    categoria: "Civil",
    titulo: "Indenização por inscrição indevida",
    resumo:
      "Empresa inscreveu nome do cliente em órgãos de proteção sem qualquer dívida legítima.",
    resultado: "Reparação por danos morais e exclusão imediata da negativação.",
  },
  {
    categoria: "Criminal",
    titulo: "Habeas corpus em prisão preventiva",
    resumo:
      "Cliente preso preventivamente sem que estivessem presentes os requisitos legais.",
    resultado: "Liberdade concedida com aplicação de medidas cautelares diversas.",
  },
];

function ResultadosPage() {
  return (
    <main className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <ScrollProgress />
      <CustomCursor />
      <Navbar />

      <section className="relative pt-36 pb-20">
        <div className="absolute inset-0" style={{ background: "var(--gradient-radial-gold)" }} />
        <div className="relative mx-auto max-w-7xl px-6">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm text-foreground/60 hover:text-gold transition-colors"
          >
            <ArrowLeft size={16} /> Voltar ao início
          </Link>

          <div className="mt-8 text-center">
            <span className="eyebrow">Cases Representativos</span>
            <h1 className="mt-6 font-serif font-light text-5xl md:text-6xl tracking-[-0.02em]">
              Resultados <span className="italic gold-text">Reais</span>
            </h1>
            <div className="ornament" aria-hidden>
              <span className="ornament-diamond" />
            </div>
            <p className="mt-6 max-w-2xl mx-auto font-body-serif text-[1.1rem] text-foreground/70">
              Seleção de casos representativos do escritório. Os relatos preservam o sigilo
              profissional e ilustram a abordagem técnica e estratégica adotada em cada área.
            </p>
          </div>
        </div>
      </section>

      <section className="pb-28">
        <div className="mx-auto max-w-7xl px-6 grid md:grid-cols-2 lg:grid-cols-3 gap-7">
          {cases.map((c) => (
            <article
              key={c.titulo}
              className="card-premium rounded-3xl border border-border bg-card p-7 shadow-elegant"
            >
              <span
                className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-[10px] uppercase tracking-[0.18em] ${badgeStyles[c.categoria]}`}
              >
                {c.categoria}
              </span>
              <h2 className="mt-5 font-serif text-xl leading-snug">{c.titulo}</h2>
              <p className="mt-3 text-sm text-foreground/70 leading-relaxed">{c.resumo}</p>
              <div className="mt-5 flex gap-3 items-start border-t border-border pt-4">
                <CheckCircle2 size={18} className="text-gold shrink-0 mt-0.5" />
                <p className="text-sm text-foreground/85 leading-relaxed">{c.resultado}</p>
              </div>
            </article>
          ))}
        </div>

        <div className="mx-auto max-w-3xl px-6 mt-20 text-center">
          <p className="font-body-serif text-foreground/70 italic text-sm">
            Resultados passados não constituem promessa de resultados futuros. Cada caso é
            analisado individualmente, observando-se o Código de Ética da OAB.
          </p>
          <a
            href={SITE.whatsappUrl}
            target="_blank"
            rel="noreferrer"
            className="btn-gold mt-8 inline-flex items-center rounded-full gradient-gold px-7 py-3.5 text-sm font-medium tracking-wide text-primary-foreground shadow-gold"
          >
            Avaliar meu caso
          </a>
        </div>
      </section>

      <Footer />
      <MobileTabBar />
    </main>
  );
}
