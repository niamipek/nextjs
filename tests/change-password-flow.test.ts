import test from "node:test";
import assert from "node:assert/strict";
import {
  createChangePasswordFlowCookie,
  verifyChangePasswordFlowCookie,
} from "../lib/change-password-flow";

test("change password flow cookie round-trips signed payload", () => {
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

test("change password flow cookie rejects tampering", () => {
  const cookie = createChangePasswordFlowCookie({
    userId: "U001",
    email: "user@example.com",
    newPasswordHash: "hashed-password",
  });
  const tampered = `${cookie}tampered`;

  assert.equal(verifyChangePasswordFlowCookie(tampered), null);
});
