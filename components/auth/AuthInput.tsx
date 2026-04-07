import Link from "next/link";
import type { ChangeEvent, ReactNode } from "react";
import styles from "./auth.module.css";

type AuthInputProps = {
  name?: string;
  label?: string;
  placeholder: string;
  leadingIcon: ReactNode;
  trailing?: ReactNode;
  type?: "text" | "email" | "password";
  value?: string;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
};

export function AuthInput({
  name,
  label,
  placeholder,
  leadingIcon,
  trailing,
  type = "text",
  value,
  onChange,
}: AuthInputProps) {
  return (
    <>
      {label ? <div className={styles.label}>{label}</div> : null}
      <label className={styles.inputWrap}>
        {leadingIcon}
        <input
          className={styles.input}
          name={name}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
        />
        {trailing ? <span className={styles.trailingButton}>{trailing}</span> : null}
      </label>
    </>
  );
}

export function FieldLabel({ text }: { text: string }) {
  return <div className={styles.label}>{text}</div>;
}

export function PasswordHeader({ forgotText, forgotHref }: { forgotText?: string; forgotHref?: string }) {
  if (!forgotText) {
    return <div className={styles.label}>Password</div>;
  }

  return (
    <div className={styles.labelRow}>
      <div className={styles.label}>Password</div>
      {forgotHref ? (
        <Link href={forgotHref} className={styles.link}>
          {forgotText}
        </Link>
      ) : (
        <button type="button" className={styles.link}>
          {forgotText}
        </button>
      )}
    </div>
  );
}
