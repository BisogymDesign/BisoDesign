import { promises as fs } from "fs";
import path from "path";
import type { ContactMessage, SiteContent } from "@/types/content";

const dataDir = path.join(process.cwd(), "data");
const contentPath = path.join(dataDir, "content.json");
const messagesPath = path.join(dataDir, "messages.json");

export async function readContent(): Promise<SiteContent> {
  const raw = await fs.readFile(contentPath, "utf-8");
  return JSON.parse(raw) as SiteContent;
}

export async function writeContent(content: SiteContent): Promise<void> {
  await fs.writeFile(contentPath, JSON.stringify(content, null, 2), "utf-8");
}

export async function readMessages(): Promise<ContactMessage[]> {
  const raw = await fs.readFile(messagesPath, "utf-8");
  return JSON.parse(raw) as ContactMessage[];
}

export async function appendMessage(
  message: Omit<ContactMessage, "id" | "createdAt">
): Promise<ContactMessage> {
  const messages = await readMessages();
  const entry: ContactMessage = {
    ...message,
    id: `msg-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    createdAt: new Date().toISOString(),
  };
  messages.unshift(entry);
  await fs.writeFile(messagesPath, JSON.stringify(messages, null, 2), "utf-8");
  return entry;
}

export async function deleteMessage(id: string): Promise<void> {
  const messages = await readMessages();
  const next = messages.filter((m) => m.id !== id);
  await fs.writeFile(messagesPath, JSON.stringify(next, null, 2), "utf-8");
}

/**
 * NOTE on persistence:
 * Content and messages are stored as JSON files on disk. This works great
 * for local development and for any hosting where the filesystem persists
 * between requests (a VPS, Railway, Render, Docker, etc.) — edits made from
 * /admin are saved immediately and show up on the live site with no redeploy.
 *
 * Serverless platforms with an ephemeral/read-only filesystem at runtime
 * (e.g. Vercel's default serverless functions) will NOT persist writes made
 * this way in production. If you deploy there, swap these functions for
 * calls to a hosted database (Supabase/Postgres, Turso, etc.) — the rest of
 * the app only talks to this file, so that's the only place that needs to
 * change. See README.md for notes on making that swap.
 */
