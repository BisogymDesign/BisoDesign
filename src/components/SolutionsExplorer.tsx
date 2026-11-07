"use client";

import Link from "next/link";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import type { Solution, SolutionCategory } from "@/data/solutions";

type Filter = "All" | SolutionCategory;

export default function SolutionsExplorer({
  solutions,
  categories,
}: {
  solutions: Solution[];
  categories: SolutionCategory[];
}) {
  const [filter, setFilter] = useState<Filter>("All");
  const filters: Filter[] = ["All", ...categories];
  const visible = filter === "All" ? solutions : solutions.filter((s) => s.category === filter);

  return (
    <div>
      <div className="flex flex-wrap gap-2" role="tablist" aria-label="Filter solutions">
        {filters.map((f) => {
          const count = f === "All" ? solutions.length : solutions.filter((s) => s.category === f).length;
          const active = f === filter;
          return (
            <button
              key={f}
              role="tab"
              aria-selected={active}
              onClick={() => setFilter(f)}
              className={`rounded-full border px-4 py-2 font-label text-xs uppercase tracking-[0.14em] transition-all ${
                active
                  ? "border-flare-cyan/60 bg-flare-cyan/10 text-ink shadow-[0_0_24px_-6px_rgba(34,211,238,0.7)]"
                  : "border-white/10 text-muted hover:border-white/30 hover:text-ink"
              }`}
            >
              {f} <span className="ml-1 text-flare-cyan/80">{count}</span>
            </button>
          );
        })}
      </div>

      <motion.div layout className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {visible.map((s) => (
            <motion.div
              key={s.slug}
              layout
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.25 }}
            >
              <Link
                href={`/solutions/${s.slug}`}
                className="glass neon hud group flex h-full flex-col rounded-2xl p-7 transition-transform duration-300 hover:-translate-y-1.5"
              >
                <div className="flex items-center justify-between">
                  <span className="font-label text-xs tracking-[0.2em] text-flare-cyan/80">{s.code}</span>
                  <span className="chip">{s.category}</span>
                </div>
                <h3 className="mt-6 font-heading text-lg font-bold leading-snug">{s.title}</h3>
                <p className="mt-2 flex-1 text-sm text-muted">{s.tagline}</p>
                <div className="mt-6 flex items-end justify-between border-t border-white/5 pt-4">
                  <div>
                    <p className="font-label text-[10px] uppercase tracking-[0.18em] text-muted">From</p>
                    <p className="font-heading text-xl font-extrabold text-gradient">{s.priceFrom}</p>
                  </div>
                  <span className="font-label text-xs uppercase tracking-[0.16em] text-flare-cyan transition-transform group-hover:translate-x-1">
                    Read guide →
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
