"use client";

import { useCallback, useEffect, useRef, useState, type CSSProperties, type MouseEvent, type ReactNode } from "react";

/**
 * A scroll-driven 3D book. Scrolling turns the pages.
 * - "spread" (wide screens): two pages side by side; each leaf carries a right page (front)
 *   and the next left page (back), turning around the spine.
 * - "single" (phones): one page at a time, each page turns away to the left.
 * - "list" (prefers-reduced-motion): pages are simply stacked, no 3D.
 * Pages are given in reading order; any element with data-goto="<page index>" jumps there.
 */

type Mode = "spread" | "single" | "list";

const SEG = 0.8; // viewport heights of scrolling per page turn
const RATIO = 0.72; // page width / height
const clamp = (x: number, a = 0, b = 1) => Math.min(b, Math.max(a, x));
const folio = (i: number) => ({ "--folio": `"${String(i).padStart(2, "0")}"` }) as CSSProperties;
const smooth = (x: number) => x * x * (3 - 2 * x);

export default function FlipBook({ pages }: { pages: ReactNode[] }) {
  const [mode, setMode] = useState<Mode | null>(null);
  const [dims, setDims] = useState({ w: 0, h: 0, vh: 0 });
  const [turn, setTurn] = useState(0);
  const [asList, setAsList] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const bookRef = useRef<HTMLDivElement>(null);
  const spineRef = useRef<HTMLDivElement>(null);
  const leafRefs = useRef<(HTMLDivElement | null)[]>([]);
  const turnRef = useRef(0);

  const n = pages.length;
  const leafCount = mode === "spread" ? Math.ceil(n / 2) : n;
  const turns = mode === "spread" ? leafCount : n - 1;

  // ── Layout: choose a mode and a page size that fits the viewport ──
  // The page turns are driven by the visitor's own scrolling, so the book is the default;
  // anyone who prefers a still layout can switch to the list view.
  useEffect(() => {
    const measure = () => {
      if (asList) {
        setMode("list");
        return;
      }
      const vw = window.innerWidth;
      const vh = window.innerHeight;
      const spread = vw >= 900;
      const availH = vh - (spread ? 205 : 190);
      const maxW = spread ? (vw * 0.92) / 2 : vw - 28;
      const w = Math.max(220, Math.floor(Math.min(maxW, availH * RATIO)));
      setDims({ w, h: Math.floor(w / RATIO), vh });
      setMode(spread ? "spread" : "single");
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [asList]);

  // ── Scroll → page angles (direct DOM writes, no React re-render per frame) ──
  useEffect(() => {
    if (mode !== "spread" && mode !== "single") return;
    let raf = 0;
    const spread = mode === "spread";
    const update = () => {
      raf = 0;
      const sec = sectionRef.current;
      if (!sec) return;
      const vh = window.innerHeight;
      const p = clamp(-sec.getBoundingClientRect().top / (vh * SEG), 0, turns);
      const persp = Math.round(dims.w * 5);
      const base = Math.floor(p);
      leafRefs.current.forEach((el, i) => {
        if (!el) return;
        // only leaves around the open spread are on screen; live content elsewhere can rest
        el.dataset.active = String(spread ? i >= base - 1 && i <= base + 1 : i >= base && i <= base + 1);
        const local = i < turns ? smooth(clamp((p - i - 0.12) / 0.76)) : 0;
        el.style.transform = `perspective(${persp}px) rotateY(${(-180 * local).toFixed(2)}deg)`;
        el.style.zIndex = String(local < 0.5 ? 2 * leafCount - i : leafCount + i);
        el.style.setProperty("--shade", Math.sin(local * Math.PI).toFixed(3));
        el.dataset.side = local < 0.5 ? "front" : "back";
      });
      if (spread) {
        // closed book at both ends: centre the cover, then the back cover
        const first = smooth(clamp((p - 0.12) / 0.76));
        const last = smooth(clamp((p - (turns - 1) - 0.12) / 0.76));
        const shift = (-0.5 * (1 - first) + 0.5 * last) * dims.w;
        if (bookRef.current) bookRef.current.style.transform = `translateX(${shift.toFixed(1)}px)`;
        if (spineRef.current) spineRef.current.style.opacity = String(Math.min(first, 1 - last));
      }
      const t = Math.round(p);
      if (t !== turnRef.current) {
        turnRef.current = t;
        setTurn(t);
      }
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [mode, dims, turns, leafCount]);

  const goToTurn = useCallback(
    (t: number) => {
      const sec = sectionRef.current;
      if (!sec) return;
      const top = sec.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({ top: top + clamp(t, 0, turns) * window.innerHeight * SEG + 2, behavior: "smooth" });
    },
    [turns]
  );

  const goToPage = useCallback(
    (page: number) => {
      if (mode === "list") {
        document.getElementById(`catalog-page-${page}`)?.scrollIntoView({ behavior: "smooth", block: "start" });
        return;
      }
      goToTurn(mode === "spread" ? Math.ceil(page / 2) : page);
    },
    [mode, goToTurn]
  );

  const onClick = (e: MouseEvent) => {
    const target = (e.target as HTMLElement).closest("[data-goto]");
    if (!target) return;
    e.preventDefault();
    goToPage(Number(target.getAttribute("data-goto")));
  };

  // ── Before we know the screen size: reserve space (no layout jump) ──
  if (!mode) return <div className="min-h-screen" aria-hidden />;

  // ── List view: a calm, stacked catalogue with no 3D motion ──
  if (mode === "list") {
    return (
      <div className="mx-auto max-w-5xl px-4 pb-16">
        <div className="mb-6 flex justify-center">
          <button
            type="button"
            onClick={() => setAsList(false)}
            className="rounded-full border border-white/15 px-4 py-2 font-label text-xs uppercase tracking-[0.16em] text-muted transition-colors hover:text-ink"
          >
            📖 View as a book
          </button>
        </div>
        <div className="grid gap-6 md:grid-cols-2" onClick={onClick}>
          {pages.map((page, i) => (
            <div key={i} id={`catalog-page-${i}`} className="relative aspect-[0.72] w-full scroll-mt-28 overflow-hidden rounded-xl" data-pos="single" style={folio(i)}>
              {page}
            </div>
          ))}
        </div>
      </div>
    );
  }

  const spread = mode === "spread";
  // page numbers match the folios printed on the pages (cover = 0, back cover = last)
  const shown = (spread ? [2 * turn - 1, 2 * turn] : [turn]).filter((x) => x > 0 && x < n - 1);
  const label =
    turn === 0 ? "Scroll to open ↓" : shown.length ? `Page ${shown.map((x) => String(x).padStart(2, "0")).join("–")}` : "The end · thank you";

  return (
    <section ref={sectionRef} aria-label="Catalogue" style={{ height: (turns * SEG + 1) * dims.vh }} className="relative">
      <div className="sticky top-0 flex h-screen flex-col items-center justify-center overflow-hidden pt-16">
        <div
          ref={bookRef}
          onClick={onClick}
          className="relative isolate z-0"
          style={{ width: spread ? dims.w * 2 : dims.w, height: dims.h, willChange: "transform" }}
        >
          {Array.from({ length: leafCount }, (_, i) => {
            const front = spread ? pages[2 * i] : pages[i];
            const back = spread ? pages[2 * i + 1] : null;
            return (
              <div
                key={i}
                ref={(el) => {
                  leafRefs.current[i] = el;
                }}
                className="catalog-leaf"
                style={{ left: spread ? dims.w : 0, width: dims.w, height: dims.h }}
                data-side="front"
              >
                <div className="catalog-face catalog-front" data-pos={spread ? "right" : "single"} style={folio(spread ? 2 * i : i)}>
                  {front}
                  <div className="catalog-shade" />
                </div>
                {spread && back && (
                  <div className="catalog-face catalog-back" data-pos="left" style={folio(2 * i + 1)}>
                    {back}
                    <div className="catalog-shade" />
                  </div>
                )}
              </div>
            );
          })}
          {spread && <div ref={spineRef} className="catalog-spine" style={{ left: dims.w - 14, height: dims.h }} />}
        </div>

        {/* Controls */}
        <div className="relative z-10 mt-5 flex items-center gap-3 font-label text-xs uppercase tracking-[0.16em] text-muted">
          <button
            type="button"
            onClick={() => goToTurn(turn - 1)}
            disabled={turn <= 0}
            className="rounded-full border border-white/15 px-4 py-2 transition-colors hover:text-ink disabled:opacity-30"
            aria-label="Previous page"
          >
            ← Prev
          </button>
          <span className={`min-w-[9.5rem] text-center ${turn === 0 ? "text-flare-cyan" : ""}`} aria-live="polite">
            {label}
          </span>
          <button
            type="button"
            onClick={() => goToTurn(turn + 1)}
            disabled={turn >= turns}
            className="rounded-full border border-white/15 px-4 py-2 transition-colors hover:text-ink disabled:opacity-30"
            aria-label="Next page"
          >
            Next →
          </button>
        </div>
        <button
          type="button"
          onClick={() => setAsList(true)}
          className="relative z-10 mt-2 font-label text-[10px] uppercase tracking-[0.18em] text-muted/70 underline-offset-4 transition-colors hover:text-ink hover:underline"
        >
          View as list
        </button>
      </div>
    </section>
  );
}
