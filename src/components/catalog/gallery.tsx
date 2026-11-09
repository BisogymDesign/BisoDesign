import type { CSSProperties, ReactNode } from "react";
import { Browser, Kicker, Lead, Meta, MUTED, Paper, Title, q } from "./pages";

/*
 * Chapter: websites for every kind of business — nine concept sites, each with
 * its own look, built around how that customer decides. All brands are fictional.
 */

const serif = "Georgia, 'Times New Roman', serif";
const sans = "var(--font-sora), system-ui, sans-serif";
const pill = (bg: string, color: string, extra: CSSProperties = {}): CSSProperties => ({
  display: "inline-block",
  background: bg,
  color,
  fontWeight: 700,
  fontSize: q(1.35),
  padding: `${q(0.9)} ${q(1.8)}`,
  borderRadius: 99,
  ...extra,
});

type Spec = { palette: string[]; font: string; fontStyle?: CSSProperties; fontName: string; mood: string };

function ModelPage({
  kicker,
  title,
  url,
  dark,
  points,
  spec,
  children,
}: {
  kicker: string;
  title: string;
  url: string;
  dark?: boolean;
  points: string[];
  spec: Spec;
  children: ReactNode;
}) {
  return (
    <Paper folio chapter="Websites for every business">
      <Kicker>{kicker}</Kicker>
      <Title size={5.2}>{title}</Title>
      <Browser url={url} dark={dark} style={{ marginTop: q(3.2) }}>
        {children}
      </Browser>
      {/* design spec — the way a studio presents a concept */}
      <div className="mt-auto grid grid-cols-[1.3fr_1fr]" style={{ gap: q(2), background: "#fff", border: "1px solid #1b172214", borderRadius: q(1.8), padding: q(2) }}>
        <div>
          <p className="font-label font-bold uppercase" style={{ fontSize: q(1.5), letterSpacing: "0.16em", color: MUTED }}>
            Palette
          </p>
          <div className="flex" style={{ gap: q(1), marginTop: q(1) }}>
            {spec.palette.map((c) => (
              <div key={c} className="text-center">
                <span style={{ display: "block", width: q(6), height: q(6), borderRadius: q(1.2), background: c, boxShadow: "inset 0 0 0 1px #0000001a" }} />
                <span className="font-label" style={{ display: "block", fontSize: q(1.2), color: MUTED, marginTop: q(0.5) }}>
                  {c.toUpperCase()}
                </span>
              </div>
            ))}
          </div>
        </div>
        <div style={{ borderLeft: "1px solid #1b172214", paddingLeft: q(2) }}>
          <p className="font-label font-bold uppercase" style={{ fontSize: q(1.5), letterSpacing: "0.16em", color: MUTED }}>
            Type & mood
          </p>
          <p style={{ fontFamily: spec.font, fontSize: q(5.4), lineHeight: 1.1, marginTop: q(0.6), ...spec.fontStyle }}>Aa</p>
          <p style={{ fontSize: q(1.7), fontWeight: 700 }}>{spec.fontName}</p>
          <p style={{ fontSize: q(1.6), color: MUTED }}>{spec.mood}</p>
        </div>
      </div>
      <div className="grid grid-cols-3" style={{ gap: q(1.6), paddingTop: q(2.2) }}>
        {points.map((p) => (
          <p key={p} className="flex items-start" style={{ gap: q(1), fontSize: q(2), lineHeight: 1.3, fontWeight: 600 }}>
            <span style={{ color: "#c2410c" }}>✦</span>
            {p}
          </p>
        ))}
      </div>
    </Paper>
  );
}

export const GALLERY = [
  { key: "restaurant", emoji: "🍷", name: "Restaurant" },
  { key: "estate", emoji: "🏡", name: "Estate agent" },
  { key: "builder", emoji: "🏗️", name: "Builder" },
  { key: "spa", emoji: "🌿", name: "Spa & beauty" },
  { key: "cars", emoji: "🚗", name: "Car dealer" },
  { key: "dental", emoji: "🦷", name: "Dental clinic" },
  { key: "gym", emoji: "⚡", name: "Gym" },
  { key: "hotel", emoji: "🛎️", name: "Boutique hotel" },
  { key: "saas", emoji: "☁️", name: "Tech startup" },
] as const;

export function GalleryText({ pages }: { pages: Record<string, number> }) {
  return (
    <Paper folio chapter="Websites for every business">
      <Kicker>Chapter 04 · Websites for every business</Kicker>
      <Title>A look for every kind of business.</Title>
      <Lead>Nine concept sites. Different customers, different worries — so every design is built around how that customer decides.</Lead>
      <div className="grid grid-cols-3" style={{ gap: q(1.8), marginTop: q(4.5) }}>
        {GALLERY.map((g) => (
          <button
            key={g.key}
            type="button"
            data-goto={pages[g.key]}
            className="text-left transition-transform hover:-translate-y-0.5"
            style={{ background: "#fff", border: "1px solid #1b172214", borderRadius: q(1.8), padding: q(2), boxShadow: "0 1.5cqw 3cqw -2cqw rgba(30,20,10,.3)" }}
          >
            <span style={{ fontSize: q(4.4) }}>{g.emoji}</span>
            <span className="block font-heading font-bold" style={{ fontSize: q(2.4), marginTop: q(0.8) }}>
              {g.name}
            </span>
            <span className="block font-label" style={{ fontSize: q(1.8), color: MUTED }}>
              p. {String(pages[g.key]).padStart(2, "0")}
            </span>
          </button>
        ))}
      </div>
      <Meta ideal="any business — every site is designed from scratch around yours" price="From £495" />
    </Paper>
  );
}

