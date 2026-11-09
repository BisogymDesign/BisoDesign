"use client";

import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";

/*
 * Interactive 360° product viewers for the catalogue. Each product turns slowly on
 * its own while it's on screen; visitors can drag (mouse or finger) to spin it.
 * All sizes are in cqw so they scale with the catalogue page.
 */

const q = (n: number) => `${n}cqw`;
const clamp = (x: number, a = 0, b = 1) => Math.min(b, Math.max(a, x));
const smooth = (x: number) => x * x * (3 - 2 * x);

/** Drives an angle (degrees): auto-rotation while visible, drag to spin. */
function useSpin(onAngle: (deg: number) => void, speed = 26) {
  const stageRef = useRef<HTMLDivElement>(null);
  const cb = useRef(onAngle);
  cb.current = onAngle;

  useEffect(() => {
    const el = stageRef.current;
    if (!el) return;
    let angle = 25;
    let raf = 0;
    let last = 0;
    let visible = false;
    let dragging = false;
    let resumeAt = 0;
    let startX = 0;
    let startAngle = 0;

    // inside the flip-book, only animate while this page is part of the open spread
    const leaf = el.closest<HTMLElement>(".catalog-leaf");
    const frame = (t: number) => {
      raf = 0;
      const dt = last ? Math.min(0.05, (t - last) / 1000) : 0;
      last = t;
      const active = !leaf || leaf.dataset.active !== "false";
      if (active) {
        if (!dragging && t > resumeAt) angle += speed * dt;
        cb.current(angle);
      }
      if (visible && !document.hidden) raf = requestAnimationFrame(frame);
    };
    const start = () => {
      if (!raf) {
        last = 0;
        raf = requestAnimationFrame(frame);
      }
    };
    const io = new IntersectionObserver(
      ([e]) => {
        visible = e.isIntersecting;
        if (visible) start();
      },
      { threshold: 0.05 }
    );
    io.observe(el);

    const down = (e: PointerEvent) => {
      dragging = true;
      startX = e.clientX;
      startAngle = angle;
      el.setPointerCapture(e.pointerId);
      el.style.cursor = "grabbing";
    };
    const move = (e: PointerEvent) => {
      if (!dragging) return;
      angle = startAngle + (e.clientX - startX) * 0.9;
      cb.current(angle);
    };
    const up = () => {
      if (!dragging) return;
      dragging = false;
      resumeAt = performance.now() + 2500;
      el.style.cursor = "grab";
    };
    const onVis = () => !document.hidden && visible && start();
    el.addEventListener("pointerdown", down);
    el.addEventListener("pointermove", move);
    el.addEventListener("pointerup", up);
    el.addEventListener("pointercancel", up);
    document.addEventListener("visibilitychange", onVis);
    cb.current(angle);
    return () => {
      io.disconnect();
      if (raf) cancelAnimationFrame(raf);
      el.removeEventListener("pointerdown", down);
      el.removeEventListener("pointermove", move);
      el.removeEventListener("pointerup", up);
      el.removeEventListener("pointercancel", up);
      document.removeEventListener("visibilitychange", onVis);
    };
  }, [speed]);

  return stageRef;
}

function SpinHints({ dark }: { dark?: boolean }) {
  return (
    <>
      <span
        className="pointer-events-none absolute font-label font-bold"
        style={{ left: q(1.4), top: q(1.4), fontSize: q(1.5), letterSpacing: "0.08em", padding: `${q(0.5)} ${q(1.2)}`, borderRadius: 99, background: dark ? "#ffffff1f" : "#1b1722", color: "#fff" }}
      >
        360°
      </span>
      <span
        className="pointer-events-none absolute left-1/2 -translate-x-1/2 whitespace-nowrap font-label"
        style={{ bottom: q(1.2), fontSize: q(1.35), letterSpacing: "0.1em", color: dark ? "#ffffffaa" : "#1b1722aa" }}
      >
        ⟵ drag to rotate ⟶
      </span>
    </>
  );
}

