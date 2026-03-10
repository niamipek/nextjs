import type { ReactNode } from "react";
import styles from "./auth.module.css";

type AuthInputProps = {
  label?: string;
  placeholder: string;
  leadingIcon: ReactNode;
  trailing?: ReactNode;
  type?: "text" | "email" | "password";
};

export function AuthInput({
  label,
  placeholder,
  leadingIcon,
  trailing,
  type = "text",
}: AuthInputProps) {
  return (
    <>
      {label ? <div className={styles.label}>{label}</div> : null}
      <label className={styles.inputWrap}>
        {leadingIcon}
        <input className={styles.input} type={type} placeholder={placeholder} />
        {trailing ? <span className={styles.trailingButton}>{trailing}</span> : null}
      </label>
    </>
  );
}

export function FieldLabel({ text }: { text: string }) {
  return <div className={styles.label}>{text}</div>;
}

export function PasswordHeader({ forgotText }: { forgotText?: string }) {
  if (!forgotText) {
    return <div className={styles.label}>Mật khẩu</div>;
  }

  return (
    <div className={styles.labelRow}>
      <div className={styles.label}>Mật khẩu</div>
      <button type="button" className={styles.link}>
        {forgotText}
      </button>
    </div>
  );
}
