import type { ReactNode } from "react";
import styles from "./auth.module.css";

export function AuthDivider() {
  return <div className={styles.divider}>HOẶC TIẾP TỤC VỚI</div>;
}

export function AuthForm({ children }: { children: ReactNode }) {
  return <div className={styles.form}>{children}</div>;
}

export function AuthCTA({ text }: { text: string }) {
  return (
    <button type="button" className={styles.cta}>
      <span>{text}</span>
      <span>→</span>
    </button>
  );
}

export function AuthFooter({ text, action }: { text: string; action: string }) {
  return (
    <p className={styles.footer}>
      {text} <strong>{action}</strong>
    </p>
  );
}
