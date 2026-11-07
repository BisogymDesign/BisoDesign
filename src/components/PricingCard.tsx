"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import type { PricingPackage } from "@/types/content";

export default function PricingCard({ pkg }: { pkg: PricingPackage }) {
  return (
    <motion.div
      whileHover={{ y: -8 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className={`glass neon relative flex h-full flex-col rounded-2xl p-8 ${
        pkg.highlighted ? "neon-on shadow-[0_0_60px_-15px_rgba(192,76,253,0.6)]" : ""
      }`}
    >
      {pkg.highlighted && (
        <span className="absolute -top-3 right-8 z-10 rounded-full bg-flare-gradient px-3 py-1 font-label text-xs font-semibold text-night shadow-[0_0_20px_rgba(192,76,253,0.6)]">
          Most popular
        </span>
      )}
      <p className="font-label text-xs tracking-[0.2em] text-flare-cyan/80">
        PKG // {pkg.name.toUpperCase()}
      </p>
      <h3 className="mt-2 font-heading text-2xl font-bold">{pkg.name}</h3>
      <p className="mt-2 text-sm text-muted">{pkg.tagline}</p>
      <div className="mt-6 border-y border-white/5 py-5">
        {pkg.priceNote && (
          <span className="mr-2 font-label text-xs uppercase tracking-wide text-muted">
            {pkg.priceNote}
          </span>
        )}
        <span className="font-heading text-4xl font-extrabold text-gradient">{pkg.price}</span>
      </div>
      <ul className="mt-6 flex-1 space-y-3">
        {pkg.features.map((feature) => (
          <li key={feature} className="flex items-start gap-3 text-sm text-ink/90">
            <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-flare-cyan shadow-[0_0_8px_#22d3ee]" />
            {feature}
          </li>
        ))}
      </ul>
      <Link
        href="/about#contact"
        className={`mt-8 ${pkg.highlighted ? "btn-primary" : "btn-ghost"}`}
      >
        Get started
      </Link>
    </motion.div>
  );
}
