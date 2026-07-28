"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import type { PricingPackage } from "@/types/content";

export default function PricingCard({ pkg }: { pkg: PricingPackage }) {
  return (
    <motion.div
      whileHover={{ y: -8 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className={`relative flex h-full flex-col rounded-2xl border p-8 ${
        pkg.highlighted
          ? "border-flare-orange/50 bg-surface2 shadow-glow"
          : "border-white/10 bg-surface"
      }`}
    >
      {pkg.highlighted && (
        <span className="absolute -top-3 right-8 rounded-full bg-flare-gradient px-3 py-1 font-label text-xs font-semibold text-night">
          Most popular
        </span>
      )}
      <h3 className="font-heading text-xl font-bold">{pkg.name}</h3>
      <p className="mt-2 text-sm text-muted">{pkg.tagline}</p>
      <div className="mt-6">
        {pkg.priceNote && (
          <span className="mr-2 font-label text-xs uppercase tracking-wide text-muted">
            {pkg.priceNote}
          </span>
        )}
        <span className="font-heading text-3xl font-extrabold text-gradient">
          {pkg.price}
        </span>
      </div>
      <ul className="mt-6 flex-1 space-y-3">
        {pkg.features.map((feature) => (
          <li key={feature} className="flex items-start gap-2 text-sm text-ink/90">
            <span className="mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-flare-orange" />
            {feature}
          </li>
        ))}
      </ul>
      <Link
        href="/about"
        className={`mt-8 rounded-full px-6 py-3 text-center font-label text-sm font-semibold transition-transform hover:-translate-y-0.5 ${
          pkg.highlighted
            ? "bg-flare-gradient text-night"
            : "border border-white/20 text-ink"
        }`}
      >
        Get started
      </Link>
    </motion.div>
  );
}
