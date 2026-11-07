import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import ScrollReveal from "@/components/ScrollReveal";
import SiteMockup from "@/components/SiteMockup";
import PrintButton from "@/components/PrintButton";
import { getTemplate, templates } from "@/data/templates";
import { solutions } from "@/data/solutions";
import { readContent } from "@/lib/store";
import { SITE_URL } from "@/lib/site";

type Params = { params: { slug: string } };

export function generateStaticParams() {
  return templates.map((t) => ({ slug: t.slug }));
}

export function generateMetadata({ params }: Params): Metadata {
  const t = getTemplate(params.slug);
  if (!t) return {};
  return {
    title: `${t.industry} Website Template — ${t.name}`,
    description: t.summary,
    alternates: { canonical: `/templates/${t.slug}` },
  };
}

export default async function TemplatePage({ params }: Params) {
  const t = getTemplate(params.slug);
  if (!t) notFound();
  const content = await readContent();
  const recommended = t.automations
    .map((slug) => solutions.find((s) => s.slug === slug))
    .filter((s): s is (typeof solutions)[number] => Boolean(s));
  const quoteHref = `/about?template=${t.slug}#contact`;
  const others = templates.filter((x) => x.slug !== t.slug).slice(0, 3);

  return (
    <article className="mx-auto max-w-6xl px-6 py-20 print:py-0">
      <Link
        href="/templates"
        className="no-print font-label text-xs uppercase tracking-[0.18em] text-muted hover:text-ink"
      >
        ← All templates
      </Link>

      <ScrollReveal className="mt-8">
        <div className="flex flex-wrap items-center gap-3">
          <span className="hud-label">Template · {t.name}</span>
          <span className="chip">{t.industry}</span>
        </div>
        <h1 className="mt-5 max-w-4xl font-heading text-4xl font-extrabold leading-[1.08] md:text-6xl">
          A website built for <span className="text-gradient">{t.industry.toLowerCase()}</span>
        </h1>
        <p className="mt-6 max-w-3xl text-lg text-muted">{t.summary}</p>
        <div className="no-print mt-10 flex flex-wrap gap-3">
          <Link href={quoteHref} className="btn-primary">
            Build me a site like this →
          </Link>
          <PrintButton label="Save as PDF" />
        </div>
      </ScrollReveal>

      {/* Mockups */}
      <section className="mt-14 grid items-end gap-8 lg:grid-cols-[1fr_260px]">
        <ScrollReveal className="print-break-avoid">
          <SiteMockup template={t} />
          <p className="mt-3 text-center font-label text-[10px] uppercase tracking-[0.2em] text-muted">
            Desktop · sample content
          </p>
        </ScrollReveal>
        <ScrollReveal delay={0.1} className="print-break-avoid">
          <SiteMockup template={t} variant="phone" />
          <p className="mt-3 text-center font-label text-[10px] uppercase tracking-[0.2em] text-muted">
            Mobile · sticky action bar
          </p>
        </ScrollReveal>
      </section>

      {/* Key facts */}
      <div className="mt-14 grid gap-4 sm:grid-cols-3">
        {[
          { k: "Recommended package", v: t.package },
          { k: "Starting price", v: t.priceFrom, accent: true },
          { k: "Typical timeline", v: t.timeline },
        ].map((f) => (
          <div key={f.k} className="glass neon hud print-break-avoid rounded-2xl p-6">
            <p className="font-label text-[10px] uppercase tracking-[0.2em] text-muted">{f.k}</p>
            <p className={`mt-2 font-heading font-bold ${f.accent ? "text-3xl text-gradient" : "text-xl"}`}>{f.v}</p>
          </div>
        ))}
      </div>

      {/* Anatomy */}
      <section className="mt-20">
        <ScrollReveal>
          <p className="hud-label">Anatomy of the page</p>
          <h2 className="mt-3 font-heading text-3xl font-bold md:text-4xl">
            Every section has a job — <span className="text-gradient">here&apos;s why it works</span>
          </h2>
        </ScrollReveal>
        <ol className="mt-10 space-y-4">
          {t.anatomy.map((a, i) => (
            <ScrollReveal key={a.section} delay={i * 0.05}>
              <li className="glass neon print-break-avoid grid gap-4 rounded-2xl p-6 md:grid-cols-[auto_1fr_2fr] md:items-center md:gap-8">
                <span className="flex h-12 w-12 items-center justify-center rounded-full border border-flare-cyan/50 font-heading text-sm font-bold text-flare-cyan shadow-[0_0_24px_-6px_rgba(34,211,238,0.7)]">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <p className="font-heading text-lg font-bold">{a.section}</p>
                <p className="text-sm text-muted md:text-base">
                  <span className="font-label text-[10px] uppercase tracking-[0.2em] text-flare-orange">
                    Why it works ·{" "}
                  </span>
                  {a.why}
                </p>
              </li>
            </ScrollReveal>
          ))}
        </ol>
      </section>

      {/* Features + automations */}
      <section className="mt-20 grid gap-6 lg:grid-cols-[1fr_1.4fr]">
        <ScrollReveal>
          <div className="glass neon print-break-avoid h-full rounded-2xl p-8">
            <p className="hud-label">Built in</p>
            <ul className="mt-6 space-y-3">
              {t.features.map((f) => (
                <li key={f} className="flex items-start gap-3 text-sm text-ink/90">
                  <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-flare-cyan shadow-[0_0_8px_#22d3ee]" />
                  {f}
                </li>
              ))}
            </ul>
          </div>
        </ScrollReveal>
        <ScrollReveal delay={0.08}>
          <div className="glass neon print-break-avoid h-full rounded-2xl p-8">
            <p className="hud-label">Recommended automations</p>
            <p className="mt-3 text-sm text-muted">
              The website brings customers in. These make sure none of them slip away.
            </p>
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {recommended.map((s) => (
                <Link
                  key={s.slug}
                  href={`/solutions/${s.slug}`}
                  className="group rounded-xl border border-white/10 bg-white/[0.02] p-4 transition-colors hover:border-flare-cyan/50"
                >
                  <p className="font-label text-[10px] tracking-[0.2em] text-flare-cyan/80">{s.code}</p>
                  <p className="mt-1 text-sm font-bold">{s.title}</p>
                  <p className="mt-1 text-xs text-muted">From {s.priceFrom} →</p>
                </Link>
              ))}
            </div>
          </div>
        </ScrollReveal>
      </section>

      <ScrollReveal className="no-print mt-20">
        <div className="glass neon neon-on hud rounded-3xl p-10 text-center">
          <p className="hud-label justify-center">Your version</p>
          <h2 className="mt-4 font-heading text-2xl font-bold md:text-3xl">
            Imagine this with your name, your photos, your customers.
          </h2>
          <p className="mx-auto mt-3 max-w-lg text-muted">
            Tell me a little about your business. I&apos;ll come back with ideas tailored to you
            and a fixed price — no pressure, no obligation.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link href={quoteHref} className="btn-primary">
              Start my website
            </Link>
            <PrintButton label="Download this template" />
          </div>
        </div>
      </ScrollReveal>

      <div className="mt-10 hidden border-t border-black/20 pt-4 text-sm print:block">
        <strong>{content.brand}</strong> · {SITE_URL.replace("https://", "")} · {content.contactEmail}
        {content.whatsappNumber ? ` · WhatsApp ${content.whatsappNumber}` : ""}
        <br />
        Mockup shows sample content. Every website is designed and written specifically for your business.
      </div>

      <section className="no-print mt-24">
        <ScrollReveal>
          <p className="hud-label">More templates</p>
        </ScrollReveal>
        <div className="mt-6 grid gap-6 md:grid-cols-3">
          {others.map((o, i) => (
            <ScrollReveal key={o.slug} delay={i * 0.06} className="h-full">
              <Link
                href={`/templates/${o.slug}`}
                className="glass neon group flex h-full flex-col rounded-2xl p-4 transition-transform hover:-translate-y-1"
              >
                <SiteMockup template={o} />
                <p className="mt-4 font-heading font-bold">{o.name}</p>
                <p className="text-xs text-muted">{o.industry}</p>
              </Link>
            </ScrollReveal>
          ))}
        </div>
      </section>
    </article>
  );
}
