"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";

const LINKS = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/solutions", label: "Solutions" },
  { href: "/templates", label: "Templates" },
  { href: "/pricing", label: "Pricing" },
  { href: "/about", label: "About" },
];

function isActive(pathname: string, href: string) {
  return href === "/" ? pathname === "/" : pathname.startsWith(href);
}

export default function Navbar({ brand }: { brand: string }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  return (
    <header className="fixed left-0 right-0 top-0 z-50 px-3 pt-3 md:px-6">
      <nav
        className={`mx-auto flex max-w-6xl items-center justify-between rounded-2xl border px-4 py-3 backdrop-blur-xl transition-all duration-300 md:px-6 ${
          scrolled
            ? "border-white/10 bg-night/75 shadow-[0_10px_40px_-20px_rgba(139,92,246,0.6)]"
            : "border-white/5 bg-night/40"
        }`}
      >
        <Link href="/" className="flex items-center gap-2 font-label text-lg font-bold tracking-tight">
          <span
            aria-hidden
            className="h-6 w-6 rounded-md bg-flare-gradient shadow-[0_0_18px_rgba(192,76,253,0.7)]"
          />
          <span className="text-gradient">{brand}</span>
        </Link>

        <ul className="hidden items-center gap-1 lg:flex">
          {LINKS.map((link) => {
            const active = isActive(pathname, link.href);
            return (
              <li key={link.href} className="relative">
                <Link
                  href={link.href}
                  className={`relative block rounded-full px-4 py-2 font-label text-xs uppercase tracking-[0.14em] transition-colors hover:text-ink ${
                    active ? "text-ink" : "text-muted"
                  }`}
                >
                  {active && (
                    <motion.span
                      layoutId="nav-active"
                      className="absolute inset-0 -z-10 rounded-full border border-white/10 bg-white/[0.06]"
                      transition={{ type: "spring", stiffness: 380, damping: 32 }}
                    />
                  )}
                  {link.label}
                </Link>
              </li>
            );
          })}
        </ul>

        <Link href="/about#contact" className="btn-primary hidden whitespace-nowrap !px-5 !py-2 lg:inline-flex">
          Free quote
        </Link>

        <button
          aria-label="Toggle menu"
          aria-expanded={open}
          className="flex h-9 w-9 flex-col items-center justify-center gap-1.5 rounded-lg border border-white/10 lg:hidden"
          onClick={() => setOpen((v) => !v)}
        >
          <span
            className={`h-0.5 w-5 bg-ink transition-transform ${open ? "translate-y-1 rotate-45" : ""}`}
          />
          <span
            className={`h-0.5 w-5 bg-ink transition-transform ${open ? "-translate-y-1 -rotate-45" : ""}`}
          />
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="glass mx-auto mt-2 max-w-6xl rounded-2xl lg:hidden"
          >
            <ul className="flex flex-col gap-1 p-3">
              {LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={`block rounded-xl px-4 py-3 font-label text-sm uppercase tracking-[0.14em] ${
                      isActive(pathname, link.href) ? "bg-white/[0.06] text-ink" : "text-muted"
                    }`}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              <li className="pt-2">
                <Link href="/about#contact" className="btn-primary w-full">
                  Get a free quote
                </Link>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
