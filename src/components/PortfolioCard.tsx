"use client";

import { motion } from "framer-motion";
import type { PortfolioItem } from "@/types/content";

export default function PortfolioCard({ item }: { item: PortfolioItem }) {
  const Wrapper = item.url ? "a" : "div";
  const wrapperProps = item.url
    ? { href: item.url, target: "_blank", rel: "noreferrer" }
    : {};

  return (
    <Wrapper {...(wrapperProps as any)}>
      <motion.div
        whileHover={{ y: -6 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className="group relative overflow-hidden rounded-2xl border border-white/10 bg-surface p-6"
      >
        <div className="mb-6 flex h-40 items-center justify-center rounded-xl bg-flare-radial">
          <span className="font-heading text-2xl font-bold text-gradient">
            {item.title}
          </span>
        </div>
        <h3 className="font-heading text-lg font-bold">{item.title}</h3>
        <p className="mt-2 text-sm text-muted">{item.description}</p>
        <div className="mt-4 flex flex-wrap gap-2">
          {item.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-white/10 px-3 py-1 font-label text-xs uppercase tracking-wide text-muted"
            >
              {tag}
            </span>
          ))}
        </div>
      </motion.div>
    </Wrapper>
  );
}
