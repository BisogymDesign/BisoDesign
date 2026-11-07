import Icon from "@/components/Icon";
import SiteMockup from "@/components/SiteMockup";
import { getTemplate } from "@/data/templates";

/** Visual "this is exactly what it looks like" previews for each solution. */
export type Preview =
  | {
      kind: "chat";
      app: string;
      contact: string;
      messages: { from: "in" | "out"; text: string; time: string }[];
      typing?: boolean;
    }
  | { kind: "email"; from: string; to: string; subject: string; lines: string[]; cta?: string }
  | { kind: "sheet"; title: string; columns: string[]; rows: string[][] }
  | {
      kind: "calendar";
      title: string;
      days: { day: string; slots: { time: string; label?: string; state: "free" | "booked" | "new" }[] }[];
    }
  | { kind: "quote"; title: string; fields: { label: string; value: string }[]; result: string; note: string }
  | {
      kind: "dashboard";
      title: string;
      stats: { label: string; value: string }[];
      items: { title: string; meta: string; status: "new" | "done" | "waiting" }[];
    }
  | { kind: "serp"; query: string; results: { name: string; rating: string; reviews: string; meta: string; you?: boolean }[] }
  | { kind: "payment"; business: string; customer: string; amount: string; item: string }
  | { kind: "site"; template: string };

function Phone({ children, title, sub }: { children: React.ReactNode; title: string; sub?: string }) {
  return (
    <div className="mx-auto w-full max-w-[300px] rounded-[2.2rem] border border-white/15 bg-[#0b0a10] p-2.5 shadow-[0_30px_80px_-30px_rgba(139,92,246,0.6)]">
      <div className="overflow-hidden rounded-[1.8rem] bg-[#111018]">
        <div className="flex items-center justify-between px-5 pt-3 font-label text-[10px] text-white/60">
          <span>9:41</span>
          <span className="h-4 w-16 rounded-full bg-black" />
          <span>5G ▮▮▮</span>
        </div>
        <div className="flex items-center gap-2 border-b border-white/5 px-4 py-3">
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-flare-gradient font-heading text-xs font-bold text-night">
            {title.charAt(0)}
          </span>
          <div className="leading-tight">
            <p className="text-sm font-semibold text-white">{title}</p>
            {sub && <p className="text-[10px] text-emerald-300">{sub}</p>}
          </div>
        </div>
        <div className="min-h-[300px] space-y-2 px-3 py-4">{children}</div>
      </div>
    </div>
  );
}

function Bubble({ from, text, time }: { from: "in" | "out"; text: string; time: string }) {
  return (
    <div className={`flex ${from === "out" ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-[85%] whitespace-pre-line rounded-2xl px-3 py-2 text-[12px] leading-snug ${
          from === "out"
            ? "rounded-br-sm bg-[#1f6f5c] text-white"
            : "rounded-bl-sm bg-white/10 text-white/90"
        }`}
      >
        {text}
        <span className="ml-2 align-bottom text-[9px] text-white/50">{time}</span>
      </div>
    </div>
  );
}