// ── 1 · Restaurant ──
export function RestaurantModel() {
  const gold = "#d6a15b";
  return (
    <ModelPage kicker="Concept · restaurant" title="Book a table in two taps." url="emberandoak.co.uk" dark points={["Booking without a phone call", "A menu that makes you hungry", "Hours that are always right"]} spec={{ palette: ["#120d0a", "#3b1d0e", "#d6a15b", "#f5e9dc", "#a8927b"], font: serif, fontName: "Classic serif", mood: "Warm · intimate · smoky" }}>
      <div style={{ background: "radial-gradient(circle at 75% 30%, #3b1d0e, #120d0a 60%)", color: "#f5e9dc", padding: q(2.4) }}>
        <div className="flex items-center justify-between">
          <span style={{ fontFamily: serif, fontSize: q(2.4) }}>Ember &amp; Oak</span>
          <span className="flex items-center" style={{ gap: q(1.8), fontSize: q(1.3), color: "#cbb59c" }}>
            <span>Menu</span>
            <span>Private dining</span>
            <span style={pill("transparent", gold, { border: `1px solid ${gold}` })}>Book a table</span>
          </span>
        </div>
        <div className="grid grid-cols-[1.2fr_1fr] items-center" style={{ marginTop: q(3), gap: q(2) }}>
          <div>
            <p className="font-label" style={{ fontSize: q(1.2), letterSpacing: "0.24em", color: gold }}>
              WOOD-FIRED KITCHEN
            </p>
            <p style={{ fontFamily: serif, fontSize: q(4.6), lineHeight: 1.04, marginTop: q(1) }}>Fire, smoke &amp; good company.</p>
            <div className="flex" style={{ gap: q(1), marginTop: q(2) }}>
              <span style={pill(gold, "#1a0f06")}>Book a table</span>
              <span style={pill("transparent", "#f5e9dc", { border: "1px solid #ffffff40" })}>View menu</span>
            </div>
          </div>
          <div style={{ justifySelf: "center", width: q(24), height: q(24), borderRadius: 99, background: "radial-gradient(circle, #3a2a20 0 55%, #1c140f 56% 70%, #2c1f17 71%)", boxShadow: "0 0 6cqw rgba(255,120,40,.45)", display: "grid", placeItems: "center", fontSize: q(10) }}>
            🥩
          </div>
        </div>
        <div className="grid grid-cols-4 items-center" style={{ marginTop: q(3), gap: q(1), background: "#ffffff0d", border: "1px solid #ffffff1f", borderRadius: q(1.4), padding: q(1.2), fontSize: q(1.35) }}>
          <span>📅 Fri 14 Nov</span>
          <span>🕖 19:30</span>
          <span>👥 2 guests</span>
          <span style={pill(gold, "#1a0f06", { textAlign: "center" })}>Find a table</span>
        </div>
        <div className="grid grid-cols-3" style={{ gap: q(1.2), marginTop: q(2.4) }}>
          {[
            ["Ember steak", "28-day aged, bone marrow butter", "£34"],
            ["Charred leeks", "Hazelnut, brown butter", "£9"],
            ["Smoked custard", "Burnt honey, oat crumb", "£8"],
          ].map(([n, d, p]) => (
            <div key={n} style={{ borderTop: `1px solid ${gold}55`, paddingTop: q(1) }}>
              <p style={{ fontFamily: serif, fontSize: q(1.7) }}>
                {n} <span style={{ float: "right", color: gold }}>{p}</span>
              </p>
              <p style={{ fontSize: q(1.2), color: "#a8927b" }}>{d}</p>
            </div>
          ))}
        </div>
        <p style={{ fontSize: q(1.25), color: "#cbb59c", marginTop: q(2) }}>★ 4.8 on Google · Open tonight until 11pm</p>
      </div>
    </ModelPage>
  );
}

function House({ wall, roof, sky }: { wall: string; roof: string; sky: string }) {
  return (
    <svg viewBox="0 0 120 80" width="100%" height="100%" preserveAspectRatio="xMidYMid slice" aria-hidden>
      <rect width="120" height="80" fill={sky} />
      <rect y="62" width="120" height="18" fill="#86b77a" />
      <path d="M30 40 L60 18 L90 40 Z" fill={roof} />
      <rect x="34" y="40" width="52" height="28" fill={wall} />
      <rect x="54" y="50" width="12" height="18" fill="#3f3a36" />
      <rect x="40" y="46" width="9" height="8" fill="#cfe8ff" />
      <rect x="71" y="46" width="9" height="8" fill="#cfe8ff" />
    </svg>
  );
}

