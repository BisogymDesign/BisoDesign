/**
 * Solution guides — one structured, printable info sheet per thing BisoDesign can build.
 * Shown at /solutions and /solutions/<slug>. Edit prices, timelines and wording here.
 */

export type SolutionCategory = "Websites" | "Automations" | "Growth";

export type SolutionStep = { title: string; text: string };
export type SolutionFaq = { q: string; a: string };

export type Solution = {
  slug: string;
  code: string;
  category: SolutionCategory;
  title: string;
  tagline: string;
  /** The everyday problem this solves, in the client's words. */
  problem: string;
  /** What changes for the business once it's in place. */
  outcomes: string[];
  /** The flow, step by step. */
  howItWorks: SolutionStep[];
  included: string[];
  idealFor: string[];
  tools: string[];
  /** A short, concrete scenario. */
  example: string;
  timeline: string;
  priceFrom: string;
  /** Optional ongoing cost, e.g. hosting or API usage. */
  ongoing?: string;
  faq: SolutionFaq[];
};

export const solutions: Solution[] = [
  // ───────────────────────────── WEBSITES ─────────────────────────────
  {
    slug: "custom-website",
    code: "WEB-01",
    category: "Websites",
    title: "Custom Hand-Coded Website",
    tagline: "A fast, professional website built from scratch around your business — no templates, no page builders.",
    problem:
      "You either have no website, or one built on a template that looks like everyone else's, loads slowly on mobile and doesn't bring in enquiries.",
    outcomes: [
      "A site that loads in around a second on mobile and looks sharp on every screen",
      "Clear calls to action — call, WhatsApp, quote form — on every page",
      "Better Google visibility thanks to clean code, fast loading and proper SEO structure",
      "No monthly platform fee and no plugins to break — you own the code",
    ],
    howItWorks: [
      { title: "Discovery call", text: "We talk about your business, customers and what the site must achieve." },
      { title: "Structure & copy", text: "I plan the pages and help write clear, persuasive text." },
      { title: "Design & build", text: "I design and hand-code the site, sharing previews as I go." },
      { title: "Launch", text: "Domain, HTTPS, analytics and Google Search Console connected — you go live." },
    ],
    included: [
      "Custom, mobile-first design",
      "Up to 5–10 pages depending on package",
      "Contact form, click-to-call and WhatsApp buttons",
      "On-page SEO, sitemap and schema markup",
      "Hosting setup with free SSL certificate",
      "Basic training on how to request changes",
    ],
    idealFor: ["Trades & local services", "Recovery & transport companies", "Salons & clinics", "Shops & start-ups"],
    tools: ["HTML / CSS / JavaScript", "Next.js", "Vercel or Netlify hosting", "Google Search Console"],
    example:
      "A recovery company in North London gets SOS call buttons, a WhatsApp button with GPS location and a review system — drivers can request help in seconds from their phone.",
    timeline: "2–4 weeks",
    priceFrom: "£495",
    ongoing: "Hosting is usually free or a few pounds a month; domain from ~£10/year",
    faq: [
      { q: "Can I update the site myself?", a: "Yes — I can add a simple admin panel for things like prices, services or reviews, or you can send changes and I'll do them quickly." },
      { q: "Do I need to provide text and photos?", a: "It helps, but I can write the copy with you and use quality stock images until you have your own." },
    ],
  },
  {
    slug: "website-redesign",
    code: "WEB-02",
    category: "Websites",
    title: "Website Redesign & Speed Upgrade",
    tagline: "Turn an outdated, slow website into a modern one that actually converts visitors.",
    problem:
      "Your site looks dated, is slow on phones, or gets visitors who leave without calling. Customers judge your business by it in seconds.",
    outcomes: [
      "Modern look that builds trust at first glance",
      "Much faster load times — better for customers and for Google",
      "Clear structure that guides visitors to call, book or ask for a quote",
      "Your existing Google rankings protected with proper redirects",
    ],
    howItWorks: [
      { title: "Audit", text: "I test speed, mobile layout, SEO and conversion points and send you a short report." },
      { title: "Plan", text: "We agree what to keep, what to rewrite and what to add." },
      { title: "Rebuild", text: "New design and clean code, built alongside your live site." },
      { title: "Switch over", text: "Seamless go-live with redirects so you don't lose rankings." },
    ],
    included: [
      "Free speed & SEO audit before we start",
      "New responsive design",
      "Content migration and rewrite where needed",
      "301 redirects from old URLs",
      "Before/after speed comparison",
    ],
    idealFor: ["Businesses on old WordPress/Wix sites", "Sites that don't work well on mobile", "Brands that have outgrown their first website"],
    tools: ["Lighthouse / PageSpeed Insights", "Next.js or plain HTML/CSS/JS", "Google Search Console"],
    example:
      "A local shop's 6-second WordPress site is rebuilt as a lightweight hand-coded site that loads in about a second, with a clear 'Call now' button on mobile.",
    timeline: "2–4 weeks",
    priceFrom: "£395",
    faq: [
      { q: "Will I lose my Google rankings?", a: "Not if it's done properly — I map every old page to its new address with permanent redirects." },
      { q: "Can you keep my domain and email?", a: "Yes. Your domain and email stay exactly as they are; only the website changes." },
    ],
  },
  {
    slug: "online-shop",
    code: "WEB-03",
    category: "Websites",
    title: "Online Shop & Card Payments",
    tagline: "Sell products or services online with secure card payments, without paying a big platform every month.",
    problem:
      "You want to take orders and payments online, but marketplace fees and monthly e-commerce subscriptions eat into your margin.",
    outcomes: [
      "Customers can browse, order and pay 24/7",
      "Secure card, Apple Pay and Google Pay payments",
      "Automatic order confirmation emails to you and the customer",
      "Simple product management from your own admin panel",
    ],
    howItWorks: [
      { title: "Catalogue", text: "We organise products, prices, photos and delivery options." },
      { title: "Checkout", text: "Secure payments are connected through Stripe." },
      { title: "Orders", text: "Each order triggers emails and lands in your admin panel or a Google Sheet." },
      { title: "Fulfil", text: "You ship or deliver; the customer gets updates automatically." },
    ],
    included: [
      "Product pages and categories",
      "Stripe checkout (cards, Apple Pay, Google Pay)",
      "Order notification emails",
      "Admin panel for products and orders",
      "Delivery / collection options",
    ],
    idealFor: ["Local shops going online", "Makers & small brands", "Service businesses selling packages or vouchers"],
    tools: ["Next.js", "Stripe Checkout", "Supabase or Firebase", "Resend / Brevo email"],
    example:
      "A neighbourhood shop starts taking click-and-collect orders online; each order pings the owner's phone and appears in a simple dashboard.",
    timeline: "4–8 weeks",
    priceFrom: "£1,495",
    ongoing: "Stripe card fees per transaction (no monthly platform fee)",
    faq: [
      { q: "Do I need a Stripe account?", a: "Yes — I help you set it up. Payments go straight into your bank account." },
      { q: "Can I sell services or bookings too?", a: "Yes — deposits, packages, gift vouchers and paid bookings all work the same way." },
    ],
  },

  // ─────────────────────────── AUTOMATIONS ───────────────────────────
  {
    slug: "instant-enquiry-alerts",
    code: "AUT-01",
    category: "Automations",
    title: "Instant Enquiry Alerts",
    tagline: "Every enquiry from your website lands on your phone in seconds — and is saved automatically.",
    problem:
      "Enquiries sit in an inbox you rarely check. By the time you reply, the customer has already called a competitor.",
    outcomes: [
      "You see new enquiries within seconds, wherever you are",
      "The customer gets an instant 'we've received your message' reply",
      "Every lead is saved in a Google Sheet — nothing gets lost",
      "Faster replies mean more jobs won",
    ],
    howItWorks: [
      { title: "Customer submits", text: "A visitor fills in the contact or quote form on your site." },
      { title: "Instant alert", text: "You get a notification by email, Telegram or WhatsApp with all the details." },
      { title: "Auto-reply", text: "The customer automatically receives a friendly confirmation email." },
      { title: "Logged", text: "The enquiry is added as a new row in your Google Sheet." },
    ],
    included: [
      "Form connected to your phone notifications",
      "Branded auto-reply email to the customer",
      "Google Sheet lead log with date, name, contact and message",
      "Spam protection",
    ],
    idealFor: ["Any business that gets enquiries through its website", "Owners who work on the road"],
    tools: ["Google Sheets + Apps Script", "Email (Resend / Brevo)", "Telegram or WhatsApp Business API"],
    example:
      "A plumber gets a Telegram message with the customer's name, postcode and problem while on another job, and calls back within minutes.",
    timeline: "2–5 days",
    priceFrom: "£150",
    faq: [
      { q: "Can it go to WhatsApp?", a: "Yes. Telegram and email are free and instant; WhatsApp alerts use the official WhatsApp Business API, which has small per-message costs." },
      { q: "Does it work with my existing site?", a: "Usually yes — I can connect most existing forms, or add a new one." },
    ],
  },
  {
    slug: "online-booking",
    code: "AUT-02",
    category: "Automations",
    title: "Online Booking & Reminders",
    tagline: "Customers book themselves in 24/7, and automatic reminders cut no-shows.",
    problem:
      "You spend hours on the phone arranging appointments, and every no-show is lost income.",
    outcomes: [
      "Customers book available slots any time, even at night",
      "Automatic confirmations and reminders reduce no-shows",
      "Bookings appear straight in your Google Calendar",
      "Optional deposits to secure appointments",
    ],
    howItWorks: [
      { title: "Set availability", text: "You decide services, durations and working hours." },
      { title: "Customer books", text: "They pick a service and a free slot on your website." },
      { title: "Confirmed", text: "Both of you receive a confirmation; the booking lands in your calendar." },
      { title: "Reminded", text: "The customer gets a reminder 24 hours before — with a reschedule link." },
    ],
    included: [
      "Booking page or widget on your website",
      "Google Calendar sync",
      "Confirmation and reminder emails",
      "Optional deposit or full payment via Stripe",
    ],
    idealFor: ["Salons & barbers", "Clinics & therapists", "Driving instructors & tutors", "Car services & valeting"],
    tools: ["Cal.com or custom booking", "Google Calendar API", "Stripe", "Email / SMS"],
    example:
      "A beauty salon lets clients book treatments online; a reminder goes out the day before and no-shows drop noticeably.",
    timeline: "1–2 weeks",
    priceFrom: "£250",
    faq: [
      { q: "Can I block out holidays?", a: "Yes — you can block days or hours any time from your calendar." },
      { q: "Can reminders be sent by text?", a: "Yes, SMS reminders can be added; they cost a few pence per message." },
    ],
  },
  {
    slug: "review-requests",
    code: "AUT-03",
    category: "Automations",
    title: "Automatic Google Review Requests",
    tagline: "Collect more 5-star Google reviews without having to remember to ask.",
    problem:
      "Happy customers rarely leave reviews unless you ask — and asking every single one is easy to forget.",
    outcomes: [
      "A steady flow of new Google reviews",
      "Higher ranking in Google Maps and local search",
      "More trust from new customers comparing you to competitors",
      "Unhappy feedback comes to you privately first, so you can fix it",
    ],
    howItWorks: [
      { title: "Job done", text: "You mark a job complete (one tap, or automatically after a booking)." },
      { title: "Friendly ask", text: "The customer gets a short message asking how it went." },
      { title: "Smart routing", text: "Happy? They're sent straight to your Google review page. Not happy? The feedback comes to you." },
      { title: "Show off", text: "Optionally, your best reviews appear on your website." },
    ],
    included: [
      "Review request email/SMS template in your tone",
      "Direct link to your Google review form",
      "Private feedback form for issues",
      "Optional reviews section on your website",
    ],
    idealFor: ["Any local business that depends on Google Maps", "Trades, salons, garages, restaurants"],
    tools: ["Google Business Profile", "Google Sheets + Apps Script", "Email / SMS"],
    example:
      "After each recovery job, the driver taps 'done' and the customer receives a thank-you message with a one-click link to leave a review.",
    timeline: "3–5 days",
    priceFrom: "£150",
    faq: [
      { q: "Is this allowed by Google?", a: "Yes — asking customers for honest reviews is fine. I don't use fake reviews or incentives, which Google forbids." },
    ],
  },
  {
    slug: "instant-quote-calculator",
    code: "AUT-04",
    category: "Automations",
    title: "Instant Quote Calculator",
    tagline: "Visitors get a price estimate in seconds — you get a qualified lead with all the details.",
    problem:
      "You lose time on calls with people who just want a rough price, and visitors leave because they can't see one.",
    outcomes: [
      "Visitors get an instant estimate based on your own pricing rules",
      "You receive the lead with every detail you need to confirm the job",
      "Fewer time-wasting calls, more ready-to-buy customers",
    ],
    howItWorks: [
      { title: "Questions", text: "The visitor answers a few simple questions (size, distance, extras…)." },
      { title: "Estimate", text: "Your pricing rules calculate an instant price range." },
      { title: "Capture", text: "To get the full quote, they leave their contact details." },
      { title: "Follow up", text: "You get an alert and the lead is saved automatically." },
    ],
    included: [
      "Custom multi-step quote form",
      "Your pricing logic built in",
      "Instant alert + lead log",
      "Optional 'book now' or 'pay deposit' step",
    ],
    idealFor: ["Recovery & towing", "Removals & man-and-van", "Cleaning companies", "Builders & decorators"],
    tools: ["JavaScript", "Google Maps distance (optional)", "Google Sheets", "Email"],
    example:
      "A towing company's calculator asks vehicle type and pick-up/drop-off postcodes and shows an instant price range before the customer calls.",
    timeline: "1–2 weeks",
    priceFrom: "£295",
    faq: [
      { q: "What if a job is more complex?", a: "The calculator shows a range and you always confirm the final price — it's an estimate, not a contract." },
    ],
  },
  {
    slug: "payment-links-invoices",
    code: "AUT-05",
    category: "Automations",
    title: "Payment Links & Automatic Invoices",
    tagline: "Get paid faster with one-tap payment links and invoices that send themselves.",
    problem:
      "Chasing payments, writing invoices by hand and waiting for bank transfers slows your cash flow.",
    outcomes: [
      "Send a payment link by text or WhatsApp — customers pay by card in seconds",
      "Invoices and receipts are created and emailed automatically",
      "Automatic reminders for unpaid invoices",
      "Every payment logged for your bookkeeping",
    ],
    howItWorks: [
      { title: "Create", text: "Enter the amount and customer — or it's created from a booking or quote." },
      { title: "Send", text: "A secure payment link goes out by SMS, WhatsApp or email." },
      { title: "Paid", text: "The customer pays by card, Apple Pay or Google Pay." },
      { title: "Receipt", text: "Invoice/receipt emailed automatically; payment logged in your sheet." },
    ],
    included: [
      "Stripe account setup and branding",
      "Payment link generator (simple admin page)",
      "Automatic invoices and receipts",
      "Overdue payment reminders",
    ],
    idealFor: ["Trades & call-out services", "Freelancers & consultants", "Anyone paid after the job"],
    tools: ["Stripe Payment Links / Invoicing", "Next.js admin page", "Email"],
    example:
      "After a breakdown recovery, the driver sends a payment link to the customer's phone and is paid before leaving the roadside.",
    timeline: "3–7 days",
    priceFrom: "£250",
    ongoing: "Stripe fees per transaction only",
    faq: [
      { q: "Is it secure?", a: "Payments are handled by Stripe — card details never touch your site or your phone." },
    ],
  },
  {
    slug: "lead-tracker-crm",
    code: "AUT-06",
    category: "Automations",
    title: "Lead Tracker & Automatic Follow-Ups",
    tagline: "A simple mini-CRM that tracks every enquiry and follows up for you.",
    problem:
      "Leads come from your website, phone, WhatsApp and Facebook — some get forgotten and never followed up.",
    outcomes: [
      "All leads in one place with status: new, quoted, won, lost",
      "Automatic follow-up emails if a quote hasn't been answered",
      "A clear view of where your customers come from",
      "No more lost jobs because someone forgot to call back",
    ],
    howItWorks: [
      { title: "Capture", text: "Leads from every source are added automatically or with one tap." },
      { title: "Track", text: "Each lead moves through simple stages in a sheet or dashboard." },
      { title: "Follow up", text: "If there's no reply after X days, a polite follow-up goes out." },
      { title: "Report", text: "A weekly summary shows new leads, wins and sources." },
    ],
    included: [
      "Google Sheet or custom dashboard CRM",
      "Website form integration",
      "Automated follow-up email sequence",
      "Weekly summary email",
    ],
    idealFor: ["Businesses sending quotes", "Agencies & consultants", "Any team handling more than a few enquiries a week"],
    tools: ["Google Sheets + Apps Script", "Make / n8n", "Email"],
    example:
      "A builder sends 15 quotes a month; unanswered ones get a follow-up after 3 days, and the weekly report shows Google brings the best jobs.",
    timeline: "1–2 weeks",
    priceFrom: "£295",
    faq: [
      { q: "Do I need to pay for CRM software?", a: "No — most small businesses are perfectly served by a well-built Google Sheet with automations." },
    ],
  },
  {
    slug: "ai-website-assistant",
    code: "AUT-07",
    category: "Automations",
    title: "AI Website Assistant",
    tagline: "A 24/7 assistant on your website that answers questions and captures leads, trained on your business.",
    problem:
      "Customers ask the same questions all day — prices, opening hours, areas covered — and out of hours nobody answers.",
    outcomes: [
      "Instant answers to common questions, day and night",
      "Visitors are guided to book, call or request a quote",
      "Conversations that need you are handed over with the customer's details",
      "Fewer repetitive calls and messages",
    ],
    howItWorks: [
      { title: "Train", text: "I load your services, prices, FAQs and policies into the assistant." },
      { title: "Chat", text: "Visitors ask questions in a chat window on your site." },
      { title: "Guide", text: "The assistant answers and points them to booking, quote or call." },
      { title: "Hand-over", text: "Anything it can't answer is sent to you with contact details." },
    ],
    included: [
      "Branded chat widget",
      "Knowledge base from your content",
      "Lead capture and hand-over alerts",
      "Guardrails so it only talks about your business",
    ],
    idealFor: ["Businesses with lots of repeat questions", "Out-of-hours enquiries", "Busy owners"],
    tools: ["Claude AI (Anthropic API)", "Next.js", "Email / Telegram alerts"],
    example:
      "At 11pm a driver asks whether a recovery company covers the M25 and how much it costs; the assistant answers and passes their number to the owner.",
    timeline: "1–2 weeks",
    priceFrom: "£395",
    ongoing: "AI usage costs, typically a few pounds a month for a small business",
    faq: [
      { q: "Will it make things up?", a: "It's instructed to answer only from your information and to hand over to you when unsure." },
    ],
  },
  {
    slug: "gps-callout-button",
    code: "AUT-08",
    category: "Automations",
    title: "Emergency Call-Out & GPS Location Button",
    tagline: "Customers in trouble send their exact location to you in one tap.",
    problem:
      "Stranded customers struggle to explain where they are, which wastes time and causes mistakes.",
    outcomes: [
      "One-tap WhatsApp message with the customer's live GPS location",
      "Big SOS call buttons that work perfectly on mobile",
      "Faster dispatch and fewer wrong addresses",
    ],
    howItWorks: [
      { title: "Tap", text: "The customer taps 'Send my location' on your website." },
      { title: "Locate", text: "Their phone shares GPS coordinates (with permission)." },
      { title: "Send", text: "WhatsApp opens with a ready message and a Google Maps link." },
      { title: "Dispatch", text: "You see exactly where they are and head straight there." },
    ],
    included: [
      "SOS call and WhatsApp buttons",
      "GPS location sharing with Google Maps link",
      "Mobile-first design for stressful situations",
    ],
    idealFor: ["Vehicle recovery & roadside assistance", "Locksmiths", "Emergency plumbers & electricians"],
    tools: ["Browser Geolocation API", "WhatsApp click-to-chat", "JavaScript"],
    example:
      "Built for Sayah Recovery: drivers on the motorway send their exact location by WhatsApp in a single tap.",
    timeline: "2–4 days",
    priceFrom: "£150",
    faq: [
      { q: "Does the customer need an app?", a: "No — it works from the website in any phone browser, and uses the WhatsApp they already have." },
    ],
  },
  {
    slug: "email-follow-ups",
    code: "AUT-09",
    category: "Automations",
    title: "Email Sequences & Newsletters",
    tagline: "Stay in touch with past customers automatically and bring them back.",
    problem:
      "Most of your customers buy once and forget you, even though repeat business is the cheapest business.",
    outcomes: [
      "Automatic welcome, thank-you and 'time for your next service' emails",
      "Simple newsletters with offers and news",
      "More repeat customers and referrals",
    ],
    howItWorks: [
      { title: "Collect", text: "Customers join your list from the website or after a job (with consent)." },
      { title: "Trigger", text: "Events like a purchase or a date start the right email." },
      { title: "Send", text: "Pre-written, branded emails go out on schedule." },
      { title: "Measure", text: "You see opens, clicks and bookings that came from email." },
    ],
    included: [
      "Email platform setup (GDPR-compliant)",
      "Branded email template",
      "2–4 automated emails written for you",
      "Sign-up form on your website",
    ],
    idealFor: ["Garages (MOT/service reminders)", "Salons", "Shops", "Any business with repeat customers"],
    tools: ["Brevo / Mailchimp / Resend", "Website forms"],
    example:
      "A garage sends an automatic MOT reminder 11 months after each visit, with a link to book online.",
    timeline: "1 week",
    priceFrom: "£195",
    ongoing: "Email platforms are free for small lists",
    faq: [
      { q: "Is this GDPR-compliant?", a: "Yes — only people who opt in are emailed, and every email has an unsubscribe link." },
    ],
  },
  {
    slug: "custom-admin-dashboard",
    code: "AUT-10",
    category: "Automations",
    title: "Custom Admin Panel & Dashboard",
    tagline: "Manage your prices, bookings, reviews or orders from one simple screen you own.",
    problem:
      "Your information is spread across notebooks, spreadsheets and messages, and changing anything on your website means asking a developer.",
    outcomes: [
      "Update prices, services, photos or reviews yourself in seconds",
      "See bookings, orders or leads in one place",
      "Secure login — only you and your team get access",
    ],
    howItWorks: [
      { title: "Map", text: "We list what you want to manage and who needs access." },
      { title: "Build", text: "I build a clean, password-protected admin area." },
      { title: "Connect", text: "It links to your website, so changes go live instantly." },
      { title: "Train", text: "A short walkthrough so you're confident using it." },
    ],
    included: [
      "Secure login",
      "Editable content sections",
      "Lists of messages, bookings or orders",
      "Mobile-friendly so it works on your phone",
    ],
    idealFor: ["Businesses that change prices or offers often", "Teams handling bookings or orders"],
    tools: ["Next.js", "Firebase or Supabase", "Vercel"],
    example:
      "A recovery company moderates customer reviews from a private admin page before they appear on the website.",
    timeline: "1–3 weeks",
    priceFrom: "£495",
    faq: [
      { q: "Can my staff have their own logins?", a: "Yes — different users and permission levels can be set up." },
    ],
  },

  // ───────────────────────────── GROWTH ─────────────────────────────
  {
    slug: "local-seo",
    code: "GRW-01",
    category: "Growth",
    title: "Local SEO & Google Business Profile",
    tagline: "Get found when people nearby search for what you do.",
    problem:
      "Customers search 'recovery near me' or 'salon in [town]' — and your competitors show up instead of you.",
    outcomes: [
      "A complete, optimised Google Business Profile",
      "Website pages targeting your services and areas",
      "Better position in Google Maps and local results",
      "Monthly visibility you can actually measure",
    ],
    howItWorks: [
      { title: "Audit", text: "I check your current visibility, profile and competitors." },
      { title: "Fix", text: "Profile, categories, photos, services and website SEO are optimised." },
      { title: "Build", text: "Area and service pages, schema markup and citations." },
      { title: "Track", text: "Search Console and profile insights show what's improving." },
    ],
    included: [
      "Google Business Profile setup or optimisation",
      "On-page SEO and schema markup",
      "Service and area landing pages",
      "Search Console + analytics setup",
    ],
    idealFor: ["Any business serving a local area"],
    tools: ["Google Business Profile", "Google Search Console", "Schema.org"],
    example:
      "A cleaning company adds pages for each town it covers and starts appearing in local searches it never showed up for.",
    timeline: "1–2 weeks setup, results build over 1–3 months",
    priceFrom: "£195",
    faq: [
      { q: "How fast will I rank?", a: "Profile fixes can help within weeks; website SEO usually takes 1–3 months to show clear results. Nobody can honestly guarantee #1." },
    ],
  },
  {
    slug: "website-care-plan",
    code: "GRW-02",
    category: "Growth",
    title: "Website Care Plan",
    tagline: "Updates, fixes, backups and small changes — handled every month, so you don't have to think about it.",
    problem:
      "Websites need small changes and occasional fixes, and finding someone reliable every time is a hassle.",
    outcomes: [
      "Small changes done quickly when you need them",
      "Your site monitored so problems are caught early",
      "Forms and automations checked so leads keep flowing",
      "A monthly summary of what was done",
    ],
    howItWorks: [
      { title: "Monitor", text: "Uptime and forms are checked automatically." },
      { title: "Request", text: "Send changes by WhatsApp or email whenever you like." },
      { title: "Update", text: "Changes and fixes are done within the agreed time." },
      { title: "Report", text: "You get a short monthly summary." },
    ],
    included: [
      "Uptime monitoring",
      "Monthly time for content changes",
      "Form & automation health checks",
      "Priority bug fixing",
    ],
    idealFor: ["Businesses without in-house tech help", "Sites with automations that must keep working"],
    tools: ["Uptime monitoring", "Vercel / Netlify", "Google Search Console"],
    example:
      "A salon sends a new price list by WhatsApp; it's live on the website the same day.",
    timeline: "Ongoing, monthly",
    priceFrom: "£39 / month",
    faq: [
      { q: "Is there a contract?", a: "No long lock-in — monthly, cancel any time." },
    ],
  },
];

export const solutionCategories: SolutionCategory[] = ["Websites", "Automations", "Growth"];

export function getSolution(slug: string) {
  return solutions.find((s) => s.slug === slug);
}
