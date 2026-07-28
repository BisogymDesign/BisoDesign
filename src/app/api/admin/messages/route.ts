import { NextRequest, NextResponse } from "next/server";
import { isAuthedFromRequestCookie } from "@/lib/auth";
import { deleteMessage, readMessages } from "@/lib/store";

function unauthorized() {
  return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
}

export async function GET(request: NextRequest) {
  if (!isAuthedFromRequestCookie(request.headers.get("cookie"))) return unauthorized();
  const messages = await readMessages();
  return NextResponse.json(messages);
}

export async function DELETE(request: NextRequest) {
  if (!isAuthedFromRequestCookie(request.headers.get("cookie"))) return unauthorized();
  const id = request.nextUrl.searchParams.get("id");
  if (!id) return NextResponse.json({ error: "Missing id." }, { status: 400 });
  await deleteMessage(id);
  return NextResponse.json({ ok: true });
}
