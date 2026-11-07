import { readContent } from "@/lib/store";
import ScrollReveal from "@/components/ScrollReveal";
import ServiceCard from "@/components/ServiceCard";
import ProcessSteps from "@/components/ProcessSteps";
import Link from "next/link";
import type { Metadata } from "next";
import { solutions } from "@/data/solutions";

export const metadata: Metadata = {
  title: "Services — Custom Websites, Automations & Local SEO",
  description:
    "Hand-coded websites, business automations (WhatsApp enquiries, online booking, review requests), redesigns, local SEO and maintenance for UK small businesses.",
  alternates: { canonical: "/services" },
};

export default async function ServicesPage() {
  const content = await readContent();

  return (
    <div className="mx-auto max-w-6xl px-6 py-24">
      <ScrollReveal>
        <p className="hud-label">What I do</p>
        <h1 className="mt-4 max-w-3xl font-heading text-4xl font-extrabold leading-tight md:text-6xl">
          Websites, automations, and <span className="text-gradient">everything in between</span>.
        </h1>
        <p className="mt-6 max-w-xl text-muted md:text-lg">
          A new site, a slow one that needs fixing, or hours of admin you&apos;d like to automate —
          if it&apos;s on the web, chances are we can sort it out together.
        </p>
      </ScrollReveal>

      <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {content.services.map((service, i) => (
          <ScrollReveal key={service.id} delay={i * 0.08} className="h-full">
            <ServiceCard service={service} index={i} />
          </ScrollReveal>
        ))}
      </div>

      <ScrollReveal className="mt-10">
        <Link
          href="/solutions"
          className="glass neon group flex flex-col items-start justify-between gap-4 rounded-2xl p-6 md:flex-row md:items-center"
        >
          <div>
            <p className="hud-label">Solutions library</p>
            <p className="mt-2 font-heading text-lg font-bold">
              See {solutions.length} detailed guides — how each solution works, what&apos;s included
              and starting prices.
            </p>
          </div>
          <span className="btn-ghost whitespace-nowrap">Open library →</span>
        </Link>
      </ScrollReveal>

      <ScrollReveal className="mt-24">
        <p className="hud-label">How we work</p>
        <h2 className="mt-3 font-heading text-3xl font-bold md:text-5xl">
          A simple, four-step process
        </h2>
      </ScrollReveal>

      <div className="mt-10">
        <ProcessSteps steps={content.processSteps} />
      </div>

      <ScrollReveal className="mt-24">
        <div className="glass neon neon-on hud relative overflow-hidden rounded-3xl p-10 text-center">
          <div className="ambient-grid absolute inset-0 opacity-60" aria-hidden />
          <div className="relative">
            <h2 className="font-heading text-2xl font-bold md:text-3xl">Not sure what you need yet?</h2>
            <p className="mx-auto mt-3 max-w-md text-muted">
              That&apos;s fine — most projects start with a conversation, not a spec sheet.
            </p>
            <Link href="/about#contact" className="btn-primary mt-8">
              Let&apos;s talk
            </Link>
          </div>
        </div>
      </ScrollReveal>
    </div>
  );
}
