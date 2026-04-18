import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/site/Navbar";
import { Hero } from "@/components/site/Hero";
import { Stats } from "@/components/site/Stats";
import { Areas } from "@/components/site/Areas";
import { About } from "@/components/site/About";
import { Intelligence } from "@/components/site/Intelligence";
import { Testimonials } from "@/components/site/Testimonials";
import { Faq } from "@/components/site/Faq";
import { Contact } from "@/components/site/Contact";
import { Footer } from "@/components/site/Footer";
import { WhatsAppFloat } from "@/components/site/WhatsAppFloat";
import { useReveal } from "@/hooks/use-reveal";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Merson Macedo Advocacia & Consultoria Estratégica" },
      {
        name: "description",
        content:
          "Escritório de advocacia em Cidade Ocidental/GO. Ex-Assessor de Juiz no TJMA. Atuação em Direito Bancário, Consumidor, Imobiliário, Previdenciário, Civil, Família e Criminal.",
      },
      { property: "og:title", content: "Merson Macedo Advocacia & Consultoria Estratégica" },
      {
        property: "og:description",
        content:
          "Justiça com inteligência e estratégia. OAB/MA 15.972 · OAB/GO 69.793-A.",
      },
      { property: "og:type", content: "website" },
    ],
  }),
  component: Index,
});

function Index() {
  useReveal();
  return (
    <main className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <Navbar />
      <Hero />
      <Stats />
      <Areas />
      <About />
      <Intelligence />
      <Testimonials />
      <Faq />
      <Contact />
      <Footer />
      <WhatsAppFloat />
    </main>
  );
}
