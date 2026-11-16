import type { Metadata } from "next";
import Link from "next/link";
import { readContent } from "@/lib/store";
import { SITE_URL } from "@/lib/site";
import ScrollReveal from "@/components/ScrollReveal";
import PricingCard from "@/components/PricingCard";
import FaqAccordion from "@/components/FaqAccordion";
import BeforeAfter from "@/components/BeforeAfter";

export const metadata: Metadata = {
  title: "Website Redesign Services UK — Bespoke, Hand-Coded Redesigns",
  description:
    "Bespoke website redesign services for UK businesses. A faster, modern site that wins more enquiries — while protecting the Google rankings you've already earned. Fixed prices from £495.",
  alternates: { canonical: "/website-redesign" },
};

const SIGNS = [
  { icon: "🕰️", title: "It looks dated", text: "Customers judge you in seconds. An old design quietly tells them you might be out of date too." },
  { icon: "🐢", title: "It's slow on phones", text: "Most visitors arrive on a phone. If it takes ages to load, they're gone — usually to a competitor." },
  { icon: "📭", title: "It doesn't bring enquiries", text: "Visitors arrive but don't call or fill in the form. Usually it's the structure, not your business." },
  { icon: "🔒", title: "You can't update it", text: "Every change means waiting for someone, or a page builder that fights you." },
  { icon: "🔍", title: "You're invisible on Google", text: "Competitors show up for the searches your customers make — and you don't." },
  { icon: "💸", title: "You pay monthly for a builder", text: "Fees for a platform you don't own, plus plugins that keep breaking." },
];

const PROTECT = [
  "Every old page mapped to its new address, with 301 redirects — no broken links",
  "Content and pages that already rank are kept, then improved",
  "Page titles, descriptions and structured data rebuilt for search",
  "New sitemap submitted to Google Search Console on launch day",
  "Faster load times and better Core Web Vitals",
  "30 days of monitoring after launch to catch anything early",
];

const STEPS = [
  { title: "Free redesign review", text: "I look at your current site — speed, mobile, Google and what stops visitors getting in touch — and tell you honestly what's worth changing." },
  { title: "Plan & fixed price", text: "A clear plan of pages, features and timeline, with a fixed price in writing before anything starts." },
  { title: "Design & build on a preview link", text: "Your old site stays live while the new one is built on a private link you can check on your own phone." },
  { title: "Switch-over with redirects", text: "We go live in one move: redirects in place, Google notified, forms tested — usually with no downtime at all." },
  { title: "Aftercare", text: "I monitor the new site for 30 days — and you can keep it looked after with a monthly care plan." },
];

const FAQ = [
  {
    id: "rd-rankings",
    question: "Will I lose my Google rankings if I redesign my website?",
    answer:
      "Not if it's done properly. Rankings are usually lost when old pages disappear without redirects or good content is thrown away. I map every old address to its new page, keep (and improve) the content that already ranks, and resubmit your sitemap to Google on launch day.",
  },
  {
    id: "rd-cost",
    question: "How much does a website redesign cost in the UK?",
    answer:
      "My redesigns use the same fixed-price packages as new sites: from £495 for a small business site, £1,095 with automations and booking, and from £2,095 for e-commerce or custom features. You get the exact price in writing before anything starts.",
  },
  {
    id: "rd-time",
    question: "How long does a redesign take?",
    answer: "Typically 2–4 weeks for most small business sites, and 5–8 weeks for shops or custom features. Your current site stays live the whole time.",
  },
  {
    id: "rd-platform",
    question: "Can you redesign a Wix, Squarespace or WordPress website?",
    answer:
      "Yes. I rebuild it as a fast, hand-coded site you own outright — no monthly builder fees or plugins to break. Your content, images and Google-friendly addresses come across with it.",
  },
  {
    id: "rd-domain",
    question: "Do I keep my domain name and email?",
    answer: "Yes. Your domain and email stay exactly where they are — only the website itself changes. I'll handle the technical switch-over with you.",
  },
  {
    id: "rd-after",
    question: "What happens after the redesign goes live?",
    answer: "I monitor everything for 30 days. After that you can book changes when you need them, or choose a monthly care plan so the site is kept safe, fast and up to date.",
  },
];

