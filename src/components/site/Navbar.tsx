import { useEffect, useState } from "react";
import logo from "@/assets/logo.webp";
import { SITE } from "@/lib/site";

const links = [
  { href: "/#areas", label: "Áreas" },
  { href: "/#sobre", label: "O Doutor" },
  { href: "/#depoimentos", label: "Depoimentos" },
  { href: "/#contato", label: "Contato" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (open) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? "glass border-b border-white/5" : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 sm:px-6 py-4 sm:py-5">
        <a href="#top" className="flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-ink overflow-hidden shadow-elegant">
            <img src={logo} alt="Logo" className="h-full w-full object-cover" />
          </span>
          <span className="font-serif text-lg tracking-wider font-light">
            Merson <span className="italic opacity-60">Advogados</span>
          </span>
        </a>

        <nav className="hidden lg:flex items-center gap-10">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="nav-link text-[11px] uppercase tracking-[0.2em] text-foreground/50 hover:text-foreground transition-colors"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <a
          href={SITE.whatsappUrl}
          target="_blank"
          rel="noreferrer"
          className="btn-silver hidden lg:inline-flex items-center gap-2 rounded-full bg-white px-6 py-2.5 text-[11px] font-semibold uppercase tracking-[0.15em] text-background shadow-silver transition-all duration-500"
        >
          Agendar Consultoria
        </a>

        <button
          className="lg:hidden text-foreground p-2"
          onClick={() => setOpen(!open)}
          aria-label="Menu"
        >
          {open ? (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          ) : (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/>
            </svg>
          )}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="lg:hidden fixed inset-0 top-[72px] z-50 glass" style={{ animation: "fadeIn 0.3s ease both" }}>
          <div className="flex flex-col gap-2 p-8">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="py-4 px-6 rounded-2xl text-foreground/60 hover:text-foreground hover:bg-white/5 transition-all text-lg font-light"
              >
                {l.label}
              </a>
            ))}
            <div className="mt-8 pt-8 border-t border-white/5 text-center">
              <a
                href={SITE.whatsappUrl}
                target="_blank"
                rel="noreferrer"
                onClick={() => setOpen(false)}
                className="inline-flex w-full justify-center rounded-full bg-white px-8 py-5 text-sm font-semibold tracking-wide text-background shadow-silver"
              >
                Agendar Consultoria
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
