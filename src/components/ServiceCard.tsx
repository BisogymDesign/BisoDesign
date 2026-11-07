"use client";

import { motion } from "framer-motion";
import type { Service } from "@/types/content";

export default function ServiceCard({ service, index }: { service: Service; index: number }) {
  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="glass neon hud h-full rounded-2xl p-8"
    >
      <div className="flex items-center justify-between">
        <span className="font-label text-xs tracking-[0.2em] text-flare-cyan/80">
          MODULE_{String(index + 1).padStart(2, "0")}
        </span>
        <span className="font-heading text-3xl font-extrabold text-gradient">
          {String(index + 1).padStart(2, "0")}
        </span>
      </div>
      <h3 className="mt-6 font-heading text-lg font-bold">{service.title}</h3>
      <p className="mt-2 text-sm text-muted">{service.description}</p>
    </motion.div>
  );
}
