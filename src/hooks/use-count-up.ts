import { useEffect, useRef, useState } from "react";

/**
 * Animates a number from 0 to `end` when the element scrolls into view.
 * Returns [value, ref]. Attach ref to the element you want to observe.
 */
export function useCountUp(end: number, durationMs = 2000) {
  const [value, setValue] = useState(0);
  const ref = useRef<HTMLElement | null>(null);
  const startedRef = useRef(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const io = new IntersectionObserver(
      (entries) => {
        const e = entries[0];
        if (!e.isIntersecting || startedRef.current) return;
        startedRef.current = true;
        const start = performance.now();
        const tick = (now: number) => {
          const t = Math.min(1, (now - start) / durationMs);
          // easeOutCubic
          const eased = 1 - Math.pow(1 - t, 3);
          setValue(end * eased);
          if (t < 1) requestAnimationFrame(tick);
          else setValue(end);
        };
        requestAnimationFrame(tick);
        io.disconnect();
      },
      { threshold: 0.4 }
    );
    io.observe(node);
    return () => io.disconnect();
  }, [end, durationMs]);

  return [value, ref] as const;
}
