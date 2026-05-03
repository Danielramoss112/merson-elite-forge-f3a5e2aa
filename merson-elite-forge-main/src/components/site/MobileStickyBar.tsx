import { useEffect, useState } from "react";
import { SITE } from "@/lib/site";

export function MobileStickyBar() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const onScroll = () => {
      const scrollY = window.scrollY;
      const contactEl = document.getElementById("contato");
      if (contactEl) {
        const rect = contactEl.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
          setVisible(false);
          return;
        }
      }
      setVisible(scrollY > 600);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className={`mobile-sticky-cta ${visible ? "visible" : ""}`}>
      <a
        href={SITE.whatsappUrl}
        target="_blank"
        rel="noreferrer"
        id="mobile-sticky-cta-btn"
        className="flex items-center justify-center gap-3 w-full rounded-full bg-white py-4.5 text-[11px] font-bold uppercase tracking-[0.25em] text-background shadow-silver transition-all duration-700"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
        </svg>
        Agendar Consultoria
      </a>
    </div>
  );
}
