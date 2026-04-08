"use client";

import { useActionState, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { AuthInput } from "@/components/auth/AuthInput";
import { LockIcon } from "@/components/auth/AuthIcons";
import { updateForgotPasswordAction, type ForgotPasswordActionState } from "../actions";
import styles from "../forgot.module.css";

const initialState: ForgotPasswordActionState = {
  success: false,
  message: "",
};

export default function ForgotPasswordResetPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const queryEmail = searchParams.get("email") || "";
  const [email, setEmail] = useState(queryEmail);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [state, formAction, isPending] = useActionState(updateForgotPasswordAction, initialState);
  const [redirectMessage, setRedirectMessage] = useState("");

  useEffect(() => {
    const storedEmail = sessionStorage.getItem("forgot-password-email") || "";
    setEmail(queryEmail || storedEmail);
  }, [queryEmail]);

  useEffect(() => {
    if (!state.success) {
      return;
    }

    sessionStorage.removeItem("forgot-password-email");
    setRedirectMessage("Doi mat khau thanh cong. Dang quay ve trang dang nhap...");

    const timer = window.setTimeout(() => {
      router.push("/login");
    }, 1600);

    return () => window.clearTimeout(timer);
  }, [router, state.success]);

  const statusClassName = state.message
    ? `${styles.status} ${state.success ? styles.statusSuccess : styles.statusError}`
    : styles.status;
  const hasEmail = useMemo(() => Boolean(email.trim()), [email]);

  return (
    <main className={styles.shell}>
      <section className={styles.card}>
        <h1 className={styles.title}>Mat khau moi</h1>
        <p className={styles.subtitle}>Dat lai mat khau moi cho tai khoan cua ban de quay lai dang nhap</p>
        {hasEmail ? <p className={styles.meta}>{email}</p> : null}

        {hasEmail ? (
          <form action={formAction} className={styles.form}>
            <input type="hidden" name="email" value={email} />
            <div className={styles.fieldLabel}>Mat khau moi</div>
            <AuthInput
              name="password"
              label=""
              placeholder="Nhap mat khau moi"
              leadingIcon={<LockIcon />}
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />

            <div className={styles.fieldLabel}>Xac nhan mat khau</div>
            <AuthInput
              name="confirmPassword"
              label=""
              placeholder="Nhap lai mat khau moi"
              leadingIcon={<LockIcon />}
              type="password"
              value={confirmPassword}
              onChange={(event) => setConfirmPassword(event.target.value)}
            />

            {redirectMessage ? (
              <p className={`${styles.status} ${styles.statusSuccess}`}>{redirectMessage}</p>
            ) : state.message ? (
              <p className={statusClassName}>{state.message}</p>
            ) : null}

            <button type="submit" className={styles.button} disabled={isPending || Boolean(redirectMessage)}>
              <span>{isPending ? "Dang cap nhat..." : "Xac nhan doi mat khau"}</span>
              <span className={styles.buttonArrow} aria-hidden>
                {">"}
              </span>
            </button>
          </form>
        ) : (
          <div className={styles.guard}>
            <p className={styles.guardText}>Khong tim thay thong tin xac minh. Vui long thuc hien lai tu buoc OTP.</p>
            <Link href="/forgot/verify" className={styles.secondaryLink}>
              Quay lai buoc OTP
            </Link>
          </div>
        )}

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
