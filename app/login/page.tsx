"use client";

import type { FormEvent } from "react";
import { useState } from "react";
import Link from "next/link";
import { AuthInput, PasswordHeader } from "@/components/auth/AuthInput";
import { AuthCTA, AuthDivider, AuthFooter, AuthForm } from "@/components/auth/AuthParts";
import { EyeIcon, GithubIcon, GoogleIcon, LockIcon, MailIcon } from "@/components/auth/AuthIcons";
import { AuthShell } from "@/components/auth/AuthShell";
import { SocialButton, SocialRow } from "@/components/auth/SocialButton";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log("Login form values", { email, password });//kết quả của form đăng nhập
  };

  return (
    <AuthShell title="Chào mừng trở lại" subtitle="Vui lòng nhập thông tin để truy cập hệ thống">
      <SocialRow>
        <SocialButton icon={<GoogleIcon />} label="Google" />
        <SocialButton icon={<GithubIcon />} label="Github" />
      </SocialRow>

      <AuthDivider />

      <AuthForm onSubmit={handleSubmit}>
        <AuthInput
          name="email"
          label="Email"
          placeholder="name@example.com"
          leadingIcon={<MailIcon />}
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
        <PasswordHeader forgotText="Quên mật khẩu?" />
        <AuthInput
          name="password"
          label=""
          placeholder="••••••••"
          leadingIcon={<LockIcon />}
          trailing={<EyeIcon />}
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
        <AuthCTA text="Đăng nhập" type="submit" />
      </AuthForm>

      <Link href="/register">
        <AuthFooter text="Chưa có tài khoản?" action="Đăng ký ngay" />
      </Link>
    </AuthShell>
  );
}
