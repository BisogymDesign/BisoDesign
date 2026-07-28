"use client";

import { motion } from "framer-motion";
import type { Service } from "@/types/content";

export default function ServiceCard({ service, index }: { service: Service; index: number }) {
  return (
    <motion.div
      whileHover={{ y: -6, borderColor: "rgba(255,95,31,0.4)" }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="rounded-2xl border border-white/10 bg-surface p-8"
    >
      <span className="font-heading text-3xl font-extrabold text-gradient">
        {String(index + 1).padStart(2, "0")}
      </span>
      <h3 className="mt-4 font-heading text-lg font-bold">{service.title}</h3>
      <p className="mt-2 text-sm text-muted">{service.description}</p>
    </motion.div>
  );
}
