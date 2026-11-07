"use client";

import { useEffect, useRef, useState } from "react";
import Icon, { type IconName } from "@/components/Icon";

const SERVICES = [
  "Breakdown recovery",
  "Boiler repair",
  "Lash appointment",
  "Deep clean",
  "New website",
];

const STAGES: { icon: IconName; label: string; at: number }[] = [
  { icon: "form", label: "Form sent", at: 0 },
  { icon: "bell", label: "You're alerted", at: 700 },
  { icon: "mail", label: "Customer replied to", at: 1300 },
  { icon: "sheet", label: "Lead saved", at: 1900 },
];

function nowTime() {
  return new Date().toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" });
}

/**
 * Interactive demo: the visitor sends a fake enquiry and watches it
 * travel through an automation in real time. Nothing leaves the browser.
 */
export default function LiveDemo() {
  const [name, setName] = useState("");
  const [service, setService] = useState(SERVICES[0]);
  const [message, setMessage] = useState("");
  const [stage, setStage] = useState(-1);
  const [elapsed, setElapsed] = useState(0);
  const [time, setTime] = useState("10:14");
  const timers = useRef<number[]>([]);
  const raf = useRef<number | null>(null);

  useEffect(
    () => () => {
      timers.current.forEach((t) => window.clearTimeout(t));
      if (raf.current) cancelAnimationFrame(raf.current);
    },
    []
  );

  const displayName = name.trim() || "Alex";
  const displayMsg = message.trim() || "Can you help me this week?";
  const running = stage >= 0 && stage < STAGES.length - 1;
  const done = stage === STAGES.length - 1;

  function run(e: React.FormEvent) {
    e.preventDefault();
    timers.current.forEach((t) => window.clearTimeout(t));
    if (raf.current) cancelAnimationFrame(raf.current);
    setTime(nowTime());
    setStage(0);
    setElapsed(0);

    const start = performance.now();
    const total = STAGES[STAGES.length - 1].at;
    const tick = () => {
      const ms = Math.min(performance.now() - start, total);
      setElapsed(ms);
      if (ms < total) raf.current = requestAnimationFrame(tick);
    };
    raf.current = requestAnimationFrame(tick);

    STAGES.forEach((s, i) => {
      if (i === 0) return;
      timers.current.push(window.setTimeout(() => setStage(i), s.at));
    });
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
      {/* ── Form ── */}
      <form onSubmit={run} className="glass neon neon-on hud flex flex-col rounded-3xl p-6 md:p-8">
        <p className="hud-label">Your customer&apos;s view</p>
        <h3 className="mt-3 font-heading text-xl font-bold">Send a test enquiry</h3>
        <p className="mt-1 text-sm text-muted">
          Pretend you&apos;re a customer. Hit send and watch what your business would see.
        </p>
        <div className="mt-6 space-y-4">
          <div>
            <label htmlFor="demo-name" className="font-label text-[10px] uppercase tracking-[0.18em] text-muted">
              Your name
            </label>
            <input
              id="demo-name"
              className="field mt-1.5"
              placeholder="Alex"
              value={name}
              maxLength={30}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="demo-service" className="font-label text-[10px] uppercase tracking-[0.18em] text-muted">
              What do you need?
            </label>
            <select
              id="demo-service"
              className="field mt-1.5"
              value={service}
              onChange={(e) => setService(e.target.value)}
            >
              {SERVICES.map((s) => (
                <option key={s} value={s} className="bg-night">
                  {s}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="demo-msg" className="font-label text-[10px] uppercase tracking-[0.18em] text-muted">
              Message
            </label>
            <textarea
              id="demo-msg"
              className="field mt-1.5"
              rows={3}
              maxLength={140}
              placeholder="Can you help me this week?"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
          </div>
        </div>
        <button type="submit" disabled={running} className="btn-primary mt-6 w-full disabled:opacity-60">
          {running ? "Automating…" : done ? "Send another ⚡" : "Send test enquiry ⚡"}
        </button>
        <p className="mt-3 text-center text-[11px] text-muted">Demo only — nothing is sent anywhere.</p>
      </form>

      {/* ── What happens ── */}
      <div className="glass hud relative overflow-hidden rounded-3xl p-6 md:p-8" aria-live="polite">
        <div className="ambient-grid absolute inset-0 opacity-50" aria-hidden />
        <div className="relative">
          <div className="flex items-center justify-between">
            <p className="hud-label">Your business&apos;s view</p>
            <span className="font-label text-xs tabular-nums text-flare-cyan">
              {stage < 0 ? "waiting…" : `${(elapsed / 1000).toFixed(2)}s`}
            </span>
          </div>

          {/* Pipeline */}
          <div className="mt-5 grid grid-cols-4 gap-2">
            {STAGES.map((s, i) => {
              const on = stage >= i;
              return (
                <div key={s.label} className="flex flex-col items-center text-center">
                  <span
                    className={`flex h-11 w-11 items-center justify-center rounded-xl border transition-all duration-500 ${
                      on
                        ? "border-flare-cyan/70 bg-flare-cyan/10 text-flare-cyan shadow-[0_0_26px_-4px_rgba(34,211,238,0.8)]"
                        : "border-white/10 text-white/30"
                    }`}
                  >
                    <Icon name={s.icon} size={18} />
                  </span>
                  <span className={`mt-2 text-[10px] leading-tight md:text-[11px] ${on ? "text-ink" : "text-muted/60"}`}>
                    {s.label}
                  </span>
                </div>
              );
            })}
          </div>
          <div className="relative mt-3 h-1 overflow-hidden rounded-full bg-white/5">
            <div
              className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-flare-orange via-flare-violet to-flare-cyan transition-[width] duration-200"
              style={{ width: `${stage < 0 ? 0 : (elapsed / STAGES[STAGES.length - 1].at) * 100}%` }}
            />
          </div>

          {/* Outputs */}
          <div className="mt-6 space-y-3">
            {stage < 1 && (
              <div className="rounded-2xl border border-dashed border-white/10 p-6 text-center text-sm text-muted">
                {stage < 0 ? "Fill in the form and press send →" : "Sending…"}
              </div>
            )}

            {stage >= 1 && (
              <div key={`n-${time}`} className="animate-slide-in flex gap-3 rounded-2xl border border-white/10 bg-white/[0.06] p-4 backdrop-blur">
                <span className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl bg-flare-gradient text-night">
                  <Icon name="bell" size={16} />
                </span>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between text-[11px] text-muted">
                    <span className="font-semibold text-ink">New enquiry · your phone</span>
                    <span>{time}</span>
                  </div>
                  <p className="mt-0.5 truncate text-sm">
                    <span className="font-semibold">{displayName}</span> — {service}
                  </p>
                  <p className="truncate text-xs text-muted">“{displayMsg}”</p>
                </div>
              </div>
            )}

            {stage >= 2 && (
              <div key={`e-${time}`} className="animate-slide-in rounded-2xl border border-white/10 bg-[#f7f7fb] p-4 text-[#1b1b23]">
                <div className="flex items-center justify-between text-[11px] text-black/50">
                  <span className="flex items-center gap-1.5 font-semibold text-violet-700">
                    <Icon name="mail" size={13} /> Auto-reply sent to {displayName}
                  </span>
                  <span>{time}</span>
                </div>
                <p className="mt-1.5 text-sm">
                  Hi {displayName}, thanks for getting in touch about <b>{service.toLowerCase()}</b>. We&apos;ve
                  got your message and we&apos;ll call you very shortly. 🙏
                </p>
              </div>
            )}

            {stage >= 3 && (
              <div key={`s-${time}`} className="animate-slide-in overflow-hidden rounded-2xl border border-white/10 bg-white text-[11px] text-[#1b1b23]">
                <div className="flex items-center gap-1.5 bg-[#e8f5ec] px-3 py-1.5 font-semibold text-emerald-800">
                  <Icon name="sheet" size={13} /> Leads sheet
                </div>
                <div className="grid grid-cols-[auto_1fr_1fr_auto] gap-x-3 px-3 py-2">
                  <span className="rounded bg-emerald-500 px-1 text-[9px] font-bold text-white">NEW</span>
                  <span className="truncate font-semibold">{displayName}</span>
                  <span className="truncate">{service}</span>
                  <span className="text-black/50">{time}</span>
                </div>
              </div>
            )}

            {done && (
              <p className="animate-slide-in pt-1 text-center text-sm">
                <span className="text-gradient font-heading font-bold">
                  All done in {(STAGES[STAGES.length - 1].at / 1000).toFixed(1)} seconds
                </span>{" "}
                <span className="text-muted">— without you touching anything.</span>
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
