import type { Metadata } from "next";
import { Sora, Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { readContent } from "@/lib/store";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CustomCursor from "@/components/CustomCursor";
import PageTransition from "@/components/PageTransition";

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

export const metadata: Metadata = {
  title: "BisoDesign — Web design, built for what's next.",
  description:
    "BisoDesign designs and builds fast, modern, custom websites — design, development, and ongoing support under one roof.",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const content = await readContent();

  return (
    <html lang="en">
      <body
        className={`${sora.variable} ${inter.variable} ${spaceGrotesk.variable} bg-night font-body text-ink antialiased`}
      >
        <CustomCursor />
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
      </body>
    </html>
  );
}
