import { useEffect, useRef } from "react";

/**
 * Word-by-word reveal on scroll.
 * Splits children text nodes of the ref'd element into spans
 * and fades each in as the element scrolls into view.
 */
export function useTextReveal<T extends HTMLElement = HTMLElement>() {
  const ref = useRef<T | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Split words once
    const paragraphs = el.querySelectorAll<HTMLElement>("[data-reveal-text]");
    const allWords: HTMLElement[] = [];

    paragraphs.forEach((p) => {
      if (p.dataset.split === "1") {
        p.querySelectorAll<HTMLElement>("span.tr-w").forEach((w) => allWords.push(w));
        return;
      }
      const text = p.textContent || "";
      p.textContent = "";
      const words = text.split(/(\s+)/);
      words.forEach((w) => {
        if (/^\s+$/.test(w)) {
          p.appendChild(document.createTextNode(w));
        } else if (w.length) {
          const span = document.createElement("span");
          span.className = "tr-w";
          span.textContent = w;
          p.appendChild(span);
          allWords.push(span);
        }
      });
      p.dataset.split = "1";
    });

    let raf = 0;
    const update = () => {
      const vh = window.innerHeight;
      const start = vh * 0.85;
      const end = vh * 0.35;
      allWords.forEach((w) => {
        const r = w.getBoundingClientRect();
        const y = r.top;
        let p = (start - y) / (start - end);
        p = Math.max(0, Math.min(1, p));
        w.style.opacity = String(0.18 + p * 0.82);
      });
    };

    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  return ref;
}
