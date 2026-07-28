import crypto from "crypto";
import { cookies } from "next/headers";

const COOKIE_NAME = "bisodesign_admin";
const SESSION_VALUE = "authenticated";

function getSecret(): string {
  const secret = process.env.ADMIN_SESSION_SECRET;
  if (!secret) {
    throw new Error(
      "ADMIN_SESSION_SECRET is not set. Copy .env.example to .env.local and fill it in."
    );
  }
  return secret;
}

function sign(value: string): string {
  const hmac = crypto.createHmac("sha256", getSecret());
  hmac.update(value);
  return `${value}.${hmac.digest("hex")}`;
}

function verify(token: string | undefined): boolean {
  if (!token) return false;
  const separatorIndex = token.lastIndexOf(".");
  if (separatorIndex === -1) return false;
  const value = token.slice(0, separatorIndex);
  if (value !== SESSION_VALUE) return false;
  const expected = sign(SESSION_VALUE);
  return crypto.timingSafeEqual(Buffer.from(token), Buffer.from(expected));
}

export function checkPassword(password: string): boolean {
  const expected = process.env.ADMIN_PASSWORD;
  if (!expected) return false;
  const a = Buffer.from(password);
  const b = Buffer.from(expected);
  if (a.length !== b.length) return false;
  return crypto.timingSafeEqual(a, b);
}

export function createSessionToken(): string {
  return sign(SESSION_VALUE);
}

export function isAuthedFromCookieStore(): boolean {
  const token = cookies().get(COOKIE_NAME)?.value;
  return verify(token);
}

export function isAuthedFromRequestCookie(cookieHeader: string | null): boolean {
  if (!cookieHeader) return false;
  const match = cookieHeader
    .split(";")
    .map((c) => c.trim())
    .find((c) => c.startsWith(`${COOKIE_NAME}=`));
  if (!match) return false;
  const token = decodeURIComponent(match.slice(COOKIE_NAME.length + 1));
  return verify(token);
}

export const ADMIN_COOKIE_NAME = COOKIE_NAME;