const stageStyle: CSSProperties = { position: "relative", width: "100%", height: "100%", touchAction: "pan-y", cursor: "grab", userSelect: "none" };

// ───────────────────────── Hoodie (turntable: front → side → back) ─────────────────────────

function HoodieFront({ color }: { color: string }) {
  return (
    <svg viewBox="0 0 200 220" width="100%" height="100%" aria-hidden>
      <path d="M60 30 Q100 50 140 30 L175 45 Q188 52 190 70 L198 150 Q199 160 188 162 L172 164 Q164 164 163 154 L158 100 L158 200 Q158 210 148 210 L52 210 Q42 210 42 200 L42 100 L37 154 Q36 164 28 164 L12 162 Q1 160 2 150 L10 70 Q12 52 25 45 Z" fill={color} />
      <path d="M42 100 L42 200 Q42 210 52 210 L60 210 L60 100 Z M158 100 L158 200 Q158 210 148 210 L140 210 L140 100 Z" fill="#000" opacity=".1" />
      <path d="M70 32 Q100 72 130 32 Q125 8 100 6 Q75 8 70 32 Z" fill={color} />
      <path d="M78 34 Q100 62 122 34 Q118 18 100 16 Q82 18 78 34 Z" fill="#000" opacity=".35" />
      <path d="M92 52 L90 92 M108 52 L110 92" stroke="#fff" strokeWidth="2.4" strokeLinecap="round" opacity=".85" />
      <path d="M68 150 L132 150 L142 186 L58 186 Z" fill="#000" opacity=".12" />
      <path d="M68 150 L132 150" stroke="#000" strokeOpacity=".25" strokeWidth="1.5" />
      <rect x="42" y="198" width="116" height="12" rx="4" fill="#000" opacity=".18" />
      <rect x="2" y="148" width="35" height="14" rx="5" fill="#000" opacity=".16" />
      <rect x="163" y="148" width="35" height="14" rx="5" fill="#000" opacity=".16" />
      <text x="128" y="78" fontSize="9" fontFamily="Georgia, serif" fill="#fff" opacity=".85">N&amp;T</text>
    </svg>
  );
}

function HoodieBack({ color }: { color: string }) {
  return (
    <svg viewBox="0 0 200 220" width="100%" height="100%" aria-hidden>
      <path d="M60 30 Q100 44 140 30 L175 45 Q188 52 190 70 L198 150 Q199 160 188 162 L172 164 Q164 164 163 154 L158 100 L158 200 Q158 210 148 210 L52 210 Q42 210 42 200 L42 100 L37 154 Q36 164 28 164 L12 162 Q1 160 2 150 L10 70 Q12 52 25 45 Z" fill={color} />
      <path d="M66 30 Q100 96 134 30 Q122 4 100 4 Q78 4 66 30 Z" fill={color} />
      <path d="M66 30 Q100 96 134 30" fill="none" stroke="#000" strokeOpacity=".25" strokeWidth="2" />
      <circle cx="100" cy="132" r="22" fill="none" stroke="#fff" strokeWidth="2" opacity=".85" />
      <text x="100" y="137" fontSize="13" textAnchor="middle" fontFamily="Georgia, serif" fill="#fff" opacity=".9">N&amp;T</text>
      <text x="100" y="172" fontSize="8" textAnchor="middle" letterSpacing="3" fontFamily="Arial, sans-serif" fill="#fff" opacity=".8">NORTH &amp; THREAD</text>
      <rect x="42" y="198" width="116" height="12" rx="4" fill="#000" opacity=".18" />
    </svg>
  );
}

function HoodieSide({ color }: { color: string }) {
  return (
    <svg viewBox="0 0 200 220" width="100%" height="100%" aria-hidden>
      <path d="M76 30 Q100 22 124 30 L128 200 Q128 210 118 210 L82 210 Q72 210 72 200 Z" fill={color} />
      <path d="M78 34 Q66 10 90 6 Q114 4 120 30 Z" fill={color} />
      <path d="M78 34 Q66 10 90 6" fill="none" stroke="#000" strokeOpacity=".25" strokeWidth="2" />
      <path d="M90 40 Q114 38 116 62 L122 150 Q123 162 112 162 L102 162 Q92 162 92 152 Z" fill="#000" opacity=".16" />
      <rect x="92" y="150" width="30" height="12" rx="5" fill="#000" opacity=".15" />
      <rect x="72" y="198" width="56" height="12" rx="4" fill="#000" opacity=".18" />
    </svg>
  );
}

