import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { DashboardNav } from "@/components/dashboard/DashboardNav";
import { getSessionCookieName, verifySessionCookie } from "@/lib/auth";

export default async function DashboardLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const cookieStore = await cookies();
  const session = verifySessionCookie(cookieStore.get(getSessionCookieName())?.value);

  if (!session) {
    redirect("/login");
  }

  return (
    <main className="dashboard-page">
      <div className="dashboard-topbar">
        <DashboardHeader />
        <DashboardNav />
      </div>
      {children}
    </main>
  );
}
