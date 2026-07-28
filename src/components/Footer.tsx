import Link from "next/link";
import type { SocialLink } from "@/types/content";

export default function Footer({
  brand,
  tagline,
  contactEmail,
  socialLinks,
}: {
  brand: string;
  tagline: string;
  contactEmail: string;
  socialLinks: SocialLink[];
}) {
  return (
    <footer className="border-t border-white/5 bg-night px-6 py-12">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="font-label text-lg font-bold text-gradient">{brand}</p>
          <p className="mt-1 max-w-sm text-sm text-muted">{tagline}</p>
        </div>

        <div className="flex flex-wrap items-center gap-6 text-sm text-muted">
          <a href={`mailto:${contactEmail}`} className="hover:text-ink">
            {contactEmail}
          </a>
          {socialLinks.map((link) => (
            <a
              key={link.label}
              href={link.url}
              target="_blank"
              rel="noreferrer"
              className="hover:text-ink"
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>
      <p className="mx-auto mt-8 max-w-6xl text-xs text-muted/70">
        © {new Date().getFullYear()} {brand}. All rights reserved.{" "}
        <Link href="/admin" className="hover:text-ink">
          Admin
        </Link>
      </p>
    </footer>
  );
}