// ── 2 · Estate agent ──
export function EstateModel() {
  const teal = "#0f766e";
  return (
    <ModelPage kicker="Concept · estate agent" title="Search that feels instant." url="keystonehomes.co.uk" points={["Fast, filterable listings", "Valuation leads on autopilot", "Listings synced from your CRM"]} spec={{ palette: ["#0f766e", "#0f2a44", "#5eead4", "#f0fdfa", "#0f172a"], font: sans, fontStyle: { fontWeight: 800 }, fontName: "Geometric sans", mood: "Trustworthy · bright · fast" }}>
      <div style={{ background: "#fff", color: "#0f172a" }}>
        <div style={{ background: `linear-gradient(135deg, ${teal}, #0f2a44)`, color: "#fff", padding: q(2.4) }}>
          <div className="flex items-center justify-between">
            <span className="font-heading" style={{ fontSize: q(2.1), fontWeight: 800 }}>
              Keystone<span style={{ color: "#5eead4" }}>.</span>
            </span>
            <span className="flex" style={{ gap: q(1.8), fontSize: q(1.3), color: "#ccfbf1" }}>
              <span>Buy</span>
              <span>Rent</span>
              <span>Sell</span>
              <span style={pill("#fff", teal)}>Free valuation</span>
            </span>
          </div>
          <p className="font-heading" style={{ fontSize: q(4.2), fontWeight: 800, lineHeight: 1.05, marginTop: q(2.6), maxWidth: "80%" }}>
            Find the home that fits your life.
          </p>
          <div style={{ marginTop: q(2), background: "#fff", color: "#0f172a", borderRadius: q(1.4), padding: q(1.2) }}>
            <div className="flex" style={{ gap: q(1), fontSize: q(1.25), fontWeight: 700 }}>
              {["Buy", "Rent", "Sold prices"].map((t, i) => (
                <span key={t} style={{ padding: `${q(0.4)} ${q(1.2)}`, borderRadius: 99, background: i === 0 ? teal : "transparent", color: i === 0 ? "#fff" : "#64748b" }}>
                  {t}
                </span>
              ))}
            </div>
            <div className="grid grid-cols-[2fr_1fr_1fr_auto]" style={{ gap: q(0.8), marginTop: q(1), fontSize: q(1.3) }}>
              {["📍 Town or postcode", "£ Max price", "🛏 Beds"].map((f) => (
                <span key={f} style={{ border: "1px solid #e2e8f0", borderRadius: q(0.8), padding: `${q(1)} ${q(1.2)}`, color: "#64748b" }}>
                  {f}
                </span>
              ))}
              <span style={pill(teal, "#fff", { borderRadius: q(0.8) })}>Search</span>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-3" style={{ gap: q(1.4), padding: q(2) }}>
          {[
            { p: "£425,000", t: "3 bed semi-detached", b: "NEW", h: { wall: "#f1e4d3", roof: "#8b3a2b", sky: "#bfe3f7" } },
            { p: "£289,950", t: "2 bed apartment", b: "", h: { wall: "#e2e8f0", roof: "#334155", sky: "#fde7c9" } },
            { p: "£610,000", t: "4 bed detached", b: "UNDER OFFER", h: { wall: "#fef3c7", roof: "#4b5563", sky: "#c7e9ff" } },
          ].map((l) => (
            <div key={l.p} style={{ border: "1px solid #e2e8f0", borderRadius: q(1.2), overflow: "hidden" }}>
              <div className="relative" style={{ height: q(11) }}>
                <House {...l.h} />
                {l.b && <span style={{ position: "absolute", left: q(0.8), top: q(0.8), fontSize: q(1), fontWeight: 800, background: l.b === "NEW" ? teal : "#f59e0b", color: "#fff", padding: `${q(0.3)} ${q(0.8)}`, borderRadius: 99 }}>{l.b}</span>}
              </div>
              <div style={{ padding: q(1.2) }}>
                <p style={{ fontSize: q(1.9), fontWeight: 800 }}>{l.p}</p>
                <p style={{ fontSize: q(1.25), color: "#64748b" }}>{l.t}</p>
                <p style={{ fontSize: q(1.2), color: "#475569", marginTop: q(0.5) }}>🛏 3 · 🛁 2 · 🚗 Drive</p>
              </div>
            </div>
          ))}
        </div>
        <div className="flex items-center justify-between" style={{ margin: `0 ${q(2)} ${q(2)}`, background: "#f0fdfa", border: "1px solid #99f6e4", borderRadius: q(1.2), padding: q(1.4), fontSize: q(1.4) }}>
          <span>
            <b>What&apos;s your home worth?</b> Instant online estimate in 60 seconds.
          </span>
          <span style={pill(teal, "#fff")}>Get my valuation →</span>
        </div>
      </div>
    </ModelPage>
  );
}

