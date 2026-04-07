import { createHmac, timingSafeEqual } from "node:crypto";

type SessionPayload = {
  userId: string;
  email: string;
  fullName: string;
  roles: string[];
};

const SESSION_COOKIE_NAME = "dashboard_session";

function getAuthSecret() {
  return process.env.AUTH_SECRET || "dev-only-secret-change-me";
}

function toBase64Url(value: string) {
  return Buffer.from(value).toString("base64url");
}

function fromBase64Url(value: string) {
  return Buffer.from(value, "base64url").toString("utf8");
}

function sign(value: string) {
  return createHmac("sha256", getAuthSecret()).update(value).digest("base64url");
}

export function createSessionCookie(payload: SessionPayload) {
  const encodedPayload = toBase64Url(JSON.stringify(payload));
  const signature = sign(encodedPayload);
  return `${encodedPayload}.${signature}`;
}

export function verifySessionCookie(cookieValue: string | undefined | null): SessionPayload | null {
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
    return JSON.parse(fromBase64Url(encodedPayload)) as SessionPayload;
  } catch {
    return null;
  }
}

export function getSessionCookieName() {
  return SESSION_COOKIE_NAME;
}

export type { SessionPayload };
