import Image from "next/image";
import Link from "next/link";
import { cookies } from "next/headers";
import logo from "public/logo.png";
import { getUserProfileById } from "@/app/_services/auth.service";
import { logoutAction } from "@/app/login/actions";
import { getSessionCookieName, verifySessionCookie } from "@/lib/auth";

export async function DashboardHeader() {
  const cookieStore = await cookies();
  const session = verifySessionCookie(cookieStore.get(getSessionCookieName())?.value);
  const profile = session ? await getUserProfileById(session.userId) : null;

  return (
    <header className="top-header">
      <div className="brand">
        <Image src={logo} alt="Logo" width="85" height="60" />
      </div>
      <div className="header-actions">
        <span className="icon-dot">i</span>
        <span className="icon-dot">?</span>
        <span className="icon-dot">o</span>
        <Link href="/profile" className="avatar" aria-label="Open profile">
          {profile?.avatarUrl ? (
            <Image
              src={profile.avatarUrl}
              alt={`${profile.fullName} avatar`}
              fill
              sizes="24px"
              className="avatar-image"
            />
          ) : (
            <span className="avatar-fallback" />
          )}
        </Link>
        <form action={logoutAction}>
          <button type="submit" className="header-logout-button">
            Sign out
          </button>
        </form>
      </div>
    </header>
  );
}
