"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

// three.js is large — load the 3D scene only after the page is interactive,
// and only on screens where it adds something (not on phones / data-saver).
const HeroScene = dynamic(() => import("@/components/HeroScene"), { ssr: false, loading: () => null });

export default function HeroSceneLazy() {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const conn = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection;
    const wideEnough = window.matchMedia("(min-width: 1024px)").matches;
    if (!wideEnough || conn?.saveData) return;
    // wait until the browser is idle so the 3D never competes with the first paint
    const w = window as Window & { requestIdleCallback?: (cb: () => void) => number };
    if (w.requestIdleCallback) w.requestIdleCallback(() => setEnabled(true));
    else setTimeout(() => setEnabled(true), 600);
  }, []);

  return enabled ? <HeroScene /> : null;
}