// ── 3 · Builder ──
export function BuilderModel() {
  const y = "#facc15";
  return (
    <ModelPage kicker="Concept · construction company" title="Bold, clear, built to win quotes." url="ironsidebuild.co.uk" dark points={["Instant estimate calculator", "Project gallery that sells", "Quote requests to your phone"]} spec={{ palette: ["#0b0b0c", "#facc15", "#18181b", "#a1a1aa", "#fafafa"], font: sans, fontStyle: { fontWeight: 800, textTransform: "uppercase" }, fontName: "Heavy grotesk, caps", mood: "Bold · solid · no-nonsense" }}>
      <div style={{ background: "#0b0b0c", color: "#fafafa" }}>
        <div style={{ height: q(1.2), background: `repeating-linear-gradient(135deg, ${y} 0 ${q(1.6)}, #111 ${q(1.6)} ${q(3.2)})` }} />
        <div style={{ padding: q(2.4) }}>
          <div className="flex items-center justify-between">
            <span className="font-heading" style={{ fontSize: q(2.1), fontWeight: 800, letterSpacing: "0.06em" }}>
              IRONSIDE<span style={{ color: y }}>/</span>BUILD
            </span>
            <span style={pill(y, "#111")}>Get an estimate</span>
          </div>
          <div className="grid grid-cols-[1.3fr_1fr] items-end" style={{ marginTop: q(2.4), gap: q(2) }}>
            <div>
              <p className="font-heading" style={{ fontSize: q(5.4), fontWeight: 800, lineHeight: 0.95, textTransform: "uppercase" }}>
                We build
                <br />
                what <span style={{ background: y, color: "#111", padding: `0 ${q(0.8)}` }}>lasts.</span>
              </p>
              <p style={{ fontSize: q(1.4), color: "#a1a1aa", marginTop: q(1.4) }}>Extensions, loft conversions and new builds across Essex &amp; Herts.</p>
            </div>
            <svg viewBox="0 0 120 100" style={{ width: "100%", height: q(20) }} aria-hidden>
              <path d="M20 95 L20 10 L100 10" stroke={y} strokeWidth="3" fill="none" />
              <path d="M20 10 L34 24 M20 24 L34 10" stroke={y} strokeWidth="1.5" />
              <line x1="86" y1="10" x2="86" y2="42" stroke="#a1a1aa" strokeWidth="1.2" />
              <rect x="78" y="42" width="16" height="10" fill={y} />
              {[0, 1, 2].map((r) =>
                [0, 1, 2, 3].map((c) => <rect key={`${r}${c}`} x={44 + c * 14} y={60 + r * 12} width="12" height="10" fill="none" stroke="#52525b" strokeWidth="1.5" />)
              )}
            </svg>
          </div>
          <div className="grid grid-cols-3" style={{ gap: q(1), marginTop: q(2) }}>
            {[
              ["250+", "projects"],
              ["15 yrs", "experience"],
              ["10-yr", "guarantee"],
            ].map(([v, l]) => (
              <div key={l} style={{ borderLeft: `3px solid ${y}`, paddingLeft: q(1) }}>
                <p style={{ fontSize: q(2.4), fontWeight: 800 }}>{v}</p>
                <p style={{ fontSize: q(1.2), color: "#a1a1aa" }}>{l}</p>
              </div>
            ))}
          </div>
          <div style={{ marginTop: q(2.4), background: "#18181b", border: "1px solid #27272a", borderRadius: q(1.2), padding: q(1.8) }}>
            <p style={{ fontSize: q(1.4), fontWeight: 800 }}>Instant estimate · single-storey extension</p>
            <div className="relative" style={{ height: q(0.7), background: "#3f3f46", borderRadius: 99, marginTop: q(1.8) }}>
              <div style={{ width: "48%", height: "100%", background: y, borderRadius: 99 }} />
              <span style={{ position: "absolute", left: "48%", top: "50%", width: q(2.2), height: q(2.2), borderRadius: 99, background: "#fff", transform: "translate(-50%,-50%)", boxShadow: `0 0 0 ${q(0.5)} ${y}` }} />
            </div>
            <div className="flex items-end justify-between" style={{ marginTop: q(1.4) }}>
              <span style={{ fontSize: q(1.3), color: "#a1a1aa" }}>Size: 24 m²</span>
              <span style={{ fontSize: q(2.6), fontWeight: 800, color: y }}>from £38,400</span>
            </div>
          </div>
        </div>
      </div>
    </ModelPage>
  );
}

// ── 4 · Spa ──
export function SpaModel() {
  const sage = "#6f8f76";
  return (
    <ModelPage kicker="Concept · spa & beauty" title="Calm from the very first click." url="stillwaterspa.co.uk" points={["Treatments booked online 24/7", "Gift vouchers that sell themselves", "Reminders cut no-shows"]} spec={{ palette: ["#f3f1ea", "#6f8f76", "#2f3b34", "#dfe7dc", "#c9b99a"], font: serif, fontStyle: { fontStyle: "italic" }, fontName: "Soft italic serif", mood: "Calm · natural · gentle" }}>
      <div style={{ background: "#f3f1ea", color: "#2f3b34", padding: q(2.4) }}>
        <p className="text-center" style={{ fontFamily: serif, fontSize: q(2.2), letterSpacing: "0.3em" }}>
          STILL WATER
        </p>
        <div className="grid grid-cols-[1fr_1.1fr] items-center" style={{ gap: q(2.4), marginTop: q(2) }}>
          <div style={{ height: q(24), borderRadius: `${q(14)} ${q(14)} ${q(1.4)} ${q(1.4)}`, background: "linear-gradient(180deg, #dfe7dc, #b9c9b8 60%, #94ab96)", display: "grid", placeItems: "center", fontSize: q(9) }}>
            🌿
          </div>
          <div>
            <p style={{ fontFamily: serif, fontStyle: "italic", fontSize: q(3.8), lineHeight: 1.1 }}>Slow down. Breathe. Begin again.</p>
            <span style={pill(sage, "#fff", { marginTop: q(1.8) })}>Book a treatment</span>
          </div>
        </div>
        <div style={{ marginTop: q(2.4), display: "grid", gap: q(0.9) }}>
          {[
            ["Signature massage", "60 min", "£75"],
            ["Hot stone ritual", "90 min", "£110"],
            ["Glow facial", "45 min", "£60"],
          ].map(([n, d, p]) => (
            <div key={n} className="flex items-center" style={{ background: "#fffdf8", borderRadius: q(1.2), padding: `${q(1.1)} ${q(1.6)}`, fontSize: q(1.45) }}>
              <span style={{ fontFamily: serif, fontSize: q(1.8), flex: 1 }}>{n}</span>
              <span style={{ color: "#7b867e", width: q(9) }}>{d}</span>
              <span style={{ fontWeight: 700, width: q(7) }}>{p}</span>
              <span style={pill("#2f3b34", "#fff", { fontSize: q(1.2) })}>Book</span>
            </div>
          ))}
        </div>
        <div className="flex" style={{ gap: q(0.8), marginTop: q(2) }}>
          {["Thu 13", "Fri 14", "Sat 15", "Sun 16"].map((d, i) => (
            <span key={d} style={{ flex: 1, textAlign: "center", fontSize: q(1.3), padding: `${q(1)} 0`, borderRadius: q(1), background: i === 1 ? sage : "#e7e4da", color: i === 1 ? "#fff" : "#2f3b34", fontWeight: 700 }}>
              {d}
            </span>
          ))}
          {["10:00", "13:30", "16:00"].map((t) => (
            <span key={t} style={{ flex: 1, textAlign: "center", fontSize: q(1.3), padding: `${q(1)} 0`, borderRadius: q(1), border: `1px solid ${sage}`, color: sage, fontWeight: 700 }}>
              {t}
            </span>
          ))}
        </div>
        <div style={{ marginTop: q(2), borderRadius: q(1.2), padding: q(1.6), background: "linear-gradient(120deg, #2f3b34, #556b5b)", color: "#f3f1ea", fontSize: q(1.45) }}>
          🎁 <b>Give the gift of calm</b> — e-gift vouchers, delivered instantly.
        </div>
      </div>
    </ModelPage>
  );
}

