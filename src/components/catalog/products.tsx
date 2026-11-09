import type { ReactNode } from "react";
import { Browser, Checks, Chips, GRADIENT, INK, Kicker, Lead, Meta, MUTED, Paper, Title, q } from "./pages";
import { FashionProduct, PerfumeViewer, SneakerProduct, ToolProduct } from "./Spin360";

/*
 * Chapter: product pages that sell — how shops present clothes, tools,
 * accessories and launches. The 360° viewers are live: they turn on their
 * own and visitors can drag them. All brands are fictional concepts.
 */

function TryIt({ children }: { children: ReactNode }) {
  return (
    <p className="font-label font-bold uppercase" style={{ fontSize: q(2), letterSpacing: "0.14em", color: "#c2410c", marginTop: q(2.4) }}>
      👆 {children}
    </p>
  );
}

function Notes({ items }: { items: [string, string][] }) {
  return (
    <div className="mt-auto grid grid-cols-3" style={{ gap: q(1.8) }}>
      {items.map(([t, d]) => (
        <div key={t} style={{ background: "#fff", border: "1px solid #1b172214", borderRadius: q(1.6), padding: q(1.8) }}>
          <p className="font-heading font-bold" style={{ fontSize: q(2.2) }}>
            {t}
          </p>
          <p style={{ fontSize: q(1.8), color: MUTED, marginTop: q(0.5), lineHeight: 1.35 }}>{d}</p>
        </div>
      ))}
    </div>
  );
}

export function ProductText() {
  return (
    <Paper folio chapter="Product pages">
      <Kicker>Chapter 02 · Product pages that sell</Kicker>
      <Title>Show products so well, they sell themselves.</Title>
      <Lead>In a shop, people pick things up and turn them over. A great product page lets them do exactly that.</Lead>
      <Checks
        items={[
          "360° spin — customers turn the product with a finger",
          "Colour, size & bundle pickers that update instantly",
          "Build-your-own configurators",
          "Specs, size guides and comparisons",
          "Stock, delivery date & reviews by the button",
          "Launch pages that tell a product's story",
        ]}
      />
      <p style={{ marginTop: q(3), fontSize: q(2.4), lineHeight: 1.45, color: MUTED, background: "#fff", border: "1px dashed #1b172233", borderRadius: q(1.6), padding: q(2) }}>
        📸 360° views are made from a 24–36 photo spin of your product or a 3D model. I&apos;ll show you how to shoot it — a phone
        and a turntable are enough.
      </p>
      <Meta ideal="clothing · tools & hardware · accessories · beauty · furniture" price="Part of every shop I build" />
    </Paper>
  );
}

export function FashionPage() {
  return (
    <Paper folio chapter="Product pages">
      <Kicker>Concept · clothing product page</Kicker>
      <Title size={5.4}>Turn it. Try every colour.</Title>
      <Browser url="northandthread.co.uk/heavyweight-hoodie" style={{ marginTop: q(3.4) }}>
        <FashionProduct />
      </Browser>
      <TryIt>Try it: drag the hoodie, tap a colour</TryIt>
      <Notes
        items={[
          ["360° turntable", "Front, side and back — the way they'd hold it in a shop."],
          ["Live colours", "Every colourway, without a photo shoot for each."],
          ["Size & stock", "Low-stock nudges and size guide right where they decide."],
        ]}
      />
    </Paper>
  );
}

export function ToolsPage() {
  return (
    <Paper folio chapter="Product pages">
      <Kicker>Concept · tools & hardware</Kicker>
      <Title size={5.4}>Every angle, every spec.</Title>
      <Browser url="forgetools.co.uk/18v-combi-drill" dark style={{ marginTop: q(3.4) }}>
        <ToolProduct />
      </Browser>
      <TryIt>Try it: spin the drill, switch the kit</TryIt>
      <div className="mt-auto flex items-center" style={{ gap: q(1.4), background: "#fff", border: "1px solid #1b172214", borderRadius: q(1.6), padding: q(1.8) }}>
        <span style={{ fontSize: q(2), fontWeight: 800 }}>Bought together:</span>
        {["🛠 Drill", "🔩 Bit set", "🧰 Case"].map((t, i) => (
          <span key={t} className="flex items-center" style={{ gap: q(1.4), fontSize: q(1.9) }}>
            {i > 0 && <span style={{ color: MUTED }}>+</span>}
            <span style={{ background: "#f4f4f5", borderRadius: q(1), padding: `${q(0.8)} ${q(1.2)}` }}>{t}</span>
          </span>
        ))}
        <span style={{ marginLeft: "auto", fontSize: q(1.9), fontWeight: 800, color: "#15803d" }}>Save £18</span>
      </div>
    </Paper>
  );
}

export function SneakerPage() {
  return (
    <Paper folio chapter="Product pages">
      <Kicker>Concept · accessories configurator</Kicker>
      <Title size={5.4}>Let them design it — then buy it.</Title>
      <Browser url="stridelab.co.uk/design" style={{ marginTop: q(3.4) }}>
        <SneakerProduct />
      </Browser>
      <TryIt>Try it: pick colours, then drag the shoe</TryIt>
      <Notes
        items={[
          ["Real 3D preview", "Every choice appears instantly, from every angle."],
          ["Made to order", "Designs flow straight into your order system."],
          ["Share & save", "Customers save designs and send them to friends."],
        ]}
      />
    </Paper>
  );
}

