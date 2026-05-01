import { Link, useLocation } from "@tanstack/react-router";
import { Home, Layers, Building2, BookOpen, MessageCircle } from "lucide-react";
import { SITE } from "@/lib/site";

const ITEMS = [
  { to: "/", label: "Início", icon: Home, exact: true },
  { to: "/#areas", label: "Expertise", icon: Layers, hash: "areas" },
  { to: "/escritorio", label: "Escritório", icon: Building2 },
  { to: "/blog", label: "Insights", icon: BookOpen },
];

export function MobileTabBar() {
  const loc = useLocation();

  const isActive = (to: string, exact?: boolean, hash?: string) => {
    if (hash) return loc.pathname === "/" && loc.hash === hash;
    if (exact) return loc.pathname === to && !loc.hash;
    return loc.pathname.startsWith(to);
  };

  return (
    <>
      <nav
        aria-label="Navegação principal"
        className="lg:hidden fixed left-1/2 -translate-x-1/2 z-40"
        style={{ bottom: "calc(env(safe-area-inset-bottom, 0) + 14px)" }}
      >
        <div
          className="flex items-center gap-1 px-2 py-2 rounded-full"
          style={{
            background: "linear-gradient(135deg, oklch(0.18 0.04 235 / 0.85), oklch(0.10 0.02 235 / 0.92))",
            backdropFilter: "blur(28px) saturate(1.2)",
            WebkitBackdropFilter: "blur(28px) saturate(1.2)",
            border: "1px solid oklch(0.78 0.105 86 / 0.18)",
            boxShadow: "0 18px 50px -12px oklch(0 0 0 / 0.7), inset 0 1px 0 oklch(0.95 0.008 250 / 0.06)",
          }}
        >
          {ITEMS.map((it) => {
            const Icon = it.icon;
            const active = isActive(it.to, it.exact, it.hash);
            return (
              <Link
                key={it.label}
                to={it.to as "/"}
                hash={it.hash}
                className="relative flex flex-col items-center justify-center gap-0.5 px-3 py-1.5 rounded-full transition-colors min-w-[58px]"
                style={{
                  color: active ? "var(--gold)" : "oklch(0.85 0.008 250 / 0.7)",
                }}
              >
                {active && (
                  <span
                    aria-hidden
                    className="absolute inset-0 rounded-full"
                    style={{
                      background: "linear-gradient(135deg, oklch(0.78 0.105 86 / 0.18), oklch(0.78 0.105 86 / 0.06))",
                      border: "1px solid oklch(0.78 0.105 86 / 0.30)",
                    }}
                  />
                )}
                <Icon size={18} className="relative" />
                <span className="relative text-[9.5px] tracking-[0.06em]">{it.label}</span>
              </Link>
            );
          })}
          <a
            href={SITE.whatsappUrl}
            target="_blank"
            rel="noreferrer"
            aria-label="WhatsApp"
            className="ml-1 flex flex-col items-center justify-center gap-0.5 px-3 py-1.5 rounded-full min-w-[58px]"
            style={{
              background: "linear-gradient(135deg, #f5e6b3, #d4af37)",
              color: "oklch(0.12 0.03 235)",
            }}
          >
            <MessageCircle size={18} />
            <span className="text-[9.5px] tracking-[0.06em] font-medium">Falar</span>
          </a>
        </div>
      </nav>
      {/* Spacer so content doesn't sit under tab bar */}
      <div aria-hidden className="lg:hidden h-[88px]" />
    </>
  );
}
