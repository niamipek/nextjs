import type { Metadata } from "next";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { getUserProfileById } from "@/app/_services/auth.service";
import { getSessionCookieName, verifySessionCookie } from "@/lib/auth";
import { ProfilePageClient } from "./components/ProfilePageClient";

export const metadata: Metadata = {
  title: "Profile | Sales Dashboard",
  description: "Manage personal profile details in the sales dashboard.",
};

function formatDate(value: Date | string | null) {
  if (!value) {
    return "Chua cap nhat";
  }

  const date = value instanceof Date ? value : new Date(value);

  if (Number.isNaN(date.getTime())) {
    return String(value);
  }

  return new Intl.DateTimeFormat("vi-VN", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(date);
}

function buildInitials(fullName: string) {
  const parts = fullName
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2);

  if (parts.length === 0) {
    return "U";
  }

  return parts.map((part) => part[0]?.toUpperCase() || "").join("");
}

export default async function ProfilePage() {
  const cookieStore = await cookies();
  const session = verifySessionCookie(cookieStore.get(getSessionCookieName())?.value);

  if (!session) {
    redirect("/login");
  }

  const profile = await getUserProfileById(session.userId);

  if (!profile) {
    redirect("/");
  }

  const emailValue = profile.email || session.email || "Chua cap nhat";

  return (
    <ProfilePageClient
      initials={buildInitials(profile.fullName)}
      fullName={profile.fullName}
      heroEmail={emailValue}
      avatarUrl={profile.avatarUrl}
      fields={[
        {
          key: "phoneNumber",
          label: "Phone Number",
          value: profile.phoneNumber || "",
          editable: true,
        },
        {
          key: "email",
          label: "Email",
          value: profile.email || "",
          editable: true,
        },
        {
          key: "fullName",
          label: "Full Name",
          value: profile.fullName || "Chua cap nhat",
          editable: false,
        },
        {
          key: "gender",
          label: "Gender",
          value: profile.gender || "Chua cap nhat",
          editable: false,
        },
        {
          key: "dateOfBirth",
          label: "Date of Birth",
          value: formatDate(profile.dateOfBirth),
          editable: false,
        },
        {
          key: "createdAt",
          label: "Created At",
          value: formatDate(profile.createdAt),
          editable: false,
        },
        {
          key: "roleName",
          label: "Role Name",
          value: profile.roleNames.join(", ") || "Chua duoc gan role",
          editable: false,
        },
      ]}
    />
  );
}
