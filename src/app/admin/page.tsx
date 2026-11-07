import { isAuthedFromCookieStore } from "@/lib/auth";
import AdminLogin from "@/components/admin/AdminLogin";
import AdminDashboard from "@/components/admin/AdminDashboard";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin",
  robots: { index: false, follow: false },
};

export default function AdminPage() {
  const authed = isAuthedFromCookieStore();
  return authed ? <AdminDashboard /> : <AdminLogin />;
}
