import type { Metadata } from "next";
import { readContent } from "@/lib/store";
import ScrollReveal from "@/components/ScrollReveal";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How BisoDesign collects, uses and protects your personal data under UK GDPR.",
  alternates: { canonical: "/privacy" },
};

const UPDATED = "8 November 2026";

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="glass mt-6 rounded-2xl p-6 md:p-8">
      <h2 className="font-heading text-xl font-bold">{title}</h2>
      <div className="mt-3 space-y-3 text-sm leading-relaxed text-muted md:text-base [&_a]:text-flare-cyan [&_a]:underline [&_li]:ml-5 [&_li]:list-disc [&_strong]:text-ink">
        {children}
      </div>
    </section>
  );
}

export default async function PrivacyPage() {
  const content = await readContent();
  const email = content.contactEmail;

  return (
    <div className="mx-auto max-w-3xl px-6 py-24">
      <ScrollReveal>
        <p className="hud-label">Legal</p>
        <h1 className="mt-4 font-heading text-4xl font-extrabold md:text-5xl">Privacy Policy</h1>
        <p className="mt-4 text-muted">
          Last updated: {UPDATED}. This policy explains what personal data {content.brand} collects
          through this website, why, and the rights you have under UK data protection law (UK GDPR
          and the Data Protection Act 2018).
        </p>
      </ScrollReveal>

      <Section title="1. Who we are">
        <p>
          {content.brand} is a web design and automation studio. For any privacy question, or to
          exercise your rights, contact us at <a href={`mailto:${email}`}>{email}</a>. We are the
          data controller for the personal data described below.
        </p>
      </Section>

      <Section title="2. What we collect">
        <ul>
          <li>
            <strong>Contact form:</strong> your name, email address and the message you send.
          </li>
          <li>
            <strong>WhatsApp or email:</strong> if you contact us directly, the details and messages
            you choose to share.
          </li>
          <li>
            <strong>Website statistics:</strong> anonymous, aggregated visit data (pages viewed,
            referrer, country, device type) collected with Vercel Web Analytics. This uses no
            cookies and does not identify you.
          </li>
        </ul>
        <p>We do not sell your data, and we do not use it for advertising profiles.</p>
      </Section>

      <Section title="3. Why we use it (lawful basis)">
        <ul>
          <li>
            <strong>To reply to your enquiry and prepare a quote</strong> — steps taken at your
            request before entering into a contract, and our legitimate interest in responding to
            people who contact us.
          </li>
          <li>
            <strong>To deliver a project</strong> if you become a client — performance of a contract.
          </li>
          <li>
            <strong>To keep business and tax records</strong> — legal obligation.
          </li>
          <li>
            <strong>To understand how the website is used</strong> — legitimate interest, using
            anonymous statistics only.
          </li>
        </ul>
      </Section>

      <Section title="4. Who processes it for us">
        <p>
          We use trusted service providers to run this website and our business, who process data
          only on our instructions: website hosting and database (Vercel), email (Google), and —
          where used — spreadsheet storage for enquiries (Google Sheets). Some providers may store
          data outside the UK; where they do, they rely on approved safeguards such as the UK
          International Data Transfer Agreement or adequacy regulations.
        </p>
      </Section>

      <Section title="5. How long we keep it">
        <ul>
          <li>Enquiries that don&apos;t lead to a project: up to 24 months, then deleted.</li>
          <li>Client project and invoice records: up to 6 years, as required for UK tax purposes.</li>
        </ul>
      </Section>

      <Section title="6. Your rights">
        <p>You have the right to:</p>
        <ul>
          <li>access the personal data we hold about you;</li>
          <li>ask us to correct or delete it;</li>
          <li>object to or restrict how we use it;</li>
          <li>receive a copy of it in a portable format.</li>
        </ul>
        <p>
          Email <a href={`mailto:${email}`}>{email}</a> and we&apos;ll respond within one month. If
          you&apos;re unhappy with how we handle your data, you can complain to the Information
          Commissioner&apos;s Office at <a href="https://ico.org.uk" target="_blank" rel="noreferrer">ico.org.uk</a>.
        </p>
      </Section>

      <Section title="7. Cookies">
        <p>
          This website does not use advertising or tracking cookies. A single technical cookie is
          set only when the site owner logs into the private admin area. Website statistics are
          collected without cookies. If you click the WhatsApp button, WhatsApp&apos;s own privacy
          policy applies.
        </p>
      </Section>

      <Section title="8. Changes">
        <p>
          We may update this policy from time to time. The date at the top shows when it last
          changed.
        </p>
      </Section>
    </div>
  );
}
