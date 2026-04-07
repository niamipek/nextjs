"use server";

import { randomUUID } from "node:crypto";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import type { RowDataPacket } from "mysql2/promise";
import pool from "@/lib/db";
import { getSessionCookieName, verifySessionCookie } from "@/lib/auth";

export type UpdateProfileState = {
  success: boolean;
  message: string;
  fieldErrors?: {
    phoneNumber?: string;
    email?: string;
  };
};

type ExistingEmailRow = RowDataPacket & {
  User_ID: string;
};

export type UpdateAvatarResult = {
  success: boolean;
  message: string;
  avatarUrl?: string;
};

function validatePhoneNumber(value: string) {
  if (!value) {
    return "Phone number khong duoc de trong.";
  }

  const digitsOnly = value.replace(/\D/g, "");

  if (digitsOnly.length !== value.length) {
    return "Phone number chi duoc chua chu so.";
  }

  if (digitsOnly.length < 10 || digitsOnly.length > 11) {
    return "Phone number phai co 10 hoac 11 chu so.";
  }

  return "";
}

function validateEmail(value: string) {
  if (!value) {
    return "Email khong duoc de trong.";
  }

  if (!/^[a-zA-Z0-9._%+-]+@gmail\.com$/.test(value)) {
    return "Email phai dung dinh dang ten@gmail.com.";
  }

  return "";
}

export async function updateProfileAction(
  _: UpdateProfileState,
  formData: FormData,
): Promise<UpdateProfileState> {
  const cookieStore = await cookies();
  const session = verifySessionCookie(cookieStore.get(getSessionCookieName())?.value);

  if (!session) {
    return {
      success: false,
      message: "Phien dang nhap da het han. Vui long dang nhap lai.",
    };
  }

  const phoneNumberInput = String(formData.get("phoneNumber") || "").trim();
  const emailInput = String(formData.get("email") || "")
    .trim()
    .toLowerCase();

  const phoneNumberError = validatePhoneNumber(phoneNumberInput);
  const emailError = validateEmail(emailInput);

  if (phoneNumberError || emailError) {
    return {
      success: false,
      message: "Vui long kiem tra lai thong tin.",
      fieldErrors: {
        phoneNumber: phoneNumberError || undefined,
        email: emailError || undefined,
      },
    };
  }

  const [existingEmailRows] = await pool.query<ExistingEmailRow[]>(
    `
      SELECT User_ID
      FROM users
      WHERE LOWER(Email) = ?
        AND User_ID <> ?
      LIMIT 1
    `,
    [emailInput, session.userId],
  );

  if (existingEmailRows.length > 0) {
    return {
      success: false,
      message: "Email nay da duoc su dung boi tai khoan khac.",
      fieldErrors: {
        email: "Email nay da ton tai.",
      },
    };
  }

  await pool.query(
    `
      UPDATE users
      SET
        Phone_Number = ?,
        Email = ?
      WHERE User_ID = ?
    `,
    [phoneNumberInput || null, emailInput || null, session.userId],
  );

  revalidatePath("/profile");

  return {
    success: true,
    message: "Cap nhat thong tin thanh cong.",
    fieldErrors: {},
  };
}

export async function updateAvatarAction(formData: FormData): Promise<UpdateAvatarResult> {
  const cookieStore = await cookies();
  const session = verifySessionCookie(cookieStore.get(getSessionCookieName())?.value);

  if (!session) {
    return {
      success: false,
      message: "Your session has expired. Please sign in again.",
    };
  }

  const avatarFile = formData.get("avatar");

  if (!(avatarFile instanceof File) || avatarFile.size === 0) {
    return {
      success: false,
      message: "Please choose an image file.",
    };
  }

  const allowedMimeTypes = new Set(["image/png", "image/jpeg", "image/jpg", "image/webp"]);

  if (!allowedMimeTypes.has(avatarFile.type)) {
    return {
      success: false,
      message: "Please upload a PNG, JPG, or WEBP image.",
    };
  }

  if (avatarFile.size > 2 * 1024 * 1024) {
    return {
      success: false,
      message: "The image size must be 2MB or smaller.",
    };
  }

  const extensionMap: Record<string, string> = {
    "image/png": ".png",
    "image/jpeg": ".jpg",
    "image/jpg": ".jpg",
    "image/webp": ".webp",
  };

  const fileExtension = extensionMap[avatarFile.type] || path.extname(avatarFile.name) || ".jpg";
  const fileName = `${session.userId}-${randomUUID()}${fileExtension}`;
  const relativeFilePath = path.join("uploads", "avatars", fileName);
  const publicDirectoryPath = path.join(process.cwd(), "public", "uploads", "avatars");
  const targetFilePath = path.join(publicDirectoryPath, fileName);
  const imageBuffer = Buffer.from(await avatarFile.arrayBuffer());

  await mkdir(publicDirectoryPath, { recursive: true });
  await writeFile(targetFilePath, imageBuffer);

  const avatarUrl = `/${relativeFilePath.replace(/\\/g, "/")}`;

  await pool.query(
    `
      UPDATE users
      SET Avatar_URL = ?
      WHERE User_ID = ?
    `,
    [avatarUrl, session.userId],
  );

  revalidatePath("/profile");
  revalidatePath("/", "layout");

  return {
    success: true,
    message: "Avatar updated successfully.",
    avatarUrl,
  };
}
