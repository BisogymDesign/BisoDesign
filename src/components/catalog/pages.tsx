import Link from "next/link";
import type { CSSProperties, ReactNode } from "react";

/*
 * The pages of the BisoDesign catalogue, in reading order (index = page number).
 * Every size is in cqw (% of the page width), so a page looks identical on a
 * phone and in a two-page spread on a big screen. All brands shown inside the
 * mockups are fictional concept designs.
 */

const q = (n: number) => `${n}cqw`;
const INK = "#1b1722";
const MUTED = "#5b5464";
const ORANGE = "#c2410c";
const GRADIENT = "linear-gradient(135deg, #ff5f1f, #c04cfd 60%, #8b5cf6)";

// ───────────────────────── Page furniture ─────────────────────────

function Paper({ children, dark, folio, chapter }: { children: ReactNode; dark?: boolean; folio?: number; chapter?: string }) {
  return (
    <div className={`paper${dark ? " paper-dark" : ""}`}>
      <div className="relative z-10 flex h-full flex-col" style={{ padding: `${q(7)} ${q(7)} ${q(4.5)}` }}>
        <div className="flex min-h-0 flex-1 flex-col">{children}</div>
        {folio !== undefined && (
          <div
            className="flex items-center justify-between font-label uppercase"
            style={{
              fontSize: q(2.1),
              letterSpacing: "0.18em",
              color: dark ? "#a8a29e" : "#8a8193",
              paddingTop: q(2.4),
              marginTop: q(2),
              borderTop: `1px solid ${dark ? "#ffffff1a" : "#1b172214"}`,
            }}
          >
            <span>BisoDesign · {chapter}</span>
            <span>{String(folio).padStart(2, "0")}</span>
          </div>
        )}
      </div>
    </div>
  );
}

function Kicker({ children, dark }: { children: ReactNode; dark?: boolean }) {
  return (
    <p className="font-label font-bold uppercase" style={{ fontSize: q(2.4), letterSpacing: "0.22em", color: dark ? "#67e8f9" : ORANGE }}>
      {children}
    </p>
  );
}

function Title({ children, size = 7.2 }: { children: ReactNode; size?: number }) {
  return (
    <h2 className="font-heading font-extrabold" style={{ fontSize: q(size), lineHeight: 1.06, marginTop: q(2), letterSpacing: "-0.02em" }}>
      {children}
    </h2>
  );
}

function Lead({ children, dark }: { children: ReactNode; dark?: boolean }) {
  return <p style={{ fontSize: q(3.3), lineHeight: 1.5, color: dark ? "#d6d0c9" : MUTED, marginTop: q(3) }}>{children}</p>;
}

function Tick({ size = 4.2 }: { size?: number }) {
  return (
    <span
      style={{
        flex: "none",
        width: q(size),
        height: q(size),
        borderRadius: 99,
        background: GRADIENT,
        color: "#fff",
        display: "grid",
        placeItems: "center",
        fontSize: q(size * 0.55),
        fontWeight: 800,
      }}
    >
      ✓
    </span>
  );
}

function Checks({ items }: { items: string[] }) {
  return (
    <ul style={{ marginTop: q(4), display: "grid", gap: q(2.3) }}>
      {items.map((t) => (
        <li key={t} className="flex items-start" style={{ gap: q(2.2), fontSize: q(3.1), lineHeight: 1.35 }}>
          <Tick />
          <span style={{ paddingTop: q(0.3) }}>{t}</span>
        </li>
      ))}
    </ul>
  );
}

function Meta({ ideal, price }: { ideal: string; price: string }) {
  return (
    <div className="mt-auto" style={{ paddingTop: q(3) }}>
      <p style={{ fontSize: q(2.7), lineHeight: 1.45, color: MUTED }}>
        <b style={{ color: INK }}>Ideal for:</b> {ideal}
      </p>
      <span
        className="inline-block font-label font-bold"
        style={{ marginTop: q(2.6), fontSize: q(2.9), padding: `${q(1.4)} ${q(3.4)}`, borderRadius: 99, background: INK, color: "#fff7ed", letterSpacing: "0.04em" }}
      >
        {price}
      </span>
    </div>
  );
}

function Chips({ items, style }: { items: string[]; style?: CSSProperties }) {
  return (
    <div className="flex flex-wrap" style={{ gap: q(1.5), ...style }}>
      {items.map((t) => (
        <span
          key={t}
          style={{ fontSize: q(2.3), fontWeight: 600, padding: `${q(1)} ${q(2.2)}`, borderRadius: 99, background: "#fff", border: "1px solid #1b172218", color: INK }}
        >
          {t}
        </span>
      ))}
    </div>
  );
}

// ───────────────────────── Device mockups ─────────────────────────

function Browser({ url, children, style, dark }: { url: string; children: ReactNode; style?: CSSProperties; dark?: boolean }) {
  return (
    <div
      style={{
        borderRadius: q(2),
        overflow: "hidden",
        background: dark ? "#0f1115" : "#fff",
        boxShadow: "0 3cqw 6cqw -3cqw rgba(30,20,10,.5)",
        border: "1px solid #1b172226",
        ...style,
      }}
    >
      <div className="flex items-center" style={{ gap: q(0.9), padding: `${q(1.2)} ${q(1.8)}`, background: "#1b1722" }}>
        {["#ff5f57", "#febc2e", "#28c840"].map((c) => (
          <span key={c} style={{ width: q(1.3), height: q(1.3), borderRadius: 99, background: c }} />
        ))}
        <span
          className="truncate"
          style={{ marginLeft: q(1.4), flex: 1, background: "#ffffff14", color: "#ffffffaa", borderRadius: q(0.8), padding: `${q(0.35)} ${q(1.4)}`, fontSize: q(1.55) }}
        >
          🔒 {url}
        </span>
      </div>
      {children}
    </div>
  );
}

function Phone({ children, style, light }: { children: ReactNode; style?: CSSProperties; light?: boolean }) {
  return (
    <div style={{ background: "#0b0b0d", borderRadius: q(5), padding: q(1.1), boxShadow: "0 3cqw 6cqw -2cqw rgba(30,20,10,.55)", ...style }}>
      <div className="relative h-full overflow-hidden" style={{ borderRadius: q(4), background: light ? "#fff" : "#0f1115", color: light ? INK : "#f5f5f5" }}>
        <div style={{ position: "absolute", top: q(1), left: "50%", transform: "translateX(-50%)", width: "34%", height: q(2), borderRadius: 99, background: "#000", zIndex: 5 }} />
        {children}
      </div>
    </div>
  );
}

type PinKind = "available" | "busy" | "offline" | "job" | "me" | "pickup" | "drop";
type Pin = { x: number; y: number; kind: PinKind };

function PinMark({ x, y, kind }: Pin) {
  if (kind === "me") {
    return (
      <g>
        <circle cx={x} cy={y} r="6" fill="#2563eb" opacity=".2">
          <animate attributeName="r" values="3;9;3" dur="2.2s" repeatCount="indefinite" />
          <animate attributeName="opacity" values=".35;0;.35" dur="2.2s" repeatCount="indefinite" />
        </circle>
        <circle cx={x} cy={y} r="2.6" fill="#2563eb" stroke="#fff" strokeWidth="1.2" />
      </g>
    );
  }
  if (kind === "pickup" || kind === "drop" || kind === "job") {
    const col = kind === "pickup" ? "#16a34a" : kind === "drop" ? "#1b1722" : "#e11d48";
    return (
      <g>
        {kind === "job" && (
          <circle cx={x} cy={y - 5} r="5" fill="none" stroke="#e11d48" strokeWidth=".8">
            <animate attributeName="r" values="4;10;4" dur="1.8s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="1;0;1" dur="1.8s" repeatCount="indefinite" />
          </circle>
        )}
        <path d={`M${x} ${y} L${x - 3} ${y - 5} A3.6 3.6 0 1 1 ${x + 3} ${y - 5} Z`} fill={col} stroke="#fff" strokeWidth=".8" />
        <circle cx={x} cy={y - 6.2} r="1.3" fill="#fff" />
      </g>
    );
  }
  const col = kind === "available" ? "#22c55e" : kind === "busy" ? "#f97316" : "#9ca3af";
  return (
    <g>
      <circle cx={x} cy={y} r="3.3" fill={col} stroke="#fff" strokeWidth="1" />
      <rect x={x - 1.5} y={y - 1} width="3" height="2" rx=".4" fill="#fff" />
    </g>
  );
}

