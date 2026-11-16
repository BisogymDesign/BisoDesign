import type { Metadata } from "next";
import Link from "next/link";
import { SITE_URL } from "@/lib/site";
import { carePlans } from "@/data/care";
import ScrollReveal from "@/components/ScrollReveal";
import PricingCard from "@/components/PricingCard";
import FaqAccordion from "@/components/FaqAccordion";

export const metadata: Metadata = {
  title: "Website Care Plans UK — Monthly Website Maintenance from £29",
  description:
    "Website care plans for UK businesses: backups, security updates, uptime monitoring, monthly changes and plain-English Google reports. Fixed monthly prices from £29, looked after remotely anywhere in the UK.",
  alternates: { canonical: "/website-care-plans" },
};

const INCLUDED = [
  { icon: "💾", title: "Backups", text: "Your site and content backed up, so nothing is ever lost." },
  { icon: "🛡️", title: "Security updates", text: "Software kept up to date and vulnerabilities patched." },
  { icon: "📡", title: "Uptime monitoring", text: "If your site goes down, I know within minutes — usually before you do." },
  { icon: "⚡", title: "Speed checks", text: "Pages kept fast on phones, where most of your customers are." },
  { icon: "📝", title: "Content changes", text: "New prices, photos, opening hours or a new offer — just send a message." },
  { icon: "📬", title: "Form testing", text: "Contact and quote forms checked so no enquiry silently goes missing." },
  { icon: "📈", title: "Google reports", text: "What people searched, how many found you, and what to improve next." },
  { icon: "🔔", title: "Renewal reminders", text: "Domain and SSL renewals tracked so nothing expires by surprise." },
];

const WITHOUT = [
  "A broken contact form loses enquiries for weeks before anyone notices",
  "Old prices and opening hours confuse customers",
  "Out-of-date software leaves the door open to hackers",
  "Every small change means chasing someone and paying ad hoc",
];
const WITH = [
  "Forms, speed and uptime checked every month",
  "Changes done quickly — just message what you need",
  "Security handled quietly in the background",
  "One fixed monthly price, no surprise invoices",
];

const FAQ = [
  {
    id: "cp-what",
    question: "What is a website care plan?",
    answer:
      "A fixed monthly fee that covers everything needed to keep your website safe, fast and up to date: backups, security updates, monitoring, testing and a set amount of changes each month — so you never have to think about it.",
  },
  {
    id: "cp-new",
    question: "Do I need a care plan if my website is new?",
    answer:
      "A new site still needs updates, backups and the odd change — and the first months after launch are when you'll want tweaks most. A care plan keeps it improving instead of slowly going out of date.",
  },
  {
    id: "cp-other",
    question: "Can you look after a website you didn't build?",
    answer:
      "Often, yes. I'll start with a free health check to see how your site is built and what state it's in, then tell you honestly whether a care plan makes sense — or whether a redesign would save you money long term.",
  },
  {
    id: "cp-small",
    question: "What counts as a change?",
    answer:
      "Things like updating text, prices, photos, opening hours, adding a team member, a new offer banner or a blog post. Bigger work — like a brand-new section or feature — is quoted separately at a fixed price, before it starts.",
  },
  {
    id: "cp-hours",
    question: "What if I need more time in a month?",
    answer: "No problem — extra work is quoted upfront at a fixed price, so there are never surprise invoices. Included time is per month and doesn't roll over.",
  },
  {
    id: "cp-contract",
    question: "Is there a long contract?",
    answer: "No. Care plans are monthly — you can change plan or cancel with 30 days' notice.",
  },
  {
    id: "cp-where",
    question: "Do you work with businesses outside my area?",
    answer:
      "Yes. Care plans are delivered remotely, so it doesn't matter whether you're in Wales, Devon, Cheltenham or Scotland — you get the same service by email, WhatsApp and video call.",
  },
];

