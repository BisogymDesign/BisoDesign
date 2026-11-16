import type { Metadata } from "next";
import Link from "next/link";
import { SITE_URL } from "@/lib/site";
import { solutions } from "@/data/solutions";
import { carePlans } from "@/data/care";
import type { PricingPackage } from "@/types/content";
import ScrollReveal from "@/components/ScrollReveal";
import PricingCard from "@/components/PricingCard";
import FaqAccordion from "@/components/FaqAccordion";
import BeforeAfter from "@/components/BeforeAfter";

export const metadata: Metadata = {
  title: "Website Redesign Services UK — Bespoke, Hand-Coded Redesigns",
  description:
    "Bespoke website redesign services for UK businesses: exactly what's included and clear fixed prices from £395. A faster, modern site that wins more enquiries — while protecting the Google rankings you've already earned.",
  alternates: { canonical: "/website-redesign" },
};

/** Redesign packages — prices match the rest of the site (redesign guide £395, Ignite £1,095, Nova £2,095). */
const PACKAGES: PricingPackage[] = [
  {
    id: "rd-refresh",
    name: "Refresh",
    price: "£395",
    priceNote: "from",
    tagline: "For small sites that need a modern look, real speed and a clear path to contact you.",
    features: [
      "Up to 5 pages redesigned & rebuilt in clean code",
      "Your existing content moved across and tidied up",
      "Mobile-first design with click-to-call & WhatsApp",
      "301 redirects + SEO basics so rankings are kept",
      "Before/after speed comparison",
      "Around 2 weeks",
    ],
    highlighted: false,
  },
  {
    id: "rd-grow",
    name: "Grow",
    price: "£1,095",
    priceNote: "from",
    tagline: "For businesses ready to turn their website into a steady source of enquiries.",
    features: [
      "Up to 10 pages, fully redesigned",
      "Copy rewritten to win enquiries",
      "Enquiries sent straight to your WhatsApp or email",
      "Online booking or quote request form",
      "Reviews section + local SEO pages",
      "3–4 weeks",
    ],
    highlighted: true,
  },
  {
    id: "rd-transform",
    name: "Transform",
    price: "£2,095",
    priceNote: "from",
    tagline: "For moving up to an online shop, a platform or custom features.",
    features: [
      "Fully custom design + interactive elements",
      "E-commerce, payments or a custom admin panel",
      "Custom automations (CRM, invoices, follow-ups)",
      "Full SEO migration for larger sites",
      "Priority support during the build",
      "5–8 weeks",
    ],
    highlighted: false,
  },
];

/** Everything a redesign can cover, grouped the way clients think about it. */
const CAPABILITIES = [
  {
    icon: "🎨",
    title: "Design & content",
    items: [
      "A modern design that matches the quality of your work",
      "Layouts built for phones first",
      "Copy rewritten so visitors understand you in seconds",
      "Your brand colours, logo and photos used properly",
      "Clear trust sections: reviews, accreditations, guarantees",
    ],
  },
  {
    icon: "⚡",
    title: "Speed & technology",
    items: [
      "Rebuilt in clean, hand-written code — fast on any phone",
      "Move off Wix, Squarespace or WordPress, with no monthly builder fees",
      "Hosting, SSL and domain switch-over handled",
      "Your email stays exactly where it is",
      "You own the code — no lock-in",
    ],
  },
  {
    icon: "🔍",
    title: "Google & SEO",
    items: [
      "Every old address redirected (301) — no broken links",
      "Content that already ranks kept and improved",
      "Titles, descriptions and structured data rebuilt",
      "Sitemap submitted to Google Search Console",
      "Local pages for the areas you cover",
    ],
  },
  {
    icon: "📞",
    title: "More enquiries",
    items: [
      "Click-to-call and WhatsApp buttons on every page",
      "Quote and contact forms that actually get answered",
      "Online booking, quote calculators and payments",
      "Enquiries sent straight to your phone",
      "Automatic review requests after each job",
    ],
  },
];

/** Optional extras, priced from the solution guides so every price on the site stays in sync. */
const ADD_ON_SLUGS = [
  "instant-enquiry-alerts",
  "review-requests",
  "gps-callout-button",
  "email-follow-ups",
  "local-seo",
  "online-booking",
  "payment-links-invoices",
  "instant-quote-calculator",
  "lead-tracker-crm",
  "ai-website-assistant",
  "custom-admin-dashboard",
];
const ADD_ONS = ADD_ON_SLUGS.map((slug) => solutions.find((s) => s.slug === slug)).filter((s): s is NonNullable<typeof s> => Boolean(s));

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
      "Redesigns start from £395 for a small site of up to 5 pages, from £1,095 with copywriting, automations and booking, and from £2,095 for e-commerce, platforms or custom features. Extras like online booking or review requests have their own fixed prices, and you get the exact total in writing before anything starts.",
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