function MiniMap({
  pins = [],
  route,
  dark,
  style,
  pinScale = 1,
}: {
  pins?: Pin[];
  route?: [number, number][];
  dark?: boolean;
  style?: CSSProperties;
  pinScale?: number;
}) {
  const land = dark ? "#171c27" : "#e8edf1";
  const road = dark ? "#283043" : "#ffffff";
  const major = dark ? "#3b4763" : "#fcd58a";
  const water = dark ? "#14304a" : "#b7d9f0";
  const park = dark ? "#18301f" : "#cfe7c8";
  return (
    <svg viewBox="0 0 100 100" preserveAspectRatio="xMidYMid slice" style={{ display: "block", width: "100%", height: "100%", ...style }} aria-hidden>
      <rect width="100" height="100" fill={land} />
      <path d="M-5 72 C 20 60, 35 82, 60 67 S 95 60, 105 52" stroke={water} strokeWidth="7" fill="none" />
      <rect x="6" y="6" width="18" height="12" rx="2" fill={park} />
      <rect x="68" y="76" width="22" height="14" rx="2" fill={park} />
      {[15, 38, 62, 85].map((x) => (
        <line key={`v${x}`} x1={x} y1="0" x2={x} y2="100" stroke={road} strokeWidth="1.5" />
      ))}
      {[22, 45, 90].map((y) => (
        <line key={`h${y}`} x1="0" y1={y} x2="100" y2={y} stroke={road} strokeWidth="1.5" />
      ))}
      <path d="M0 34 L100 12" stroke={major} strokeWidth="3" />
      <path d="M52 0 L46 100" stroke={major} strokeWidth="3" />
      {route && (
        <>
          <polyline points={route.map((p) => p.join(",")).join(" ")} fill="none" stroke="#ffffff" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" opacity=".7" />
          <polyline points={route.map((p) => p.join(",")).join(" ")} fill="none" stroke="#2563eb" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
        </>
      )}
      {pins.map((p, i) => (
        <g key={i} transform={pinScale === 1 ? undefined : `translate(${p.x} ${p.y}) scale(${pinScale}) translate(${-p.x} ${-p.y})`}>
          <PinMark {...p} />
        </g>
      ))}
    </svg>
  );
}

// ───────────────────────── Pages ─────────────────────────

function Cover() {
  return (
    <Paper dark>
      <div className="flex items-center" style={{ gap: q(2.4) }}>
        <span style={{ width: q(6), height: q(6), borderRadius: q(1.6), background: GRADIENT, boxShadow: "0 0 4cqw rgba(192,76,253,.7)" }} />
        <span className="font-label font-bold" style={{ fontSize: q(4.4) }}>
          BisoDesign
        </span>
      </div>
      <div style={{ marginTop: q(17) }}>
        <Kicker dark>Vol. 01 · 2026 edition</Kicker>
        <h1 className="font-heading font-extrabold" style={{ fontSize: q(15), lineHeight: 0.98, marginTop: q(3), letterSpacing: "-0.03em" }}>
          The
          <br />
          <span className="text-gradient">Catalogue</span>
        </h1>
        <p style={{ fontSize: q(3.9), lineHeight: 1.45, color: "#d6d0c9", marginTop: q(5), maxWidth: "88%" }}>
          Websites, online shops, platforms and fleet apps — everything we can build together.
        </p>
      </div>

      {/* collage of things inside */}
      <div className="relative mt-auto" style={{ height: q(36) }} aria-hidden>
        <div style={{ position: "absolute", left: 0, bottom: q(5), width: q(46), height: q(27), transform: "rotate(-7deg)", borderRadius: q(1.8), background: "#fbf7f3", overflow: "hidden", boxShadow: "0 3cqw 5cqw -2cqw #000" }}>
          <div style={{ height: q(3), background: "#1b1722" }} />
          <div style={{ margin: q(2.4), height: q(8), borderRadius: q(1.2), background: "linear-gradient(120deg,#f3d9cf,#d7b49e)" }} />
          <div className="grid grid-cols-3" style={{ gap: q(1.4), margin: `0 ${q(2.4)}` }}>
            {["#efe3f4", "#e8efe1", "#f6e7d2"].map((c) => (
              <div key={c} style={{ height: q(8), borderRadius: q(1), background: c }} />
            ))}
          </div>
        </div>
        <div style={{ position: "absolute", left: q(28), bottom: 0, width: q(40), height: q(28), transform: "rotate(5deg)", borderRadius: q(1.8), background: "#1e1537", overflow: "hidden", boxShadow: "0 3cqw 5cqw -2cqw #000", padding: q(2.4) }}>
          <div className="flex items-end" style={{ gap: q(1.2), height: "100%" }}>
            {[40, 65, 50, 85, 60, 95, 75].map((h, i) => (
              <div key={i} style={{ flex: 1, height: `${h}%`, borderRadius: q(0.6), background: i === 5 ? GRADIENT : "#8b5cf666" }} />
            ))}
          </div>
        </div>
        <div style={{ position: "absolute", right: q(1), bottom: q(2), width: q(17), height: q(33), transform: "rotate(9deg)", borderRadius: q(2.6), background: "#0b0b0d", padding: q(0.8), boxShadow: "0 3cqw 5cqw -2cqw #000" }}>
          <div className="relative h-full overflow-hidden" style={{ borderRadius: q(2) }}>
            <MiniMap dark pins={[{ x: 50, y: 55, kind: "me" }]} />
            <span style={{ position: "absolute", left: "50%", top: q(3), transform: "translateX(-50%)", background: "#22c55e", color: "#04120c", fontSize: q(1.4), fontWeight: 800, padding: `${q(0.4)} ${q(1.2)}`, borderRadius: 99 }}>
              AVAILABLE
            </span>
          </div>
        </div>
      </div>
      <p className="font-label uppercase" style={{ fontSize: q(2.3), letterSpacing: "0.24em", color: "#67e8f9", marginTop: q(3) }}>
        Scroll to open →
      </p>
    </Paper>
  );
}

const CHAPTERS = [
  { n: "01", title: "Online shops", note: "E-commerce that sells 24/7", page: 3 },
  { n: "02", title: "Company websites", note: "Trust at first glance", page: 5 },
  { n: "03", title: "Platforms & portals", note: "Logins, bookings, dashboards", page: 7 },
  { n: "04", title: "Fleet & driver apps", note: "Jobs sent with live location", page: 9 },
  { n: "05", title: "Automations", note: "Admin that does itself", page: 13 },
  { n: "06", title: "How we work", note: "Simple, honest, fixed price", page: 15 },
];

