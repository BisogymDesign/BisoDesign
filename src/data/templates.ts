/**
 * Website templates — visual models for different industries.
 * Each one renders as a live mockup (SiteMockup) and has an "anatomy":
 * every section of the page and the psychology of why it's there.
 * Brand names, prices and stats inside the mockups are sample content.
 */

export type SiteTemplate = {
  slug: string;
  name: string;
  industry: string;
  brand: string;
  /** Speaks to the business owner considering this template. */
  summary: string;
  palette: {
    bg: string;
    surface: string;
    text: string;
    muted: string;
    primary: string;
    primaryText: string;
    accent: string;
  };
  fontStyle: "sans" | "serif";
  heroArt: "road" | "waves" | "grid" | "circles" | "flame" | "stripes" | "bars" | "leaves";
  nav: string[];
  hero: { eyebrow: string; headline: string; sub: string; cta: string; cta2: string };
  badges: string[];
  services: { title: string; note: string }[];
  review: { quote: string; author: string };
  mobileBar: string;
  anatomy: { section: string; why: string }[];
  features: string[];
  automations: string[];
  package: string;
  priceFrom: string;
  timeline: string;
};

export const templates: SiteTemplate[] = [
  {
    slug: "vehicle-recovery",
    name: "Rescue",
    industry: "Vehicle recovery & roadside assistance",
    brand: "RoadRescue 24/7",
    summary:
      "Your customers find you on the worst day of their week — stranded, stressed, often in the dark. This template is built for that exact moment: one glance, one tap, and they're talking to you instead of scrolling to the next number.",
    palette: { bg: "#0f1115", surface: "#1a1d24", text: "#ffffff", muted: "#9aa3b2", primary: "#ffb020", primaryText: "#111111", accent: "#ff6a00" },
    fontStyle: "sans",
    heroArt: "road",
    nav: ["Services", "Areas", "Prices", "Reviews"],
    hero: {
      eyebrow: "24/7 · London & M25",
      headline: "Broken down? Help is on the way.",
      sub: "Car, van & HGV recovery. Share your exact location in one tap and we'll call you straight back.",
      cta: "📞 Call now",
      cta2: "📍 Send my location",
    },
    badges: ["24/7 dispatch", "Fully insured", "4.9★ Google", "Fixed prices"],
    services: [
      { title: "Breakdown recovery", note: "From £79" },
      { title: "Accident recovery", note: "Insurance-friendly" },
      { title: "Van & HGV", note: "Heavy lift fleet" },
      { title: "Jump starts", note: "On the spot" },
    ],
    review: { quote: "Arrived in 35 minutes on the M25 at 2am. Calm, professional, fair price.", author: "Daniel R." },
    mobileBar: "📞 Call now — 24/7",
    anatomy: [
      { section: "Emergency hero with two oversized buttons", why: "A stressed driver can't process choices. Two huge, obvious actions — call or send location — remove every decision except the one that gets them help." },
      { section: "One-tap GPS location", why: "Most stranded drivers can't describe where they are. Sharing GPS removes the hardest question and gets the truck moving faster." },
      { section: "Trust bar", why: "Insurance, real reviews and fixed prices quietly answer the fear nobody says out loud: 'Am I about to get ripped off?'" },
      { section: "Areas covered", why: "Dedicated area sections help Google show you for '[town] recovery' searches — the exact words people type in a panic." },
      { section: "Sticky mobile call bar", why: "The phone number never leaves the screen. Whatever they're reading, help is one thumb-tap away." },
    ],
    features: ["Click-to-call & WhatsApp", "GPS location sharing", "Area landing pages", "Review system with admin", "Payment links after the job"],
    automations: ["gps-callout-button", "payment-links-invoices", "review-requests", "instant-enquiry-alerts"],
    package: "Ignite",
    priceFrom: "£1,095",
    timeline: "3–4 weeks",
  },
  {
    slug: "beauty-salon",
    name: "Lumière",
    industry: "Beauty salon, lashes, nails & aesthetics",
    brand: "Maison Lumière",
    summary:
      "Your clients don't just buy a treatment — they buy how they'll feel afterwards. This template sells that feeling first, shows honest prices second, and lets them book at 11pm from the sofa without ever needing to call.",
    palette: { bg: "#fbf6f1", surface: "#ffffff", text: "#2b1d1a", muted: "#8a7470", primary: "#b76e79", primaryText: "#ffffff", accent: "#d9b38c" },
    fontStyle: "serif",
    heroArt: "circles",
    nav: ["Treatments", "Prices", "Gallery", "Book"],
    hero: {
      eyebrow: "Beauty studio · Clapham",
      headline: "Feel like yourself again — beautifully.",
      sub: "Lashes, brows, nails & skin in a calm, private studio. Book your appointment online in 30 seconds.",
      cta: "Book now",
      cta2: "View prices",
    },
    badges: ["Online booking", "Certified therapists", "5★ reviews", "Gift vouchers"],
    services: [
      { title: "Lash lift & tint", note: "£45 · 50 min" },
      { title: "Gel manicure", note: "£30 · 45 min" },
      { title: "Signature facial", note: "£55 · 60 min" },
      { title: "Brow lamination", note: "£38 · 40 min" },
    ],
    review: { quote: "The most relaxing hour of my month. Booking online is so easy.", author: "Sophie M." },
    mobileBar: "Book your appointment",
    anatomy: [
      { section: "Emotional hero", why: "People decide with feelings and justify with facts. Leading with how they'll feel creates desire before price is ever considered." },
      { section: "Visible prices & durations", why: "Hidden prices feel like a trap. Showing them builds trust and pre-qualifies clients, so the ones who book are ready to pay." },
      { section: "Real gallery", why: "Before-and-after photos are proof the eye believes instantly — far stronger than any written promise." },
      { section: "30-second online booking", why: "Every extra step loses clients. Booking without a phone call captures the late-night decision while the desire is strongest." },
      { section: "Reviews by name", why: "Seeing people like them who loved the experience removes the fear of trying somewhere new." },
    ],
    features: ["Online booking & reminders", "Price list editable by you", "Gallery", "Gift vouchers", "Instagram feed"],
    automations: ["online-booking", "review-requests", "email-follow-ups", "payment-links-invoices"],
    package: "Ignite",
    priceFrom: "£1,095",
    timeline: "3–4 weeks",
  },
  {
    slug: "electrician-trades",
    name: "Voltage",
    industry: "Electricians, plumbers & trades",
    brand: "VoltPro Electrical",
    summary:
      "Homeowners are nervous about letting a tradesperson into their home. This template does the reassuring for you — credentials, guarantees and real reviews up front — and turns 'just looking' into a quote request with every detail you need.",
    palette: { bg: "#0b1630", surface: "#13224a", text: "#ffffff", muted: "#a9b6d3", primary: "#ffd400", primaryText: "#0b1630", accent: "#3b82f6" },
    fontStyle: "sans",
    heroArt: "grid",
    nav: ["Services", "EV chargers", "Reviews", "Contact"],
    hero: {
      eyebrow: "Certified electricians · Manchester",
      headline: "Safe, certified electrical work — booked in days.",
      sub: "Rewires, EV chargers, fuse boards and fault finding. Get a free, no-obligation quote today.",
      cta: "Get a free quote",
      cta2: "Call us",
    },
    badges: ["Certified & insured", "12-month guarantee", "Free quotes", "4.9★ reviews"],
    services: [
      { title: "EV charger install", note: "From £795" },
      { title: "Consumer units", note: "From £450" },
      { title: "Full rewires", note: "Fixed quote" },
      { title: "Fault finding", note: "Same week" },
    ],
    review: { quote: "Turned up on time, explained everything, left the house spotless.", author: "Priya K." },
    mobileBar: "Get a free quote",
    anatomy: [
      { section: "Credential-first hero", why: "The first worry is safety. Leading with certification and insurance answers it before the visitor even forms the question." },
      { section: "Guarantee badge", why: "A clear guarantee shifts the risk from the customer to you — and makes saying yes feel safe." },
      { section: "Service cards with 'from' prices", why: "Price anchors stop the fear of the unknown and filter out people who aren't a fit." },
      { section: "Smart quote form", why: "Asking the right questions up front (job type, postcode, photos) means fewer site visits wasted and faster, more accurate quotes." },
      { section: "Reviews about behaviour", why: "Homeowners care about tidiness and punctuality as much as skill — reviews that mention both close the deal." },
    ],
    features: ["Quote request with photo upload", "Service & area pages", "Accreditation badges", "Google reviews", "Click-to-call"],
    automations: ["instant-quote-calculator", "instant-enquiry-alerts", "lead-tracker-crm", "review-requests"],
    package: "Ignite",
    priceFrom: "£1,095",
    timeline: "3–4 weeks",
  },
  {
    slug: "cleaning-company",
    name: "Fresh",
    industry: "Cleaning companies (home & office)",
    brand: "FreshNest Cleaning",
    summary:
      "People hiring a cleaner want two things: a fair price right now and someone they can trust with their keys. This template gives an instant price, introduces your vetted team, and lets them book and pay without a single phone call.",
    palette: { bg: "#f3fbf8", surface: "#ffffff", text: "#0f2e28", muted: "#5c7a73", primary: "#10b981", primaryText: "#ffffff", accent: "#0ea5e9" },
    fontStyle: "sans",
    heroArt: "waves",
    nav: ["Services", "Pricing", "How it works", "Reviews"],
    hero: {
      eyebrow: "Home & office cleaning · Leeds",
      headline: "Come home to a spotless house — every time.",
      sub: "Vetted, insured cleaners. Instant price, online booking, no contracts.",
      cta: "Get instant price",
      cta2: "How it works",
    },
    badges: ["Vetted & insured", "Same cleaner each visit", "No contracts", "Re-clean promise"],
    services: [
      { title: "Regular clean", note: "From £18/hr" },
      { title: "Deep clean", note: "From £149" },
      { title: "End of tenancy", note: "Deposit-back focus" },
      { title: "Office cleaning", note: "Flexible hours" },
    ],
    review: { quote: "Same lovely cleaner every week and I booked it all online in two minutes.", author: "Hannah J." },
    mobileBar: "Get my instant price",
    anatomy: [
      { section: "Instant price calculator", why: "Uncertainty is the biggest blocker. A price in seconds turns curiosity into commitment while interest is at its peak." },
      { section: "Meet-the-team section", why: "Faces build trust. Letting someone into your home is personal — knowing who's coming makes it easy." },
      { section: "'No contracts' message", why: "Removing lock-in removes risk. Paradoxically, the freedom to leave makes people more likely to stay." },
      { section: "3-step 'How it works'", why: "A simple process makes the decision feel effortless — the brain prefers what looks easy." },
      { section: "Re-clean promise", why: "A guarantee tells them you're confident in your work, so they don't have to be nervous about it." },
    ],
    features: ["Instant quote calculator", "Online booking & payments", "Recurring bookings", "Team profiles", "Reviews"],
    automations: ["instant-quote-calculator", "online-booking", "payment-links-invoices", "review-requests"],
    package: "Ignite",
    priceFrom: "£1,095",
    timeline: "3–4 weeks",
  },
  {
    slug: "restaurant",
    name: "Ember",
    industry: "Restaurants, cafés & bars",
    brand: "Ember & Oak",
    summary:
      "Diners decide with their eyes and their stomach — usually on a phone, often 20 minutes before they're hungry. This template makes your food the hero, shows the menu instantly and turns that craving into a confirmed reservation.",
    palette: { bg: "#141110", surface: "#1f1a17", text: "#f5ece2", muted: "#b3a291", primary: "#e4572e", primaryText: "#ffffff", accent: "#f2a65a" },
    fontStyle: "serif",
    heroArt: "flame",
    nav: ["Menu", "Reserve", "Events", "Find us"],
    hero: {
      eyebrow: "Open-fire kitchen · Bristol",
      headline: "Wood-fired, slow-cooked, unforgettable.",
      sub: "Seasonal small plates and open-fire cooking. Reserve your table for tonight in seconds.",
      cta: "Reserve a table",
      cta2: "See the menu",
    },
    badges: ["Open 7 days", "Private dining", "Gift cards", "4.8★ rated"],
    services: [
      { title: "Lunch", note: "12–3pm" },
      { title: "Dinner", note: "5–11pm" },
      { title: "Sunday roast", note: "From £19" },
      { title: "Private events", note: "Up to 40 guests" },
    ],
    review: { quote: "Best meal we've had all year. Booking took ten seconds.", author: "Tom & Ellie" },
    mobileBar: "Reserve a table",
    anatomy: [
      { section: "Full-screen food imagery", why: "Appetite is visual. A great photo triggers craving faster than any description ever could." },
      { section: "Menu one tap away", why: "The #1 thing diners look for. Hiding it in a PDF loses people; a fast, readable menu keeps them." },
      { section: "Reserve button everywhere", why: "Hunger is impulsive. The moment they decide, the button has to be right there." },
      { section: "Opening hours & map", why: "Practical certainty — 'Are they open? How do I get there?' — removes the last excuse not to come." },
      { section: "Events & gift cards", why: "Gives people more reasons to choose you, and brings in revenue on quiet days." },
    ],
    features: ["Online reservations", "Mobile-first menu", "Events & private dining", "Gift card sales", "Google Maps"],
    automations: ["online-booking", "email-follow-ups", "review-requests", "ai-website-assistant"],
    package: "Ignite",
    priceFrom: "£1,095",
    timeline: "3–4 weeks",
  },
  {
    slug: "garage-mot",
    name: "Pitstop",
    industry: "Garages, MOT & servicing",
    brand: "Pitstop Autocare",
    summary:
      "Most drivers expect a garage to surprise them with the bill. This template wins them over by doing the opposite: clear prices, online MOT booking and friendly reminders — so they come back every year without shopping around.",
    palette: { bg: "#111111", surface: "#1c1c1c", text: "#ffffff", muted: "#a3a3a3", primary: "#e11d2e", primaryText: "#ffffff", accent: "#f5f5f5" },
    fontStyle: "sans",
    heroArt: "stripes",
    nav: ["MOT", "Servicing", "Repairs", "Prices"],
    hero: {
      eyebrow: "Independent garage · Birmingham",
      headline: "Honest prices. No surprises. Ever.",
      sub: "Book your MOT online, see the price before we start, and get a reminder next year.",
      cta: "Book MOT",
      cta2: "Check prices",
    },
    badges: ["MOT testing centre", "Fixed-price servicing", "Free collection", "4.9★ reviews"],
    services: [
      { title: "MOT test", note: "£54.85" },
      { title: "Full service", note: "From £149" },
      { title: "Brakes", note: "Free check" },
      { title: "Diagnostics", note: "From £45" },
    ],
    review: { quote: "Quoted £180, charged £180. Rare these days — I'm a customer for life.", author: "Mark T." },
    mobileBar: "Book my MOT",
    anatomy: [
      { section: "Anti-surprise headline", why: "Naming the customer's biggest fear — the unexpected bill — and promising the opposite builds instant rapport." },
      { section: "Published price list", why: "Transparency is your competitive edge in an industry known for vague quotes." },
      { section: "Online MOT booking", why: "Removes the phone call people put off. Easy bookings get made; hard ones get forgotten." },
      { section: "Automatic yearly reminder", why: "Customers who are reminded rebook with you instead of searching again — loyalty on autopilot." },
      { section: "Review quotes about honesty", why: "Social proof aimed at the exact objection is far more persuasive than general praise." },
    ],
    features: ["Online MOT & service booking", "Price list", "Collection & delivery form", "MOT reminders", "Reviews"],
    automations: ["online-booking", "email-follow-ups", "payment-links-invoices", "review-requests"],
    package: "Ignite",
    priceFrom: "£1,095",
    timeline: "3–4 weeks",
  },
  {
    slug: "personal-trainer",
    name: "Forge",
    industry: "Personal trainers, gyms & studios",
    brand: "Forge PT Studio",
    summary:
      "People don't buy training sessions — they buy the version of themselves they're scared they'll never reach. This template speaks to that goal, lowers the barrier with a first step, and keeps them committed with smooth booking and payments.",
    palette: { bg: "#0a0a0a", surface: "#161616", text: "#ffffff", muted: "#9b9b9b", primary: "#c6ff00", primaryText: "#0a0a0a", accent: "#00e0ff" },
    fontStyle: "sans",
    heroArt: "bars",
    nav: ["Training", "Coaches", "Results", "Pricing"],
    hero: {
      eyebrow: "PT studio · Glasgow",
      headline: "Stronger in 12 weeks — with a coach in your corner.",
      sub: "1-to-1 and small-group training, nutrition and progress tracking. Your first session is on us.",
      cta: "Claim free session",
      cta2: "Meet the coaches",
    },
    badges: ["Qualified coaches", "Small groups", "Nutrition included", "Progress tracking"],
    services: [
      { title: "1-to-1 PT", note: "From £40" },
      { title: "Small group", note: "Max 6 people" },
      { title: "Online coaching", note: "£99/month" },
      { title: "Nutrition plans", note: "Included" },
    ],
    review: { quote: "Down 9kg and finally enjoy training. The coaches genuinely care.", author: "Chris W." },
    mobileBar: "Claim my free session",
    anatomy: [
      { section: "Outcome-focused headline", why: "A specific result and timeframe makes the goal feel real and achievable, not vague and distant." },
      { section: "Free first step", why: "A small, risk-free commitment makes the big one easy. Once people start, they want to continue." },
      { section: "Coach profiles", why: "People commit to people, not gyms. A face and a story create connection before the first session." },
      { section: "Transformation results", why: "Proof from people with the same starting point says 'this could be you'." },
      { section: "Clear membership pricing", why: "No awkward sales conversation — they can decide in their own time, which feels respectful." },
    ],
    features: ["Session booking & payments", "Membership plans", "Coach profiles", "Results gallery", "Lead magnet"],
    automations: ["online-booking", "payment-links-invoices", "email-follow-ups", "ai-website-assistant"],
    package: "Ignite",
    priceFrom: "£1,095",
    timeline: "3–4 weeks",
  },
  {
    slug: "local-shop",
    name: "Corner",
    industry: "Local shops & online stores",
    brand: "Corner & Co.",
    summary:
      "Your regulars love you — this template lets them love you from their sofa too. Browse, order and pay online in minutes, with same-day delivery or click & collect, and none of the big-platform fees eating your margin.",
    palette: { bg: "#fffdf7", surface: "#ffffff", text: "#1f2a1f", muted: "#6b7a6b", primary: "#2f6b3a", primaryText: "#ffffff", accent: "#e9b949" },
    fontStyle: "serif",
    heroArt: "leaves",
    nav: ["Shop", "Hampers", "Delivery", "About"],
    hero: {
      eyebrow: "Neighbourhood deli · York",
      headline: "Local favourites, delivered to your door.",
      sub: "Fresh produce, deli & everyday essentials. Order by 2pm for same-day delivery.",
      cta: "Shop now",
      cta2: "Click & collect",
    },
    badges: ["Same-day delivery", "Local suppliers", "Secure checkout", "Click & collect"],
    services: [
      { title: "Fresh produce", note: "Daily" },
      { title: "Artisan bakery", note: "From £2.40" },
      { title: "Deli counter", note: "Cut to order" },
      { title: "Gift hampers", note: "From £35" },
    ],
    review: { quote: "Like having our favourite shop in our pocket. Delivery is always spot on.", author: "The Greens" },
    mobileBar: "Shop now",
    anatomy: [
      { section: "Promise in the headline", why: "Convenience is the reason people shop online; stating it clearly answers 'why here instead of the supermarket?'" },
      { section: "Delivery cut-off ('order by 2pm')", why: "A specific deadline creates gentle, honest urgency and helps people plan." },
      { section: "Category tiles", why: "Shoppers scan, they don't read. Big visual categories get them to products in one tap." },
      { section: "Local story", why: "Supporting local is a reason to choose you over a giant — tell it proudly." },
      { section: "Secure checkout badges", why: "Reassurance at the moment of payment prevents last-second abandonment." },
    ],
    features: ["Product catalogue", "Stripe checkout", "Delivery & collection slots", "Order alerts", "Admin panel"],
    automations: ["payment-links-invoices", "instant-enquiry-alerts", "email-follow-ups", "review-requests"],
    package: "Nova",
    priceFrom: "£2,095",
    timeline: "5–8 weeks",
  },
];

export function getTemplate(slug: string) {
  return templates.find((t) => t.slug === slug);
}
