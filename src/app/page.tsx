import Link from "next/link";
import { readContent } from "@/lib/store";
import HeroScene from "@/components/HeroScene";
import ScrollReveal from "@/components/ScrollReveal";
import PortfolioCard from "@/components/PortfolioCard";
import PricingCard from "@/components/PricingCard";
import TestimonialCard from "@/components/TestimonialCard";

export default async function HomePage() {
  const content = await readContent();

  return (
    <div>
      <section className="relative flex min-h-[90vh] items-center overflow-hidden bg-flare-radial px-6">
        <HeroScene />
        <div className="relative z-10 mx-auto max-w-3xl">
          <p className="font-label mb-4 text-sm uppercase tracking-[0.2em] text-flare-peach">
            {content.tagline}
          </p>
          <h1 className="font-heading text-4xl font-extrabold leading-[1.1] sm:text-5xl md:text-6xl">
            {content.heroTitle}
          </h1>
          <p className="mt-6 max-w-xl text-muted md:text-lg">
            {content.heroSubtitle}
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <Link
              href="/pricing"
              className="rounded-full bg-flare-gradient px-7 py-3 font-label text-sm font-semibold text-night shadow-glow transition-transform hover:-translate-y-0.5"
            >
              See pricing
            </Link>
            <Link
              href="/about"
              className="rounded-full border border-white/15 px-7 py-3 font-label text-sm font-semibold text-ink transition-colors hover:border-white/40"
            >
              Start a project
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-24">
        <ScrollReveal>
          <div className="mb-12 flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
            <div>
              <p className="font-label text-sm uppercase tracking-[0.2em] text-flare-orange">
                Selected work
              </p>
              <h2 className="mt-2 font-heading text-3xl font-bold md:text-4xl">Portfolio</h2>
            </div>
            <Link href="/about" className="font-label text-sm text-muted hover:text-ink">
              Have a project in mind? Get in touch →
            </Link>
          </div>
        </ScrollReveal>

        <div className="grid gap-6 md:grid-cols-3">
          {content.portfolio.map((item, i) => (
            <ScrollReveal key={item.id} delay={i * 0.1}>
              <PortfolioCard item={item} />
            </ScrollReveal>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-24">
        <ScrollReveal>
          <p className="font-label text-sm uppercase tracking-[0.2em] text-flare-orange">
            Client feedback
          </p>
          <h2 className="mt-2 font-heading text-3xl font-bold md:text-4xl">
            What clients say
          </h2>
        </ScrollReveal>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {content.testimonials.map((testimonial, i) => (
            <ScrollReveal key={testimonial.id} delay={i * 0.1}>
              <TestimonialCard testimonial={testimonial} />
            </ScrollReveal>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-24">
        <ScrollReveal>
          <p className="font-label text-sm uppercase tracking-[0.2em] text-flare-orange">
            Pricing
          </p>
          <h2 className="mt-2 font-heading text-3xl font-bold md:text-4xl">
            Straightforward packages
          </h2>
        </ScrollReveal>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {content.pricing.map((pkg, i) => (
            <ScrollReveal key={pkg.id} delay={i * 0.1}>
              <PricingCard pkg={pkg} />
            </ScrollReveal>
          ))}
        </div>
      </section>
    </div>
  );
}
