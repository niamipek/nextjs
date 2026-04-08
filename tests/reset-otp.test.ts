import test from "node:test";
import assert from "node:assert/strict";
import { buildEmailHtml, getEmailContent } from "../lib/reset-otp";

test("forgot-password email content uses recovery wording", () => {
  const content = getEmailContent("forgot_password");
  const html = buildEmailHtml("Quan Ly", "123456", "forgot_password");

  assert.equal(content.subject, "Ma OTP khoi phuc mat khau");
  assert.match(html, /Khoi phuc mat khau/);
  assert.match(html, /123456/);
});

test("change-password email content uses confirmation wording", () => {
  const content = getEmailContent("change_password");
  const html = buildEmailHtml("Quan Ly", "654321", "change_password");

  assert.equal(content.subject, "Ma OTP xac nhan doi mat khau");
  assert.match(html, /Xac nhan doi mat khau/);
  assert.match(html, /654321/);
});
