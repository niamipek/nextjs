import type { ReactNode } from "react";
import styles from "./auth.module.css";

type AuthShellProps = {
  title: string;
  subtitle: string;
  children: ReactNode;
};

export function AuthShell({ title, subtitle, children }: AuthShellProps) {
  return (
    <main className={styles.authViewport}>
      <section className={styles.authCard}>
        <h1 className={styles.authTitle}>{title}</h1>
        <p className={styles.authSubtitle}>{subtitle}</p>
        {children}
      </section>
    </main>
  );
}
