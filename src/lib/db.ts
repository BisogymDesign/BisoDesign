import { sql } from "@vercel/postgres";
import type { ContactMessage, SiteContent } from "@/types/content";
import defaultContent from "../../data/content.json";

let schemaReady: Promise<void> | null = null;

function ensureSchema(): Promise<void> {
  if (!schemaReady) {
    schemaReady = (async () => {
      await sql`
        CREATE TABLE IF NOT EXISTS site_content (
          id INT PRIMARY KEY,
          data JSONB NOT NULL
        );
      `;
      await sql`
        CREATE TABLE IF NOT EXISTS messages (
          id TEXT PRIMARY KEY,
          name TEXT NOT NULL,
          email TEXT NOT NULL,
          message TEXT NOT NULL,
          created_at TEXT NOT NULL
        );
      `;

      const existing = await sql`SELECT id FROM site_content WHERE id = 1;`;
      if (existing.rowCount === 0) {
        await sql`
          INSERT INTO site_content (id, data)
          VALUES (1, ${JSON.stringify(defaultContent)}::jsonb)
          ON CONFLICT (id) DO NOTHING;
        `;
      }
    })();
  }
  return schemaReady;
}

export async function dbReadContent(): Promise<SiteContent> {
  await ensureSchema();
  const result = await sql`SELECT data FROM site_content WHERE id = 1;`;
  if (result.rowCount === 0) {
    return defaultContent as unknown as SiteContent;
  }
  return result.rows[0].data as SiteContent;
}

export async function dbWriteContent(content: SiteContent): Promise<void> {
  await ensureSchema();
  await sql`
    INSERT INTO site_content (id, data)
    VALUES (1, ${JSON.stringify(content)}::jsonb)
    ON CONFLICT (id) DO UPDATE SET data = EXCLUDED.data;
  `;
}

export async function dbReadMessages(): Promise<ContactMessage[]> {
  await ensureSchema();
  const result = await sql`
    SELECT id, name, email, message, created_at
    FROM messages
    ORDER BY created_at DESC;
  `;
  return result.rows.map((row) => ({
    id: row.id as string,
    name: row.name as string,
    email: row.email as string,
    message: row.message as string,
    createdAt: row.created_at as string,
  }));
}

export async function dbAppendMessage(
  message: Omit<ContactMessage, "id" | "createdAt">
): Promise<ContactMessage> {
  await ensureSchema();
  const entry: ContactMessage = {
    ...message,
    id: `msg-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    createdAt: new Date().toISOString(),
  };
  await sql`
    INSERT INTO messages (id, name, email, message, created_at)
    VALUES (${entry.id}, ${entry.name}, ${entry.email}, ${entry.message}, ${entry.createdAt});
  `;
  return entry;
}

export async function dbDeleteMessage(id: string): Promise<void> {
  await ensureSchema();
  await sql`DELETE FROM messages WHERE id = ${id};`;
}
