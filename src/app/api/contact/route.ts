import { NextRequest, NextResponse } from "next/server";
import { appendMessage } from "@/lib/store";

export async function POST(request: NextRequest) {
  let body: { name?: string; email?: string; message?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const name = (body.name ?? "").trim();
  const email = (body.email ?? "").trim();
  const message = (body.message ?? "").trim();

  if (!name || !email || !message) {
    return NextResponse.json({ error: "All fields are required." }, { status: 400 });
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: "Please enter a valid email." }, { status: 400 });
  }

  const createdAt = new Date().toISOString();

  // Forward to a Google Sheet via an Apps Script Web App, if configured.
  // See README.md for how to set up the sheet + script and get this URL.
  const sheetsWebhook = process.env.GOOGLE_SHEETS_WEBHOOK_URL;
  if (sheetsWebhook) {
    try {
      await fetch(sheetsWebhook, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message, createdAt }),
      });
    } catch (err) {
      // Don't fail the form submission just because the Sheet is unreachable —
      // the message is still saved locally below.
      console.error("Failed to forward contact message to Google Sheets:", err);
    }
  }

  await appendMessage({ name, email, message });
  return NextResponse.json({ ok: true });
}