export function HoodieViewer({ color, dark }: { color: string; dark?: boolean }) {
  const front = useRef<HTMLDivElement>(null);
  const side = useRef<HTMLDivElement>(null);
  const back = useRef<HTMLDivElement>(null);
  const floor = useRef<HTMLDivElement>(null);
  const stage = useSpin((deg) => {
    const r = (deg * Math.PI) / 180;
    const c = Math.cos(r);
    const s = Math.sin(r);
    // short cross-fades so the views never look like ghosts of each other
    const wf = smooth(clamp((c - 0.3) / 0.12));
    const wb = smooth(clamp((-c - 0.3) / 0.12));
    const ws = 1 - Math.max(wf, wb);
    const squash = 0.38 + 0.62 * Math.abs(c);
    const light = (0.82 + 0.18 * Math.abs(c)).toFixed(3);
    if (front.current) Object.assign(front.current.style, { opacity: String(wf), transform: `scaleX(${squash})`, filter: `brightness(${light})` });
    if (back.current) Object.assign(back.current.style, { opacity: String(wb), transform: `scaleX(${squash})`, filter: `brightness(${light})` });
    if (side.current) Object.assign(side.current.style, { opacity: String(ws), transform: `scaleX(${s >= 0 ? 1 : -1})`, filter: "brightness(.9)" });
    if (floor.current) floor.current.style.transform = `translateX(-50%) scaleX(${0.55 + 0.45 * Math.abs(c)})`;
  });
  const layer: CSSProperties = { position: "absolute", inset: "8% 12% 10%", transition: "none", willChange: "transform, opacity" };
  return (
    <div ref={stage} style={stageStyle}>
      <div ref={floor} style={{ position: "absolute", left: "50%", bottom: "7%", width: "60%", height: q(2.4), borderRadius: "50%", background: "radial-gradient(closest-side, rgba(0,0,0,.28), rgba(0,0,0,0))" }} />
      <div ref={side} style={layer}>
        <HoodieSide color={color} />
      </div>
      <div ref={back} style={layer}>
        <HoodieBack color={color} />
      </div>
      <div ref={front} style={layer}>
        <HoodieFront color={color} />
      </div>
      <SpinHints dark={dark} />
    </div>
  );
}

// ───────────────────────── Extruded objects (real 3D: stacked layers) ─────────────────────────

export function ExtrudedViewer({
  children,
  depth,
  layers = 18,
  tilt = -14,
  dark,
  inset = "12% 8%",
}: {
  children: ReactNode;
  depth: number; // cqw
  layers?: number;
  tilt?: number;
  dark?: boolean;
  inset?: string;
}) {
  const obj = useRef<HTMLDivElement>(null);
  const stage = useSpin((deg) => {
    if (obj.current) obj.current.style.transform = `rotateX(${tilt}deg) rotateY(${deg.toFixed(2)}deg)`;
  });
  return (
    <div ref={stage} style={{ ...stageStyle, perspective: q(220) }}>
      <div style={{ position: "absolute", left: "50%", bottom: "8%", width: "62%", height: q(3), transform: "translateX(-50%)", borderRadius: "50%", background: "radial-gradient(closest-side, rgba(0,0,0,.35), rgba(0,0,0,0))" }} />
      <div ref={obj} style={{ position: "absolute", inset, transformStyle: "preserve-3d", willChange: "transform" }}>
        {Array.from({ length: layers }, (_, i) => {
          const z = -depth / 2 + (depth * i) / (layers - 1);
          const face = i === 0 || i === layers - 1;
          return (
            <div key={i} style={{ position: "absolute", inset: 0, transform: `translateZ(${z.toFixed(3)}cqw)`, filter: face ? undefined : "brightness(.62) saturate(.9)" }}>
              {children}
            </div>
          );
        })}
      </div>
      <SpinHints dark={dark} />
    </div>
  );
}

