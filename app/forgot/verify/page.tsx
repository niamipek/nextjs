"use client";

import { useActionState, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { AuthInput } from "@/components/auth/AuthInput";
import { LockIcon } from "@/components/auth/AuthIcons";
import { sendResetOtpAction, verifyResetOtpAction, type ForgotPasswordActionState } from "../actions";
import styles from "../forgot.module.css";

const initialState: ForgotPasswordActionState = {
  success: false,
  message: "",
};

export default function ForgotPasswordVerifyPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const queryEmail = searchParams.get("email") || "";
  const [email, setEmail] = useState(queryEmail);
  const [code, setCode] = useState("");
  const [state, formAction, isPending] = useActionState(verifyResetOtpAction, initialState);
  const [resendState, resendAction, isResending] = useActionState(sendResetOtpAction, initialState);

  useEffect(() => {
    const storedEmail = sessionStorage.getItem("forgot-password-email") || "";
    const resolvedEmail = queryEmail || storedEmail;

    setEmail(resolvedEmail);
  }, [queryEmail]);

  useEffect(() => {
    if (!state.success || !email) {
      return;
    }

    sessionStorage.setItem("forgot-password-email", email);
    router.push(`/forgot/reset?email=${encodeURIComponent(email)}`);
  }, [email, router, state.success]);

  const statusClassName = state.message
    ? `${styles.status} ${state.success ? styles.statusSuccess : styles.statusError}`
    : styles.status;
  const hasEmail = useMemo(() => Boolean(email.trim()), [email]);

  return (
    <main className={styles.shell}>
      <section className={styles.card}>
        <h1 className={styles.title}>Nhap ma OTP</h1>
        <p className={styles.subtitle}>Nhap ma xac minh da duoc gui den email cua ban de tiep tuc doi mat khau</p>
        {hasEmail ? <p className={styles.meta}>{email}</p> : null}

        {hasEmail ? (
          <form action={formAction} className={styles.form}>
            <input type="hidden" name="email" value={email} />
            <div className={styles.fieldLabel}>Ma OTP</div>
            <AuthInput
              name="code"
              label=""
              placeholder="Nhap 6 chu so"
              leadingIcon={<LockIcon />}
              type="text"
              value={code}
              onChange={(event) => setCode(event.target.value.replace(/\D/g, "").slice(0, 6))}
            />

            {state.message ? <p className={statusClassName}>{state.message}</p> : null}

            <button type="submit" className={styles.button} disabled={isPending}>
              <span>{isPending ? "Dang xac minh..." : "Xac minh OTP"}</span>
              <span className={styles.buttonArrow} aria-hidden>
                {">"}
              </span>
            </button>
          </form>
        ) : (
          <div className={styles.guard}>
            <p className={styles.guardText}>Khong tim thay email can xac minh. Vui long quay lai buoc dau tien.</p>
            <Link href="/forgot" className={styles.secondaryLink}>
              Quay lai buoc nhap email
            </Link>
          </div>
        )}

        <div className={styles.inlineActions}>
          <form action={resendAction}>
            <input type="hidden" name="email" value={email} />
            <button type="submit" className={styles.inlineButton} disabled={!hasEmail || isResending}>
              {isResending ? "Dang gui lai..." : "Gui lai ma OTP"}
            </button>
          </form>
        </div>
        {resendState.message ? (
          <p className={`${styles.status} ${resendState.success ? styles.statusSuccess : styles.statusError}`}>
            {resendState.message}
          </p>
        ) : null}

        <Link href="/login" className={styles.backLink}>
          <span className={styles.backArrow} aria-hidden>
            {"<"}
          </span>
          <span>Quay lai dang nhap</span>
        </Link>
      </section>
    </main>
  );
}
