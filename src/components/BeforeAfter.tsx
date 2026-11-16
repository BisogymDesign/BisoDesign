"use client";

import { useState } from "react";

/**
 * Drag-to-compare: an outdated website vs the same business redesigned.
 * Sizes use cqw so the mockups scale with the box.
 */
const q = (n: number) => `${n}cqw`;

function Before() {
  return (
    <div className="absolute inset-0" style={{ background: "#e8e6df", color: "#222", fontFamily: "'Times New Roman', serif" }}>
      <div style={{ background: "linear-gradient(#3b5ba5, #1e3a7a)", color: "#fff", padding: `${q(1.6)} ${q(3)}`, borderBottom: "3px solid #c00" }}>
        <p style={{ fontSize: q(3.4), fontWeight: 700 }}>Smith &amp; Sons Plumbing Ltd</p>
        <p style={{ fontSize: q(1.4) }}>Established 1987 · Quality Plumbing Services · Est. Free Quotes Available</p>
      </div>
      <div className="flex" style={{ gap: q(1.4), padding: `${q(0.8)} ${q(3)}`, background: "#ccc", fontSize: q(1.3), textDecoration: "underline", color: "#00e" }}>
        {["Home", "About Us", "Services", "Gallery", "Testimonials", "Links", "Contact Us"].map((l) => (
          <span key={l}>{l}</span>
        ))}
      </div>
      <div className="grid grid-cols-[1fr_2fr]" style={{ gap: q(2), padding: q(3) }}>
        <div style={{ border: "1px solid #999", background: "#fff", padding: q(1.4), fontSize: q(1.3) }}>
          <p style={{ fontWeight: 700, color: "#c00" }}>** NEWS **</p>
          <p>We now accept cheques!</p>
          <p style={{ marginTop: q(1) }}>Visitors: 004213</p>
          <div style={{ marginTop: q(1.2), height: q(10), background: "repeating-linear-gradient(45deg,#ddd 0 6px,#bbb 6px 12px)", display: "grid", placeItems: "center", fontSize: q(1.1) }}>
            [image]
          </div>
        </div>
        <div style={{ fontSize: q(1.45), lineHeight: 1.35 }}>
          <p style={{ fontSize: q(2.6), color: "#1e3a7a", fontWeight: 700 }}>Welcome to our Website!!!</p>
          <p style={{ marginTop: q(1) }}>
            Smith &amp; Sons have been providing plumbing and heating services to the local area for many years. We offer a wide range of services including boilers, bathrooms, central heating, leaks, taps, toilets and much more. Please see our services page for more information about our services.
          </p>
          <p style={{ marginTop: q(1) }}>For a quote please telephone the office between 9am and 5pm Monday to Friday or fill in the enquiry form on the contact us page.</p>
          <p style={{ marginTop: q(1.4), fontSize: q(1.2), color: "#666" }}>Best viewed in 1024×768 · Last updated: March 2014</p>
        </div>
      </div>
    </div>
  );
}

function After() {
  const orange = "#ff7a1a";
  return (
    <div className="absolute inset-0" style={{ background: "radial-gradient(circle at 80% 10%, #22406b, #0b1b33 60%)", color: "#f5f8ff", fontFamily: "var(--font-inter), system-ui, sans-serif" }}>
      <div className="flex items-center justify-between" style={{ padding: `${q(2)} ${q(3)}` }}>
        <span style={{ fontFamily: "var(--font-sora), sans-serif", fontWeight: 800, fontSize: q(2.4) }}>
          <span style={{ display: "inline-block", width: q(2.6), height: q(2.6), borderRadius: q(0.7), background: orange, verticalAlign: "middle", marginRight: q(1) }} />
          Smith &amp; Sons
        </span>
        <span style={{ background: orange, color: "#1a0d00", fontWeight: 700, fontSize: q(1.5), padding: `${q(0.9)} ${q(2)}`, borderRadius: 99 }}>📞 Call now</span>
      </div>
      <div style={{ padding: `${q(2.4)} ${q(3)}` }}>
        <p style={{ display: "inline-block", fontSize: q(1.3), fontWeight: 700, letterSpacing: "0.1em", color: "#ffb37a", background: "#ff7a1a22", padding: `${q(0.6)} ${q(1.4)}`, borderRadius: 99 }}>
          SAME-DAY CALLOUTS · 7 DAYS
        </p>
        <p style={{ fontFamily: "var(--font-sora), sans-serif", fontWeight: 800, fontSize: q(5.4), lineHeight: 1.05, marginTop: q(1.6) }}>
          Boiler broken?
          <br />
          <span style={{ color: orange }}>We&apos;ll be there today.</span>
        </p>
        <p style={{ fontSize: q(1.7), color: "#a9b7cf", marginTop: q(1.4), maxWidth: "70%" }}>Fixed prices agreed before we start. Friendly local engineers since 1987.</p>
        <div className="flex" style={{ gap: q(1.2), marginTop: q(2) }}>
          <span style={{ background: orange, color: "#1a0d00", fontWeight: 700, fontSize: q(1.6), padding: `${q(1.2)} ${q(2.4)}`, borderRadius: 99 }}>Get a free quote</span>
          <span style={{ border: "1px solid #ffffff40", fontWeight: 600, fontSize: q(1.6), padding: `${q(1.2)} ${q(2.4)}`, borderRadius: 99 }}>💬 WhatsApp us</span>
        </div>
        <div className="grid grid-cols-3" style={{ gap: q(1.2), marginTop: q(3) }}>
          {[
            ["🔥", "Boiler repairs"],
            ["💧", "Leaks & pipes"],
            ["🛁", "Bathrooms"],
          ].map(([e, t]) => (
            <div key={t} style={{ background: "#ffffff0d", border: "1px solid #ffffff1a", borderRadius: q(1.2), padding: q(1.6), fontSize: q(1.6), fontWeight: 700 }}>
              <span style={{ fontSize: q(2.6) }}>{e}</span>
              <p style={{ marginTop: q(0.6) }}>{t}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function BeforeAfter() {
  // start mostly on the redesign, with a slice of the old site showing
  const [pos, setPos] = useState(28);
  return (
    <div className="mock relative w-full select-none overflow-hidden rounded-2xl border border-white/10" style={{ aspectRatio: "16 / 10" }}>
      <Before />
      <div className="absolute inset-0" style={{ clipPath: `inset(0 0 0 ${pos}%)` }}>
        <After />
      </div>
      {/* handle */}
      <div className="pointer-events-none absolute inset-y-0" style={{ left: `${pos}%`, width: 3, transform: "translateX(-50%)", background: "#22d3ee", boxShadow: "0 0 20px #22d3ee" }}>
        <span className="absolute left-1/2 top-1/2 flex h-10 w-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-2 border-flare-cyan bg-night font-label text-xs text-flare-cyan">
          ⟷
        </span>
      </div>
      <span className="pointer-events-none absolute left-3 top-3 rounded-full bg-black/70 px-3 py-1 font-label text-[10px] uppercase tracking-[0.2em] text-white">Before</span>
      <span className="pointer-events-none absolute right-3 top-3 rounded-full bg-flare-gradient px-3 py-1 font-label text-[10px] uppercase tracking-[0.2em] text-night">After</span>
      <input
        type="range"
        min={0}
        max={100}
        value={pos}
        onChange={(e) => setPos(Number(e.target.value))}
        aria-label="Compare the old website with the redesign"
        className="absolute inset-0 h-full w-full cursor-ew-resize opacity-0"
      />
    </div>
  );
}
