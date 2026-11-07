"use client";

import { motion } from "framer-motion";
import type { PortfolioItem } from "@/types/content";

export default function PortfolioCard({ item }: { item: PortfolioItem }) {
  const Wrapper = item.url ? "a" : "div";
  const wrapperProps = item.url
    ? { href: item.url, target: "_blank", rel: "noreferrer" }
    : {};
  const host = item.url ? item.url.replace(/^https?:\/\//, "").replace(/\/$/, "") : "";

  return (
    <Wrapper {...(wrapperProps as any)} className="block h-full">
      <motion.div
        whileHover={{ y: -6 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className="glass neon group relative flex h-full flex-col overflow-hidden rounded-2xl p-5"
      >
        {/* Mock browser window */}
        <div className="overflow-hidden rounded-xl border border-white/10 bg-night/80">
          <div className="flex items-center gap-1.5 border-b border-white/5 px-3 py-2">
            <span className="h-2 w-2 rounded-full bg-flare-orange/80" />
            <span className="h-2 w-2 rounded-full bg-flare-violet/80" />
            <span className="h-2 w-2 rounded-full bg-flare-cyan/80" />
            {host && (
              <span className="ml-2 truncate font-label text-[10px] tracking-wide text-muted">
                {host}
              </span>
            )}
          </div>
          <div className="relative flex h-36 items-center justify-center overflow-hidden bg-flare-radial">
            <div className="ambient-grid absolute inset-0 opacity-60" />
            <span className="relative font-heading text-2xl font-bold text-gradient transition-transform duration-500 group-hover:scale-110">
              {item.title}
            </span>
          </div>
        </div>
        <h3 className="mt-5 font-heading text-lg font-bold">{item.title}</h3>
        <p className="mt-2 flex-1 whitespace-pre-line text-sm text-muted">{item.description}</p>
        <div className="mt-4 flex flex-wrap gap-2">
          {item.tags.map((tag) => (
            <span
              key={tag}
              className={`chip ${
                /client/i.test(tag)
                  ? "!border-flare-cyan/40 !text-flare-cyan"
                  : /concept/i.test(tag)
                    ? "!border-flare-violet/40 !text-violet-300"
                    : ""
              }`}
            >
              {tag}
            </span>
          ))}
        </div>
        {item.url && (
          <span className="mt-4 font-label text-xs uppercase tracking-[0.18em] text-flare-cyan">
            View live →
          </span>
        )}
      </motion.div>
    </Wrapper>
  );
}