export function DrillShape() {
  return (
    <svg viewBox="0 0 220 200" width="100%" height="100%" aria-hidden>
      <rect x="0" y="57" width="18" height="8" rx="2" fill="#cbd5e1" />
      <rect x="14" y="46" width="32" height="30" rx="5" fill="#3f3f46" />
      {[20, 27, 34].map((x) => (
        <rect key={x} x={x} y="46" width="3" height="30" fill="#18181b" />
      ))}
      <rect x="42" y="34" width="124" height="54" rx="24" fill="#f5b301" />
      <rect x="126" y="40" width="36" height="42" rx="16" fill="#18181b" />
      {[132, 139, 146, 153].map((x) => (
        <rect key={x} x={x} y="48" width="3.5" height="26" rx="1.5" fill="#3f3f46" />
      ))}
      <text x="58" y="66" fontSize="15" fontWeight="800" fontFamily="Arial, sans-serif" fill="#18181b">FORGE</text>
      <text x="59" y="80" fontSize="8" fontWeight="700" fontFamily="Arial, sans-serif" fill="#18181b" opacity=".75">PRO 18V</text>
      <path d="M96 86 L134 86 L142 152 L104 152 Z" fill="#18181b" />
      <path d="M100 86 L108 86 L114 152 L106 152 Z" fill="#f5b301" opacity=".85" />
      <path d="M92 92 Q84 104 92 116 L100 116 L100 92 Z" fill="#dc2626" />
      <rect x="82" y="150" width="80" height="36" rx="7" fill="#27272a" />
      <rect x="82" y="150" width="80" height="8" rx="3" fill="#f5b301" />
      {[94, 102, 110].map((x) => (
        <circle key={x} cx={x} cy="172" r="2.4" fill="#4ade80" />
      ))}
      <text x="124" y="176" fontSize="9" fontWeight="800" fontFamily="Arial, sans-serif" fill="#f5b301">4.0Ah</text>
    </svg>
  );
}

export function SneakerShape({ upper, sole, laces, accent }: { upper: string; sole: string; laces: string; accent: string }) {
  return (
    <svg viewBox="0 0 240 130" width="100%" height="100%" aria-hidden>
      <path d="M8 96 Q6 114 30 114 L214 114 Q234 114 232 96 L230 88 L10 88 Z" fill={sole} />
      <path d="M10 96 L232 96" stroke="#000" strokeOpacity=".15" strokeWidth="2" />
      <path d="M12 88 Q10 62 40 58 L92 48 Q110 22 140 24 L170 28 Q188 32 196 54 L222 68 Q236 76 230 88 Z" fill={upper} />
      <path d="M140 24 L170 28 Q188 32 196 54 L182 58 Q170 40 140 36 Z" fill="#000" opacity=".22" />
      <path d="M12 88 Q12 66 38 62 L60 60 Q46 74 48 88 Z" fill="#000" opacity=".12" />
      <path d="M58 82 Q100 56 132 70 Q160 82 206 70" fill="none" stroke={accent} strokeWidth="7" strokeLinecap="round" />
      <path d="M62 90 Q102 66 134 78 Q162 88 208 78" fill="none" stroke={accent} strokeWidth="3" strokeLinecap="round" opacity=".7" />
      {[0, 1, 2, 3].map((i) => (
        <g key={i}>
          <circle cx={108 + i * 13} cy={40 + i * 3} r="2.2" fill="#000" opacity=".4" />
          <path d={`M${104 + i * 13} ${44 + i * 3} L${118 + i * 13} ${36 + i * 3}`} stroke={laces} strokeWidth="3.4" strokeLinecap="round" />
        </g>
      ))}
      <path d="M196 54 Q206 40 214 50 L222 68 Z" fill="#000" opacity=".25" />
      <text x="30" y="108" fontSize="7" fontWeight="800" letterSpacing="2" fontFamily="Arial, sans-serif" fill="#000" opacity=".35">STRIDE</text>
    </svg>
  );
}

