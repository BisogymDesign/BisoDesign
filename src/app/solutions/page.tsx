import type { Metadata } from "next";
import Link from "next/link";
import ScrollReveal from "@/components/ScrollReveal";
import SolutionsExplorer from "@/components/SolutionsExplorer";
import { solutionCategories, solutions } from "@/data/solutions";

export const metadata: Metadata = {
  title: "Solutions — Websites, Automations & Growth Guides",
  description:
    "Clear guides to everything BisoDesign can build for your business: websites, online shops, enquiry alerts, online booking, review requests, quote calculators, payment links, AI assistants and more.",
  alternates: { canonical: "/solutions" },
};

export default function SolutionsPage() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-24">
      <ScrollReveal>
        <p className="hud-label">Solutions library</p>
        <h1 className="mt-4 max-w-3xl font-heading text-4xl font-extrabold leading-tight md:text-6xl">
          Everything we can <span className="text-gradient">build together</span>.
        </h1>
        <p className="mt-6 max-w-2xl text-muted md:text-lg">
          Each guide explains the problem it solves, exactly how it works, what&apos;s included,
          timelines and starting prices. Open one, save it as a PDF, or share it with your team.
        </p>
      </ScrollReveal>

      <div className="mt-14">
        <SolutionsExplorer solutions={solutions} categories={solutionCategories} />
      </div>

      <ScrollReveal className="mt-24">
        <div className="glass neon neon-on hud rounded-2xl p-10 text-center">
          <p className="hud-label justify-center">Custom request</p>
          <h2 className="mt-4 font-heading text-2xl font-bold md:text-3xl">
            Don&apos;t see what you need?
          </h2>
          <p className="mx-auto mt-3 max-w-lg text-muted">
            Tell me what you do by hand every week. If it can be automated, I&apos;ll show you how
            — and what it would cost.
          </p>
          <Link href="/about#contact" className="btn-primary mt-8">
            Describe your idea
          </Link>
        </div>
      </ScrollReveal>
    </div>
  );
}
