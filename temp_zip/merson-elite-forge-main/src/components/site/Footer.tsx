import logo from "@/assets/logo.webp";
import { SITE } from "@/lib/site";

export function Footer() {
  return (
    <footer className="relative border-t border-border bg-ink py-16">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex flex-col items-center text-center gap-6">
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-full overflow-hidden"
              style={{ border: "1px solid color-mix(in oklch, var(--gold) 35%, transparent)" }}>
              <img src={logo} alt="Logo" className="h-full w-full object-cover" />
            </span>
            <span className="font-serif text-base tracking-wide font-light">
              Merson Macedo <span className="italic gold-text">Advogados</span>
            </span>
          </div>

          <p className="text-[0.78rem] text-foreground/65 font-sans leading-relaxed max-w-xl">
            SQ 12 Quadra 12 Proj 03 — Loja 28 Sala C · Centro · Cidade Ocidental/GO · CEP 72880-490
          </p>

          <div className="text-[10px] tracking-[0.28em] uppercase text-gold/85 font-sans">
            {SITE.oab}
          </div>

          <nav className="flex flex-wrap justify-center gap-x-7 gap-y-3 text-[12px] tracking-wide text-foreground/70">
            {[
              { href: "#areas", label: "Áreas" },
              { href: "#sobre", label: "Sobre" },
              { href: "#contato", label: "Contato" },
              { href: "#localizacao", label: "Localização" },
              { href: SITE.whatsappUrl, label: "WhatsApp", external: true },
            ].map((l) => (
              <a
                key={l.label}
                href={l.href}
                target={l.external ? "_blank" : undefined}
                rel={l.external ? "noreferrer" : undefined}
                className="footer-link"
              >
                {l.label}
              </a>
            ))}
          </nav>

          <div className="mt-4 text-[11px] text-foreground/45 tracking-wide">
            © {new Date().getFullYear()} Merson Macedo Advogados · Todos os direitos reservados
          </div>
        </div>
      </div>

      <style>{`
        .footer-link { position: relative; padding-bottom: 2px; transition: color .3s ease; }
        .footer-link::after {
          content:""; position:absolute; left:0; right:0; bottom:0; height:1px;
          background: var(--gold); transform: scaleX(0); transform-origin: left center;
          transition: transform .45s cubic-bezier(0.65,0,0.35,1);
        }
        .footer-link:hover { color: var(--gold); }
        .footer-link:hover::after { transform: scaleX(1); }
      `}</style>
    </footer>
  );
}

