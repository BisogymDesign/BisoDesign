import { readContent } from "@/lib/store";
import ScrollReveal from "@/components/ScrollReveal";
import ServiceCard from "@/components/ServiceCard";
import Link from "next/link";

export default async function ServicesPage() {
  const content = await readContent();

  return (
    <div className="mx-auto max-w-6xl px-6 py-24">
      <ScrollReveal>
        <p className="font-label text-sm uppercase tracking-[0.2em] text-flare-orange">
          What I do
        </p>
        <h1 className="mt-2 max-w-2xl font-heading text-4xl font-extrabold leading-tight md:text-5xl">
          Design, development, and everything in between.
        </h1>
        <p className="mt-6 max-w-xl text-muted">
          If it's related to design — building something new, fixing something broken, or
          improving something that already exists — chances are we can figure it out together.
        </p>
      </ScrollReveal>

      <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {content.services.map((service, i) => (
          <ScrollReveal key={service.id} delay={i * 0.08}>
            <ServiceCard service={service} index={i} />
          </ScrollReveal>
        ))}
      </div>

      <ScrollReveal className="mt-20">
        <div className="rounded-2xl border border-white/10 bg-flare-radial p-10 text-center">
          <h2 className="font-heading text-2xl font-bold">Not sure what you need yet?</h2>
          <p className="mx-auto mt-3 max-w-md text-muted">
            That's fine — most projects start with a conversation, not a spec sheet.
          </p>
          <Link
            href="/about"
            className="mt-6 inline-block rounded-full bg-flare-gradient px-7 py-3 font-label text-sm font-semibold text-night shadow-glow transition-transform hover:-translate-y-0.5"
          >
            Let's talk
          </Link>
        </div>
      </ScrollReveal>
    </div>
  );
}
