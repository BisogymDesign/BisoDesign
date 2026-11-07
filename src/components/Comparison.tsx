const ROWS: { label: string; diy: string; agency: string; us: string }[] = [
  { label: "Built around your business", diy: "Pick a template, fit yourself into it", agency: "Yes", us: "Yes — designed and written for your customers" },
  { label: "Speed on mobile", diy: "Often heavy and slow", agency: "Varies", us: "Hand-coded to load in about a second" },
  { label: "Automations", diy: "Add-on apps, extra monthly costs", agency: "Usually a separate project", us: "Built in from day one" },
  { label: "Who you talk to", diy: "Help articles & support tickets", agency: "An account manager", us: "Directly with the person building it" },
  { label: "Ongoing platform fees", diy: "Monthly subscription, forever", agency: "Varies", us: "None — you own the code" },
  { label: "Your time", diy: "Evenings and weekends doing it yourself", agency: "Meetings and long timelines", us: "A short call, then I handle it" },
  { label: "Price", diy: "Low upfront, adds up over time", agency: "Higher, to cover overheads", us: "Fixed price from £495, agreed upfront" },
];

export default function Comparison() {
  return (
    <div className="glass neon overflow-hidden rounded-3xl">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[640px] text-left text-sm">
          <thead>
            <tr className="border-b border-white/10">
              <th className="p-5 font-label text-[10px] font-normal uppercase tracking-[0.2em] text-muted">&nbsp;</th>
              <th className="p-5 font-heading font-bold text-muted">DIY website builder</th>
              <th className="p-5 font-heading font-bold text-muted">Large agency</th>
              <th className="relative bg-flare-violet/10 p-5 font-heading font-bold">
                <span className="text-gradient">BisoDesign</span>
                <span className="absolute inset-x-0 top-0 h-0.5 bg-flare-gradient" />
              </th>
            </tr>
          </thead>
          <tbody>
            {ROWS.map((r) => (
              <tr key={r.label} className="border-b border-white/5 last:border-0">
                <td className="p-5 font-semibold text-ink/90">{r.label}</td>
                <td className="p-5 text-muted">{r.diy}</td>
                <td className="p-5 text-muted">{r.agency}</td>
                <td className="bg-flare-violet/10 p-5 text-ink">
                  <span className="mr-2 text-flare-cyan">✔</span>
                  {r.us}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
