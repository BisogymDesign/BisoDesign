import { Fragment, type ReactNode } from "react";
import {
  AutomationText,
  AutomationVisual,
  BackCover,
  CallToAction,
  CompanyMockup,
  CompanyText,
  Contents,
  Cover,
  DispatchMockup,
  DriverAppMockup,
  FleetText,
  HowWeWork,
  Intro,
  PlatformMockup,
  PlatformText,
  ShopMockup,
  ShopText,
  TrackingMockup,
  type ChapterEntry,
} from "./pages";
import { CategoryPage, FashionPage, PerfumePage, ProductText, SneakerPage, ToolsPage } from "./products";
import {
  BuilderModel,
  CarModel,
  DentalModel,
  EstateModel,
  GALLERY,
  GalleryText,
  GymModel,
  HotelModel,
  RestaurantModel,
  SaasModel,
  SpaModel,
} from "./gallery";

export type CatalogInfo = {
  steps: { title: string; description: string }[];
  whatsappHref: string;
  email: string;
};

/*
 * Reading order. In the two-page spread, odd pages sit on the left and even pages
 * on the right — so chapter text pages land on odd numbers, next to their visuals.
 */
const ORDER = [
  "cover",
  "contents",
  "intro",
  "shop-text",
  "shop",
  "product-text",
  "fashion",
  "tools",
  "sneaker",
  "perfume",
  "category",
  "company-text",
  "company",
  "gallery-text",
  ...GALLERY.map((g) => g.key),
  "platform-text",
  "platform",
  "fleet-text",
  "driver",
  "dispatch",
  "tracking",
  "auto-text",
  "auto",
  "how",
  "cta",
  "back",
] as const;

/** The catalogue in reading order. Page index = printed page number (the cover is page 0). */
export function buildCatalogPages(info: CatalogInfo): ReactNode[] {
  const at = Object.fromEntries(ORDER.map((k, i) => [k, i])) as Record<string, number>;
  const chapters: ChapterEntry[] = [
    { n: "01", title: "Online shops", note: "E-commerce that sells 24/7", page: at["shop-text"] },
    { n: "02", title: "Product pages that sell", note: "360° views & configurators", page: at["product-text"] },
    { n: "03", title: "Company websites", note: "Trust at first glance", page: at["company-text"] },
    { n: "04", title: "Websites for every business", note: "Nine concept designs", page: at["gallery-text"] },
    { n: "05", title: "Platforms & portals", note: "Logins, bookings, dashboards", page: at["platform-text"] },
    { n: "06", title: "Fleet & driver apps", note: "Jobs sent with live location", page: at["fleet-text"] },
    { n: "07", title: "Automations", note: "Admin that does itself", page: at["auto-text"] },
    { n: "08", title: "How we work", note: "Simple, honest, fixed price", page: at["how"] },
  ];

  const render: Record<string, () => ReactNode> = {
    cover: () => <Cover />,
    contents: () => <Contents chapters={chapters} startPage={at["cta"]} />,
    intro: () => <Intro />,
    "shop-text": () => <ShopText />,
    shop: () => <ShopMockup />,
    "product-text": () => <ProductText />,
    fashion: () => <FashionPage />,
    tools: () => <ToolsPage />,
    sneaker: () => <SneakerPage />,
    perfume: () => <PerfumePage />,
    category: () => <CategoryPage />,
    "company-text": () => <CompanyText />,
    company: () => <CompanyMockup />,
    "gallery-text": () => <GalleryText pages={at} />,
    restaurant: () => <RestaurantModel />,
    estate: () => <EstateModel />,
    builder: () => <BuilderModel />,
    spa: () => <SpaModel />,
    cars: () => <CarModel />,
    dental: () => <DentalModel />,
    gym: () => <GymModel />,
    hotel: () => <HotelModel />,
    saas: () => <SaasModel />,
    "platform-text": () => <PlatformText />,
    platform: () => <PlatformMockup />,
    "fleet-text": () => <FleetText />,
    driver: () => <DriverAppMockup />,
    dispatch: () => <DispatchMockup />,
    tracking: () => <TrackingMockup />,
    "auto-text": () => <AutomationText />,
    auto: () => <AutomationVisual />,
    how: () => <HowWeWork steps={info.steps} />,
    cta: () => <CallToAction whatsappHref={info.whatsappHref} email={info.email} />,
    back: () => <BackCover />,
  };

  return ORDER.map((k) => <Fragment key={k}>{render[k]()}</Fragment>);
}
