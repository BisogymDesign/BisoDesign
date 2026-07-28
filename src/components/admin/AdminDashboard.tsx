"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import type {
  ContactMessage,
  PortfolioItem,
  PricingPackage,
  Service,
  SiteContent,
} from "@/types/content";

const TABS = ["Brand & About", "Services", "Pricing", "Portfolio", "Messages"] as const;
type Tab = (typeof TABS)[number];

const inputClass =
  "w-full rounded-lg border border-white/10 bg-night px-3 py-2 text-sm outline-none focus:border-flare-orange";
const labelClass = "font-label text-xs uppercase tracking-wide text-muted";

function uid(prefix: string) {
  return `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
}

export default function AdminDashboard() {
  const router = useRouter();
  const [tab, setTab] = useState<Tab>("Brand & About");
  const [content, setContent] = useState<SiteContent | null>(null);
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saveState, setSaveState] = useState<"idle" | "success" | "error">("idle");
  const [loadError, setLoadError] = useState("");

  useEffect(() => {
    async function load() {
      try {
        const [contentRes, messagesRes] = await Promise.all([
          fetch("/api/admin/content"),
          fetch("/api/admin/messages"),
        ]);
        if (!contentRes.ok || !messagesRes.ok) throw new Error("Failed to load admin data.");
        setContent(await contentRes.json());
        setMessages(await messagesRes.json());
      } catch (err) {
        setLoadError(err instanceof Error ? err.message : "Something went wrong.");
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  async function handleSave() {
    if (!content) return;
    setSaving(true);
    setSaveState("idle");
    try {
      const res = await fetch("/api/admin/content", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(content),
      });
      if (!res.ok) throw new Error("Save failed.");
      setSaveState("success");
    } catch {
      setSaveState("error");
    } finally {
      setSaving(false);
    }
  }

  async function handleLogout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.refresh();
  }

  async function handleDeleteMessage(id: string) {
    const res = await fetch(`/api/admin/messages?id=${encodeURIComponent(id)}`, {
      method: "DELETE",
    });
    if (res.ok) setMessages((prev) => prev.filter((m) => m.id !== id));
  }

  if (loading) {
    return <div className="mx-auto max-w-4xl px-6 py-24 text-muted">Loading admin panel…</div>;
  }

  if (loadError || !content) {
    return (
      <div className="mx-auto max-w-4xl px-6 py-24 text-flare-orange">
        {loadError || "Could not load content."}
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-5xl px-6 py-16">
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <h1 className="font-heading text-2xl font-bold">Admin panel</h1>
        <div className="flex items-center gap-3">
          <button
            onClick={handleSave}
            disabled={saving}
            className="rounded-full bg-flare-gradient px-5 py-2 font-label text-sm font-semibold text-night shadow-glow disabled:opacity-60"
          >
            {saving ? "Saving…" : "Save changes"}
          </button>
          <button
            onClick={handleLogout}
            className="rounded-full border border-white/15 px-5 py-2 font-label text-sm text-muted hover:text-ink"
          >
            Log out
          </button>
        </div>
      </div>

      {saveState === "success" && (
        <p className="mb-4 text-sm text-flare-peach">Saved.</p>
      )}
      {saveState === "error" && (
        <p className="mb-4 text-sm text-flare-orange">Something went wrong while saving.</p>
      )}

      <div className="mb-8 flex flex-wrap gap-2 border-b border-white/10 pb-4">
        {TABS.map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`rounded-full px-4 py-2 font-label text-sm ${
              tab === t ? "bg-flare-gradient text-night" : "text-muted hover:text-ink"
            }`}
          >
            {t}
            {t === "Messages" && messages.length > 0 ? ` (${messages.length})` : ""}
          </button>
        ))}
      </div>

      {tab === "Brand & About" && (
        <BrandTab content={content} setContent={setContent} />
      )}
      {tab === "Services" && <ServicesTab content={content} setContent={setContent} />}
      {tab === "Pricing" && <PricingTab content={content} setContent={setContent} />}
      {tab === "Portfolio" && <PortfolioTab content={content} setContent={setContent} />}
      {tab === "Messages" && (
        <MessagesTab messages={messages} onDelete={handleDeleteMessage} />
      )}
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  textarea,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  textarea?: boolean;
}) {
  return (
    <div>
      <label className={labelClass}>{label}</label>
      {textarea ? (
        <textarea
          className={`${inputClass} mt-2`}
          rows={4}
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
      ) : (
        <input
          className={`${inputClass} mt-2`}
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
      )}
    </div>
  );
}

function Card({ children }: { children: React.ReactNode }) {
  return <div className="rounded-2xl border border-white/10 bg-surface p-6">{children}</div>;
}

function BrandTab({
  content,
  setContent,
}: {
  content: SiteContent;
  setContent: (c: SiteContent) => void;
}) {
  return (
    <div className="space-y-6">
      <Card>
        <div className="grid gap-4 md:grid-cols-2">
          <Field label="Brand name" value={content.brand} onChange={(v) => setContent({ ...content, brand: v })} />
          <Field label="Tagline" value={content.tagline} onChange={(v) => setContent({ ...content, tagline: v })} />
          <Field label="Hero title" value={content.heroTitle} onChange={(v) => setContent({ ...content, heroTitle: v })} />
          <Field label="Contact email" value={content.contactEmail} onChange={(v) => setContent({ ...content, contactEmail: v })} />
        </div>
        <div className="mt-4">
          <Field
            label="Hero subtitle"
            textarea
            value={content.heroSubtitle}
            onChange={(v) => setContent({ ...content, heroSubtitle: v })}
          />
        </div>
      </Card>

      <Card>
        <Field label="About title" value={content.aboutTitle} onChange={(v) => setContent({ ...content, aboutTitle: v })} />
        <div className="mt-4">
          <Field
            label="About text"
            textarea
            value={content.aboutText}
            onChange={(v) => setContent({ ...content, aboutText: v })}
          />
        </div>
      </Card>

      <Card>
        <div className="mb-4 flex items-center justify-between">
          <p className={labelClass}>Social links</p>
          <button
            onClick={() =>
              setContent({
                ...content,
                socialLinks: [...content.socialLinks, { label: "New link", url: "" }],
              })
            }
            className="font-label text-xs text-flare-peach"
          >
            + Add link
          </button>
        </div>
        <div className="space-y-3">
          {content.socialLinks.map((link, i) => (
            <div key={i} className="flex gap-3">
              <input
                className={inputClass}
                value={link.label}
                onChange={(e) => {
                  const next = [...content.socialLinks];
                  next[i] = { ...next[i], label: e.target.value };
                  setContent({ ...content, socialLinks: next });
                }}
              />
              <input
                className={inputClass}
                value={link.url}
                onChange={(e) => {
                  const next = [...content.socialLinks];
                  next[i] = { ...next[i], url: e.target.value };
                  setContent({ ...content, socialLinks: next });
                }}
              />
              <button
                onClick={() =>
                  setContent({
                    ...content,
                    socialLinks: content.socialLinks.filter((_, idx) => idx !== i),
                  })
                }
                className="shrink-0 text-flare-orange"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}

function ServicesTab({
  content,
  setContent,
}: {
  content: SiteContent;
  setContent: (c: SiteContent) => void;
}) {
  function update(i: number, field: keyof Service, value: string) {
    const next = [...content.services];
    next[i] = { ...next[i], [field]: value };
    setContent({ ...content, services: next });
  }

  return (
    <div className="space-y-4">
      {content.services.map((service, i) => (
        <Card key={service.id}>
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1 space-y-3">
              <Field label="Title" value={service.title} onChange={(v) => update(i, "title", v)} />
              <Field
                label="Description"
                textarea
                value={service.description}
                onChange={(v) => update(i, "description", v)}
              />
            </div>
            <button
              onClick={() =>
                setContent({
                  ...content,
                  services: content.services.filter((_, idx) => idx !== i),
                })
              }
              className="mt-6 shrink-0 font-label text-xs text-flare-orange"
            >
              Remove
            </button>
          </div>
        </Card>
      ))}
      <button
        onClick={() =>
          setContent({
            ...content,
            services: [
              ...content.services,
              { id: uid("svc"), title: "New service", description: "" },
            ],
          })
        }
        className="rounded-full border border-white/15 px-5 py-2 font-label text-sm text-muted hover:text-ink"
      >
        + Add service
      </button>
    </div>
  );
}

function PricingTab({
  content,
  setContent,
}: {
  content: SiteContent;
  setContent: (c: SiteContent) => void;
}) {
  function update(i: number, field: keyof PricingPackage, value: unknown) {
    const next = [...content.pricing];
    next[i] = { ...next[i], [field]: value } as PricingPackage;
    setContent({ ...content, pricing: next });
  }

  return (
    <div className="space-y-4">
      {content.pricing.map((pkg, i) => (
        <Card key={pkg.id}>
          <div className="grid gap-4 md:grid-cols-2">
            <Field label="Name" value={pkg.name} onChange={(v) => update(i, "name", v)} />
            <Field label="Price" value={pkg.price} onChange={(v) => update(i, "price", v)} />
            <Field
              label="Price note"
              value={pkg.priceNote ?? ""}
              onChange={(v) => update(i, "priceNote", v)}
            />
            <div className="flex items-end gap-2">
              <label className="flex items-center gap-2 font-label text-xs uppercase tracking-wide text-muted">
                <input
                  type="checkbox"
                  checked={!!pkg.highlighted}
                  onChange={(e) => update(i, "highlighted", e.target.checked)}
                />
                Highlight as "most popular"
              </label>
            </div>
          </div>
          <div className="mt-4">
            <Field label="Tagline" value={pkg.tagline} onChange={(v) => update(i, "tagline", v)} />
          </div>
          <div className="mt-4">
            <label className={labelClass}>Features (one per line)</label>
            <textarea
              className={`${inputClass} mt-2`}
              rows={5}
              value={pkg.features.join("\n")}
              onChange={(e) => update(i, "features", e.target.value.split("\n"))}
            />
          </div>
          <button
            onClick={() =>
              setContent({
                ...content,
                pricing: content.pricing.filter((_, idx) => idx !== i),
              })
            }
            className="mt-4 font-label text-xs text-flare-orange"
          >
            Remove package
          </button>
        </Card>
      ))}
      <button
        onClick={() =>
          setContent({
            ...content,
            pricing: [
              ...content.pricing,
              {
                id: uid("pkg"),
                name: "New package",
                price: "€0",
                priceNote: "starting at",
                tagline: "",
                features: [],
                highlighted: false,
              },
            ],
          })
        }
        className="rounded-full border border-white/15 px-5 py-2 font-label text-sm text-muted hover:text-ink"
      >
        + Add package
      </button>
    </div>
  );
}

function PortfolioTab({
  content,
  setContent,
}: {
  content: SiteContent;
  setContent: (c: SiteContent) => void;
}) {
  function update(i: number, field: keyof PortfolioItem, value: unknown) {
    const next = [...content.portfolio];
    next[i] = { ...next[i], [field]: value } as PortfolioItem;
    setContent({ ...content, portfolio: next });
  }

  return (
    <div className="space-y-4">
      {content.portfolio.map((item, i) => (
        <Card key={item.id}>
          <div className="grid gap-4 md:grid-cols-2">
            <Field label="Title" value={item.title} onChange={(v) => update(i, "title", v)} />
            <Field label="Live URL (optional)" value={item.url ?? ""} onChange={(v) => update(i, "url", v)} />
          </div>
          <div className="mt-4">
            <Field
              label="Description"
              textarea
              value={item.description}
              onChange={(v) => update(i, "description", v)}
            />
          </div>
          <div className="mt-4">
            <Field
              label="Tags (comma separated)"
              value={item.tags.join(", ")}
              onChange={(v) =>
                update(
                  i,
                  "tags",
                  v.split(",").map((t) => t.trim()).filter(Boolean)
                )
              }
            />
          </div>
          <button
            onClick={() =>
              setContent({
                ...content,
                portfolio: content.portfolio.filter((_, idx) => idx !== i),
              })
            }
            className="mt-4 font-label text-xs text-flare-orange"
          >
            Remove project
          </button>
        </Card>
      ))}
      <button
        onClick={() =>
          setContent({
            ...content,
            portfolio: [
              ...content.portfolio,
              { id: uid("proj"), title: "New project", description: "", url: "", tags: [] },
            ],
          })
        }
        className="rounded-full border border-white/15 px-5 py-2 font-label text-sm text-muted hover:text-ink"
      >
        + Add project
      </button>
    </div>
  );
}

function MessagesTab({
  messages,
  onDelete,
}: {
  messages: ContactMessage[];
  onDelete: (id: string) => void;
}) {
  if (messages.length === 0) {
    return <p className="text-sm text-muted">No messages yet.</p>;
  }

  return (
    <div className="space-y-4">
      {messages.map((m) => (
        <Card key={m.id}>
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="font-heading font-bold">{m.name}</p>
              <a href={`mailto:${m.email}`} className="text-sm text-flare-peach">
                {m.email}
              </a>
              <p className="mt-1 text-xs text-muted">
                {new Date(m.createdAt).toLocaleString()}
              </p>
              <p className="mt-3 text-sm text-ink/90">{m.message}</p>
            </div>
            <button
              onClick={() => onDelete(m.id)}
              className="shrink-0 font-label text-xs text-flare-orange"
            >
              Delete
            </button>
          </div>
        </Card>
      ))}
    </div>
  );
}
