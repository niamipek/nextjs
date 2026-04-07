import "server-only";

import { randomBytes, scryptSync, timingSafeEqual } from "node:crypto";

const SCRYPT_KEY_LENGTH = 64;
const PASSWORD_PREFIX = "scrypt";
const OTP_PREFIX = "otp";

function createSalt(length = 16) {
  return randomBytes(length).toString("hex");
}

function encodeHash(prefix: string, plainText: string) {
  const salt = createSalt();
  const derivedKey = scryptSync(plainText, salt, SCRYPT_KEY_LENGTH).toString("hex");
  return `${prefix}$${salt}$${derivedKey}`;
}

function verifyEncodedHash(encodedValue: string, plainText: string, expectedPrefix: string) {
  const [prefix, salt, storedHash] = encodedValue.split("$");

  if (prefix !== expectedPrefix || !salt || !storedHash) {
    return false;
  }

  const incomingHash = scryptSync(plainText, salt, SCRYPT_KEY_LENGTH);
  const storedBuffer = Buffer.from(storedHash, "hex");

  if (incomingHash.length !== storedBuffer.length) {
    return false;
  }

  return timingSafeEqual(incomingHash, storedBuffer);
}

export function hashPassword(password: string) {
  return encodeHash(PASSWORD_PREFIX, password);
}

export function verifyPassword(storedValue: string, password: string) {
  if (!storedValue) {
    return false;
  }

  if (storedValue.startsWith(`${PASSWORD_PREFIX}$`)) {
    return verifyEncodedHash(storedValue, password, PASSWORD_PREFIX);
  }

  return storedValue === password;
}

export function hashOtp(code: string) {
  return encodeHash(OTP_PREFIX, code);
}

export function verifyOtpHash(storedValue: string, code: string) {
  if (!storedValue.startsWith(`${OTP_PREFIX}$`)) {
    return false;
  }

  return verifyEncodedHash(storedValue, code, OTP_PREFIX);
}