export function PerfumePage() {
  const gold = "#d9b16a";
  return (
    <Paper folio chapter="Product pages">
      <Kicker>Concept · product launch page</Kicker>
      <Title size={5.4}>A launch that feels like an event.</Title>
      <Browser url="maisonambre.co.uk/no7" dark style={{ marginTop: q(3.4) }}>
        <div className="grid grid-cols-[1fr_1fr] items-center" style={{ background: "radial-gradient(circle at 30% 45%, #4a2a12, #120a05 70%)", color: "#f6efe3", padding: q(2.4), gap: q(2) }}>
          <div style={{ height: q(54) }}>
            <PerfumeViewer />
          </div>
          <div>
            <p className="font-label font-bold" style={{ fontSize: q(1.2), letterSpacing: "0.22em", color: gold }}>
              NEW · LIMITED EDITION
            </p>
            <p style={{ fontFamily: "Georgia, serif", fontSize: q(4.6), lineHeight: 1, marginTop: q(1) }}>Nº 7</p>
            <p style={{ fontFamily: "Georgia, serif", fontStyle: "italic", fontSize: q(2.6), color: gold }}>Amber Night</p>
            <div style={{ marginTop: q(1.6), display: "grid", gap: q(0.7), fontSize: q(1.35) }}>
              {[
                ["Top", "bergamot, pink pepper"],
                ["Heart", "rose, saffron"],
                ["Base", "amber, oud, vanilla"],
              ].map(([k, v]) => (
                <p key={k}>
                  <span style={{ color: gold, fontWeight: 700, display: "inline-block", width: q(6) }}>{k}</span>
                  {v}
                </p>
              ))}
            </div>
            <div className="flex" style={{ gap: q(0.8), marginTop: q(1.6) }}>
              {["50 ml · £78", "100 ml · £112"].map((s, i) => (
                <span key={s} style={{ fontSize: q(1.3), padding: `${q(0.8)} ${q(1.2)}`, borderRadius: 99, border: `1px solid ${i === 0 ? gold : "#ffffff33"}`, color: i === 0 ? gold : "#f6efe3" }}>
                  {s}
                </span>
              ))}
            </div>
            <div style={{ marginTop: q(1.6), background: gold, color: "#1a0f06", textAlign: "center", fontWeight: 800, fontSize: q(1.5), padding: `${q(1.3)} 0`, borderRadius: 99 }}>Add to bag</div>
            <p style={{ fontSize: q(1.2), color: "#cbb79a", marginTop: q(0.9) }}>✦ Free engraving &amp; gift wrap</p>
          </div>
        </div>
      </Browser>
      <TryIt>Try it: drag the bottle to read the label</TryIt>
      <Chips items={["✨ Launch pages", "📜 Scroll storytelling", "🎁 Gift options", "⏳ Pre-orders"]} style={{ marginTop: "auto" }} />
    </Paper>
  );
}

