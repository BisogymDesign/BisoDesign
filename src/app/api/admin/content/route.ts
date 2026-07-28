import { NextRequest, NextResponse } from "next/server";
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
  return NextResponse.json({ ok: true });
}
