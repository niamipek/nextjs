import "server-only";

import type { RowDataPacket } from "mysql2/promise";
import pool from "@/lib/db";
import { verifyPassword } from "@/lib/credentials";

type LoginRow = RowDataPacket & {
  User_ID: string;
  Email: string | null;
  Password_Hash: string;
  Full_Name: string;
  Status: string | null;
  Role_ID: string | null;
  Role_Name: string | null;
};

type LoginResult =
  | {
      ok: true;
      user: {
        userId: string;
        email: string;
        fullName: string;
        roles: string[];
      };
    }
  | {
      ok: false;
      message: string;
  };

function normalizeRole(value: string | null) {
  return (value || "").trim().toLowerCase();
}

type ProfileRow = RowDataPacket & {
  User_ID: string;
  Phone_Number: string | null;
  Email: string | null;
  Password_Hash: string;
  Full_Name: string;
  Avatar_URL: string | null;
  Gender: string | null;
  Date_of_Birth: Date | string | null;
  Created_At: Date | string | null;
  Role_Name: string | null;
};

type UserProfile = {
  userId: string;
  phoneNumber: string | null;
  email: string | null;
  passwordHash: string;
  fullName: string;
  avatarUrl: string | null;
  gender: string | null;
  dateOfBirth: Date | string | null;
  createdAt: Date | string | null;
  roleNames: string[];
};

function isManagerRole(row: LoginRow) {
  const roleId = normalizeRole(row.Role_ID);
  const roleName = normalizeRole(row.Role_Name);
  return (
    roleId.includes("manager") ||
    roleId.includes("admin") ||
    roleName.includes("manager") ||
    roleName.includes("admin") ||
    roleName.includes("quan ly")
  );
}

export async function validateManagerLogin(emailInput: string, passwordInput: string): Promise<LoginResult> {
  const email = emailInput.trim().toLowerCase();
  const password = passwordInput;

  if (!email || !password) {
    return {
      ok: false,
      message: "Vui long nhap email va mat khau.",
    };
  }

  const [rows] = await pool.query<LoginRow[]>(
    `
      SELECT
        u.User_ID,
        u.Email,
        u.Password_Hash,
        u.Full_Name,
        u.Status,
        ur.Role_ID,
        r.Role_Name
      FROM users u
      LEFT JOIN user_roles ur ON ur.User_ID = u.User_ID
      LEFT JOIN roles r ON r.Role_ID = ur.Role_ID
      WHERE LOWER(u.Email) = ?
    `,
    [email],
  );

  if (rows.length === 0) {
    return {
      ok: false,
      message: "Khong tim thay tai khoan.",
    };
  }

  const account = rows[0];

  if (account.Status && account.Status.toLowerCase() !== "active") {
    return {
      ok: false,
      message: "Tai khoan dang bi khoa hoac chua kich hoat.",
    };
  }

  if (!verifyPassword(account.Password_Hash, password)) {
    return {
      ok: false,
      message: "Mat khau khong dung.",
    };
  }

  const roles = rows.map((row) => row.Role_Name || row.Role_ID || "").filter(Boolean);
  const hasManagerRole = rows.some(isManagerRole);

  if (!hasManagerRole) {
    return {
      ok: false,
      message: "Tai khoan nay chua duoc gan vai tro quan ly.",
    };
  }

  return {
    ok: true,
    user: {
      userId: account.User_ID,
      email: account.Email || email,
      fullName: account.Full_Name,
      roles,
    },
  };
}

export async function getUserProfileById(userId: string): Promise<UserProfile | null> {
  const normalizedUserId = userId.trim();

  if (!normalizedUserId) {
    return null;
  }

  const [rows] = await pool.query<ProfileRow[]>(
    `
      SELECT
        u.User_ID,
        u.Phone_Number,
        u.Email,
        u.Password_Hash,
        u.Full_Name,
        u.Avatar_URL,
        u.Gender,
        u.Date_of_Birth,
        u.Created_At,
        r.Role_Name
      FROM users u
      LEFT JOIN user_roles ur ON ur.User_ID = u.User_ID
      LEFT JOIN roles r ON r.Role_ID = ur.Role_ID
      WHERE u.User_ID = ?
    `,
    [normalizedUserId],
  );

  if (rows.length === 0) {
    return null;
  }

  const account = rows[0];
  const roleNames = Array.from(new Set(rows.map((row) => (row.Role_Name || "").trim()).filter(Boolean)));

  return {
    userId: account.User_ID,
    phoneNumber: account.Phone_Number,
    email: account.Email,
    passwordHash: account.Password_Hash,
    fullName: account.Full_Name,
    avatarUrl: account.Avatar_URL,
    gender: account.Gender,
    dateOfBirth: account.Date_of_Birth,
    createdAt: account.Created_At,
    roleNames,
  };
}

export type { LoginResult, UserProfile };
