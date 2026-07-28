"use client";

import { motion } from "framer-motion";
import type { Testimonial } from "@/types/content";

export default function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="flex h-full flex-col rounded-2xl border border-white/10 bg-surface p-8"
    >
      <span className="font-heading text-4xl font-extrabold text-gradient">"</span>
      <p className="-mt-2 flex-1 text-ink/90">{testimonial.quote}</p>
      <div className="mt-6">
        <p className="font-heading text-sm font-bold">{testimonial.author}</p>
        {testimonial.role && <p className="text-xs text-muted">{testimonial.role}</p>}
      </div>
    </motion.div>
  );
}
