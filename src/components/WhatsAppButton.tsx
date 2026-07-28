"use client";

import { motion } from "framer-motion";

export default function WhatsAppButton({
  number,
  message,
}: {
  number: string;
  message: string;
}) {
  if (!number) return null;

  const digits = number.replace(/[^\d]/g, "");
  const href = `https://wa.me/${digits}${
    message ? `?text=${encodeURIComponent(message)}` : ""
  }`;

  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noreferrer"
      aria-label="Chat on WhatsApp"
      initial={{ opacity: 0, y: 20, scale: 0.8 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ delay: 0.6, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.95 }}
      className="fixed bottom-6 right-6 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] shadow-glow"
    >
      <svg
        viewBox="0 0 24 24"
        width="28"
        height="28"
        fill="white"
        aria-hidden="true"
      >
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.149-.15.298-.347.446-.521.15-.174.198-.298.298-.497.099-.198.05-.371-.05-.52-.098-.148-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487 2.981 1.287 2.981.858 3.522.805.54-.05 1.758-.718 2.006-1.413.248-.694.248-1.29.173-1.413-.074-.124-.272-.198-.57-.347z" />
        <path d="M12 0C5.373 0 0 5.373 0 12c0 2.625.846 5.052 2.284 7.034L.789 23.211l4.276-1.457A11.94 11.94 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22a9.94 9.94 0 0 1-5.297-1.523l-.379-.24-3.99 1.36 1.324-3.987-.246-.393A9.94 9.94 0 0 1 2 12C2 6.486 6.486 2 12 2s10 4.486 10 10-4.486 10-10 10z" />
      </svg>
    </motion.a>
  );
}
