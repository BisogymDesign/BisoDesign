import { isAuthedFromCookieStore } from "@/lib/auth";
import AdminLogin from "@/components/admin/AdminLogin";
import AdminDashboard from "@/components/admin/AdminDashboard";

export default function AdminPage() {
  const authed = isAuthedFromCookieStore();
  return authed ? <AdminDashboard /> : <AdminLogin />;
}