// ───────────────────────── Perfume bottle (true 3D cylinder) ─────────────────────────

function labelSvg() {
  const svg = `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 720 260'>
    <rect x='0' y='84' width='720' height='96' fill='#f6efe3' opacity='.94'/>
    <rect x='0' y='90' width='720' height='2' fill='#b8893b'/><rect x='0' y='172' width='720' height='2' fill='#b8893b'/>
    <text x='90' y='138' font-family='Georgia, serif' font-size='34' fill='#3b2412'>Nº 7</text>
    <text x='90' y='162' font-family='Arial, sans-serif' font-size='11' letter-spacing='5' fill='#7a5230'>AMBER NIGHT</text>
    <text x='450' y='138' font-family='Georgia, serif' font-size='34' fill='#3b2412'>Nº 7</text>
    <text x='450' y='162' font-family='Arial, sans-serif' font-size='11' letter-spacing='5' fill='#7a5230'>EAU DE PARFUM</text>
  </svg>`;
  return `url("data:image/svg+xml,${encodeURIComponent(svg)}")`;
}

function Cylinder({ r, h, panels, y, background, label }: { r: number; h: number; panels: number; y: number; background: string; label?: string }) {
  const pw = 2 * r * Math.tan(Math.PI / panels) + 0.06;
  return (
    <>
      {Array.from({ length: panels }, (_, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            left: q(-pw / 2),
            top: q(y - h / 2),
            width: q(pw),
            height: q(h),
            transform: `rotateY(${(360 / panels) * i}deg) translateZ(${r}cqw)`,
            backfaceVisibility: "hidden",
            backgroundImage: label ? `${label}, ${background}` : background,
            backgroundSize: label ? `${pw * panels}cqw 100%, 100% 100%` : "100% 100%",
            backgroundPosition: label ? `${-pw * i}cqw 0, 0 0` : "0 0",
          }}
        />
      ))}
    </>
  );
}

export function PerfumeViewer() {
  const obj = useRef<HTMLDivElement>(null);
  const stage = useSpin((deg) => {
    if (obj.current) obj.current.style.transform = `rotateY(${deg.toFixed(2)}deg)`;
  }, 30);
  const [label] = useState(labelSvg);
  const R = 9;
  const H = 22;
  const CR = 5;
  const CH = 8;
  return (
    <div ref={stage} style={{ ...stageStyle, perspective: q(160) }}>
      <div style={{ position: "absolute", left: "50%", top: `calc(50% + ${q(H / 2 + CH / 2 - 1.5)})`, width: q(26), height: q(3.4), transform: "translateX(-50%)", borderRadius: "50%", background: "radial-gradient(closest-side, rgba(0,0,0,.55), rgba(0,0,0,0))" }} />
      <div ref={obj} style={{ position: "absolute", left: "50%", top: `calc(50% + ${q(CH / 2)})`, width: 0, height: 0, transformStyle: "preserve-3d", willChange: "transform" }}>
        <Cylinder r={R} h={H} panels={28} y={0} label={label} background="linear-gradient(180deg, rgba(255,190,110,.92), rgba(196,110,34,.95) 55%, rgba(120,58,14,.98))" />
        <Cylinder r={CR} h={CH} panels={20} y={-H / 2 - CH / 2} background="linear-gradient(180deg, #f7dd9a, #c9973f 45%, #8a6220)" />
      </div>
      {/* fixed lighting: the silhouette never changes, so glass highlights stay put while the label turns */}
      <div
        className="pointer-events-none absolute"
        style={{ left: "50%", top: `calc(50% + ${q(CH / 2 - H / 2)})`, width: q(2 * R), height: q(H), transform: "translateX(-50%)", background: "linear-gradient(90deg, rgba(0,0,0,.45), rgba(255,255,255,0) 22%, rgba(255,255,255,.35) 34%, rgba(255,255,255,0) 44%, rgba(0,0,0,0) 70%, rgba(0,0,0,.5))" }}
      />
      <div
        className="pointer-events-none absolute"
        style={{ left: "50%", top: `calc(50% + ${q(-H / 2 - CH / 2)})`, width: q(2 * CR), height: q(CH), transform: "translateX(-50%)", background: "linear-gradient(90deg, rgba(0,0,0,.45), rgba(255,255,255,.4) 35%, rgba(255,255,255,0) 50%, rgba(0,0,0,.45))" }}
      />
      <SpinHints dark />
    </div>
  );
}

