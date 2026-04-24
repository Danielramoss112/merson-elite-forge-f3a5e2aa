import { useEffect, useRef, useState } from "react";

export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);
  const [hovering, setHovering] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const isFine = window.matchMedia("(pointer: fine)").matches;
    const isTouch = "ontouchstart" in window || navigator.maxTouchPoints > 0;
    const isWide = window.innerWidth >= 1024;
    if (!isFine || isTouch || !isWide) return;
    setEnabled(true);
    document.documentElement.classList.add("cursor-none-mode");

    const target = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const ring = { x: target.x, y: target.y };
    let raf = 0;
    let magneticEl: HTMLElement | null = null;

    const onMove = (e: MouseEvent) => {
      target.x = e.clientX;
      target.y = e.clientY;
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${e.clientX - 3}px, ${e.clientY - 3}px)`;
      }
      const t = e.target as HTMLElement | null;
      const interactive = t?.closest<HTMLElement>(
        "a,button,[role=button],input,textarea,select,label,[data-magnetic]"
      );
      const isInteractive = !!interactive;
      setHovering(isInteractive);

      // Magnetic attraction: pull cursor toward element center
      if (interactive) {
        const r = interactive.getBoundingClientRect();
        const cx = r.left + r.width / 2;
        const cy = r.top + r.height / 2;
        target.x = e.clientX + (cx - e.clientX) * 0.25;
        target.y = e.clientY + (cy - e.clientY) * 0.25;

        // Subtle element pull
        if (interactive.hasAttribute("data-magnetic")) {
          const dx = (e.clientX - cx) * 0.18;
          const dy = (e.clientY - cy) * 0.18;
          interactive.style.transform = `translate(${dx}px, ${dy}px)`;
          interactive.style.transition = "transform 200ms cubic-bezier(0.22,1,0.36,1)";
          if (magneticEl && magneticEl !== interactive) {
            magneticEl.style.transform = "";
          }
          magneticEl = interactive;
        } else if (magneticEl) {
          magneticEl.style.transform = "";
          magneticEl = null;
        }
      } else if (magneticEl) {
        magneticEl.style.transform = "";
        magneticEl = null;
      }
    };

    const tick = () => {
      ring.x += (target.x - ring.x) * 0.16;
      ring.y += (target.y - ring.y) * 0.16;
      if (ringRef.current) {
        const size = ringRef.current.offsetWidth;
        ringRef.current.style.transform = `translate(${ring.x - size / 2}px, ${ring.y - size / 2}px)`;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    window.addEventListener("mousemove", onMove);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      document.documentElement.classList.remove("cursor-none-mode");
      if (magneticEl) magneticEl.style.transform = "";
    };
  }, []);

  if (!enabled) return null;
  return (
    <>
      <div
        ref={dotRef}
        className="pointer-events-none fixed top-0 left-0 z-[9999] h-1.5 w-1.5 rounded-full"
        style={{
          background: "#cdd6e3",
          opacity: hovering ? 0 : 1,
          transition: "opacity 150ms",
        }}
      />
      <div
        ref={ringRef}
        className="pointer-events-none fixed top-0 left-0 z-[9999] rounded-full"
        style={{
          width: hovering ? 52 : 30,
          height: hovering ? 52 : 30,
          border: "1px solid #cdd6e3",
          background: hovering
            ? "radial-gradient(circle, rgba(205,214,227,0.18), rgba(205,214,227,0.02) 70%)"
            : "transparent",
          opacity: hovering ? 1 : 0.55,
          transition:
            "width 220ms cubic-bezier(0.22,1,0.36,1), height 220ms cubic-bezier(0.22,1,0.36,1), background 220ms, opacity 220ms",
          boxShadow: hovering ? "0 0 24px rgba(205,214,227,0.25)" : "none",
        }}
      />
    </>
  );
}
