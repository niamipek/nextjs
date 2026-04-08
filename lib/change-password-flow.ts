import "server-only";

import { createHmac, timingSafeEqual } from "node:crypto";

type ChangePasswordFlowPayload = {
  userId: string;
  email: string;
  newPasswordHash: string;
};

const CHANGE_PASSWORD_FLOW_COOKIE_NAME = "change_password_flow";

function getSecret() {
  return process.env.AUTH_SECRET || "dev-only-secret-change-me";
}

function toBase64Url(value: string) {
  return Buffer.from(value).toString("base64url");
}

function fromBase64Url(value: string) {
  return Buffer.from(value, "base64url").toString("utf8");
}

function sign(value: string) {
  return createHmac("sha256", getSecret()).update(value).digest("base64url");
}

export function createChangePasswordFlowCookie(payload: ChangePasswordFlowPayload) {
  const encodedPayload = toBase64Url(JSON.stringify(payload));
  const signature = sign(encodedPayload);
  return `${encodedPayload}.${signature}`;
}

export function verifyChangePasswordFlowCookie(cookieValue: string | undefined | null): ChangePasswordFlowPayload | null {
  if (!cookieValue) {
    return null;
  }

  const [encodedPayload, receivedSignature] = cookieValue.split(".");

  if (!encodedPayload || !receivedSignature) {
    return null;
  }

  const expectedSignature = sign(encodedPayload);
  const receivedBuffer = Buffer.from(receivedSignature);
  const expectedBuffer = Buffer.from(expectedSignature);

  if (receivedBuffer.length !== expectedBuffer.length) {
    return null;
  }

  if (!timingSafeEqual(receivedBuffer, expectedBuffer)) {
    return null;
  }

  try {
    return JSON.parse(fromBase64Url(encodedPayload)) as ChangePasswordFlowPayload;
  } catch {
    return null;
  }
}

export function getChangePasswordFlowCookieName() {
  return CHANGE_PASSWORD_FLOW_COOKIE_NAME;
}

export type { ChangePasswordFlowPayload };