// ───────────────────────── Interactive product blocks ─────────────────────────

const HOODIE_COLOURS = [
  { name: "Forest", hex: "#2f5d46" },
  { name: "Clay", hex: "#b4643c" },
  { name: "Ink", hex: "#1f2a44" },
  { name: "Oat", hex: "#cbb89a" },
  { name: "Plum", hex: "#5b2a4e" },
];
const SIZES = ["XS", "S", "M", "L", "XL"];

export function FashionProduct() {
  const [colour, setColour] = useState(HOODIE_COLOURS[0]);
  const [size, setSize] = useState("M");
  const ink = "#24201c";
  return (
    <div className="grid grid-cols-[1.05fr_1fr]" style={{ gap: q(2.4), padding: q(2.4), background: "#fbf9f6", color: ink }}>
      <div>
        <div style={{ height: q(50), borderRadius: q(1.4), background: "radial-gradient(circle at 50% 40%, #ffffff, #ece6de)" }}>
          <HoodieViewer color={colour.hex} />
        </div>
        <div className="grid grid-cols-4" style={{ gap: q(0.9), marginTop: q(1) }}>
          {["Front", "Back", "Detail", "360°"].map((t, i) => (
            <span key={t} style={{ textAlign: "center", fontSize: q(1.25), padding: `${q(1.1)} 0`, borderRadius: q(0.8), background: i === 3 ? ink : "#ece6de", color: i === 3 ? "#fff" : "#6b6259", fontWeight: 700 }}>
              {t}
            </span>
          ))}
        </div>
      </div>
      <div>
        <p style={{ fontSize: q(1.25), color: "#8a8178" }}>Men / Hoodies / Heavyweight</p>
        <p style={{ fontFamily: "Georgia, serif", fontSize: q(2.7), lineHeight: 1.1, marginTop: q(0.6) }}>Heavyweight Organic Hoodie</p>
        <p style={{ fontSize: q(1.4), marginTop: q(0.6) }}>
          <span style={{ color: "#d97706" }}>★★★★★</span> <span style={{ color: "#8a8178" }}>128 reviews</span>
        </p>
        <p style={{ fontSize: q(2.4), fontWeight: 800, marginTop: q(0.8) }}>£64</p>
        <p style={{ fontSize: q(1.35), marginTop: q(1.4), fontWeight: 700 }}>
          Colour: <span style={{ fontWeight: 500 }}>{colour.name}</span>
        </p>
        <div className="flex" style={{ gap: q(1), marginTop: q(0.8) }}>
          {HOODIE_COLOURS.map((c) => (
            <button
              key={c.name}
              type="button"
              aria-label={c.name}
              onClick={() => setColour(c)}
              style={{ width: q(3.6), height: q(3.6), borderRadius: 99, background: c.hex, boxShadow: c.name === colour.name ? `0 0 0 ${q(0.4)} #fff, 0 0 0 ${q(0.75)} ${ink}` : "inset 0 0 0 1px #0002" }}
            />
          ))}
        </div>
        <p style={{ fontSize: q(1.35), marginTop: q(1.5), fontWeight: 700 }}>
          Size <span style={{ float: "right", fontWeight: 500, textDecoration: "underline", color: "#8a8178" }}>Size guide</span>
        </p>
        <div className="grid grid-cols-5" style={{ gap: q(0.7), marginTop: q(0.8) }}>
          {SIZES.map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => setSize(s)}
              style={{ fontSize: q(1.4), fontWeight: 700, padding: `${q(1)} 0`, borderRadius: q(0.8), border: `1px solid ${s === size ? ink : "#d8d0c6"}`, background: s === size ? ink : "#fff", color: s === size ? "#fff" : ink }}
            >
              {s}
            </button>
          ))}
        </div>
        <p style={{ fontSize: q(1.2), color: "#b45309", marginTop: q(0.7) }}>Only 3 left in XL</p>
        <div style={{ marginTop: q(1.4), background: ink, color: "#fff", textAlign: "center", fontWeight: 800, fontSize: q(1.6), padding: `${q(1.5)} 0`, borderRadius: 99 }}>Add to bag · {size}</div>
        <p style={{ fontSize: q(1.2), color: "#6b6259", marginTop: q(1) }}>🚚 Free UK delivery · arrives Thursday</p>
        <p style={{ fontSize: q(1.2), color: "#6b6259", marginTop: q(0.4) }}>↩︎ Free 30-day returns</p>
      </div>
    </div>
  );
}

