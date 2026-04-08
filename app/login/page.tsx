"use client";

import { useActionState, useState } from "react";
import Link from "next/link";
import { AuthInput, PasswordHeader } from "@/components/auth/AuthInput";
import { AuthCTA, AuthDivider, AuthFooter, AuthForm } from "@/components/auth/AuthParts";
import { EyeIcon, GithubIcon, GoogleIcon, LockIcon, MailIcon } from "@/components/auth/AuthIcons";
import { AuthShell } from "@/components/auth/AuthShell";
import { SocialButton, SocialRow } from "@/components/auth/SocialButton";
import { loginAction } from "./actions";

const initialState = {
  message: "",
};

export default function LoginPage() {
  const [state, formAction, isPending] = useActionState(loginAction, initialState);
  const [email, setEmail] = useState(""); //manager@example.com
  const [password, setPassword] = useState("");//123456

  return (
    <AuthShell title="Welcome back" subtitle="Please enter your information to access the system">
      <SocialRow>
        <SocialButton icon={<GoogleIcon />} label="Google" />
        <SocialButton icon={<GithubIcon />} label="Github" />
      </SocialRow>

      <AuthDivider />

      <AuthForm action={formAction}>
        <AuthInput
          name="email"
          label="Email"
          placeholder="name@example.com"
          leadingIcon={<MailIcon />}
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
        <PasswordHeader forgotText="Forgot password?" forgotHref="/forgot" />
        <AuthInput
          name="password"
          label=""
          placeholder="********"
          leadingIcon={<LockIcon />}
          trailing={<EyeIcon />}
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
        {state.message ? (
          <p style={{ margin: 0, color: "#dc2626", fontSize: 14, lineHeight: 1.5 }}>
            {state.message}
          </p>
        ) : null}
        <AuthCTA text={isPending ? "Signing in..." : "Sign in"} type="submit" disabled={isPending} />
      </AuthForm>

      <Link href="/change-password">
        <AuthFooter text="Đổi mật khẩu" action="Ngay bây giờ" />
      </Link>
    </AuthShell>
  );
}
