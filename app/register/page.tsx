"use client";

import type { FormEvent } from "react";
import { useState } from "react";
import Link from "next/link";
import { AuthInput, FieldLabel } from "@/components/auth/AuthInput";
import { AuthCTA, AuthDivider, AuthFooter, AuthForm } from "@/components/auth/AuthParts";
import { EyeIcon, GithubIcon, GoogleIcon, LockIcon, MailIcon, UserIcon } from "@/components/auth/AuthIcons";
import { AuthShell } from "@/components/auth/AuthShell";
import { SocialButton, SocialRow } from "@/components/auth/SocialButton";

export default function RegisterPage() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log("Register form values", { fullName, email, password });//kết quả của form đăng ký 
  };

  return (
    <AuthShell title="Tạo tài khoản mới" subtitle="Tham gia cùng chúng tôi để trải nghiệm dịch vụ tốt nhất">
      <SocialRow>
        <SocialButton icon={<GoogleIcon />} label="Google" />
        <SocialButton icon={<GithubIcon />} label="Github" />
      </SocialRow>

      <AuthDivider />

      <AuthForm onSubmit={handleSubmit}>
        <AuthInput
          name="fullName"
          label="Họ và tên"
          placeholder="Nguyễn Văn A"
          leadingIcon={<UserIcon />}
          value={fullName}
          onChange={(event) => setFullName(event.target.value)}
        />
        <AuthInput
          name="email"
          label="Email"
          placeholder="name@example.com"
          leadingIcon={<MailIcon />}
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
        <FieldLabel text="Mật khẩu" />
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
        <AuthCTA text="Tạo tài khoản" type="submit" />
      </AuthForm>

      <Link href="/login">
        <AuthFooter text="Đã có tài khoản?" action="Đăng nhập ngay" />
      </Link>
    </AuthShell>
  );
}
