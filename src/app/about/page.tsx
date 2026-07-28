import { readContent } from "@/lib/store";
import ScrollReveal from "@/components/ScrollReveal";
import ContactForm from "@/components/ContactForm";

export default async function AboutPage() {
  const content = await readContent();

  return (
    <div className="mx-auto max-w-6xl px-6 py-24">
      <div className="grid gap-16 md:grid-cols-2">
        <ScrollReveal>
          <p className="font-label text-sm uppercase tracking-[0.2em] text-flare-orange">
            About
          </p>
          <h1 className="mt-2 font-heading text-4xl font-extrabold leading-tight md:text-5xl">
            {content.aboutTitle}
          </h1>
          <p className="mt-6 text-muted">{content.aboutText}</p>

          <div className="mt-10 space-y-2">
            <a
              href={`mailto:${content.contactEmail}`}
              className="block font-label text-lg font-semibold text-gradient"
            >
              {content.contactEmail}
            </a>
            {content.whatsappNumber && (
              <a
                href={`https://wa.me/${content.whatsappNumber.replace(/[^\d]/g, "")}${
                  content.whatsappMessage
                    ? `?text=${encodeURIComponent(content.whatsappMessage)}`
                    : ""
                }`}
                target="_blank"
                rel="noreferrer"
                className="block text-sm text-muted hover:text-ink"
              >
                WhatsApp: {content.whatsappNumber}
              </a>
            )}
            <div className="flex gap-4 text-sm text-muted">
              {content.socialLinks.map((link) => (
                <a key={link.label} href={link.url} target="_blank" rel="noreferrer" className="hover:text-ink">
                  {link.label}
                </a>
              ))}
            </div>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <div className="rounded-2xl border border-white/10 bg-surface p-8">
            <h2 className="font-heading text-xl font-bold">Start a project</h2>
            <p className="mt-2 text-sm text-muted">
              Tell me a bit about what you need — I'll reply with next steps and, if it's a fit,
              a more specific quote. Prefer WhatsApp? Use the button in the corner, or the link
              on the left.
            </p>
            <div className="mt-6">
              <ContactForm />
            </div>
          </div>
        </ScrollReveal>
      </div>
    </div>
  );
}
