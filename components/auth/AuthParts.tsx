import type { FormEvent, ReactNode } from "react";
import styles from "./auth.module.css";

export function AuthDivider() {
  return <div className={styles.divider}>HOẶC TIẾP TỤC VỚI</div>;
}

type AuthFormProps = {
  children: ReactNode;
  onSubmit?: (event: FormEvent<HTMLFormElement>) => void;
};

export function AuthForm({ children, onSubmit }: AuthFormProps) {
  return (
    <form className={styles.form} onSubmit={onSubmit}>
      {children}
    </form>
  );
}

type AuthCTAProps = {
  text: string;
  type?: "button" | "submit";
};

export function AuthCTA({ text, type = "button" }: AuthCTAProps) {
  return (
    <button type={type} className={styles.cta}>
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
