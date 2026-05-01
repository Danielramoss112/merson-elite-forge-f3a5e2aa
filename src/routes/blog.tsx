import { createFileRoute, Link } from "@tanstack/react-router";
import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";
import { ScrollProgress } from "@/components/site/ScrollProgress";
import { CustomCursor } from "@/components/site/CustomCursor";
import { MobileTabBar } from "@/components/site/MobileTabBar";
import { ArrowLeft, ArrowRight, Clock } from "lucide-react";

export const Route = createFileRoute("/blog")({
  head: () => ({
    meta: [
      { title: "Blog Jurídico | Merson Macedo Advogados" },
      {
        name: "description",
        content:
          "Artigos sobre Direito Bancário, Consumidor e Previdenciário escritos pela equipe do escritório Merson Macedo Advogados.",
      },
      { property: "og:title", content: "Blog Jurídico | Merson Macedo Advogados" },
      {
        property: "og:description",
        content: "Conteúdo jurídico claro sobre temas que afetam o seu dia a dia.",
      },
    ],
  }),
  component: BlogPage,
});

type Post = {
  categoria: string;
  titulo: string;
  resumo: string;
  leitura: string;
  data: string;
};

const posts: Post[] = [
  {
    categoria: "Direito Bancário",
    titulo: "Juros abusivos: como identificar e contestar",
    resumo:
      "Entenda quando a taxa cobrada pelo banco pode ser revisada judicialmente e quais documentos reunir antes de procurar um advogado.",
    leitura: "5 min de leitura",
    data: "Em breve",
  },
  {
    categoria: "Direito do Consumidor",
    titulo: "Direitos do consumidor em compras online",
    resumo:
      "Prazo de arrependimento, devolução, cobrança indevida e o que fazer quando a loja descumpre o que prometeu.",
    leitura: "4 min de leitura",
    data: "Em breve",
  },
  {
    categoria: "Direito Previdenciário",
    titulo: "Benefícios do INSS: passo a passo para evitar o indeferimento",
    resumo:
      "Documentos médicos, perícia, CNIS e os erros mais comuns que levam à negativa do auxílio ou da aposentadoria.",
    leitura: "6 min de leitura",
    data: "Em breve",
  },
];

function BlogPage() {
  return (
    <main className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <ScrollProgress />
      <Navbar />

      <section className="relative pt-36 pb-16">
        <div className="absolute inset-0" style={{ background: "var(--gradient-radial-gold)" }} />
        <div className="relative mx-auto max-w-7xl px-6">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm text-foreground/60 hover:text-gold transition-colors"
          >
            <ArrowLeft size={16} /> Voltar ao início
          </Link>
          <div className="mt-8 text-center">
            <span className="eyebrow">Conteúdo Jurídico</span>
            <h1 className="mt-6 font-serif font-light text-5xl md:text-6xl tracking-[-0.02em]">
              Blog <span className="italic gold-text">Jurídico</span>
            </h1>
            <div className="ornament" aria-hidden>
              <span className="ornament-diamond" />
            </div>
            <p className="mt-6 max-w-2xl mx-auto font-body-serif text-[1.1rem] text-foreground/70">
              Análises objetivas sobre os temas que mais afetam pessoas e empresas no Brasil.
            </p>
          </div>
        </div>
      </section>

      <section className="pb-28">
        <div className="mx-auto max-w-7xl px-6 grid md:grid-cols-2 lg:grid-cols-3 gap-7">
          {posts.map((p) => (
            <article
              key={p.titulo}
              className="card-premium rounded-3xl border border-border bg-card overflow-hidden shadow-elegant flex flex-col"
            >
              <div
                className="aspect-[16/10] w-full"
                style={{
                  background:
                    "linear-gradient(135deg, oklch(0.22 0.07 258) 0%, oklch(0.32 0.07 256) 60%, oklch(0.18 0.05 258) 100%)",
                }}
              >
                <div className="h-full w-full flex items-center justify-center">
                  <span className="font-serif italic text-3xl gold-text opacity-80">
                    {p.categoria.replace("Direito ", "")}
                  </span>
                </div>
              </div>
              <div className="p-7 flex flex-col flex-1">
                <span className="text-[10px] uppercase tracking-[0.2em] text-gold">
                  {p.categoria}
                </span>
                <h2 className="mt-3 font-serif text-xl leading-snug">{p.titulo}</h2>
                <p className="mt-3 text-sm text-foreground/70 leading-relaxed flex-1">
                  {p.resumo}
                </p>
                <div className="mt-6 flex items-center justify-between text-xs text-foreground/55">
                  <span className="inline-flex items-center gap-1.5">
                    <Clock size={13} /> {p.leitura}
                  </span>
                  <span className="inline-flex items-center gap-1.5 text-gold opacity-80">
                    {p.data} <ArrowRight size={13} />
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <Footer />
      <MobileTabBar />
    </main>
  );
}
