"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { solutions } from "@/data/solutions";
import { templates } from "@/data/templates";

type Status = "idle" | "loading" | "success" | "error";

export default function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const messageRef = useRef<HTMLTextAreaElement>(null);

  // Pre-fill the message when arriving from a solution guide (?topic=<slug>)
  // or a website template (?template=<slug>).
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const solution = solutions.find((s) => s.slug === params.get("topic"));
    const template = templates.find((t) => t.slug === params.get("template"));
    const interest = solution
      ? `"${solution.title}"`
      : template
        ? `a website like the "${template.name}" template (${template.industry})`
        : null;
    if (interest && messageRef.current && !messageRef.current.value) {
      messageRef.current.value = `Hi! I'm interested in ${interest}.\n\nMy business: \nWhat I'd like to achieve: `;
    }
  }, []);

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
        className="glass neon neon-on rounded-2xl p-8 text-center"
      >
        <p className="hud-label justify-center">Transmission received</p>
        <h3 className="mt-3 font-heading text-xl font-bold">Message sent.</h3>
        <p className="mt-2 text-sm text-muted">
          Thanks for reaching out — I&apos;ll get back to you soon.
        </p>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label className="font-label text-xs uppercase tracking-[0.16em] text-muted" htmlFor="name">
          Name
        </label>
        <input id="name" name="name" type="text" required className="field mt-2" />
      </div>
      <div>
        <label className="font-label text-xs uppercase tracking-[0.16em] text-muted" htmlFor="email">
          Email
        </label>
        <input id="email" name="email" type="email" required className="field mt-2" />
      </div>
      <div>
        <label
          className="font-label text-xs uppercase tracking-[0.16em] text-muted"
          htmlFor="message"
        >
          Tell me about your project
        </label>
        <textarea
          ref={messageRef}
          id="message"
          name="message"
          rows={6}
          required
          className="field mt-2"
        />
      </div>

      {status === "error" && <p className="text-sm text-flare-orange">{errorMessage}</p>}

      <button
        type="submit"
        disabled={status === "loading"}
        className="btn-primary w-full disabled:opacity-60"
      >
        {status === "loading" ? "Sending…" : "Send message"}
      </button>
    </form>
  );
}