function Car({ color }: { color: string }) {
  return (
    <svg viewBox="0 0 200 70" width="100%" height="100%" aria-hidden>
      <path d="M8 50 Q6 38 22 34 L58 28 Q78 12 110 12 Q140 12 160 30 L186 36 Q196 40 194 50 Z" fill={color} />
      <path d="M66 29 Q82 17 108 17 Q130 17 146 30 Z" fill="#0b1220" opacity=".75" />
      <path d="M20 40 L190 44" stroke="#fff" strokeOpacity=".25" strokeWidth="1.5" />
      {[48, 152].map((x) => (
        <g key={x}>
          <circle cx={x} cy="52" r="13" fill="#0b0b0c" />
          <circle cx={x} cy="52" r="6" fill="#9ca3af" />
        </g>
      ))}
    </svg>
  );
}

// ── 5 · Car dealer ──
export function CarModel() {
  const red = "#ef4444";
  return (
    <ModelPage kicker="Concept · car dealership" title="Showroom shine, online." url="apexmotors.co.uk" dark points={["Stock synced automatically", "Finance calculator on every car", "Part-exchange enquiries"]} spec={{ palette: ["#0d0f14", "#ef4444", "#151a24", "#94a3b8", "#f1f5f9"], font: sans, fontStyle: { fontWeight: 800, fontStyle: "italic" }, fontName: "Italic display sans", mood: "Sleek · fast · premium" }}>
      <div style={{ background: "linear-gradient(180deg, #0d0f14, #151a24)", color: "#f1f5f9", padding: q(2.4) }}>
        <div className="flex items-center justify-between">
          <span className="font-heading" style={{ fontSize: q(2.1), fontWeight: 800, fontStyle: "italic" }}>
            APEX<span style={{ color: red }}>MOTORS</span>
          </span>
          <span className="flex" style={{ gap: q(1.8), fontSize: q(1.3), color: "#94a3b8" }}>
            <span>Used cars</span>
            <span>Finance</span>
            <span>Sell your car</span>
          </span>
        </div>
        <p className="font-heading" style={{ fontSize: q(4.6), fontWeight: 800, lineHeight: 1, marginTop: q(2.4) }}>Drive away happy.</p>
        <p style={{ fontSize: q(1.4), color: "#94a3b8", marginTop: q(0.8) }}>Hand-picked used cars · every one inspected · from £150/mo</p>
        <div style={{ height: q(14), marginTop: q(1), filter: "drop-shadow(0 2cqw 2cqw rgba(239,68,68,.35))" }}>
          <Car color="#e11d48" />
        </div>
        <div className="grid grid-cols-[1fr_1fr_1fr_auto]" style={{ gap: q(0.8), fontSize: q(1.3), background: "#ffffff0d", border: "1px solid #ffffff1a", borderRadius: q(1.2), padding: q(1) }}>
          {["Any make ▾", "Any model ▾", "Max £20,000 ▾"].map((f) => (
            <span key={f} style={{ padding: `${q(0.9)} ${q(1)}`, color: "#cbd5e1" }}>
              {f}
            </span>
          ))}
          <span style={pill(red, "#fff", { borderRadius: q(0.8) })}>Search 84 cars</span>
        </div>
        <div className="grid grid-cols-3" style={{ gap: q(1.2), marginTop: q(2) }}>
          {[
            ["2021 Compact Hatch", "24k mi · petrol", "£13,495", "£189/mo", "#2563eb"],
            ["2020 Family SUV", "31k mi · hybrid", "£19,995", "£269/mo", "#e5e7eb"],
            ["2022 Electric Saloon", "12k mi · EV", "£24,750", "£329/mo", "#111827"],
          ].map(([n, d, p, m, c]) => (
            <div key={n} style={{ background: "#ffffff0a", border: "1px solid #ffffff14", borderRadius: q(1.2), padding: q(1.2) }}>
              <div style={{ height: q(7), background: "#ffffff08", borderRadius: q(0.8) }}>
                <Car color={c} />
              </div>
              <p style={{ fontSize: q(1.45), fontWeight: 700, marginTop: q(0.8) }}>{n}</p>
              <p style={{ fontSize: q(1.15), color: "#94a3b8" }}>{d}</p>
              <p style={{ fontSize: q(1.7), fontWeight: 800, marginTop: q(0.5) }}>
                {p} <span style={{ fontSize: q(1.2), color: red }}>· {m}</span>
              </p>
            </div>
          ))}
        </div>
      </div>
    </ModelPage>
  );
}

