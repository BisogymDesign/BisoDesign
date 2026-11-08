import { Pool } from "pg";
import type { ContactMessage, SiteContent } from "@/types/content";
import defaultContent from "../../data/content.json";

// A single pooled connection, reused across warm invocations of this
// serverless function. We keep the pool small (max: 1) since each
// function instance gets its own pool — this avoids opening a burst of
// connections under load, which matters for a low-traffic single-admin
// site like this one.
let pool: Pool | null = null;

function getPool(): Pool {
  if (!pool) {
    pool = new Pool({
      connectionString: process.env.POSTGRES_URL,
      ssl: { rejectUnauthorized: false },
      max: 1,
    });
  }
  return pool;
}

// Lazily creates the tables we need and seeds site_content with the
// repo's data/content.json the first time this runs against a fresh
// database. Cached per server instance so we don't re-check on every
// request.
let schemaReady: Promise<void> | null = null;

function ensureSchema(): Promise<void> {
  if (!schemaReady) {
    schemaReady = (async () => {
      const db = getPool();
      await db.query(`
        CREATE TABLE IF NOT EXISTS site_content (
          id INT PRIMARY KEY,
          data JSONB NOT NULL
        );
      `);
      await db.query(`
        CREATE TABLE IF NOT EXISTS messages (
          id TEXT PRIMARY KEY,
          name TEXT NOT NULL,
          email TEXT NOT NULL,
          message TEXT NOT NULL,
          created_at TEXT NOT NULL
        );
      `);

      const existing = await db.query("SELECT data FROM site_content WHERE id = 1;");
      if (existing.rowCount === 0) {
        await db.query(
          "INSERT INTO site_content (id, data) VALUES (1, $1::jsonb) ON CONFLICT (id) DO NOTHING;",
          [JSON.stringify(defaultContent)]
        );
      } else {
        // Content migrations: when data/content.json ships a higher contentVersion
        // than the one stored in the database, the stored content is backed up
        // (row id = 1000 + old version, never overwritten) and replaced with the
        // new default content. Edits made later from /admin keep the version
        // number, so they are never touched by this again.
        const stored = existing.rows[0].data as { contentVersion?: number };
        const storedVersion = stored?.contentVersion ?? 1;
        const targetVersion = (defaultContent as { contentVersion?: number }).contentVersion ?? 1;
        if (storedVersion < targetVersion) {
          await db.query(
            "INSERT INTO site_content (id, data) VALUES ($1, $2::jsonb) ON CONFLICT (id) DO NOTHING;",
            [1000 + storedVersion, JSON.stringify(stored)]
          );
          await db.query("UPDATE site_content SET data = $1::jsonb WHERE id = 1;", [JSON.stringify(defaultContent)]);
        }
      }
    })();
  }
  return schemaReady;
}

export async function dbReadContent(): Promise<SiteContent> {
  await ensureSchema();
  const db = getPool();
  const result = await db.query("SELECT data FROM site_content WHERE id = 1;");
  if (result.rowCount === 0) {
    return defaultContent as unknown as SiteContent;
  }
  return result.rows[0].data as SiteContent;
}

export async function dbWriteContent(content: SiteContent): Promise<void> {
  await ensureSchema();
  const db = getPool();
  await db.query(
    "INSERT INTO site_content (id, data) VALUES (1, $1::jsonb) ON CONFLICT (id) DO UPDATE SET data = EXCLUDED.data;",
    [JSON.stringify(content)]
  );
}

export async function dbReadMessages(): Promise<ContactMessage[]> {
  await ensureSchema();
  const db = getPool();
  const result = await db.query(
    "SELECT id, name, email, message, created_at FROM messages ORDER BY created_at DESC;"
  );
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
  const db = getPool();
  const entry: ContactMessage = {
    ...message,
    id: `msg-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    createdAt: new Date().toISOString(),
  };
  await db.query(
    "INSERT INTO messages (id, name, email, message, created_at) VALUES ($1, $2, $3, $4, $5);",
    [entry.id, entry.name, entry.email, entry.message, entry.createdAt]
  );
  return entry;
}

export async function dbDeleteMessage(id: string): Promise<void> {
  await ensureSchema();
  const db = getPool();
  await db.query("DELETE FROM messages WHERE id = $1;", [id]);
}
