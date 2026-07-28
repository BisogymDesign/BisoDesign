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

export type SiteContent = {
  brand: string;
  tagline: string;
  heroTitle: string;
  heroSubtitle: string;
  aboutTitle: string;
  aboutText: string;
  contactEmail: string;
  socialLinks: SocialLink[];
  services: Service[];
  pricing: PricingPackage[];
  portfolio: PortfolioItem[];
};

export type ContactMessage = {
  id: string;
  name: string;
  email: string;
  message: string;
  createdAt: string;
};
