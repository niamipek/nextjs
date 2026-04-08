import "server-only";

import { randomBytes } from "node:crypto";
import type { RowDataPacket } from "mysql2/promise";
import pool from "@/lib/db";
import { hashOtp, hashPassword, verifyOtpHash, verifyPassword } from "@/lib/credentials";
import { sendResetOtpEmail } from "@/lib/reset-otp";

type ChangePasswordResult = {
  success: boolean;
  message: string;
  debugCode?: string;
  flowPayload?: {
    userId: string;
    email: string;
    newPasswordHash: string;
  };
};

type UserPasswordRow = RowDataPacket & {
  User_ID: string;
  Email: string | null;
  Password_Hash: string;
  Full_Name: string | null;
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
};

const OTP_EXPIRY_MINUTES = 5;
const OTP_LENGTH = 6;
const CHANGE_PASSWORD_OTP_PURPOSE = "change_password";

function validatePasswordChange(
  email: string,
  oldPassword: string,
  newPassword: string,
  confirmPassword: string,
) {
  if (!email) {
    return "Vui long nhap email.";
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return "Email khong hop le.";
  }

  if (!oldPassword) {
    return "Vui long nhap mat khau cu.";
  }

  if (!newPassword) {
    return "Vui long nhap mat khau moi.";
  }

  if (newPassword.length < 8) {
    return "Mat khau moi phai co it nhat 8 ky tu.";
  }

  if (newPassword !== confirmPassword) {
    return "Xac nhan mat khau moi khong khop.";
  }

  if (oldPassword === newPassword) {
    return "Mat khau moi phai khac mat khau cu.";
  }

  return "";
}

function validateOtp(code: string) {
  if (!/^\d{6}$/.test(code)) {
    return "Ma OTP phai gom 6 chu so.";
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

async function getUserPasswordByEmail(email: string) {
  const [rows] = await pool.query<UserPasswordRow[]>(
    `
      SELECT User_ID, Email, Password_Hash, Full_Name
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
      SELECT Reset_ID, User_ID, Email, Code_Hash, Attempt_Count, Max_Attempts, Expires_At, Verified_At, Used_At
      FROM password_reset_otps
      WHERE LOWER(Email) = ?
        AND Purpose = ?
        AND Used_At IS NULL
      ORDER BY Created_At DESC
      LIMIT 1
    `,
    [email, CHANGE_PASSWORD_OTP_PURPOSE],
  );

  return rows[0] || null;
}

async function createAndSendChangePasswordOtp(userId: string, email: string, fullName: string) {
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
    [userId, CHANGE_PASSWORD_OTP_PURPOSE],
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
    [resetId, userId, email, codeHash, CHANGE_PASSWORD_OTP_PURPOSE, OTP_EXPIRY_MINUTES],
  );

  await sendResetOtpEmail({
    code,
    email,
    fullName,
    purpose: "change_password",
  });

  return code;
}

export async function changePasswordForUser(
  emailInput: string,
  oldPasswordInput: string,
  newPasswordInput: string,
  confirmPasswordInput: string,
): Promise<ChangePasswordResult> {
  const email = emailInput.trim().toLowerCase();
  const oldPassword = oldPasswordInput;
  const newPassword = newPasswordInput;
  const confirmPassword = confirmPasswordInput;
  const validationMessage = validatePasswordChange(email, oldPassword, newPassword, confirmPassword);

  if (validationMessage) {
    return {
      success: false,
      message: validationMessage,
    };
  }

  const user = await getUserPasswordByEmail(email);

  if (!user) {
    return {
      success: false,
      message: "Khong tim thay tai khoan voi email nay.",
    };
  }

  if (!verifyPassword(user.Password_Hash, oldPassword)) {
    return {
      success: false,
      message: "Mat khau cu khong dung.",
    };
  }

  const newPasswordHash = hashPassword(newPassword);
  const code = await createAndSendChangePasswordOtp(user.User_ID, email, user.Full_Name || email);

  return {
    success: true,
    message: "Da gui OTP xac nhan doi mat khau toi email cua ban.",
    debugCode: getDebugCode(code),
    flowPayload: {
      userId: user.User_ID,
      email,
      newPasswordHash,
    },
  };
}

export async function resendChangePasswordOtp(
  flowPayload: { userId: string; email: string; newPasswordHash: string } | null,
): Promise<ChangePasswordResult> {
  if (!flowPayload) {
    return {
      success: false,
      message: "Khong tim thay yeu cau doi mat khau hop le. Vui long thuc hien lai.",
    };
  }

  const user = await getUserPasswordByEmail(flowPayload.email);

  if (!user || user.User_ID !== flowPayload.userId) {
    return {
      success: false,
      message: "Khong tim thay tai khoan hop le de gui lai OTP.",
    };
  }

  const code = await createAndSendChangePasswordOtp(user.User_ID, flowPayload.email, user.Full_Name || flowPayload.email);

  return {
    success: true,
    message: "Da gui lai OTP xac nhan doi mat khau.",
    debugCode: getDebugCode(code),
  };
}

export async function verifyChangePasswordOtp(
  emailInput: string,
  codeInput: string,
  flowPayload: { userId: string; email: string; newPasswordHash: string } | null,
): Promise<ChangePasswordResult> {
  const email = emailInput.trim().toLowerCase();
  const code = codeInput.trim();
  const otpError = validateOtp(code);

  if (!email) {
    return {
      success: false,
      message: "Vui long nhap email.",
    };
  }

  if (otpError) {
    return {
      success: false,
      message: otpError,
    };
  }

  if (!flowPayload || flowPayload.email !== email) {
    return {
      success: false,
      message: "Khong tim thay yeu cau doi mat khau hop le. Vui long thuc hien lai.",
    };
  }

  const otpRecord = await getLatestActiveOtp(email);

  if (!otpRecord) {
    return {
      success: false,
      message: "Khong tim thay ma OTP hop le. Vui long yeu cau gui lai ma.",
    };
  }

  if (otpRecord.User_ID !== flowPayload.userId) {
    return {
      success: false,
      message: "Thong tin xac minh khong khop. Vui long thuc hien lai.",
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
      UPDATE users
      SET Password_Hash = ?
      WHERE User_ID = ?
    `,
    [flowPayload.newPasswordHash, flowPayload.userId],
  );

  await pool.query(
    `
      UPDATE password_reset_otps
      SET Verified_At = NOW(), Used_At = NOW()
      WHERE Reset_ID = ?
    `,
    [otpRecord.Reset_ID],
  );

  return {
    success: true,
    message: "Doi mat khau thanh cong.",
  };
}

export type { ChangePasswordResult };
