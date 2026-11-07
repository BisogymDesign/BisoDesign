"use client";

import { useEffect, useRef } from "react";

/**
 * Fixed, decorative background for the whole site:
 * a perspective grid, slow-moving aurora glows and a soft light that follows
 * the mouse. The native cursor stays visible — this never replaces it.
 */
export default function AmbientBackground() {
  const spotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduce) return;

    let frame = 0;
    let x = window.innerWidth / 2;
    let y = window.innerHeight / 3;

    const apply = () => {
      frame = 0;
      spotRef.current?.style.setProperty("--spot-x", `${x}px`);
      spotRef.current?.style.setProperty("--spot-y", `${y}px`);
    };
    const onMove = (e: MouseEvent) => {
      x = e.clientX;
      y = e.clientY;
      if (!frame) frame = requestAnimationFrame(apply);
    };

    apply();
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => {
      window.removeEventListener("mousemove", onMove);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div aria-hidden className="ambient pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="ambient-grid absolute inset-0" />
      <div className="aurora aurora-1" />
      <div className="aurora aurora-2" />
      <div className="aurora aurora-3" />
      <div ref={spotRef} className="ambient-spot absolute inset-0" />
      <div className="ambient-noise absolute inset-0" />
    </div>
  );
}
