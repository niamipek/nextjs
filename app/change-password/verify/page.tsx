"use client";

import Link from "next/link";
import { useActionState, useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { AuthInput } from "@/components/auth/AuthInput";
import { AuthCTA, AuthFooter, AuthForm } from "@/components/auth/AuthParts";
import { LockIcon } from "@/components/auth/AuthIcons";
import { AuthShell } from "@/components/auth/AuthShell";
import {
  resendChangePasswordOtpAction,
  verifyChangePasswordOtpAction,
  type ChangePasswordActionState,
} from "../actions";

const initialState: ChangePasswordActionState = {
  success: false,
  message: "",
};

export default function ChangePasswordVerifyPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const queryEmail = searchParams.get("email") || "";
  const [email, setEmail] = useState(queryEmail);
  const [code, setCode] = useState("");
  const [state, formAction, isPending] = useActionState(verifyChangePasswordOtpAction, initialState);
  const [resendState, resendAction, isResending] = useActionState(resendChangePasswordOtpAction, initialState);
  const [redirectMessage, setRedirectMessage] = useState("");

  useEffect(() => {
    const storedEmail = sessionStorage.getItem("change-password-email") || "";

    setEmail(queryEmail || storedEmail);
  }, [queryEmail]);

  useEffect(() => {
    if (!state.success) {
      return;
    }

    sessionStorage.removeItem("change-password-email");
    setRedirectMessage("Doi mat khau thanh cong. Dang quay ve trang dang nhap...");

    const timer = window.setTimeout(() => {
      router.push("/login");
    }, 1600);

    return () => window.clearTimeout(timer);
  }, [router, state.success]);

  const hasEmail = useMemo(() => Boolean(email.trim()), [email]);

  return (
    <AuthShell title="Xac minh OTP" subtitle="Nhap ma OTP da duoc gui toi email cua ban de hoan tat doi mat khau">
      {hasEmail ? (
        <AuthForm action={formAction}>
          <input type="hidden" name="email" value={email} />
          <AuthInput
            name="code"
            label="Ma OTP"
            placeholder="Nhap 6 chu so"
            leadingIcon={<LockIcon />}
            type="text"
            value={code}
            onChange={(event) => setCode(event.target.value.replace(/\D/g, "").slice(0, 6))}
          />

          {state.message ? (
            <p style={{ margin: 0, color: state.success ? "#15803d" : "#dc2626", fontSize: 14, lineHeight: 1.5 }}>
              {redirectMessage || state.message}
            </p>
          ) : null}
          <AuthCTA
            text={isPending ? "Dang xac minh..." : "Xac minh OTP"}
            type="submit"
            disabled={isPending || Boolean(redirectMessage)}
          />
        </AuthForm>
      ) : (
        <div style={{ marginTop: 24, textAlign: "center", color: "#64748b", fontSize: 15, lineHeight: 1.6 }}>
          Khong tim thay email can xac minh. Vui long quay lai buoc dau tien.
        </div>
      )}

      <form action={resendAction} style={{ marginTop: 16, textAlign: "center" }}>
        <button
          type="submit"
          style={{ border: 0, background: "transparent", color: "#4560f3", fontSize: 15, fontWeight: 600, cursor: "pointer" }}
          disabled={!hasEmail || isResending}
        >
          {isResending ? "Dang gui lai..." : "Gui lai ma OTP"}
        </button>
      </form>
      {resendState.message ? (
        <p style={{ margin: "12px 0 0", color: resendState.success ? "#15803d" : "#dc2626", fontSize: 14, lineHeight: 1.5, textAlign: "center" }}>
          {resendState.message}
        </p>
      ) : null}

      <Link href="/change-password">
        <AuthFooter text="Quay lai doi mat khau" action="Nhap lai thong tin" />
      </Link>
    </AuthShell>
  );
}