function Contents() {
  return (
    <Paper folio={1} chapter="Contents">
      <Kicker>Inside this catalogue</Kicker>
      <Title size={9}>Contents</Title>
      <div style={{ marginTop: q(6), display: "grid", gap: q(3.6) }}>
        {CHAPTERS.map((c) => (
          <button key={c.n} type="button" data-goto={c.page} className="group flex w-full items-end text-left" style={{ gap: q(2.6) }}>
            <span className="font-heading font-extrabold text-gradient" style={{ fontSize: q(5.6), lineHeight: 1 }}>
              {c.n}
            </span>
            <span>
              <span className="block font-heading font-bold transition-colors group-hover:text-[#c2410c]" style={{ fontSize: q(3.7), lineHeight: 1.1 }}>
                {c.title}
              </span>
              <span className="block" style={{ fontSize: q(2.5), color: MUTED, marginTop: q(0.6) }}>
                {c.note}
              </span>
            </span>
            <span style={{ flex: 1, borderBottom: "1.5px dotted #1b172240", marginBottom: q(1.2) }} />
            <span className="font-label font-bold" style={{ fontSize: q(3), color: MUTED }}>
              {String(c.page).padStart(2, "0")}
            </span>
          </button>
        ))}
      </div>
      <button
        type="button"
        data-goto={16}
        className="mt-auto self-start font-label font-bold uppercase"
        style={{ fontSize: q(2.6), letterSpacing: "0.14em", color: "#fff", background: GRADIENT, padding: `${q(1.8)} ${q(3.6)}`, borderRadius: 99 }}
      >
        Start your project →
      </button>
      <p style={{ fontSize: q(2.4), color: MUTED, marginTop: q(2.4) }}>Tip: tap a chapter to jump straight to it.</p>
    </Paper>
  );
}

function Intro() {
  const tiles = [
    { icon: "⚡", t: "Fast by design", d: "Hand-coded. No page builders, no plugin bloat." },
    { icon: "📱", t: "Mobile-first", d: "Designed for the phone in your customer's hand." },
    { icon: "🎯", t: "Built to convert", d: "Every section leads to one clear next step." },
    { icon: "🔑", t: "Yours to keep", d: "No platform lock-in. You own the code." },
  ];
  return (
    <Paper folio={2} chapter="Before you start">
      <Kicker>Before you start</Kicker>
      <Title>Every design here is a starting point.</Title>
      <Lead>
        These are concept designs that show what&apos;s possible. Your project is planned and designed from scratch
        around your customers — then built in clean, hand-written code.
      </Lead>
      <div className="grid grid-cols-2" style={{ gap: q(2.6), marginTop: q(6) }}>
        {tiles.map((x) => (
          <div key={x.t} style={{ background: "#fff", border: "1px solid #1b172214", borderRadius: q(2.4), padding: q(3.4), boxShadow: "0 1.5cqw 3cqw -2cqw rgba(30,20,10,.3)" }}>
            <span style={{ fontSize: q(6) }}>{x.icon}</span>
            <p className="font-heading font-bold" style={{ fontSize: q(3.3), marginTop: q(1.6) }}>
              {x.t}
            </p>
            <p style={{ fontSize: q(2.6), color: MUTED, marginTop: q(1), lineHeight: 1.4 }}>{x.d}</p>
          </div>
        ))}
      </div>
      <p className="mt-auto font-heading font-bold" style={{ fontSize: q(3.4), lineHeight: 1.35 }}>
        Turn the page — and imagine your business on it. <span className="text-gradient">→</span>
      </p>
    </Paper>
  );
}

// ── Chapter 01 · Online shops ──

function ShopText() {
  return (
    <Paper folio={3} chapter="Online shops">
      <Kicker>Chapter 01 · Online shops</Kicker>
      <Title>Online shops that sell while you sleep.</Title>
      <Lead>A fast, beautiful shop that makes buying effortless — on any phone, at any hour.</Lead>
      <Checks
        items={[
          "Product pages that answer every question",
          "Secure checkout — card, Apple Pay & Google Pay",
          "Stock, orders & discounts in one simple admin",
          "Abandoned-cart reminders sent automatically",
          "Delivery, click & collect and order emails",
          "Built for Google search from day one",
        ]}
      />
      <Meta ideal="boutiques · food & drink producers · makers · local shops going online" price="From £2,095" />
    </Paper>
  );
}

function ShopMockup() {
  const serif = "Georgia, 'Times New Roman', serif";
  const products = [
    { e: "👗", n: "Silk Wrap Dress", p: "£68", c: "#efe3f4" },
    { e: "👜", n: "Leather Tote", p: "£54", c: "#e8efe1" },
    { e: "🧣", n: "Wool Scarf", p: "£28", c: "#f6e7d2" },
  ];
  return (
    <Paper folio={4} chapter="Online shops">
      <Kicker>Concept design · online boutique</Kicker>
      <div className="relative" style={{ marginTop: q(4) }}>
        <Browser url="maisonlune.co.uk">
          <div style={{ background: "#fbf7f3", color: "#2b2220" }}>
            <div className="flex items-center justify-between" style={{ padding: `${q(1.8)} ${q(2.6)}` }}>
              <span style={{ fontFamily: serif, fontSize: q(2.6), letterSpacing: "0.2em" }}>MAISON LUNE</span>
              <span className="flex items-center" style={{ gap: q(2), fontSize: q(1.5), color: "#7a6a64" }}>
                <span>New in</span>
                <span>Dresses</span>
                <span>Bags</span>
                <span style={{ color: "#2b2220", fontWeight: 700 }}>🛍 2</span>
              </span>
            </div>
            <div className="grid grid-cols-[1.2fr_1fr] items-center" style={{ margin: `0 ${q(2.6)}`, padding: q(3), borderRadius: q(1.6), background: "linear-gradient(120deg,#f3d9cf,#e9c6b5 55%,#d7b49e)" }}>
              <div>
                <p style={{ fontSize: q(1.4), letterSpacing: "0.2em", textTransform: "uppercase", color: "#7a4f3e" }}>New season</p>
                <p style={{ fontFamily: serif, fontSize: q(4.4), lineHeight: 1.05, marginTop: q(0.8) }}>The Autumn Edit</p>
                <span className="inline-block" style={{ marginTop: q(1.8), fontSize: q(1.5), background: "#2b2220", color: "#fff", padding: `${q(0.9)} ${q(2)}`, borderRadius: 99 }}>
                  Shop the collection →
                </span>
              </div>
              <div style={{ justifySelf: "end", width: q(15), height: q(15), borderRadius: 99, background: "#fff6", display: "grid", placeItems: "center", fontSize: q(8) }}>🧥</div>
            </div>
            <div className="grid grid-cols-3" style={{ gap: q(1.6), padding: `${q(2.4)} ${q(2.6)} ${q(3)}` }}>
              {products.map((p) => (
                <div key={p.n}>
                  <div style={{ height: q(13), borderRadius: q(1.2), background: p.c, display: "grid", placeItems: "center", fontSize: q(6.5) }}>{p.e}</div>
                  <p style={{ fontSize: q(1.7), fontWeight: 700, marginTop: q(0.9) }}>{p.n}</p>
                  <p style={{ fontSize: q(1.5), color: "#7a6a64" }}>
                    {p.p} <span style={{ color: "#d97706" }}>★★★★★</span>
                  </p>
                </div>
              ))}
            </div>
          </div>
        </Browser>
        <Phone light style={{ position: "absolute", right: q(-1.5), top: q(30), width: q(31), height: q(52) }}>
          <div style={{ padding: `${q(5)} ${q(2.6)} ${q(2.6)}`, color: "#2b2220" }}>
            <p style={{ fontSize: q(2.5), fontWeight: 800 }}>Your bag (2)</p>
            {products.slice(0, 2).map((p) => (
              <div key={p.n} className="flex items-center" style={{ gap: q(1.4), marginTop: q(2) }}>
                <span style={{ width: q(6), height: q(6), borderRadius: q(1), background: p.c, display: "grid", placeItems: "center", fontSize: q(3.4) }}>{p.e}</span>
                <span style={{ flex: 1, fontSize: q(1.7), fontWeight: 600 }}>{p.n}</span>
                <span style={{ fontSize: q(1.7) }}>{p.p}</span>
              </div>
            ))}
            <div className="flex justify-between" style={{ borderTop: "1px solid #0001", marginTop: q(2.4), paddingTop: q(1.8), fontSize: q(2), fontWeight: 800 }}>
              <span>Total</span>
              <span>£122.00</span>
            </div>
            <div style={{ marginTop: q(2.2), background: "#2b2220", color: "#fff", textAlign: "center", fontSize: q(1.8), fontWeight: 700, padding: `${q(1.6)} 0`, borderRadius: 99 }}>
              Checkout securely 🔒
            </div>
            <p style={{ textAlign: "center", fontSize: q(1.4), color: "#7a6a64", marginTop: q(1.4) }}>Apple Pay · Google Pay · Card</p>
          </div>
        </Phone>
      </div>
      <Chips items={["🔒 Secure checkout", "📦 Order tracking", "📊 Sales dashboard", "💌 Cart reminders"]} style={{ marginTop: "auto", maxWidth: "62%" }} />
    </Paper>
  );
}

