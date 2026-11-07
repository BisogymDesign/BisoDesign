import Icon, { type IconName } from "@/components/Icon";

export type FlowNode = { icon: IconName; label: string; sub: string };

/**
 * Animated diagram of an automation: trigger → steps → result.
 * Horizontal on large screens, vertical on mobile. A glowing "data packet"
 * travels along each connector to show information moving automatically.
 */
export default function AutomationFlow({ nodes }: { nodes: FlowNode[] }) {
  return (
    <div className="glass neon hud relative overflow-hidden rounded-3xl p-6 md:p-10">
      <div className="ambient-grid absolute inset-0 opacity-60" aria-hidden />
      <div className="relative flex flex-col items-stretch gap-0 lg:flex-row lg:items-start">
        {nodes.map((node, i) => {
          const first = i === 0;
          const last = i === nodes.length - 1;
          return (
            <div
              key={node.label}
              className={`flex flex-col items-center lg:flex-row lg:items-start ${last ? "lg:flex-none" : "lg:flex-1"}`}
            >
              <div className="flow-node flex w-full items-center gap-4 lg:w-auto lg:flex-col lg:text-center">
                <div
                  className={`relative flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-2xl border ${
                    first
                      ? "border-flare-orange/60 text-flare-orange shadow-[0_0_30px_-6px_rgba(255,95,31,0.8)]"
                      : last
                        ? "border-emerald-400/60 text-emerald-300 shadow-[0_0_30px_-6px_rgba(52,211,153,0.8)]"
                        : "border-flare-cyan/50 text-flare-cyan shadow-[0_0_30px_-8px_rgba(34,211,238,0.8)]"
                  } bg-night/80`}
                  style={{ animationDelay: `${i * 0.7}s` }}
                >
                  <Icon name={node.icon} size={24} />
                  <span
                    className="flow-ring absolute inset-0 rounded-2xl border border-current"
                    style={{ animationDelay: `${i * 0.7}s` }}
                    aria-hidden
                  />
                </div>
                <div className="min-w-0 lg:mt-4 lg:max-w-[11rem]">
                  <p className="font-label text-[10px] uppercase tracking-[0.18em] text-muted">
                    {first ? "Trigger" : last ? "Result" : `Step ${i}`}
                  </p>
                  <p className="font-heading text-sm font-bold md:text-base">{node.label}</p>
                  <p className="mt-0.5 text-xs text-muted">{node.sub}</p>
                </div>
              </div>

              {!last && (
                <div className="flow-link relative my-2 ml-7 h-8 w-px self-start lg:my-0 lg:ml-0 lg:mt-7 lg:h-px lg:w-auto lg:flex-1 lg:self-auto">
                  <span
                    className="flow-packet"
                    style={{ animationDelay: `${i * 0.7}s` }}
                    aria-hidden
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
