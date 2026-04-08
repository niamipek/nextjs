"use server";

import { cookies } from "next/headers";
import { changePasswordForUser, resendChangePasswordOtp } from "@/app/_services/change-password.service";
import { createChangePasswordFlowCookie, getChangePasswordFlowCookieName, verifyChangePasswordFlowCookie } from "@/lib/change-password-flow";
import { verifyChangePasswordOtp } from "@/app/_services/change-password.service";

export type ChangePasswordActionState = {
  success: boolean;
  message: string;
  debugCode?: string;
};

export async function changePasswordAction(
  _: ChangePasswordActionState,
  formData: FormData,
): Promise<ChangePasswordActionState> {
  const email = String(formData.get("email") || "").trim();
  const oldPassword = String(formData.get("oldPassword") || "");
  const newPassword = String(formData.get("newPassword") || "");
  const confirmPassword = String(formData.get("confirmPassword") || "");
  const result = await changePasswordForUser(email, oldPassword, newPassword, confirmPassword);

  if (!result.success || !result.flowPayload) {
    return result;
  }

  const cookieStore = await cookies();
  cookieStore.set(getChangePasswordFlowCookieName(), createChangePasswordFlowCookie(result.flowPayload), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 10,
  });

  return {
    success: true,
    message: result.message,
    debugCode: result.debugCode,
  };
}

export async function verifyChangePasswordOtpAction(
  _: ChangePasswordActionState,
  formData: FormData,
): Promise<ChangePasswordActionState> {
  const cookieStore = await cookies();
  const flowPayload = verifyChangePasswordFlowCookie(cookieStore.get(getChangePasswordFlowCookieName())?.value);
  const email = String(formData.get("email") || "").trim();
  const code = String(formData.get("code") || "").trim();
  const result = await verifyChangePasswordOtp(email, code, flowPayload);

  if (result.success) {
    cookieStore.delete(getChangePasswordFlowCookieName());
  }

  return result;
}

export async function resendChangePasswordOtpAction(
  _: ChangePasswordActionState,
  _formData?: FormData,
): Promise<ChangePasswordActionState> {
  const cookieStore = await cookies();
  const flowPayload = verifyChangePasswordFlowCookie(cookieStore.get(getChangePasswordFlowCookieName())?.value);

  return resendChangePasswordOtp(flowPayload);
}