// ── Chapter 02 · Company websites ──

function CompanyText() {
  return (
    <Paper folio={5} chapter="Company websites">
      <Kicker>Chapter 02 · Company websites</Kicker>
      <Title>Company websites that earn trust in seconds.</Title>
      <Lead>When someone checks you out, your website decides whether they call you — or someone else.</Lead>
      <Checks
        items={[
          "Clear services and exactly who you help",
          "Case studies, team & accreditations that build trust",
          "Quote & contact forms straight to your inbox or CRM",
          "Local SEO pages for every area you cover",
          "News & updates you can edit yourself",
          "Fast, secure and privacy-ready",
        ]}
      />
      <Meta ideal="accountants · builders · haulage & logistics · consultancies · agencies" price="From £495" />
    </Paper>
  );
}

function CompanyMockup() {
  const navy = "#0f2a44";
  const gold = "#d4a24c";
  return (
    <Paper folio={6} chapter="Company websites">
      <Kicker>Concept design · accountancy firm</Kicker>
      <div className="relative" style={{ marginTop: q(4) }}>
        <Browser url="harbourandco.co.uk">
          <div style={{ background: "#fff", color: navy }}>
            <div className="flex items-center justify-between" style={{ padding: `${q(1.8)} ${q(2.6)}`, background: navy, color: "#fff" }}>
              <span className="font-heading" style={{ fontSize: q(2.2), fontWeight: 800, letterSpacing: "0.08em" }}>
                HARBOUR <span style={{ color: gold }}>&amp;</span> CO.
              </span>
              <span className="flex items-center" style={{ gap: q(2), fontSize: q(1.5), color: "#cbd5e1" }}>
                <span>Services</span>
                <span>Team</span>
                <span>Insights</span>
                <span style={{ background: gold, color: navy, fontWeight: 700, padding: `${q(0.7)} ${q(1.6)}`, borderRadius: 99 }}>Book a call</span>
              </span>
            </div>
            <div className="grid grid-cols-[1.3fr_1fr] items-center" style={{ background: navy, color: "#fff", padding: `${q(3)} ${q(2.6)} ${q(4)}` }}>
              <div>
                <p className="font-heading" style={{ fontSize: q(4.6), lineHeight: 1.05, fontWeight: 800 }}>
                  Clear numbers.
                  <br />
                  <span style={{ color: gold }}>Calm decisions.</span>
                </p>
                <p style={{ fontSize: q(1.6), color: "#cbd5e1", marginTop: q(1.4), lineHeight: 1.45 }}>Accounts, tax and advice for growing local businesses.</p>
                <div className="flex" style={{ gap: q(1.2), marginTop: q(2) }}>
                  <span style={{ background: gold, color: navy, fontWeight: 700, fontSize: q(1.5), padding: `${q(0.9)} ${q(1.8)}`, borderRadius: 99 }}>Free consultation</span>
                  <span style={{ border: "1px solid #ffffff55", fontSize: q(1.5), padding: `${q(0.9)} ${q(1.8)}`, borderRadius: 99 }}>Our services</span>
                </div>
              </div>
              <div className="flex items-end justify-end" style={{ gap: q(1), height: q(16) }}>
                {[35, 55, 45, 75, 90].map((h, i) => (
                  <div key={i} style={{ width: q(3.2), height: `${h}%`, borderRadius: q(0.6), background: i === 4 ? gold : "#ffffff30" }} />
                ))}
              </div>
            </div>
            <div className="grid grid-cols-3" style={{ gap: q(1.6), padding: `${q(2.6)} ${q(2.6)} ${q(1.4)}` }}>
              {[
                ["📊", "Accounts & tax"],
                ["💷", "Payroll"],
                ["🧭", "Business advice"],
              ].map(([e, t]) => (
                <div key={t} style={{ border: "1px solid #0f2a4418", borderRadius: q(1.2), padding: q(1.8) }}>
                  <span style={{ fontSize: q(3) }}>{e}</span>
                  <p style={{ fontSize: q(1.7), fontWeight: 700, marginTop: q(0.6) }}>{t}</p>
                  <p style={{ fontSize: q(1.3), color: "#64748b", marginTop: q(0.4) }}>Fixed monthly fee</p>
                </div>
              ))}
            </div>
            <div className="flex items-center" style={{ gap: q(1.4), padding: `${q(1.4)} ${q(2.6)} ${q(3)}` }}>
              {["AH", "RK", "SL"].map((i, k) => (
                <span key={i} style={{ width: q(5), height: q(5), borderRadius: 99, display: "grid", placeItems: "center", fontSize: q(1.6), fontWeight: 800, color: "#fff", background: ["#334155", "#b45309", "#0f766e"][k] }}>
                  {i}
                </span>
              ))}
              <span style={{ fontSize: q(1.6), color: "#475569" }}>Meet the team behind your numbers →</span>
            </div>
          </div>
        </Browser>
        <Phone light style={{ position: "absolute", right: q(-1.5), top: q(37), width: q(30), height: q(50) }}>
          <div style={{ padding: `${q(5)} ${q(2.6)} ${q(2.6)}`, color: navy }}>
            <p className="font-heading" style={{ fontSize: q(2.4), fontWeight: 800, lineHeight: 1.15 }}>Book a free consultation</p>
            {["Your name", "Business name", "What do you need help with?"].map((f) => (
              <div key={f} style={{ marginTop: q(1.6), border: "1px solid #0f2a4426", borderRadius: q(1), padding: `${q(1.3)} ${q(1.4)}`, fontSize: q(1.5), color: "#94a3b8" }}>
                {f}
              </div>
            ))}
            <div style={{ marginTop: q(2), background: navy, color: "#fff", textAlign: "center", fontSize: q(1.7), fontWeight: 700, padding: `${q(1.5)} 0`, borderRadius: 99 }}>Send request →</div>
            <p style={{ fontSize: q(1.3), color: "#64748b", marginTop: q(1.3), textAlign: "center" }}>Goes straight to the team&apos;s inbox</p>
          </div>
        </Phone>
      </div>
      <Chips items={["📞 Click-to-call", "📝 Smart forms", "📍 Local SEO", "⭐ Reviews"]} style={{ marginTop: "auto", maxWidth: "62%" }} />
    </Paper>
  );
}

// ── Chapter 03 · Platforms & portals ──

function PlatformText() {
  return (
    <Paper folio={7} chapter="Platforms & portals">
      <Kicker>Chapter 03 · Platforms & portals</Kicker>
      <Title>Platforms that run your business with you.</Title>
      <Lead>When a website isn&apos;t enough: logins, bookings, payments and dashboards — built around how you actually work.</Lead>
      <Checks
        items={[
          "Client & member logins",
          "Bookings, classes & memberships",
          "Payments, subscriptions & invoices",
          "Live dashboards for you and your team",
          "Roles & permissions — staff see what they need",
          "Connects to the tools you already use",
        ]}
      />
      <Meta ideal="gyms & studios · clinics · training providers · marketplaces · B2B portals" price="Custom quote · fixed before we start" />
    </Paper>
  );
}

