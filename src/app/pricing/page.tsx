import { readContent } from "@/lib/store";
import ScrollReveal from "@/components/ScrollReveal";
import PricingCard from "@/components/PricingCard";
import FaqAccordion from "@/components/FaqAccordion";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Pricing — Website Packages from £495",
  description:
    "Clear, fixed-price website packages for UK small businesses: Spark, Ignite and Nova. Automations, booking and local SEO included where you need them.",
  alternates: { canonical: "/pricing" },
};

export default async function PricingPage() {
  const content = await readContent();

  // FAQ rich results in Google search
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: content.faq.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  };

  return (
    <div className="mx-auto max-w-6xl px-6 py-24">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd).replace(/</g, "\\u003c") }}
      />
      <ScrollReveal>
        <p className="hud-label">Pricing</p>
        <h1 className="mt-4 max-w-3xl font-heading text-4xl font-extrabold leading-tight md:text-6xl">
          Simple packages, <span className="text-gradient">no surprises</span>.
        </h1>
        <p className="mt-6 max-w-xl text-muted">
          Every project is a little different, so these are starting points — we'll fine-tune
          scope and price once we talk about what you actually need.
        </p>
      </ScrollReveal>

      <div className="mt-16 grid gap-6 md:grid-cols-3">
        {content.pricing.map((pkg, i) => (
          <ScrollReveal key={pkg.id} delay={i * 0.1} className="h-full">
            <PricingCard pkg={pkg} />
          </ScrollReveal>
        ))}
      </div>

      <ScrollReveal className="mt-12">
        <Link
          href="/solutions"
          className="glass neon flex flex-col items-start justify-between gap-4 rounded-2xl p-6 md:flex-row md:items-center"
        >
          <div>
            <p className="hud-label">Already have a website?</p>
            <p className="mt-2 text-sm text-muted md:text-base">
              Automations, maintenance plans and one-off fixes are available on their own — see
              each solution with its starting price.
            </p>
          </div>
          <span className="btn-ghost whitespace-nowrap">Solutions & prices →</span>
        </Link>
      </ScrollReveal>

      <ScrollReveal className="mt-24">
        <p className="hud-label">FAQ</p>
        <h2 className="mt-3 font-heading text-3xl font-bold md:text-5xl">
          Common questions
        </h2>
      </ScrollReveal>

      <div className="mx-auto mt-10 max-w-3xl">
        <FaqAccordion items={content.faq} />
      </div>
    </div>
  );
}
