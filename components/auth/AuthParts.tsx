import type { ComponentProps, FormEvent, ReactNode } from "react";
import styles from "./auth.module.css";

export function AuthDivider() {
  return <div className={styles.divider}>OR</div>;
}

type AuthFormProps = {
  children: ReactNode;
  onSubmit?: (event: FormEvent<HTMLFormElement>) => void;
} & Omit<ComponentProps<"form">, "children" | "className" | "onSubmit">;

export function AuthForm({ children, onSubmit, ...props }: AuthFormProps) {
  return (
    <form className={styles.form} onSubmit={onSubmit} {...props}>
      {children}
    </form>
  );
}

type AuthCTAProps = {
  text: string;
  type?: "button" | "submit";
  disabled?: boolean;
};

export function AuthCTA({ text, type = "button", disabled = false }: AuthCTAProps) {
  return (
    <button type={type} className={styles.cta} disabled={disabled}>
      <span>{text}</span>
      <span>{">"}</span>
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