export default async function WebsiteRedesignPage() {
  const content = await readContent();

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "Service",
      name: "Website redesign",
      serviceType: "Website redesign",
      description: metadata.description,
      url: `${SITE_URL}/website-redesign`,
      provider: { "@id": `${SITE_URL}/#business` },
      areaServed: { "@type": "Country", name: "United Kingdom" },
      offers: { "@type": "Offer", priceSpecification: { "@type": "PriceSpecification", minPrice: 495, priceCurrency: "GBP" } },
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
      <div className="grid items-center gap-12 lg:grid-cols-[1fr_1.1fr]">
        <ScrollReveal>
          <p className="hud-label">Website redesign · UK</p>
          <h1 className="mt-4 font-heading text-4xl font-extrabold leading-tight md:text-5xl">
            Website redesign services that <span className="text-gradient">keep your rankings</span> and win more customers.
          </h1>
          <p className="mt-6 max-w-xl text-muted md:text-lg">
            You&apos;ve built a good business — your website should show it. I rebuild tired, slow sites into fast, modern,
            hand-coded websites that make it effortless to choose you, without losing the Google traffic you already have.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/about?interest=redesign#contact" className="btn-primary">
              Get a free redesign review
            </Link>
            <Link href="/work/sayah-recovery" className="btn-ghost">
              See a real project
            </Link>
          </div>
          <p className="mt-5 font-label text-xs uppercase tracking-[0.16em] text-muted">Fixed price from £495 · No monthly builder fees · You own it</p>
        </ScrollReveal>
        <ScrollReveal delay={0.1}>
          <BeforeAfter />
          <p className="mt-3 text-center font-label text-[11px] uppercase tracking-[0.18em] text-muted">Drag to compare · illustrative example</p>
        </ScrollReveal>
      </div>

      {/* Signs */}
      <ScrollReveal className="mt-28">
        <p className="hud-label">Sound familiar?</p>
        <h2 className="mt-3 font-heading text-3xl font-bold md:text-4xl">Six signs it&apos;s time for a redesign</h2>
      </ScrollReveal>
      <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {SIGNS.map((s, i) => (
          <ScrollReveal key={s.title} delay={(i % 3) * 0.06} className="h-full">
            <div className="glass neon h-full rounded-2xl p-6">
              <span className="text-3xl">{s.icon}</span>
              <h3 className="mt-4 font-heading text-lg font-bold">{s.title}</h3>
              <p className="mt-2 text-sm text-muted">{s.text}</p>
            </div>
          </ScrollReveal>
        ))}
      </div>

      {/* Rankings */}
      <ScrollReveal className="mt-28">
        <div className="glass neon neon-on hud grid gap-10 rounded-3xl p-8 md:grid-cols-[1fr_1.2fr] md:p-12">
          <div>
            <p className="hud-label">The biggest worry, handled</p>
            <h2 className="mt-3 font-heading text-3xl font-bold">How I protect your Google rankings</h2>
            <p className="mt-4 text-muted">
              Most redesigns that lose traffic do it by accident — pages vanish, links break, good content is thrown away.
              Here&apos;s exactly how that&apos;s prevented.
            </p>
          </div>
          <ul className="space-y-4">
            {PROTECT.map((p) => (
              <li key={p} className="flex items-start gap-3">
                <span className="mt-0.5 flex h-6 w-6 flex-none items-center justify-center rounded-full bg-flare-gradient text-xs font-bold text-night">✓</span>
                <span className="text-ink/90">{p}</span>
              </li>
            ))}
          </ul>
        </div>
      </ScrollReveal>

      {/* Process */}
      <ScrollReveal className="mt-28">
        <p className="hud-label">The process</p>
        <h2 className="mt-3 font-heading text-3xl font-bold md:text-4xl">From tired to brilliant — in five calm steps</h2>
      </ScrollReveal>
      <ol className="mt-10 grid gap-5 md:grid-cols-5">
        {STEPS.map((s, i) => (
          <ScrollReveal key={s.title} delay={i * 0.06} className="h-full">
            <li className="glass neon h-full rounded-2xl p-6">
              <span className="font-heading text-3xl font-extrabold text-gradient">{String(i + 1).padStart(2, "0")}</span>
              <h3 className="mt-3 font-heading text-base font-bold">{s.title}</h3>
              <p className="mt-2 text-sm text-muted">{s.text}</p>
            </li>
          </ScrollReveal>
        ))}
      </ol>

      {/* Pricing */}
      <ScrollReveal className="mt-28">
        <p className="hud-label">Redesign pricing</p>
        <h2 className="mt-3 font-heading text-3xl font-bold md:text-4xl">Fixed prices, agreed before we start</h2>
        <p className="mt-4 max-w-2xl text-muted">Most redesigns fit Spark or Ignite. You&apos;ll get the exact figure after your free review.</p>
      </ScrollReveal>
      <div className="mt-10 grid gap-6 md:grid-cols-3">
        {content.pricing.map((pkg, i) => (
          <ScrollReveal key={pkg.id} delay={i * 0.08} className="h-full">
            <PricingCard pkg={pkg} href="/about?interest=redesign#contact" cta="Start my redesign" />
          </ScrollReveal>
        ))}
      </div>

      {/* Case study + care */}
      <div className="mt-16 grid gap-6 md:grid-cols-2">
        <ScrollReveal className="h-full">
          <Link href="/work/sayah-recovery" className="glass neon group block h-full rounded-2xl p-8">
            <p className="hud-label">Case study</p>
            <h3 className="mt-3 font-heading text-xl font-bold">Sayah Recovery</h3>
            <p className="mt-2 text-sm text-muted">
              A 24/7 recovery company in London: SOS call buttons, WhatsApp with GPS location, reviews and local SEO.
            </p>
            <span className="mt-5 inline-block font-label text-xs uppercase tracking-[0.16em] text-flare-cyan">Read the case study →</span>
          </Link>
        </ScrollReveal>
        <ScrollReveal delay={0.08} className="h-full">
          <Link href="/website-care-plans" className="glass neon group block h-full rounded-2xl p-8">
            <p className="hud-label">After launch</p>
            <h3 className="mt-3 font-heading text-xl font-bold">Website care plans from £29/month</h3>
            <p className="mt-2 text-sm text-muted">Backups, security, monitoring and changes — so your new site stays fast and safe.</p>
            <span className="mt-5 inline-block font-label text-xs uppercase tracking-[0.16em] text-flare-cyan">See care plans →</span>
          </Link>
        </ScrollReveal>
      </div>

      {/* FAQ */}
      <ScrollReveal className="mt-28">
        <p className="hud-label">Questions</p>
        <h2 className="mt-3 font-heading text-3xl font-bold md:text-4xl">Website redesign FAQ</h2>
      </ScrollReveal>
      <div className="mt-10 max-w-3xl">
        <FaqAccordion items={FAQ} />
      </div>

      {/* CTA */}
      <ScrollReveal className="mt-24">
        <div className="glass neon neon-on hud relative overflow-hidden rounded-3xl p-10 text-center">
          <div className="ambient-grid absolute inset-0 opacity-60" aria-hidden />
          <div className="relative">
            <h2 className="font-heading text-2xl font-bold md:text-3xl">Curious what your site could become?</h2>
            <p className="mx-auto mt-3 max-w-md text-muted">
              Send me your web address. You&apos;ll get an honest, free review — and a fixed price if you&apos;d like to go ahead.
            </p>
            <Link href="/about?interest=redesign#contact" className="btn-primary mt-8">
              Get my free redesign review
            </Link>
          </div>
        </div>
      </ScrollReveal>
    </div>
  );
}
