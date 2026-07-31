import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { isAuthedFromRequestCookie } from "@/lib/auth";
import { readContent, writeContent } from "@/lib/store";
import type { SiteContent } from "@/types/content";

function unauthorized() {
  return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
}

export async function GET(request: NextRequest) {
  if (!isAuthedFromRequestCookie(request.headers.get("cookie"))) return unauthorized();
  const content = await readContent();
  return NextResponse.json(content);
}

export async function PUT(request: NextRequest) {
  if (!isAuthedFromRequestCookie(request.headers.get("cookie"))) return unauthorized();

  let body: SiteContent;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  if (
    !body ||
    typeof body.brand !== "string" ||
    !Array.isArray(body.services) ||
    !Array.isArray(body.pricing) ||
    !Array.isArray(body.portfolio)
  ) {
    return NextResponse.json({ error: "Malformed content payload." }, { status: 400 });
  }

  await writeContent(body);
  // The public pages are statically generated for speed and don't re-read
  // the database on every visit — this tells Next.js to regenerate them
  // right away so the saved changes show up immediately, not just after
  // the next deploy.
  revalidatePath("/", "layout");
  return NextResponse.json({ ok: true });
}