function PlatformMockup() {
  const violet = "#6d28d9";
  return (
    <Paper folio={8} chapter="Platforms & portals">
      <Kicker>Concept design · gym & studio platform</Kicker>
      <div className="relative" style={{ marginTop: q(4) }}>
        <Browser url="app.pulsehub.co.uk">
          <div className="grid grid-cols-[17cqw_1fr]" style={{ background: "#f5f3fb", color: INK, minHeight: q(56) }}>
            <div style={{ background: "#1e1537", color: "#e9e5f5", padding: q(1.8) }}>
              <p className="font-heading" style={{ fontSize: q(2), fontWeight: 800 }}>
                Pulse<span style={{ color: "#c084fc" }}>Hub</span>
              </p>
              {["Dashboard", "Bookings", "Members", "Payments", "Messages", "Settings"].map((x, i) => (
                <p key={x} style={{ fontSize: q(1.45), marginTop: q(1.5), padding: `${q(0.6)} ${q(1)}`, borderRadius: q(0.8), background: i === 0 ? "#ffffff1c" : "transparent", color: i === 0 ? "#fff" : "#a99fc7" }}>
                  {x}
                </p>
              ))}
            </div>
            <div style={{ padding: q(2.2) }}>
              <p style={{ fontSize: q(2.1), fontWeight: 800 }}>Good morning, Alex 👋</p>
              <p style={{ fontSize: q(1.3), color: "#6b6480" }}>Here&apos;s your studio today</p>
              <div className="grid grid-cols-3" style={{ gap: q(1.2), marginTop: q(1.6) }}>
                {[
                  ["Bookings today", "18"],
                  ["Active members", "342"],
                  ["This month", "£12.4k"],
                ].map(([l, v]) => (
                  <div key={l} style={{ background: "#fff", borderRadius: q(1), padding: q(1.4), border: "1px solid #6d28d914" }}>
                    <p style={{ fontSize: q(1.2), color: "#6b6480" }}>{l}</p>
                    <p style={{ fontSize: q(2.6), fontWeight: 800, color: violet }}>{v}</p>
                  </div>
                ))}
              </div>
              <div className="flex items-end" style={{ gap: q(0.9), height: q(11), marginTop: q(1.8), background: "#fff", borderRadius: q(1), padding: q(1.4), border: "1px solid #6d28d914" }}>
                {[40, 55, 48, 70, 62, 88, 76].map((h, i) => (
                  <div key={i} style={{ flex: 1, height: `${h}%`, borderRadius: q(0.4), background: i === 5 ? "linear-gradient(180deg,#a855f7,#6d28d9)" : "#ddd3f7" }} />
                ))}
              </div>
              <p style={{ fontSize: q(1.5), fontWeight: 800, marginTop: q(1.8) }}>Today&apos;s sessions</p>
              {[
                ["07:00", "Spin", "14/14", "#dc2626"],
                ["12:30", "Yoga flow", "9/16", "#16a34a"],
                ["18:00", "HIIT", "12/14", "#d97706"],
              ].map(([t, n, b, c]) => (
                <div key={t} className="flex items-center justify-between" style={{ fontSize: q(1.4), marginTop: q(0.9), background: "#fff", borderRadius: q(0.8), padding: `${q(0.8)} ${q(1.2)}` }}>
                  <span style={{ color: "#6b6480" }}>{t}</span>
                  <span style={{ fontWeight: 700, flex: 1, marginLeft: q(1.6) }}>{n}</span>
                  <span style={{ color: c, fontWeight: 700 }}>{b}</span>
                </div>
              ))}
            </div>
          </div>
        </Browser>
        <Phone style={{ position: "absolute", right: q(-1.5), top: q(40), width: q(28), height: q(48) }}>
          <div style={{ padding: `${q(5)} ${q(2.2)} ${q(2.2)}`, background: "#1e1537", height: "100%" }}>
            <p style={{ fontSize: q(2.2), fontWeight: 800 }}>Book a class</p>
            <p style={{ fontSize: q(1.3), color: "#a99fc7" }}>Thursday</p>
            {[
              ["HIIT · 18:00", "2 spots left", true],
              ["Pilates · 19:00", "6 spots left", false],
              ["Boxing · 20:00", "Full · join waitlist", false],
            ].map(([n, s, hl]) => (
              <div key={String(n)} style={{ marginTop: q(1.5), background: hl ? "#6d28d9" : "#ffffff12", borderRadius: q(1.2), padding: q(1.4) }}>
                <p style={{ fontSize: q(1.6), fontWeight: 700 }}>{n}</p>
                <p style={{ fontSize: q(1.25), color: hl ? "#e9d5ff" : "#a99fc7" }}>{s}</p>
              </div>
            ))}
            <div style={{ marginTop: q(2), background: "#fff", color: "#1e1537", textAlign: "center", fontWeight: 800, fontSize: q(1.6), padding: `${q(1.3)} 0`, borderRadius: 99 }}>Book & pay</div>
          </div>
        </Phone>
      </div>
      <Chips items={["🔐 Secure logins", "📅 Bookings", "💳 Subscriptions", "📈 Live stats"]} style={{ marginTop: "auto", maxWidth: "64%" }} />
    </Paper>
  );
}

// ── Chapter 04 · Fleet & driver apps ──

function FleetText() {
  const steps = [
    "Driver taps “Available” — live GPS location starts sharing.",
    "Dispatch sees every available driver on a live map.",
    "A new job goes to the nearest available driver: pickup, drop-off, notes and navigation.",
    "Driver accepts — your customer gets a live tracking link.",
    "Proof of delivery: photos, signature and times saved on every job.",
  ];
  return (
    <Paper folio={9} chapter="Fleet & driver apps">
      <Kicker>Chapter 04 · Fleet & driver apps</Kicker>
      <Title size={6.8}>Send jobs to drivers — with live location.</Title>
      <Lead>Your drivers mark themselves available, you see them live on the map, and the nearest one gets the job in seconds.</Lead>
      <ol style={{ marginTop: q(4), display: "grid", gap: q(2.2) }}>
        {steps.map((s, i) => (
          <li key={i} className="flex items-start" style={{ gap: q(2.2), fontSize: q(2.9), lineHeight: 1.35 }}>
            <span className="font-heading" style={{ flex: "none", width: q(4.4), height: q(4.4), borderRadius: 99, background: INK, color: "#fff", display: "grid", placeItems: "center", fontSize: q(2.3), fontWeight: 800 }}>
              {i + 1}
            </span>
            <span style={{ paddingTop: q(0.3) }}>{s}</span>
          </li>
        ))}
      </ol>
      <p style={{ marginTop: q(3.4), fontSize: q(2.6), background: "#fff", border: "1px solid #16a34a40", borderRadius: q(1.6), padding: `${q(1.6)} ${q(2.2)}`, color: "#166534" }}>
        🔒 Location is only shared while a driver is marked available.
      </p>
      <Meta ideal="recovery & towing · haulage · couriers · field service teams" price="iOS, Android & web · custom quote" />
    </Paper>
  );
}

