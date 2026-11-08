import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import ScrollReveal from "@/components/ScrollReveal";
import Icon, { type IconName } from "@/components/Icon";

export const metadata: Metadata = {
  title: "Case Study — Sayah Recovery (Vehicle & HGV Recovery, North London)",
  description:
    "How BisoDesign built a hand-coded website for Sayah Recovery: SOS call buttons, one-tap WhatsApp GPS location sharing, a moderated review system and local SEO.",
  alternates: { canonical: "/work/sayah-recovery" },
};

const FEATURES: { icon: IconName; title: string; text: string }[] = [
  {
    icon: "phone",
    title: "Two SOS call buttons",
    text: "Big, always-visible buttons for both emergency lines, so a stranded driver can call in one tap from any page.",
  },
  {
    icon: "pin",
    title: "One-tap GPS location",
    text: "A “Share Location” button opens WhatsApp with the driver's exact coordinates and a Google Maps link — no more guessing where they are.",
  },
  {
    icon: "star",
    title: "Moderated reviews",
    text: "Customers leave reviews on the site; the owner approves them from a private, password-protected admin panel before they go live.",
  },
  {
    icon: "form",
    title: "Quote request form",
    text: "A clear form for non-emergency jobs, delivered straight to the owner's inbox.",
  },
  {
    icon: "search",
    title: "Built for local search",
    text: "Schema.org business data, a sitemap and coverage-area content so Google understands where and what Sayah Recovery covers.",
  },
  {
    icon: "zap",
    title: "Fast & mobile-first",
    text: "Hand-coded with no page builder, so it loads quickly on a phone at the roadside — exactly where it's used most.",
  },
];

const STACK = ["HTML5", "CSS3", "JavaScript", "Firebase Firestore", "Firebase Auth", "Formspree", "Netlify", "Custom domain + HTTPS"];

