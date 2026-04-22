import { useEffect } from "react";

/**
 * Adds `.in` to any `.reveal` element when it enters the viewport.
 * Works for elements that mount later (lazy/deferred sections) by watching
 * DOM additions via MutationObserver.
 */
export function useReveal() {
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -5% 0px" }
    );

    const observe = (root: ParentNode) => {
      root.querySelectorAll<HTMLElement>(".reveal:not(.in)").forEach((el) => io.observe(el));
    };

    observe(document);

    // Watch for late-mounted nodes (lazy sections, deferred content).
    const mo = new MutationObserver((mutations) => {
      for (const m of mutations) {
        m.addedNodes.forEach((node) => {
          if (node.nodeType !== 1) return;
          const el = node as HTMLElement;
          if (el.classList?.contains("reveal") && !el.classList.contains("in")) {
            io.observe(el);
          }
          observe(el);
        });
      }
    });
    mo.observe(document.body, { childList: true, subtree: true });

    // Safety net: if something is already on-screen when it mounts but the
    // observer hasn't fired yet, force-reveal after a tick.
    const forceVisible = () => {
      document.querySelectorAll<HTMLElement>(".reveal:not(.in)").forEach((el) => {
        const r = el.getBoundingClientRect();
        if (r.top < window.innerHeight && r.bottom > 0) el.classList.add("in");
      });
    };
    const t1 = window.setTimeout(forceVisible, 300);

    return () => {
      io.disconnect();
      mo.disconnect();
      window.clearTimeout(t1);
    };
  }, []);
}
