import type { SiteTemplate } from "@/data/templates";

/**
 * A miniature, fully-styled website rendered from template data.
 * Sizes use container-query units (cqw) so the mockup scales perfectly
 * to whatever box it's placed in — card, hero or print.
 */

function heroArt(t: SiteTemplate): React.CSSProperties {
  const { primary: p, accent: a, surface: s, bg } = t.palette;
  switch (t.heroArt) {
    case "road":
      return {
        background: `repeating-linear-gradient(180deg, ${p} 0 9%, transparent 9% 18%) center / 5% 100% no-repeat, linear-gradient(180deg, ${s}, #2a2e37 60%, #3a3f4a)`,
        clipPath: "polygon(30% 0, 70% 0, 100% 100%, 0 100%)",
      };
    case "circles":
      return {
        background: `radial-gradient(circle at 60% 45%, ${p} 0 14%, transparent 14.5%), radial-gradient(circle at 60% 45%, transparent 0 24%, ${a}66 24.5% 26%, transparent 26.5%), radial-gradient(circle at 60% 45%, transparent 0 36%, ${p}44 36.5% 37.5%, transparent 38%), linear-gradient(160deg, ${a}33, ${p}22)`,
      };
    case "grid":
      return {
        background: `radial-gradient(circle at 55% 45%, ${p}cc 0 6%, ${p}33 12%, transparent 30%), linear-gradient(${a}55 1px, transparent 1px) 0 0/12% 16%, linear-gradient(90deg, ${a}55 1px, transparent 1px) 0 0/12% 16%, ${s}`,
      };
    case "waves":
      return {
        background: `radial-gradient(circle at 25% 30%, ${p}55 0 10%, transparent 11%), radial-gradient(circle at 70% 60%, ${a}55 0 14%, transparent 15%), radial-gradient(circle at 45% 80%, ${p}33 0 8%, transparent 9%), linear-gradient(160deg, ${p}22, ${a}22)`,
      };
    case "flame":
      return {
        background: `radial-gradient(ellipse at 50% 110%, ${p} 0 25%, ${a}aa 40%, transparent 65%), radial-gradient(ellipse at 30% 100%, ${a}88 0 20%, transparent 45%), linear-gradient(180deg, ${bg}, ${s})`,
      };
    case "stripes":
      return {
        background: `repeating-linear-gradient(120deg, transparent 0 18%, ${p} 18% 24%, transparent 24% 28%, ${a}cc 28% 30%, transparent 30% 100%), linear-gradient(180deg, ${s}, ${bg})`,
      };
    case "bars":
      return {
        background: `linear-gradient(${p}, ${p}) 12% 100%/10% 40% no-repeat, linear-gradient(${p}, ${p}) 32% 100%/10% 60% no-repeat, linear-gradient(${a}, ${a}) 52% 100%/10% 75% no-repeat, linear-gradient(${p}, ${p}) 72% 100%/10% 90% no-repeat, linear-gradient(180deg, ${s}, ${bg})`,
      };
    case "leaves":
      return {
        background: `radial-gradient(ellipse 22% 34% at 30% 40%, ${p}aa 0 98%, transparent 100%), radial-gradient(ellipse 18% 28% at 62% 55%, ${a}cc 0 98%, transparent 100%), radial-gradient(ellipse 14% 22% at 45% 75%, ${p}77 0 98%, transparent 100%), linear-gradient(160deg, ${a}22, ${p}1a)`,
      };
  }
}

function Chrome({ url, children }: { url: string; children: React.ReactNode }) {
  return (
    <div className="overflow-hidden rounded-xl border border-white/10 bg-[#0e0d13] shadow-[0_30px_80px_-35px_rgba(139,92,246,0.7)]">
      <div className="flex items-center gap-1.5 border-b border-white/5 px-3 py-2">
        <span className="h-2 w-2 rounded-full bg-[#ff5f57]" />
        <span className="h-2 w-2 rounded-full bg-[#febc2e]" />
        <span className="h-2 w-2 rounded-full bg-[#28c840]" />
        <span className="ml-3 flex-1 truncate rounded-md bg-white/5 px-2 py-0.5 font-label text-[10px] text-white/50">
          🔒 {url}
        </span>
      </div>
      {children}
    </div>
  );
}

