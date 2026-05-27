"use client";

import { useEffect, useState } from "react";

/**
 * Thin scroll-progress bar fixed to the top of the viewport.
 * Tracks document scroll position, computes a 0..1 ratio, and renders a
 * single bar. No external state, no library, no rAF dependency beyond what
 * the browser already coalesces from `scroll` events.
 */
export function ReadingProgress() {
  const [ratio, setRatio] = useState(0);

  useEffect(() => {
    let ticking = false;
    const update = () => {
      const doc = document.documentElement;
      const scrollable = Math.max(doc.scrollHeight - window.innerHeight, 1);
      const next = Math.min(1, Math.max(0, window.scrollY / scrollable));
      setRatio(next);
      ticking = false;
    };
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(update);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <div className="np-progress" aria-hidden>
      <div className="np-progress-fill" style={{ width: `${ratio * 100}%` }} />
    </div>
  );
}
