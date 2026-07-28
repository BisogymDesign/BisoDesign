"use client";

import { motion } from "framer-motion";
import type { ProcessStep } from "@/types/content";

export default function ProcessSteps({ steps }: { steps: ProcessStep[] }) {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
      {steps.map((step, i) => (
        <motion.div
          key={step.id}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, delay: i * 0.08 }}
          className="relative rounded-2xl border border-white/10 bg-surface p-6"
        >
          <span className="font-heading text-3xl font-extrabold text-gradient">
            {String(i + 1).padStart(2, "0")}
          </span>
          <h3 className="mt-4 font-heading text-base font-bold">{step.title}</h3>
          <p className="mt-2 text-sm text-muted">{step.description}</p>
          {i < steps.length - 1 && (
            <span className="absolute right-[-14px] top-1/2 hidden -translate-y-1/2 text-flare-orange lg:block">
              →
            </span>
          )}
        </motion.div>
      ))}
    </div>
  );
}
