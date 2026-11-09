import type { Metadata } from "next";
import Link from "next/link";
import { readContent } from "@/lib/store";
import { SITE_URL } from "@/lib/site";
import FlipBook from "@/components/catalog/FlipBook";
import { buildCatalogPages } from "@/components/catalog/book";

export const metadata: Metadata = {
  title: "The Catalogue — Online Shops, Company Websites, Platforms & Fleet Apps",
  description:
    "Flip through what BisoDesign can build: online shops with 360° product pages, websites for every kind of business, booking platforms, and fleet & driver apps with live GPS location.",
  alternates: { canonical: "/catalog" },
};

export default async function CatalogPage() {
  const content = await readContent();
  const digits = content.whatsappNumber.replace(/[^\d]/g, "");
  const whatsappHref = `https://wa.me/${digits}?text=${encodeURIComponent("Hi! I saw your catalogue and I'd like to talk about a project.")}`;
  const pages = buildCatalogPages({
    steps: content.processSteps,
    whatsappHref,
    email: content.contactEmail,
  });

  // Structured data: tells Google this page is a catalogue of the services offered
  const offer = (name: string, description: string, minPrice?: number) => ({
    "@type": "Offer",
    itemOffered: { "@type": "Service", name, description, provider: { "@id": `${SITE_URL}/#business` } },
    ...(minPrice
      ? { priceSpecification: { "@type": "PriceSpecification", minPrice, priceCurrency: "GBP" } }
      : {}),
  });
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "The BisoDesign Catalogue",
    url: `${SITE_URL}/catalog`,
    description: metadata.description,
    isPartOf: { "@type": "WebSite", name: content.brand, url: SITE_URL },
    mainEntity: {
      "@type": "OfferCatalog",
      name: "What BisoDesign can build",
      itemListElement: [
        offer("Online shops", "Hand-coded e-commerce websites with secure checkout, stock and order management.", 2095),
        offer("Product pages with 360° views", "Product pages with 360° spin, colour and size pickers, configurators and launch pages."),
        offer("Company websites", "Fast, hand-coded websites for UK businesses, built to earn trust and enquiries.", 495),
        offer("Platforms & client portals", "Bookings, memberships, payments, logins and live dashboards."),
        offer("Fleet & driver apps", "Driver apps and dispatch dashboards that send jobs to available drivers with live GPS location."),
        offer("Business automations", "Enquiry alerts, booking reminders, review requests, invoices and CRM sync.", 150),
      ],
    },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />
      <section className="mx-auto max-w-4xl px-6 pb-4 pt-32 text-center md:pt-36">
        <p className="hud-label justify-center">The catalogue · Vol. 01</p>
        <h1 className="mt-4 font-heading text-4xl font-extrabold leading-tight md:text-6xl">
          Flip through <span className="text-gradient">what we can build</span>.
        </h1>
        <p className="mx-auto mt-5 max-w-2xl text-muted md:text-lg">
          Online shops with 360° products you can spin, websites for every kind of business, platforms and fleet apps
          with live driver location — scroll and the pages turn on their own.
        </p>
      </section>

      <FlipBook pages={pages} />

      <section className="mx-auto max-w-4xl px-6 pb-24 pt-10">
        <div className="glass neon neon-on hud rounded-3xl p-10 text-center">
          <p className="hud-label justify-center">Seen something you like?</p>
          <h2 className="mt-4 font-heading text-2xl font-bold md:text-3xl">Let&apos;s turn it into your project.</h2>
          <p className="mx-auto mt-3 max-w-lg text-muted">
            Tell me which page caught your eye. You&apos;ll get honest advice and a fixed price before anything starts.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link href="/about#contact" className="btn-primary">
              Get a free quote
            </Link>
            <Link href="/templates" className="btn-ghost">
              See industry templates
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