export default function SiteMockup({
  template: t,
  variant = "desktop",
}: {
  template: SiteTemplate;
  variant?: "desktop" | "phone";
}) {
  const c = t.palette;
  const font = t.fontStyle === "serif" ? "Georgia, 'Times New Roman', serif" : "var(--font-sora), system-ui, sans-serif";
  const url = `${t.brand.toLowerCase().replace(/[^a-z0-9]+/g, "")}.co.uk`;

  if (variant === "phone") {
    return (
      <div className="mx-auto w-full max-w-[260px] rounded-[2rem] border border-white/15 bg-[#0b0a10] p-2 shadow-[0_30px_80px_-30px_rgba(139,92,246,0.6)]">
        <div className="mock relative overflow-hidden rounded-[1.6rem]" style={{ background: c.bg, color: c.text }}>
          <div className="flex items-center justify-between" style={{ padding: "5cqw 6cqw" }}>
            <span style={{ fontFamily: font, fontWeight: 800, fontSize: "5cqw" }}>{t.brand}</span>
            <span style={{ fontSize: "6cqw" }}>☰</span>
          </div>
          <div style={{ padding: "2cqw 6cqw 4cqw" }}>
            <p style={{ color: c.primary, fontSize: "3.2cqw", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase" }}>
              {t.hero.eyebrow}
            </p>
            <h4 style={{ fontFamily: font, fontWeight: 800, fontSize: "8.5cqw", lineHeight: 1.08, marginTop: "2cqw" }}>
              {t.hero.headline}
            </h4>
            <p style={{ color: c.muted, fontSize: "3.8cqw", marginTop: "3cqw", lineHeight: 1.4 }}>{t.hero.sub}</p>
          </div>
          <div style={{ ...heroArt(t), height: "38cqw", margin: "0 6cqw", borderRadius: "4cqw" }} />
          <div className="grid grid-cols-2" style={{ gap: "2.5cqw", padding: "5cqw 6cqw" }}>
            {t.services.map((s) => (
              <div key={s.title} style={{ background: c.surface, borderRadius: "3cqw", padding: "3.5cqw", border: `1px solid ${c.text}14` }}>
                <p style={{ fontSize: "3.6cqw", fontWeight: 700 }}>{s.title}</p>
                <p style={{ fontSize: "3cqw", color: c.muted }}>{s.note}</p>
              </div>
            ))}
          </div>
          <div style={{ height: "18cqw" }} />
          <div
            className="absolute inset-x-0 bottom-0 text-center"
            style={{ background: c.primary, color: c.primaryText, fontWeight: 800, fontSize: "4.4cqw", padding: "4.5cqw 0" }}
          >
            {t.mobileBar}
          </div>
        </div>
      </div>
    );
  }

  return (
    <Chrome url={url}>
      <div className="mock" style={{ background: c.bg, color: c.text }}>
        {/* Nav */}
        <div className="flex items-center justify-between" style={{ padding: "1.8cqw 3.5cqw" }}>
          <span style={{ fontFamily: font, fontWeight: 800, fontSize: "2cqw" }}>{t.brand}</span>
          <div className="flex items-center" style={{ gap: "2.4cqw", fontSize: "1.25cqw", color: c.muted }}>
            {t.nav.map((n) => (
              <span key={n}>{n}</span>
            ))}
            <span
              style={{
                background: c.primary,
                color: c.primaryText,
                padding: "0.8cqw 1.8cqw",
                borderRadius: "99px",
                fontWeight: 700,
              }}
            >
              {t.hero.cta.replace(/^[^A-Za-z]+/, "")}
            </span>
          </div>
        </div>

        {/* Hero */}
        <div className="grid grid-cols-[1.15fr_1fr] items-center" style={{ gap: "3cqw", padding: "3.5cqw 3.5cqw 4cqw" }}>
          <div>
            <p style={{ color: c.primary, fontSize: "1.15cqw", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase" }}>
              {t.hero.eyebrow}
            </p>
            <h4 style={{ fontFamily: font, fontWeight: 800, fontSize: "4.3cqw", lineHeight: 1.06, marginTop: "1.2cqw" }}>
              {t.hero.headline}
            </h4>
            <p style={{ color: c.muted, fontSize: "1.55cqw", marginTop: "1.6cqw", lineHeight: 1.45, maxWidth: "90%" }}>
              {t.hero.sub}
            </p>
            <div className="flex" style={{ gap: "1.2cqw", marginTop: "2.4cqw", fontSize: "1.35cqw", fontWeight: 700 }}>
              <span style={{ background: c.primary, color: c.primaryText, padding: "1.1cqw 2.4cqw", borderRadius: "99px" }}>
                {t.hero.cta}
              </span>
              <span style={{ border: `1px solid ${c.text}33`, padding: "1.1cqw 2.4cqw", borderRadius: "99px" }}>{t.hero.cta2}</span>
            </div>
          </div>
          <div style={{ ...heroArt(t), height: "24cqw", borderRadius: "1.6cqw" }} />
        </div>

        {/* Trust bar */}
        <div
          className="grid grid-cols-4"
          style={{ background: c.surface, borderTop: `1px solid ${c.text}12`, borderBottom: `1px solid ${c.text}12`, padding: "1.6cqw 3.5cqw", gap: "1.5cqw" }}
        >
          {t.badges.map((b) => (
            <span key={b} style={{ fontSize: "1.2cqw", fontWeight: 600 }}>
              <span style={{ color: c.primary }}>✔</span> {b}
            </span>
          ))}
        </div>

        {/* Services */}
        <div style={{ padding: "3.5cqw" }}>
          <p style={{ fontFamily: font, fontWeight: 800, fontSize: "2.3cqw" }}>What we do</p>
          <div className="grid grid-cols-4" style={{ gap: "1.4cqw", marginTop: "1.6cqw" }}>
            {t.services.map((s) => (
              <div key={s.title} style={{ background: c.surface, borderRadius: "1.2cqw", padding: "1.8cqw", border: `1px solid ${c.text}14` }}>
                <div style={{ width: "3.2cqw", height: "3.2cqw", borderRadius: "0.8cqw", background: `${c.primary}33`, marginBottom: "1.2cqw" }} />
                <p style={{ fontSize: "1.45cqw", fontWeight: 700 }}>{s.title}</p>
                <p style={{ fontSize: "1.15cqw", color: c.muted, marginTop: "0.4cqw" }}>{s.note}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Review */}
        <div style={{ padding: "0 3.5cqw 3.5cqw" }}>
          <div
            className="flex items-center justify-between"
            style={{ background: `${c.primary}18`, border: `1px solid ${c.primary}44`, borderRadius: "1.4cqw", padding: "2cqw 2.4cqw", gap: "2cqw" }}
          >
            <div>
              <p style={{ color: c.accent === "#f5f5f5" ? c.primary : c.accent, fontSize: "1.4cqw" }}>★★★★★</p>
              <p style={{ fontFamily: font, fontStyle: "italic", fontSize: "1.6cqw", marginTop: "0.6cqw" }}>“{t.review.quote}”</p>
              <p style={{ color: c.muted, fontSize: "1.15cqw", marginTop: "0.6cqw" }}>— {t.review.author}</p>
            </div>
            <span
              style={{ background: c.primary, color: c.primaryText, padding: "1.1cqw 2.2cqw", borderRadius: "99px", fontSize: "1.3cqw", fontWeight: 700, whiteSpace: "nowrap" }}
            >
              {t.hero.cta}
            </span>
          </div>
        </div>
      </div>
    </Chrome>
  );
}
