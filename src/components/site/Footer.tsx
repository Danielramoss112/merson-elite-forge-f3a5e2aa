import logo from "@/assets/logo.png";
import { SITE } from "@/lib/site";

export function Footer() {
  return (
    <footer className="border-t border-border bg-ink py-10">
      <div className="mx-auto max-w-7xl px-6 grid md:grid-cols-3 gap-6 items-center">
        <div className="flex items-center gap-3 justify-center md:justify-start">
          <span className="flex h-12 w-12 items-center justify-center rounded-full border border-gold/40 overflow-hidden">
            <img src={logo} alt="Logo" className="h-full w-full object-cover" />
          </span>
          <span className="font-serif text-base">
            Merson <span className="italic gold-text">Macedo</span>
          </span>
        </div>

        <p className="text-center text-xs text-foreground/55 leading-relaxed">
          © 2026 Merson Macedo Advocacia & Consultoria Estratégica
          <br />
          {SITE.oab}
        </p>

        <div className="flex justify-center md:justify-end">
          <a
            href={SITE.whatsappUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium text-white"
            style={{ backgroundColor: "oklch(0.68 0.18 145)" }}
          >
            <svg viewBox="0 0 32 32" className="h-4 w-4" fill="currentColor">
              <path d="M16 .4C7.4.4.4 7.4.4 16c0 2.8.7 5.5 2.1 7.9L0 32l8.4-2.5c2.3 1.3 4.9 1.9 7.6 1.9 8.6 0 15.6-7 15.6-15.6S24.6.4 16 .4z" />
            </svg>
            Falar no WhatsApp
          </a>
        </div>
      </div>
    </footer>
  );
}
