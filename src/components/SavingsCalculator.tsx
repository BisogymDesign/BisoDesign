"use client";

import Link from "next/link";
import { useState } from "react";

const AUTOMATED_SHARE = 0.7; // share of manual admin an automation typically removes (assumption, shown to user)
const WEEKS_PER_MONTH = 4.33;
const STARTER_PRICE = 150;

function Slider({
  id,
  label,
  value,
  min,
  max,
  step = 1,
  format,
  onChange,
}: {
  id: string;
  label: string;
  value: number;
  min: number;
  max: number;
  step?: number;
  format: (v: number) => string;
  onChange: (v: number) => void;
}) {
  const pct = ((value - min) / (max - min)) * 100;
  return (
    <div>
      <div className="flex items-baseline justify-between">
        <label htmlFor={id} className="text-sm text-ink/90">
          {label}
        </label>
        <span className="font-heading text-lg font-bold text-flare-cyan tabular-nums">{format(value)}</span>
      </div>
      <input
        id={id}
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="range mt-2 w-full"
        style={{ "--pct": `${pct}%` } as React.CSSProperties}
      />
    </div>
  );
}

/** "How much time could you get back?" — an honest, assumption-labelled estimate. */
export default function SavingsCalculator() {
  const [perWeek, setPerWeek] = useState(20);
  const [minutes, setMinutes] = useState(10);
  const [rate, setRate] = useState(35);

  const hoursMonth = (perWeek * minutes * WEEKS_PER_MONTH * AUTOMATED_SHARE) / 60;
  const valueMonth = hoursMonth * rate;
  const valueYear = valueMonth * 12;
  const paybackWeeks = valueMonth > 0 ? STARTER_PRICE / (valueMonth / WEEKS_PER_MONTH) : Infinity;

  const gbp = (v: number) => `£${Math.round(v).toLocaleString("en-GB")}`;

  return (
    <div className="glass neon hud grid gap-8 rounded-3xl p-6 md:grid-cols-2 md:p-10">
      <div>
        <p className="hud-label">Time-back calculator</p>
        <h3 className="mt-3 font-heading text-2xl font-bold">How much of your week could you get back?</h3>
        <p className="mt-2 text-sm text-muted">
          Think about replying, scheduling, logging and chasing — the admin around every enquiry.
        </p>
        <div className="mt-8 space-y-7">
          <Slider id="calc-enq" label="Enquiries or bookings per week" value={perWeek} min={2} max={100} onChange={setPerWeek} format={(v) => `${v}`} />
          <Slider id="calc-min" label="Admin minutes for each one" value={minutes} min={2} max={30} onChange={setMinutes} format={(v) => `${v} min`} />
          <Slider id="calc-rate" label="What an hour of your time is worth" value={rate} min={15} max={120} step={5} onChange={setRate} format={(v) => `£${v}`} />
        </div>
      </div>

      <div className="flex flex-col justify-between rounded-2xl border border-white/10 bg-night/60 p-6">
        <div>
          <p className="font-label text-[10px] uppercase tracking-[0.2em] text-muted">You could get back</p>
          <p className="mt-2 font-heading text-5xl font-extrabold text-gradient tabular-nums md:text-6xl">
            {hoursMonth.toFixed(1)}
            <span className="ml-2 text-2xl">hrs</span>
          </p>
          <p className="text-sm text-muted">every month</p>

          <div className="mt-6 grid grid-cols-2 gap-3">
            <div className="rounded-xl border border-white/5 bg-white/[0.03] p-4">
              <p className="font-heading text-xl font-bold tabular-nums">{gbp(valueMonth)}</p>
              <p className="text-[11px] text-muted">of your time / month</p>
            </div>
            <div className="rounded-xl border border-white/5 bg-white/[0.03] p-4">
              <p className="font-heading text-xl font-bold tabular-nums">{gbp(valueYear)}</p>
              <p className="text-[11px] text-muted">of your time / year</p>
            </div>
          </div>
          <p className="mt-4 text-sm">
            A starter automation from <b>£{STARTER_PRICE}</b> would pay for itself in about{" "}
            <b className="text-flare-cyan">
              {Number.isFinite(paybackWeeks) ? `${Math.max(1, Math.ceil(paybackWeeks))} week${Math.ceil(paybackWeeks) > 1 ? "s" : ""}` : "—"}
            </b>
            .
          </p>
        </div>
        <div className="mt-6">
          <Link href="/solutions" className="btn-primary w-full">
            See what I can automate →
          </Link>
          <p className="mt-3 text-[11px] leading-snug text-muted">
            Estimate only. Assumes automation removes about {Math.round(AUTOMATED_SHARE * 100)}% of the manual
            admin per enquiry; your real figure depends on your business.
          </p>
        </div>
      </div>
    </div>
  );
}