function DriverAppMockup() {
  return (
    <Paper folio={10} chapter="Fleet & driver apps">
      <Kicker>Concept design · driver app</Kicker>
      <Title size={5.6}>In the driver&apos;s pocket.</Title>
      <div className="flex justify-center" style={{ gap: q(4), marginTop: q(5) }}>
        {/* Phone A — go available */}
        <div style={{ width: q(40) }}>
          <Phone style={{ height: q(80) }}>
            <div className="flex h-full flex-col" style={{ padding: `${q(5.5)} ${q(2.6)} ${q(2)}` }}>
              <p style={{ fontSize: q(2.6), fontWeight: 800 }}>Hi, Mark 👋</p>
              <p style={{ fontSize: q(1.5), color: "#9ca3af" }}>Ready for work?</p>
              <div className="flex items-center justify-between" style={{ marginTop: q(2), background: "#052e1a", border: "1px solid #22c55e", borderRadius: q(1.8), padding: q(1.8) }}>
                <div>
                  <p style={{ fontSize: q(2), fontWeight: 800, color: "#4ade80" }}>● AVAILABLE</p>
                  <p style={{ fontSize: q(1.3), color: "#86efac" }}>Sharing live location</p>
                </div>
                <span style={{ width: q(7), height: q(4), borderRadius: 99, background: "#22c55e", position: "relative" }}>
                  <span style={{ position: "absolute", right: q(0.5), top: q(0.5), width: q(3), height: q(3), borderRadius: 99, background: "#fff" }} />
                </span>
              </div>
              <div className="relative" style={{ marginTop: q(2), flex: 1, borderRadius: q(1.6), overflow: "hidden" }}>
                <MiniMap dark pins={[{ x: 48, y: 52, kind: "me" }]} />
                <span style={{ position: "absolute", left: q(1.2), top: q(1.2), fontSize: q(1.3), background: "#000a", padding: `${q(0.5)} ${q(1.2)}`, borderRadius: 99 }}>📡 Live GPS on</span>
              </div>
              <div className="grid grid-cols-2" style={{ gap: q(1.2), marginTop: q(1.8) }}>
                {[
                  ["4", "jobs today"],
                  ["63 mi", "driven"],
                ].map(([v, l]) => (
                  <div key={l} style={{ background: "#ffffff10", borderRadius: q(1.2), padding: q(1.3) }}>
                    <p style={{ fontSize: q(2.2), fontWeight: 800 }}>{v}</p>
                    <p style={{ fontSize: q(1.2), color: "#9ca3af" }}>{l}</p>
                  </div>
                ))}
              </div>
            </div>
          </Phone>
          <p className="text-center font-heading font-bold" style={{ fontSize: q(2.6), marginTop: q(2.4) }}>
            ① Go available
          </p>
        </div>

        {/* Phone B — accept the job */}
        <div style={{ width: q(40) }}>
          <Phone style={{ height: q(80) }}>
            <div className="relative h-full">
              <div style={{ position: "absolute", inset: 0, bottom: "42%" }}>
                <MiniMap
                  dark
                  route={[
                    [30, 70],
                    [38, 62],
                    [38, 45],
                    [62, 40],
                    [70, 26],
                  ]}
                  pins={[
                    { x: 30, y: 72, kind: "me" },
                    { x: 38, y: 47, kind: "pickup" },
                    { x: 70, y: 28, kind: "drop" },
                  ]}
                />
              </div>
              <div style={{ position: "absolute", left: q(1.4), right: q(1.4), bottom: q(1.4), background: "#151922", border: "1px solid #ffffff1a", borderRadius: q(2), padding: q(2) }}>
                <span style={{ fontSize: q(1.4), fontWeight: 800, color: "#1b1722", background: "#fb923c", padding: `${q(0.5)} ${q(1.4)}`, borderRadius: 99 }}>NEW JOB · 0.8 mi away</span>
                <p style={{ fontSize: q(1.6), marginTop: q(1.6) }}>
                  <b style={{ color: "#4ade80" }}>Pickup</b> · Riverside Depot, Unit 4
                </p>
                <p style={{ fontSize: q(1.6), marginTop: q(0.8) }}>
                  <b>Drop-off</b> · North Distribution Centre
                </p>
                <p style={{ fontSize: q(1.4), color: "#9ca3af", marginTop: q(0.8) }}>📦 2 pallets · collect by 14:30</p>
                <p style={{ fontSize: q(1.4), color: "#fbbf24", marginTop: q(0.8) }}>⏱ Respond in 0:42</p>
                <div className="grid grid-cols-[1fr_1.6fr]" style={{ gap: q(1), marginTop: q(1.6) }}>
                  <span style={{ textAlign: "center", fontSize: q(1.6), fontWeight: 700, padding: `${q(1.2)} 0`, borderRadius: 99, background: "#ffffff14" }}>Decline</span>
                  <span style={{ textAlign: "center", fontSize: q(1.6), fontWeight: 800, padding: `${q(1.2)} 0`, borderRadius: 99, background: "#22c55e", color: "#04120c" }}>Accept job</span>
                </div>
              </div>
            </div>
          </Phone>
          <p className="text-center font-heading font-bold" style={{ fontSize: q(2.6), marginTop: q(2.4) }}>
            ② Accept the job
          </p>
        </div>
      </div>
      <p className="mt-auto" style={{ fontSize: q(2.6), color: MUTED, lineHeight: 1.45 }}>
        One tap opens turn-by-turn navigation in Google Maps or Waze. Status updates — en route, arrived, completed — go to
        dispatch instantly.
      </p>
    </Paper>
  );
}

