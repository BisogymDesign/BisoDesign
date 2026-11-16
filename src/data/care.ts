import type { PricingPackage } from "@/types/content";

/** Monthly website care plans (shown on /website-care-plans). */
export const carePlans: (PricingPackage & { monthly: number; href: string })[] = [
  {
    id: "care-essential",
    name: "Essential",
    price: "£29/mo",
    monthly: 29,
    tagline: "Peace of mind: your site kept safe, backed up and working — without you thinking about it.",
    features: [
      "Backups of your site and content",
      "Security & software updates",
      "Uptime monitoring with instant alerts",
      "Monthly health check: speed, forms and links",
      "Small changes — up to 30 minutes a month",
      "Email & WhatsApp support",
    ],
    highlighted: false,
    href: "/about?interest=care-essential#contact",
  },
  {
    id: "care-growth",
    name: "Growth",
    price: "£59/mo",
    monthly: 59,
    tagline: "For businesses that want their website to keep improving and bringing in enquiries.",
    features: [
      "Everything in Essential",
      "Up to 2 hours of changes a month",
      "Monthly Google report in plain English",
      "Ongoing SEO tweaks: titles, content & local pages",
      "Priority support — same working day",
    ],
    highlighted: true,
    href: "/about?interest=care-growth#contact",
  },
  {
    id: "care-partner",
    name: "Partner",
    price: "£99/mo",
    monthly: 99,
    tagline: "Your own web person on call — website, automations and growth looked after together.",
    features: [
      "Everything in Growth",
      "Up to 4 hours of changes a month",
      "Your automations monitored & kept running",
      "A new page or landing page every quarter",
      "Quarterly strategy call",
    ],
    highlighted: false,
    href: "/about?interest=care-partner#contact",
  },
];

/** Contact-form pre-fill for links like /about?interest=redesign#contact */
export const interests: Record<string, string> = {
  redesign: "a website redesign",
  "care-check": "a free website health check",
  ...Object.fromEntries(carePlans.map((p) => [p.id, `the ${p.name} care plan (£${p.monthly}/month)`])),
};
