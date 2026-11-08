import Link from "next/link";
import type { SocialLink } from "@/types/content";

const NAV = [
  { href: "/services", label: "Services" },
  { href: "/solutions", label: "Solutions" },
  { href: "/templates", label: "Templates" },
  { href: "/pricing", label: "Pricing" },
  { href: "/about", label: "About & Contact" },
];

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
    <footer className="relative border-t border-white/5 px-6 pb-10 pt-16">
      <div
        aria-hidden
        className="absolute left-1/2 top-0 h-px w-2/3 -translate-x-1/2 bg-gradient-to-r from-transparent via-flare-cyan/60 to-transparent"
      />
      <div className="mx-auto grid max-w-6xl gap-10 md:grid-cols-3">
        <div>
          <p className="flex items-center gap-2 font-label text-lg font-bold">
            <span aria-hidden className="h-5 w-5 rounded-md bg-flare-gradient" />
            <span className="text-gradient">{brand}</span>
          </p>
          <p className="mt-3 max-w-xs text-sm text-muted">{tagline}</p>
        </div>

        <nav aria-label="Footer">
          <p className="font-label text-[10px] uppercase tracking-[0.2em] text-flare-cyan/80">Navigate</p>
          <ul className="mt-4 space-y-2 text-sm text-muted">
            {NAV.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="hover:text-ink">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <p className="font-label text-[10px] uppercase tracking-[0.2em] text-flare-cyan/80">Contact</p>
          <div className="mt-4 flex flex-col gap-2 text-sm text-muted">
            <a href={`mailto:${contactEmail}`} className="break-all hover:text-ink">
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
      </div>
      <div className="mx-auto mt-12 flex max-w-6xl flex-wrap items-center justify-between gap-3 font-label text-xs tracking-wide text-muted/70">
        <p>
          © {new Date().getFullYear()} {brand}. All rights reserved.
        </p>
        <Link href="/privacy" className="hover:text-ink">
          Privacy Policy
        </Link>
      </div>
    </footer>
  );
}
