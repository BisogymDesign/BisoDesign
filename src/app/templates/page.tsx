import type { Metadata } from "next";
import Link from "next/link";
import ScrollReveal from "@/components/ScrollReveal";
import SiteMockup from "@/components/SiteMockup";
import { templates } from "@/data/templates";

export const metadata: Metadata = {
  title: "Website Templates by Industry — See Your Future Website",
  description:
    "Visual website models for recovery companies, salons, trades, cleaners, restaurants, garages, personal trainers and local shops — with the psychology behind every section.",
  alternates: { canonical: "/templates" },
};

export default function TemplatesPage() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-24">
      <ScrollReveal>
        <p className="hud-label">Website templates</p>
        <h1 className="mt-4 max-w-4xl font-heading text-4xl font-extrabold leading-tight md:text-6xl">
          See your future website <span className="text-gradient">before we build it</span>.
        </h1>
        <p className="mt-6 max-w-2xl text-muted md:text-lg">
          Every industry has its own customer, with its own worries and its own reasons to say
          yes. These models show how a website can answer all of them — section by section. Pick
          the one closest to you; I&apos;ll shape it entirely around your business.
        </p>
      </ScrollReveal>

      <div className="mt-16 grid gap-8 md:grid-cols-2">
        {templates.map((t, i) => (
          <ScrollReveal key={t.slug} delay={(i % 2) * 0.08} className="h-full">
            <Link
              href={`/templates/${t.slug}`}
              className="glass neon group flex h-full flex-col rounded-3xl p-5 transition-transform duration-300 hover:-translate-y-1.5"
            >
              <div className="transition-transform duration-500 group-hover:scale-[1.015]">
                <SiteMockup template={t} />
              </div>
              <div className="mt-6 flex items-start justify-between gap-4 px-1">
                <div>
                  <p className="font-label text-[10px] uppercase tracking-[0.2em] text-flare-cyan/80">
                    {t.industry}
                  </p>
                  <h2 className="mt-1 font-heading text-xl font-bold">
                    {t.name} <span className="text-muted">· {t.brand}</span>
                  </h2>
                </div>
                <span className="chip whitespace-nowrap">From {t.priceFrom}</span>
              </div>
              <p className="mt-3 line-clamp-3 flex-1 px-1 text-sm text-muted">{t.summary}</p>
              <span className="mt-5 px-1 font-label text-xs uppercase tracking-[0.16em] text-flare-cyan">
                Explore this template →
              </span>
            </Link>
          </ScrollReveal>
        ))}
      </div>

      <ScrollReveal className="mt-24">
        <div className="glass neon neon-on hud rounded-3xl p-10 text-center">
          <p className="hud-label justify-center">Your industry isn&apos;t here?</p>
          <h2 className="mt-4 font-heading text-2xl font-bold md:text-3xl">
            Every site I build is designed from scratch for you.
          </h2>
          <p className="mx-auto mt-3 max-w-lg text-muted">
            These are starting points, not limits. Tell me about your customers and I&apos;ll
            show you what your site could look like.
          </p>
          <Link href="/about#contact" className="btn-primary mt-8">
            Tell me about your business
          </Link>
        </div>
      </ScrollReveal>
    </div>
  );
}
