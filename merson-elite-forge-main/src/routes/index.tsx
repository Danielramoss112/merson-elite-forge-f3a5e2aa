import { createFileRoute } from "@tanstack/react-router";
import { lazy, Suspense } from "react";
import { Navbar } from "@/components/site/Navbar";
import { Hero } from "@/components/site/Hero";
import { ScrollProgress } from "@/components/site/ScrollProgress";
import { useReveal } from "@/hooks/use-reveal";

// Below-the-fold sections are code-split
const Authority = lazy(() => import("@/components/site/Authority").then((m) => ({ default: m.Authority })));
const Problems = lazy(() => import("@/components/site/Problems").then((m) => ({ default: m.Problems })));
const Areas = lazy(() => import("@/components/site/Areas").then((m) => ({ default: m.Areas })));
const Testimonials = lazy(() => import("@/components/site/Testimonials").then((m) => ({ default: m.Testimonials })));
const Process = lazy(() => import("@/components/site/Process").then((m) => ({ default: m.Process })));
const Differentiation = lazy(() => import("@/components/site/Differentiation").then((m) => ({ default: m.Differentiation })));
const FinalCta = lazy(() => import("@/components/site/FinalCta").then((m) => ({ default: m.FinalCta })));
const About = lazy(() => import("@/components/site/About").then((m) => ({ default: m.About })));
const Faq = lazy(() => import("@/components/site/Faq").then((m) => ({ default: m.Faq })));
const Contact = lazy(() => import("@/components/site/Contact").then((m) => ({ default: m.Contact })));
const Location = lazy(() => import("@/components/site/Location").then((m) => ({ default: m.Location })));
const Footer = lazy(() => import("@/components/site/Footer").then((m) => ({ default: m.Footer })));
const WhatsAppFloat = lazy(() => import("@/components/site/WhatsAppFloat").then((m) => ({ default: m.WhatsAppFloat })));
const MobileStickyBar = lazy(() => import("@/components/site/MobileStickyBar").then((m) => ({ default: m.MobileStickyBar })));

export const Route = createFileRoute("/")(  {
  head: () => ({
    meta: [
      { title: "Dr. Merson Macedo | Advocacia & Consultoria Estratégica" },
      {
        name: "description",
        content:
          "Ex-Assessor de Juiz no TJMA. Resolva seu problema jurídico com estratégia. Especialista em Direito Bancário, Previdenciário, Civil, Família e Criminal. OAB/MA 15.972 | OAB/GO 69.793-A.",
      },
      { property: "og:title", content: "Dr. Merson Macedo | Advocacia & Consultoria Estratégica" },
      {
        property: "og:description",
        content:
          "Resolva seu problema jurídico com estratégia — não tentativa. Atendimento direto com ex-assessor de juiz.",
      },
      { property: "og:type", content: "website" },
      { property: "og:image", content: "/og-merson.jpg" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Dr. Merson Macedo | Advocacia & Consultoria" },
      {
        name: "twitter:description",
        content: "Resolva seu problema jurídico com estratégia. OAB/MA 15.972 · OAB/GO 69.793-A.",
      },
      { name: "twitter:image", content: "/og-merson.jpg" },
    ],
  }),
  component: Index,
});

function Index() {
  useReveal();

  return (
    <main className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <ScrollProgress />
      <Navbar />
      <Hero />

      <Suspense fallback={null}>
        {/* Psychological conversion funnel order */}
        <Authority />
        <Problems />
        <Areas />
        <Testimonials />
        <Process />
        <About />
        <Differentiation />
        <FinalCta />
        <Faq />
        <Contact />
        <Location />
        <Footer />
        <WhatsAppFloat />
        <MobileStickyBar />
      </Suspense>
    </main>
  );
}
