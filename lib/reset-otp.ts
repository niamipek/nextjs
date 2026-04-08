import "server-only";

import { Resend } from "resend";

type SendResetOtpEmailParams = {
  code: string;
  email: string;
  fullName: string;
  purpose: "forgot_password" | "change_password";
};

function getDeliveryMode() {
  return process.env.RESET_OTP_DELIVERY || "console";
}

function getResendClient() {
  const apiKey = process.env.RESEND_API_KEY;

  if (!apiKey) {
    return null;
  }

  return new Resend(apiKey);
}

function getMailFrom() {
  return process.env.MAIL_FROM || "";
}

export function getEmailContent(purpose: SendResetOtpEmailParams["purpose"]) {
  if (purpose === "change_password") {
    return {
      badge: "Xac nhan doi mat khau",
      heading: "Ma OTP xac nhan doi mat khau",
      lead: "Ban vua gui yeu cau doi mat khau cho tai khoan cua minh.",
      subject: "Ma OTP xac nhan doi mat khau",
    };
  }

  return {
    badge: "Khoi phuc mat khau",
    heading: "Ma OTP khoi phuc mat khau",
    lead: "Ban vua gui yeu cau dat lai mat khau cho tai khoan cua minh.",
    subject: "Ma OTP khoi phuc mat khau",
  };
}

export function buildEmailHtml(fullName: string, code: string, purpose: SendResetOtpEmailParams["purpose"]) {
  const displayName = fullName.trim() || "ban";
  const content = getEmailContent(purpose);

  return `
    <div style="margin:0;padding:32px 16px;background:#f5f7ff;font-family:Arial,sans-serif;color:#1f2937;">
      <div style="max-width:560px;margin:0 auto;background:#ffffff;border:1px solid #e5ebf5;border-radius:24px;padding:32px 28px;">
        <p style="margin:0 0 12px;font-size:14px;line-height:1.6;color:#6b7280;">${content.badge}</p>
        <h1 style="margin:0 0 16px;font-size:28px;line-height:1.2;color:#4560f3;">${content.heading}</h1>
        <p style="margin:0 0 16px;font-size:16px;line-height:1.7;color:#475569;">Xin chao ${displayName}, ${content.lead}</p>
        <p style="margin:0 0 14px;font-size:16px;line-height:1.7;color:#475569;">Vui long su dung ma OTP duoi day de tiep tuc:</p>
        <div style="margin:0 0 18px;padding:18px 20px;border-radius:18px;background:linear-gradient(90deg,#4384ee 0%,#5d5be9 100%);text-align:center;">
          <span style="display:inline-block;font-size:34px;line-height:1;font-weight:700;letter-spacing:8px;color:#ffffff;">${code}</span>
        </div>
        <p style="margin:0 0 10px;font-size:14px;line-height:1.7;color:#64748b;">Ma nay co hieu luc trong 5 phut.</p>
        <p style="margin:0;font-size:14px;line-height:1.7;color:#64748b;">Neu ban khong yeu cau dat lai mat khau, vui long bo qua email nay.</p>
      </div>
    </div>
  `;
}

async function sendViaConsole({ code, email, fullName }: SendResetOtpEmailParams) {
  console.info(`[forgot-password] OTP for ${email} (${fullName}): ${code}`);
}

async function sendViaResend({ code, email, fullName, purpose }: SendResetOtpEmailParams) {
  const resend = getResendClient();
  const mailFrom = getMailFrom();
  const content = getEmailContent(purpose);

  if (!resend || !mailFrom) {
    await sendViaConsole({ code, email, fullName, purpose });
    return;
  }

  await resend.emails.send({
    from: mailFrom,
    to: email,
    subject: content.subject,
    html: buildEmailHtml(fullName, code, purpose),
  });
}

export async function sendResetOtpEmail(params: SendResetOtpEmailParams) {
  const deliveryMode = getDeliveryMode();

  if (deliveryMode === "resend") {
    await sendViaResend(params);
    return;
  }

  await sendViaConsole(params);
}
