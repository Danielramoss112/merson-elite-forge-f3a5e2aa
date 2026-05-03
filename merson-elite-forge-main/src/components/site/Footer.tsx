import logo from "@/assets/logo.webp";
import { SITE } from "@/lib/site";

export function Footer() {
  return (
    <footer className="relative border-t border-white/5 bg-[#040811] py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-5 sm:px-6">
        <div className="flex flex-col items-center text-center gap-8">
          <div className="flex items-center gap-4">
            <span className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 overflow-hidden shadow-elegant">
              <img src={logo} alt="Logo" className="h-full w-full object-cover" />
            </span>
            <span className="font-serif text-xl tracking-widest font-light">
              Merson Macedo <span className="italic opacity-40">Advogados</span>
            </span>
          </div>

          <p className="text-[0.9rem] text-foreground/30 leading-relaxed max-w-md font-light">
            SQ 12 Quadra 12 Proj 03 — Loja 28 Sala C · Centro · Cidade Ocidental/GO · CEP 72880-490
          </p>

          <div className="text-[10px] tracking-[0.4em] uppercase text-silver/40 font-mono">
            {SITE.oab}
          </div>

          <nav className="flex flex-wrap justify-center gap-x-10 gap-y-4 text-[11px] uppercase tracking-[0.25em] text-foreground/40 font-medium">
            {[
              { href: "#areas", label: "Áreas" },
              { href: "#sobre", label: "Sobre" },
              { href: "#contato", label: "Contato" },
              { href: SITE.whatsappUrl, label: "WhatsApp", external: true },
            ].map((l) => (
              <a
                key={l.label}
                href={l.href}
                target={l.external ? "_blank" : undefined}
                rel={l.external ? "noreferrer" : undefined}
                className="footer-link hover:text-foreground transition-colors"
              >
                {l.label}
              </a>
            ))}
          </nav>

          <div className="mt-4 text-[10px] text-foreground/20 tracking-[0.2em] uppercase font-light">
            © {new Date().getFullYear()} Merson Macedo Advogados · Design de Elite
          </div>
        </div>
      </div>
    </footer>
  );
}