export default function WebsiteRedesignPage() {
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
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Website redesign packages",
        itemListElement: PACKAGES.map((p) => ({
          "@type": "Offer",
          name: `${p.name} redesign`,
          description: p.tagline,
          priceSpecification: { "@type": "PriceSpecification", minPrice: Number(p.price.replace(/[^\d]/g, "")), priceCurrency: "GBP" },
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
          <p className="mt-5 font-label text-xs uppercase tracking-[0.16em] text-muted">Fixed price from £395 · No monthly builder fees · You own it</p>
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

      {/* Exactly what's possible */}
      <ScrollReveal className="mt-28">
        <p className="hud-label">Exactly what I can do</p>
        <h2 className="mt-3 font-heading text-3xl font-bold md:text-4xl">Everything a redesign can cover</h2>
        <p className="mt-4 max-w-2xl text-muted">
          Pick what your business needs — your free review will tell you honestly which of these will make the biggest
          difference.
        </p>
      </ScrollReveal>
      <div className="mt-10 grid gap-5 md:grid-cols-2">
        {CAPABILITIES.map((c, i) => (
          <ScrollReveal key={c.title} delay={(i % 2) * 0.06} className="h-full">
            <div className="glass neon h-full rounded-2xl p-7">
              <p className="flex items-center gap-3 font-heading text-xl font-bold">
                <span className="text-2xl">{c.icon}</span>
                {c.title}
              </p>
              <ul className="mt-5 space-y-3">
                {c.items.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm text-ink/90">
                    <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-flare-cyan shadow-[0_0_8px_#22d3ee]" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </ScrollReveal>
        ))}
      </div>

      {/* Price list */}
      <div id="prices" className="scroll-mt-28">
        <ScrollReveal className="mt-28">
          <p className="hud-label">Redesign prices</p>
          <h2 className="mt-3 font-heading text-3xl font-bold md:text-4xl">Fixed prices, agreed before we start</h2>
          <p className="mt-4 max-w-2xl text-muted">
            Three clear starting points. After your free review you get the exact total in writing — no hourly billing, no
            surprises.
          </p>
        </ScrollReveal>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {PACKAGES.map((pkg, i) => (
            <ScrollReveal key={pkg.id} delay={i * 0.08} className="h-full">
              <PricingCard pkg={pkg} href="/about?interest=redesign#contact" cta={`Start with ${pkg.name}`} />
            </ScrollReveal>
          ))}
        </div>

        {/* Add-ons */}
        <ScrollReveal className="mt-16">
          <div className="glass neon rounded-3xl p-6 md:p-10">
            <p className="hud-label">Optional extras</p>
            <h3 className="mt-3 font-heading text-2xl font-bold">Add exactly what you need</h3>
            <p className="mt-2 text-sm text-muted">Each extra has a fixed starting price and its own detailed guide.</p>
            <div className="mt-6 divide-y divide-white/5">
              {ADD_ONS.map((s) => (
                <Link key={s.slug} href={`/solutions/${s.slug}`} className="group flex items-center justify-between gap-4 py-3.5">
                  <span>
                    <span className="block font-heading text-sm font-bold transition-colors group-hover:text-flare-cyan md:text-base">{s.title}</span>
                    <span className="block text-xs text-muted md:text-sm">{s.tagline.split(/(?<=[.!?])\s/)[0]}</span>
                  </span>
                  <span className="whitespace-nowrap font-label text-sm font-bold text-gradient">from {s.priceFrom}</span>
                </Link>
              ))}
            </div>
          </div>
        </ScrollReveal>

        {/* Care */}
        <ScrollReveal className="mt-6">
          <Link href="/website-care-plans" className="glass neon group flex flex-col items-start justify-between gap-4 rounded-2xl p-6 md:flex-row md:items-center">
            <div>
              <p className="hud-label">After launch</p>
              <p className="mt-2 font-heading text-lg font-bold">
                Keep it looked after: {carePlans.map((p) => `${p.name} £${p.monthly}`).join(" · ")} a month
              </p>
            </div>
            <span className="btn-ghost whitespace-nowrap">Care plans →</span>
          </Link>
        </ScrollReveal>
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
          <Link href="/catalog" className="glass neon group block h-full rounded-2xl p-8">
            <p className="hud-label">Need ideas?</p>
            <h3 className="mt-3 font-heading text-xl font-bold">Flip through the catalogue</h3>
            <p className="mt-2 text-sm text-muted">Nine website designs for different businesses, product pages with 360° views, platforms and apps.</p>
            <span className="mt-5 inline-block font-label text-xs uppercase tracking-[0.16em] text-flare-cyan">Open the catalogue →</span>
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