// ── 6 · Dental ──
export function DentalModel() {
  const blue = "#2563eb";
  return (
    <ModelPage kicker="Concept · dental clinic" title="Reassuring before they even arrive." url="brightsidedental.co.uk" points={["Live online booking", "Membership plans sold online", "Gentle reminders & recalls"]} spec={{ palette: ["#2563eb", "#eff6ff", "#dcfce7", "#0f172a", "#ffffff"], font: sans, fontStyle: { fontWeight: 700 }, fontName: "Rounded friendly sans", mood: "Friendly · clean · reassuring" }}>
      <div style={{ background: "linear-gradient(180deg, #eff6ff, #ffffff 45%)", color: "#0f172a", padding: q(2.4) }}>
        <div className="flex items-center justify-between">
          <span className="font-heading" style={{ fontSize: q(2), fontWeight: 800 }}>
            🦷 Brightside<span style={{ color: blue }}>Dental</span>
          </span>
          <span style={pill(blue, "#fff")}>Book online</span>
        </div>
        <div className="grid grid-cols-[1.2fr_1fr] items-center" style={{ gap: q(2), marginTop: q(2.6) }}>
          <div>
            <span style={pill("#dcfce7", "#166534", { fontSize: q(1.15) })}>💚 Nervous patients welcome</span>
            <p className="font-heading" style={{ fontSize: q(4.4), fontWeight: 800, lineHeight: 1.04, marginTop: q(1.2) }}>Smile with confidence.</p>
            <p style={{ fontSize: q(1.4), color: "#475569", marginTop: q(1) }}>Gentle, modern dentistry for the whole family.</p>
          </div>
          <div style={{ background: "#fff", borderRadius: q(1.6), padding: q(1.6), boxShadow: "0 2cqw 4cqw -2cqw rgba(37,99,235,.45)", border: "1px solid #dbeafe" }}>
            <p style={{ fontSize: q(1.45), fontWeight: 800 }}>Book an appointment</p>
            <div className="flex flex-wrap" style={{ gap: q(0.6), marginTop: q(1) }}>
              {["Check-up", "Hygiene", "Whitening", "Aligners"].map((t, i) => (
                <span key={t} style={{ fontSize: q(1.15), padding: `${q(0.5)} ${q(1)}`, borderRadius: 99, background: i === 0 ? blue : "#eff6ff", color: i === 0 ? "#fff" : blue, fontWeight: 700 }}>
                  {t}
                </span>
              ))}
            </div>
            <p style={{ fontSize: q(1.25), color: "#475569", marginTop: q(1.2) }}>Next available</p>
            <p style={{ fontSize: q(1.9), fontWeight: 800 }}>Tomorrow · 09:20</p>
            <span style={pill(blue, "#fff", { display: "block", textAlign: "center", marginTop: q(1) })}>Confirm →</span>
          </div>
        </div>
        <div className="grid grid-cols-2" style={{ gap: q(1.4), marginTop: q(2.6) }}>
          {[
            ["Essential plan", "£14.95/mo", ["2 check-ups a year", "2 hygiene visits", "10% off treatment"]],
            ["Complete plan", "£22.50/mo", ["Everything in Essential", "Emergency cover", "Whitening top-ups"]],
          ].map(([n, p, items], i) => (
            <div key={String(n)} style={{ borderRadius: q(1.4), padding: q(1.6), border: `1.5px solid ${i === 1 ? blue : "#e2e8f0"}`, background: "#fff" }}>
              <p style={{ fontSize: q(1.5), fontWeight: 800 }}>{n}</p>
              <p style={{ fontSize: q(2.2), fontWeight: 800, color: blue }}>{p}</p>
              {(items as string[]).map((t) => (
                <p key={t} style={{ fontSize: q(1.2), color: "#475569", marginTop: q(0.4) }}>
                  ✓ {t}
                </p>
              ))}
            </div>
          ))}
        </div>
        <div className="flex items-center" style={{ gap: q(1), marginTop: q(2) }}>
          {["#1e3a8a", "#0e7490", "#7c3aed"].map((c, i) => (
            <span key={c} style={{ width: q(4.2), height: q(4.2), borderRadius: 99, background: c, color: "#fff", display: "grid", placeItems: "center", fontSize: q(1.4), fontWeight: 800, marginLeft: i ? q(-1.4) : 0, border: "2px solid #fff" }}>
              {["DR", "AK", "JM"][i]}
            </span>
          ))}
          <span style={{ fontSize: q(1.3), color: "#475569" }}>Meet our friendly team →</span>
        </div>
      </div>
    </ModelPage>
  );
}

