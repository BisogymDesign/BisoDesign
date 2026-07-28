import { readContent } from "@/lib/store";
import ScrollReveal from "@/components/ScrollReveal";
import PricingCard from "@/components/PricingCard";
import FaqAccordion from "@/components/FaqAccordion";

export default async function PricingPage() {
  const content = await readContent();

  return (
    <div className="mx-auto max-w-6xl px-6 py-24">
      <ScrollReveal>
        <p className="font-label text-sm uppercase tracking-[0.2em] text-flare-orange">
          Pricing
        </p>
        <h1 className="mt-2 max-w-2xl font-heading text-4xl font-extrabold leading-tight md:text-5xl">
          Simple packages, no surprises.
        </h1>
        <p className="mt-6 max-w-xl text-muted">
          Every project is a little different, so these are starting points — we'll fine-tune
          scope and price once we talk about what you actually need.
        </p>
      </ScrollReveal>

      <div className="mt-16 grid gap-6 md:grid-cols-3">
        {content.pricing.map((pkg, i) => (
          <ScrollReveal key={pkg.id} delay={i * 0.1}>
            <PricingCard pkg={pkg} />
          </ScrollReveal>
        ))}
      </div>

      <ScrollReveal className="mt-16 text-center text-sm text-muted">
        Need ongoing help after launch? Maintenance and small-fix retainers are available too —
        ask about it when we talk.
      </ScrollReveal>

      <ScrollReveal className="mt-24">
        <p className="font-label text-sm uppercase tracking-[0.2em] text-flare-orange">
          FAQ
        </p>
        <h2 className="mt-2 font-heading text-3xl font-bold md:text-4xl">
          Common questions
        </h2>
      </ScrollReveal>

      <div className="mx-auto mt-10 max-w-3xl">
        <FaqAccordion items={content.faq} />
      </div>
    </div>
  );
}
