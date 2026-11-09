import type { Metadata } from "next";
import { Sora, Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { readContent } from "@/lib/store";
import { SITE_URL } from "@/lib/site";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AmbientBackground from "@/components/AmbientBackground";
import { Analytics } from "@vercel/analytics/react";
import PageTransition from "@/components/PageTransition";
import WhatsAppButton from "@/components/WhatsAppButton";

const sora = Sora({
  subsets: ["latin"],
  variable: "--font-sora",
  weight: ["600", "700", "800"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["400", "500", "600"],
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  weight: ["500", "600", "700"],
});

const DEFAULT_DESCRIPTION =
  "Hand-coded, fast websites and business automations for UK small businesses — WhatsApp enquiries, online booking, review requests and local SEO. Fixed prices from £495.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "BisoDesign — Websites & Automations for UK Small Businesses",
    template: "%s | BisoDesign",
  },
  description: DEFAULT_DESCRIPTION,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_GB",
    url: SITE_URL,
    siteName: "BisoDesign",
    title: "BisoDesign — Websites & Automations for UK Small Businesses",
    description: DEFAULT_DESCRIPTION,
  },
  twitter: {
    card: "summary_large_image",
    title: "BisoDesign — Websites & Automations for UK Small Businesses",
    description: DEFAULT_DESCRIPTION,
  },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const content = await readContent();

  const prices = content.pricing
    .map((p) => p.price)
    .filter(Boolean);
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": `${SITE_URL}/#business`,
    name: content.brand,
    url: SITE_URL,
    image: `${SITE_URL}/opengraph-image`,
    description: DEFAULT_DESCRIPTION,
    email: content.contactEmail,
    telephone: content.whatsappNumber,
    areaServed: { "@type": "Country", name: "United Kingdom" },
    ...(prices.length > 1 ? { priceRange: `${prices[0]}–${prices[prices.length - 1]}+` } : {}),
    sameAs: content.socialLinks.map((l) => l.url).filter((u) => /^https?:\/\/[^/]+\/.+/.test(u)),
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Web design & automation services",
      itemListElement: content.services.map((s) => ({
        "@type": "Offer",
        itemOffered: { "@type": "Service", name: s.title, description: s.description },
      })),
    },
  };

  return (
    <html lang="en-GB">
      <body
        className={`${sora.variable} ${inter.variable} ${spaceGrotesk.variable} bg-night font-body text-ink antialiased`}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
        />
        <AmbientBackground />
        <Navbar brand={content.brand} />
        <main className="pt-20">
          <PageTransition>{children}</PageTransition>
        </main>
        <Footer
          brand={content.brand}
          tagline={content.tagline}
          contactEmail={content.contactEmail}
          socialLinks={content.socialLinks}
        />
        <WhatsAppButton number={content.whatsappNumber} message={content.whatsappMessage} />
        {/* Cookieless visitor statistics — enable "Analytics" in the Vercel project to see the data */}
        <Analytics />
      </body>
    </html>
  );
}