export default function WebsiteCarePlansPage() {
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "Service",
      name: "Website care plans",
      serviceType: "Website maintenance",
      description: metadata.description,
      url: `${SITE_URL}/website-care-plans`,
      provider: { "@id": `${SITE_URL}/#business` },
      areaServed: { "@type": "Country", name: "United Kingdom" },
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Website care plans",
        itemListElement: carePlans.map((p) => ({
          "@type": "Offer",
          name: `${p.name} care plan`,
          description: p.tagline,
          priceSpecification: { "@type": "UnitPriceSpecification", price: p.monthly, priceCurrency: "GBP", unitText: "MONTH" },
        })),
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: FAQ.map((f) => ({ "@type": "Question", name: f.question, acceptedAnswer: { "@type": "Answer", text: f.answer } })),
    },
  ];

  return (
    <div className="mx-auto max-w-6xl px-6 py-24">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />

      {/* Hero */}
      <ScrollReveal>
        <p className="hud-label">Website care plans · UK-wide</p>
        <h1 className="mt-4 max-w-4xl font-heading text-4xl font-extrabold leading-tight md:text-6xl">
          Website care plans: your site kept <span className="text-gradient">safe, fast and up to date</span>.
        </h1>
        <p className="mt-6 max-w-2xl text-muted md:text-lg">
          You&apos;ve got a business to run. For one fixed monthly fee, I look after your website — backups, security,
          monitoring and the changes you need — so it keeps working for you and you never have to think about it.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <a href="#plans" className="btn-primary">
            Choose a plan
          </a>
          <Link href="/about?interest=care-check#contact" className="btn-ghost">
            Free website health check
          </Link>
        </div>
        <p className="mt-5 font-label text-xs uppercase tracking-[0.16em] text-muted">From £29/month · No long contract · Remote care anywhere in the UK</p>
      </ScrollReveal>

      {/* Included */}
      <ScrollReveal className="mt-24">
        <p className="hud-label">What&apos;s looked after</p>
        <h2 className="mt-3 font-heading text-3xl font-bold md:text-4xl">Everything your website needs, every month</h2>
      </ScrollReveal>
      <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {INCLUDED.map((x, i) => (
          <ScrollReveal key={x.title} delay={(i % 4) * 0.05} className="h-full">
            <div className="glass neon h-full rounded-2xl p-6">
              <span className="text-3xl">{x.icon}</span>
              <h3 className="mt-4 font-heading text-base font-bold">{x.title}</h3>
              <p className="mt-2 text-sm text-muted">{x.text}</p>
            </div>
          </ScrollReveal>
        ))}
      </div>

      {/* Plans */}
      <div id="plans" className="scroll-mt-28">
        <ScrollReveal className="mt-28">
          <p className="hud-label">Plans & prices</p>
          <h2 className="mt-3 font-heading text-3xl font-bold md:text-4xl">Pick the level of care you need</h2>
          <p className="mt-4 max-w-2xl text-muted">Fixed monthly prices. Change plan or cancel with 30 days&apos; notice.</p>
        </ScrollReveal>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {carePlans.map((plan, i) => (
            <ScrollReveal key={plan.id} delay={i * 0.08} className="h-full">
              <PricingCard pkg={plan} href={plan.href} cta={`Choose ${plan.name}`} />
            </ScrollReveal>
          ))}
        </div>
      </div>

      {/* Without vs with */}
      <ScrollReveal className="mt-28">
        <div className="grid gap-6 md:grid-cols-2">
          <div className="glass rounded-3xl p-8">
            <p className="font-label text-xs uppercase tracking-[0.2em] text-muted">Without a care plan</p>
            <ul className="mt-5 space-y-4">
              {WITHOUT.map((t) => (
                <li key={t} className="flex items-start gap-3 text-muted">
                  <span className="mt-0.5 flex h-6 w-6 flex-none items-center justify-center rounded-full border border-white/15 text-xs">✕</span>
                  {t}
                </li>
              ))}
            </ul>
          </div>
          <div className="glass neon neon-on rounded-3xl p-8">
            <p className="hud-label">With a BisoDesign care plan</p>
            <ul className="mt-5 space-y-4">
              {WITH.map((t) => (
                <li key={t} className="flex items-start gap-3 text-ink/90">
                  <span className="mt-0.5 flex h-6 w-6 flex-none items-center justify-center rounded-full bg-flare-gradient text-xs font-bold text-night">✓</span>
                  {t}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </ScrollReveal>

      {/* UK-wide */}
      <ScrollReveal className="mt-28">
        <div className="glass neon hud rounded-3xl p-8 md:p-12">
          <p className="hud-label">Remote care, wherever you are</p>
          <h2 className="mt-3 font-heading text-3xl font-bold">Looking after websites across the UK</h2>
          <p className="mt-4 max-w-3xl text-muted">
            Website care doesn&apos;t need a visit. Whether your business is in Wales, Devon, Cheltenham, London or the
            Highlands, everything happens online — changes by email or WhatsApp, a monthly report in your inbox, and a
            video call whenever you&apos;d like to talk things through.
          </p>
          <div className="mt-6 flex flex-wrap gap-2">
            {["England", "Wales", "Scotland", "Northern Ireland"].map((r) => (
              <span key={r} className="chip">
                📍 {r}
              </span>
            ))}
          </div>
        </div>
      </ScrollReveal>

      {/* Redesign link */}
      <ScrollReveal className="mt-10">
        <Link href="/website-redesign" className="glass neon group flex flex-col items-start justify-between gap-4 rounded-2xl p-6 md:flex-row md:items-center">
          <div>
            <p className="hud-label">Site too old to look after?</p>
            <p className="mt-2 font-heading text-lg font-bold">A redesign can cost less than patching an old site for years.</p>
          </div>
          <span className="btn-ghost whitespace-nowrap">Website redesign →</span>
        </Link>
      </ScrollReveal>

      {/* FAQ */}
      <ScrollReveal className="mt-28">
        <p className="hud-label">Questions</p>
        <h2 className="mt-3 font-heading text-3xl font-bold md:text-4xl">Website care plan FAQ</h2>
      </ScrollReveal>
      <div className="mt-10 max-w-3xl">
        <FaqAccordion items={FAQ} />
      </div>

      {/* CTA */}
      <ScrollReveal className="mt-24">
        <div className="glass neon neon-on hud relative overflow-hidden rounded-3xl p-10 text-center">
          <div className="ambient-grid absolute inset-0 opacity-60" aria-hidden />
          <div className="relative">
            <h2 className="font-heading text-2xl font-bold md:text-3xl">Not sure which plan fits?</h2>
            <p className="mx-auto mt-3 max-w-md text-muted">
              Start with a free health check. I&apos;ll look at your site and recommend the simplest plan that covers what you
              need — even if that&apos;s the smallest one.
            </p>
            <Link href="/about?interest=care-check#contact" className="btn-primary mt-8">
              Get my free health check
            </Link>
          </div>
        </div>
      </ScrollReveal>
    </div>
  );
}