function DispatchMockup() {
  // the map is wide, so only the middle band (y ≈ 27–73) is visible
  const drivers: Pin[] = [
    { x: 20, y: 36, kind: "available" },
    { x: 76, y: 32, kind: "available" },
    { x: 84, y: 60, kind: "available" },
    { x: 32, y: 66, kind: "available" },
    { x: 8, y: 56, kind: "available" },
    { x: 40, y: 32, kind: "busy" },
    { x: 92, y: 44, kind: "busy" },
    { x: 66, y: 66, kind: "busy" },
    { x: 24, y: 50, kind: "offline" },
    { x: 66, y: 46, kind: "job" },
    { x: 56, y: 56, kind: "available" },
  ];
  return (
    <Paper folio={11} chapter="Fleet & driver apps">
      <Kicker>Concept design · dispatcher dashboard</Kicker>
      <Title size={5.6}>Your whole fleet on one live map.</Title>
      <Browser url="dispatch.yourfleet.co.uk" dark style={{ marginTop: q(4) }}>
        <div style={{ color: "#e5e7eb" }}>
          <div className="flex items-center" style={{ gap: q(1.2), padding: q(1.6), fontSize: q(1.45), fontWeight: 700 }}>
            <span style={{ background: "#14532d", color: "#86efac", padding: `${q(0.5)} ${q(1.2)}`, borderRadius: 99 }}>● 6 available</span>
            <span style={{ background: "#7c2d12", color: "#fdba74", padding: `${q(0.5)} ${q(1.2)}`, borderRadius: 99 }}>● 3 on a job</span>
            <span style={{ background: "#374151", color: "#d1d5db", padding: `${q(0.5)} ${q(1.2)}`, borderRadius: 99 }}>● 1 offline</span>
            <span style={{ marginLeft: "auto", background: "#e11d48", color: "#fff", padding: `${q(0.5)} ${q(1.4)}`, borderRadius: 99 }}>+ New job</span>
          </div>
          <div className="relative" style={{ height: q(42) }}>
            <MiniMap
              dark
              pinScale={0.62}
              pins={drivers}
              route={[
                [56, 56],
                [62, 56],
                [62, 46],
                [66, 46],
              ]}
            />
            <div style={{ position: "absolute", left: q(1.6), bottom: q(1.6), right: "38%", background: "#0b0d12ee", border: "1px solid #22c55e66", borderRadius: q(1.4), padding: q(1.4), fontSize: q(1.4), lineHeight: 1.4 }}>
              <b style={{ color: "#4ade80" }}>✓ Job #1042 sent to Mark R.</b>
              <br />
              <span style={{ color: "#9ca3af" }}>Nearest available driver · 0.8 mi · accepted in 12s</span>
            </div>
          </div>
          <div className="grid grid-cols-2" style={{ gap: q(1.6), padding: q(1.6), fontSize: q(1.4) }}>
            <div>
              <p style={{ fontWeight: 800, marginBottom: q(0.8), color: "#9ca3af" }}>DRIVERS</p>
              {[
                ["Mark R.", "On way to pickup", "#fb923c"],
                ["Sara K.", "Available · 1.4 mi", "#4ade80"],
                ["Tom B.", "Available · 2.1 mi", "#4ade80"],
              ].map(([n, s, c]) => (
                <div key={n} className="flex justify-between" style={{ padding: `${q(0.6)} 0`, borderBottom: "1px solid #ffffff12" }}>
                  <span style={{ fontWeight: 700 }}>{n}</span>
                  <span style={{ color: c }}>{s}</span>
                </div>
              ))}
            </div>
            <div>
              <p style={{ fontWeight: 800, marginBottom: q(0.8), color: "#9ca3af" }}>JOBS</p>
              {[
                ["#1042", "Assigned", "#fb923c"],
                ["#1041", "En route", "#60a5fa"],
                ["#1040", "Delivered ✓", "#4ade80"],
              ].map(([n, s, c]) => (
                <div key={n} className="flex justify-between" style={{ padding: `${q(0.6)} 0`, borderBottom: "1px solid #ffffff12" }}>
                  <span style={{ fontWeight: 700 }}>{n}</span>
                  <span style={{ color: c }}>{s}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Browser>
      <p className="mt-auto" style={{ fontSize: q(2.6), color: MUTED, lineHeight: 1.45 }}>
        Create a job, and it goes to the closest available driver automatically — or pick the driver yourself with one click.
      </p>
    </Paper>
  );
}

function TrackingMockup() {
  const timeline: [string, string, "done" | "now" | "next"][] = [
    ["Job booked", "13:52", "done"],
    ["Driver assigned", "13:53", "done"],
    ["Collected · photo ✓", "14:21", "done"],
    ["On the way", "now", "now"],
    ["Delivered", "", "next"],
  ];
  return (
    <Paper folio={12} chapter="Fleet & driver apps">
      <Kicker>Concept design · customer tracking</Kicker>
      <Title size={5.6}>No more “where&apos;s my driver?” calls.</Title>
      <div className="grid grid-cols-[44cqw_1fr]" style={{ gap: q(4), marginTop: q(5) }}>
        <Phone light style={{ height: q(80) }}>
          <div className="flex h-full flex-col">
            <div style={{ padding: `${q(5)} ${q(2.4)} ${q(1.4)}` }}>
              <p style={{ fontSize: q(1.4), color: "#64748b" }}>Delivery #1042</p>
              <p style={{ fontSize: q(2.3), fontWeight: 800 }}>Track your driver</p>
            </div>
            <div style={{ flex: 1 }}>
              <MiniMap
                route={[
                  [36, 70],
                  [38, 45],
                  [62, 40],
                  [70, 24],
                ]}
                pins={[
                  { x: 37, y: 58, kind: "me" },
                  { x: 70, y: 26, kind: "drop" },
                ]}
              />
            </div>
            <div style={{ padding: q(2.2) }}>
              <div className="flex items-center" style={{ gap: q(1.4) }}>
                <span style={{ width: q(5), height: q(5), borderRadius: 99, background: "#2563eb", color: "#fff", display: "grid", placeItems: "center", fontWeight: 800, fontSize: q(2) }}>M</span>
                <div>
                  <p style={{ fontSize: q(2), fontWeight: 800 }}>Mark is ~8 min away</p>
                  <p style={{ fontSize: q(1.35), color: "#64748b" }}>Live location · updated just now</p>
                </div>
              </div>
              <div style={{ marginTop: q(1.6), height: q(1), borderRadius: 99, background: "#e2e8f0" }}>
                <div style={{ width: "72%", height: "100%", borderRadius: 99, background: "#2563eb" }} />
              </div>
            </div>
          </div>
        </Phone>
        <div className="flex flex-col">
          <p className="font-label font-bold uppercase" style={{ fontSize: q(2), letterSpacing: "0.16em", color: MUTED }}>
            Job timeline
          </p>
          <div style={{ marginTop: q(2) }}>
            {timeline.map(([label, time, state], i) => (
              <div key={label} className="flex" style={{ gap: q(1.8) }}>
                <div className="flex flex-col items-center">
                  <span
                    style={{
                      width: q(3.4),
                      height: q(3.4),
                      borderRadius: 99,
                      flex: "none",
                      display: "grid",
                      placeItems: "center",
                      fontSize: q(1.8),
                      color: "#fff",
                      fontWeight: 800,
                      background: state === "done" ? "#16a34a" : state === "now" ? "#2563eb" : "#cbd5e1",
                      boxShadow: state === "now" ? "0 0 0 1cqw #2563eb33" : "none",
                    }}
                  >
                    {state === "done" ? "✓" : ""}
                  </span>
                  {i < timeline.length - 1 && <span style={{ width: 2, flex: 1, minHeight: q(4), background: state === "done" ? "#16a34a" : "#cbd5e1" }} />}
                </div>
                <div style={{ paddingBottom: q(2.4) }}>
                  <p style={{ fontSize: q(2.3), fontWeight: 700, color: state === "next" ? "#94a3b8" : INK }}>{label}</p>
                  {time && <p style={{ fontSize: q(1.8), color: MUTED }}>{time}</p>}
                </div>
              </div>
            ))}
          </div>
          <div style={{ marginTop: q(1), background: "#fff", border: "1px solid #1b172218", borderRadius: q(1.8), padding: q(2), boxShadow: "0 1.5cqw 3cqw -2cqw rgba(30,20,10,.35)" }}>
            <p style={{ fontSize: q(2), fontWeight: 800 }}>Proof of delivery</p>
            <div style={{ marginTop: q(1.2), height: q(10), borderRadius: q(1), background: "linear-gradient(135deg,#e7dccb,#cdb89a)", display: "grid", placeItems: "center", fontSize: q(5) }}>📦</div>
            <svg viewBox="0 0 100 24" style={{ width: "100%", height: q(5), marginTop: q(1) }} aria-hidden>
              <path d="M4 16 C 12 4, 18 22, 26 12 S 38 4, 44 14 S 58 20, 64 10 S 80 6, 96 14" fill="none" stroke={INK} strokeWidth="1.6" strokeLinecap="round" />
            </svg>
            <p style={{ fontSize: q(1.6), color: MUTED }}>Photo + signature · saved to the job</p>
          </div>
        </div>
      </div>
      <p className="mt-auto" style={{ fontSize: q(2.6), color: MUTED, lineHeight: 1.45 }}>
        Customers get a text with a live tracking link the moment a driver accepts the job.
      </p>
    </Paper>
  );
}

// ── Chapter 05 · Automations ──

function AutomationText() {
  return (
    <Paper folio={13} chapter="Automations">
      <Kicker>Chapter 05 · Automations</Kicker>
      <Title>Automations that do the admin for you.</Title>
      <Lead>They plug into any website, shop, platform or app in this catalogue — and work 24/7, even when you can&apos;t.</Lead>
      <Checks
        items={[
          "Enquiry alerts straight to WhatsApp or email",
          "Online booking with automatic reminders",
          "Instant replies & follow-ups",
          "Review requests after every job",
          "Invoices & payment links that send themselves",
          "Everything synced to Google Sheets or your CRM",
        ]}
      />
      <Meta ideal="any business that repeats the same admin every week" price="From £150" />
    </Paper>
  );
}

function AutomationVisual() {
  const flows: { when: string; then: string[] }[] = [
    { when: "Someone fills in your form", then: ["WhatsApp alert to you", "Instant reply to them", "Saved to your sheet"] },
    { when: "A job is marked complete", then: ["Invoice sent", "Payment link included", "Review request next day"] },
    { when: "A booking is made", then: ["Confirmation email", "Reminder 24h before", "Reminder 2h before"] },
  ];
  return (
    <Paper folio={14} chapter="Automations">
      <Kicker>Inside an automation</Kicker>
      <Title size={5.6}>When this happens → that happens. Automatically.</Title>
      <div style={{ marginTop: q(5), display: "grid", gap: q(3) }}>
        {flows.map((f) => (
          <div key={f.when} style={{ background: "#fff", border: "1px solid #1b172214", borderRadius: q(2.2), padding: q(2.6), boxShadow: "0 1.5cqw 3cqw -2cqw rgba(30,20,10,.3)" }}>
            <div className="flex items-center" style={{ gap: q(1.6) }}>
              <span className="font-label font-bold" style={{ fontSize: q(1.8), letterSpacing: "0.14em", background: "#ff5f1f", color: "#fff", padding: `${q(0.6)} ${q(1.6)}`, borderRadius: 99 }}>
                WHEN
              </span>
              <span style={{ fontSize: q(2.8), fontWeight: 700 }}>{f.when}</span>
            </div>
            <div className="flex flex-wrap items-center" style={{ gap: q(1.2), marginTop: q(1.8) }}>
              <span className="font-label font-bold" style={{ fontSize: q(1.8), letterSpacing: "0.14em", background: "#16a34a", color: "#fff", padding: `${q(0.6)} ${q(1.6)}`, borderRadius: 99 }}>
                THEN
              </span>
              {f.then.map((t) => (
                <span key={t} style={{ fontSize: q(2.2), background: "#f0fdf4", color: "#166534", border: "1px solid #16a34a33", padding: `${q(0.7)} ${q(1.6)}`, borderRadius: 99 }}>
                  ✓ {t}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
      <p className="mt-auto" style={{ fontSize: q(2.6), color: MUTED, lineHeight: 1.45 }}>
        Works with the tools you already use — WhatsApp, email, calendars, spreadsheets and payments. See all 15
        automation guides at <b style={{ color: INK }}>bisodesign.co.uk/solutions</b>.
      </p>
    </Paper>
  );
}

// ── Closing pages ──

function HowWeWork({ steps }: { steps: { title: string; description: string }[] }) {
  return (
    <Paper folio={15} chapter="How we work">
      <Kicker>Chapter 06 · How we work</Kicker>
      <Title>Simple, honest — and built with you.</Title>
      <div style={{ marginTop: q(5), display: "grid", gap: q(3.2) }}>
        {steps.slice(0, 4).map((s, i) => (
          <div key={s.title} className="flex" style={{ gap: q(2.6) }}>
            <span className="font-heading font-extrabold text-gradient" style={{ fontSize: q(6), lineHeight: 1, flex: "none", width: q(8) }}>
              {String(i + 1).padStart(2, "0")}
            </span>
            <div>
              <p className="font-heading font-bold" style={{ fontSize: q(3.3) }}>
                {s.title}
              </p>
              <p style={{ fontSize: q(2.65), color: MUTED, lineHeight: 1.45, marginTop: q(0.8) }}>{s.description}</p>
            </div>
          </div>
        ))}
      </div>
      <p className="mt-auto" style={{ fontSize: q(2.5), color: MUTED, lineHeight: 1.45, background: "#fff", border: "1px dashed #1b172233", borderRadius: q(1.6), padding: q(2.2) }}>
        Every design in this catalogue is a concept created by BisoDesign to show what&apos;s possible. Yours will be
        designed from scratch around your business.
      </p>
    </Paper>
  );
}

function CallToAction({ whatsappHref, email }: { whatsappHref: string; email: string }) {
  return (
    <Paper dark folio={16} chapter="Your turn">
      <Kicker dark>Your turn</Kicker>
      <h2 className="font-heading font-extrabold" style={{ fontSize: q(12), lineHeight: 1, marginTop: q(4), letterSpacing: "-0.03em" }}>
        Let&apos;s build
        <br />
        <span className="text-gradient">yours.</span>
      </h2>
      <Lead dark>
        Tell me what you&apos;d like to build — a shop, a company site, a platform or an app. You&apos;ll get honest advice and a
        fixed price before anything starts.
      </Lead>
      <div style={{ marginTop: q(7), display: "grid", gap: q(2.4) }}>
        <Link
          href="/about#contact"
          className="block text-center font-label font-bold uppercase"
          style={{ fontSize: q(3), letterSpacing: "0.12em", background: GRADIENT, color: "#fff", padding: `${q(3)} 0`, borderRadius: 99, boxShadow: "0 0 5cqw rgba(192,76,253,.5)" }}
        >
          Get a free quote →
        </Link>
        <div className="grid grid-cols-2" style={{ gap: q(2.4) }}>
          <a
            href={whatsappHref}
            target="_blank"
            rel="noreferrer"
            className="block text-center font-label font-bold"
            style={{ fontSize: q(2.7), background: "#25D366", color: "#04120c", padding: `${q(2.6)} 0`, borderRadius: 99 }}
          >
            💬 WhatsApp
          </a>
          <a
            href={`mailto:${email}`}
            className="block text-center font-label font-bold"
            style={{ fontSize: q(2.7), border: "1px solid #ffffff40", color: "#fff7ed", padding: `${q(2.6)} 0`, borderRadius: 99 }}
          >
            ✉ Email
          </a>
        </div>
      </div>
      <p className="mt-auto font-label uppercase" style={{ fontSize: q(2.2), letterSpacing: "0.16em", color: "#a8a29e", lineHeight: 1.8 }}>
        No obligation · Fixed price · You own the code
      </p>
    </Paper>
  );
}

function BackCover() {
  return (
    <Paper dark>
      <div className="flex flex-1 flex-col items-center justify-center text-center">
        <span style={{ width: q(14), height: q(14), borderRadius: q(3.4), background: GRADIENT, boxShadow: "0 0 8cqw rgba(192,76,253,.6)" }} />
        <p className="font-label font-bold" style={{ fontSize: q(7), marginTop: q(5) }}>
          BisoDesign
        </p>
        <p style={{ fontSize: q(3.2), color: "#d6d0c9", marginTop: q(2), maxWidth: "80%", lineHeight: 1.45 }}>
          Hand-coded websites, online shops, platforms & apps for UK businesses.
        </p>
        <p className="font-label uppercase" style={{ fontSize: q(2.8), letterSpacing: "0.2em", color: "#67e8f9", marginTop: q(6) }}>
          bisodesign.co.uk
        </p>
      </div>
      <p className="text-center" style={{ fontSize: q(2), color: "#8a8193" }}>
        © {new Date().getFullYear()} BisoDesign · All designs in this catalogue are concepts.
      </p>
    </Paper>
  );
}

export type CatalogInfo = {
  steps: { title: string; description: string }[];
  whatsappHref: string;
  email: string;
};

/** The catalogue in reading order. Page index = page number (the cover is page 0). */
export function buildCatalogPages(info: CatalogInfo): ReactNode[] {
  return [
    <Cover key="cover" />,
    <Contents key="contents" />,
    <Intro key="intro" />,
    <ShopText key="shop-text" />,
    <ShopMockup key="shop" />,
    <CompanyText key="company-text" />,
    <CompanyMockup key="company" />,
    <PlatformText key="platform-text" />,
    <PlatformMockup key="platform" />,
    <FleetText key="fleet-text" />,
    <DriverAppMockup key="driver" />,
    <DispatchMockup key="dispatch" />,
    <TrackingMockup key="tracking" />,
    <AutomationText key="auto-text" />,
    <AutomationVisual key="auto" />,
    <HowWeWork key="how" steps={info.steps} />,
    <CallToAction key="cta" whatsappHref={info.whatsappHref} email={info.email} />,
    <BackCover key="back" />,
  ];
}
