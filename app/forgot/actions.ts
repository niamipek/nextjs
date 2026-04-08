"use server";

import {
  sendForgotPasswordOtp,
  updateForgotPassword,
  verifyForgotPasswordOtp,
} from "@/app/_services/forgot-password.service";

export type ForgotPasswordActionState = {
  success: boolean;
  message: string;
  debugCode?: string;
};

export async function sendResetOtpAction(
  _: ForgotPasswordActionState,
  formData: FormData,
): Promise<ForgotPasswordActionState> {
  const email = String(formData.get("email") || "")
    .trim();

  return sendForgotPasswordOtp(email);
}

export async function verifyResetOtpAction(
  _: ForgotPasswordActionState,
  formData: FormData,
): Promise<ForgotPasswordActionState> {
  const email = String(formData.get("email") || "").trim();
  const code = String(formData.get("code") || "").trim();

  return verifyForgotPasswordOtp(email, code);
}

export async function updateForgotPasswordAction(
  _: ForgotPasswordActionState,
  formData: FormData,
): Promise<ForgotPasswordActionState> {
  const email = String(formData.get("email") || "").trim();
  const password = String(formData.get("password") || "");
  const confirmPassword = String(formData.get("confirmPassword") || "");

  return updateForgotPassword(email, password, confirmPassword);
}
