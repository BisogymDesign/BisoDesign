import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import ScrollReveal from "@/components/ScrollReveal";
import PrintButton from "@/components/PrintButton";
import { getSolution, solutions } from "@/data/solutions";
import { readContent } from "@/lib/store";
import { SITE_URL } from "@/lib/site";

type Params = { params: { slug: string } };

export function generateStaticParams() {
  return solutions.map((s) => ({ slug: s.slug }));
}

export function generateMetadata({ params }: Params): Metadata {
  const s = getSolution(params.slug);
  if (!s) return {};
  return {
    title: `${s.title} — from ${s.priceFrom}`,
    description: s.tagline,
    alternates: { canonical: `/solutions/${s.slug}` },
    openGraph: { title: `${s.title} | BisoDesign`, description: s.tagline },
  };
}

function SectionTitle({ index, children }: { index: string; children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-4">
      <span className="font-label text-xs tracking-[0.2em] text-flare-cyan/80">{index}</span>
      <h2 className="font-heading text-2xl font-bold md:text-3xl">{children}</h2>
      <span className="h-px flex-1 bg-gradient-to-r from-white/15 to-transparent" />
    </div>
  );
}

export default async function SolutionPage({ params }: Params) {
  const s = getSolution(params.slug);
  if (!s) notFound();

  const content = await readContent();
  const related = solutions
    .filter((x) => x.slug !== s.slug && x.category === s.category)
    .slice(0, 3);
  const quoteHref = `/about?topic=${s.slug}#contact`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: s.title,
    description: s.tagline,
    serviceType: s.category,
    url: `${SITE_URL}/solutions/${s.slug}`,
    areaServed: { "@type": "Country", name: "United Kingdom" },
    provider: { "@type": "ProfessionalService", name: content.brand, url: SITE_URL },
  };

  return (
    <article className="mx-auto max-w-6xl px-6 py-20 print:py-0">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />

      <Link
        href="/solutions"
        className="no-print font-label text-xs uppercase tracking-[0.18em] text-muted hover:text-ink"
      >
        ← All solutions
      </Link>

      {/* ── Header ── */}
      <ScrollReveal className="mt-8">
        <div className="flex flex-wrap items-center gap-3">
          <span className="hud-label">{s.code}</span>
          <span className="chip">{s.category}</span>
          <span className="hidden font-label text-xs text-muted print:inline">
            {content.brand} · Solution guide
          </span>
        </div>
        <h1 className="mt-5 max-w-4xl font-heading text-4xl font-extrabold leading-[1.08] md:text-6xl">
          {s.title}
        </h1>
        <p className="mt-6 max-w-2xl text-lg text-muted">{s.tagline}</p>
        <div className="no-print mt-10 flex flex-wrap gap-3">
          <Link href={quoteHref} className="btn-primary">
            I want this →
          </Link>
          <PrintButton />
        </div>
      </ScrollReveal>

      {/* ── Key facts ── */}
      <div className="mt-14 grid gap-4 sm:grid-cols-3">
        {[
          { k: "Starting price", v: s.priceFrom, accent: true },
          { k: "Typical timeline", v: s.timeline },
          { k: "Ideal for", v: s.idealFor.slice(0, 2).join(" · ") },
        ].map((f, i) => (
          <ScrollReveal key={f.k} delay={i * 0.06} className="h-full">
            <div className="glass neon hud print-break-avoid h-full rounded-2xl p-6">
              <p className="font-label text-[10px] uppercase tracking-[0.2em] text-muted">{f.k}</p>
              <p
                className={`mt-2 font-heading font-bold ${
                  f.accent ? "text-3xl text-gradient" : "text-base leading-snug"
                }`}
              >
                {f.v}
              </p>
            </div>
          </ScrollReveal>
        ))}
      </div>
      {s.ongoing && (
        <p className="mt-3 font-label text-xs text-muted">
          <span className="text-flare-cyan">●</span> Ongoing costs: {s.ongoing}
        </p>
      )}

      {/* ── Problem / outcomes ── */}
      <section className="mt-20 grid gap-6 lg:grid-cols-5">
        <ScrollReveal className="lg:col-span-2">
          <div className="glass print-break-avoid h-full rounded-2xl border-l-2 !border-l-flare-orange p-8">
            <p className="font-label text-xs uppercase tracking-[0.2em] text-flare-orange">
              The problem
            </p>
            <p className="mt-4 text-lg leading-relaxed text-ink/90">{s.problem}</p>
          </div>
        </ScrollReveal>
        <ScrollReveal delay={0.08} className="lg:col-span-3">
          <div className="glass neon print-break-avoid h-full rounded-2xl p-8">
            <p className="font-label text-xs uppercase tracking-[0.2em] text-flare-cyan">
              What changes for you
            </p>
            <ul className="mt-5 space-y-4">
              {s.outcomes.map((o) => (
                <li key={o} className="flex gap-3 text-ink/90">
                  <span className="mt-1 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full border border-flare-cyan/50 text-[11px] text-flare-cyan">
                    ✓
                  </span>
                  {o}
                </li>
              ))}
            </ul>
          </div>
        </ScrollReveal>
      </section>

      {/* ── How it works (pipeline) ── */}
      <section className="mt-20">
        <ScrollReveal>
          <SectionTitle index="01">How it works</SectionTitle>
        </ScrollReveal>
        <ol className="relative mt-10 grid gap-6 lg:grid-cols-4">
          <span
            aria-hidden
            className="absolute left-[23px] top-0 h-full w-px bg-gradient-to-b from-flare-orange via-flare-violet to-flare-cyan opacity-50 lg:left-0 lg:top-[23px] lg:h-px lg:w-full lg:bg-gradient-to-r"
          />
          {s.howItWorks.map((step, i) => (
            <ScrollReveal key={step.title} delay={i * 0.08}>
              <li className="print-break-avoid relative flex gap-5 lg:block">
                <span className="relative z-10 flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full border border-flare-cyan/50 bg-night font-heading text-sm font-bold text-flare-cyan shadow-[0_0_24px_-4px_rgba(34,211,238,0.6)]">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div className="lg:mt-5">
                  <h3 className="font-heading text-base font-bold">{step.title}</h3>
                  <p className="mt-1.5 text-sm text-muted">{step.text}</p>
                </div>
              </li>
            </ScrollReveal>
          ))}
        </ol>
      </section>

      {/* ── Included / stack ── */}
      <section className="mt-20 grid gap-6 lg:grid-cols-2">
        <ScrollReveal>
          <div className="glass neon print-break-avoid h-full rounded-2xl p-8">
            <SectionTitle index="02">What&apos;s included</SectionTitle>
            <ul className="mt-6 grid gap-3">
              {s.included.map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm text-ink/90">
                  <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-flare-cyan shadow-[0_0_8px_#22d3ee]" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </ScrollReveal>
        <ScrollReveal delay={0.08}>
          <div className="glass neon print-break-avoid h-full rounded-2xl p-8">
            <SectionTitle index="03">Who it&apos;s for</SectionTitle>
            <div className="mt-6 flex flex-wrap gap-2">
              {s.idealFor.map((x) => (
                <span key={x} className="chip !text-ink/90">
                  {x}
                </span>
              ))}
            </div>
            <p className="mt-8 font-label text-[10px] uppercase tracking-[0.2em] text-muted">
              Built with
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              {s.tools.map((t) => (
                <span key={t} className="chip !border-flare-violet/30 !text-violet-300">
                  {t}
                </span>
              ))}
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* ── Example ── */}
      <ScrollReveal className="mt-20">
        <div className="glass hud print-break-avoid relative overflow-hidden rounded-2xl p-8 md:p-10">
          <div className="ambient-grid absolute inset-0 opacity-50" aria-hidden />
          <div className="relative">
            <p className="hud-label">Example scenario</p>
            <p className="mt-4 max-w-3xl font-heading text-xl font-semibold leading-relaxed md:text-2xl">
              {s.example}
            </p>
          </div>
        </div>
      </ScrollReveal>

      {/* ── FAQ ── */}
      {s.faq.length > 0 && (
        <section className="mt-20">
          <ScrollReveal>
            <SectionTitle index="04">Questions</SectionTitle>
          </ScrollReveal>
          <dl className="mt-8 grid gap-4 md:grid-cols-2">
            {s.faq.map((f) => (
              <ScrollReveal key={f.q}>
                <div className="glass print-break-avoid h-full rounded-2xl p-6">
                  <dt className="font-heading font-bold">{f.q}</dt>
                  <dd className="mt-2 text-sm text-muted">{f.a}</dd>
                </div>
              </ScrollReveal>
            ))}
          </dl>
        </section>
      )}

      {/* ── CTA ── */}
      <ScrollReveal className="no-print mt-20">
        <div className="glass neon neon-on hud rounded-2xl p-10 text-center">
          <p className="hud-label justify-center">Next step</p>
          <h2 className="mt-4 font-heading text-2xl font-bold md:text-3xl">
            Want this for your business?
          </h2>
          <p className="mx-auto mt-3 max-w-md text-muted">
            Send a short message — I&apos;ll reply with how it would work for you and a fixed
            quote. No obligation.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link href={quoteHref} className="btn-primary">
              Get a free quote
            </Link>
            <PrintButton label="Download this guide" />
          </div>
        </div>
      </ScrollReveal>

      {/* Contact block shown only on the printed / PDF version */}
      <div className="mt-10 hidden border-t border-black/20 pt-4 text-sm print:block">
        <strong>{content.brand}</strong> · {SITE_URL.replace("https://", "")} · {content.contactEmail}
        {content.whatsappNumber ? ` · WhatsApp ${content.whatsappNumber}` : ""}
        <br />
        Prices are starting points; you get a fixed quote before any work begins.
      </div>

      {related.length > 0 && (
        <section className="no-print mt-24">
          <ScrollReveal>
            <SectionTitle index="++">Related solutions</SectionTitle>
          </ScrollReveal>
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {related.map((r, i) => (
              <ScrollReveal key={r.slug} delay={i * 0.08} className="h-full">
                <Link
                  href={`/solutions/${r.slug}`}
                  className="glass neon group flex h-full flex-col rounded-2xl p-6 transition-transform hover:-translate-y-1"
                >
                  <span className="font-label text-xs tracking-[0.2em] text-flare-cyan/80">{r.code}</span>
                  <h3 className="mt-3 font-heading font-bold">{r.title}</h3>
                  <p className="mt-2 flex-1 text-sm text-muted">{r.tagline}</p>
                  <span className="mt-4 font-label text-xs uppercase tracking-[0.16em] text-flare-cyan">
                    From {r.priceFrom} →
                  </span>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </section>
      )}
    </article>
  );
}
