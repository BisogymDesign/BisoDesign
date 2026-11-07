import Link from "next/link";
import { readContent } from "@/lib/store";
import { solutions } from "@/data/solutions";
import HeroScene from "@/components/HeroScene";
import ScrollReveal from "@/components/ScrollReveal";
import PortfolioCard from "@/components/PortfolioCard";
import PricingCard from "@/components/PricingCard";
import ServiceCard from "@/components/ServiceCard";
import TestimonialCard from "@/components/TestimonialCard";

const highlights = [
  { k: "01", title: "Hand-coded", text: "No page builders or bloated templates — fast sites you fully own." },
  { k: "02", title: "Fixed price", text: "A clear quote before any work starts. No surprises later." },
  { k: "03", title: "Built to sell", text: "WhatsApp, click-to-call, bookings and reviews built in from day one." },
  { k: "04", title: "Direct contact", text: "You talk to the person building your site — before, during and after." },
];

const featuredSolutionSlugs = [
  "instant-enquiry-alerts",
  "online-booking",
  "review-requests",
  "instant-quote-calculator",
  "payment-links-invoices",
  "ai-website-assistant",
];

function SectionHeading({
  label,
  title,
  link,
}: {
  label: string;
  title: React.ReactNode;
  link?: { href: string; text: string };
}) {
  return (
    <ScrollReveal>
      <div className="mb-12 flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
        <div>
          <p className="hud-label">{label}</p>
          <h2 className="mt-3 font-heading text-3xl font-bold md:text-5xl">{title}</h2>
        </div>
        {link && (
          <Link
            href={link.href}
            className="font-label text-xs uppercase tracking-[0.18em] text-muted transition-colors hover:text-flare-cyan"
          >
            {link.text}
          </Link>
        )}
      </div>
    </ScrollReveal>
  );
}