// ── 7 · Gym ──
export function GymModel() {
  const lime = "#a3e635";
  const days = ["MON", "TUE", "WED", "THU", "FRI"];
  const classes = [
    ["HIIT", "Spin", "HIIT", "Box", "Spin"],
    ["Yoga", "Strength", "Pilates", "Strength", "Yoga"],
  ];
  return (
    <ModelPage kicker="Concept · gym & fitness" title="Energy you can feel on the screen." url="voltfitness.co.uk" dark points={["Class booking & waitlists", "Memberships paid online", "Free-pass leads followed up"]} spec={{ palette: ["#09090b", "#a3e635", "#27272a", "#e4e4e7", "#fafafa"], font: sans, fontStyle: { fontWeight: 800, fontStyle: "italic", textTransform: "uppercase" }, fontName: "Italic caps, extra bold", mood: "Loud · energetic · bold" }}>
      <div style={{ background: "#09090b", color: "#fafafa", padding: q(2.4), backgroundImage: `linear-gradient(115deg, transparent 62%, ${lime}14 62% 70%, transparent 70%)` }}>
        <div className="flex items-center justify-between">
          <span className="font-heading" style={{ fontSize: q(2.2), fontWeight: 800, fontStyle: "italic", color: lime }}>
            VOLT⚡
          </span>
          <span style={pill(lime, "#111")}>Free 3-day pass</span>
        </div>
        <p className="font-heading" style={{ fontSize: q(5.6), fontWeight: 800, fontStyle: "italic", lineHeight: 0.92, marginTop: q(2.4), textTransform: "uppercase" }}>
          Stronger
          <br />
          <span style={{ color: lime }}>every week.</span>
        </p>
        <div className="grid grid-cols-5" style={{ gap: q(0.6), marginTop: q(2.6), fontSize: q(1.2) }}>
          {days.map((d, i) => (
            <div key={d}>
              <p style={{ fontWeight: 800, color: "#a1a1aa", textAlign: "center" }}>{d}</p>
              {classes.map((row, r) => (
                <p key={r} style={{ marginTop: q(0.6), textAlign: "center", padding: `${q(0.9)} 0`, borderRadius: q(0.8), background: r === 0 ? `${lime}22` : "#ffffff0d", color: r === 0 ? lime : "#e4e4e7", fontWeight: 700 }}>
                  {row[i]}
                </p>
              ))}
            </div>
          ))}
        </div>
        <div className="grid grid-cols-3" style={{ gap: q(1), marginTop: q(2.4) }}>
          {[
            ["Off-peak", "£19"],
            ["Standard", "£29"],
            ["Unlimited+", "£39"],
          ].map(([n, p], i) => (
            <div key={n} style={{ borderRadius: q(1.2), padding: q(1.4), background: i === 1 ? lime : "#ffffff0a", color: i === 1 ? "#111" : "#fafafa", border: i === 1 ? "none" : "1px solid #ffffff1a" }}>
              <p style={{ fontSize: q(1.3), fontWeight: 800 }}>{n}</p>
              <p style={{ fontSize: q(2.6), fontWeight: 800 }}>
                {p}
                <span style={{ fontSize: q(1.2) }}>/mo</span>
              </p>
              <p style={{ fontSize: q(1.1), opacity: 0.75 }}>{i === 1 ? "Most popular" : "No contract"}</p>
            </div>
          ))}
        </div>
      </div>
    </ModelPage>
  );
}

// ── 8 · Hotel ──
export function HotelModel() {
  const gold = "#c8a96a";
  return (
    <ModelPage kicker="Concept · boutique hotel" title="Book direct — and feel it already." url="thelindenhouse.co.uk" points={["Direct bookings, no commission", "Rooms & rates always in sync", "Pre-arrival emails sent for you"]} spec={{ palette: ["#1e2a3a", "#c8a96a", "#f7f3ea", "#e98a6b", "#8a6d3b"], font: serif, fontName: "Elegant serif, spaced caps", mood: "Elegant · quiet · luxurious" }}>
      <div style={{ background: "#f7f3ea", color: "#1e2a3a" }}>
        <div className="flex items-center justify-between" style={{ padding: `${q(1.6)} ${q(2.4)}`, background: "#1e2a3a", color: "#f7f3ea" }}>
          <span style={{ fontFamily: serif, fontSize: q(2.1), letterSpacing: "0.12em" }}>THE LINDEN HOUSE</span>
          <span className="flex" style={{ gap: q(1.8), fontSize: q(1.3), color: "#cbd5e1" }}>
            <span>Rooms</span>
            <span>Dining</span>
            <span>Spa</span>
          </span>
        </div>
        <div className="grid grid-cols-[1fr_1.2fr] items-center" style={{ gap: q(2.4), padding: q(2.4) }}>
          <div style={{ height: q(22), borderRadius: `${q(11)} ${q(11)} 0 0`, background: "linear-gradient(180deg, #f9c58b, #e98a6b 45%, #6b4c7a)", border: `${q(0.8)} solid #1e2a3a`, position: "relative", overflow: "hidden" }}>
            <div style={{ position: "absolute", left: "50%", top: 0, bottom: 0, width: q(0.6), background: "#1e2a3a" }} />
            <div style={{ position: "absolute", left: 0, right: 0, top: "50%", height: q(0.6), background: "#1e2a3a" }} />
          </div>
          <div>
            <p className="font-label" style={{ fontSize: q(1.2), letterSpacing: "0.22em", color: "#8a6d3b" }}>
              COTSWOLDS · 12 ROOMS
            </p>
            <p style={{ fontFamily: serif, fontSize: q(3.7), lineHeight: 1.08, marginTop: q(0.8) }}>A quiet escape, two hours from London.</p>
          </div>
        </div>
        <div className="grid grid-cols-[1fr_1fr_1fr_auto]" style={{ gap: q(0.8), margin: `0 ${q(2.4)}`, background: "#fff", borderRadius: q(1.2), padding: q(1), fontSize: q(1.3), boxShadow: "0 1.5cqw 3cqw -2cqw rgba(30,42,58,.4)" }}>
          {["📅 Check-in · 14 Nov", "📅 Check-out · 16 Nov", "👥 2 guests"].map((f) => (
            <span key={f} style={{ padding: `${q(0.9)} ${q(0.8)}` }}>
              {f}
            </span>
          ))}
          <span style={pill("#1e2a3a", gold, { borderRadius: q(0.8) })}>Check availability</span>
        </div>
        <div className="grid grid-cols-3" style={{ gap: q(1.2), padding: q(2.4) }}>
          {[
            ["Garden Room", "£185", "linear-gradient(135deg,#c9d8c5,#8fa98a)"],
            ["Linden Suite", "£260", "linear-gradient(135deg,#e7d3b5,#b8936a)"],
            ["The Loft", "£220", "linear-gradient(135deg,#cfd6e6,#8592b3)"],
          ].map(([n, p, bg]) => (
            <div key={n}>
              <div style={{ height: q(8), borderRadius: q(1), background: bg }} />
              <p style={{ fontFamily: serif, fontSize: q(1.7), marginTop: q(0.7) }}>{n}</p>
              <p style={{ fontSize: q(1.2), color: "#64748b" }}>from {p} / night</p>
            </div>
          ))}
        </div>
        <p className="text-center" style={{ fontSize: q(1.3), paddingBottom: q(2), color: "#8a6d3b" }}>
          🍳 Breakfast included · 🐕 Dog friendly · 🅿️ Free parking · Best rate when you book direct
        </p>
      </div>
    </ModelPage>
  );
}

