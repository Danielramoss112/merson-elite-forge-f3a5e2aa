import { createFileRoute } from "@tanstack/react-router";
import { lazy, Suspense, useEffect, useState } from "react";
import { Navbar } from "@/components/site/Navbar";
import { Hero } from "@/components/site/Hero";
import { Stats } from "@/components/site/Stats";
import { CustomCursor } from "@/components/site/CustomCursor";
import { ScrollProgress } from "@/components/site/ScrollProgress";
import { ResponseBadge } from "@/components/site/ResponseBadge";
import { useReveal } from "@/hooks/use-reveal";

// Below-the-fold sections are code-split to shrink the initial bundle.
const Areas = lazy(() => import("@/components/site/Areas").then((m) => ({ default: m.Areas })));
const About = lazy(() => import("@/components/site/About").then((m) => ({ default: m.About })));
const Intelligence = lazy(() =>
  import("@/components/site/Intelligence").then((m) => ({ default: m.Intelligence }))
);
const Testimonials = lazy(() =>
  import("@/components/site/Testimonials").then((m) => ({ default: m.Testimonials }))
);
const Faq = lazy(() => import("@/components/site/Faq").then((m) => ({ default: m.Faq })));
const Contact = lazy(() =>
  import("@/components/site/Contact").then((m) => ({ default: m.Contact }))
);
const Location = lazy(() =>
  import("@/components/site/Location").then((m) => ({ default: m.Location }))
);
const Footer = lazy(() =>
  import("@/components/site/Footer").then((m) => ({ default: m.Footer }))
);
const WhatsAppFloat = lazy(() =>
  import("@/components/site/WhatsAppFloat").then((m) => ({ default: m.WhatsAppFloat }))
);
const LexChat = lazy(() =>
  import("@/components/site/LexChat").then((m) => ({ default: m.LexChat }))
);
const QuickConsult = lazy(() =>
  import("@/components/site/QuickConsult").then((m) => ({ default: m.QuickConsult }))
);

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
      <ScrollProgress />
      <CustomCursor />
      <Navbar />
      <Hero />
      <Stats />
      <Suspense fallback={null}>
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
      </Suspense>
    </main>
  );
}
