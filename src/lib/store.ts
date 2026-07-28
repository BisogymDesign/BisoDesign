import { promises as fs } from "fs";
import path from "path";
import type { ContactMessage, SiteContent } from "@/types/content";
import {
  dbAppendMessage,
  dbDeleteMessage,
  dbReadContent,
  dbReadMessages,
  dbWriteContent,
} from "@/lib/db";

const dataDir = path.join(process.cwd(), "data");
const contentPath = path.join(dataDir, "content.json");
const messagesPath = path.join(dataDir, "messages.json");

// When POSTGRES_URL is set (added automatically once the Vercel Postgres
// storage integration is attached to the project), we use the real
// database — this is what makes /admin "Save changes" persist in
// production, where the filesystem is read-only at runtime. Without it
// (e.g. local development) we fall back to reading/writing the JSON files
// in ./data, exactly like before.
function hasDatabase(): boolean {
  return Boolean(process.env.POSTGRES_URL);
}

export async function readContent(): Promise<SiteContent> {
  if (hasDatabase()) {
    return dbReadContent();
  }
  const raw = await fs.readFile(contentPath, "utf-8");
  return JSON.parse(raw) as SiteContent;
}

export async function writeContent(content: SiteContent): Promise<void> {
  if (hasDatabase()) {
    await dbWriteContent(content);
    return;
  }
  await fs.writeFile(contentPath, JSON.stringify(content, null, 2), "utf-8");
}

export async function readMessages(): Promise<ContactMessage[]> {
  if (hasDatabase()) {
    return dbReadMessages();
  }
  const raw = await fs.readFile(messagesPath, "utf-8");
  return JSON.parse(raw) as ContactMessage[];
}

export async function appendMessage(
  message: Omit<ContactMessage, "id" | "createdAt">
): Promise<ContactMessage> {
  if (hasDatabase()) {
    return dbAppendMessage(message);
  }
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
  if (hasDatabase()) {
    await dbDeleteMessage(id);
    return;
  }
  const messages = await readMessages();
  const next = messages.filter((m) => m.id !== id);
  await fs.writeFile(messagesPath, JSON.stringify(next, null, 2), "utf-8");
}