export function CategoryPage() {
  const products = [
    { e: "⌚", n: "Field Watch", p: "£129", bg: "#e7eef6", badge: "NEW" },
    { e: "🕶️", n: "Aviator Shades", p: "£48", was: "£60", bg: "#f6ece1", badge: "-20%" },
    { e: "🎒", n: "Roll-top Pack", p: "£85", bg: "#e8efe6" },
    { e: "👜", n: "Canvas Tote", p: "£36", bg: "#f3e8ef", badge: "LOW STOCK" },
    { e: "🧢", n: "Waxed Cap", p: "£24", bg: "#eceae4" },
    { e: "👛", n: "Card Wallet", p: "£29", bg: "#efe9f8" },
  ];
  return (
    <Paper folio chapter="Product pages">
      <Kicker>Concept · category page with quick view</Kicker>
      <Title size={5.4}>Browsing that feels effortless.</Title>
      <Browser url="urbankit.co.uk/accessories" style={{ marginTop: q(3.4) }}>
        <div className="relative" style={{ background: "#fff", color: INK }}>
          <div className="flex items-center" style={{ gap: q(1.6), padding: `${q(1.4)} ${q(2)}`, borderBottom: "1px solid #0000000f" }}>
            <span className="font-heading" style={{ fontSize: q(2), fontWeight: 800 }}>urbankit</span>
            <span style={{ flex: 1, fontSize: q(1.3), color: "#9ca3af", background: "#f4f4f5", borderRadius: 99, padding: `${q(0.8)} ${q(1.6)}` }}>🔍 Search 2,400 products…</span>
            <span style={{ fontSize: q(1.4) }}>♡ 🛍</span>
          </div>
          <div className="grid grid-cols-[17cqw_1fr]" style={{ gap: q(1.8), padding: q(1.8) }}>
            <div style={{ fontSize: q(1.25) }}>
              <p style={{ fontWeight: 800 }}>Category</p>
              {["Watches", "Sunglasses", "Bags", "Hats"].map((c, i) => (
                <p key={c} style={{ marginTop: q(0.7), color: "#4b5563" }}>
                  <span style={{ display: "inline-block", width: q(1.6), height: q(1.6), borderRadius: q(0.3), border: "1px solid #9ca3af", background: i < 2 ? INK : "#fff", verticalAlign: "middle", marginRight: q(0.6) }} />
                  {c}
                </p>
              ))}
              <p style={{ fontWeight: 800, marginTop: q(1.6) }}>Colour</p>
              <div className="flex flex-wrap" style={{ gap: q(0.6), marginTop: q(0.7) }}>
                {["#111827", "#92400e", "#1d4ed8", "#15803d", "#e5e7eb", "#be123c"].map((c) => (
                  <span key={c} style={{ width: q(2.2), height: q(2.2), borderRadius: 99, background: c, boxShadow: "inset 0 0 0 1px #0002" }} />
                ))}
              </div>
              <p style={{ fontWeight: 800, marginTop: q(1.6) }}>Price</p>
              <div className="relative" style={{ height: q(0.6), background: "#e5e7eb", borderRadius: 99, marginTop: q(1.4) }}>
                <div style={{ position: "absolute", left: "15%", right: "30%", top: 0, bottom: 0, background: INK, borderRadius: 99 }} />
                {["15%", "70%"].map((l) => (
                  <span key={l} style={{ position: "absolute", left: l, top: "50%", width: q(1.8), height: q(1.8), borderRadius: 99, background: "#fff", border: `2px solid ${INK}`, transform: "translate(-50%,-50%)" }} />
                ))}
              </div>
              <p style={{ marginTop: q(1.2), color: "#6b7280" }}>£20 — £130</p>
            </div>
            <div>
              <div className="flex justify-between" style={{ fontSize: q(1.25), color: "#6b7280" }}>
                <span>
                  <b style={{ color: INK }}>Accessories</b> · 126 products
                </span>
                <span>Sort: Best sellers ▾</span>
              </div>
              <div className="grid grid-cols-3" style={{ gap: q(1.2), marginTop: q(1.2) }}>
                {products.map((p) => (
                  <div key={p.n}>
                    <div className="relative" style={{ height: q(17), borderRadius: q(1), background: p.bg, display: "grid", placeItems: "center", fontSize: q(7) }}>
                      {p.e}
                      {p.badge && (
                        <span style={{ position: "absolute", left: q(0.8), top: q(0.8), fontSize: q(1), fontWeight: 800, background: p.badge === "-20%" ? "#dc2626" : INK, color: "#fff", padding: `${q(0.3)} ${q(0.8)}`, borderRadius: 99 }}>
                          {p.badge}
                        </span>
                      )}
                    </div>
                    <p style={{ fontSize: q(1.35), fontWeight: 700, marginTop: q(0.6) }}>{p.n}</p>
                    <p style={{ fontSize: q(1.3) }}>
                      {p.p} {p.was && <s style={{ color: "#9ca3af" }}>{p.was}</s>}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
          {/* Quick view */}
          <div
            className="absolute grid grid-cols-[1fr_1.2fr]"
            style={{ right: q(2), bottom: q(2), width: q(46), gap: q(1.4), background: "#fff", borderRadius: q(1.6), padding: q(1.6), boxShadow: "0 3cqw 6cqw -2cqw rgba(0,0,0,.45)", border: "1px solid #0000001a" }}
          >
            <div style={{ borderRadius: q(1), background: "#e7eef6", display: "grid", placeItems: "center", fontSize: q(8) }}>⌚</div>
            <div>
              <p className="font-label font-bold" style={{ fontSize: q(1), letterSpacing: "0.14em", color: "#6b7280" }}>
                QUICK VIEW
              </p>
              <p style={{ fontSize: q(1.8), fontWeight: 800 }}>Field Watch</p>
              <p style={{ fontSize: q(1.3), color: "#d97706" }}>★★★★★</p>
              <div className="flex" style={{ gap: q(0.5), marginTop: q(0.8) }}>
                {["38mm", "42mm"].map((s, i) => (
                  <span key={s} style={{ fontSize: q(1.15), padding: `${q(0.5)} ${q(1)}`, borderRadius: q(0.6), border: `1px solid ${i === 1 ? INK : "#d1d5db"}`, fontWeight: 700 }}>
                    {s}
                  </span>
                ))}
              </div>
              <div style={{ marginTop: q(1), background: GRADIENT, color: "#fff", textAlign: "center", fontWeight: 800, fontSize: q(1.3), padding: `${q(1)} 0`, borderRadius: 99 }}>Add · £129</div>
            </div>
          </div>
        </div>
      </Browser>
      <Notes
        items={[
          ["Smart filters", "Size, colour and price — results update instantly."],
          ["Quick view", "Add to bag without leaving the page."],
          ["Badges that sell", "New, sale and low-stock tags, all automatic."],
        ]}
      />
    </Paper>
  );
}