export default async function HomePage() {
  const content = await readContent();
  // Only show real testimonials — never placeholder text on the live site.
  const testimonials = content.testimonials.filter(
    (t) => t.quote.trim() && !/placeholder/i.test(t.quote)
  );
  const featured = featuredSolutionSlugs
    .map((slug) => solutions.find((s) => s.slug === slug))
    .filter((s): s is (typeof solutions)[number] => Boolean(s));

  return (
    <div>
      {/* ── Hero ── */}
      <section className="relative -mt-20 flex min-h-[100vh] items-center overflow-hidden px-6 pb-16 pt-36">
        <HeroScene />
        <div className="hero-floor" aria-hidden />
        <div className="scanline" aria-hidden />
        <div className="relative z-10 mx-auto w-full max-w-6xl">
          <div className="max-w-3xl">
            <div className="chip !border-flare-cyan/30 !text-flare-cyan">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400 shadow-[0_0_8px_#34d399]" />
              Available for new projects
            </div>
            <p className="mt-6 font-label text-xs uppercase tracking-[0.28em] text-flare-peach/90">
              {content.tagline}
            </p>
            <h1 className="mt-4 font-heading text-4xl font-extrabold leading-[1.05] sm:text-5xl md:text-6xl xl:text-7xl">
              {content.heroTitle.split(". ").map((part, i, arr) => (
                <span key={i} className={i === arr.length - 1 ? "block text-gradient" : "block"}>
                  {part}
                  {i < arr.length - 1 ? "." : ""}
                </span>
              ))}
            </h1>
            <p className="mt-8 max-w-xl text-muted md:text-lg">{content.heroSubtitle}</p>
            <div className="mt-10 flex flex-wrap gap-4">
              <Link href="/about#contact" className="btn-primary">
                Get a free quote →
              </Link>
              <Link href="/solutions" className="btn-ghost">
                Explore solutions
              </Link>
            </div>
          </div>

          {/* HUD stats strip */}
          <div className="glass mt-16 grid max-w-3xl grid-cols-3 divide-x divide-white/5 rounded-2xl">
            {[
              { v: "~1s", l: "Mobile load" },
              { v: `${solutions.length}`, l: "Solutions" },
              { v: "100%", l: "Hand-coded" },
            ].map((s) => (
              <div key={s.l} className="px-4 py-4 md:px-6">
                <p className="font-heading text-xl font-extrabold text-gradient md:text-2xl">{s.v}</p>
                <p className="mt-1 font-label text-[10px] uppercase tracking-[0.18em] text-muted">
                  {s.l}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Highlights ── */}
      <section className="mx-auto max-w-6xl px-6 pt-20">
        <div className="grid grid-cols-2 gap-4 md:gap-6 lg:grid-cols-4">
          {highlights.map((h, i) => (
            <ScrollReveal key={h.title} delay={i * 0.08} className="h-full">
              <div className="glass neon h-full rounded-2xl p-5 md:p-6">
                <p className="font-label text-[10px] tracking-[0.2em] text-flare-cyan/80">// {h.k}</p>
                <p className="mt-3 font-heading text-base font-bold text-gradient md:text-lg">
                  {h.title}
                </p>
                <p className="mt-2 text-sm text-muted">{h.text}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* ── Services ── */}
      <section className="mx-auto max-w-6xl px-6 py-24">
        <SectionHeading
          label="What I do"
          title={
            <>
              Websites <span className="text-gradient">+</span> automations
            </>
          }
          link={{ href: "/services", text: "All services →" }}
        />
        <div className="grid gap-6 md:grid-cols-3">
          {content.services.slice(0, 3).map((service, i) => (
            <ScrollReveal key={service.id} delay={i * 0.1} className="h-full">
              <ServiceCard service={service} index={i} />
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* ── Solutions library teaser ── */}
      <section className="mx-auto max-w-6xl px-6 py-24">
        <SectionHeading
          label="Automation library"
          title={
            <>
              Put the boring work <span className="text-gradient">on autopilot</span>
            </>
          }
          link={{ href: "/solutions", text: `All ${solutions.length} guides →` }}
        />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((s, i) => (
            <ScrollReveal key={s.slug} delay={i * 0.06} className="h-full">
              <Link
                href={`/solutions/${s.slug}`}
                className="glass neon group flex h-full items-start gap-4 rounded-2xl p-5 transition-transform hover:-translate-y-1"
              >
                <span className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl border border-flare-cyan/30 bg-flare-cyan/5 font-label text-[10px] font-semibold tracking-wider text-flare-cyan">
                  {s.code.replace("-", "")}
                </span>
                <div className="min-w-0">
                  <h3 className="font-heading text-sm font-bold md:text-base">{s.title}</h3>
                  <p className="mt-1 line-clamp-2 text-xs text-muted md:text-sm">{s.tagline}</p>
                  <p className="mt-2 font-label text-[11px] uppercase tracking-[0.16em] text-flare-cyan">
                    From {s.priceFrom}
                    <span className="ml-1 inline-block transition-transform group-hover:translate-x-1">→</span>
                  </p>
                </div>
              </Link>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* ── Portfolio ── */}
      <section className="mx-auto max-w-6xl px-6 py-24">
        <SectionHeading
          label="Selected work"
          title="Portfolio"
          link={{ href: "/about#contact", text: "Have a project in mind? →" }}
        />
        <div className="grid gap-6 md:grid-cols-3">
          {content.portfolio.map((item, i) => (
            <ScrollReveal key={item.id} delay={i * 0.1} className="h-full">
              <PortfolioCard item={item} />
            </ScrollReveal>
          ))}
        </div>
      </section>

      {testimonials.length > 0 && (
        <section className="mx-auto max-w-6xl px-6 py-24">
          <SectionHeading label="Client feedback" title="What clients say" />
          <div className="grid gap-6 md:grid-cols-3">
            {testimonials.map((testimonial, i) => (
              <ScrollReveal key={testimonial.id} delay={i * 0.1} className="h-full">
                <TestimonialCard testimonial={testimonial} />
              </ScrollReveal>
            ))}
          </div>
        </section>
      )}

      {/* ── Pricing ── */}
      <section className="mx-auto max-w-6xl px-6 py-24">
        <SectionHeading
          label="Pricing"
          title="Straightforward packages"
          link={{ href: "/pricing", text: "Full pricing & FAQ →" }}
        />
        <div className="grid gap-6 md:grid-cols-3">
          {content.pricing.map((pkg, i) => (
            <ScrollReveal key={pkg.id} delay={i * 0.1} className="h-full">
              <PricingCard pkg={pkg} />
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* ── Final CTA ── */}
      <section className="mx-auto max-w-6xl px-6 pb-28">
        <ScrollReveal>
          <div className="glass neon neon-on hud relative overflow-hidden rounded-3xl p-10 text-center md:p-16">
            <div className="ambient-grid absolute inset-0 opacity-70" aria-hidden />
            <div className="relative">
              <p className="hud-label justify-center">Ready when you are</p>
              <h2 className="mt-4 font-heading text-3xl font-extrabold md:text-5xl">
                More calls. <span className="text-gradient">Less admin.</span>
              </h2>
              <p className="mx-auto mt-4 max-w-md text-muted">
                Tell me about your business — I&apos;ll reply within 24 hours with ideas and a
                fixed quote. No obligation.
              </p>
              <div className="mt-8 flex flex-wrap justify-center gap-3">
                <Link href="/about#contact" className="btn-primary">
                  Get a free quote →
                </Link>
                <Link href="/solutions" className="btn-ghost">
                  Browse solutions
                </Link>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </section>
    </div>
  );
}