// ── 9 · Tech startup ──
export function SaasModel() {
  return (
    <ModelPage kicker="Concept · tech startup" title="Launch-ready from day one." url="nimbus.app" dark points={["Trial sign-ups that convert", "Pricing that explains itself", "Fast, SEO-friendly docs & blog"]} spec={{ palette: ["#0b1020", "#7c3aed", "#2563eb", "#a78bfa", "#e2e8f0"], font: sans, fontStyle: { fontWeight: 800 }, fontName: "Modern geometric sans", mood: "Modern · techy · optimistic" }}>
      <div style={{ background: "radial-gradient(circle at 20% 10%, #4c1d95 0, transparent 40%), radial-gradient(circle at 90% 30%, #1d4ed8 0, transparent 40%), #0b1020", color: "#e2e8f0", padding: q(2.4) }}>
        <div className="flex items-center justify-between">
          <span className="font-heading" style={{ fontSize: q(2), fontWeight: 800 }}>☁ nimbus</span>
          <span className="flex items-center" style={{ gap: q(1.6), fontSize: q(1.3), color: "#94a3b8" }}>
            <span>Product</span>
            <span>Pricing</span>
            <span style={pill("#fff", "#0b1020")}>Start free</span>
          </span>
        </div>
        <div className="text-center" style={{ marginTop: q(2.6) }}>
          <span style={pill("#ffffff14", "#c4b5fd", { fontSize: q(1.15), border: "1px solid #ffffff22" })}>New: AI meeting summaries ✨</span>
          <p className="font-heading" style={{ fontSize: q(4.4), fontWeight: 800, lineHeight: 1.05, marginTop: q(1.4) }}>
            Ship faster with
            <br />
            <span style={{ background: "linear-gradient(90deg,#a78bfa,#60a5fa)", WebkitBackgroundClip: "text", color: "transparent" }}>fewer meetings.</span>
          </p>
          <div className="flex justify-center" style={{ gap: q(1), marginTop: q(1.6) }}>
            <span style={pill("linear-gradient(90deg,#7c3aed,#2563eb)", "#fff")}>Start free trial</span>
            <span style={pill("transparent", "#e2e8f0", { border: "1px solid #ffffff33" })}>Book a demo</span>
          </div>
        </div>
        <div className="grid grid-cols-3" style={{ gap: q(1), marginTop: q(2.4), background: "#0f172acc", border: "1px solid #ffffff1a", borderRadius: q(1.4), padding: q(1.4) }}>
          {[
            ["To do", ["Onboarding flow", "Pricing page copy"]],
            ["In progress", ["Billing v2", "Mobile nav"]],
            ["Done ✓", ["SSO login", "Weekly digest"]],
          ].map(([col, cards]) => (
            <div key={String(col)}>
              <p style={{ fontSize: q(1.15), color: "#94a3b8", fontWeight: 700 }}>{col}</p>
              {(cards as string[]).map((c, i) => (
                <p key={c} style={{ marginTop: q(0.7), fontSize: q(1.2), background: "#1e293b", borderRadius: q(0.7), padding: q(0.9), borderLeft: `3px solid ${["#a78bfa", "#60a5fa", "#34d399"][i % 3]}` }}>
                  {c}
                </p>
              ))}
            </div>
          ))}
        </div>
        <p className="text-center font-label" style={{ fontSize: q(1.25), letterSpacing: "0.3em", color: "#64748b", marginTop: q(2) }}>
          ACME · NORTHWIND · LUMEN · ORBIT
        </p>
      </div>
    </ModelPage>
  );
}
