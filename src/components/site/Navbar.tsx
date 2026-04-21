import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { Menu, X, Bot } from "lucide-react";
import logo from "@/assets/logo.png";
import { SITE } from "@/lib/site";

const links = [
  { href: "#areas", label: "Áreas de Atuação" },
  { href: "#sobre", label: "O Doutor" },
  { href: "#depoimentos", label: "Depoimentos" },
  { href: "#contato", label: "Contato" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "glass border-b border-border" : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3">
        <a href="#top" className="flex items-center gap-3">
          <span className="flex h-11 w-11 items-center justify-center rounded-full border border-gold/40 bg-ink overflow-hidden">
            <img src={logo} alt="Logo Merson Macedo" className="h-full w-full object-cover" />
          </span>
          <span className="font-serif text-lg tracking-wide">
            Merson <span className="italic gold-text">Macedo</span>
          </span>
        </a>

        <nav className="hidden lg:flex items-center gap-8">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="nav-link text-sm text-foreground/80 hover:text-gold transition-colors"
            >
              {l.label}
            </a>
          ))}
          <Link
            to="/lex"
            className="nav-link inline-flex items-center gap-1.5 text-sm text-gold hover:opacity-90 transition-opacity"
          >
            <Bot size={16} /> LEX IA
          </Link>
        </nav>

        <a
          href={SITE.whatsappUrl}
          target="_blank"
          rel="noreferrer"
          className="btn-gold hidden lg:inline-flex items-center rounded-full border border-gold/60 px-5 py-2 text-sm text-gold hover:bg-gold hover:text-primary-foreground"
        >
          Consulta Gratuita
        </a>

        <button
          className="lg:hidden text-foreground"
          onClick={() => setOpen(!open)}
          aria-label="Menu"
        >
          {open ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {open && (
        <div className="lg:hidden glass border-t border-border px-6 py-6 flex flex-col gap-4">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="text-foreground/85 hover:text-gold"
            >
              {l.label}
            </a>
          ))}
          <Link
            to="/lex"
            onClick={() => setOpen(false)}
            className="inline-flex items-center gap-2 text-gold"
          >
            <Bot size={16} /> LEX IA
          </Link>
          <a
            href={SITE.whatsappUrl}
            target="_blank"
            rel="noreferrer"
            className="mt-2 inline-flex justify-center rounded-full border border-gold px-5 py-2.5 text-gold"
          >
            Consulta Gratuita
          </a>
        </div>
      )}
    </header>
  );
}
