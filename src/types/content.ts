export type Service = {
  id: string;
  title: string;
  description: string;
};

export type PricingPackage = {
  id: string;
  name: string;
  price: string;
  priceNote?: string;
  tagline: string;
  features: string[];
  highlighted?: boolean;
};

export type PortfolioItem = {
  id: string;
  title: string;
  description: string;
  url?: string;
  tags: string[];
};

export type SocialLink = {
  label: string;
  url: string;
};

export type Testimonial = {
  id: string;
  quote: string;
  author: string;
  role?: string;
};

export type ProcessStep = {
  id: string;
  title: string;
  description: string;
};

export type FaqItem = {
  id: string;
  question: string;
  answer: string;
};

export type SiteContent = {
  brand: string;
  tagline: string;
  heroTitle: string;
  heroSubtitle: string;
  aboutTitle: string;
  aboutText: string;
  contactEmail: string;
  whatsappNumber: string;
  whatsappMessage: string;
  socialLinks: SocialLink[];
  services: Service[];
  pricing: PricingPackage[];
  portfolio: PortfolioItem[];
  testimonials: Testimonial[];
  processSteps: ProcessStep[];
  faq: FaqItem[];
};

export type ContactMessage = {
  id: string;
  name: string;
  email: string;
  message: string;
  createdAt: string;
};
