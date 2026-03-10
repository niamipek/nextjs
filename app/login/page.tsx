import Link from "next/link";
import { AuthInput, PasswordHeader } from "@/components/auth/AuthInput";
import { AuthCTA, AuthDivider, AuthFooter, AuthForm } from "@/components/auth/AuthParts";
import { EyeIcon, GithubIcon, GoogleIcon, LockIcon, MailIcon } from "@/components/auth/AuthIcons";
import { AuthShell } from "@/components/auth/AuthShell";
import { SocialButton, SocialRow } from "@/components/auth/SocialButton";

export default function LoginPage() {
  return (
    <AuthShell title="Chào mừng trở lại" subtitle="Vui lòng nhập thông tin để truy cập hệ thống">
      <SocialRow>
        <SocialButton icon={<GoogleIcon />} label="Google" />
        <SocialButton icon={<GithubIcon />} label="Github" />
      </SocialRow>

      <AuthDivider />

      <AuthForm>
        <AuthInput label="Email" placeholder="name@example.com" leadingIcon={<MailIcon />} type="email" />
        <PasswordHeader forgotText="Quên mật khẩu?" />
        <AuthInput label="" placeholder="••••••••" leadingIcon={<LockIcon />} trailing={<EyeIcon />} type="password" />
      </AuthForm>

      <AuthCTA text="Đăng nhập" />
      <Link href="/register">
        <AuthFooter text="Chưa có tài khoản?" action="Đăng ký ngay" />
      </Link>
    </AuthShell>
  );
}
