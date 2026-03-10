import type { ReactNode } from "react";
import styles from "./auth.module.css";

type SocialButtonProps = {
  icon: ReactNode;
  label: string;
};

export function SocialButton({ icon, label }: SocialButtonProps) {
  return (
    <button type="button" className={styles.socialButton}>
      {icon}
      <span>{label}</span>
    </button>
  );
}

export function SocialRow({ children }: { children: ReactNode }) {
  return <div className={styles.socialRow}>{children}</div>;
}
