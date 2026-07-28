"use client";

import { useState } from "react";
import { motion } from "framer-motion";

type Status = "idle" | "loading" | "success" | "error";

export default function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    setErrorMessage("");

    const form = e.currentTarget;
    const data = {
      name: (form.elements.namedItem("name") as HTMLInputElement).value,
      email: (form.elements.namedItem("email") as HTMLInputElement).value,
      message: (form.elements.namedItem("message") as HTMLTextAreaElement).value,
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error || "Something went wrong.");
      }
      setStatus("success");
      form.reset();
    } catch (err) {
      setStatus("error");
      setErrorMessage(err instanceof Error ? err.message : "Something went wrong.");
    }
  }

  if (status === "success") {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="rounded-2xl border border-flare-orange/40 bg-surface p-8 text-center"
      >
        <h3 className="font-heading text-xl font-bold">Message sent.</h3>
        <p className="mt-2 text-sm text-muted">
          Thanks for reaching out — I'll get back to you soon.
        </p>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label className="font-label text-xs uppercase tracking-wide text-muted" htmlFor="name">
          Name
        </label>
        <input
          id="name"
          name="name"
          type="text"
          required
          className="mt-2 w-full rounded-xl border border-white/10 bg-surface px-4 py-3 text-sm outline-none focus:border-flare-orange"
        />
      </div>
      <div>
        <label className="font-label text-xs uppercase tracking-wide text-muted" htmlFor="email">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          className="mt-2 w-full rounded-xl border border-white/10 bg-surface px-4 py-3 text-sm outline-none focus:border-flare-orange"
        />
      </div>
      <div>
        <label
          className="font-label text-xs uppercase tracking-wide text-muted"
          htmlFor="message"
        >
          Tell me about your project
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          required
          className="mt-2 w-full rounded-xl border border-white/10 bg-surface px-4 py-3 text-sm outline-none focus:border-flare-orange"
        />
      </div>

      {status === "error" && (
        <p className="text-sm text-flare-orange">{errorMessage}</p>
      )}

      <button
        type="submit"
        disabled={status === "loading"}
        className="w-full rounded-full bg-flare-gradient px-6 py-3 font-label text-sm font-semibold text-night shadow-glow transition-transform hover:-translate-y-0.5 disabled:opacity-60"
      >
        {status === "loading" ? "Sending…" : "Send message"}
      </button>
    </form>
  );
}
