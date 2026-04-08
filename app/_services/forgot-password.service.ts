import "server-only";

import { randomBytes } from "node:crypto";
import type { RowDataPacket } from "mysql2/promise";
import pool from "@/lib/db";
import { hashOtp, hashPassword, verifyOtpHash } from "@/lib/credentials";
import { sendResetOtpEmail } from "@/lib/reset-otp";

const OTP_EXPIRY_MINUTES = 5;
const OTP_LENGTH = 6;
const OTP_PURPOSE = "forgot_password";

type ForgotPasswordServiceResult = {
  success: boolean;
  message: string;
  debugCode?: string;
};

type UserRow = RowDataPacket & {
  User_ID: string;
  Email: string | null;
  Full_Name: string;
};

type PasswordResetOtpRow = RowDataPacket & {
  Reset_ID: string;
  User_ID: string;
  Email: string;
  Code_Hash: string;
  Attempt_Count: number;
  Max_Attempts: number;
  Expires_At: Date | string;
  Verified_At: Date | string | null;
  Used_At: Date | string | null;
  Created_At: Date | string;
};

function validateEmail(email: string) {
  if (!email) {
    return "Vui long nhap email.";
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return "Email khong hop le.";
  }

  return "";
}

function validateOtp(code: string) {
  if (!/^\d{6}$/.test(code)) {
    return "Ma OTP phai gom 6 chu so.";
  }

  return "";
}

function validatePassword(password: string, confirmPassword: string) {
  if (!password) {
    return "Vui long nhap mat khau moi.";
  }

  if (password.length < 8) {
    return "Mat khau moi phai co it nhat 8 ky tu.";
  }

  if (password !== confirmPassword) {
    return "Xac nhan mat khau khong khop.";
  }

  return "";
}

function createOtpCode() {
  const min = 10 ** (OTP_LENGTH - 1);
  const max = 10 ** OTP_LENGTH;
  return String(Math.floor(Math.random() * (max - min)) + min);
}

function createResetId() {
  return randomBytes(10).toString("hex").slice(0, 20);
}

function getDebugCode(code: string) {
  return process.env.NODE_ENV === "production" ? undefined : code;
}

function isExpired(value: Date | string) {
  return new Date(value).getTime() <= Date.now();
}

async function getUserByEmail(email: string) {
  const [rows] = await pool.query<UserRow[]>(
    `
      SELECT User_ID, Email, Full_Name
      FROM users
      WHERE LOWER(Email) = ?
      LIMIT 1
    `,
    [email],
  );

  return rows[0] || null;
}

async function getLatestActiveOtp(email: string) {
  const [rows] = await pool.query<PasswordResetOtpRow[]>(
    `
      SELECT Reset_ID, User_ID, Email, Code_Hash, Attempt_Count, Max_Attempts, Expires_At, Verified_At, Used_At, Created_At
      FROM password_reset_otps
      WHERE LOWER(Email) = ?
        AND Purpose = ?
        AND Used_At IS NULL
      ORDER BY Created_At DESC
      LIMIT 1
    `,
    [email, OTP_PURPOSE],
  );

  return rows[0] || null;
}

export async function sendForgotPasswordOtp(emailInput: string): Promise<ForgotPasswordServiceResult> {
  const email = emailInput.trim().toLowerCase();
  const emailError = validateEmail(email);

  if (emailError) {
    return {
      success: false,
      message: emailError,
    };
  }

  const user = await getUserByEmail(email);
  const genericSuccessMessage = "Neu email ton tai, ma OTP da duoc gui.";

  if (!user?.Email) {
    return {
      success: true,
      message: genericSuccessMessage,
    };
  }

  const code = createOtpCode();
  const codeHash = hashOtp(code);
  const resetId = createResetId();

  await pool.query(
    `
      UPDATE password_reset_otps
      SET Used_At = NOW()
      WHERE User_ID = ?
        AND Purpose = ?
        AND Used_At IS NULL
    `,
    [user.User_ID, OTP_PURPOSE],
  );

  await pool.query(
    `
      INSERT INTO password_reset_otps (
        Reset_ID,
        User_ID,
        Email,
        Code_Hash,
        Purpose,
        Attempt_Count,
        Max_Attempts,
        Expires_At,
        Last_Sent_At,
        Created_At
      )
      VALUES (?, ?, ?, ?, ?, 0, 5, DATE_ADD(NOW(), INTERVAL ? MINUTE), NOW(), NOW())
    `,
    [resetId, user.User_ID, email, codeHash, OTP_PURPOSE, OTP_EXPIRY_MINUTES],
  );

  await sendResetOtpEmail({
    code,
    email,
    fullName: user.Full_Name,
    purpose: "forgot_password",
  });

  return {
    success: true,
    message: genericSuccessMessage,
    debugCode: getDebugCode(code),
  };
}

