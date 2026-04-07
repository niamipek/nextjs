"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { validateManagerLogin, type LoginResult } from "@/app/_services/auth.service";
import { createSessionCookie, getSessionCookieName } from "@/lib/auth";

type LoginActionState = {
  message: string;
};

export async function loginAction(_: LoginActionState, formData: FormData): Promise<LoginActionState> {
  const email = String(formData.get("email") || "");
  const password = String(formData.get("password") || "");

  let result: LoginResult;

  try {
    result = await validateManagerLogin(email, password);
  } catch (error) {
    return {
      message: error instanceof Error ? error.message : "Dang nhap that bai.",
    };
  }

  if (!result.ok) {
    return {
      message: result.message,
    };
  }

  const cookieStore = await cookies();
  cookieStore.set(getSessionCookieName(), createSessionCookie(result.user), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 8,
  });

  redirect("/");
}

export async function logoutAction() {
  const cookieStore = await cookies();
  cookieStore.delete(getSessionCookieName());

  redirect("/login");
}
