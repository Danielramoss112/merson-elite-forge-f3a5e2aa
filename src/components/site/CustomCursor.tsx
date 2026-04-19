import { useEffect, useRef, useState } from "react";

export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);
  const [hovering, setHovering] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!window.matchMedia("(pointer: fine)").matches) return;
    setEnabled(true);
    document.documentElement.classList.add("cursor-none-mode");

    const target = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const ring = { x: target.x, y: target.y };
    let raf = 0;

    const onMove = (e: MouseEvent) => {
      target.x = e.clientX;
      target.y = e.clientY;
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${e.clientX - 3}px, ${e.clientY - 3}px)`;
      }
      const t = e.target as HTMLElement | null;
      const isInteractive = !!t?.closest("a,button,[role=button],input,textarea,select,label");
      setHovering(isInteractive);
    };

    const tick = () => {
      ring.x += (target.x - ring.x) * 0.12;
      ring.y += (target.y - ring.y) * 0.12;
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
    };
  }, []);

  if (!enabled) return null;
  return (
    <>
      <div
        ref={dotRef}
        className="pointer-events-none fixed top-0 left-0 z-[9999] h-1.5 w-1.5 rounded-full"
        style={{
          background: "#c4953a",
          opacity: hovering ? 0 : 1,
          transition: "opacity 150ms",
        }}
      />
      <div
        ref={ringRef}
        className="pointer-events-none fixed top-0 left-0 z-[9999] rounded-full"
        style={{
          width: hovering ? 44 : 28,
          height: hovering ? 44 : 28,
          border: "1px solid #c4953a",
          background: hovering ? "rgba(196,149,58,0.15)" : "transparent",
          opacity: hovering ? 1 : 0.5,
          transition: "width 200ms, height 200ms, background 200ms, opacity 200ms",
        }}
      />
    </>
  );
}
