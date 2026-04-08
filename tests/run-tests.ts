import assert from "node:assert/strict";
import {
  createChangePasswordFlowCookie,
  verifyChangePasswordFlowCookie,
} from "../lib/change-password-flow";
import { hashOtp, hashPassword, verifyOtpHash, verifyPassword } from "../lib/credentials";
import { buildEmailHtml, getEmailContent } from "../lib/reset-otp";

function runTest(name: string, assertion: () => void) {
  try {
    assertion();
    console.log(`PASS ${name}`);
  } catch (error) {
    console.error(`FAIL ${name}`);
    throw error;
  }
}

runTest("change password flow cookie round-trips", () => {
  const cookie = createChangePasswordFlowCookie({
    userId: "U001",
    email: "user@example.com",
    newPasswordHash: "hashed-password",
  });

  const payload = verifyChangePasswordFlowCookie(cookie);

  assert.deepEqual(payload, {
    userId: "U001",
    email: "user@example.com",
    newPasswordHash: "hashed-password",
  });
});

runTest("change password flow cookie rejects tampering", () => {
  const cookie = createChangePasswordFlowCookie({
    userId: "U001",
    email: "user@example.com",
    newPasswordHash: "hashed-password",
  });

  assert.equal(verifyChangePasswordFlowCookie(`${cookie}tampered`), null);
});

runTest("password hashing verifies original password", () => {
  const hashed = hashPassword("Secret123");

  assert.equal(verifyPassword(hashed, "Secret123"), true);
  assert.equal(verifyPassword(hashed, "Wrong123"), false);
});

runTest("otp hashing verifies original code", () => {
  const hashed = hashOtp("123456");

  assert.equal(verifyOtpHash(hashed, "123456"), true);
  assert.equal(verifyOtpHash(hashed, "654321"), false);
});

runTest("forgot-password email content uses recovery wording", () => {
  const content = getEmailContent("forgot_password");
  const html = buildEmailHtml("Quan Ly", "123456", "forgot_password");

  assert.equal(content.subject, "Ma OTP khoi phuc mat khau");
  assert.match(html, /Khoi phuc mat khau/);
  assert.match(html, /123456/);
});

runTest("change-password email content uses confirmation wording", () => {
  const content = getEmailContent("change_password");
  const html = buildEmailHtml("Quan Ly", "654321", "change_password");

  assert.equal(content.subject, "Ma OTP xac nhan doi mat khau");
  assert.match(html, /Xac nhan doi mat khau/);
  assert.match(html, /654321/);
});

console.log("All smoke tests passed.");
