"use client";

import { useActionState, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AuthInput } from "@/components/auth/AuthInput";
import { MailIcon } from "@/components/auth/AuthIcons";
import { sendResetOtpAction, type ForgotPasswordActionState } from "./actions";
import styles from "./forgot.module.css";

const initialState: ForgotPasswordActionState = {
  success: false,
  message: "",
};

export default function ForgotPasswordPage() {
  const router = useRouter();
  const [state, formAction, isPending] = useActionState(sendResetOtpAction, initialState);
  const [email, setEmail] = useState("");
  const statusClassName = state.message
    ? `${styles.status} ${state.success ? styles.statusSuccess : styles.statusError}`
    : styles.status;

  useEffect(() => {
    if (!state.success || !email) {
      return;
    }

    sessionStorage.setItem("forgot-password-email", email);
    router.push(`/forgot/verify?email=${encodeURIComponent(email)}`);
  }, [email, router, state.success]);

  return (
    <main className={styles.shell}>
      <section className={styles.card}>
        <h1 className={styles.title}>Quen mat khau</h1>
        <p className={styles.subtitle}>Nhap email cua ban de nhan lien ket khoi phuc mat khau</p>

        <form action={formAction} className={styles.form}>
          <div className={styles.fieldLabel}>Email</div>
          <AuthInput
            name="email"
            label=""
            placeholder="ten@vidu.com"
            leadingIcon={<MailIcon />}
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />

          {state.message ? <p className={statusClassName}>{state.message}</p> : null}
          <button type="submit" className={styles.button} disabled={isPending}>
            <span>{isPending ? "Dang gui..." : "Gui yeu cau"}</span>
            <span className={styles.buttonArrow} aria-hidden>
              {">"}
            </span>
          </button>
        </form>

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
