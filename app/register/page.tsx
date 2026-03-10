import Link from "next/link";
import { AuthInput, FieldLabel } from "@/components/auth/AuthInput";
import { AuthCTA, AuthDivider, AuthFooter, AuthForm } from "@/components/auth/AuthParts";
import { EyeIcon, GithubIcon, GoogleIcon, LockIcon, MailIcon, UserIcon } from "@/components/auth/AuthIcons";
import { AuthShell } from "@/components/auth/AuthShell";
import { SocialButton, SocialRow } from "@/components/auth/SocialButton";

export default function RegisterPage() {
  return (
    <AuthShell title="Tạo tài khoản mới" subtitle="Tham gia cùng chúng tôi để trải nghiệm dịch vụ tốt nhất">
      <SocialRow>
        <SocialButton icon={<GoogleIcon />} label="Google" />
        <SocialButton icon={<GithubIcon />} label="Github" />
      </SocialRow>

      <AuthDivider />

      <AuthForm>
        <AuthInput label="Họ và tên" placeholder="Nguyễn Văn A" leadingIcon={<UserIcon />} />
        <AuthInput label="Email" placeholder="name@example.com" leadingIcon={<MailIcon />} type="email" />
        <FieldLabel text="Mật khẩu" />
        <AuthInput label="" placeholder="••••••••" leadingIcon={<LockIcon />} trailing={<EyeIcon />} type="password" />
      </AuthForm>

      <AuthCTA text="Tạo tài khoản" />
      <Link href="/login">
        <AuthFooter text="Đã có tài khoản?" action="Đăng nhập ngay" />
      </Link>
    </AuthShell>
  );
}