const KITS = [
  { id: "body", name: "Body only", price: 89, note: "Use your own 18V batteries" },
  { id: "kit", name: "Kit · 2 × 4.0Ah + charger", price: 149, note: "Ready to work out of the box" },
];

export function ToolProduct() {
  const [kit, setKit] = useState(KITS[1]);
  const yellow = "#f5b301";
  return (
    <div className="grid grid-cols-[1.05fr_1fr]" style={{ gap: q(2.2), padding: q(2.2), background: "#141518", color: "#f4f4f5" }}>
      <div style={{ height: q(54), borderRadius: q(1.4), background: "radial-gradient(circle at 50% 45%, #2a2c33, #111216 75%)" }}>
        <ExtrudedViewer depth={7} layers={20} dark>
          <DrillShape />
        </ExtrudedViewer>
      </div>
      <div>
        <div className="flex" style={{ gap: q(0.8) }}>
          {["NEW", "BRUSHLESS"].map((b) => (
            <span key={b} className="font-label font-bold" style={{ fontSize: q(1.1), letterSpacing: "0.1em", background: b === "NEW" ? yellow : "#ffffff1a", color: b === "NEW" ? "#111" : "#f4f4f5", padding: `${q(0.4)} ${q(1)}`, borderRadius: q(0.5) }}>
              {b}
            </span>
          ))}
        </div>
        <p style={{ fontSize: q(2.3), fontWeight: 800, lineHeight: 1.12, marginTop: q(1) }}>Forge Pro 18V Brushless Combi Drill</p>
        <p style={{ fontSize: q(1.3), marginTop: q(0.6) }}>
          <span style={{ color: yellow }}>★★★★★</span> <span style={{ color: "#a1a1aa" }}>412 reviews</span>
        </p>
        <p style={{ fontSize: q(2.8), fontWeight: 800, color: yellow, marginTop: q(0.8) }}>
          £{kit.price}
          <span style={{ fontSize: q(1.2), color: "#a1a1aa", fontWeight: 500 }}> inc. VAT</span>
        </p>
        <div style={{ display: "grid", gap: q(0.8), marginTop: q(1.2) }}>
          {KITS.map((k) => (
            <button
              key={k.id}
              type="button"
              onClick={() => setKit(k)}
              className="text-left"
              style={{ borderRadius: q(1), padding: q(1.1), border: `1.5px solid ${k.id === kit.id ? yellow : "#3f3f46"}`, background: k.id === kit.id ? "#f5b3011a" : "transparent" }}
            >
              <span style={{ display: "block", fontSize: q(1.4), fontWeight: 700 }}>
                {k.name} · £{k.price}
              </span>
              <span style={{ display: "block", fontSize: q(1.15), color: "#a1a1aa" }}>{k.note}</span>
            </button>
          ))}
        </div>
        <p style={{ fontSize: q(1.25), color: "#4ade80", marginTop: q(1.1) }}>✓ In stock · click &amp; collect in 1 hour</p>
        <div style={{ marginTop: q(1.1), background: yellow, color: "#111", textAlign: "center", fontWeight: 800, fontSize: q(1.6), padding: `${q(1.4)} 0`, borderRadius: q(0.8) }}>Add to basket</div>
        <div style={{ marginTop: q(1.2), fontSize: q(1.2), display: "grid", gap: q(0.4) }}>
          {[
            ["Torque", "60 Nm"],
            ["Chuck", "13 mm"],
            ["Weight", "1.6 kg"],
          ].map(([k, v]) => (
            <div key={k} className="flex justify-between" style={{ borderBottom: "1px solid #ffffff14", paddingBottom: q(0.4) }}>
              <span style={{ color: "#a1a1aa" }}>{k}</span>
              <span style={{ fontWeight: 700 }}>{v}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

const SNEAKER_PARTS = {
  upper: { label: "Upper", options: ["#f5f5f4", "#111827", "#1d4ed8", "#be123c", "#15803d"] },
  sole: { label: "Sole", options: ["#fafaf9", "#1c1917", "#d6b88c", "#f97316"] },
  laces: { label: "Laces", options: ["#ffffff", "#111827", "#facc15", "#22d3ee"] },
  accent: { label: "Stripe", options: ["#f97316", "#22d3ee", "#a855f7", "#111827", "#facc15"] },
} as const;
type Part = keyof typeof SNEAKER_PARTS;

export function SneakerProduct() {
  const [design, setDesign] = useState<Record<Part, string>>({ upper: "#f5f5f4", sole: "#1c1917", laces: "#111827", accent: "#f97316" });
  return (
    <div className="grid grid-cols-[1.2fr_1fr]" style={{ gap: q(2.2), padding: q(2.2), background: "#f4f4f5", color: "#18181b" }}>
      <div style={{ height: q(52), borderRadius: q(1.4), background: "radial-gradient(circle at 50% 40%, #ffffff, #e4e4e7)" }}>
        <ExtrudedViewer depth={9} layers={22} tilt={-18} inset="22% 6%">
          <SneakerShape upper={design.upper} sole={design.sole} laces={design.laces} accent={design.accent} />
        </ExtrudedViewer>
      </div>
      <div>
        <p className="font-label font-bold" style={{ fontSize: q(1.2), letterSpacing: "0.14em", color: "#71717a" }}>
          STRIDE LAB
        </p>
        <p style={{ fontSize: q(2.5), fontWeight: 800, lineHeight: 1.1, marginTop: q(0.4) }}>Design your own runner</p>
        {(Object.keys(SNEAKER_PARTS) as Part[]).map((part) => (
          <div key={part} style={{ marginTop: q(1.3) }}>
            <p style={{ fontSize: q(1.25), fontWeight: 700 }}>{SNEAKER_PARTS[part].label}</p>
            <div className="flex" style={{ gap: q(0.8), marginTop: q(0.5) }}>
              {SNEAKER_PARTS[part].options.map((hex) => (
                <button
                  key={hex}
                  type="button"
                  aria-label={`${SNEAKER_PARTS[part].label} colour`}
                  onClick={() => setDesign((d) => ({ ...d, [part]: hex }))}
                  style={{ width: q(3.1), height: q(3.1), borderRadius: 99, background: hex, boxShadow: design[part] === hex ? `0 0 0 ${q(0.35)} #fff, 0 0 0 ${q(0.7)} #18181b` : "inset 0 0 0 1px #0002" }}
                />
              ))}
            </div>
          </div>
        ))}
        <p style={{ fontSize: q(2.4), fontWeight: 800, marginTop: q(1.6) }}>£95</p>
        <div style={{ marginTop: q(0.8), background: "#18181b", color: "#fff", textAlign: "center", fontWeight: 800, fontSize: q(1.5), padding: `${q(1.4)} 0`, borderRadius: 99 }}>Add my design</div>
        <p style={{ fontSize: q(1.15), color: "#71717a", marginTop: q(0.8) }}>Made to order · ships in 5 days</p>
      </div>
    </div>
  );
}