export default function PreviewMock({ preview }: { preview: Preview }) {
  switch (preview.kind) {
    case "chat":
      return (
        <Phone title={preview.contact} sub={preview.app}>
          {preview.messages.map((m, i) => (
            <Bubble key={i} {...m} />
          ))}
          {preview.typing && (
            <div className="flex justify-start">
              <div className="typing rounded-2xl rounded-bl-sm bg-white/10 px-3 py-2.5 text-white/70">
                <span />
                <span />
                <span />
              </div>
            </div>
          )}
        </Phone>
      );

    case "payment":
      return (
        <Phone title={preview.business} sub="Text message">
          <Bubble
            from="in"
            time="14:02"
            text={`Hi ${preview.customer}, thanks for choosing ${preview.business}! Your total for ${preview.item} is ${preview.amount}. Pay securely here 👇`}
          />
          <div className="ml-1 w-[85%] overflow-hidden rounded-2xl border border-white/10 bg-white/5">
            <div className="bg-gradient-to-r from-violet-600 to-indigo-500 px-3 py-2 text-[11px] font-semibold text-white">
              Secure checkout
            </div>
            <div className="space-y-2 p-3 text-[11px] text-white/80">
              <div className="flex justify-between">
                <span>{preview.item}</span>
                <span className="font-semibold text-white">{preview.amount}</span>
              </div>
              <div className="rounded-lg border border-white/10 px-2 py-1.5 text-white/50">💳 •••• 4242</div>
              <div className="rounded-lg bg-white py-1.5 text-center font-semibold text-black"> Pay {preview.amount}</div>
            </div>
          </div>
          <Bubble from="in" time="14:03" text="✅ Payment received — receipt sent to your email. Thank you!" />
        </Phone>
      );

    case "email":
      return (
        <div className="overflow-hidden rounded-2xl border border-white/10 bg-[#f7f7fb] text-[#1b1b23] shadow-[0_30px_80px_-30px_rgba(139,92,246,0.6)]">
          <div className="flex items-center gap-2 border-b border-black/5 bg-white px-4 py-2.5">
            <Icon name="mail" size={16} className="text-violet-600" />
            <span className="text-xs font-semibold">Inbox</span>
          </div>
          <div className="space-y-1 border-b border-black/5 px-5 py-4 text-xs">
            <p className="text-base font-bold">{preview.subject}</p>
            <p className="text-black/60">
              <span className="font-semibold text-black/80">{preview.from}</span> → {preview.to}
            </p>
          </div>
          <div className="space-y-3 px-5 py-5 text-[13px] leading-relaxed">
            {preview.lines.map((l, i) => (
              <p key={i}>{l}</p>
            ))}
            {preview.cta && (
              <span className="inline-block rounded-lg bg-violet-600 px-4 py-2 text-xs font-semibold text-white">
                {preview.cta}
              </span>
            )}
          </div>
        </div>
      );

    case "sheet":
      return (
        <div className="overflow-hidden rounded-2xl border border-white/10 bg-white text-[#1b1b23] shadow-[0_30px_80px_-30px_rgba(34,211,238,0.5)]">
          <div className="flex items-center gap-2 border-b border-black/5 bg-[#e8f5ec] px-4 py-2.5">
            <Icon name="sheet" size={16} className="text-emerald-700" />
            <span className="text-xs font-semibold">{preview.title}</span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-[11px]">
              <thead>
                <tr className="bg-black/[0.03]">
                  {preview.columns.map((c) => (
                    <th key={c} className="whitespace-nowrap border-b border-r border-black/5 px-3 py-2 font-semibold">
                      {c}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {preview.rows.map((r, i) => {
                  const isNew = i === 0;
                  return (
                    <tr key={i} className={isNew ? "bg-emerald-50" : ""}>
                      {r.map((cell, j) => (
                        <td key={j} className="whitespace-nowrap border-b border-r border-black/5 px-3 py-2">
                          {j === 0 && isNew && (
                            <span className="mr-1.5 rounded bg-emerald-500 px-1 py-0.5 text-[9px] font-bold text-white">
                              NEW
                            </span>
                          )}
                          {cell}
                        </td>
                      ))}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      );

    case "calendar":
      return (
        <div className="glass rounded-2xl p-4">
          <div className="mb-3 flex items-center gap-2">
            <Icon name="calendar" size={16} className="text-flare-cyan" />
            <span className="font-heading text-sm font-bold">{preview.title}</span>
          </div>
          <div className="grid grid-cols-3 gap-2 sm:grid-cols-5">
            {preview.days.map((d) => (
              <div key={d.day}>
                <p className="mb-1.5 text-center font-label text-[10px] uppercase tracking-wider text-muted">{d.day}</p>
                <div className="space-y-1.5">
                  {d.slots.map((s, i) => (
                    <div
                      key={i}
                      className={`rounded-lg px-2 py-1.5 text-[10px] leading-tight ${
                        s.state === "new"
                          ? "border border-emerald-400/60 bg-emerald-400/15 text-emerald-200 shadow-[0_0_16px_-4px_rgba(52,211,153,0.8)]"
                          : s.state === "booked"
                            ? "bg-flare-violet/25 text-violet-200"
                            : "border border-dashed border-white/15 text-muted"
                      }`}
                    >
                      <span className="font-semibold">{s.time}</span>
                      {s.label && <span className="block truncate">{s.label}</span>}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      );

    case "quote":
      return (
        <div className="overflow-hidden rounded-2xl border border-white/10 bg-white text-[#16151d] shadow-[0_30px_80px_-30px_rgba(255,95,31,0.5)]">
          <div className="bg-[#16151d] px-5 py-3 text-sm font-bold text-white">{preview.title}</div>
          <div className="space-y-3 p-5">
            {preview.fields.map((f) => (
              <div key={f.label}>
                <p className="text-[10px] font-semibold uppercase tracking-wider text-black/50">{f.label}</p>
                <div className="mt-1 rounded-lg border border-black/10 px-3 py-2 text-sm">{f.value}</div>
              </div>
            ))}
            <div className="rounded-xl bg-gradient-to-r from-orange-500 to-fuchsia-600 p-4 text-white">
              <p className="text-[10px] uppercase tracking-wider opacity-80">Your instant estimate</p>
              <p className="font-heading text-2xl font-extrabold">{preview.result}</p>
              <p className="text-[11px] opacity-90">{preview.note}</p>
            </div>
            <div className="rounded-lg bg-black py-2.5 text-center text-sm font-semibold text-white">
              Confirm &amp; book →
            </div>
          </div>
        </div>
      );

    case "dashboard":
      return (
        <div className="glass rounded-2xl p-5">
          <div className="mb-4 flex items-center justify-between">
            <span className="font-heading text-sm font-bold">{preview.title}</span>
            <span className="chip !text-emerald-300">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" /> Live
            </span>
          </div>
          <div className="grid grid-cols-3 gap-2">
            {preview.stats.map((s) => (
              <div key={s.label} className="rounded-xl border border-white/5 bg-white/[0.03] p-3">
                <p className="font-heading text-lg font-extrabold text-gradient">{s.value}</p>
                <p className="text-[10px] text-muted">{s.label}</p>
              </div>
            ))}
          </div>
          <div className="mt-4 space-y-2">
            {preview.items.map((it) => (
              <div key={it.title} className="flex items-center justify-between rounded-xl border border-white/5 bg-white/[0.02] px-3 py-2.5">
                <div className="min-w-0">
                  <p className="truncate text-xs font-semibold">{it.title}</p>
                  <p className="text-[10px] text-muted">{it.meta}</p>
                </div>
                <span
                  className={`ml-2 flex-shrink-0 rounded-full px-2 py-0.5 text-[10px] font-semibold ${
                    it.status === "new"
                      ? "bg-flare-cyan/15 text-flare-cyan"
                      : it.status === "done"
                        ? "bg-emerald-400/15 text-emerald-300"
                        : "bg-flare-orange/15 text-orange-300"
                  }`}
                >
                  {it.status === "new" ? "New" : it.status === "done" ? "Done" : "Follow-up"}
                </span>
              </div>
            ))}
          </div>
        </div>
      );

    case "serp":
      return (
        <div className="overflow-hidden rounded-2xl border border-white/10 bg-white text-[#202124] shadow-[0_30px_80px_-30px_rgba(34,211,238,0.5)]">
          <div className="flex items-center gap-2 border-b border-black/5 px-4 py-3">
            <Icon name="search" size={16} className="text-black/50" />
            <span className="text-sm">{preview.query}</span>
          </div>
          <div className="relative h-24 bg-[linear-gradient(135deg,#e8eef3,#dfe9e1)]">
            {preview.results.map((r, i) => (
              <span
                key={r.name}
                className={`absolute flex h-6 w-6 items-center justify-center rounded-full text-[10px] font-bold text-white ${
                  r.you ? "bg-violet-600 ring-4 ring-violet-300" : "bg-red-500"
                }`}
                style={{ left: `${20 + i * 27}%`, top: `${25 + (i % 2) * 30}%` }}
              >
                {String.fromCharCode(65 + i)}
              </span>
            ))}
          </div>
          <div className="divide-y divide-black/5">
            {preview.results.map((r, i) => (
              <div key={r.name} className={`px-4 py-3 ${r.you ? "bg-violet-50" : ""}`}>
                <p className="text-sm font-semibold text-[#1a0dab]">
                  {String.fromCharCode(65 + i)}. {r.name}
                  {r.you && (
                    <span className="ml-2 rounded bg-violet-600 px-1.5 py-0.5 text-[9px] font-bold text-white">YOU</span>
                  )}
                </p>
                <p className="text-xs text-black/70">
                  <span className="font-semibold text-amber-600">{r.rating} ★</span> ({r.reviews}) · {r.meta}
                </p>
              </div>
            ))}
          </div>
        </div>
      );

    case "site": {
      const t = getTemplate(preview.template);
      return t ? <SiteMockup template={t} /> : null;
    }
  }
}
