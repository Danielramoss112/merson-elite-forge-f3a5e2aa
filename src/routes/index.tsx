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
import { Location } from "@/components/site/Location";
import { Footer } from "@/components/site/Footer";
import { WhatsAppFloat } from "@/components/site/WhatsAppFloat";
import { LexChat } from "@/components/site/LexChat";
import { CustomCursor } from "@/components/site/CustomCursor";
import { QuickConsult } from "@/components/site/QuickConsult";
import { ResponseBadge } from "@/components/site/ResponseBadge";
import { useReveal } from "@/hooks/use-reveal";
import { useEffect, useState } from "react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Dr. Merson Macedo | Advocacia & Consultoria Estratégica" },
      {
        name: "description",
        content:
          "Ex-Assessor de Juiz no TJMA. Especialista em Direito Bancário, Previdenciário, Civil, Família e mais. OAB/MA 15.972 | OAB/GO 69.793-A. Atendimento em todo o Brasil.",
      },
      { property: "og:title", content: "Dr. Merson Macedo | Advocacia & Consultoria Estratégica" },
      {
        property: "og:description",
        content:
          "Ex-Assessor de Juiz no TJMA. Especialista em Direito Bancário, Previdenciário, Civil, Família e mais. OAB/MA 15.972 | OAB/GO 69.793-A.",
      },
      { property: "og:type", content: "website" },
      { property: "og:image", content: "/og-merson.jpg" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Dr. Merson Macedo | Advocacia & Consultoria" },
      {
        name: "twitter:description",
        content:
          "Justiça com inteligência e estratégia. OAB/MA 15.972 · OAB/GO 69.793-A.",
      },
      { name: "twitter:image", content: "/og-merson.jpg" },
    ],
  }),
  component: Index,
});

function Index() {
  useReveal();
  const [quickOpen, setQuickOpen] = useState(false);

  useEffect(() => {
    const onCopy = () => {
      const selection = window.getSelection()?.toString();
      if (selection && selection.length > 20) {
        setTimeout(() => {
          navigator.clipboard.writeText(
            selection +
              "\n\n— Merson Macedo Advocacia & Consultoria | adv.mersontavares@gmail.com"
          );
        }, 0);
      }
    };
    document.addEventListener("copy", onCopy);
    return () => document.removeEventListener("copy", onCopy);
  }, []);

  return (
    <main className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <CustomCursor />
      <Navbar />
      <Hero />
      <Stats />
      <Areas />
      <About />
      <Intelligence />
      <Testimonials />
      <Faq />
      <Contact />
      <Location />
      <Footer />
      <WhatsAppFloat />
      <ResponseBadge hidden={quickOpen} />
      <QuickConsult onVisibilityChange={setQuickOpen} />
      <LexChat />
    </main>
  );
}
