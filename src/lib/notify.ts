/**
 * Email notification for every new website enquiry, sent through Resend (resend.com).
 *
 * Configure in Vercel → Settings → Environment Variables:
 *   RESEND_API_KEY        — API key from resend.com (required; without it nothing is sent)
 *   CONTACT_NOTIFY_EMAIL  — where notifications go (defaults to the site's contact email)
 *   RESEND_FROM           — optional sender, e.g. "BisoDesign <hello@bisodesign.co.uk>" once the
 *                           domain is verified in Resend. Until then Resend's test sender is used,
 *                           which can only deliver to the email address the Resend account was created with.
 */

type Lead = { name: string; email: string; message: string; createdAt: string };

const escapeHtml = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

export async function sendLeadNotification(lead: Lead, fallbackTo: string): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return; // not configured yet — the enquiry is still saved in /admin

  const to = process.env.CONTACT_NOTIFY_EMAIL || fallbackTo;
  const from = process.env.RESEND_FROM || "BisoDesign Website <onboarding@resend.dev>";
  const when = new Date(lead.createdAt).toLocaleString("en-GB", { timeZone: "Europe/London", dateStyle: "medium", timeStyle: "short" });
  const firstLine = lead.message.split("\n").find((l) => l.trim()) ?? "";

  const html = `
  <div style="font-family:Arial,Helvetica,sans-serif;max-width:560px;margin:0 auto;color:#1b1722">
    <p style="font-size:12px;letter-spacing:2px;text-transform:uppercase;color:#c2410c;margin:0 0 8px">New enquiry · bisodesign.co.uk</p>
    <h2 style="margin:0 0 16px;font-size:22px">${escapeHtml(lead.name)} wants to talk</h2>
    <table style="border-collapse:collapse;width:100%;font-size:14px">
      <tr><td style="padding:6px 0;color:#6b6480;width:80px">Name</td><td style="padding:6px 0"><b>${escapeHtml(lead.name)}</b></td></tr>
      <tr><td style="padding:6px 0;color:#6b6480">Email</td><td style="padding:6px 0"><a href="mailto:${escapeHtml(lead.email)}">${escapeHtml(lead.email)}</a></td></tr>
      <tr><td style="padding:6px 0;color:#6b6480">Received</td><td style="padding:6px 0">${escapeHtml(when)}</td></tr>
    </table>
    <div style="margin:16px 0;padding:16px;background:#f6f1e7;border-radius:10px;font-size:15px;line-height:1.5;white-space:pre-wrap">${escapeHtml(lead.message)}</div>
    <p style="font-size:13px;color:#6b6480">Just press <b>Reply</b> to answer ${escapeHtml(lead.name)} directly. All enquiries are also saved in your website admin.</p>
  </div>`;

  const text = `New enquiry from ${lead.name} <${lead.email}> (${when})\n\n${lead.message}\n\nReply to this email to answer them directly.`;

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 8000);
  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from,
        to: [to],
        reply_to: lead.email,
        subject: `New enquiry: ${lead.name}${firstLine ? ` — ${firstLine.slice(0, 60)}` : ""}`,
        html,
        text,
      }),
      signal: controller.signal,
    });
    if (!res.ok) console.error("Resend notification failed:", res.status, await res.text());
  } finally {
    clearTimeout(timer);
  }
}