export async function verifyForgotPasswordOtp(
  emailInput: string,
  codeInput: string,
): Promise<ForgotPasswordServiceResult> {
  const email = emailInput.trim().toLowerCase();
  const code = codeInput.trim();
  const emailError = validateEmail(email);
  const otpError = validateOtp(code);

  if (emailError || otpError) {
    return {
      success: false,
      message: emailError || otpError,
    };
  }

  const otpRecord = await getLatestActiveOtp(email);

  if (!otpRecord) {
    return {
      success: false,
      message: "Khong tim thay ma OTP hop le. Vui long yeu cau gui lai ma.",
    };
  }

  if (isExpired(otpRecord.Expires_At)) {
    await pool.query(
      `
        UPDATE password_reset_otps
        SET Used_At = NOW()
        WHERE Reset_ID = ?
      `,
      [otpRecord.Reset_ID],
    );

    return {
      success: false,
      message: "Ma OTP da het han. Vui long yeu cau gui lai ma.",
    };
  }

  if (otpRecord.Attempt_Count >= otpRecord.Max_Attempts) {
    return {
      success: false,
      message: "Ban da nhap sai qua so lan cho phep. Vui long yeu cau gui lai ma.",
    };
  }

  if (!verifyOtpHash(otpRecord.Code_Hash, code)) {
    await pool.query(
      `
        UPDATE password_reset_otps
        SET Attempt_Count = Attempt_Count + 1
        WHERE Reset_ID = ?
      `,
      [otpRecord.Reset_ID],
    );

    return {
      success: false,
      message: "Ma OTP khong dung.",
    };
  }

  await pool.query(
    `
      UPDATE password_reset_otps
      SET Verified_At = NOW()
      WHERE Reset_ID = ?
    `,
    [otpRecord.Reset_ID],
  );

  return {
    success: true,
    message: "Xac minh OTP thanh cong.",
  };
}

export async function updateForgotPassword(
  emailInput: string,
  passwordInput: string,
  confirmPasswordInput: string,
): Promise<ForgotPasswordServiceResult> {
  const email = emailInput.trim().toLowerCase();
  const password = passwordInput;
  const confirmPassword = confirmPasswordInput;
  const emailError = validateEmail(email);
  const passwordError = validatePassword(password, confirmPassword);

  if (emailError || passwordError) {
    return {
      success: false,
      message: emailError || passwordError,
    };
  }

  const otpRecord = await getLatestActiveOtp(email);

  if (!otpRecord) {
    return {
      success: false,
      message: "Khong tim thay yeu cau doi mat khau. Vui long gui lai OTP.",
    };
  }

  if (isExpired(otpRecord.Expires_At)) {
    return {
      success: false,
      message: "Ma OTP da het han. Vui long gui lai OTP.",
    };
  }

  if (!otpRecord.Verified_At) {
    return {
      success: false,
      message: "Vui long xac minh OTP truoc khi doi mat khau.",
    };
  }

  const passwordHash = hashPassword(password);

  await pool.query(
    `
      UPDATE users
      SET Password_Hash = ?
      WHERE User_ID = ?
    `,
    [passwordHash, otpRecord.User_ID],
  );

  await pool.query(
    `
      UPDATE password_reset_otps
      SET Used_At = NOW()
      WHERE User_ID = ?
        AND Purpose = ?
        AND Used_At IS NULL
    `,
    [otpRecord.User_ID, OTP_PURPOSE],
  );

  return {
    success: true,
    message: "Doi mat khau thanh cong.",
  };
}

export type { ForgotPasswordServiceResult };
