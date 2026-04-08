"use client";

import Link from "next/link";
import { useActionState, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { AuthInput, FieldLabel } from "@/components/auth/AuthInput";
import { AuthCTA, AuthFooter, AuthForm } from "@/components/auth/AuthParts";
import { LockIcon, MailIcon } from "@/components/auth/AuthIcons";
import { AuthShell } from "@/components/auth/AuthShell";
import { changePasswordAction, type ChangePasswordActionState } from "./actions";

const initialState: ChangePasswordActionState = {
  success: false,
  message: "",
};

export default function ChangePasswordPageClient() {
  const router = useRouter();
  const [state, formAction, isPending] = useActionState(changePasswordAction, initialState);
  const [email, setEmail] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  useEffect(() => {
    if (!state.success) {
      return;
    }

    sessionStorage.setItem("change-password-email", email);

    setOldPassword("");
    setNewPassword("");
    setConfirmPassword("");
    router.push(`/change-password/verify?email=${encodeURIComponent(email)}`);
  }, [email, router, state.success]);

  return (
    <AuthShell title="Doi mat khau" subtitle="Nhap email, mat khau cu, mat khau moi va xac nhan mat khau moi">
      <AuthForm action={formAction}>
        <FieldLabel text="Email" />
        <AuthInput
          name="email"
          label=""
          placeholder="name@example.com"
          leadingIcon={<MailIcon />}
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />

        <FieldLabel text="Mat khau cu" />
        <AuthInput
          name="oldPassword"
          label=""
          placeholder="Nhap mat khau cu"
          leadingIcon={<LockIcon />}
          type="password"
          value={oldPassword}
          onChange={(event) => setOldPassword(event.target.value)}
        />

        <FieldLabel text="Mat khau moi" />
        <AuthInput
          name="newPassword"
          label=""
          placeholder="Nhap mat khau moi"
          leadingIcon={<LockIcon />}
          type="password"
          value={newPassword}
          onChange={(event) => setNewPassword(event.target.value)}
        />

        <FieldLabel text="Xac nhan mat khau moi" />
        <AuthInput
          name="confirmPassword"
          label=""
          placeholder="Nhap lai mat khau moi"
          leadingIcon={<LockIcon />}
          type="password"
          value={confirmPassword}
          onChange={(event) => setConfirmPassword(event.target.value)}
        />

        {state.message ? (
          <p style={{ margin: 0, color: state.success ? "#15803d" : "#dc2626", fontSize: 14, lineHeight: 1.5 }}>
            {state.message}
          </p>
        ) : null}

        <AuthCTA text={isPending ? "Dang cap nhat..." : "Xac nhan doi mat khau"} type="submit" disabled={isPending} />
      </AuthForm>

      <Link href="/login">
        <AuthFooter text="Quay lai dang nhap" action="Sign in" />
      </Link>
    </AuthShell>
  );
}
