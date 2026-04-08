"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const strict_1 = __importDefault(require("node:assert/strict"));
const change_password_flow_1 = require("../lib/change-password-flow");
const credentials_1 = require("../lib/credentials");
const reset_otp_1 = require("../lib/reset-otp");
function runTest(name, assertion) {
    try {
        assertion();
        console.log(`PASS ${name}`);
    }
    catch (error) {
        console.error(`FAIL ${name}`);
        throw error;
    }
}
runTest("change password flow cookie round-trips", () => {
    const cookie = (0, change_password_flow_1.createChangePasswordFlowCookie)({
        userId: "U001",
        email: "user@example.com",
        newPasswordHash: "hashed-password",
    });
    const payload = (0, change_password_flow_1.verifyChangePasswordFlowCookie)(cookie);
    strict_1.default.deepEqual(payload, {
        userId: "U001",
        email: "user@example.com",
        newPasswordHash: "hashed-password",
    });
});
runTest("change password flow cookie rejects tampering", () => {
    const cookie = (0, change_password_flow_1.createChangePasswordFlowCookie)({
        userId: "U001",
        email: "user@example.com",
        newPasswordHash: "hashed-password",
    });
    strict_1.default.equal((0, change_password_flow_1.verifyChangePasswordFlowCookie)(`${cookie}tampered`), null);
});
runTest("password hashing verifies original password", () => {
    const hashed = (0, credentials_1.hashPassword)("Secret123");
    strict_1.default.equal((0, credentials_1.verifyPassword)(hashed, "Secret123"), true);
    strict_1.default.equal((0, credentials_1.verifyPassword)(hashed, "Wrong123"), false);
});
runTest("otp hashing verifies original code", () => {
    const hashed = (0, credentials_1.hashOtp)("123456");
    strict_1.default.equal((0, credentials_1.verifyOtpHash)(hashed, "123456"), true);
    strict_1.default.equal((0, credentials_1.verifyOtpHash)(hashed, "654321"), false);
});
runTest("forgot-password email content uses recovery wording", () => {
    const content = (0, reset_otp_1.getEmailContent)("forgot_password");
    const html = (0, reset_otp_1.buildEmailHtml)("Quan Ly", "123456", "forgot_password");
    strict_1.default.equal(content.subject, "Ma OTP khoi phuc mat khau");
    strict_1.default.match(html, /Khoi phuc mat khau/);
    strict_1.default.match(html, /123456/);
});
runTest("change-password email content uses confirmation wording", () => {
    const content = (0, reset_otp_1.getEmailContent)("change_password");
    const html = (0, reset_otp_1.buildEmailHtml)("Quan Ly", "654321", "change_password");
    strict_1.default.equal(content.subject, "Ma OTP xac nhan doi mat khau");
    strict_1.default.match(html, /Xac nhan doi mat khau/);
    strict_1.default.match(html, /654321/);
});
console.log("All smoke tests passed.");
