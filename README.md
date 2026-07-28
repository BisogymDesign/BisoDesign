# BisoDesign — website + admin panel

A custom, animated, dark/futuristic ("Solar Flare") marketing site for BisoDesign, built with
Next.js (App Router), Tailwind CSS, Framer Motion, and React Three Fiber — plus a
password-protected admin panel for editing services, pricing, portfolio, and about/contact
content without touching code.

## What's included

- **Home** — animated 3D/particle hero, tagline, featured portfolio, pricing preview
- **Services** — full list of what you offer
- **Pricing** — 3 packages (Spark / Ignite / Nova), pulled from `data/content.json`
- **About + Contact** — bio + a working contact form (submissions land in the admin panel)
- **/admin** — password-protected dashboard to edit all of the above, plus read/delete
  contact messages

## Getting started (in VS Code)

1. Open this folder in VS Code.
2. Install dependencies:

   ```bash
   npm install
   ```

3. Create your local environment file:

   ```bash
   cp .env.example .env.local
   ```

   Then edit `.env.local`:
   - `ADMIN_PASSWORD` — the password you'll use to log into `/admin`
   - `ADMIN_SESSION_SECRET` — a long random string (generate one with
     `node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"`)

4. Run the dev server:

   ```bash
   npm run dev
   ```

5. Open http://localhost:3000 for the site, and http://localhost:3000/admin to log in and
   edit content.

## How content editing works

All editable content (services, pricing, portfolio, about text, tagline, social links) lives in
`data/content.json`. Contact form submissions are stored in `data/messages.json`.

- Editing from **`/admin`** in the browser writes straight back to these JSON files — changes
  show up on the live site immediately, no redeploy needed. This works great for local
  development and for any host where the filesystem persists between requests (a VPS, Railway,
  Render, Docker, etc.).
- You can also edit `data/content.json` **directly in VS Code** any time — it's a plain,
  readable JSON file. Useful for bulk edits or version-controlling your content.

### A note on hosting and the database

Right now content is stored as JSON files on disk — deliberately, to keep things simple for a
one-person business site with a single admin. The one thing to know: **serverless platforms
with an ephemeral filesystem (notably Vercel's default hosting) will not persist writes made
through `/admin` in production** — every deploy (and often every request) resets the
filesystem. Locally, and on any host with a persistent filesystem, this is a non-issue.

If you deploy to Vercel and want live editing to work there too, swap the four functions in
`src/lib/store.ts` (`readContent`, `writeContent`, `readMessages`, `appendMessage`,
`deleteMessage`) to talk to a hosted database instead of the filesystem — nothing else in the
app needs to change, since every page and API route only calls those functions. Good free-tier
options: **Supabase** (Postgres) or **Turso** (SQLite-compatible, edge-friendly). Happy to wire
either of these up when you're ready to pick a host.

## Deployment options

- **Vercel** — easiest for Next.js, free tier is generous. Pair with the database swap above if
  you want live admin editing in production; otherwise, edit `data/content.json` locally and
  redeploy when you want to change prices/content.
- **Railway / Render** — persistent filesystem, so the JSON-file admin panel works in
  production as-is, no database swap needed.

## Domain

You don't have a domain yet. `bisodesign.com` / `.ro` / `.design` are worth checking for
availability — `.design` in particular fits a web design studio well. Any registrar (Namecheap,
Cloudflare Registrar, etc.) works fine; if you deploy on Vercel, connecting a custom domain is a
few clicks in their dashboard once you own it.

## Project structure

```
data/content.json     — all editable site content (services, pricing, portfolio, about)
data/messages.json     — contact form submissions
src/app/               — pages (Next.js App Router) + API routes
src/components/        — UI components (nav, footer, cards, hero 3D scene, admin dashboard)
src/lib/store.ts        — reads/writes the JSON data files (swap this to change storage)
src/lib/auth.ts        — simple password + signed-cookie auth for /admin
src/types/content.ts   — TypeScript types for the content shape
```

## Still to fill in

- Real portfolio projects (currently 3 placeholders — replace from `/admin` → Portfolio)
- A fuller "About" bio
- Real contact email + social links
- A domain + hosting choice