export default function SayahCaseStudy() {
  return (
    <article className="mx-auto max-w-6xl px-6 py-20">
      <Link href="/#portfolio" className="font-label text-xs uppercase tracking-[0.18em] text-muted hover:text-ink">
        ← Portfolio
      </Link>

      <ScrollReveal className="mt-8">
        <div className="flex flex-wrap items-center gap-3">
          <span className="hud-label">Case study · client project</span>
          <span className="chip">Vehicle & HGV recovery · North London</span>
        </div>
        <h1 className="mt-5 max-w-4xl font-heading text-4xl font-extrabold leading-[1.08] md:text-6xl">
          Sayah Recovery: <span className="text-gradient">help in one tap</span>, day or night.
        </h1>
        <p className="mt-6 max-w-3xl text-lg text-muted">
          A recovery company&apos;s customers find them at the worst moment — broken down, stressed,
          often on a motorway in the dark. The website had one job: make getting help effortless.
        </p>
        <div className="mt-10 flex flex-wrap gap-3">
          <a href="https://sayahrecovery.co.uk/" target="_blank" rel="noreferrer" className="btn-primary">
            Visit the live site ↗
          </a>
          <Link href="/about?template=vehicle-recovery#contact" className="btn-ghost">
            I want a site like this
          </Link>
        </div>
      </ScrollReveal>

      {/* Screens */}
      <section className="mt-14 grid items-end gap-8 lg:grid-cols-[1fr_300px]">
        <ScrollReveal>
          <div className="glass neon overflow-hidden rounded-2xl p-3">
            <div className="flex items-center gap-1.5 px-2 pb-2">
              <span className="h-2 w-2 rounded-full bg-[#ff5f57]" />
              <span className="h-2 w-2 rounded-full bg-[#febc2e]" />
              <span className="h-2 w-2 rounded-full bg-[#28c840]" />
              <span className="ml-3 truncate rounded-md bg-white/5 px-2 py-0.5 font-label text-[10px] text-white/50">
                🔒 sayahrecovery.co.uk
              </span>
            </div>
            <Image
              src="/work/sayah-desktop.jpg"
              alt="Sayah Recovery website on desktop: headline, SOS call buttons and Share Location button"
              width={1440}
              height={900}
              className="w-full rounded-xl"
              priority
            />
          </div>
        </ScrollReveal>
        <ScrollReveal delay={0.1}>
          <div className="mx-auto w-full max-w-[300px] rounded-[2.2rem] border border-white/15 bg-[#0b0a10] p-2.5 shadow-[0_30px_80px_-30px_rgba(139,92,246,0.6)]">
            <Image
              src="/work/sayah-mobile.jpg"
              alt="Sayah Recovery website on a phone with WhatsApp and two SOS call buttons"
              width={780}
              height={1688}
              className="w-full rounded-[1.8rem]"
            />
          </div>
        </ScrollReveal>
      </section>

      {/* Brief */}
      <section className="mt-20 grid gap-6 lg:grid-cols-2">
        <ScrollReveal>
          <div className="glass h-full rounded-2xl border-l-2 !border-l-flare-orange p-8">
            <p className="font-label text-xs uppercase tracking-[0.2em] text-flare-orange">The challenge</p>
            <p className="mt-4 text-lg leading-relaxed text-ink/90">
              Drivers in trouble don&apos;t read websites — they scan for a phone number. Many can&apos;t
              say exactly where they are. And a new customer choosing between recovery firms at 2am
              needs to trust them instantly.
            </p>
          </div>
        </ScrollReveal>
        <ScrollReveal delay={0.08}>
          <div className="glass neon h-full rounded-2xl p-8">
            <p className="font-label text-xs uppercase tracking-[0.2em] text-flare-cyan">The approach</p>
            <ul className="mt-5 space-y-3 text-ink/90">
              <li>✓ Emergency actions first: call or share location, on every screen</li>
              <li>✓ Remove the hardest question — “where are you?” — with GPS</li>
              <li>✓ Build trust with real, moderated customer reviews</li>
              <li>✓ Make it fast on a phone with a weak signal</li>
            </ul>
          </div>
        </ScrollReveal>
      </section>

      {/* Features */}
      <section className="mt-20">
        <ScrollReveal>
          <p className="hud-label">What I built</p>
          <h2 className="mt-3 font-heading text-3xl font-bold md:text-4xl">Every feature has one job: get help moving.</h2>
        </ScrollReveal>
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((f, i) => (
            <ScrollReveal key={f.title} delay={(i % 3) * 0.06} className="h-full">
              <div className="glass neon hud h-full rounded-2xl p-6">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-flare-cyan/40 text-flare-cyan">
                  <Icon name={f.icon} size={20} />
                </span>
                <p className="mt-4 font-heading text-lg font-bold">{f.title}</p>
                <p className="mt-2 text-sm text-muted">{f.text}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* Stack */}
      <ScrollReveal className="mt-16">
        <div className="glass rounded-2xl p-8">
          <p className="hud-label">Built with</p>
          <div className="mt-4 flex flex-wrap gap-2">
            {STACK.map((s) => (
              <span key={s} className="chip !border-flare-violet/30 !text-violet-300">
                {s}
              </span>
            ))}
          </div>
        </div>
      </ScrollReveal>

      {/* CTA */}
      <ScrollReveal className="mt-20">
        <div className="glass neon neon-on hud rounded-3xl p-10 text-center">
          <p className="hud-label justify-center">Your business next?</p>
          <h2 className="mt-4 font-heading text-2xl font-bold md:text-3xl">
            Want a website that makes it this easy for your customers?
          </h2>
          <p className="mx-auto mt-3 max-w-lg text-muted">
            Tell me about your business — I&apos;ll show you what would work for your customers and
            give you a fixed price. No obligation.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link href="/about#contact" className="btn-primary">
              Get a free quote
            </Link>
            <Link href="/templates/vehicle-recovery" className="btn-ghost">
              See the recovery template
            </Link>
          </div>
        </div>
      </ScrollReveal>
    </article>
  );
}
