import test from "node:test";
import assert from "node:assert/strict";
import { hashOtp, hashPassword, verifyOtpHash, verifyPassword } from "../lib/credentials";

test("password hashing verifies the original password", () => {
  const hashed = hashPassword("Secret123");

  assert.equal(verifyPassword(hashed, "Secret123"), true);
  assert.equal(verifyPassword(hashed, "Wrong123"), false);
});

test("otp hashing verifies the original code", () => {
  const hashed = hashOtp("123456");

  assert.equal(verifyOtpHash(hashed, "123456"), true);
  assert.equal(verifyOtpHash(hashed, "654321"), false);
});
