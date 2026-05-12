import { useEffect, useState } from "react";
import { motion, useSpring } from "framer-motion";

export function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);
  const [isPointer, setIsPointer] = useState(false);

  // Smooth springs for the outer halo
  const springX = useSpring(0, { stiffness: 150, damping: 20 });
  const springY = useSpring(0, { stiffness: 150, damping: 20 });

  useEffect(() => {
    const updatePosition = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      springX.set(e.clientX);
      springY.set(e.clientY);
      
      const target = e.target as HTMLElement;
      setIsPointer(
        window.getComputedStyle(target).cursor === "pointer" ||
        target.tagName === "A" ||
        target.tagName === "BUTTON"
      );
    };

    const handleMouseEnter = () => setIsVisible(true);
    const handleMouseLeave = () => setIsVisible(false);

    window.addEventListener("mousemove", updatePosition);
    document.body.addEventListener("mouseenter", handleMouseEnter);
    document.body.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("mousemove", updatePosition);
      document.body.removeEventListener("mouseenter", handleMouseEnter);
      document.body.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [springX, springY]);

  if (typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches) {
    return null; // Don't show on touch devices
  }

  return (
    <div 
      className="fixed inset-0 pointer-events-none z-[10000] hidden md:block"
      style={{ opacity: isVisible ? 1 : 0, transition: "opacity 0.3s ease" }}
    >
      {/* Small dot - follows instantly */}
      <div
        className="fixed top-0 left-0 w-1.5 h-1.5 bg-white rounded-full -translate-x-1/2 -translate-y-1/2"
        style={{ left: position.x, top: position.y }}
      />
      
      {/* Outer halo - smooth movement */}
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 border border-white/20 rounded-full -translate-x-1/2 -translate-y-1/2"
        style={{ 
          left: springX, 
          top: springY,
          scale: isPointer ? 1.5 : 1,
          backgroundColor: isPointer ? "rgba(255,255,255,0.05)" : "transparent",
          transition: "scale 0.3s ease, background-color 0.3s ease"
        }}
      />
    </div>
  );
}
