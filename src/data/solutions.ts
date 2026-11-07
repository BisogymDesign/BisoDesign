/**
 * Solution guides — one structured, printable info sheet per thing BisoDesign can build.
 * Shown at /solutions and /solutions/<slug>. Edit prices, timelines and wording here.
 *
 * Each guide has:
 *  - flow:    the automation drawn as an animated diagram (trigger → steps → result)
 *  - preview: exactly what the client / owner will see (phone, email, sheet, calendar…)
 */

import type { FlowNode } from "@/components/AutomationFlow";
import type { Preview } from "@/components/PreviewMock";

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
  flow: FlowNode[];
  preview: Preview;
  previewCaption: string;
  howItWorks: SolutionStep[];
  included: string[];
  idealFor: string[];
  tools: string[];
  example: string;
  timeline: string;
  priceFrom: string;
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
    tagline:
      "A website that works as hard as you do — built from scratch around your customers, so the right people call you instead of the next name on Google.",
    problem:
      "You know your work is good. But online, you look the same as everyone else — or worse, you're invisible. Every day, customers who would have loved working with you choose someone else simply because their website made it easier to say yes.",
    outcomes: [
      "Customers understand what you do, why you're different and how to reach you — in under five seconds",
      "Loads in around a second on a phone, so impatient visitors don't leave",
      "Built to be found on Google with clean code and proper SEO structure",
      "Yours for good: no monthly platform fee, no plugins to break, you own the code",
    ],
    flow: [
      { icon: "search", label: "Customer searches", sub: "Finds you on Google or Maps" },
      { icon: "layout", label: "Lands on your site", sub: "Fast, clear, trustworthy" },
      { icon: "check", label: "Instantly convinced", sub: "Reviews, prices, proof" },
      { icon: "phone", label: "Calls or enquires", sub: "One tap, any page" },
    ],
    preview: { kind: "site", template: "electrician-trades" },
    previewCaption: "One of eight industry templates — every site is designed specifically around your business.",
    howItWorks: [
      { title: "Free discovery call", text: "We talk about your business, your customers and what success looks like for you." },
      { title: "Structure & words", text: "I plan every page and help write copy that sounds like you on your best day." },
      { title: "Design & build", text: "I design and hand-code your site, sharing previews so you're never in the dark." },
      { title: "Launch & support", text: "Domain, HTTPS, analytics and Google connected — and I'm still here afterwards." },
    ],
    included: [
      "Custom, mobile-first design — no templates bought off a shelf",
      "Up to 5–10 pages depending on package",
      "Contact form, click-to-call and WhatsApp buttons",
      "On-page SEO, sitemap and schema markup",
      "Hosting setup with free SSL certificate",
      "A walkthrough so you feel confident with it",
    ],
    idealFor: ["Trades & local services", "Recovery & transport", "Salons & clinics", "Shops & start-ups"],
    tools: ["HTML / CSS / JavaScript", "Next.js", "Vercel or Netlify", "Google Search Console"],
    example:
      "Built for Sayah Recovery in North London: SOS call buttons, a WhatsApp button that shares the driver's GPS location, and a moderated review system — so stranded drivers reach them in seconds.",
    timeline: "2–4 weeks",
    priceFrom: "£495",
    ongoing: "Hosting is usually free or a few pounds a month; domain from ~£10/year",
    faq: [
      { q: "Can I update the site myself?", a: "Yes — I can add a simple admin panel for prices, services or reviews. Or just message me and I'll do it for you." },
      { q: "I don't have text or photos ready. Is that a problem?", a: "Not at all. I'll help you write it and use quality images until you have your own. Most clients start exactly where you are." },
    ],
  },
  {
    slug: "website-redesign",
    code: "WEB-02",
    category: "Websites",
    title: "Website Redesign & Speed Upgrade",
    tagline:
      "Your business has grown — your website should show it. Turn a slow, dated site into one you're proud to send people to.",
    problem:
      "Maybe you've stopped sharing your link because you're a little embarrassed by it. It's slow on phones, looks dated, and visitors leave without calling. Customers judge your whole business by it in seconds — and right now it's underselling you.",
    outcomes: [
      "A modern look that matches the quality of your actual work",
      "Dramatically faster pages — better for customers and for Google",
      "A clear path on every page that guides visitors to call, book or ask for a quote",
      "Your existing Google rankings protected with careful redirects",
    ],
    flow: [
      { icon: "search", label: "Free audit", sub: "Speed, SEO, mobile, conversion" },
      { icon: "layout", label: "New design", sub: "Built beside your live site" },
      { icon: "zap", label: "Fast rebuild", sub: "Clean, lightweight code" },
      { icon: "check", label: "Seamless switch", sub: "No downtime, rankings kept" },
    ],
    preview: { kind: "site", template: "garage-mot" },
    previewCaption: "Example of a redesigned garage website: clear prices, online booking and trust up front.",
    howItWorks: [
      { title: "Audit", text: "I test speed, mobile layout, SEO and conversion points and send you a plain-English report." },
      { title: "Plan together", text: "We decide what to keep, what to rewrite and what's missing." },
      { title: "Rebuild", text: "New design and clean code, built alongside your live site — nothing breaks." },
      { title: "Switch over", text: "A smooth go-live with redirects so you don't lose the rankings you've earned." },
    ],
    included: [
      "Free speed & SEO audit before we start",
      "New responsive design",
      "Content migration and rewrite where needed",
      "301 redirects from every old URL",
      "Before/after speed comparison",
    ],
    idealFor: ["Old WordPress or Wix sites", "Sites that struggle on mobile", "Brands that have outgrown their first site"],
    tools: ["Lighthouse / PageSpeed Insights", "Next.js or plain HTML/CSS/JS", "Google Search Console"],
    example:
      "A local shop's slow, plugin-heavy site is rebuilt as a lightweight hand-coded site, with a 'Call now' button that's always on screen on mobile.",
    timeline: "2–4 weeks",
    priceFrom: "£395",
    faq: [
      { q: "Will I lose my Google rankings?", a: "Not if it's done properly — and I do it properly. Every old page is mapped to its new address with permanent redirects." },
      { q: "Can I keep my domain and email?", a: "Yes. Your domain and email stay exactly as they are; only the website changes." },
    ],
  },
  {
    slug: "online-shop",
    code: "WEB-03",
    category: "Websites",
    title: "Online Shop & Card Payments",
    tagline:
      "Sell while you sleep — a shop that takes orders and payments 24/7, without a big platform taking a slice of every sale.",
    problem:
      "Your customers would happily buy from you online, but marketplaces take a cut, monthly e-commerce subscriptions add up, and taking orders by phone or DM eats your evenings.",
    outcomes: [
      "Customers can browse, order and pay any time — even while you're closed",
      "Secure card, Apple Pay and Google Pay payments straight to your bank",
      "Automatic order confirmations for you and the customer",
      "Simple product and order management from your own admin panel",
    ],
    flow: [
      { icon: "cart", label: "Customer orders", sub: "Browses & adds to basket" },
      { icon: "card", label: "Pays securely", sub: "Card, Apple Pay, Google Pay" },
      { icon: "bell", label: "You're notified", sub: "Order details on your phone" },
      { icon: "mail", label: "Confirmation sent", sub: "Customer gets a receipt" },
    ],
    preview: { kind: "site", template: "local-shop" },
    previewCaption: "The 'Corner' template: category tiles, delivery cut-off and secure checkout badges.",
    howItWorks: [
      { title: "Catalogue", text: "We organise products, prices, photos and delivery options together." },
      { title: "Checkout", text: "Secure payments are connected through Stripe — money goes straight to you." },
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
    idealFor: ["Local shops going online", "Makers & small brands", "Services sold as packages or vouchers"],
    tools: ["Next.js", "Stripe Checkout", "Supabase or Firebase", "Resend / Brevo email"],
    example:
      "A neighbourhood deli starts taking click-and-collect orders online; each order pings the owner's phone and appears in a simple dashboard.",
    timeline: "4–8 weeks",
    priceFrom: "£1,495",
    ongoing: "Stripe card fees per transaction — no monthly platform fee",
    faq: [
      { q: "Do I need a Stripe account?", a: "Yes, and I'll set it up with you. Payments go straight into your bank account." },
      { q: "Can I sell services or bookings too?", a: "Yes — deposits, packages, gift vouchers and paid bookings all work the same way." },
    ],
  },

  // ─────────────────────────── AUTOMATIONS ───────────────────────────
  {
    slug: "instant-enquiry-alerts",
    code: "AUT-01",
    category: "Automations",
    title: "Instant Enquiry Alerts",
    tagline:
      "Never lose another job because you saw the message too late. Every enquiry reaches your phone in seconds — and the customer hears back instantly.",
    problem:
      "You're on a job, driving, or finally sitting down with your family. Meanwhile an enquiry sits unread in an inbox. By the time you see it, they've already booked someone who answered first. It's not that you don't care — you just can't be everywhere.",
    outcomes: [
      "You see every new enquiry within seconds, wherever you are",
      "The customer instantly gets a warm 'we've got your message' reply — they feel looked after",
      "Every lead is saved in a Google Sheet automatically — nothing slips through",
      "Replying first wins more jobs, without you working longer hours",
    ],
    flow: [
      { icon: "form", label: "Form submitted", sub: "Customer enquires on your site" },
      { icon: "bell", label: "Phone alert", sub: "Telegram / WhatsApp / email" },
      { icon: "mail", label: "Auto-reply", sub: "Customer reassured instantly" },
      { icon: "sheet", label: "Lead saved", sub: "New row in Google Sheet" },
    ],
    preview: {
      kind: "chat",
      app: "Telegram · BisoBot",
      contact: "New enquiries",
      messages: [
        { from: "in", time: "10:14", text: "🔔 New enquiry — website\n👤 Sarah Collins\n📞 07700 900123\n📍 SW11\n💬 Boiler making a banging noise, can someone come this week?" },
        { from: "in", time: "10:14", text: "✅ Auto-reply sent to Sarah\n📊 Saved to Leads sheet (row 48)" },
        { from: "out", time: "10:16", text: "Calling her now 👍" },
      ],
    },
    previewCaption: "What lands on your phone seconds after someone fills in your form.",
    howItWorks: [
      { title: "Customer submits", text: "A visitor fills in the contact or quote form on your website." },
      { title: "Instant alert", text: "You get the full details on your phone — Telegram, WhatsApp or email." },
      { title: "Auto-reply", text: "The customer receives a friendly confirmation, so they don't keep shopping around." },
      { title: "Logged", text: "The enquiry is added to your Google Sheet with date, contact and message." },
    ],
    included: [
      "Form connected to your phone notifications",
      "Branded auto-reply email in your tone of voice",
      "Google Sheet lead log",
      "Spam protection",
    ],
    idealFor: ["Any business getting enquiries online", "Owners who work on the road", "Teams sharing leads"],
    tools: ["Google Sheets + Apps Script", "Email (Resend / Brevo)", "Telegram or WhatsApp Business API"],
    example:
      "A plumber gets a Telegram message with the customer's name, postcode and problem while on another job — and calls back within minutes, before anyone else does.",
    timeline: "2–5 days",
    priceFrom: "£150",
    faq: [
      { q: "Can it go to WhatsApp?", a: "Yes. Telegram and email are free and instant; WhatsApp alerts use the official WhatsApp Business API, which has small per-message costs." },
      { q: "Does it work with my existing website?", a: "Usually, yes — I can connect most existing forms, or add a new one." },
    ],
  },
  {
    slug: "online-booking",
    code: "AUT-02",
    category: "Automations",
    title: "Online Booking & Reminders",
    tagline:
      "Let customers book themselves in at any hour — and let friendly reminders quietly protect you from no-shows.",
    problem:
      "Your phone rings while your hands are full. You play phone tag to find a time. Then someone simply doesn't turn up, and that slot — and that income — is gone. It's exhausting, and it isn't why you started your business.",
    outcomes: [
      "Customers book available slots 24/7 — including the 11pm decision-makers",
      "Automatic confirmations and reminders mean fewer no-shows",
      "Every booking appears in your Google Calendar instantly",
      "Optional deposits so your time is respected",
    ],
    flow: [
      { icon: "globe", label: "Picks a slot", sub: "On your website, any time" },
      { icon: "calendar", label: "Calendar updated", sub: "Synced to Google Calendar" },
      { icon: "mail", label: "Confirmation", sub: "Sent to both of you" },
      { icon: "clock", label: "Reminder", sub: "24 hours before" },
    ],
    preview: {
      kind: "calendar",
      title: "This week — bookings",
      days: [
        { day: "Mon", slots: [{ time: "09:00", label: "Lash lift", state: "booked" }, { time: "11:00", state: "free" }, { time: "14:00", label: "Facial", state: "booked" }] },
        { day: "Tue", slots: [{ time: "10:00", label: "Gel nails", state: "booked" }, { time: "12:30", label: "New · Emma", state: "new" }, { time: "15:00", state: "free" }] },
        { day: "Wed", slots: [{ time: "09:30", state: "free" }, { time: "13:00", label: "Brows", state: "booked" }, { time: "16:00", label: "Lash lift", state: "booked" }] },
        { day: "Thu", slots: [{ time: "10:00", label: "Facial", state: "booked" }, { time: "12:00", state: "free" }, { time: "17:30", label: "New · Jade", state: "new" }] },
        { day: "Fri", slots: [{ time: "09:00", label: "Gel nails", state: "booked" }, { time: "11:30", label: "Brows", state: "booked" }, { time: "14:00", state: "free" }] },
      ],
    },
    previewCaption: "Your week fills itself — new online bookings glow green the moment they arrive.",
    howItWorks: [
      { title: "Set availability", text: "You choose your services, durations and working hours — you stay in control." },
      { title: "Customer books", text: "They pick a service and a free slot on your website in seconds." },
      { title: "Confirmed", text: "Both of you get a confirmation and the booking lands in your calendar." },
      { title: "Reminded", text: "The customer gets a reminder the day before, with an easy reschedule link." },
    ],
    included: [
      "Booking page or widget on your website",
      "Google Calendar sync",
      "Confirmation and reminder emails",
      "Optional deposit or full payment via Stripe",
    ],
    idealFor: ["Salons & barbers", "Clinics & therapists", "Instructors & tutors", "Garages & valeting"],
    tools: ["Cal.com or custom booking", "Google Calendar API", "Stripe", "Email / SMS"],
    example:
      "A beauty salon lets clients book online; a reminder goes out the day before with a reschedule link, so a cancelled slot can be rebooked instead of lost.",
    timeline: "1–2 weeks",
    priceFrom: "£250",
    faq: [
      { q: "Can I block out holidays?", a: "Of course — block days or hours any time from your calendar." },
      { q: "Can reminders be sent by text?", a: "Yes, SMS reminders can be added; they cost a few pence per message." },
    ],
  },
  {
    slug: "review-requests",
    code: "AUT-03",
    category: "Automations",
    title: "Automatic Google Review Requests",
    tagline:
      "Your happy customers want to help you — they just forget. This makes saying 'thank you' with a 5-star review effortless for them.",
    problem:
      "You do great work, but your Google profile doesn't show it. Happy customers rarely leave reviews unless asked, and asking every single one at the end of a long day is easy to forget. Meanwhile, competitors with more reviews get the calls.",
    outcomes: [
      "A steady flow of genuine Google reviews",
      "Higher visibility in Google Maps and local search",
      "New customers trust you before they've even spoken to you",
      "Unhappy feedback comes to you privately first, so you can make it right",
    ],
    flow: [
      { icon: "check", label: "Job completed", sub: "One tap, or automatic" },
      { icon: "chat", label: "Friendly ask", sub: "'How did we do?'" },
      { icon: "star", label: "Happy → Google", sub: "Unhappy → private feedback" },
      { icon: "chart", label: "More reviews", sub: "Better ranking & trust" },
    ],
    preview: {
      kind: "chat",
      app: "Text message",
      contact: "RoadRescue 24/7",
      messages: [
        { from: "in", time: "18:40", text: "Hi James, thanks for trusting us today 🙏 How did we do? Reply 1–5 ⭐" },
        { from: "out", time: "18:52", text: "5" },
        { from: "in", time: "18:52", text: "That means a lot! Would you mind sharing it on Google? It takes 20 seconds and really helps a small business 👉 g.page/r/roadrescue" },
      ],
    },
    previewCaption: "A warm, human message — happy customers are guided straight to your Google review page.",
    howItWorks: [
      { title: "Job done", text: "You mark a job complete with one tap — or it happens automatically after a booking." },
      { title: "Friendly ask", text: "The customer gets a short, personal message asking how it went." },
      { title: "Smart routing", text: "Happy customers go straight to Google; anyone unhappy reaches you privately first." },
      { title: "Show it off", text: "Optionally, your best reviews appear on your website automatically." },
    ],
    included: [
      "Review request message in your tone of voice",
      "Direct link to your Google review form",
      "Private feedback form for issues",
      "Optional reviews section on your website",
    ],
    idealFor: ["Any business that depends on Google Maps", "Trades, salons, garages, restaurants"],
    tools: ["Google Business Profile", "Google Sheets + Apps Script", "Email / SMS"],
    example:
      "After each recovery job, the driver taps 'done' and the customer receives a thank-you with a one-click link to leave a review — while the relief is still fresh.",
    timeline: "3–5 days",
    priceFrom: "£150",
    faq: [
      { q: "Is this allowed by Google?", a: "Yes — asking customers for honest reviews is fine. I never use fake reviews or incentives, which Google forbids and UK law prohibits." },
    ],
  },
  {
    slug: "instant-quote-calculator",
    code: "AUT-04",
    category: "Automations",
    title: "Instant Quote Calculator",
    tagline:
      "Answer 'how much?' in seconds, day or night — and receive ready-to-book leads with every detail you need.",
    problem:
      "Half your calls are people who 'just want a rough price'. You give up your time, then never hear back. Meanwhile, visitors who can't see a price simply leave — uncertainty feels like risk.",
    outcomes: [
      "Visitors get an instant estimate based on your own pricing rules",
      "You receive the lead with every detail needed to confirm the job",
      "Fewer time-wasting calls, more customers who are ready to go",
    ],
    flow: [
      { icon: "form", label: "A few questions", sub: "Size, distance, extras" },
      { icon: "calculator", label: "Instant estimate", sub: "Your pricing rules" },
      { icon: "user", label: "Details captured", sub: "To get the full quote" },
      { icon: "bell", label: "You're alerted", sub: "Lead saved automatically" },
    ],
    preview: {
      kind: "quote",
      title: "Get your price in 30 seconds",
      fields: [
        { label: "Vehicle", value: "Car / small van" },
        { label: "Pick-up", value: "Croydon CR0" },
        { label: "Drop-off", value: "Garage in Sutton SM1" },
      ],
      result: "£95 – £120",
      note: "Fixed price confirmed by phone · no hidden fees",
    },
    previewCaption: "A towing company's calculator: the visitor sees a fair price range before they even pick up the phone.",
    howItWorks: [
      { title: "Questions", text: "The visitor answers a few simple questions about the job." },
      { title: "Estimate", text: "Your pricing rules calculate an instant, honest price range." },
      { title: "Capture", text: "To get the full quote, they leave their contact details." },
      { title: "Follow up", text: "You get an alert and the lead is saved for you automatically." },
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
      "A cleaning company's calculator asks property size and type of clean and shows a price instantly — then offers available dates to book.",
    timeline: "1–2 weeks",
    priceFrom: "£295",
    faq: [
      { q: "What if a job is more complex?", a: "The calculator shows a range and you always confirm the final price — it's an honest estimate, not a contract." },
    ],
  },
  {
    slug: "payment-links-invoices",
    code: "AUT-05",
    category: "Automations",
    title: "Payment Links & Automatic Invoices",
    tagline:
      "Get paid before you've left the driveway. One-tap payment links and invoices that send — and chase — themselves.",
    problem:
      "Writing invoices at night, waiting for bank transfers, awkwardly chasing people who 'forgot'. You did the work — getting paid shouldn't be a second job.",
    outcomes: [
      "Send a payment link by text or WhatsApp — customers pay by card in seconds",
      "Invoices and receipts created and emailed automatically",
      "Polite automatic reminders for anything unpaid — no awkward conversations",
      "Every payment logged, ready for your bookkeeping",
    ],
    flow: [
      { icon: "user", label: "Job finished", sub: "Amount & customer entered" },
      { icon: "send", label: "Link sent", sub: "SMS, WhatsApp or email" },
      { icon: "card", label: "Paid by card", sub: "Apple Pay, Google Pay" },
      { icon: "mail", label: "Receipt & log", sub: "Automatic, every time" },
    ],
    preview: { kind: "payment", business: "RoadRescue 24/7", customer: "James", amount: "£95.00", item: "Breakdown recovery" },
    previewCaption: "What your customer receives — they pay securely in a couple of taps.",
    howItWorks: [
      { title: "Create", text: "Enter the amount and customer — or it's created from a booking or quote." },
      { title: "Send", text: "A secure payment link goes out by text, WhatsApp or email." },
      { title: "Paid", text: "The customer pays by card, Apple Pay or Google Pay." },
      { title: "Receipt", text: "Invoice and receipt are emailed automatically; payment logged for you." },
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
      { q: "Is it secure?", a: "Payments are handled by Stripe — card details never touch your website or your phone." },
    ],
  },
  {
    slug: "lead-tracker-crm",
    code: "AUT-06",
    category: "Automations",
    title: "Lead Tracker & Automatic Follow-Ups",
    tagline:
      "Every enquiry tracked, every quote followed up — so the jobs you've already earned don't quietly slip away.",
    problem:
      "Leads come in from your website, phone, WhatsApp and Facebook. Some get a quote, some get forgotten. Without a system, good customers fall through the cracks — not because you didn't care, but because there's only one of you.",
    outcomes: [
      "All leads in one clear place: new, quoted, won, lost",
      "Polite automatic follow-ups when a quote hasn't been answered",
      "A weekly summary showing where your best customers come from",
      "Peace of mind that nobody is waiting on you",
    ],
    flow: [
      { icon: "form", label: "Lead arrives", sub: "Website, phone, social" },
      { icon: "sheet", label: "Tracked", sub: "Status in your mini-CRM" },
      { icon: "repeat", label: "Follow-up", sub: "Automatic after 3 days" },
      { icon: "chart", label: "Weekly report", sub: "Wins, sources, pipeline" },
    ],
    preview: {
      kind: "dashboard",
      title: "Leads — this month",
      stats: [
        { label: "New leads", value: "34" },
        { label: "Quotes sent", value: "21" },
        { label: "Won", value: "12" },
      ],
      items: [
        { title: "Kitchen rewire — Priya K.", meta: "Website · today 09:12", status: "new" },
        { title: "EV charger — Tom B.", meta: "Quoted 3 days ago · follow-up sent", status: "waiting" },
        { title: "Fuse board — Anna L.", meta: "Google · booked for Thu", status: "done" },
      ],
    },
    previewCaption: "Your pipeline at a glance — follow-ups happen automatically in the background.",
    howItWorks: [
      { title: "Capture", text: "Leads from every source are added automatically or with one tap." },
      { title: "Track", text: "Each lead moves through simple stages you can see at a glance." },
      { title: "Follow up", text: "No reply after a few days? A polite follow-up goes out for you." },
      { title: "Report", text: "A weekly summary shows new leads, wins and where they came from." },
    ],
    included: [
      "Google Sheet or custom dashboard CRM",
      "Website form integration",
      "Automated follow-up sequence",
      "Weekly summary email",
    ],
    idealFor: ["Businesses sending quotes", "Consultants & agencies", "Any team with a few enquiries a week or more"],
    tools: ["Google Sheets + Apps Script", "Make / n8n", "Email"],
    example:
      "A builder sends 15 quotes a month; unanswered ones get a friendly follow-up after 3 days, and the weekly report shows which marketing actually brings work.",
    timeline: "1–2 weeks",
    priceFrom: "£295",
    faq: [
      { q: "Do I need to pay for CRM software?", a: "Usually not — most small businesses are perfectly served by a well-built Google Sheet with automations." },
    ],
  },
  {
    slug: "ai-website-assistant",
    code: "AUT-07",
    category: "Automations",
    title: "AI Website Assistant",
    tagline:
      "A patient, knowledgeable assistant on your website 24/7 — answering questions the way you would, and passing you the customers who are ready.",
    problem:
      "The same questions, all day: prices, areas, opening hours. Out of hours, nobody answers — and a question left unanswered is often a customer lost.",
    outcomes: [
      "Instant, accurate answers to common questions, day and night",
      "Visitors are gently guided to book, call or request a quote",
      "Anything that needs you is handed over with the customer's details",
      "Fewer repetitive calls, more time for real work",
    ],
    flow: [
      { icon: "chat", label: "Visitor asks", sub: "'Do you cover Watford?'" },
      { icon: "ai", label: "AI answers", sub: "From your own information" },
      { icon: "user", label: "Details captured", sub: "Name, number, need" },
      { icon: "bell", label: "Handed to you", sub: "Ready-to-book lead" },
    ],
    preview: {
      kind: "chat",
      app: "Website assistant · online",
      contact: "RoadRescue Assistant",
      typing: true,
      messages: [
        { from: "out", time: "23:08", text: "Hi, do you cover the M25 near Watford? How much roughly?" },
        { from: "in", time: "23:08", text: "Yes, we cover the M25 including Watford, 24/7 🚛 Car recovery usually starts from £79. Are you safe and off the carriageway right now?" },
        { from: "out", time: "23:09", text: "Yes on the hard shoulder" },
      ],
    },
    previewCaption: "At 11pm, the assistant answers, reassures and collects details — then alerts you.",
    howItWorks: [
      { title: "Train", text: "I load your services, prices, FAQs and policies into the assistant." },
      { title: "Chat", text: "Visitors ask questions in a friendly chat window on your site." },
      { title: "Guide", text: "It answers and points them to booking, a quote or a call." },
      { title: "Hand-over", text: "Anything it can't answer comes straight to you with contact details." },
    ],
    included: [
      "Branded chat widget",
      "Knowledge base from your content",
      "Lead capture and hand-over alerts",
      "Guardrails so it only talks about your business",
    ],
    idealFor: ["Lots of repeat questions", "Out-of-hours enquiries", "Busy owners"],
    tools: ["Claude AI (Anthropic API)", "Next.js", "Email / Telegram alerts"],
    example:
      "A restaurant's assistant answers allergy, parking and opening-hour questions instantly, and sends larger party enquiries straight to the manager.",
    timeline: "1–2 weeks",
    priceFrom: "£395",
    ongoing: "AI usage costs, typically a few pounds a month for a small business",
    faq: [
      { q: "Will it make things up?", a: "It's instructed to answer only from your information and to hand over to you when it isn't sure." },
    ],
  },
  {
    slug: "gps-callout-button",
    code: "AUT-08",
    category: "Automations",
    title: "Emergency Call-Out & GPS Location Button",
    tagline:
      "When a customer is stressed and lost, one tap sends you exactly where they are. Calm for them, faster for you.",
    problem:
      "Stranded customers are anxious and often don't know where they are. Minutes are lost on the phone trying to work out a location — and mistakes send your driver the wrong way.",
    outcomes: [
      "One-tap WhatsApp message with the customer's exact GPS location",
      "Big SOS buttons that work perfectly on any phone",
      "Faster dispatch, fewer wrong addresses, calmer customers",
    ],
    flow: [
      { icon: "phone", label: "Customer taps", sub: "'Send my location'" },
      { icon: "pin", label: "GPS captured", sub: "With their permission" },
      { icon: "chat", label: "WhatsApp opens", sub: "Message + Maps link ready" },
      { icon: "send", label: "You dispatch", sub: "Straight to the spot" },
    ],
    preview: {
      kind: "chat",
      app: "WhatsApp",
      contact: "RoadRescue 24/7",
      messages: [
        { from: "out", time: "02:14", text: "🚨 I need recovery. My location:\n📍 maps.google.com/?q=51.6912,-0.3854\nCar: blue Ford Focus" },
        { from: "in", time: "02:15", text: "Got you, Daniel. Driver is 25 mins away. Stay behind the barrier — we'll call when close 👍" },
      ],
    },
    previewCaption: "Built for Sayah Recovery — the exact message a stranded driver sends in one tap.",
    howItWorks: [
      { title: "Tap", text: "The customer taps 'Send my location' on your website." },
      { title: "Locate", text: "Their phone shares GPS coordinates (with permission)." },
      { title: "Send", text: "WhatsApp opens with a ready message and a Google Maps link." },
      { title: "Dispatch", text: "You see exactly where they are and head straight there." },
    ],
    included: [
      "SOS call and WhatsApp buttons",
      "GPS location sharing with Google Maps link",
      "Mobile-first design for stressful moments",
    ],
    idealFor: ["Vehicle recovery & roadside", "Locksmiths", "Emergency plumbers & electricians"],
    tools: ["Browser Geolocation API", "WhatsApp click-to-chat", "JavaScript"],
    example:
      "Built for Sayah Recovery: drivers on the motorway send their exact location by WhatsApp in a single tap.",
    timeline: "2–4 days",
    priceFrom: "£150",
    faq: [
      { q: "Does the customer need an app?", a: "No — it works from your website in any phone browser and uses the WhatsApp they already have." },
    ],
  },
  {
    slug: "email-follow-ups",
    code: "AUT-09",
    category: "Automations",
    title: "Email Sequences & Newsletters",
    tagline:
      "Stay in your customers' minds without lifting a finger — the right message, at the right moment, bringing them back.",
    problem:
      "Most customers buy once and simply forget you — not because they weren't happy, but because life is busy. Repeat business is the easiest business, and it's slipping away quietly.",
    outcomes: [
      "Automatic welcome, thank-you and 'time for your next visit' emails",
      "Simple newsletters with news and offers",
      "More repeat customers and referrals, with no extra effort",
    ],
    flow: [
      { icon: "user", label: "Customer joins", sub: "With consent, after a visit" },
      { icon: "clock", label: "Right moment", sub: "e.g. 11 months later" },
      { icon: "mail", label: "Email sent", sub: "Personal and branded" },
      { icon: "calendar", label: "They rebook", sub: "One click back to you" },
    ],
    preview: {
      kind: "email",
      from: "Pitstop Autocare",
      to: "mark.t@email.com",
      subject: "Mark, your MOT is due in 4 weeks 🚗",
      lines: [
        "Hi Mark,",
        "Just a friendly heads-up — your Ford Fiesta's MOT is due on 14 March.",
        "Book now and we'll collect the car from your door for free. Same honest price as last year: £54.85.",
      ],
      cta: "Book my MOT",
    },
    previewCaption: "A reminder that arrives at exactly the right time — and turns into a booking.",
    howItWorks: [
      { title: "Collect", text: "Customers join your list from the website or after a job — with consent." },
      { title: "Trigger", text: "Events like a purchase or a date start the right email automatically." },
      { title: "Send", text: "Pre-written, branded emails go out on schedule." },
      { title: "Measure", text: "You see opens, clicks and the bookings they bring in." },
    ],
    included: [
      "Email platform setup (GDPR-compliant)",
      "Branded email template",
      "2–4 automated emails written for you",
      "Sign-up form on your website",
    ],
    idealFor: ["Garages (MOT reminders)", "Salons", "Shops", "Any business with repeat customers"],
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
    tagline:
      "Your business at a glance, on one simple screen you own — change prices, see bookings and manage reviews in seconds.",
    problem:
      "Your information lives in notebooks, spreadsheets and message threads. Changing a price on your website means waiting for someone else. You deserve to feel in control.",
    outcomes: [
      "Update prices, services, photos or reviews yourself, instantly",
      "See bookings, orders or leads in one place",
      "Secure login — only you and your team get access",
    ],
    flow: [
      { icon: "lock", label: "You log in", sub: "Secure, from your phone" },
      { icon: "tool", label: "Make a change", sub: "Prices, reviews, offers" },
      { icon: "zap", label: "Live instantly", sub: "Website updates itself" },
      { icon: "chart", label: "See the numbers", sub: "Leads, bookings, orders" },
    ],
    preview: {
      kind: "dashboard",
      title: "Admin — overview",
      stats: [
        { label: "Reviews pending", value: "3" },
        { label: "Messages", value: "8" },
        { label: "Bookings", value: "17" },
      ],
      items: [
        { title: "★★★★★ 'Arrived in 30 minutes…'", meta: "Review · awaiting approval", status: "new" },
        { title: "Price list updated", meta: "Live on website · 2 min ago", status: "done" },
        { title: "Message from Laura P.", meta: "Contact form · reply needed", status: "waiting" },
      ],
    },
    previewCaption: "A private admin area: approve reviews, edit prices and read messages from any device.",
    howItWorks: [
      { title: "Map", text: "We list what you want to manage and who needs access." },
      { title: "Build", text: "I build a clean, password-protected admin area." },
      { title: "Connect", text: "It links to your website, so changes go live instantly." },
      { title: "Train", text: "A short walkthrough so you feel completely confident using it." },
    ],
    included: ["Secure login", "Editable content sections", "Lists of messages, bookings or orders", "Mobile-friendly"],
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
    tagline:
      "Be the name people see when someone nearby searches for exactly what you do.",
    problem:
      "Customers search 'recovery near me' or 'salon in Clapham' — and businesses that aren't as good as you show up first, simply because Google understands them better.",
    outcomes: [
      "A complete, optimised Google Business Profile",
      "Website pages built around your services and areas",
      "Better visibility in Google Maps and local results",
      "Clear monthly numbers so you can see it working",
    ],
    flow: [
      { icon: "search", label: "Audit", sub: "You vs local competitors" },
      { icon: "tool", label: "Optimise", sub: "Profile, pages, schema" },
      { icon: "pin", label: "Show up locally", sub: "Maps & local results" },
      { icon: "chart", label: "Track growth", sub: "Calls, clicks, searches" },
    ],
    preview: {
      kind: "serp",
      query: "vehicle recovery near me",
      results: [
        { name: "RoadRescue 24/7", rating: "4.9", reviews: "187", meta: "Open 24 hours · 1.2 mi", you: true },
        { name: "City Tow Services", rating: "4.3", reviews: "52", meta: "Open 24 hours · 2.8 mi" },
        { name: "AB Recovery Ltd", rating: "4.1", reviews: "19", meta: "Closes 8pm · 3.4 mi" },
      ],
    },
    previewCaption: "The goal: your business at the top of the local map pack, with the reviews to back it up.",
    howItWorks: [
      { title: "Audit", text: "I check your current visibility, profile and competitors." },
      { title: "Fix", text: "Profile, categories, photos, services and on-site SEO are optimised." },
      { title: "Build", text: "Area and service pages, schema markup and local listings." },
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
      "A cleaning company adds pages for each town it covers and starts appearing in local searches it was invisible for before.",
    timeline: "1–2 weeks setup, results build over 1–3 months",
    priceFrom: "£195",
    faq: [
      { q: "How fast will I rank?", a: "Profile fixes can help within weeks; website SEO usually takes 1–3 months to show clear results. Anyone who guarantees #1 isn't being honest with you." },
    ],
  },
  {
    slug: "website-care-plan",
    code: "GRW-02",
    category: "Growth",
    title: "Website Care Plan",
    tagline:
      "Someone who's always got your back. Updates, fixes and small changes handled every month — so your website is one less thing to worry about.",
    problem:
      "Websites need small changes and the occasional fix. Finding someone reliable every time is a hassle — and a broken contact form can cost you leads for weeks before anyone notices.",
    outcomes: [
      "Small changes done quickly whenever you need them",
      "Your site and forms monitored, so problems are caught early",
      "Automations checked so leads keep flowing",
      "A short monthly summary — full transparency",
    ],
    flow: [
      { icon: "shield", label: "Monitoring", sub: "Uptime & forms, 24/7" },
      { icon: "chat", label: "You message", sub: "WhatsApp or email" },
      { icon: "tool", label: "Done for you", sub: "Changes & fixes" },
      { icon: "check", label: "Monthly report", sub: "What was done" },
    ],
    preview: {
      kind: "dashboard",
      title: "Care plan — November",
      stats: [
        { label: "Uptime", value: "99.9%" },
        { label: "Changes done", value: "6" },
        { label: "Forms tested", value: "4/4" },
      ],
      items: [
        { title: "New winter prices published", meta: "Requested by WhatsApp · same day", status: "done" },
        { title: "Contact form test", meta: "Weekly automated check · passed", status: "done" },
        { title: "Add Christmas opening hours", meta: "Scheduled for 1 Dec", status: "waiting" },
      ],
    },
    previewCaption: "Your monthly care report — clear, simple and transparent.",
    howItWorks: [
      { title: "Monitor", text: "Uptime and forms are checked automatically." },
      { title: "Request", text: "Send changes by WhatsApp or email whenever you like." },
      { title: "Update", text: "Changes and fixes are done within the agreed time." },
      { title: "Report", text: "You get a short summary every month." },
    ],
    included: ["Uptime monitoring", "Monthly time for content changes", "Form & automation health checks", "Priority bug fixing"],
    idealFor: ["Businesses without in-house tech help", "Sites with automations that must keep working"],
    tools: ["Uptime monitoring", "Vercel / Netlify", "Google Search Console"],
    example: "A salon sends a new price list by WhatsApp; it's live on the website the same day.",
    timeline: "Ongoing, monthly",
    priceFrom: "£39 / month",
    faq: [{ q: "Is there a contract?", a: "No long lock-in — monthly, cancel any time." }],
  },
];

export const solutionCategories: SolutionCategory[] = ["Websites", "Automations", "Growth"];

export function getSolution(slug: string) {
  return solutions.find((s) => s.slug === slug);
}
